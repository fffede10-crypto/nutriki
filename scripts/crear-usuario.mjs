// Uso: node scripts/crear-usuario.mjs "Nombre Apellido" "email@gmail.com" "producto1,producto2"
// Productos válidos: tiroides_activa, ensaladas_gourmet, nutriki_completo

const nombre = process.argv[2];
const email = process.argv[3];
const productosArg = process.argv[4] || 'tiroides_activa';

if (!nombre || !email) {
  console.log('Uso: node scripts/crear-usuario.mjs "Nombre" "email@gmail.com" "producto1,producto2"');
  console.log('Productos: tiroides_activa | ensaladas_gourmet | nutriki_completo');
  process.exit(1);
}

const emailLimpio = email.toLowerCase().trim();
const productos = productosArg.split(',').map(p => p.trim());

const PRODUCTOS_CONFIG = {
  tiroides_activa: { link: '/dashboard', nombre: 'Tiroides Activa', emoji: '🌿' },
  ensaladas_gourmet: { link: '/ensaladas-gourmet', nombre: 'Ensaladas Gourmet', emoji: '🥗' },
  nutriki_completo: { link: '/dashboard', nombre: 'Nutriki Completo', emoji: '🌱' },
};

console.log('\n' + '='.repeat(60));
console.log('✅ CREAR / ACTIVAR USUARIO — Nutriki');
console.log('='.repeat(60));
console.log(`\nUsuario: ${nombre} <${emailLimpio}>`);
console.log(`Productos: ${productos.join(', ')}\n`);

console.log('📋 SQL PARA SUPABASE:');
console.log('-'.repeat(60));

console.log(`
-- PASO 1: Activar usuario base
-- (Si ya se registró sola, usar Opción A; si no existe, Opción B)

-- Opción A: usuario existente
UPDATE usuarios_nutriki
SET acceso_activo = true, nombre = '${nombre}'
WHERE email = '${emailLimpio}';

-- Opción B: insertar nuevo (reemplazá [UUID] con el id de auth.users)
-- INSERT INTO usuarios_nutriki (id, email, nombre, acceso_activo)
-- VALUES ('[UUID de auth.users]', '${emailLimpio}', '${nombre}', true);
`);

console.log('-- PASO 2: Registrar productos');
productos.forEach(producto => {
  if (!PRODUCTOS_CONFIG[producto]) {
    console.log(`-- ADVERTENCIA: producto desconocido: ${producto}`);
    return;
  }
  console.log(`
-- Producto: ${producto}
INSERT INTO usuario_productos (usuario_id, producto, activo)
SELECT id, '${producto}', true
FROM usuarios_nutriki
WHERE email = '${emailLimpio}'
ON CONFLICT (usuario_id, producto)
DO UPDATE SET activo = true;`);
});

console.log('\n' + '💬 MENSAJE WHATSAPP:');
console.log('-'.repeat(60));

const productoPrincipal = productos[0];
const config = PRODUCTOS_CONFIG[productoPrincipal] || PRODUCTOS_CONFIG['tiroides_activa'];

console.log(`¡Hola ${nombre}! 👋`);
if (productos.length === 1) {
  console.log(`Tu acceso a ${config.nombre} ${config.emoji} ya está listo.`);
} else {
  const nombres = productos.map(p => PRODUCTOS_CONFIG[p]?.nombre || p).join(' y ');
  console.log(`Tu acceso a ${nombres} ya está listo. 🌱`);
}
console.log(``);
console.log(`🔗 Ingresá acá: [URL de Vercel]${config.link}`);
console.log(`📧 Con tu email: ${emailLimpio}`);
console.log(`🔑 Contraseña: la que elegiste al registrarte.`);
console.log(``);
console.log(`¡Cualquier duda estamos acá! 💚`);
console.log('-'.repeat(60) + '\n');
