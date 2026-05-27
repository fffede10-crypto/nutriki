'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import EnsaladasGuard from '@/components/EnsaladasGuard'
import EnsaladasNav from '@/components/EnsaladasNav'
import { AderezoEnsalada } from '@/types/ensaladas'

function AderezosContent() {
  const [aderezos, setAderezos] = useState<AderezoEnsalada[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('aderezos_ensaladas').select('*').order('id').then(({ data }) => {
      if (data) setAderezos(data as AderezoEnsalada[])
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-lg mx-auto">

        <div className="px-4 pt-8 pb-4">
          <Link href="/ensaladas-gourmet" className="text-sm mb-2 block" style={{ color: '#2D6A4F' }}>← Inicio</Link>
          <h1 className="text-2xl font-bold" style={{ color: '#1C1917' }}>Aderezos</h1>
          <p className="text-gray-500 text-sm">El secreto que hace la diferencia</p>
        </div>

        {/* Banner info */}
        <div className="mx-4 mb-5 rounded-2xl p-4" style={{ backgroundColor: '#2D6A4F' }}>
          <p className="text-white font-bold text-sm">🫙 10 aderezos caseros</p>
          <p className="text-white text-xs opacity-80 mt-1">
            Cada uno rinde para 4 ensaladas. Se conservan en la heladera hasta 5 días.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-2">🫙</div>
            <p>Cargando aderezos...</p>
          </div>
        ) : (
          <div className="px-4 grid grid-cols-1 gap-3">
            {aderezos.map((a) => (
              <AderezoBigCard key={a.id} aderezo={a} />
            ))}
          </div>
        )}

      </div>
      <EnsaladasNav />
    </div>
  )
}

const PALETA = ['#E8F5E9', '#FFF3E0', '#FCE4EC', '#E3F2FD', '#F3E5F5', '#E0F7FA', '#FFF9C4', '#F1F8E9', '#EDE7F6', '#FBE9E7']

function AderezoBigCard({ aderezo }: { aderezo: AderezoEnsalada }) {
  const bg = PALETA[(aderezo.id - 1) % PALETA.length]

  return (
    <Link href={`/ensaladas-gourmet/aderezos/${aderezo.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm active:scale-[0.98] transition-transform">
        <div className="flex items-center gap-4 p-4">
          <div
            className="w-16 h-16 rounded-xl overflow-hidden flex-none"
            style={{ backgroundColor: bg }}
          >
            {aderezo.imagen_url
              ? <img src={aderezo.imagen_url} alt={aderezo.nombre} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center text-3xl">🫙</div>
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold" style={{ color: '#1C1917' }}>{aderezo.nombre}</p>
            <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{aderezo.descripcion}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                ⏱ {aderezo.tiempo_preparacion} min
              </span>
              <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {aderezo.rinde}
              </span>
            </div>
          </div>
          <span className="text-sm font-semibold flex-none" style={{ color: '#2D6A4F' }}>Ver →</span>
        </div>
        {aderezo.ensaladas_que_combina?.length > 0 && (
          <div className="px-4 pb-3">
            <p className="text-[10px] text-gray-400">
              Combina con {aderezo.ensaladas_que_combina.length} recetas del módulo
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}

export default function AderezosPage() {
  return (
    <EnsaladasGuard>
      <AderezosContent />
    </EnsaladasGuard>
  )
}
