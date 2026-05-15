'use client'

import Link from 'next/link'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'

const semaforo = [
  {
    color: 'verde',
    bg: 'bg-green-50 border-green-200',
    headerBg: 'bg-verde',
    emoji: '🥦',
    titulo: 'Verde — Las base nutritiva',
    ejemplos: ['Espinaca', 'Pepino', 'Apio', 'Lechuga', 'Perejil'],
    tip: 'Empezá con poca cantidad. Con el tiempo podés ir aumentando.',
  },
  {
    color: 'amarillo',
    bg: 'bg-amber-50 border-amber-200',
    headerBg: 'bg-amber-500',
    emoji: '🥭',
    titulo: 'Amarillo — El endulzante natural',
    ejemplos: ['Mango', 'Ananá', 'Pera', 'Durazno', 'Banana'],
    tip: 'Son los que más dulzura dan. Perfectos para camuflar el verde.',
  },
  {
    color: 'rojo',
    bg: 'bg-red-50 border-red-200',
    headerBg: 'bg-red-500',
    emoji: '🍓',
    titulo: 'Rojo — Los antioxidantes',
    ejemplos: ['Frutilla', 'Sandía', 'Frambuesa', 'Cereza', 'Remolacha'],
    tip: 'Dan color llamativo que llama la atención de los chicos.',
  },
]

const combinaciones = [
  {
    nombre: 'El clásico verde',
    emoji: '💚',
    base: 'Espinaca + mango + banana + agua',
    variaciones: ['Cambiar mango por ananá', 'Agregar jengibre rallado', 'Usar leche de coco'],
  },
  {
    nombre: 'Poción del superhéroe',
    emoji: '❤️',
    base: 'Remolacha + manzana + zanahoria + naranja',
    variaciones: ['Agregar jengibre', 'Cambiar manzana por pera', 'Agregar limón'],
  },
  {
    nombre: 'Tropical energizante',
    emoji: '💛',
    base: 'Mango + naranja + cúrcuma + pimienta negra',
    variaciones: ['Agregar banana para más cremosidad', 'Usar jugo de piña', 'Agregar coco rallado'],
  },
  {
    nombre: 'Frío de verano',
    emoji: '💙',
    base: 'Sandía + limón + menta + agua',
    variaciones: ['Agregar pepino', 'Cambiar menta por albahaca', 'Congelar en paletas'],
  },
  {
    nombre: 'El cremoso',
    emoji: '🤍',
    base: 'Frutilla + yogur + banana + miel',
    variaciones: ['Usar yogur de coco', 'Cambiar frutilla por durazno', 'Agregar avena'],
  },
]

const tips = [
  { emoji: '⏰', titulo: '¿Cuándo darlo?', texto: 'Con el desayuno o merienda, nunca solo como comida principal. La fibra se absorbe mejor si van con algo sólido.' },
  { emoji: '🥤', titulo: '¿En qué vaso?', texto: 'Bombillas gruesas para los smoothies. Vasos transparentes para que vean el color y les dé curiosidad.' },
  { emoji: '🫀', titulo: '¿Con o sin pulpa?', texto: 'Con pulpa siempre que sea posible: la fibra es clave para la digestión. Colar solo si el niño rechaza la textura.' },
  { emoji: '🌡️', titulo: '¿A qué temperatura?', texto: 'Frío es más aceptado. Podés agregar hielo o usar fruta congelada para temperatura y cremosidad sin diluir.' },
]

function JugosContent() {
  return (
    <div className="min-h-screen bg-crema pb-24">
      <div className="bg-verde text-white px-4 pt-10 pb-6">
        <Link href="/guias" className="flex items-center gap-1.5 text-white/70 text-sm mb-4 hover:text-white transition-colors">
          ← Volver a guías
        </Link>
        <div className="text-3xl mb-2">🥤</div>
        <h1 className="text-2xl font-bold mb-1">Jugos y licuados que los chicos toman solos</h1>
        <p className="text-sm text-white/80">La regla del semáforo y 5 combinaciones base que funcionan.</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Por qué naturales */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="font-bold text-texto mb-2">¿Por qué naturales en vez de jugo de caja?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Un jugo de caja típico tiene <strong>hasta 8 cucharaditas de azúcar</strong> y prácticamente ninguna fibra. El jugo casero retiene vitaminas, fibra y enzimas vivas. Además, el sabor es completamente distinto una vez que se acostumbran al real.
          </p>
        </div>

        {/* Semáforo */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-1">La regla del semáforo</h2>
          <p className="text-sm text-gray-500 mb-3">Combiná siempre los 3 colores para un licuado completo.</p>
          <div className="space-y-3">
            {semaforo.map((s) => (
              <div key={s.color} className={`${s.bg} border rounded-2xl overflow-hidden`}>
                <div className={`${s.headerBg} text-white px-4 py-2.5 flex items-center gap-2`}>
                  <span className="text-xl">{s.emoji}</span>
                  <h3 className="font-bold text-sm">{s.titulo}</h3>
                </div>
                <div className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {s.ejemplos.map((e) => (
                      <span key={e} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{e}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 italic">{s.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cómo introducir verduras */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <h2 className="font-bold text-texto mb-2">🥦 Cómo introducir verduras sin que se den cuenta</h2>
          <ol className="space-y-2">
            {[
              'Empezá con 1 hoja chica de espinaca y 2 tazas de fruta. Irás aumentando la proporción semana a semana.',
              'Usá frutas muy dulces (mango, ananá) que dominen el sabor.',
              'Servilo en vaso opaco o con bombilla de color para que no vean el verde.',
              'Llamalo "licuado del superhéroe" o "poción mágica" antes de decir qué lleva.',
              'Una vez que lo tome bien, recién ahí revelar el ingrediente secreto.',
            ].map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="flex-none w-5 h-5 bg-verde text-white rounded-full text-xs flex items-center justify-center font-bold mt-0.5">{i + 1}</span>
                <span>{tip}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 5 combinaciones */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">5 combinaciones base (con variaciones)</h2>
          <div className="space-y-3">
            {combinaciones.map((c) => (
              <div key={c.nombre} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{c.emoji}</span>
                  <h3 className="font-bold text-texto text-sm">{c.nombre}</h3>
                </div>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-xl px-3 py-2 mb-2">{c.base}</p>
                <p className="text-xs text-gray-400 font-semibold mb-1">Variaciones:</p>
                <ul className="space-y-0.5">
                  {c.variaciones.map((v, i) => (
                    <li key={i} className="text-xs text-gray-500">· {v}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">Tips prácticos</h2>
          <div className="space-y-2">
            {tips.map((t) => (
              <div key={t.titulo} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{t.emoji}</span>
                  <h3 className="font-bold text-texto text-sm">{t.titulo}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{t.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Link
          href="/recetas?cat=jugo"
          className="block bg-verde text-white text-center font-bold py-4 rounded-2xl active:scale-[0.99] transition-transform"
        >
          Ver jugos y licuados →
        </Link>
      </div>

      <BottomNav />
    </div>
  )
}

export default function JugosPage() {
  return (
    <AuthGuard>
      <JugosContent />
    </AuthGuard>
  )
}
