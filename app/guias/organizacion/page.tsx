'use client'

import Link from 'next/link'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'

const freezerData = [
  { alimento: 'Milanesas crudas', heladera: '2 días', freezer: '3 meses' },
  { alimento: 'Albóndigas y hamburguesas', heladera: '2 días', freezer: '3 meses' },
  { alimento: 'Sopas y caldos', heladera: '3 días', freezer: '3 meses' },
  { alimento: 'Arroz cocido', heladera: '3 días', freezer: '1 mes' },
  { alimento: 'Tarta de verdura', heladera: '3 días', freezer: '2 meses' },
  { alimento: 'Muffins y budines', heladera: '2 días', freezer: '2 meses' },
  { alimento: 'Bolitas de avena', heladera: '5 días', freezer: '2 meses' },
  { alimento: 'Guisos y estofados', heladera: '3 días', freezer: '3 meses' },
  { alimento: 'Salsa de tomate', heladera: '5 días', freezer: '3 meses' },
  { alimento: 'Puré de papa', heladera: '2 días', freezer: '1 mes' },
]

const pasos = [
  {
    n: '1',
    titulo: 'Elegí 5 recetas para la semana',
    desc: 'Abrí el plan semanal y completá el menú del lunes al viernes. Pensá en un plato "ancla" que rinda para dos días.',
  },
  {
    n: '2',
    titulo: 'Generá la lista de compras',
    desc: 'Desde el plan semanal podés agregar los ingredientes de cada receta a la lista de compras con un clic.',
  },
  {
    n: '3',
    titulo: 'Cocinás las bases el domingo',
    desc: 'Cocé una tanda grande de arroz, asá verduras en el horno y preparás el pollo desmenuzado. Son la base de varias comidas.',
  },
  {
    n: '4',
    titulo: 'Dividís en porciones y guardás',
    desc: 'Usá recipientes de vidrio con tapa o bolsas de freezer. Etiquetá con fecha y contenido. El orden salva vidas.',
  },
]

const tips = [
  { emoji: '🧊', texto: 'Congelá en porciones individuales: descongelás solo lo que necesitás.' },
  { emoji: '🏷️', texto: 'Etiquetá siempre con fecha y contenido. En 3 semanas no vas a recordar qué hay.' },
  { emoji: '📦', texto: 'Los recipientes de vidrio son los mejores: no absorben olores y van al microondas.' },
  { emoji: '🔄', texto: 'Principio FIFO: lo más viejo adelante, lo nuevo atrás. Igual que el supermercado.' },
  { emoji: '❄️', texto: 'El freezer a -18°C conserva los alimentos de forma óptima. Revisá la temperatura.' },
]

function OrganizacionContent() {
  return (
    <div className="min-h-screen bg-crema pb-24">
      {/* Header */}
      <div className="bg-verde text-white px-4 pt-10 pb-6">
        <Link href="/guias" className="flex items-center gap-1.5 text-white/70 text-sm mb-4 hover:text-white transition-colors">
          ← Volver a guías
        </Link>
        <div className="text-3xl mb-2">📋</div>
        <h1 className="text-2xl font-bold mb-1">Organizá la semana en 30 minutos</h1>
        <p className="text-sm text-white/80">Cocinás una vez, comés sano toda la semana sin improvisar.</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Intro */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="font-bold text-texto mb-2">¿Por qué cocinar en batch?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Cocinar en cantidad una vez a la semana ahorra hasta <strong>4 horas de cocina diaria</strong> y reduce el desperdicio de alimentos a la mitad. Las familias que planifican gastan en promedio un <strong>30% menos</strong> en comida porque compran lo que realmente necesitan.
          </p>
        </div>

        {/* Paso a paso */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">El método del domingo</h2>
          <div className="space-y-3">
            {pasos.map((p) => (
              <div key={p.n} className="bg-white rounded-2xl p-4 border border-gray-100 flex gap-3">
                <div className="flex-none w-8 h-8 bg-verde text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {p.n}
                </div>
                <div>
                  <p className="font-bold text-texto text-sm mb-1">{p.titulo}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabla de congelamiento */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">¿Qué se puede congelar?</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-3 bg-verde text-white text-xs font-bold px-3 py-2">
              <span>Alimento</span>
              <span className="text-center">🧊 Heladera</span>
              <span className="text-center">❄️ Freezer</span>
            </div>
            {freezerData.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 px-3 py-2.5 text-xs ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100 last:border-0`}
              >
                <span className="text-texto font-medium">{row.alimento}</span>
                <span className="text-center text-gray-500">{row.heladera}</span>
                <span className="text-center text-verde font-semibold">{row.freezer}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tips de conservación */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">Tips de conservación</h2>
          <div className="space-y-2">
            {tips.map((t, i) => (
              <div key={i} className="bg-white rounded-xl px-4 py-3 border border-gray-100 flex gap-3 items-start">
                <span className="text-xl flex-none">{t.emoji}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{t.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Link
          href="/plan-semanal"
          className="block bg-verde text-white text-center font-bold py-4 rounded-2xl active:scale-[0.99] transition-transform"
        >
          Ir al plan semanal →
        </Link>
      </div>

      <BottomNav />
    </div>
  )
}

export default function OrganizacionPage() {
  return (
    <AuthGuard>
      <OrganizacionContent />
    </AuthGuard>
  )
}
