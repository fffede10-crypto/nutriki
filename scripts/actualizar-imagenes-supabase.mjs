import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

let errores = 0;

// 50 recetas → /ensaladas/ensalada-{id}.jpg
console.log('\n🥗 Actualizando imagen_url de recetas...\n');
for (let id = 1; id <= 50; id++) {
  const imagen_url = `/ensaladas/ensalada-${id}.jpg`;
  const { error } = await supabase
    .from('recetas_ensaladas')
    .update({ imagen_url })
    .eq('id', id);
  if (error) {
    console.error(`❌ receta ${id}:`, error.message);
    errores++;
  } else {
    console.log(`✅ receta ${id} → ${imagen_url}`);
  }
}

// 10 aderezos → /aderezos/aderezo-{id}.jpg
console.log('\n🫙 Actualizando imagen_url de aderezos...\n');
for (let id = 1; id <= 10; id++) {
  const imagen_url = `/aderezos/aderezo-${id}.jpg`;
  const { error } = await supabase
    .from('aderezos_ensaladas')
    .update({ imagen_url })
    .eq('id', id);
  if (error) {
    console.error(`❌ aderezo ${id}:`, error.message);
    errores++;
  } else {
    console.log(`✅ aderezo ${id} → ${imagen_url}`);
  }
}

console.log(`\n${errores === 0 ? '✅ Todo actualizado en Supabase.' : `⚠ ${errores} errores.`}`);
