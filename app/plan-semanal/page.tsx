'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'
import { Receta } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const COMIDAS = ['desayuno', 'almuerzo', 'cena'] as const
type Comida = typeof COMIDAS[number]

const comidaLabel: Record<Comida, string> = {
  desayuno: '🌅 Desayuno',
  almuerzo: '☀️ Almuerzo',
  cena: '🌙 Cena',
}

function getInicioSemana(): string {
  const hoy = new Date()
  const dia = hoy.getDay()
  const lunes = new Date(hoy)
  lunes.setDate(hoy.getDate() - (dia === 0 ? 6 : dia - 1))
  return lunes.toISOString().split('T')[0]
}

type Plan = Record<string, Record<Comida, number | null>>

function PlanContent() {
  const { perfil } = useAuth()
  const [plan, setPlan] = useState<Plan>(() => {
    const p: Plan = {}
    DIAS.forEach((d) => { p[d] = { desayuno: null, almuerzo: null, cena: null } })
    return p
  })
  const [planId, setPlanId] = useState<string | null>(null)
  const [recetas, setRecetas] = useState<Receta[]>([])
  const [modal, setModal] = useState<{ dia: string; comida: Comida } | null>(null)
  const [recetasFiltradas, setRecetasFiltradas] = useState<Receta[]>([])
  const [saving, setSaving] = useState(false)
  const semanaInicio = getInicioSemana()

  useEffect(() => {
    cargarPlan()
    cargarRecetas()
  }, [perfil])

  async function cargarPlan() {
    if (!perfil) return
    const { data } = await supabase
      .from('planes_semanales_nutriki')
      .select('*')
      .eq('usuario_id', perfil.id)
      .eq('semana_inicio', semanaInicio)
      .single()
    if (data) {
      setPlanId(data.id)
      setPlan(data.plan as Plan)
    }
  }

  async function cargarRecetas() {
    const { data } = await supabase.from('recetas_nutriki').select('id, nombre, categoria').order('nombre')
    if (data) setRecetas(data as Receta[])
  }

  async function guardarPlan(planActualizado: Plan) {
    if (!perfil) return
    setSaving(true)
    if (planId) {
      await supabase.from('planes_semanales_nutriki').update({ plan: planActualizado }).eq('id', planId)
    } else {
      const { data } = await supabase.from('planes_semanales_nutriki').insert({
        usuario_id: perfil.id,
        semana_inicio: semanaInicio,
        plan: planActualizado,
      }).select().single()
      if (data) setPlanId(data.id)
    }
    setSaving(false)
  }

  function abrirModal(dia: string, comida: Comida) {
    setModal({ dia, comida })
    setRecetasFiltradas(recetas.filter((r) => r.categoria === comida || (comida === 'desayuno' && r.categoria === 'merienda')))
  }

  function seleccionarReceta(recetaId: number) {
    if (!modal) return
    const nuevo = {
      ...plan,
      [modal.dia]: { ...plan[modal.dia], [modal.comida]: recetaId },
    }
    setPlan(nuevo)
    guardarPlan(nuevo)
    setModal(null)
  }

  function quitarReceta(dia: string, comida: Comida) {
    const nuevo = { ...plan, [dia]: { ...plan[dia], [comida]: null } }
    setPlan(nuevo)
    guardarPlan(nuevo)
  }

  async function generarListaCompras() {
    if (!perfil) return
    const idsRecetas = Object.values(plan)
      .flatMap((c) => Object.values(c))
      .filter(Boolean) as number[]

    if (idsRecetas.length === 0) return

    const { data: recetasConIngredientes } = await supabase
      .from('recetas_nutriki')
      .select('id, nombre, ingredientes')
      .in('id', idsRecetas)

    if (!recetasConIngredientes) return

    const items = recetasConIngredientes.flatMap((r) =>
      (r.ingredientes as { nombre: string; cantidad: string; unidad: string }[]).map((ing) => ({
        usuario_id: perfil.id,
        nombre: ing.nombre,
        cantidad: ing.cantidad,
        unidad: ing.unidad,
        receta_id: r.id,
        receta_nombre: r.nombre,
      }))
    )

    await supabase.from('lista_compras_nutriki').insert(items)
    alert('Lista de compras generada. Revisala en la sección Lista.')
  }

  const nombreReceta = (id: number | null) => {
    if (!id) return null
    return recetas.find((r) => r.id === id)?.nombre
  }

  return (
    <div className="min-h-screen bg-crema pb-20">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-texto">Plan semanal</h1>
          <button
            onClick={generarListaCompras}
            className="bg-verde text-white text-sm font-bold px-4 py-2 rounded-xl"
          >
            🛒 Generar lista
          </button>
        </div>

        <div className="space-y-4">
          {DIAS.map((dia) => (
            <div key={dia} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-verde/10 px-4 py-2">
                <h3 className="font-bold text-verde">{dia}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {COMIDAS.map((comida) => {
                  const recetaId = plan[dia]?.[comida] ?? null
                  const nombre = nombreReceta(recetaId)
                  return (
                    <div key={comida} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="text-xs text-gray-400 font-semibold">{comidaLabel[comida]}</p>
                        {nombre ? (
                          <p className="text-sm font-semibold text-texto">{nombre}</p>
                        ) : (
                          <p className="text-sm text-gray-300">Sin asignar</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {recetaId && (
                          <button
                            onClick={() => quitarReceta(dia, comida)}
                            className="text-red-400 text-xs px-2 py-1 rounded-lg bg-red-50"
                          >
                            Quitar
                          </button>
                        )}
                        <button
                          onClick={() => abrirModal(dia, comida)}
                          className="text-verde text-xs font-bold px-3 py-1 rounded-lg bg-green-50"
                        >
                          {recetaId ? 'Cambiar' : '+ Agregar'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setModal(null)}>
          <div
            className="bg-white w-full max-w-lg mx-auto rounded-t-3xl max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white px-4 pt-4 pb-2 border-b border-gray-100">
              <h3 className="text-lg font-bold text-texto">Elegir receta — {comidaLabel[modal.comida]}</h3>
            </div>
            <div className="p-4 space-y-2">
              {recetasFiltradas.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No hay recetas para esta comida.</p>
              ) : (
                recetasFiltradas.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => seleccionarReceta(r.id)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors"
                  >
                    <p className="font-semibold text-texto text-sm">{r.nombre}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}

export default function PlanSemanalPage() {
  return (
    <AuthGuard>
      <PlanContent />
    </AuthGuard>
  )
}
