'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'
import RecetaCard from '@/components/RecetaCard'
import { Receta } from '@/types'

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MAÑANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

type FiltroTiempo = 'todas' | '10' | '15' | '30'

const filtrosTiempo: { key: FiltroTiempo; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: '10',    label: '⚡ ≤ 10 min' },
  { key: '15',    label: '🕐 ≤ 15 min' },
  { key: '30',    label: '🕧 ≤ 30 min' },
]

function ViandasContent() {
  const { perfil } = useAuth()
  const [viandas, setViandas] = useState<Receta[]>([])
  const [filtro, setFiltro] = useState<FiltroTiempo>('todas')
  const [sugerencia, setSugerencia] = useState<Receta | null>(null)
  const [loading, setLoading] = useState(true)

  const nombreHijo = perfil?.nombre_hijo || 'tu hijo'
  const diaMañana = MAÑANA[new Date().getDay()]

  useEffect(() => {
    cargarViandas()
  }, [])

  async function cargarViandas() {
    const { data, error } = await supabase
      .from('recetas_nutriki')
      .select('*')
      .eq('apta_vianda', true)
      .order('indice_popularidad', { ascending: false })
    if (error) console.error('[viandas]', error.message)
    if (data && data.length > 0) {
      setViandas(data as Receta[])
      const idx = new Date().getDate() % data.length
      setSugerencia(data[idx] as Receta)
    }
    setLoading(false)
  }

  const recetasFiltradas = viandas.filter((r) => {
    if (filtro === 'todas') return true
    return (r.lista_en_minutos ?? 999) <= parseInt(filtro)
  })

  return (
    <div className="min-h-screen bg-crema pb-24">
      {/* Header */}
      <div className="bg-verde text-white px-4 pt-10 pb-5">
        <h1 className="text-xl font-bold mb-0.5">
          La vianda de <span className="opacity-90">{nombreHijo}</span> para mañana
        </h1>
        <p className="text-sm text-white/70">{diaMañana} 🎒</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5">
        {/* Sugerencia del día */}
        {sugerencia && (
          <Link href={`/recetas/${sugerencia.id}`} className="block mb-5">
            <div className="bg-verde/10 border border-verde/20 rounded-2xl p-4 flex items-center gap-3">
              <div className="text-3xl flex-none">🌟</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-verde uppercase tracking-wide mb-0.5">
                  Sugerencia del {DIAS[new Date().getDay()]}
                </p>
                <p className="font-bold text-texto leading-snug line-clamp-1">{sugerencia.nombre}</p>
                {sugerencia.tiempo_preparacion && (
                  <p className="text-xs text-gray-500 mt-0.5">⏱ {sugerencia.tiempo_preparacion} min</p>
                )}
              </div>
              <span className="text-verde font-bold text-sm flex-none">Ver →</span>
            </div>
          </Link>
        )}

        {/* Link a guía */}
        <Link
          href="/guias/viandas"
          className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5"
        >
          <span className="text-xl">📚</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-texto">¿Cómo armar la vianda perfecta?</p>
            <p className="text-xs text-gray-500">Fórmula + checklist + 7 combos listos</p>
          </div>
          <span className="text-amber-500 font-bold">→</span>
        </Link>

        {/* Filtros de tiempo */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4 -mx-1 px-1">
          {filtrosTiempo.map((f) => (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              className={`flex-none px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                filtro === f.key
                  ? 'bg-verde text-white'
                  : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-3xl mb-2">🎒</div>
            <p>Cargando viandas...</p>
          </div>
        ) : recetasFiltradas.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-sm">No hay viandas con ese tiempo de preparación.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-3">{recetasFiltradas.length} opciones</p>
            <div className="grid grid-cols-2 gap-3">
              {recetasFiltradas.map((r) => (
                <RecetaCard key={r.id} receta={r} />
              ))}
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default function ViandasPage() {
  return (
    <AuthGuard>
      <ViandasContent />
    </AuthGuard>
  )
}
