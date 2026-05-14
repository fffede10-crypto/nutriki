'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'
import RecetaCard from '@/components/RecetaCard'
import { Receta } from '@/types'

function diasSemana(): string {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  return dias[new Date().getDay()]
}

function ViandasContent() {
  const [viandas, setViandas] = useState<Receta[]>([])
  const [sugerencia, setSugerencia] = useState<Receta | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarViandas()
  }, [])

  async function cargarViandas() {
    const { data } = await supabase
      .from('recetas_nutriki')
      .select('*')
      .eq('apta_vianda', true)
      .order('indice_popularidad', { ascending: false })
    if (data && data.length > 0) {
      setViandas(data as Receta[])
      const idx = new Date().getDate() % data.length
      setSugerencia(data[idx] as Receta)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-crema pb-20">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-2xl font-bold text-texto mb-1">Viandas</h1>
        <p className="text-gray-500 text-sm mb-5">Ideas para la mochila del colegio</p>

        {sugerencia && (
          <div className="bg-verde rounded-2xl p-4 mb-6 text-white">
            <p className="text-xs font-bold opacity-80 mb-1">SUGERENCIA DEL {diasSemana().toUpperCase()}</p>
            <p className="font-bold text-lg">{sugerencia.nombre}</p>
            {sugerencia.tiempo_preparacion && (
              <p className="text-sm opacity-80 mt-1">⏱ {sugerencia.tiempo_preparacion} minutos</p>
            )}
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">
          <p className="text-sm text-amber-800">
            <strong>Tip vianda:</strong> Evitá los ingredientes que se humedecen (tomate, lechuga). Mandá salsas y aderezos separados. En verano, usá bolsa de gel frío.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-3xl mb-2">🎒</div>
            <p>Cargando viandas...</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-3">{viandas.length} opciones aptas para vianda</p>
            <div className="grid grid-cols-2 gap-3">
              {viandas.map((r) => (
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
