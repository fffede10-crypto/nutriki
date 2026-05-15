'use client'

import Link from 'next/link'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'

const guias = [
  {
    href: '/guias/organizacion',
    emoji: '📋',
    titulo: 'Organizá la semana en 30 minutos',
    desc: 'Batch cooking, congelamiento y organización semanal para no improvisar.',
    bg: 'bg-green-50',
    border: 'border-green-200',
    dot: 'bg-verde',
  },
  {
    href: '/guias/alergias',
    emoji: '🌿',
    titulo: 'Recetas para chicos con alergias',
    desc: 'Cómo cocinar sin leche, gluten, huevo o frutos secos sin complicarte.',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    dot: 'bg-purple-500',
  },
  {
    href: '/guias/dulces',
    emoji: '🍯',
    titulo: 'Dulces sin culpa que los chicos piden repetir',
    desc: 'Endulzantes naturales y cómo adaptar cualquier postre para que sea más sano.',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  {
    href: '/guias/jugos',
    emoji: '🥤',
    titulo: 'Jugos y licuados que los chicos toman solos',
    desc: 'La regla del semáforo y 5 combinaciones base para que tomen más fruta.',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    dot: 'bg-cyan-500',
  },
  {
    href: '/guias/viandas',
    emoji: '🎒',
    titulo: 'Cómo armar la vianda perfecta en 10 minutos',
    desc: 'La fórmula probada + checklist interactivo + 7 combos listos para copiar.',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    dot: 'bg-rosa',
  },
]

function GuiasContent() {
  return (
    <div className="min-h-screen bg-crema pb-24">
      <div className="bg-verde text-white px-4 pt-10 pb-6">
        <h1 className="text-2xl font-bold mb-1">📚 Guías para vos</h1>
        <p className="text-sm text-white/80">Todo lo que necesitás para cocinar mejor para tus hijos</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-3">
        {guias.map((g) => (
          <Link key={g.href} href={g.href} className="block">
            <div className={`${g.bg} border ${g.border} rounded-2xl p-4 flex items-start gap-4 active:scale-[0.99] transition-transform`}>
              <span className="text-4xl flex-none mt-0.5">{g.emoji}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-texto text-base leading-snug mb-1">{g.titulo}</h2>
                <p className="text-sm text-gray-500 leading-snug">{g.desc}</p>
              </div>
              <span className="text-gray-300 flex-none self-center text-lg">›</span>
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}

export default function GuiasPage() {
  return (
    <AuthGuard>
      <GuiasContent />
    </AuthGuard>
  )
}
