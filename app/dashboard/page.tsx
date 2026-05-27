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
import { UsuarioProducto } from '@/types/ensaladas'

const PRODUCTOS_CONFIG: Record<string, { slug: string; nombre: string; emoji: string; descripcion: string; color: string }> = {
  tiroides_activa: {
    slug: 'dashboard',
    nombre: 'Tiroides Activa',
    emoji: '🌿',
    descripcion: '65 recetas para tu tiroides',
    color: '#1B4332',
  },
  ensaladas_gourmet: {
    slug: 'ensaladas-gourmet',
    nombre: 'Ensaladas Gourmet',
    emoji: '🥗',
    descripcion: '50 ensaladas + 10 aderezos',
    color: '#2D6A4F',
  },
}

type HorarioKey = 'desayuno' | 'almuerzo' | 'merienda' | 'cena'

function getHorario(): HorarioKey {
  const h = new Date().getHours()
  if (h >= 6 && h < 11) return 'desayuno'
  if (h >= 11 && h < 15) return 'almuerzo'
  if (h >= 15 && h < 19) return 'merienda'
  return 'cena'
}

function getSaludo(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 20) return 'Buenas tardes'
  return 'Buenas noches'
}

const horarioLabel: Record<HorarioKey, string> = {
  desayuno: 'Para el desayuno',
  almuerzo: 'Para el almuerzo',
  merienda: 'Para la merienda',
  cena: 'Para la cena',
}

const horarioBg: Record<HorarioKey, string> = {
  desayuno: '#FFF3E0',
  almuerzo: '#E8F5E9',
  merienda: '#FCE4EC',
  cena: '#E3F2FD',
}

const horarioEmoji: Record<HorarioKey, string> = {
  desayuno: '☀️',
  almuerzo: '🍽️',
  merienda: '🍎',
  cena: '🌙',
}

const guiasCards = [
  { href: '/guias/organizacion', emoji: '📋', titulo: 'Organizá la semana', bg: 'bg-green-50' },
  { href: '/guias/alergias',     emoji: '🌿', titulo: 'Alergias',          bg: 'bg-purple-50' },
  { href: '/guias/dulces',       emoji: '🍯', titulo: 'Dulces sin culpa',  bg: 'bg-amber-50'  },
  { href: '/guias/jugos',        emoji: '🥤', titulo: 'Jugos y licuados',  bg: 'bg-cyan-50'   },
  { href: '/guias/viandas',      emoji: '🎒', titulo: 'Vianda perfecta',   bg: 'bg-pink-50'   },
]

