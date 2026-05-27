'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import EnsaladasGuard from '@/components/EnsaladasGuard'
import EnsaladasNav from '@/components/EnsaladasNav'
import { AderezoEnsalada, RecetaEnsalada } from '@/types/ensaladas'

const catBg: Record<string, string> = {
  express: '#E8F5E9',
  plato_completo: '#FFF3E0',
  juntada: '#FCE4EC',
  sin_lechuga: '#E3F2FD',
  frutal: '#F3E5F5',
}

function AderezoCon({ receta }: { receta: RecetaEnsalada }) {
  return (
    <Link href={`/ensaladas-gourmet/recetas/${receta.id}`} className="flex-none w-32">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm active:scale-[0.98] transition-transform">
        <div className="h-20 overflow-hidden" style={{ backgroundColor: catBg[receta.categoria] || '#E8F5E9' }}>
          {receta.imagen_url
            ? <img src={receta.imagen_url} alt={receta.nombre} className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-3xl">🥗</div>
          }
        </div>
        <div className="p-2">
          <p className="text-[10px] font-bold line-clamp-2" style={{ color: '#1C1917' }}>{receta.nombre}</p>
        </div>
      </div>
    </Link>
  )
}

function AderezDetalleContent() {
  const { id } = useParams()
  const router = useRouter()
  const [aderezo, setAderezo] = useState<AderezoEnsalada | null>(null)
  const [recetasRelacionadas, setRecetasRelacionadas] = useState<RecetaEnsalada[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) cargar(Number(id))
  }, [id])

  async function cargar(aId: number) {
    const { data } = await supabase.from('aderezos_ensaladas').select('*').eq('id', aId).single()
    if (!data) { router.replace('/ensaladas-gourmet/aderezos'); return }
    const a = data as AderezoEnsalada
    setAderezo(a)

    if (a.ensaladas_que_combina?.length > 0) {
      const { data: recs } = await supabase
        .from('recetas_ensaladas')
        .select('*')
        .in('id', a.ensaladas_que_combina.slice(0, 6))
      if (recs) setRecetasRelacionadas(recs as RecetaEnsalada[])
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="text-center"><div className="text-4xl mb-2">🫙</div><p style={{ color: '#2D6A4F' }}>Cargando...</p></div>
      </div>
    )
  }

  if (!aderezo) return null

  return (
    <div className="min-h-screen pb-28" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-lg mx-auto">

        {/* Hero */}
        <div className="relative h-48 overflow-hidden" style={{ backgroundColor: '#E8F5E9' }}>
          {aderezo.imagen_url
            ? <img src={aderezo.imagen_url} alt={aderezo.nombre} className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-8xl">🫙</div>
          }
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md text-gray-600"
          >
            ←
          </button>
        </div>

        <div className="px-4 pt-4">

          {/* Nombre */}
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#52B788', color: 'white' }}>
            Aderezo
          </span>
          <h1 className="text-xl font-bold mt-2 mb-1" style={{ color: '#1C1917' }}>{aderezo.nombre}</h1>
          {aderezo.descripcion && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{aderezo.descripcion}</p>
          )}

          <div className="flex gap-3 mb-5">
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">⏱ {aderezo.tiempo_preparacion} min</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{aderezo.rinde}</span>
          </div>

          {/* Ingredientes */}
          <div className="mb-5">
            <h2 className="font-bold text-base mb-3" style={{ color: '#1C1917' }}>Ingredientes</h2>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              {aderezo.ingredientes.map((ing, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="w-2 h-2 rounded-full flex-none" style={{ backgroundColor: '#52B788' }} />
                  <span className="text-sm flex-1" style={{ color: '#1C1917' }}>
                    {ing.cantidad && <strong>{ing.cantidad} {ing.unidad} </strong>}
                    {ing.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pasos */}
          <div className="mb-5">
            <h2 className="font-bold text-base mb-3" style={{ color: '#1C1917' }}>Preparación</h2>
            <div className="flex flex-col gap-3">
              {aderezo.pasos.map((paso, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm flex-none mt-0.5"
                    style={{ backgroundColor: '#2D6A4F' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{paso}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tip del chef */}
          {aderezo.tip_chef && (
            <div className="rounded-2xl p-4 mb-5" style={{ backgroundColor: '#E8F5E9', borderLeft: '4px solid #52B788' }}>
              <p className="text-xs font-bold mb-1" style={{ color: '#2D6A4F' }}>💡 Tip del chef</p>
              <p className="text-sm text-gray-700">{aderezo.tip_chef}</p>
            </div>
          )}

          {/* Usos sugeridos */}
          <div className="rounded-2xl p-4 mb-5" style={{ backgroundColor: '#FFF3E0', borderLeft: '4px solid #F4A261' }}>
            <p className="text-xs font-bold mb-1" style={{ color: '#E65100' }}>🍴 También lo podés usar en...</p>
            <p className="text-sm text-gray-700">
              Como dip para tostadas o crackers, para marinar pollo o pescado, sobre vegetales asados, en wraps y sándwiches.
            </p>
          </div>

          {/* Ensaladas que combina */}
          {recetasRelacionadas.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold text-base mb-3" style={{ color: '#1C1917' }}>
                Ensaladas que combina perfectamente
              </h2>
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex gap-3 pb-1" style={{ width: 'max-content' }}>
                  {recetasRelacionadas.map((r) => (
                    <AderezoCon key={r.id} receta={r} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <Link
            href="/ensaladas-gourmet/aderezos"
            className="block text-center py-3 rounded-2xl font-bold text-sm border-2"
            style={{ borderColor: '#2D6A4F', color: '#2D6A4F' }}
          >
            ← Ver todos los aderezos
          </Link>

        </div>
      </div>
      <EnsaladasNav />
    </div>
  )
}

export default function AderezDetallePage() {
  return (
    <EnsaladasGuard>
      <AderezDetalleContent />
    </EnsaladasGuard>
  )
}
