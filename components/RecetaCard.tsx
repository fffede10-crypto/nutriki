'use client'

import Link from 'next/link'
import { Receta } from '@/types'

const catConfig: Record<string, { bg: string; emoji: string; badgeBg: string; badgeText: string; label: string }> = {
  desayuno: { bg: '#FFF3E0', emoji: '☀️',  badgeBg: 'bg-amber-100',  badgeText: 'text-amber-700',  label: 'Desayuno' },
  almuerzo: { bg: '#E8F5E9', emoji: '🍽️', badgeBg: 'bg-green-100',  badgeText: 'text-green-700',  label: 'Almuerzo' },
  cena:     { bg: '#E3F2FD', emoji: '🌙',  badgeBg: 'bg-blue-100',   badgeText: 'text-blue-700',   label: 'Cena'     },
  merienda: { bg: '#FCE4EC', emoji: '🍎',  badgeBg: 'bg-pink-100',   badgeText: 'text-pink-700',   label: 'Merienda' },
  postre:   { bg: '#F3E5F5', emoji: '🍫',  badgeBg: 'bg-purple-100', badgeText: 'text-purple-700', label: 'Postre'   },
  jugo:     { bg: '#E0F7FA', emoji: '🥤',  badgeBg: 'bg-cyan-100',   badgeText: 'text-cyan-700',   label: 'Jugo'     },
}

interface Props {
  receta: Receta
  showFavorito?: boolean
  esFavorito?: boolean
  onFavorito?: (id: number) => void
}

export default function RecetaCard({ receta, showFavorito, esFavorito, onFavorito }: Props) {
  const cfg = catConfig[receta.categoria] ?? catConfig.desayuno

  return (
    <Link href={`/recetas/${receta.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow active:scale-[0.98]">
        {/* Imagen / header de categoría */}
        <div
          className="h-32 relative overflow-hidden"
          style={{ backgroundColor: cfg.bg }}
        >
          {receta.imagen_url ? (
            <img
              src={receta.imagen_url}
              alt={receta.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl select-none">{cfg.emoji}</span>
            </div>
          )}
          {/* Overlay degradado sutil para legibilidad de badges */}
          {receta.imagen_url && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
          )}
          {receta.tiempo_preparacion && (
            <span className="absolute top-2 left-2 bg-white/90 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              ⏱ {receta.tiempo_preparacion} min
            </span>
          )}
          {showFavorito && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFavorito?.(receta.id)
              }}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 shadow-sm text-sm"
            >
              {esFavorito ? '❤️' : '🤍'}
            </button>
          )}
          {receta.apta_vianda && (
            <span className="absolute bottom-2 left-2 bg-verde text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              🎒 VIANDA
            </span>
          )}
        </div>

        {/* Contenido */}
        <div className="p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
              {cfg.label}
            </span>
            {receta.sin_gluten && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                Sin TACC
              </span>
            )}
          </div>
          <h3 className="font-bold text-texto text-sm leading-tight line-clamp-2 mb-2">
            {receta.nombre}
          </h3>
          {receta.indice_popularidad != null && (
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`text-xs ${i < receta.indice_popularidad! ? 'text-amber-400' : 'text-gray-200'}`}>
                  ★
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
