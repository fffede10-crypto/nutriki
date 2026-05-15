import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// ─── Parse .env.local ────────────────────────────────────────────────────────
function parseEnv(path) {
  const env = {}
  try {
    const lines = readFileSync(path, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const idx = trimmed.indexOf('=')
      if (idx === -1) continue
      env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim()
    }
  } catch { }
  return env
}

const env = parseEnv(join(root, '.env.local'))

const SUPABASE_URL    = env.NEXT_PUBLIC_SUPABASE_URL    || process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY     = env.SUPABASE_SERVICE_ROLE_KEY   || process.env.SUPABASE_SERVICE_ROLE_KEY
const PEXELS_KEY      = env.PEXELS_API_KEY              || process.env.PEXELS_API_KEY
const ANTHROPIC_KEY   = env.ANTHROPIC_API_KEY           || process.env.ANTHROPIC_API_KEY

for (const [name, val] of [
  ['NEXT_PUBLIC_SUPABASE_URL', SUPABASE_URL],
  ['SUPABASE_SERVICE_ROLE_KEY', SERVICE_KEY],
  ['PEXELS_API_KEY', PEXELS_KEY],
  ['ANTHROPIC_API_KEY', ANTHROPIC_KEY],
]) {
  if (!val || val.startsWith('your_')) {
    console.error(`❌ Falta configurar ${name} en .env.local`)
    process.exit(1)
  }
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// ─── Fallbacks por categoría ──────────────────────────────────────────────────
const FALLBACK = {
  desayuno: 'healthy breakfast food',
  almuerzo: 'healthy lunch food',
  cena:     'healthy dinner plate',
  merienda: 'healthy kids snack',
  postre:   'healthy dessert kids',
  jugo:     'fresh fruit juice',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function traducirNombre(nombre) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 32,
      messages: [
        {
          role: 'user',
          content: `Translate this Argentine recipe name to English for a Pexels image search. Return ONLY 2-4 keywords, no explanation.\nRecipe: ${nombre}`,
        },
      ],
    }),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Anthropic ${res.status}: ${txt}`)
  }
  const data = await res.json()
  return data.content?.[0]?.text?.trim().toLowerCase() ?? ''
}

async function buscarEnPexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`
  const res = await fetch(url, { headers: { Authorization: PEXELS_KEY } })
  if (!res.ok) throw new Error(`Pexels ${res.status}`)
  const data = await res.json()
  const foto = data.photos?.[0]
  if (!foto) return null
  return `${foto.src.medium}?auto=compress&cs=tinysrgb&w=640`
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const recetas = JSON.parse(readFileSync(join(root, 'data', 'recetas-nutriki.json'), 'utf8'))

console.log(`\n🔍 Buscando imágenes para ${recetas.length} recetas...\n`)

let countEspecificas = 0
let countFallbacks   = 0
let countSinImagen   = 0

for (const receta of recetas) {
  let imagenUrl = null
  let queryUsada = ''

  try {
    // Nivel 1: traducir con Haiku y buscar en Pexels
    const keywords = await traducirNombre(receta.nombre)
    await sleep(500)

    if (keywords) {
      imagenUrl = await buscarEnPexels(keywords)
      queryUsada = keywords
    }

    // Nivel 2: fallback por categoría
    if (!imagenUrl) {
      const fallbackQuery = FALLBACK[receta.categoria] ?? 'healthy kids food'
      await sleep(500)
      imagenUrl = await buscarEnPexels(fallbackQuery)
      queryUsada = `[fallback] ${fallbackQuery}`
      if (imagenUrl) countFallbacks++
      else countSinImagen++
    } else {
      countEspecificas++
    }
  } catch (err) {
    console.error(`  ❌ Receta ${receta.id} error: ${err.message}`)
    countSinImagen++
  }

  if (imagenUrl) {
    receta.imagen_url = imagenUrl
    if (queryUsada.startsWith('[fallback]')) {
      console.log(`  ⚠️  Receta ${receta.id} "${receta.nombre}" → ${queryUsada} → ${imagenUrl}`)
    } else {
      console.log(`  ✅ Receta ${receta.id} "${receta.nombre}" → "${queryUsada}" → ${imagenUrl}`)
    }
  } else {
    console.log(`  ❌ Receta ${receta.id} "${receta.nombre}" → sin imagen`)
  }

  await sleep(500)
}

// ─── Guardar JSON actualizado ─────────────────────────────────────────────────
writeFileSync(
  join(root, 'data', 'recetas-nutriki.json'),
  JSON.stringify(recetas, null, 2),
  'utf8'
)
console.log('\n✅ data/recetas-nutriki.json actualizado')

// ─── Sync a Supabase ──────────────────────────────────────────────────────────
console.log('\n📡 Sincronizando imagen_url en Supabase...\n')

let okSupabase = 0
let errSupabase = 0

for (const receta of recetas) {
  if (!receta.imagen_url) continue
  const { error } = await supabase
    .from('recetas_nutriki')
    .update({ imagen_url: receta.imagen_url })
    .eq('id', receta.id)
  if (error) {
    console.error(`  ❌ Supabase error ID ${receta.id}: ${error.message}`)
    errSupabase++
  } else {
    okSupabase++
    process.stdout.write('.')
  }
}

console.log('\n')
console.log('='.repeat(50))
console.log(`✅ Imágenes específicas:  ${countEspecificas}`)
console.log(`⚠️  Fallbacks usados:      ${countFallbacks}`)
console.log(`❌ Sin imagen:            ${countSinImagen}`)
console.log(`📡 Supabase actualizados: ${okSupabase} / ${recetas.length}`)
if (errSupabase > 0) console.log(`❌ Supabase errores:      ${errSupabase}`)
console.log('='.repeat(50) + '\n')
