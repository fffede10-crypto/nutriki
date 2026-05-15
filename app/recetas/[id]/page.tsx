'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'
import RecetaCard from '@/components/RecetaCard'
import { Receta } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

const catConfig: Record<string, { bg: string; emoji: string }> = {
  desayuno: { bg: '#FFF3E0', emoji: '☀️'  },
  almuerzo: { bg: '#E8F5E9', emoji: '🍽️' },
  cena:     { bg: '#E3F2FD', emoji: '🌙'  },
  merienda: { bg: '#FCE4EC', emoji: '🍎'  },
  postre:   { bg: '#F3E5F5', emoji: '🍫'  },
  jugo:     { bg: '#E0F7FA', emoji: '🥤'  },
}

const catLabel: Record<string, string> = {
  desayuno: 'Desayuno', almuerzo: 'Almuerzo', cena: 'Cena',
  merienda: 'Merienda', postre: 'Postre', jugo: 'Jugo',
}

function DetalleContent({ id }: { id: string }) {
  const { perfil } = useAuth()
  const router = useRouter()
  const [receta, setReceta] = useState<Receta | null>(null)
  const [relacionadas, setRelacionadas] = useState<Receta[]>([])
  const [esFavorito, setEsFavorito] = useState(false)
  const [yaCocinada, setYaCocinada] = useState(false)
  const [agregando, setAgregando] = useState<string | null>(null)
  const [todosAgregados, setTodosAgregados] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    cargarReceta()
  }, [id, perfil])

  async function cargarReceta() {
    const { data, error: err } = await supabase
      .from('recetas_nutriki')
      .select('*')
      .eq('id', parseInt(id, 10))
      .single()
    if (err) {
      console.error('[detalle] Supabase error:', err.code, err.message, err.details, err.hint)
      setError(err.message)
      return
    }
    if (data) {
      setReceta(data as Receta)
      // Cargar relacionadas
      const { data: rel } = await supabase
        .from('recetas_nutriki')
        .select('*')
        .eq('categoria', data.categoria)
        .neq('id', data.id)
        .order('indice_popularidad', { ascending: false })
        .limit(3)
      if (rel) setRelacionadas(rel as Receta[])
    }
    if (perfil && data) {
      const [favRes, cocRes] = await Promise.all([
        supabase.from('favoritos_nutriki').select('id').eq('usuario_id', perfil.id).eq('receta_id', data.id).single(),
        supabase.from('cocinadas_nutriki').select('id').eq('usuario_id', perfil.id).eq('receta_id', data.id).single(),
      ])
      setEsFavorito(!!favRes.data)
      setYaCocinada(!!cocRes.data)
    }
  }

  async function toggleFavorito() {
    if (!perfil || !receta) return
    if (esFavorito) {
      await supabase.from('favoritos_nutriki').delete().eq('usuario_id', perfil.id).eq('receta_id', receta.id)
      setEsFavorito(false)
    } else {
      await supabase.from('favoritos_nutriki').insert({ usuario_id: perfil.id, receta_id: receta.id })
      setEsFavorito(true)
    }
  }

  async function marcarCocinada() {
    if (!perfil || !receta) return
    await supabase.from('cocinadas_nutriki').insert({ usuario_id: perfil.id, receta_id: receta.id })
    setYaCocinada(true)
  }

  async function agregarIngredienteALista(nombre: string, cantidad: string, unidad: string) {
    if (!perfil || !receta) return
    setAgregando(nombre)
    await supabase.from('lista_compras_nutriki').insert({
      usuario_id: perfil.id, nombre, cantidad, unidad,
      receta_id: receta.id, receta_nombre: receta.nombre,
    })
    setAgregando(null)
  }

  async function agregarTodosALista() {
    if (!perfil || !receta || todosAgregados) return
    await supabase.from('lista_compras_nutriki').insert(
      receta.ingredientes.map((ing) => ({
        usuario_id: perfil.id,
        nombre: ing.nombre,
        cantidad: ing.cantidad,
        unidad: ing.unidad,
        receta_id: receta.id,
        receta_nombre: receta.nombre,
      }))
    )
    setTodosAgregados(true)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-crema flex items-center justify-center px-5">
        <div className="text-center text-gray-500">
          <div className="text-3xl mb-2">⚠️</div>
          <p className="font-semibold mb-1">No pudimos cargar esta receta</p>
          <p className="text-xs text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  if (!receta) {
    return (
      <div className="min-h-screen bg-crema flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-3xl mb-2">🥦</div>
          <p>Cargando receta...</p>
        </div>
      </div>
    )
  }

  const cfg = catConfig[receta.categoria] ?? catConfig.desayuno

  return (
    <div className="min-h-screen bg-crema pb-24">
      <div className="max-w-lg mx-auto">

        {/* Header con imagen o color de categoría */}
        <div
          className="relative h-56 overflow-hidden"
          style={{ backgroundColor: cfg.bg }}
        >
          {receta.imagen_url ? (
            <img
              src={receta.imagen_url}
              alt={receta.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="text-7xl mb-2">{cfg.emoji}</span>
            </div>
          )}
          {/* Degradado para legibilidad de botones y badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md text-texto"
          >
            ←
          </button>
          <button
            onClick={toggleFavorito}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md text-xl"
          >
            {esFavorito ? '❤️' : '🤍'}
          </button>
          <span className="absolute bottom-3 left-4 text-xs font-bold bg-white/90 text-gray-700 px-3 py-1 rounded-full shadow-sm">
            {cfg.emoji} {catLabel[receta.categoria]}
          </span>
        </div>

        <div className="px-4 pt-4">
          <h1 className="text-2xl font-bold text-texto mb-3">{receta.nombre}</h1>

          {/* Fila de badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {receta.tiempo_preparacion && (
              <span className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                ⏱ {receta.tiempo_preparacion} min
              </span>
            )}
            {receta.porciones && (
              <span className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                👥 {receta.porciones} porc.
              </span>
            )}
            {receta.edad_minima && (
              <span className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                👶 +{receta.edad_minima} años
              </span>
            )}
            {receta.apta_vianda && (
              <span className="bg-verde text-white text-xs font-bold px-3 py-1.5 rounded-full">
                🎒 Apta vianda
              </span>
            )}
          </div>

          {/* Restricciones */}
          {(receta.sin_gluten || receta.sin_lacteos || receta.vegetariana || receta.vegana || receta.sin_huevo) && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {receta.sin_gluten   && <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full">Sin TACC</span>}
              {receta.sin_lacteos  && <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">Sin lácteos</span>}
              {receta.sin_huevo    && <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2.5 py-1 rounded-full">Sin huevo</span>}
              {receta.vegetariana  && <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">🌿 Vegetariana</span>}
              {receta.vegana       && <span className="bg-lime-100 text-lime-700 text-xs font-bold px-2.5 py-1 rounded-full">Vegana</span>}
            </div>
          )}

          {receta.descripcion && (
            <p className="text-gray-500 text-sm mb-5 leading-relaxed">{receta.descripcion}</p>
          )}

          {/* Ingredientes */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-texto">Ingredientes</h2>
              <button
                onClick={agregarTodosALista}
                disabled={todosAgregados}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                  todosAgregados
                    ? 'bg-green-100 text-green-600'
                    : 'bg-verde/10 text-verde'
                }`}
              >
                {todosAgregados ? '✓ Agregados' : '🛒 Agregar todos'}
              </button>
            </div>
            <div className="space-y-2">
              {receta.ingredientes.map((ing, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100">
                  <div className="flex-1 min-w-0 mr-3">
                    <span className="font-semibold text-texto text-sm">{ing.nombre}</span>
                    <span className="text-gray-400 text-sm"> — {ing.cantidad} {ing.unidad}</span>
                  </div>
                  <button
                    onClick={() => agregarIngredienteALista(ing.nombre, ing.cantidad, ing.unidad)}
                    className="flex-none text-verde text-sm font-semibold"
                    disabled={agregando === ing.nombre}
                  >
                    {agregando === ing.nombre ? '✓' : '+'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Pasos */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-texto mb-3">Preparación</h2>
            <div className="space-y-3">
              {receta.pasos.map((paso, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-none w-7 h-7 bg-verde text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-texto text-sm leading-relaxed flex-1 pt-0.5">{paso}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tip nutricional */}
          {receta.tip_nutricional && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-3">
              <h3 className="font-bold text-verde mb-1.5 text-sm flex items-center gap-1.5">
                🌱 Tip nutricional
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{receta.tip_nutricional}</p>
            </div>
          )}

          {/* Tip para mamá */}
          {receta.tip_para_mama && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-naranja mb-1.5 text-sm flex items-center gap-1.5">
                💡 Tip para mamá
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{receta.tip_para_mama}</p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={toggleFavorito}
              className={`flex-1 py-3 rounded-xl font-bold border-2 transition-colors ${
                esFavorito ? 'border-verde bg-verde text-white' : 'border-verde text-verde'
              }`}
            >
              {esFavorito ? '❤️ Guardada' : '🤍 Guardar'}
            </button>
            <button
              onClick={marcarCocinada}
              disabled={yaCocinada}
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
                yaCocinada ? 'bg-gray-200 text-gray-500' : 'bg-naranja text-white'
              }`}
            >
              {yaCocinada ? '✓ Cocinada' : '🍳 Ya la cocinamos'}
            </button>
          </div>

          {/* También te puede gustar */}
          {relacionadas.length > 0 && (
            <section className="mb-6">
              <h2 className="text-base font-bold text-texto mb-3">También te puede gustar</h2>
              <div className="grid grid-cols-3 gap-2">
                {relacionadas.map((r) => (
                  <RecetaCard key={r.id} receta={r} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default function RecetaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <AuthGuard>
      <DetalleContent id={id} />
    </AuthGuard>
  )
}
