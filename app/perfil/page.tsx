'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'
import { useAuth } from '@/contexts/AuthContext'

const restricciones = [
  { key: 'sin_gluten', label: 'Sin TACC / Sin gluten' },
  { key: 'sin_lacteos', label: 'Sin lácteos' },
  { key: 'sin_huevo', label: 'Sin huevo' },
  { key: 'vegetariana', label: 'Vegetariana' },
  { key: 'vegana', label: 'Vegana' },
  { key: 'sin_frutos_secos', label: 'Sin frutos secos' },
]

function PerfilContent() {
  const { perfil, user, signOut, refreshPerfil } = useAuth()
  const router = useRouter()
  const [nombreHijo, setNombreHijo] = useState(perfil?.nombre_hijo || '')
  const [edadHijo, setEdadHijo] = useState(perfil?.edad_hijo || 5)
  const [restriccionesSeleccionadas, setRestriccionesSeleccionadas] = useState<string[]>(perfil?.restricciones_alimentarias || [])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (perfil) {
      setNombreHijo(perfil.nombre_hijo || '')
      setEdadHijo(perfil.edad_hijo || 5)
      setRestriccionesSeleccionadas(perfil.restricciones_alimentarias || [])
    }
  }, [perfil])

  function toggleRestriccion(key: string) {
    setRestriccionesSeleccionadas((prev) =>
      prev.includes(key) ? prev.filter((r) => r !== key) : [...prev, key]
    )
  }

  async function guardar() {
    if (!perfil) return
    setSaving(true)
    await supabase
      .from('usuarios_nutriki')
      .update({
        nombre_hijo: nombreHijo,
        edad_hijo: edadHijo,
        restricciones_alimentarias: restriccionesSeleccionadas,
      })
      .eq('id', perfil.id)
    await refreshPerfil()
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleSignOut() {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-crema pb-20">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-2xl font-bold text-texto mb-6">Perfil</h1>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-verde/20 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <p className="font-bold text-texto">{perfil?.nombre || 'Mamá'}</p>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <h2 className="font-bold text-texto mb-4">Datos del hijo/a</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-texto mb-2">Nombre</label>
            <input
              type="text"
              value={nombreHijo}
              onChange={(e) => setNombreHijo(e.target.value)}
              placeholder="Nombre del hijo/a"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-crema focus:outline-none focus:ring-2 focus:ring-verde text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-texto mb-2">
              Edad: <span className="text-verde">{edadHijo} {edadHijo === 1 ? 'año' : 'años'}</span>
            </label>
            <input
              type="range"
              min={1}
              max={12}
              value={edadHijo}
              onChange={(e) => setEdadHijo(Number(e.target.value))}
              className="w-full accent-verde"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 año</span>
              <span>12 años</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <h2 className="font-bold text-texto mb-4">Restricciones alimentarias</h2>
          <div className="space-y-2">
            {restricciones.map((r) => (
              <button
                key={r.key}
                onClick={() => toggleRestriccion(r.key)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-colors text-left ${
                  restriccionesSeleccionadas.includes(r.key)
                    ? 'border-verde bg-green-50 text-verde'
                    : 'border-gray-200 bg-crema text-texto'
                }`}
              >
                <span className="text-sm font-semibold">{r.label}</span>
                <span>{restriccionesSeleccionadas.includes(r.key) ? '✅' : '⬜'}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={guardar}
          disabled={saving}
          className="w-full bg-verde text-white py-3 rounded-xl font-bold mb-3 disabled:opacity-60"
        >
          {saved ? '✓ Guardado' : saving ? 'Guardando...' : 'Guardar cambios'}
        </button>

        <button
          onClick={handleSignOut}
          className="w-full border-2 border-red-200 text-red-500 py-3 rounded-xl font-bold"
        >
          Cerrar sesión
        </button>

        <p className="text-xs text-gray-400 text-center mt-6">
          El contenido de Nutriki es de carácter informativo. No reemplaza la consulta con un pediatra o nutricionista infantil.
        </p>
      </div>
      <BottomNav />
    </div>
  )
}

export default function PerfilPage() {
  return (
    <AuthGuard>
      <PerfilContent />
    </AuthGuard>
  )
}
