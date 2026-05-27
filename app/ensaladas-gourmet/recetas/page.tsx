'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import EnsaladasGuard from '@/components/EnsaladasGuard'
import EnsaladasNav from '@/components/EnsaladasNav'
import { RecetaEnsalada } from '@/types/ensaladas'

const CATEGORIAS = [
  { id: '', label: 'Todas' },
  { id: 'express', label: '⚡ Express' },
  { id: 'plato_completo', label: '🍽️ Plato completo' },
  { id: 'juntada', label: '🎉 Juntada' },
  { id: 'sin_lechuga', label: '🥦 Sin lechuga' },
  { id: 'frutal', label: '🍓 Frutal' },
]

const TIEMPOS = [
  { id: '', label: 'Cualquier tiempo' },
  { id: '10', label: '≤10 min' },
  { id: '15', label: '≤15 min' },
  { id: '30', label: '≤30 min' },
]

const RESTRICCIONES = [
  { id: 'sin_gluten', label: 'Sin gluten' },
  { id: 'sin_lacteos', label: 'Sin lácteos' },
  { id: 'vegetariana', label: 'Vegetariana' },
  { id: 'vegana', label: 'Vegana' },
  { id: 'apta_vianda', label: 'Apta vianda' },
]

function BibliotecaContent() {
  const params = useSearchParams()
  const [recetas, setRecetas] = useState<RecetaEnsalada[]>([])
  const [loading, setLoading] = useState(true)
  const [categoria, setCategoria] = useState(params.get('categoria') || '')
  const [tiempo, setTiempo] = useState('')
  const [restricciones, setRestricciones] = useState<string[]>([])

  useEffect(() => {
    cargar()
  }, [categoria, tiempo, restricciones])

  async function cargar() {
    setLoading(true)
    let q = supabase.from('recetas_ensaladas').select('*')

    if (categoria) q = q.eq('categoria', categoria)
    if (tiempo) q = q.lte('tiempo_preparacion', parseInt(tiempo))
    if (restricciones.includes('sin_gluten')) q = q.eq('sin_gluten', true)
    if (restricciones.includes('sin_lacteos')) q = q.eq('sin_lacteos', true)
    if (restricciones.includes('vegetariana')) q = q.eq('vegetariana', true)
    if (restricciones.includes('vegana')) q = q.eq('vegana', true)
    if (restricciones.includes('apta_vianda')) q = q.eq('apta_vianda', true)

    q = q.order('id')

    const { data } = await q
    if (data) setRecetas(data as RecetaEnsalada[])
    setLoading(false)
  }

  function toggleRestriccion(r: string) {
    setRestricciones((prev) => prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r])
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="px-4 pt-8 pb-3">
          <Link href="/ensaladas-gourmet" className="text-sm mb-2 block" style={{ color: '#2D6A4F' }}>← Inicio</Link>
          <h1 className="text-2xl font-bold" style={{ color: '#1C1917' }}>Todas las recetas</h1>
          <p className="text-gray-500 text-sm">{recetas.length} ensaladas</p>
        </div>

        {/* Filtros por categoría */}
        <div className="overflow-x-auto px-4 -mx-0 mb-3">
          <div className="flex gap-2 pb-1" style={{ width: 'max-content' }}>
            {CATEGORIAS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoria(c.id)}
                className="flex-none px-4 py-2 rounded-full text-sm font-semibold border transition-colors"
                style={{
                  backgroundColor: categoria === c.id ? '#2D6A4F' : 'white',
                  color: categoria === c.id ? 'white' : '#1C1917',
                  borderColor: categoria === c.id ? '#2D6A4F' : '#E5E7EB',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtros por tiempo */}
        <div className="overflow-x-auto px-4 mb-3">
          <div className="flex gap-2 pb-1" style={{ width: 'max-content' }}>
            {TIEMPOS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTiempo(t.id)}
                className="flex-none px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
                style={{
                  backgroundColor: tiempo === t.id ? '#52B788' : 'white',
                  color: tiempo === t.id ? 'white' : '#6B7280',
                  borderColor: tiempo === t.id ? '#52B788' : '#E5E7EB',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Restricciones */}
        <div className="overflow-x-auto px-4 mb-4">
          <div className="flex gap-2 pb-1" style={{ width: 'max-content' }}>
            {RESTRICCIONES.map((r) => (
              <button
                key={r.id}
                onClick={() => toggleRestriccion(r.id)}
                className="flex-none px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
                style={{
                  backgroundColor: restricciones.includes(r.id) ? '#F4A261' : 'white',
                  color: restricciones.includes(r.id) ? 'white' : '#6B7280',
                  borderColor: restricciones.includes(r.id) ? '#F4A261' : '#E5E7EB',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de recetas */}
        <div className="px-4">
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-3xl mb-2">🥗</div>
              <p>Cargando recetas...</p>
            </div>
          ) : recetas.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-3xl mb-2">🔍</div>
              <p>No hay recetas con esos filtros</p>
              <button
                onClick={() => { setCategoria(''); setTiempo(''); setRestricciones([]) }}
                className="mt-3 text-sm font-semibold"
                style={{ color: '#2D6A4F' }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {recetas.map((r) => (
                <RecetaCard key={r.id} receta={r} />
              ))}
            </div>
          )}
        </div>

      </div>
      <EnsaladasNav />
    </div>
  )
}

const CATEGORIA_STYLE: Record<string, { bg: string; emoji: string }> = {
  express:        { bg: 'bg-green-100',  emoji: '⚡' },
  plato_completo: { bg: 'bg-orange-100', emoji: '🍽️' },
  juntada:        { bg: 'bg-pink-100',   emoji: '🎉' },
  sin_lechuga:    { bg: 'bg-lime-100',   emoji: '🥬' },
  frutal:         { bg: 'bg-yellow-100', emoji: '🍓' },
}

function RecetaCard({ receta }: { receta: RecetaEnsalada }) {
  const style = CATEGORIA_STYLE[receta.categoria] || CATEGORIA_STYLE.express

  return (
    <Link href={`/ensaladas-gourmet/recetas/${receta.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm active:scale-[0.98] transition-transform h-full">
        <div className={`h-28 ${style.bg} flex items-center justify-center rounded-t-2xl`}>
          <span className="text-5xl">{style.emoji}</span>
        </div>
        <div className="p-3">
          <p className="text-xs font-bold leading-snug line-clamp-2 mb-2" style={{ color: '#1C1917' }}>
            {receta.nombre}
          </p>
          <div className="flex flex-wrap gap-1">
            {receta.tiempo_preparacion && (
              <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                ⏱ {receta.tiempo_preparacion}min
              </span>
            )}
            {receta.vegetariana && (
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">🌱</span>
            )}
            {receta.sin_gluten && (
              <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">SG</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function BibliotecaPage() {
  return (
    <EnsaladasGuard>
      <Suspense fallback={<div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center"><div className="text-4xl">🥗</div></div>}>
        <BibliotecaContent />
      </Suspense>
    </EnsaladasGuard>
  )
}
