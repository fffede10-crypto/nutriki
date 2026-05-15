'use client'

import Link from 'next/link'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'

const alergias = [
  {
    id: 'lacteos',
    emoji: '🥛',
    titulo: 'Sin lácteos',
    color: 'bg-blue-50 border-blue-200',
    headerColor: 'bg-blue-500',
    evitar: ['Leche de vaca', 'Queso', 'Yogur', 'Manteca', 'Crema', 'Dulce de leche'],
    sustituir: [
      { de: 'Leche de vaca', por: 'Leche de avena, coco o almendras (igual cantidad)' },
      { de: 'Manteca', por: 'Aceite de coco o girasol (usar 3/4 de la cantidad)' },
      { de: 'Yogur', por: 'Yogur de coco o de soja (misma cantidad)' },
      { de: 'Queso crema', por: 'Queso de anacardos o tofu cremoso' },
    ],
    etiquetas: ['Proteína de leche', 'Caseína', 'Lactosuero', 'Whey', 'Suero de leche'],
    filtro: '?especial=sin_lacteos',
  },
  {
    id: 'tacc',
    emoji: '🌾',
    titulo: 'Sin TACC (celíacos)',
    color: 'bg-amber-50 border-amber-200',
    headerColor: 'bg-amber-500',
    evitar: ['Trigo', 'Avena', 'Cebada', 'Centeno', 'Sémola', 'Pan común', 'Pasta regular'],
    sustituir: [
      { de: 'Harina de trigo', por: 'Harina de arroz, mandioca o garbanzo (misma cantidad)' },
      { de: 'Pan rallado', por: 'Harina de arroz o semillas de lino molidas' },
      { de: 'Pasta regular', por: 'Pasta de arroz o lentejas (reducir cocción 2 min)' },
      { de: 'Avena', por: 'Avena certificada sin TACC (misma cantidad)' },
    ],
    etiquetas: ['Gluten', 'Almidón de trigo', 'Malta', 'Extracto de malta'],
    filtro: '?especial=sin_gluten',
  },
  {
    id: 'huevo',
    emoji: '🥚',
    titulo: 'Sin huevo',
    color: 'bg-yellow-50 border-yellow-200',
    headerColor: 'bg-yellow-500',
    evitar: ['Huevo entero', 'Clara', 'Yema', 'Mayonesa', 'Merengue', 'Huevo en polvo'],
    sustituir: [
      { de: '1 huevo (unir)', por: '1 cda de semillas de chía + 3 cdas de agua (reposar 5 min)' },
      { de: '1 huevo (unir)', por: 'Banana pisada (1/4 de banana madura)' },
      { de: '1 huevo (esponjar)', por: '1 cda de semillas de lino + 3 cdas de agua' },
      { de: '1 huevo (esponjar)', por: '1 cda de vinagre de manzana + 1/4 cdita bicarbonato' },
    ],
    etiquetas: ['Ovoalbúmina', 'Lecitina de huevo', 'Lisozima', 'Globulina'],
    filtro: '?especial=vegetariana',
  },
  {
    id: 'frutossecos',
    emoji: '🥜',
    titulo: 'Sin frutos secos',
    color: 'bg-orange-50 border-orange-200',
    headerColor: 'bg-orange-500',
    evitar: ['Maní', 'Nueces', 'Almendras', 'Avellanas', 'Pistachos', 'Castañas', 'Mantequilla de maní'],
    sustituir: [
      { de: 'Nueces o almendras', por: 'Semillas de girasol o zapallo (igual cantidad)' },
      { de: 'Mantequilla de maní', por: 'Pasta de girasol o semillas de zapallo tostadas' },
      { de: 'Leche de almendras', por: 'Leche de avena o arroz' },
      { de: 'Harina de almendras', por: 'Harina de semillas de girasol o coco' },
    ],
    etiquetas: ['Trazas de frutos secos', 'Puede contener nueces', 'Elaborado en planta con frutos secos'],
    filtro: '?todas=true',
  },
]

function AlergiaCard({ a }: { a: typeof alergias[0] }) {
  return (
    <div className={`${a.color} border rounded-2xl overflow-hidden`}>
      <div className={`${a.headerColor} text-white px-4 py-3 flex items-center gap-2`}>
        <span className="text-2xl">{a.emoji}</span>
        <h3 className="font-bold text-base">{a.titulo}</h3>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Qué evitar</p>
          <div className="flex flex-wrap gap-1.5">
            {a.evitar.map((item) => (
              <span key={item} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Cómo sustituir</p>
          <div className="space-y-1.5">
            {a.sustituir.map((s, i) => (
              <div key={i} className="bg-white rounded-xl px-3 py-2 border border-gray-100">
                <span className="text-xs text-gray-400">{s.de}</span>
                <br />
                <span className="text-xs font-semibold text-texto">→ {s.por}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Buscá en la etiqueta</p>
          <p className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2 border border-red-100">
            ⚠️ {a.etiquetas.join(' · ')}
          </p>
        </div>
        <Link
          href={`/recetas${a.filtro}`}
          className="block text-center bg-verde text-white text-sm font-bold py-2.5 rounded-xl"
        >
          Ver recetas {a.titulo.toLowerCase()} →
        </Link>
      </div>
    </div>
  )
}

function AlergiasContent() {
  return (
    <div className="min-h-screen bg-crema pb-24">
      <div className="bg-verde text-white px-4 pt-10 pb-6">
        <Link href="/guias" className="flex items-center gap-1.5 text-white/70 text-sm mb-4 hover:text-white transition-colors">
          ← Volver a guías
        </Link>
        <div className="text-3xl mb-2">🌿</div>
        <h1 className="text-2xl font-bold mb-1">Recetas especiales para chicos con alergias</h1>
        <p className="text-sm text-white/80">Qué evitar, cómo sustituir y qué buscar en las etiquetas.</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Intro */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="font-bold text-texto mb-2">Las 4 alergias más comunes en niños</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            La leche, el huevo, el trigo y los frutos secos representan el <strong>90% de las alergias alimentarias</strong> en niños. La buena noticia: con los sustitutos correctos, casi cualquier receta se puede adaptar sin perder sabor.
          </p>
        </div>

        {alergias.map((a) => (
          <AlergiaCard key={a.id} a={a} />
        ))}

        {/* Nota */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-sm text-amber-800">
            <strong>Importante:</strong> Estas guías son orientativas. Siempre consultá con el médico o nutricionista de tu hijo para confirmar el diagnóstico y las restricciones específicas.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default function AlergiasPage() {
  return (
    <AuthGuard>
      <AlergiasContent />
    </AuthGuard>
  )
}
