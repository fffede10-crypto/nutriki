'use client'

import { useState } from 'react'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'

const GRUPOS = [
  { key: '1-2', label: '1-2 años', emoji: '👶' },
  { key: '3-5', label: '3-5 años', emoji: '🧒' },
  { key: '6-9', label: '6-9 años', emoji: '👦' },
  { key: '10-12', label: '10-12 años', emoji: '🧑' },
]

const contenido: Record<string, { titulo: string; items: { cat: string; detalle: string }[] }> = {
  '1-2': {
    titulo: 'Alimentación de 1 a 2 años',
    items: [
      { cat: '🥛 Lácteos', detalle: 'Leche entera, yogur natural y queso. Al menos 500ml de leche por día. Evitá la leche descremada hasta los 2 años.' },
      { cat: '🥩 Proteínas', detalle: 'Carnes blandas bien cocidas, pescado sin espinas, huevo bien cocido, legumbres bien procesadas.' },
      { cat: '🥕 Verduras', detalle: 'Todas las verduras cocidas y picadas pequeño. Zanahoria, zapallo, papa, choclo. Empezá de a una para detectar intolerancias.' },
      { cat: '🍌 Frutas', detalle: 'Banana, pera, manzana rallada o cocida. Evitá frutas con carozo enteras por riesgo de atragantamiento.' },
      { cat: '🌾 Cereales', detalle: 'Arroz, fideos, polenta, avena. Panificados blandos. Evitá galletitas con sal y azúcar agregada.' },
      { cat: '⚠️ Evitá', detalle: 'Miel (hasta 1 año), mariscos, nueces enteras, gaseosas, jugos en caja, embutidos, comidas muy saladas o picantes.' },
    ],
  },
  '3-5': {
    titulo: 'Alimentación de 3 a 5 años',
    items: [
      { cat: '🥛 Lácteos', detalle: 'Leche (400-500ml/día), yogur, queso. Ya pueden consumir variedades más diversas.' },
      { cat: '🥩 Proteínas', detalle: 'Carnes en trozos pequeños, pescado 2 veces/semana, huevo 3-4 veces/semana, legumbres como lentejas o garbanzos.' },
      { cat: '🥦 Verduras', detalle: 'Incorporá colores distintos: verde (espinaca, brócoli), naranja (zanahoria, zapallo), rojo (tomate). Presentación creativa.' },
      { cat: '🍊 Frutas', detalle: 'Variedad de frutas frescas. Son excelentes para la merienda. Evitá jugos envasados: ofrecé la fruta entera.' },
      { cat: '🌾 Cereales', detalle: 'Preferí integrales: arroz integral, pan integral, avena. Moderá pastas y harinas refinadas.' },
      { cat: '💡 Tips', detalle: 'Esta edad es ideal para incorporar hábitos. Coman en familia, sin pantallas. El rechazo a alimentos nuevos es normal: ofrecé hasta 10-15 veces antes de concluir que "no le gusta".' },
    ],
  },
  '6-9': {
    titulo: 'Alimentación de 6 a 9 años',
    items: [
      { cat: '🧠 Concentración escolar', detalle: 'Desayuno completo antes de ir al colegio (cereal + fruta + lácteo). El hierro es clave: carnes rojas 3 veces/semana.' },
      { cat: '🥩 Proteínas', detalle: 'Necesidades aumentadas por el crecimiento. Alterná carnes, legumbres y huevos. El pollo y el pescado 2-3 veces/semana.' },
      { cat: '🦴 Calcio', detalle: 'Leche, yogur y queso todos los días. El calcio se deposita en los huesos en esta etapa. Es la ventana de oportunidad.' },
      { cat: '🎒 Vianda escolar', detalle: 'Sandwich integral + fruta + agua. Evitá snacks ultraprocesados, jugos en caja y alfajores. El agua es la mejor bebida.' },
      { cat: '⚡ Energía', detalle: 'Hidratos de carbono de calidad: arroz, papa, avena. Evitá azúcares simples antes de actividad física o escuela.' },
      { cat: '💡 Tips', detalle: 'Participación en la cocina aumenta la aceptación de alimentos nuevos. Que elijan qué verdura prefieren para la cena.' },
    ],
  },
  '10-12': {
    titulo: 'Alimentación de 10 a 12 años',
    items: [
      { cat: '🚀 Preadolescencia', detalle: 'Etapa de crecimiento acelerado. Las necesidades calóricas y de proteínas son mayores. No restringir sin causa médica.' },
      { cat: '🦴 Calcio y vitamina D', detalle: '3 porciones de lácteos diarias. Exposición solar 15-20 min/día para vitamina D. Son claves para el pico de masa ósea.' },
      { cat: '🩸 Hierro', detalle: 'Especialmente importante en niñas. Carnes rojas, legumbres, espinaca con limón o naranja. El hierro es esencial para la menstruación futura.' },
      { cat: '🧠 Cerebro', detalle: 'Omega-3 del pescado (salmón, atún, sardinas) para memoria y concentración. Ideal 2 veces/semana.' },
      { cat: '📵 Pantallas y comida', detalle: 'A esta edad la influencia de redes sociales en los hábitos alimenticios es fuerte. Comida en familia, sin pantallas, establece hábitos saludables.' },
      { cat: '💡 Tips', detalle: 'Enseñales a cocinar recetas simples. Que preparen su propia merienda y vianda. La autonomía en la cocina se traduce en mejores hábitos de adultos.' },
    ],
  },
}

function GuiaContent() {
  const [tab, setTab] = useState('1-2')
  const data = contenido[tab]

  return (
    <div className="min-h-screen bg-crema pb-20">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-2xl font-bold text-texto mb-1">Guía de alimentos</h1>
        <p className="text-gray-500 text-sm mb-5">Por edad y etapa del desarrollo</p>

        <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
          {GRUPOS.map((g) => (
            <button
              key={g.key}
              onClick={() => setTab(g.key)}
              className={`flex-none flex flex-col items-center px-4 py-2 rounded-xl transition-colors text-sm font-semibold ${
                tab === g.key ? 'bg-verde text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <span className="text-lg">{g.emoji}</span>
              <span>{g.label}</span>
            </button>
          ))}
        </div>

        <h2 className="text-xl font-bold text-verde mb-4">{data.titulo}</h2>

        <div className="space-y-3">
          {data.items.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-texto mb-1">{item.cat}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.detalle}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-sm text-amber-800">
            <strong>Recordá:</strong> Esta información es de carácter educativo. Para dudas sobre la alimentación específica de tu hijo, consultá con su pediatra o nutricionista.
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default function GuiaAlimentosPage() {
  return (
    <AuthGuard>
      <GuiaContent />
    </AuthGuard>
  )
}
