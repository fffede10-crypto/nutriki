'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'
import { ItemListaCompras } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

function ListaContent() {
  const { perfil } = useAuth()
  const [items, setItems] = useState<ItemListaCompras[]>([])
  const [loading, setLoading] = useState(true)
  const [nuevoItem, setNuevoItem] = useState('')

  useEffect(() => {
    if (perfil) cargarLista()
  }, [perfil])

  async function cargarLista() {
    if (!perfil) return
    const { data } = await supabase
      .from('lista_compras_nutriki')
      .select('*')
      .eq('usuario_id', perfil.id)
      .order('receta_nombre', { ascending: true })
    if (data) setItems(data as ItemListaCompras[])
    setLoading(false)
  }

  async function tildar(id: string, tildado: boolean) {
    await supabase.from('lista_compras_nutriki').update({ tildado: !tildado }).eq('id', id)
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, tildado: !tildado } : i))
  }

  async function eliminarTildados() {
    if (!perfil) return
    await supabase.from('lista_compras_nutriki').delete().eq('usuario_id', perfil.id).eq('tildado', true)
    setItems((prev) => prev.filter((i) => !i.tildado))
  }

  async function agregarManual(e: React.FormEvent) {
    e.preventDefault()
    if (!perfil || !nuevoItem.trim()) return
    const { data } = await supabase.from('lista_compras_nutriki').insert({
      usuario_id: perfil.id,
      nombre: nuevoItem.trim(),
    }).select().single()
    if (data) setItems((prev) => [...prev, data as ItemListaCompras])
    setNuevoItem('')
  }

  const porReceta: Record<string, ItemListaCompras[]> = {}
  const sinReceta: ItemListaCompras[] = []

  items.forEach((item) => {
    if (item.receta_nombre) {
      if (!porReceta[item.receta_nombre]) porReceta[item.receta_nombre] = []
      porReceta[item.receta_nombre].push(item)
    } else {
      sinReceta.push(item)
    }
  })

  const tildados = items.filter((i) => i.tildado).length

  return (
    <div className="min-h-screen bg-crema pb-20">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-texto">Lista de compras</h1>
          {tildados > 0 && (
            <button
              onClick={eliminarTildados}
              className="text-red-500 text-sm font-semibold"
            >
              Eliminar tildados ({tildados})
            </button>
          )}
        </div>

        <form onSubmit={agregarManual} className="flex gap-2 mb-6">
          <input
            type="text"
            value={nuevoItem}
            onChange={(e) => setNuevoItem(e.target.value)}
            placeholder="Agregar ítem manualmente..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-verde"
          />
          <button
            type="submit"
            className="bg-verde text-white px-4 py-2.5 rounded-xl font-bold"
          >
            +
          </button>
        </form>

        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-3xl mb-2">🛒</div>
            <p>Cargando lista...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-3xl mb-2">🛒</div>
            <p>Tu lista de compras está vacía.</p>
            <p className="text-sm mt-2">Generala desde el plan semanal o agregá ítems de las recetas.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(porReceta).map(([recetaNombre, its]) => (
              <div key={recetaNombre} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-verde/10 px-4 py-2">
                  <p className="text-xs font-bold text-verde">📖 {recetaNombre}</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {its.map((item) => (
                    <ItemRow key={item.id} item={item} onTildar={tildar} />
                  ))}
                </div>
              </div>
            ))}

            {sinReceta.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-4 py-2">
                  <p className="text-xs font-bold text-gray-500">Otros ítems</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {sinReceta.map((item) => (
                    <ItemRow key={item.id} item={item} onTildar={tildar} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}

function ItemRow({ item, onTildar }: { item: ItemListaCompras; onTildar: (id: string, tildado: boolean) => void }) {
  return (
    <button
      onClick={() => onTildar(item.id, item.tildado)}
      className="w-full flex items-center gap-3 px-4 py-3 text-left"
    >
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-none transition-colors ${
        item.tildado ? 'bg-verde border-verde' : 'border-gray-300'
      }`}>
        {item.tildado && <span className="text-white text-xs">✓</span>}
      </div>
      <div className="flex-1">
        <span className={`text-sm font-semibold ${item.tildado ? 'line-through text-gray-400' : 'text-texto'}`}>
          {item.nombre}
        </span>
        {(item.cantidad || item.unidad) && (
          <span className="text-xs text-gray-400 ml-2">{item.cantidad} {item.unidad}</span>
        )}
      </div>
    </button>
  )
}

export default function ListaComprasPage() {
  return (
    <AuthGuard>
      <ListaContent />
    </AuthGuard>
  )
}
