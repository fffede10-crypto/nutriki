'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function RegistroPage() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleRegistro(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      setLoading(false)
      return
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre } },
    })

    if (authError) {
      console.error('[Supabase Auth] signUp error:', authError)
      setError(`Error Supabase: ${authError.message} (status ${authError.status ?? 'n/a'})`)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: dbError } = await supabase.from('usuarios_nutriki').upsert({
        id: data.user.id,
        email,
        nombre,
        acceso_activo: false,
        vio_bienvenida: false,
        restricciones_alimentarias: [],
        preferencias: [],
      })
      if (dbError) console.error('[Supabase DB] upsert usuarios_nutriki:', dbError)
    } else {
      // signUp sin error pero sin user — confirmación de email pendiente
      console.warn('[Supabase Auth] signUp OK pero data.user es null — email confirmation requerida')
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-crema flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-verde mb-3">¡Registro exitoso!</h2>
          <p className="text-gray-600 mb-6">
            Tu cuenta fue creada. Para activar el acceso, escribinos por WhatsApp al{' '}
            <a href="https://wa.me/5493518509904" className="text-verde font-semibold">
              +54 9 351 850-9904
            </a>{' '}
            con tu nombre y el email que usaste.
          </p>
          <Link
            href="/login"
            className="block w-full bg-verde text-white py-3 rounded-xl font-bold text-center"
          >
            Ir al login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-crema flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🥦</div>
            <h1 className="text-3xl font-bold text-verde">Nutriki</h1>
            <p className="text-gray-500 mt-1">Creá tu cuenta gratis</p>
          </div>

          <form onSubmit={handleRegistro} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-texto mb-1">Tu nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="María González"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-verde text-texto"
              />
            </div>
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
                placeholder="Mínimo 6 caracteres"
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
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" className="text-verde font-semibold">
              Ingresá
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
