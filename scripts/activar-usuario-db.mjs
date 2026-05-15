import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

function parseEnv(p) {
  const env = {}
  try {
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const idx = t.indexOf('=')
      if (idx === -1) continue
      env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim()
    }
  } catch {}
  return env
}

const env = parseEnv('.env.local')
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = env.SUPABASE_SERVICE_ROLE_KEY
const EMAIL        = process.argv[2] || 'test@test.com'
const NOMBRE       = process.argv[3] || 'Test'

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Faltan credenciales en .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

console.log(`\n🔧 Activando usuario: ${EMAIL}`)
console.log(`   Proyecto: ${SUPABASE_URL}\n`)

// 1. Buscar en auth.users
const { data: listData, error: listErr } = await supabase.auth.admin.listUsers()
if (listErr) {
  console.error('❌ Error listando auth.users:', listErr.message)
  process.exit(1)
}

const existing = listData?.users?.find(u => u.email === EMAIL)
let userId

if (existing) {
  userId = existing.id
  console.log(`✓ Encontrado en auth.users`)
  console.log(`  id:             ${userId}`)
  console.log(`  email_confirmed: ${existing.email_confirmed_at ? 'sí' : 'no'}`)
} else {
  console.log('  No existe en auth.users — creando con email confirmado...')
  const { data: created, error: createErr } = await supabase.auth.admin.createUser({
    email: EMAIL,
    password: 'Test1234!',
    email_confirm: true,
    user_metadata: { nombre: NOMBRE },
  })
  if (createErr) {
    console.error('❌ Error creando en auth.users:', createErr.message)
    process.exit(1)
  }
  userId = created.user.id
  console.log(`✓ Creado en auth.users`)
  console.log(`  id:              ${userId}`)
  console.log(`  contraseña temp: Test1234!`)
}

// 2. Upsert en usuarios_nutriki con acceso_activo = true
console.log('\n  Ejecutando SQL equivalente:')
console.log(`  INSERT INTO usuarios_nutriki (id, email, nombre, acceso_activo, vio_bienvenida, restricciones_alimentarias, preferencias)`)
console.log(`  VALUES ('${userId}', '${EMAIL}', '${NOMBRE}', true, false, '[]', '[]')`)
console.log(`  ON CONFLICT (id) DO UPDATE SET acceso_activo = true, nombre = '${NOMBRE}';\n`)

const { error: dbErr } = await supabase.from('usuarios_nutriki').upsert({
  id: userId,
  email: EMAIL,
  nombre: NOMBRE,
  acceso_activo: true,
  vio_bienvenida: false,
  restricciones_alimentarias: [],
  preferencias: [],
}, { onConflict: 'id' })

if (dbErr) {
  console.error('❌ Error en usuarios_nutriki:', dbErr.message)
  process.exit(1)
}

// 3. Verificar
const { data: perfil, error: selErr } = await supabase
  .from('usuarios_nutriki')
  .select('id, email, nombre, acceso_activo, vio_bienvenida')
  .eq('email', EMAIL)
  .single()

if (selErr) {
  console.error('❌ Error verificando:', selErr.message)
  process.exit(1)
}

console.log('='.repeat(50))
console.log('✅ Usuario activado correctamente')
console.log('='.repeat(50))
console.log(`   email:         ${perfil.email}`)
console.log(`   nombre:        ${perfil.nombre}`)
console.log(`   acceso_activo: ${perfil.acceso_activo}`)
console.log(`   vio_bienvenida:${perfil.vio_bienvenida}`)
console.log(`   id:            ${perfil.id}`)
console.log('='.repeat(50) + '\n')
