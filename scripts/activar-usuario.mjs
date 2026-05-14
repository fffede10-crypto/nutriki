// Uso: node scripts/activar-usuario.mjs "Nombre Apellido" "email@gmail.com" "NombreHijo"
// Requiere que la mamá ya esté registrada en Supabase Auth con ese email.

const nombre = process.argv[2];
const email = process.argv[3];
const nombreHijo = process.argv[4] || '';

if (!nombre || !email) {
  console.log('Uso: node scripts/activar-usuario.mjs "Nombre" "email@gmail.com" "NombreHijo"');
  process.exit(1);
}

const emailLimpio = email.toLowerCase().trim();

console.log('\n' + '='.repeat(55));
console.log('✅ ACTIVAR USUARIO — Nutriki');
console.log('='.repeat(55));

console.log('\n📋 SQL PARA SUPABASE:');
console.log('-'.repeat(55));
console.log(`
-- Opción A: si la mamá ya se registró sola (tiene auth.users):
UPDATE usuarios_nutriki
SET acceso_activo = true, nombre = '${nombre}', nombre_hijo = '${nombreHijo}'
WHERE email = '${emailLimpio}';

-- Opción B: si el registro todavía no existe:
-- Primero obtené el id de auth.users para ese email en el dashboard de Supabase,
-- luego ejecutá:
-- INSERT INTO usuarios_nutriki (id, email, nombre, nombre_hijo, acceso_activo)
-- VALUES ('[UUID de auth.users]', '${emailLimpio}', '${nombre}', '${nombreHijo}', true);
`);

console.log('\n💬 MENSAJE WHATSAPP:');
console.log('-'.repeat(55));
console.log(`¡Hola ${nombre}! 👋`);
console.log(`Tu acceso a Nutriki ya está listo 🥦`);
console.log(``);
console.log(`🔗 Plataforma: [URL de Vercel]`);
console.log(`📧 Ingresá con tu email: ${emailLimpio}`);
console.log(`🔑 La contraseña es la que elegiste al registrarte.`);
console.log(``);
console.log(`¡Cualquier duda estamos acá! 💚`);
console.log('-'.repeat(55) + '\n');
