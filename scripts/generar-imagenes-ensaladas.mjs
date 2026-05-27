import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const OUTPUT_DIR = './public/ensaladas';
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ADEREZOS_DIR = './public/aderezos';
if (!fs.existsSync(ADEREZOS_DIR)) fs.mkdirSync(ADEREZOS_DIR, { recursive: true });

async function generarImagen(prompt, archivo) {
  if (fs.existsSync(archivo)) {
    console.log(`✓ Ya existe: ${path.basename(archivo)}`);
    return;
  }
  try {
    const response = await openai.images.generate({
      model: 'gpt-image-1',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'low',
    });
    const b64 = response.data[0].b64_json;
    fs.writeFileSync(archivo, Buffer.from(b64, 'base64'));
    console.log(`✅ Generada: ${path.basename(archivo)}`);
    await new Promise(r => setTimeout(r, 2000)); // rate limit
  } catch (err) {
    console.error(`❌ Error en ${path.basename(archivo)}:`, err.message);
  }
}

const ESTILO = `Professional food photography, overhead shot, natural daylight, white or light wooden background, appetizing and fresh, restaurant quality presentation, shallow depth of field, vibrant colors.`;

// 50 RECETAS DE ENSALADAS
const recetas = [
  // EXPRESS (1-10)
  { id: 1,  prompt: `${ESTILO} Rocket salad with sliced pear, walnuts and shaved parmesan cheese in a white bowl` },
  { id: 2,  prompt: `${ESTILO} Caprese salad with avocado slices, fresh tomatoes, mozzarella and basil leaves` },
  { id: 3,  prompt: `${ESTILO} Grilled chicken bowl with mango chunks, roasted red pepper and mixed greens` },
  { id: 4,  prompt: `${ESTILO} Spinach salad with hard boiled egg slices, crispy bacon bits and cherry tomatoes` },
  { id: 5,  prompt: `${ESTILO} Tuna bowl with cucumber slices, corn kernels, black olives and cherry tomatoes` },
  { id: 6,  prompt: `${ESTILO} Classic Greek salad with feta cheese cubes, kalamata olives, cucumber and tomato` },
  { id: 7,  prompt: `${ESTILO} Shredded carrot salad with orange segments and mixed seeds in a ceramic bowl` },
  { id: 8,  prompt: `${ESTILO} Rocket salad with sun-dried tomatoes and cream cheese dollops` },
  { id: 9,  prompt: `${ESTILO} Lentil bowl with caramelized onions, fresh herbs and olive oil drizzle` },
  { id: 10, prompt: `${ESTILO} Purple cabbage coleslaw with apple slices and honey mustard dressing` },
  // PLATO COMPLETO (11-20)
  { id: 11, prompt: `${ESTILO} Mediterranean chickpea bowl with feta cheese, cucumber, cherry tomatoes and olives` },
  { id: 12, prompt: `${ESTILO} Caesar salad with grilled chicken breast, croutons, romaine lettuce and parmesan` },
  { id: 13, prompt: `${ESTILO} Quinoa bowl with grilled chicken, avocado slices, mango and mixed greens` },
  { id: 14, prompt: `${ESTILO} Pasta salad with tuna, black olives, cherry tomatoes and fresh basil` },
  { id: 15, prompt: `${ESTILO} Brown rice bowl with salmon fillet, edamame beans and sesame seeds` },
  { id: 16, prompt: `${ESTILO} Lentil salad with sliced chorizo, roasted red peppers and fresh parsley` },
  { id: 17, prompt: `${ESTILO} Potato salad with hard boiled eggs, pickles and creamy dressing` },
  { id: 18, prompt: `${ESTILO} Nicoise salad with fresh tuna, green beans, potato, egg and olives` },
  { id: 19, prompt: `${ESTILO} Couscous bowl with roasted vegetables and goat cheese crumbles` },
  { id: 20, prompt: `${ESTILO} White bean salad with sun-dried tomatoes, rosemary and olive oil` },
  // PARA JUNTADAS (21-30)
  { id: 21, prompt: `${ESTILO} Waldorf salad with chicken, celery, grapes, walnuts and creamy dressing` },
  { id: 22, prompt: `${ESTILO} Burrata salad with heirloom tomatoes, pistachios, basil and olive oil` },
  { id: 23, prompt: `${ESTILO} Fig and prosciutto salad on rocket leaves with balsamic glaze` },
  { id: 24, prompt: `${ESTILO} Watermelon salad with feta cheese, fresh mint and lime vinaigrette` },
  { id: 25, prompt: `${ESTILO} Roasted beet salad with orange segments, walnuts and goat cheese` },
  { id: 26, prompt: `${ESTILO} Smoked salmon salad with endive, capers and creamy dressing` },
  { id: 27, prompt: `${ESTILO} Roasted pear salad with gorgonzola, caramelized walnuts on arugula` },
  { id: 28, prompt: `${ESTILO} Prawn and mango salad with avocado and coconut lime dressing` },
  { id: 29, prompt: `${ESTILO} Asparagus salad with poached egg, shaved parmesan and lemon dressing` },
  { id: 30, prompt: `${ESTILO} Black quinoa salad with fresh raspberries and toasted almonds` },
  // SIN LECHUGA (31-40)
  { id: 31, prompt: `${ESTILO} Gourmet coleslaw with purple cabbage, carrot, ginger and sesame dressing` },
  { id: 32, prompt: `${ESTILO} Panzanella salad with tomatoes, cucumber, red onion and toasted bread` },
  { id: 33, prompt: `${ESTILO} Raw broccoli salad with lemon, garlic, toasted almonds and parmesan` },
  { id: 34, prompt: `${ESTILO} Zucchini ribbons salad with pesto sauce and pine nuts` },
  { id: 35, prompt: `${ESTILO} Raw beetroot salad with orange segments and mixed seeds` },
  { id: 36, prompt: `${ESTILO} Roasted carrot salad with tahini sauce and fresh cilantro` },
  { id: 37, prompt: `${ESTILO} Fennel salad with orange slices, black olives and parmesan shavings` },
  { id: 38, prompt: `${ESTILO} Apple, celery and walnut salad with yogurt dressing` },
  { id: 39, prompt: `${ESTILO} Cucumber yogurt salad with fresh mint and sesame seeds` },
  { id: 40, prompt: `${ESTILO} Grilled corn salad with roasted peppers, red onion and lime` },
  // FRUTALES Y AGRIDULCES (41-50)
  { id: 41, prompt: `${ESTILO} Strawberry spinach salad with almonds and balsamic vinaigrette` },
  { id: 42, prompt: `${ESTILO} Mango cucumber salad with peanuts and Asian dressing` },
  { id: 43, prompt: `${ESTILO} Grilled peach salad with rocket leaves and prosciutto` },
  { id: 44, prompt: `${ESTILO} Moroccan orange salad with black olives and red onion` },
  { id: 45, prompt: `${ESTILO} Grape, pear and blue cheese salad with walnuts` },
  { id: 46, prompt: `${ESTILO} Melon and prosciutto salad with fresh mint leaves` },
  { id: 47, prompt: `${ESTILO} Kiwi spinach salad with seeds and ginger dressing` },
  { id: 48, prompt: `${ESTILO} Green apple, celery and walnut salad with honey dressing` },
  { id: 49, prompt: `${ESTILO} Mandarin and endive salad with toasted pine nuts` },
  { id: 50, prompt: `${ESTILO} Raspberry arugula salad with brie cheese and raspberry vinaigrette` },
];

