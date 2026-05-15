'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'
import RecetaCard from '@/components/RecetaCard'
import FiltroBar from '@/components/FiltroBar'
import { Receta } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

const filtrosCat = [
  { key: 'todas', label: 'Todas' },
  { key: 'desayuno', label: '🌅 Desayuno' },
  { key: 'almuerzo', label: '☀️ Almuerzo' },
  { key: 'cena', label: '🌙 Cena' },
  { key: 'merienda', label: '🍎 Merienda' },
  { key: 'postre', label: '🍮 Postre' },
  { key: 'jugo', label: '🥤 Jugo' },
]

const filtrosEspeciales = [
  { key: 'todas', label: 'Sin filtro' },
  { key: 'apta_vianda', label: '🎒 Vianda' },
  { key: 'sin_gluten', label: 'Sin TACC' },
  { key: 'sin_lacteos', label: 'Sin lácteos' },
  { key: 'vegetariana', label: '🌿 Vegetariana' },
  { key: 'rapidas', label: '⚡ Rápidas' },
]

function RecetasContent() {
  const { perfil } = useAuth()
  const [recetas, setRecetas] = useState<Receta[]>([])
  const [filteredRecetas, setFilteredRecetas] = useState<Receta[]>([])
  const [catActiva, setCatActiva] = useState('todas')
  const [especial, setEspecial] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)
  const [favoritos, setFavoritos] = useState<number[]>([])

  useEffect(() => {
    // Inicializar filtros desde URL params (ej: /recetas?cat=postre&especial=apta_vianda)
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('cat')
    const esp = params.get('especial')
    if (cat) setCatActiva(cat)
    if (esp) setEspecial(esp)
  }, [])

  useEffect(() => {
    cargarRecetas()
    if (perfil) cargarFavoritos()
  }, [perfil])

  useEffect(() => {
    aplicarFiltros()
  }, [recetas, catActiva, especial, busqueda])

  async function cargarRecetas() {
    const { data, error } = await supabase.from('recetas_nutriki').select('*').order('indice_popularidad', { ascending: false })
    if (error) console.error('[recetas] Supabase error:', error.code, error.message, error.details, error.hint)
    if (data) setRecetas(data as Receta[])
    else console.warn('[recetas] data es null — posible bloqueo RLS o tabla vacía')
    setLoading(false)
  }

  async function cargarFavoritos() {
    if (!perfil) return
    const { data } = await supabase
      .from('favoritos_nutriki')
      .select('receta_id')
      .eq('usuario_id', perfil.id)
    if (data) setFavoritos(data.map((f) => f.receta_id))
  }

  function aplicarFiltros() {
    let result = [...recetas]
    if (catActiva !== 'todas') result = result.filter((r) => r.categoria === catActiva)
    if (especial === 'apta_vianda') result = result.filter((r) => r.apta_vianda)
    else if (especial === 'sin_gluten') result = result.filter((r) => r.sin_gluten)
    else if (especial === 'sin_lacteos') result = result.filter((r) => r.sin_lacteos)
    else if (especial === 'vegetariana') result = result.filter((r) => r.vegetariana)
    else if (especial === 'rapidas') result = result.filter((r) => (r.lista_en_minutos ?? 999) <= 15)
    if (busqueda) result = result.filter((r) => r.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    setFilteredRecetas(result)
  }

  async function toggleFavorito(recetaId: number) {
    if (!perfil) return
    if (favoritos.includes(recetaId)) {
      await supabase.from('favoritos_nutriki').delete().eq('usuario_id', perfil.id).eq('receta_id', recetaId)
      setFavoritos((prev) => prev.filter((id) => id !== recetaId))
    } else {
      await supabase.from('favoritos_nutriki').insert({ usuario_id: perfil.id, receta_id: recetaId })
      setFavoritos((prev) => [...prev, recetaId])
    }
  }

  return (
    <div className="min-h-screen bg-crema pb-20">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-2xl font-bold text-texto mb-4">Recetas</h1>

        <div className="mb-3">
          <input
            type="search"
            placeholder="Buscar receta..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-texto text-sm focus:outline-none focus:ring-2 focus:ring-verde"
          />
        </div>

        <div className="mb-2">
          <FiltroBar filtros={filtrosCat} activo={catActiva} onChange={setCatActiva} />
        </div>
        <div className="mb-4">
          <FiltroBar filtros={filtrosEspeciales} activo={especial} onChange={setEspecial} />
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-3xl mb-2">🥦</div>
            <p>Cargando recetas...</p>
          </div>
        ) : filteredRecetas.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-3xl mb-2">🔍</div>
            <p>No encontramos recetas con esos filtros.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-3">{filteredRecetas.length} recetas</p>
            <div className="grid grid-cols-2 gap-3">
              {filteredRecetas.map((r) => (
                <RecetaCard
                  key={r.id}
                  receta={r}
                  showFavorito
                  esFavorito={favoritos.includes(r.id)}
                  onFavorito={toggleFavorito}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  )
}

export default function RecetasPage() {
  return (
    <AuthGuard>
      <RecetasContent />
    </AuthGuard>
  )
}
