import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Listar modelos disponibles
const models = await openai.models.list();
const imageModels = models.data.filter(m =>
  m.id.includes('dall') || m.id.includes('gpt-image')
);
console.log('Modelos de imagen disponibles:');
console.log(imageModels.map(m => m.id));

// Probar con gpt-image-1 si está disponible
if (imageModels.length > 0) {
  console.log('\nProbando con:', imageModels[0].id);
  const response = await openai.images.generate({
    model: imageModels[0].id,
    prompt: 'A fresh green salad in a white bowl',
    n: 1,
    size: '1024x1024',
  });
  console.log('✅ Imagen generada:', response.data[0].url);
}
