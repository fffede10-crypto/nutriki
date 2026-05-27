'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const RUTAS_PRODUCTO: Record<string, string> = {
  ensaladas_gourmet: '/ensaladas-gourmet',
  tiroides_activa: '/dashboard',
  nutriki_completo: '/dashboard',
}

function redirigir(ruta: string) {
  // Intenta con router primero; si no navega, fuerza con location
  window.location.href = ruta
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // PASO 1: autenticación
      console.log('[login] Intentando signInWithPassword...')
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password })
      console.log('[login] Resultado auth:', { user: authData?.user?.id, error: authError?.message })

      if (authError || !authData?.user) {
        setError('Email o contraseña incorrectos. Verificá y volvé a intentar.')
        setLoading(false)
        return
      }

      // PASO 2: buscar productos activos
      console.log('[login] Login OK, buscando productos para usuario:', authData.user.id)
      const { data: productos, error: prodError } = await supabase
        .from('usuario_productos')
        .select('producto')
        .eq('usuario_id', authData.user.id)
        .eq('activo', true)

      console.log('[login] Productos:', productos, '| Error:', prodError?.message)

      // PASO 3: decidir a dónde ir
      let destino = '/dashboard'

      if (productos && productos.length === 1) {
        destino = RUTAS_PRODUCTO[productos[0].producto] ?? '/dashboard'
      } else if (prodError) {
        // tabla no existe o error de permisos → ir al dashboard de todas formas
        console.warn('[login] Error consultando usuario_productos, redirigiendo a /dashboard')
      }

      console.log('[login] Redirigiendo a:', destino)
      redirigir(destino)

    } catch (err) {
      console.error('[login] Error inesperado:', err)
      setError('Ocurrió un error inesperado. Intentá de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-crema flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🥦</div>
            <h1 className="text-3xl font-bold text-verde">Nutriki</h1>
            <p className="text-gray-500 mt-1">Ingresá a tu cuenta</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-texto mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-verde text-texto"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-texto mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-verde text-texto"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-verde text-white py-3 rounded-xl font-bold text-base hover:bg-verde/90 transition-colors disabled:opacity-60"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            ¿No tenés cuenta?{' '}
            <Link href="/registro" className="text-verde font-semibold">
              Registrate
            </Link>
          </p>
          <p className="text-center mt-4">
            <Link href="/" className="text-gray-400 text-sm hover:text-gray-600">
              ← Volver al inicio
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
