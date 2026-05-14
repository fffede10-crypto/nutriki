'use client'

import Link from 'next/link'
import { Receta } from '@/types'

const categoriaColors: Record<string, string> = {
  desayuno: 'bg-yellow-100 text-yellow-700',
  almuerzo: 'bg-green-100 text-green-700',
  cena: 'bg-blue-100 text-blue-700',
  merienda: 'bg-orange-100 text-orange-700',
  postre: 'bg-pink-100 text-pink-700',
  jugo: 'bg-cyan-100 text-cyan-700',
}

const categoriaLabel: Record<string, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  cena: 'Cena',
  merienda: 'Merienda',
  postre: 'Postre',
  jugo: 'Jugo',
}

interface Props {
  receta: Receta
  showFavorito?: boolean
  esFavorito?: boolean
  onFavorito?: (id: number) => void
}

export default function RecetaCard({ receta, showFavorito, esFavorito, onFavorito }: Props) {
  return (
    <Link href={`/recetas/${receta.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow active:scale-[0.98]">
        <div className="bg-gradient-to-br from-green-50 to-crema h-36 flex items-center justify-center relative">
          <span className="text-5xl">
            {receta.categoria === 'desayuno' ? '🌅' :
             receta.categoria === 'almuerzo' ? '☀️' :
             receta.categoria === 'cena' ? '🌙' :
             receta.categoria === 'merienda' ? '🍎' :
             receta.categoria === 'postre' ? '🍮' : '🥤'}
          </span>
          {showFavorito && (
            <button
              onClick={(e) => {
                e.preventDefault()
                onFavorito?.(receta.id)
              }}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm"
            >
              {esFavorito ? '❤️' : '🤍'}
            </button>
          )}
          {receta.apta_vianda && (
            <span className="absolute bottom-2 left-2 bg-verde text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              VIANDA
            </span>
          )}
        </div>
        <div className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${categoriaColors[receta.categoria]}`}>
              {categoriaLabel[receta.categoria]}
            </span>
            {receta.sin_gluten && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                Sin TACC
              </span>
            )}
          </div>
          <h3 className="font-bold text-texto text-sm leading-tight line-clamp-2 mb-1">
            {receta.nombre}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {receta.tiempo_preparacion && (
              <span>⏱ {receta.tiempo_preparacion} min</span>
            )}
            {receta.porciones && (
              <span>👥 {receta.porciones} porc.</span>
            )}
            {receta.indice_popularidad && receta.indice_popularidad >= 4 && (
              <span>⭐ Popular</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
