'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import EnsaladasGuard from '@/components/EnsaladasGuard'
import EnsaladasNav from '@/components/EnsaladasNav'
import { RecetaEnsalada, AderezoEnsalada } from '@/types/ensaladas'

const categorias = [
  { id: 'express', label: '⚡ Express', desc: '≤15 min', bg: '#E8F5E9', color: '#2D6A4F' },
  { id: 'plato_completo', label: '🍽️ Plato completo', desc: 'Con proteína', bg: '#FFF3E0', color: '#E65100' },
  { id: 'juntada', label: '🎉 Para juntadas', desc: 'Efecto restaurante', bg: '#FCE4EC', color: '#880E4F' },
  { id: 'sin_lechuga', label: '🥦 Sin lechuga', desc: 'Lo diferente', bg: '#E3F2FD', color: '#0D47A1' },
  { id: 'frutal', label: '🍓 Frutales', desc: 'Agridulces', bg: '#F3E5F5', color: '#6A1B9A' },
]

function getSaludo() {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 20) return 'Buenas tardes'
  return 'Buenas noches'
}

function DashboardContent() {
  const { perfil } = useAuth()
  const [rapidas, setRapidas] = useState<RecetaEnsalada[]>([])
  const [juntada, setJuntada] = useState<RecetaEnsalada[]>([])
  const [sinLechuga, setSinLechuga] = useState<RecetaEnsalada[]>([])
  const [aderezos, setAderezos] = useState<AderezoEnsalada[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    const [r, j, s, a] = await Promise.all([
      supabase.from('recetas_ensaladas').select('*').eq('categoria', 'express').limit(6),
      supabase.from('recetas_ensaladas').select('*').eq('categoria', 'juntada').limit(4),
      supabase.from('recetas_ensaladas').select('*').eq('categoria', 'sin_lechuga').limit(4),
      supabase.from('aderezos_ensaladas').select('*').limit(3),
    ])
    if (r.data) setRapidas(r.data as RecetaEnsalada[])
    if (j.data) setJuntada(j.data as RecetaEnsalada[])
    if (s.data) setSinLechuga(s.data as RecetaEnsalada[])
    if (a.data) setAderezos(a.data as AderezoEnsalada[])
    setLoading(false)
  }

  const nombre = perfil?.nombre || 'Hola'

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="px-4 pt-8 pb-4 flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm">{getSaludo()},</p>
            <h1 className="text-2xl font-bold" style={{ color: '#1C1917' }}>
              ¿Qué ensalada hacemos <span style={{ color: '#2D6A4F' }}>hoy?</span>
            </h1>
          </div>
          <Link
            href="/dashboard"
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-lg mt-1 flex-none"
            title="Volver al inicio"
          >
            🏠
          </Link>
        </div>

        <div className="px-4">

          {/* Categorías scroll horizontal */}
          <div className="overflow-x-auto -mx-4 px-4 mb-6">
            <div className="flex gap-3 pb-1" style={{ width: 'max-content' }}>
              {categorias.map((c) => (
                <Link
                  key={c.id}
                  href={`/ensaladas-gourmet/recetas?categoria=${c.id}`}
                  className="flex-none rounded-2xl p-3 border border-gray-100 shadow-sm active:scale-95 transition-transform"
                  style={{ backgroundColor: c.bg, minWidth: 130 }}
                >
                  <p className="font-bold text-sm" style={{ color: c.color }}>{c.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {loading && (
            <div className="text-center py-10 text-gray-400">
              <div className="text-3xl mb-2">🥗</div>
              <p>Cargando recetas...</p>
            </div>
          )}

          {/* Rápidas */}
          {!loading && rapidas.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold" style={{ color: '#1C1917' }}>⚡ Listas en 15 min</h2>
                <Link href="/ensaladas-gourmet/recetas?categoria=express" className="text-sm font-semibold" style={{ color: '#2D6A4F' }}>Ver todo</Link>
              </div>
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex gap-3 pb-1" style={{ width: 'max-content' }}>
                  {rapidas.map((r) => (
                    <RecetaCardMini key={r.id} receta={r} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Para sorprender */}
          {!loading && juntada.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold" style={{ color: '#1C1917' }}>🎉 Para sorprender</h2>
                <Link href="/ensaladas-gourmet/recetas?categoria=juntada" className="text-sm font-semibold" style={{ color: '#2D6A4F' }}>Ver todo</Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {juntada.map((r) => (
                  <RecetaCardGrid key={r.id} receta={r} />
                ))}
              </div>
            </section>
          )}

          {/* Aderezos de la semana */}
          {!loading && aderezos.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold" style={{ color: '#1C1917' }}>🫙 Aderezos que cambian todo</h2>
                <Link href="/ensaladas-gourmet/aderezos" className="text-sm font-semibold" style={{ color: '#2D6A4F' }}>Ver todos</Link>
              </div>
              <div className="flex flex-col gap-3">
                {aderezos.map((a) => (
                  <Link
                    key={a.id}
                    href={`/ensaladas-gourmet/aderezos/${a.id}`}
                    className="bg-white rounded-2xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm active:scale-[0.98] transition-transform"
                  >
                    <span className="text-3xl flex-none">🫙</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm" style={{ color: '#1C1917' }}>{a.nombre}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{a.descripcion}</p>
                    </div>
                    <span className="text-sm font-semibold flex-none" style={{ color: '#2D6A4F' }}>Ver →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Sin lechuga */}
          {!loading && sinLechuga.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold" style={{ color: '#1C1917' }}>🥦 Sin lechuga (lo más diferente)</h2>
                <Link href="/ensaladas-gourmet/recetas?categoria=sin_lechuga" className="text-sm font-semibold" style={{ color: '#2D6A4F' }}>Ver todo</Link>
              </div>
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex gap-3 pb-1" style={{ width: 'max-content' }}>
                  {sinLechuga.map((r) => (
                    <RecetaCardMini key={r.id} receta={r} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Banners acceso rápido */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link
              href="/ensaladas-gourmet/meal-prep"
              className="rounded-2xl p-4 flex flex-col gap-1 active:scale-95 transition-transform"
              style={{ backgroundColor: '#2D6A4F' }}
            >
              <span className="text-2xl">📦</span>
              <span className="font-bold text-white text-sm">Meal prep</span>
              <span className="text-xs text-white opacity-80">5 ensaladas el domingo</span>
            </Link>
            <Link
              href="/ensaladas-gourmet/guias"
              className="rounded-2xl p-4 flex flex-col gap-1 active:scale-95 transition-transform"
              style={{ backgroundColor: '#52B788' }}
            >
              <span className="text-2xl">📚</span>
              <span className="font-bold text-white text-sm">Guías</span>
              <span className="text-xs text-white opacity-80">Conservación + estación</span>
            </Link>
          </div>

        </div>
      </div>
      <EnsaladasNav />
    </div>
  )
}

function RecetaCardMini({ receta }: { receta: RecetaEnsalada }) {
  return (
    <Link href={`/ensaladas-gourmet/recetas/${receta.id}`} className="w-40 flex-none">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm active:scale-[0.98] transition-transform">
        <div className="h-24 flex items-center justify-center text-4xl" style={{ backgroundColor: '#E8F5E9' }}>
          🥗
        </div>
        <div className="p-2">
          <p className="text-xs font-bold leading-snug line-clamp-2" style={{ color: '#1C1917' }}>{receta.nombre}</p>
          {receta.tiempo_preparacion && (
            <p className="text-[10px] text-gray-400 mt-1">⏱ {receta.tiempo_preparacion} min</p>
          )}
        </div>
      </div>
    </Link>
  )
}

function RecetaCardGrid({ receta }: { receta: RecetaEnsalada }) {
  return (
    <Link href={`/ensaladas-gourmet/recetas/${receta.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm active:scale-[0.98] transition-transform">
        <div className="h-28 flex items-center justify-center text-5xl" style={{ backgroundColor: '#FCE4EC' }}>
          🥗
        </div>
        <div className="p-3">
          <p className="text-xs font-bold leading-snug line-clamp-2" style={{ color: '#1C1917' }}>{receta.nombre}</p>
          {receta.tiempo_preparacion && (
            <p className="text-[10px] text-gray-400 mt-1">⏱ {receta.tiempo_preparacion} min</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function EnsaladasDashboard() {
  return (
    <EnsaladasGuard>
      <DashboardContent />
    </EnsaladasGuard>
  )
}
