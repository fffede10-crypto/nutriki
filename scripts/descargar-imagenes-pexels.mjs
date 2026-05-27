import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) { console.error('Falta PEXELS_API_KEY'); process.exit(1); }

const ENSALADAS_DIR = './public/ensaladas';
const ADEREZOS_DIR  = './public/aderezos';
if (!fs.existsSync(ENSALADAS_DIR)) fs.mkdirSync(ENSALADAS_DIR, { recursive: true });
if (!fs.existsSync(ADEREZOS_DIR))  fs.mkdirSync(ADEREZOS_DIR,  { recursive: true });

function get(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function descargar(url, destino) {
  return new Promise((resolve, reject) => {
    const seguir = (u) => {
      https.get(u, res => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return seguir(res.headers.location);
        }
        const file = fs.createWriteStream(destino);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }).on('error', reject);
    };
    seguir(url);
  });
}

async function procesar(query, archivo) {
  if (fs.existsSync(archivo)) {
    console.log(`✓ Ya existe: ${path.basename(archivo)}`);
    return;
  }
  try {
    const data = await get(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
      { Authorization: API_KEY }
    );
    const foto = data.photos?.[0]?.src?.large;
    if (!foto) { console.warn(`⚠ Sin resultados: "${query}"`); return; }
    await descargar(foto, archivo);
    console.log(`✅ ${path.basename(archivo)}  ← "${query}"`);
  } catch (err) {
    console.error(`❌ ${path.basename(archivo)}:`, err.message);
  }
  await new Promise(r => setTimeout(r, 500));
}

const recetas = [
  { id:  1, q: 'rocket salad pear walnut' },
  { id:  2, q: 'caprese salad avocado' },
  { id:  3, q: 'grilled chicken mango salad' },
  { id:  4, q: 'spinach salad bacon egg' },
  { id:  5, q: 'tuna salad bowl' },
  { id:  6, q: 'greek salad feta' },
  { id:  7, q: 'carrot orange salad' },
  { id:  8, q: 'rocket sundried tomato salad' },
  { id:  9, q: 'lentil salad' },
  { id: 10, q: 'purple cabbage coleslaw' },
  { id: 11, q: 'chickpea mediterranean bowl' },
  { id: 12, q: 'caesar salad chicken' },
  { id: 13, q: 'quinoa bowl chicken avocado' },
  { id: 14, q: 'pasta salad tuna' },
  { id: 15, q: 'rice bowl salmon' },
  { id: 16, q: 'lentil chorizo salad' },
  { id: 17, q: 'potato salad egg' },
  { id: 18, q: 'nicoise salad tuna' },
  { id: 19, q: 'couscous vegetable bowl' },
  { id: 20, q: 'white bean tomato salad' },
  { id: 21, q: 'waldorf salad chicken' },
  { id: 22, q: 'burrata tomato salad' },
  { id: 23, q: 'fig prosciutto arugula salad' },
  { id: 24, q: 'watermelon feta salad' },
  { id: 25, q: 'roasted beet orange salad' },
  { id: 26, q: 'smoked salmon salad' },
  { id: 27, q: 'pear gorgonzola walnut salad' },
  { id: 28, q: 'prawn mango avocado salad' },
  { id: 29, q: 'asparagus egg parmesan salad' },
  { id: 30, q: 'quinoa raspberry almond salad' },
  { id: 31, q: 'purple cabbage ginger coleslaw' },
  { id: 32, q: 'panzanella bread tomato salad' },
  { id: 33, q: 'broccoli almond lemon salad' },
  { id: 34, q: 'zucchini pesto salad' },
  { id: 35, q: 'beetroot orange salad' },
  { id: 36, q: 'roasted carrot tahini' },
  { id: 37, q: 'fennel orange olive salad' },
  { id: 38, q: 'apple celery walnut salad' },
  { id: 39, q: 'cucumber yogurt mint salad' },
  { id: 40, q: 'grilled corn pepper salad' },
  { id: 41, q: 'strawberry spinach almond salad' },
  { id: 42, q: 'mango cucumber peanut salad' },
  { id: 43, q: 'grilled peach prosciutto salad' },
  { id: 44, q: 'moroccan orange olive salad' },
  { id: 45, q: 'grape blue cheese walnut salad' },
  { id: 46, q: 'melon prosciutto mint' },
  { id: 47, q: 'kiwi spinach salad' },
  { id: 48, q: 'green apple celery walnut salad' },
  { id: 49, q: 'mandarin endive pine nuts salad' },
  { id: 50, q: 'raspberry arugula brie salad' },
];

const aderezos = [
  { id:  1, q: 'caesar dressing jar' },
  { id:  2, q: 'tahini lemon sauce bowl' },
  { id:  3, q: 'honey mustard dressing' },
  { id:  4, q: 'yogurt dill dressing' },
  { id:  5, q: 'balsamic vinaigrette' },
  { id:  6, q: 'sesame ginger dressing' },
  { id:  7, q: 'blue cheese dressing' },
  { id:  8, q: 'hummus dressing bowl' },
  { id:  9, q: 'raspberry vinaigrette' },
  { id: 10, q: 'romesco sauce bowl' },
];

console.log('\n🥗 Descargando fotos de ensaladas...\n');
for (const r of recetas) {
  await procesar(r.q, path.join(ENSALADAS_DIR, `ensalada-${r.id}.jpg`));
}

console.log('\n🫙 Descargando fotos de aderezos...\n');
for (const a of aderezos) {
  await procesar(a.q, path.join(ADEREZOS_DIR, `aderezo-${a.id}.jpg`));
}

console.log('\n✅ Listo.');
console.log(`📁 Ensaladas: ${ENSALADAS_DIR}`);
console.log(`📁 Aderezos:  ${ADEREZOS_DIR}`);
