'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'
import RecetaCard from '@/components/RecetaCard'
import { Receta } from '@/types'

function getHorarioActual(): 'desayuno' | 'almuerzo' | 'merienda' | 'cena' {
  const h = new Date().getHours()
  if (h < 10) return 'desayuno'
  if (h < 14) return 'almuerzo'
  if (h < 18) return 'merienda'
  return 'cena'
}

function DashboardContent() {
  const { perfil } = useAuth()
  const router = useRouter()
  const [recetasRapidas, setRecetasRapidas] = useState<Receta[]>([])
  const [recetasPopulares, setRecetasPopulares] = useState<Receta[]>([])
  const [loading, setLoading] = useState(true)
  const horario = getHorarioActual()

  useEffect(() => {
    if (perfil && !perfil.acceso_activo) {
      return
    }
    if (perfil && !perfil.vio_bienvenida) {
      router.push('/onboarding')
      return
    }
    cargarRecetas()
  }, [perfil])

  async function cargarRecetas() {
    const [rapidasRes, popularesRes] = await Promise.all([
      supabase
        .from('recetas_nutriki')
        .select('*')
        .lte('lista_en_minutos', 15)
        .limit(4),
      supabase
        .from('recetas_nutriki')
        .select('*')
        .gte('indice_popularidad', 4)
        .limit(4),
    ])
    if (rapidasRes.data) setRecetasRapidas(rapidasRes.data as Receta[])
    if (popularesRes.data) setRecetasPopulares(popularesRes.data as Receta[])
    setLoading(false)
  }

  if (perfil && !perfil.acceso_activo) {
    return (
      <div className="min-h-screen bg-crema flex flex-col items-center justify-center px-5 text-center">
        <div className="text-5xl mb-4">⏳</div>
        <h2 className="text-2xl font-bold text-verde mb-3">Acceso en proceso</h2>
        <p className="text-gray-600 mb-6">
          Tu acceso todavía no fue activado. Escribinos por WhatsApp y te lo activamos en menos de 5 minutos.
        </p>
        <a
          href="https://wa.me/5493518509904"
          className="bg-verde text-white px-8 py-3 rounded-xl font-bold"
        >
          Escribirnos por WhatsApp
        </a>
      </div>
    )
  }

  const nombreHijo = perfil?.nombre_hijo || 'tu hijo'
  const saludo = new Date().getHours() < 12 ? 'Buenos días' : new Date().getHours() < 20 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div className="min-h-screen bg-crema pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-4">
        <div className="mb-6">
          <p className="text-gray-500 text-sm">{saludo},</p>
          <h1 className="text-2xl font-bold text-texto">
            ¿Qué come <span className="text-verde">{nombreHijo}</span> hoy?
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link href="/recetas" className="bg-verde text-white rounded-2xl p-4 flex flex-col gap-1 active:scale-95 transition-transform">
            <span className="text-2xl">📖</span>
            <span className="font-bold">Ver recetas</span>
            <span className="text-xs opacity-80">+200 ideas</span>
          </Link>
          <Link href="/plan-semanal" className="bg-naranja text-white rounded-2xl p-4 flex flex-col gap-1 active:scale-95 transition-transform">
            <span className="text-2xl">📅</span>
            <span className="font-bold">Plan semanal</span>
            <span className="text-xs opacity-80">Organizá la semana</span>
          </Link>
          <Link href="/viandas" className="bg-rosa text-white rounded-2xl p-4 flex flex-col gap-1 active:scale-95 transition-transform">
            <span className="text-2xl">🎒</span>
            <span className="font-bold">Viandas</span>
            <span className="text-xs opacity-80">Para el colegio</span>
          </Link>
          <Link href="/lista-compras" className="bg-celeste text-texto rounded-2xl p-4 flex flex-col gap-1 active:scale-95 transition-transform">
            <span className="text-2xl">🛒</span>
            <span className="font-bold">Lista de compras</span>
            <span className="text-xs opacity-70">Todo organizado</span>
          </Link>
        </div>

        {!loading && recetasRapidas.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-texto">⚡ En menos de 15 minutos</h2>
              <Link href="/recetas" className="text-verde text-sm font-semibold">Ver todo</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {recetasRapidas.map((r) => (
                <RecetaCard key={r.id} receta={r} />
              ))}
            </div>
          </section>
        )}

        {!loading && recetasPopulares.length > 0 && (
          <section className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-texto">⭐ Favoritas de los chicos</h2>
              <Link href="/recetas" className="text-verde text-sm font-semibold">Ver todo</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {recetasPopulares.map((r) => (
                <RecetaCard key={r.id} receta={r} />
              ))}
            </div>
          </section>
        )}

        {loading && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-2">🥦</div>
            <p>Cargando recetas...</p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