// 10 ADEREZOS — IDs numéricos (1-10) para coincidir con aderezos-ensaladas.json
const aderezos = [
  { id: 1,  prompt: `${ESTILO} Caesar dressing in a small glass jar with parmesan and lemon, creamy white sauce` },
  { id: 2,  prompt: `${ESTILO} Tahini lemon dressing in a ceramic bowl with sesame seeds and lemon zest` },
  { id: 3,  prompt: `${ESTILO} Honey mustard dressing in a small bottle, golden yellow color with mustard seeds` },
  { id: 4,  prompt: `${ESTILO} Greek yogurt dill dressing in a white bowl with fresh dill garnish` },
  { id: 5,  prompt: `${ESTILO} Balsamic vinaigrette in a small glass jar with olive oil and herbs` },
  { id: 6,  prompt: `${ESTILO} Sesame ginger Asian dressing in a small bowl with sesame seeds` },
  { id: 7,  prompt: `${ESTILO} Blue cheese dressing in a ceramic cup with crumbled blue cheese on top` },
  { id: 8,  prompt: `${ESTILO} Hummus dressing in a white bowl drizzled with olive oil and paprika` },
  { id: 9,  prompt: `${ESTILO} Raspberry vinaigrette in a glass jar with fresh raspberries beside it` },
  { id: 10, prompt: `${ESTILO} Romesco sauce in a ceramic bowl with roasted peppers and almonds` },
];

// GENERAR RECETAS
console.log('\n🥗 Generando imágenes de ensaladas...\n');
for (const r of recetas) {
  const archivo = path.join(OUTPUT_DIR, `ensalada-${r.id}.jpg`);
  await generarImagen(r.prompt, archivo);
}

// GENERAR ADEREZOS
console.log('\n🫙 Generando imágenes de aderezos...\n');
for (const a of aderezos) {
  const archivo = path.join(ADEREZOS_DIR, `aderezo-${a.id}.jpg`);
  await generarImagen(a.prompt, archivo);
}

console.log('\n✅ Todas las imágenes generadas.');
console.log(`📁 Ensaladas: ${OUTPUT_DIR}`);
console.log(`📁 Aderezos:  ${ADEREZOS_DIR}`);
