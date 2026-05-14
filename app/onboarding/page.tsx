'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import AuthGuard from '@/components/AuthGuard'

const restricciones = [
  { key: 'sin_gluten', label: 'Sin TACC / Sin gluten' },
  { key: 'sin_lacteos', label: 'Sin lácteos' },
  { key: 'sin_huevo', label: 'Sin huevo' },
  { key: 'vegetariana', label: 'Vegetariana' },
  { key: 'vegana', label: 'Vegana' },
  { key: 'sin_frutos_secos', label: 'Sin frutos secos' },
]

function OnboardingContent() {
  const { user, refreshPerfil } = useAuth()
  const router = useRouter()
  const [paso, setPaso] = useState(1)
  const [nombreHijo, setNombreHijo] = useState('')
  const [edadHijo, setEdadHijo] = useState(5)
  const [restriccionesSeleccionadas, setRestriccionesSeleccionadas] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  function toggleRestriccion(key: string) {
    setRestriccionesSeleccionadas((prev) =>
      prev.includes(key) ? prev.filter((r) => r !== key) : [...prev, key]
    )
  }

  async function finalizar() {
    if (!user) return
    setSaving(true)
    await supabase
      .from('usuarios_nutriki')
      .update({
        nombre_hijo: nombreHijo,
        edad_hijo: edadHijo,
        restricciones_alimentarias: restriccionesSeleccionadas,
        vio_bienvenida: true,
      })
      .eq('id', user.id)
    await refreshPerfil()
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-crema flex flex-col">
      <div className="flex-1 flex flex-col px-5 py-8 max-w-sm mx-auto w-full">
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-2 flex-1 rounded-full transition-colors ${n <= paso ? 'bg-verde' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        {paso === 1 && (
          <div className="flex-1 flex flex-col">
            <div className="text-5xl mb-4">🥦</div>
            <h1 className="text-3xl font-bold text-verde mb-3">¡Bienvenida a Nutriki!</h1>
            <p className="text-gray-600 mb-4">
              Más de 200 recetas pensadas para lo que los chicos argentinos realmente comen, en menos de 15 minutos y con ingredientes de tu verdulería.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
              <p className="text-sm text-amber-800">
                <strong>Aviso importante:</strong> El contenido de Nutriki es de carácter informativo y educativo. No reemplaza la consulta con un pediatra o nutricionista infantil.
              </p>
            </div>
            <button
              onClick={() => setPaso(2)}
              className="mt-auto w-full bg-verde text-white py-4 rounded-xl font-bold text-lg"
            >
              ¡Empezamos! →
            </button>
          </div>
        )}

        {paso === 2 && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-texto mb-2">¿Cómo se llama tu hijo/a?</h2>
            <p className="text-gray-500 mb-6">Te ayudamos a personalizar las recetas para su edad.</p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-texto mb-2">Nombre del hijo/a</label>
              <input
                type="text"
                value={nombreHijo}
                onChange={(e) => setNombreHijo(e.target.value)}
                placeholder="Ej: Lucía, Mateo..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-verde text-texto"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-texto mb-2">
                Edad: <span className="text-verde font-bold">{edadHijo} {edadHijo === 1 ? 'año' : 'años'}</span>
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

            <div className="mt-auto flex gap-3">
              <button
                onClick={() => setPaso(1)}
                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold"
              >
                Atrás
              </button>
              <button
                onClick={() => setPaso(3)}
                className="flex-2 flex-grow bg-verde text-white py-3 rounded-xl font-bold"
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {paso === 3 && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-texto mb-2">¿Tiene alguna restricción?</h2>
            <p className="text-gray-500 mb-6">Seleccioná todas las que apliquen. Podés cambiarlas después en tu perfil.</p>

            <div className="space-y-3 mb-4">
              {restricciones.map((r) => (
                <button
                  key={r.key}
                  onClick={() => toggleRestriccion(r.key)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-colors text-left ${
                    restriccionesSeleccionadas.includes(r.key)
                      ? 'border-verde bg-green-50 text-verde'
                      : 'border-gray-200 bg-white text-texto'
                  }`}
                >
                  <span className="font-semibold">{r.label}</span>
                  <span>{restriccionesSeleccionadas.includes(r.key) ? '✅' : '⬜'}</span>
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-400 text-center mb-4">
              Si no tiene ninguna restricción, dejá todo sin seleccionar.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setPaso(2)}
                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold"
              >
                Atrás
              </button>
              <button
                onClick={finalizar}
                disabled={saving}
                className="flex-2 flex-grow bg-verde text-white py-3 rounded-xl font-bold disabled:opacity-60"
              >
                {saving ? 'Guardando...' : '¡Listo! Ir a mis recetas →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <AuthGuard>
      <OnboardingContent />
    </AuthGuard>
  )
}
