import fs from 'fs';

const recetas = JSON.parse(fs.readFileSync('./data/recetas-ensaladas.json', 'utf8'));
const aderezos = JSON.parse(fs.readFileSync('./data/aderezos-ensaladas.json', 'utf8'));

const recetasActualizadas = recetas.map(r => ({
  ...r,
  imagen_url: `/ensaladas/ensalada-${r.id}.jpg`,
}));

const aderezosActualizados = aderezos.map(a => ({
  ...a,
  imagen_url: `/aderezos/aderezo-${a.id}.jpg`,
}));

fs.writeFileSync('./data/recetas-ensaladas.json', JSON.stringify(recetasActualizadas, null, 2));
fs.writeFileSync('./data/aderezos-ensaladas.json', JSON.stringify(aderezosActualizados, null, 2));

console.log(`✅ recetas-ensaladas.json: ${recetasActualizadas.length} recetas actualizadas`);
console.log(`✅ aderezos-ensaladas.json: ${aderezosActualizados.length} aderezos actualizados`);
