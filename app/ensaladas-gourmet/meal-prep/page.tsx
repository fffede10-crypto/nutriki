'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import EnsaladasGuard from '@/components/EnsaladasGuard'
import EnsaladasNav from '@/components/EnsaladasNav'
import { RecetaEnsalada } from '@/types/ensaladas'

const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie']

function MealPrepContent() {
  const [recetas, setRecetas] = useState<RecetaEnsalada[]>([])
  const [todas, setTodas] = useState<RecetaEnsalada[]>([])
  const [seleccionadas, setSeleccionadas] = useState<(RecetaEnsalada | null)[]>([null, null, null, null, null])
  const [listaVisible, setListaVisible] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('recetas_ensaladas').select('*').order('id').then(({ data }) => {
      if (data) setTodas(data as RecetaEnsalada[])
      setLoading(false)
    })
  }, [])

  function seleccionar(dia: number, receta: RecetaEnsalada) {
    setSeleccionadas((prev) => {
      const next = [...prev]
      next[dia] = next[dia]?.id === receta.id ? null : receta
      return next
    })
  }

  function generarLista() {
    const activas = seleccionadas.filter(Boolean) as RecetaEnsalada[]
    const ingredientesCombinados: string[] = []
    activas.forEach((r) => {
      r.ingredientes.forEach((ing) => {
        ingredientesCombinados.push(`${ing.cantidad} ${ing.unidad} ${ing.nombre}`.trim())
      })
    })
    return ingredientesCombinados
  }

  const lista = generarLista()
  const waMensaje = encodeURIComponent(
    `🥗 Mi plan de ensaladas:\n${DIAS.map((d, i) => `${d}: ${seleccionadas[i]?.nombre || '-'}`).join('\n')}\n\nLista de compras:\n${lista.join('\n')}`
  )

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="max-w-lg mx-auto">

        <div className="px-4 pt-8 pb-4">
          <Link href="/ensaladas-gourmet" className="text-sm mb-2 block" style={{ color: '#2D6A4F' }}>← Inicio</Link>
          <h1 className="text-2xl font-bold" style={{ color: '#1C1917' }}>Meal Prep</h1>
          <p className="text-gray-500 text-sm">5 ensaladas el domingo en 30 minutos</p>
        </div>

        {/* El método del domingo */}
        <section className="px-4 mb-6">
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#2D6A4F' }}>
            <h2 className="font-bold text-white text-base mb-3">📋 El método del domingo</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: '🥬', titulo: 'Base verde', desc: 'Lavá y secá todo. En bolsa de tela en la heladera.' },
                { emoji: '🌾', titulo: 'Granos', desc: 'Quinoa, arroz o lentejas. Cocinás el doble y reservás.' },
                { emoji: '🍗', titulo: 'Proteína', desc: 'Pollo a la plancha o huevos duros. Lista para la semana.' },
                { emoji: '🫙', titulo: 'Aderezo', desc: 'Uno o dos aderezos en frasco. Duran 5 días en la heladera.' },
              ].map((item) => (
                <div key={item.titulo} className="bg-white bg-opacity-10 rounded-xl p-3">
                  <p className="text-2xl mb-1">{item.emoji}</p>
                  <p className="text-white font-bold text-xs">{item.titulo}</p>
                  <p className="text-white text-[10px] opacity-80 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tabla semanal */}
        <section className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base" style={{ color: '#1C1917' }}>📅 Tu semana</h2>
            <button
              onClick={() => setListaVisible(!listaVisible)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: '#52B788', color: 'white' }}
            >
              {listaVisible ? 'Ocultar lista' : 'Ver lista de compras'}
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {DIAS.map((dia, i) => (
              <div key={dia} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0">
                <span className="font-bold text-sm w-8 flex-none" style={{ color: '#2D6A4F' }}>{dia}</span>
                <div className="flex-1 min-w-0">
                  {seleccionadas[i] ? (
                    <p className="text-sm font-medium line-clamp-1" style={{ color: '#1C1917' }}>
                      {seleccionadas[i]!.nombre}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">Sin asignar</p>
                  )}
                </div>
                <button
                  onClick={() => seleccionadas[i] ? seleccionar(i, seleccionadas[i]!) : null}
                  className="text-gray-400 text-lg flex-none"
                >
                  {seleccionadas[i] ? '✕' : ''}
                </button>
              </div>
            ))}
          </div>

          {seleccionadas.some(Boolean) && (
            <a
              href={`https://wa.me/?text=${waMensaje}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mt-3 py-3 rounded-2xl font-bold text-sm"
              style={{ backgroundColor: '#25D366', color: 'white' }}
            >
              📲 Compartir plan por WhatsApp
            </a>
          )}
        </section>

        {/* Lista de compras */}
        {listaVisible && lista.length > 0 && (
          <section className="px-4 mb-6">
            <h2 className="font-bold text-base mb-3" style={{ color: '#1C1917' }}>🛒 Lista de compras</h2>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              {lista.map((item, i) => (
                <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                  <span className="w-2 h-2 rounded-full flex-none" style={{ backgroundColor: '#52B788' }} />
                  <span className="text-sm" style={{ color: '#1C1917' }}>{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Selector de recetas */}
        <section className="px-4 mb-6">
          <h2 className="font-bold text-base mb-3" style={{ color: '#1C1917' }}>
            🥗 Elegí las 5 ensaladas de tu semana
          </h2>
          <p className="text-xs text-gray-500 mb-3">
            Tocá una ensalada y después asignala a un día de arriba.
          </p>

          {loading ? (
            <div className="text-center py-6 text-gray-400"><p>Cargando recetas...</p></div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {todas.filter(r => r.apta_vianda || r.categoria === 'express' || r.categoria === 'plato_completo').slice(0, 20).map((r) => {
                const diaAsignado = seleccionadas.findIndex((s) => s?.id === r.id)
                return (
                  <div
                    key={r.id}
                    className="bg-white rounded-xl p-3 border-2 active:scale-[0.98] transition-transform cursor-pointer"
                    style={{ borderColor: diaAsignado >= 0 ? '#2D6A4F' : '#E5E7EB' }}
                    onClick={() => {
                      const primerLibre = seleccionadas.findIndex((s) => s === null)
                      if (diaAsignado >= 0) {
                        seleccionar(diaAsignado, r)
                      } else if (primerLibre >= 0) {
                        seleccionar(primerLibre, r)
                      }
                    }}
                  >
                    <p className="text-xs font-bold line-clamp-2" style={{ color: '#1C1917' }}>{r.nombre}</p>
                    {diaAsignado >= 0 && (
                      <span className="text-[10px] font-bold mt-1 inline-block px-2 py-0.5 rounded-full" style={{ backgroundColor: '#2D6A4F', color: 'white' }}>
                        {DIAS[diaAsignado]}
                      </span>
                    )}
                    {r.tiempo_preparacion && (
                      <p className="text-[10px] text-gray-400 mt-1">⏱ {r.tiempo_preparacion} min</p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>

      </div>
      <EnsaladasNav />
    </div>
  )
}

export default function MealPrepPage() {
  return (
    <EnsaladasGuard>
      <MealPrepContent />
    </EnsaladasGuard>
  )
}
