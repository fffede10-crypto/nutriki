'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'
import { Receta } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

const categoriaLabel: Record<string, string> = {
  desayuno: 'Desayuno', almuerzo: 'Almuerzo', cena: 'Cena',
  merienda: 'Merienda', postre: 'Postre', jugo: 'Jugo',
}

function DetalleContent({ id }: { id: string }) {
  const { perfil } = useAuth()
  const router = useRouter()
  const [receta, setReceta] = useState<Receta | null>(null)
  const [esFavorito, setEsFavorito] = useState(false)
  const [yaCocinada, setYaCocinada] = useState(false)
  const [agregando, setAgregando] = useState<string | null>(null)

  useEffect(() => {
    cargarReceta()
  }, [id, perfil])

  async function cargarReceta() {
    const { data } = await supabase.from('recetas_nutriki').select('*').eq('id', id).single()
    if (data) setReceta(data as Receta)
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
      usuario_id: perfil.id,
      nombre,
      cantidad,
      unidad,
      receta_id: receta.id,
      receta_nombre: receta.nombre,
    })
    setAgregando(null)
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

  return (
    <div className="min-h-screen bg-crema pb-24">
      <div className="max-w-lg mx-auto">
        <div className="bg-gradient-to-br from-green-100 to-crema h-48 flex items-center justify-center relative">
          <span className="text-7xl">
            {receta.categoria === 'desayuno' ? '🌅' :
             receta.categoria === 'almuerzo' ? '☀️' :
             receta.categoria === 'cena' ? '🌙' :
             receta.categoria === 'merienda' ? '🍎' :
             receta.categoria === 'postre' ? '🍮' : '🥤'}
          </span>
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-texto"
          >
            ←
          </button>
          <button
            onClick={toggleFavorito}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl"
          >
            {esFavorito ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="px-4 pt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              {categoriaLabel[receta.categoria]}
            </span>
            {receta.apta_vianda && <span className="bg-verde text-white text-xs font-bold px-3 py-1 rounded-full">🎒 Apta vianda</span>}
            {receta.sin_gluten && <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">Sin TACC</span>}
            {receta.sin_lacteos && <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Sin lácteos</span>}
            {receta.vegetariana && <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">🌿 Vegetariana</span>}
            {receta.vegana && <span className="bg-lime-100 text-lime-700 text-xs font-bold px-3 py-1 rounded-full">Vegana</span>}
          </div>

          <h1 className="text-2xl font-bold text-texto mb-2">{receta.nombre}</h1>
          {receta.descripcion && <p className="text-gray-500 text-sm mb-4">{receta.descripcion}</p>}

          <div className="flex gap-4 mb-6">
            {receta.tiempo_preparacion && (
              <div className="text-center">
                <p className="text-xl font-bold text-verde">{receta.tiempo_preparacion}</p>
                <p className="text-xs text-gray-500">minutos</p>
              </div>
            )}
            {receta.porciones && (
              <div className="text-center">
                <p className="text-xl font-bold text-verde">{receta.porciones}</p>
                <p className="text-xs text-gray-500">porciones</p>
              </div>
            )}
            {receta.edad_minima && (
              <div className="text-center">
                <p className="text-xl font-bold text-verde">{receta.edad_minima}+</p>
                <p className="text-xs text-gray-500">años</p>
              </div>
            )}
            {receta.nivel_dificultad && (
              <div className="text-center">
                <p className="text-base font-bold text-verde capitalize">{receta.nivel_dificultad}</p>
                <p className="text-xs text-gray-500">dificultad</p>
              </div>
            )}
          </div>

          <section className="mb-6">
            <h2 className="text-lg font-bold text-texto mb-3">Ingredientes</h2>
            <div className="space-y-2">
              {receta.ingredientes.map((ing, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100">
                  <div>
                    <span className="font-semibold text-texto text-sm">{ing.nombre}</span>
                    <span className="text-gray-400 text-sm"> — {ing.cantidad} {ing.unidad}</span>
                  </div>
                  <button
                    onClick={() => agregarIngredienteALista(ing.nombre, ing.cantidad, ing.unidad)}
                    className="text-verde text-sm font-semibold"
                    disabled={agregando === ing.nombre}
                  >
                    {agregando === ing.nombre ? '✓' : '+ Lista'}
                  </button>
                </div>
              ))}
            </div>
          </section>

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

          {receta.tip_nutricional && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">
              <h3 className="font-bold text-verde mb-1 text-sm">🌿 Tip nutricional</h3>
              <p className="text-gray-700 text-sm">{receta.tip_nutricional}</p>
            </div>
          )}

          {receta.tip_para_mama && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-naranja mb-1 text-sm">💡 Tip para mamá</h3>
              <p className="text-gray-700 text-sm">{receta.tip_para_mama}</p>
            </div>
          )}

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
