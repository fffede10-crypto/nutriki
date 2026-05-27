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

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError || !authData.user) {
      setError('Email o contraseña incorrectos. Verificá y volvé a intentar.')
      setLoading(false)
      return
    }

    // Determinar a qué módulo redirigir según productos activos
    const { data: productos } = await supabase
      .from('usuario_productos')
      .select('producto')
      .eq('usuario_id', authData.user.id)
      .eq('activo', true)

    if (productos && productos.length === 1) {
      const ruta = RUTAS_PRODUCTO[productos[0].producto] ?? '/dashboard'
      router.push(ruta)
      return
    }

    // Sin productos específicos o con múltiples → dashboard principal
    router.push('/dashboard')
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
