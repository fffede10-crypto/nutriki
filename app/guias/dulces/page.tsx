'use client'

import Link from 'next/link'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'

const endulzantes = [
  {
    nombre: 'Banana madura',
    emoji: '🍌',
    equiv: '1 banana = reemplaza 1/4 taza de azúcar',
    cuando: 'Muffins, pancakes, helados, batidos',
    ventaja: 'Suma fibra y potasio. Funciona mejor cuanto más madura esté.',
  },
  {
    nombre: 'Miel',
    emoji: '🍯',
    equiv: '3/4 taza de miel = 1 taza de azúcar (reducir líquido de la receta)',
    cuando: 'Tortas, muffins, galletitas, dressings',
    ventaja: 'Tiene propiedades antibacterianas. No dar a menores de 1 año.',
  },
  {
    nombre: 'Azúcar mascabo',
    emoji: '🤎',
    equiv: '1 a 1 en reemplazo del azúcar blanca',
    cuando: 'Cualquier receta dulce',
    ventaja: 'Conserva minerales (hierro, calcio) que el refinado pierde.',
  },
  {
    nombre: 'Dátiles',
    emoji: '🫘',
    equiv: '1 taza de dátiles hidratados + 1/4 taza agua = 1 taza de azúcar',
    cuando: 'Brownies, energy balls, salsas dulces',
    ventaja: 'Rico en hierro y fibra. Le da textura fudgy a los brownies.',
  },
  {
    nombre: 'Stevia',
    emoji: '🌱',
    equiv: '1 cdita de stevia = 1/2 taza de azúcar (varía por marca)',
    cuando: 'Bebidas, yogures, flanes',
    ventaja: 'Cero calorías. No funciona para dar volumen ni crocante.',
  },
]

const reemplazos = [
  { original: 'Azúcar blanca', por: 'Azúcar mascabo (misma cantidad) o miel (3/4 cantidad)' },
  { original: 'Harina blanca', por: 'Harina integral (misma cantidad) o de avena (misma)' },
  { original: 'Aceite vegetal', por: 'Puré de manzana o banana (reduce grasas 50%)' },
  { original: 'Manteca', por: 'Aceite de coco derretido (3/4 de la cantidad)' },
  { original: 'Crema de leche', por: 'Yogur griego entero (misma cantidad)' },
]

const ideasRapidas = [
  { tiempo: '5 min', idea: 'Banana con chocolate derretido y granola' },
  { tiempo: '10 min', idea: 'Mousse de chocolate con palta y cacao' },
  { tiempo: '10 min', idea: 'Helado de banana congelada con maní' },
  { tiempo: '10 min', idea: 'Paletas de frutas mixtas congeladas' },
  { tiempo: '15 min', idea: 'Bolitas de avena, banana y cacao' },
  { tiempo: '20 min', idea: 'Tortitas de ricota con mermelada' },
  { tiempo: '25 min', idea: 'Muffins de zanahoria y naranja' },
  { tiempo: '30 min', idea: 'Galletitas de avena y pasas' },
]

function DulcesContent() {
  return (
    <div className="min-h-screen bg-crema pb-24">
      <div className="bg-verde text-white px-4 pt-10 pb-6">
        <Link href="/guias" className="flex items-center gap-1.5 text-white/70 text-sm mb-4 hover:text-white transition-colors">
          ← Volver a guías
        </Link>
        <div className="text-3xl mb-2">🍯</div>
        <h1 className="text-2xl font-bold mb-1">Dulces sin culpa que los chicos piden repetir</h1>
        <p className="text-sm text-white/80">Endulzantes naturales y cómo adaptar cualquier postre.</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Por qué reducir azúcar */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="font-bold text-texto mb-2">¿Por qué reducir el azúcar refinada?</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            El azúcar refinada sube la glucemia rápidamente y la baja igual de rápido, generando irritabilidad, falta de concentración y más hambre. Los chicos en edad escolar consumen en promedio el <strong>triple</strong> de la cantidad recomendada.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            La buena noticia: reducir el azúcar en un 25-30% en cualquier receta generalmente no se nota en el sabor, y los endulzantes naturales suman nutrientes que el azúcar blanca no tiene.
          </p>
        </div>

        {/* 5 endulzantes */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">5 endulzantes naturales</h2>
          <div className="space-y-3">
            {endulzantes.map((e) => (
              <div key={e.nombre} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{e.emoji}</span>
                  <h3 className="font-bold text-texto">{e.nombre}</h3>
                </div>
                <div className="space-y-1.5">
                  <div className="bg-amber-50 rounded-xl px-3 py-2">
                    <p className="text-xs font-bold text-amber-700 mb-0.5">Equivalencia</p>
                    <p className="text-xs text-amber-800">{e.equiv}</p>
                  </div>
                  <p className="text-xs text-gray-500"><strong>Ideal para:</strong> {e.cuando}</p>
                  <p className="text-xs text-verde"><strong>Ventaja:</strong> {e.ventaja}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reemplazos para adaptar recetas */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">Cómo adaptar cualquier receta dulce</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-2 bg-naranja text-white text-xs font-bold px-3 py-2">
              <span>En lugar de...</span>
              <span>Usá...</span>
            </div>
            {reemplazos.map((r, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 px-3 py-2.5 text-xs border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <span className="text-gray-500 pr-2">{r.original}</span>
                <span className="text-texto font-medium">{r.por}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8 ideas rápidas */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">8 postres saludables que se hacen rápido</h2>
          <div className="space-y-2">
            {ideasRapidas.map((idea, i) => (
              <div key={i} className="bg-white rounded-xl px-4 py-3 border border-gray-100 flex items-center gap-3">
                <span className="flex-none bg-verde/10 text-verde text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                  {idea.tiempo}
                </span>
                <span className="text-sm text-texto">{idea.idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Link
          href="/recetas?cat=postre"
          className="block bg-verde text-white text-center font-bold py-4 rounded-2xl active:scale-[0.99] transition-transform"
        >
          Ver postres saludables →
        </Link>
      </div>

      <BottomNav />
    </div>
  )
}

export default function DulcesPage() {
  return (
    <AuthGuard>
      <DulcesContent />
    </AuthGuard>
  )
}