function DashboardContent() {
  const { perfil, user } = useAuth()
  const router = useRouter()
  const [destacada, setDestacada] = useState<Receta | null>(null)
  const [recetasRapidas, setRecetasRapidas] = useState<Receta[]>([])
  const [recetasPopulares, setRecetasPopulares] = useState<Receta[]>([])
  const [productos, setProductos] = useState<UsuarioProducto[]>([])
  const [loading, setLoading] = useState(true)
  const horario = getHorario()

  useEffect(() => {
    if (perfil && !perfil.acceso_activo) return
    if (perfil && !perfil.vio_bienvenida) {
      router.push('/onboarding')
      return
    }
    if (user) cargarProductos(user.id)
    cargarRecetas()
  }, [perfil, user])

  async function cargarProductos(userId: string) {
    const { data } = await supabase
      .from('usuario_productos')
      .select('*')
      .eq('usuario_id', userId)
      .eq('activo', true)
    if (data) setProductos(data as UsuarioProducto[])
  }

  async function cargarRecetas() {
    const [destRes, rapidasRes, popularesRes] = await Promise.all([
      supabase
        .from('recetas_nutriki')
        .select('*')
        .eq('categoria', horario)
        .order('indice_popularidad', { ascending: false })
        .limit(1),
      supabase
        .from('recetas_nutriki')
        .select('*')
        .lte('lista_en_minutos', 15)
        .order('indice_popularidad', { ascending: false })
        .limit(8),
      supabase
        .from('recetas_nutriki')
        .select('*')
        .gte('indice_popularidad', 4)
        .order('indice_popularidad', { ascending: false })
        .limit(8),
    ])
    if (destRes.error) console.error('[dashboard/destacada]', destRes.error.message)
    if (rapidasRes.error) console.error('[dashboard/rapidas]', rapidasRes.error.message)
    if (popularesRes.error) console.error('[dashboard/populares]', popularesRes.error.message)
    if (destRes.data?.[0]) setDestacada(destRes.data[0] as Receta)
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
        <a href="https://wa.me/5493518509904" className="bg-verde text-white px-8 py-3 rounded-xl font-bold">
          Escribirnos por WhatsApp
        </a>
      </div>
    )
  }

  const nombreHijo = perfil?.nombre_hijo || 'tu hijo'

  return (
    <div className="min-h-screen bg-crema pb-24">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="px-4 pt-8 pb-4 flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm">{getSaludo()},</p>
            <h1 className="text-2xl font-bold text-texto">
              ¿Qué come <span className="text-verde">{nombreHijo}</span> hoy?
            </h1>
          </div>
          <Link
            href="/perfil"
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-lg mt-1 flex-none"
          >
            👤
          </Link>
        </div>

        <div className="px-4">

          {/* Cards de módulos adicionales */}
          {productos.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Tus módulos</p>
              <div className="flex flex-col gap-2">
                {productos.map((p) => {
                  const cfg = PRODUCTOS_CONFIG[p.producto]
                  if (!cfg) return null
                  return (
                    <Link
                      key={p.producto}
                      href={`/${cfg.slug}`}
                      className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-gray-100 shadow-sm active:scale-[0.98] transition-transform"
                    >
                      <span className="text-2xl flex-none">{cfg.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-sm" style={{ color: cfg.color }}>{cfg.nombre}</p>
                        <p className="text-xs text-gray-500">{cfg.descripcion}</p>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: cfg.color }}>Entrar →</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Receta destacada del momento */}
          {!loading && destacada && (
            <Link href={`/recetas/${destacada.id}`} className="block mb-5">
              <div
                className="rounded-2xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm"
                style={{ backgroundColor: horarioBg[horario] }}
              >
                <span className="text-5xl flex-none">{horarioEmoji[horario]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">
                    {horarioLabel[horario]}
                  </p>
                  <h2 className="font-bold text-texto leading-snug line-clamp-2 mb-1">
                    {destacada.nombre}
                  </h2>
                  {destacada.tiempo_preparacion && (
                    <p className="text-xs text-gray-500">⏱ {destacada.tiempo_preparacion} min</p>
                  )}
                </div>
                <span className="text-verde font-bold text-sm flex-none">Ver →</span>
              </div>
            </Link>
          )}

          {/* Accesos rápidos 2x2 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link href="/recetas" className="bg-verde text-white rounded-2xl p-4 flex flex-col gap-1 active:scale-95 transition-transform">
              <span className="text-2xl">🍽️</span>
              <span className="font-bold">Ver recetas</span>
              <span className="text-xs opacity-80">+90 ideas</span>
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
            <Link href="/guias" className="bg-celeste text-texto rounded-2xl p-4 flex flex-col gap-1 active:scale-95 transition-transform">
              <span className="text-2xl">📚</span>
              <span className="font-bold">Guías</span>
              <span className="text-xs opacity-70">Consejos y tips</span>
            </Link>
          </div>

          {loading && (
            <div className="text-center py-10 text-gray-400">
              <div className="text-3xl mb-2">🥦</div>
              <p>Cargando recetas...</p>
            </div>
          )}

          {/* Scroll horizontal: Rápidas */}
          {!loading && recetasRapidas.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-texto">⚡ En menos de 15 min</h2>
                <Link href="/recetas?especial=rapidas" className="text-verde text-sm font-semibold">Ver todo</Link>
              </div>
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex gap-3 pb-1" style={{ width: 'max-content' }}>
                  {recetasRapidas.map((r) => (
                    <div key={r.id} className="w-40 flex-none">
                      <RecetaCard receta={r} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Scroll horizontal: Populares */}
          {!loading && recetasPopulares.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-texto">⭐ Favoritas de los chicos</h2>
                <Link href="/recetas" className="text-verde text-sm font-semibold">Ver todo</Link>
              </div>
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex gap-3 pb-1" style={{ width: 'max-content' }}>
                  {recetasPopulares.map((r) => (
                    <div key={r.id} className="w-40 flex-none">
                      <RecetaCard receta={r} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Scroll horizontal: Guías rápidas */}
          <section className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-texto">📚 Guías para vos</h2>
              <Link href="/guias" className="text-verde text-sm font-semibold">Ver todas</Link>
            </div>
            <div className="overflow-x-auto -mx-4 px-4">
              <div className="flex gap-3 pb-1" style={{ width: 'max-content' }}>
                {guiasCards.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className={`w-36 flex-none ${g.bg} rounded-2xl p-3 border border-gray-100 flex flex-col gap-2 active:scale-[0.98] transition-transform`}
                  >
                    <span className="text-2xl">{g.emoji}</span>
                    <span className="text-xs font-bold text-texto leading-tight">{g.titulo}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
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
