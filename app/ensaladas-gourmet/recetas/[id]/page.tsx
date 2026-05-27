'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import EnsaladasGuard from '@/components/EnsaladasGuard'
import EnsaladasNav from '@/components/EnsaladasNav'
import { RecetaEnsalada, AderezoEnsalada } from '@/types/ensaladas'

const catLabel: Record<string, string> = {
  express: '⚡ Express',
  plato_completo: '🍽️ Plato completo',
  juntada: '🎉 Para juntadas',
  sin_lechuga: '🥦 Sin lechuga',
  frutal: '🍓 Frutal',
}

const catBg: Record<string, string> = {
  express: '#E8F5E9',
  plato_completo: '#FFF3E0',
  juntada: '#FCE4EC',
  sin_lechuga: '#E3F2FD',
  frutal: '#F3E5F5',
}

function DetalleContent() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [receta, setReceta] = useState<RecetaEnsalada | null>(null)
  const [aderezo, setAderezo] = useState<AderezoEnsalada | null>(null)
  const [relacionadas, setRelacionadas] = useState<RecetaEnsalada[]>([])
  const [guardada, setGuardada] = useState(false)
  const [cocinada, setCocinada] = useState(false)
  const [loading, setLoading] = useState(true)
  const [ingredientesAgregados, setIngredientesAgregados] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (id) cargar(Number(id))
  }, [id])

  async function cargar(recetaId: number) {
    const { data } = await supabase.from('recetas_ensaladas').select('*').eq('id', recetaId).single()
    if (!data) { router.replace('/ensaladas-gourmet/recetas'); return }
    const r = data as RecetaEnsalada
    setReceta(r)

    const [aRes, relRes, favRes] = await Promise.all([
      r.aderezo_recomendado_id
        ? supabase.from('aderezos_ensaladas').select('*').eq('id', r.aderezo_recomendado_id).single()
        : Promise.resolve({ data: null }),
      supabase.from('recetas_ensaladas').select('*').eq('categoria', r.categoria).neq('id', recetaId).limit(3),
      user ? supabase.from('favoritos_ensaladas').select('id').eq('usuario_id', user.id).eq('receta_id', recetaId).single() : Promise.resolve({ data: null }),
    ])

    if (aRes.data) setAderezo(aRes.data as AderezoEnsalada)
    if (relRes.data) setRelacionadas(relRes.data as RecetaEnsalada[])
    if (favRes.data) setGuardada(true)
    setLoading(false)
  }

  async function toggleGuardar() {
    if (!user || !receta) return
    if (guardada) {
      await supabase.from('favoritos_ensaladas').delete().eq('usuario_id', user.id).eq('receta_id', receta.id)
      setGuardada(false)
    } else {
      await supabase.from('favoritos_ensaladas').insert({ usuario_id: user.id, receta_id: receta.id })
      setGuardada(true)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="text-center"><div className="text-4xl mb-2">🥗</div><p style={{ color: '#2D6A4F' }}>Cargando...</p></div>
      </div>
    )
  }

  if (!receta) return null

  return (
    <div className="min-h-screen pb-28" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-lg mx-auto">

        {/* Hero */}
        <div
          className="relative h-56 flex items-center justify-center text-8xl"
          style={{ backgroundColor: catBg[receta.categoria] || '#E8F5E9' }}
        >
          🥗
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md text-gray-600"
          >
            ←
          </button>
        </div>

        <div className="px-4 pt-4">

          {/* Categoría + nombre */}
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#52B788', color: 'white' }}>
            {catLabel[receta.categoria]}
          </span>
          <h1 className="text-xl font-bold mt-2 mb-1" style={{ color: '#1C1917' }}>{receta.nombre}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {receta.tiempo_preparacion && (
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">⏱ {receta.tiempo_preparacion} min</span>
            )}
            {receta.porciones && (
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">🍽️ {receta.porciones} porciones</span>
            )}
            {receta.nivel_dificultad && (
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full capitalize">{receta.nivel_dificultad}</span>
            )}
            {receta.sin_gluten && <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Sin gluten</span>}
            {receta.vegetariana && <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">🌱 Vegetariana</span>}
            {receta.vegana && <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">🌿 Vegana</span>}
            {receta.apta_vianda && <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">🎒 Vianda</span>}
          </div>

          {/* Descripción */}
          {receta.descripcion && (
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{receta.descripcion}</p>
          )}

          {/* Ingredientes */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-base" style={{ color: '#1C1917' }}>Ingredientes</h2>
              <button
                onClick={() => setIngredientesAgregados(new Set(receta.ingredientes.map((_, i) => i)))}
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: '#2D6A4F', color: 'white' }}
              >
                + Agregar todo
              </button>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              {receta.ingredientes.map((ing, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <button
                    onClick={() => setIngredientesAgregados((prev) => {
                      const next = new Set(prev)
                      if (next.has(i)) next.delete(i); else next.add(i)
                      return next
                    })}
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-none transition-colors"
                    style={{
                      backgroundColor: ingredientesAgregados.has(i) ? '#2D6A4F' : 'transparent',
                      borderColor: ingredientesAgregados.has(i) ? '#2D6A4F' : '#D1D5DB',
                    }}
                  >
                    {ingredientesAgregados.has(i) && <span className="text-white text-xs">✓</span>}
                  </button>
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
            <h2 className="font-bold text-base mb-3" style={{ color: '#1C1917' }}>Paso a paso</h2>
            <div className="flex flex-col gap-3">
              {receta.pasos.map((paso, i) => (
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
          {receta.tip_chef && (
            <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: '#E8F5E9', borderLeft: '4px solid #52B788' }}>
              <p className="text-xs font-bold mb-1" style={{ color: '#2D6A4F' }}>💡 Tip del chef</p>
              <p className="text-sm text-gray-700">{receta.tip_chef}</p>
            </div>
          )}

          {/* Conservación */}
          {receta.conservacion && (
            <div className="rounded-2xl p-4 mb-5" style={{ backgroundColor: '#FFF3E0', borderLeft: '4px solid #F4A261' }}>
              <p className="text-xs font-bold mb-1" style={{ color: '#E65100' }}>🧊 Conservación</p>
              <p className="text-sm text-gray-700">{receta.conservacion}</p>
            </div>
          )}

          {/* Aderezo recomendado */}
          {aderezo && (
            <div className="mb-5">
              <h2 className="font-bold text-base mb-3" style={{ color: '#1C1917' }}>🫙 Aderezo recomendado</h2>
              <Link href={`/ensaladas-gourmet/aderezos/${aderezo.id}`}>
                <div className="bg-white rounded-2xl p-4 border-2 flex items-center gap-3 active:scale-[0.98] transition-transform" style={{ borderColor: '#52B788' }}>
                  <span className="text-3xl flex-none">🫙</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm" style={{ color: '#1C1917' }}>{aderezo.nombre}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{aderezo.descripcion}</p>
                    <p className="text-xs mt-1" style={{ color: '#52B788' }}>⏱ {aderezo.tiempo_preparacion} min · {aderezo.rinde}</p>
                  </div>
                  <span className="text-sm font-semibold flex-none" style={{ color: '#2D6A4F' }}>Ver →</span>
                </div>
              </Link>
            </div>
          )}

          {/* También te puede gustar */}
          {relacionadas.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold text-base mb-3" style={{ color: '#1C1917' }}>También te puede gustar</h2>
              <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
                {relacionadas.map((r) => (
                  <Link key={r.id} href={`/ensaladas-gourmet/recetas/${r.id}`} className="w-36 flex-none">
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <div className="h-20 flex items-center justify-center text-4xl" style={{ backgroundColor: catBg[r.categoria] }}>🥗</div>
                      <div className="p-2">
                        <p className="text-[11px] font-bold line-clamp-2" style={{ color: '#1C1917' }}>{r.nombre}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Botones acción */}
          <div className="flex gap-3">
            <button
              onClick={toggleGuardar}
              className="flex-1 py-3 rounded-2xl font-bold text-sm border-2 transition-colors"
              style={{
                backgroundColor: guardada ? '#2D6A4F' : 'white',
                color: guardada ? 'white' : '#2D6A4F',
                borderColor: '#2D6A4F',
              }}
            >
              {guardada ? '❤️ Guardada' : '🤍 Guardar'}
            </button>
            <button
              onClick={() => setCocinada(!cocinada)}
              className="flex-1 py-3 rounded-2xl font-bold text-sm border-2 transition-colors"
              style={{
                backgroundColor: cocinada ? '#52B788' : 'white',
                color: cocinada ? 'white' : '#52B788',
                borderColor: '#52B788',
              }}
            >
              {cocinada ? '✓ ¡La hice!' : '✓ Ya la hice'}
            </button>
          </div>

        </div>
      </div>
      <EnsaladasNav />
    </div>
  )
}

export default function RecetaDetallePage() {
  return (
    <EnsaladasGuard>
      <DetalleContent />
    </EnsaladasGuard>
  )
}
