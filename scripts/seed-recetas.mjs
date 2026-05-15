import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// Parsear .env.local manualmente (sin dotenv)
function parseEnv(path) {
  const env = {}
  try {
    const lines = readFileSync(path, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const idx = trimmed.indexOf('=')
      if (idx === -1) continue
      const key = trimmed.slice(0, idx).trim()
      const val = trimmed.slice(idx + 1).trim()
      env[key] = val
    }
  } catch {
    // no .env.local
  }
  return env
}

const env = parseEnv(join(root, '.env.local'))

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = env.SUPABASE_SERVICE_ROLE_KEY  || process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

const recetas = JSON.parse(readFileSync(join(root, 'data', 'recetas-nutriki.json'), 'utf8'))

console.log(`\n🌱 Insertando ${recetas.length} recetas en Supabase...`)
console.log(`   URL: ${SUPABASE_URL}\n`)

let ok = 0
let errores = []

for (const receta of recetas) {
  const { error } = await supabase
    .from('recetas_nutriki')
    .upsert(receta, { onConflict: 'id' })

  if (error) {
    errores.push({ id: receta.id, nombre: receta.nombre, error: error.message })
    process.stdout.write('✗')
  } else {
    ok++
    process.stdout.write('.')
  }
}

console.log('\n')
console.log('='.repeat(45))
console.log(`✅ Insertadas correctamente: ${ok} / ${recetas.length}`)

if (errores.length > 0) {
  console.log(`❌ Con error:               ${errores.length}`)
  console.log('\nDetalle de errores:')
  for (const e of errores) {
    console.log(`  ID ${e.id} "${e.nombre}": ${e.error}`)
  }
}

console.log('='.repeat(45) + '\n')
