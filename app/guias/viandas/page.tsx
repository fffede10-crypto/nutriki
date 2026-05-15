'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AuthGuard from '@/components/AuthGuard'
import BottomNav from '@/components/BottomNav'
import { useAuth } from '@/contexts/AuthContext'

const checklistItems = [
  { id: 'proteina', emoji: '🥩', label: 'Proteína', desc: 'Pollo, huevo, atún, queso, legumbres' },
  { id: 'carb', emoji: '🍞', label: 'Carbohidrato', desc: 'Pan, arroz, pasta, galletitas de avena' },
  { id: 'fruta', emoji: '🍎', label: 'Fruta o vegetal', desc: 'Fruta entera, palitos de zanahoria, choclo' },
  { id: 'hidra', emoji: '💧', label: 'Hidratación', desc: 'Agua, jugo natural, infusión fría' },
]

const combos = [
  { dia: 'Lunes', combo: 'Bolitas de avena + mandarina entera + agua con rodaja de limón' },
  { dia: 'Martes', combo: 'Sandwich de pollo con palta en pan integral + uvas + agua' },
  { dia: 'Miércoles', combo: 'Wrap de atún con zanahoria rallada + manzana + infusión de menta fría' },
  { dia: 'Jueves', combo: 'Tortilla española en tupper + frutillas + agua' },
  { dia: 'Viernes', combo: 'Mini pizzas de pan árabe + palitos de zanahoria con hummus + agua' },
  { dia: 'Sábado', combo: 'Tarta de verdura (porción) + banana + jugo de naranja natural' },
  { dia: 'Domingo', combo: 'Muffins de zanahoria + kiwi + agua con pepino' },
]

const noCambia = [
  { emoji: '🍅', item: 'Tomate y lechuga dentro del sandwich', razon: 'Se humedecen y ablandan todo' },
  { emoji: '🥑', item: 'Palta cortada sin limón', razon: 'Se oxida y queda fea' },
  { emoji: '🥛', item: 'Lácteos fuera de frío', razon: 'Riesgo de descomposición' },
  { emoji: '🍳', item: 'Huevo duro partido', razon: 'Se seca y huele mal' },
  { emoji: '🫙', item: 'Salsas mojadas en el sandwich', razon: 'Pan empapado al llegar' },
]

const tips_presentacion = [
  { emoji: '🌈', tip: 'Combiná 3 colores distintos. La variedad de colores hace la vianda visualmente atractiva.' },
  { emoji: '✂️', tip: 'Cortá la fruta en cubitos o usá cortadores con formas. Los chicos comen más cuando el formato es divertido.' },
  { emoji: '💌', tip: 'Metá una nota pequeña adentro: un emoji, un "te quiero" o un chiste. Funciona incluso con los más grandes.' },
  { emoji: '🎯', tip: 'Variá el recipiente: algunos días tupper, otros bolsita. El cambio mantiene la sorpresa.' },
]

function ViandasGuiaContent() {
  const { perfil } = useAuth()
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const nombreHijo = perfil?.nombre_hijo || 'tu hijo'

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vianda-checklist')
      if (saved) setChecked(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  function toggle(id: string) {
    const next = { ...checked, [id]: !checked[id] }
    setChecked(next)
    try { localStorage.setItem('vianda-checklist', JSON.stringify(next)) } catch { /* ignore */ }
  }

  function resetChecklist() {
    setChecked({})
    try { localStorage.removeItem('vianda-checklist') } catch { /* ignore */ }
  }

  const totalChecked = Object.values(checked).filter(Boolean).length

  return (
    <div className="min-h-screen bg-crema pb-24">
      <div className="bg-verde text-white px-4 pt-10 pb-6">
        <Link href="/guias" className="flex items-center gap-1.5 text-white/70 text-sm mb-4 hover:text-white transition-colors">
          ← Volver a guías
        </Link>
        <div className="text-3xl mb-2">🎒</div>
        <h1 className="text-2xl font-bold mb-1">La vianda perfecta en 10 minutos</h1>
        <p className="text-sm text-white/80">La fórmula probada para que {nombreHijo} coma bien en el recreo.</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* La fórmula */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">La fórmula de la vianda equilibrada</h2>
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              {checklistItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="font-bold text-texto text-sm">{item.label}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist interactivo */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-texto text-lg">Checklist de hoy</h2>
            <button
              onClick={resetChecklist}
              className="text-xs text-gray-400 underline"
            >
              Resetear
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {checklistItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${
                  i < checklistItems.length - 1 ? 'border-b border-gray-100' : ''
                } ${checked[item.id] ? 'bg-green-50' : 'bg-white'}`}
              >
                <span className={`flex-none w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  checked[item.id] ? 'border-verde bg-verde' : 'border-gray-300'
                }`}>
                  {checked[item.id] && <span className="text-white text-xs font-bold">✓</span>}
                </span>
                <span className="text-lg flex-none">{item.emoji}</span>
                <div>
                  <p className={`text-sm font-semibold ${checked[item.id] ? 'line-through text-gray-400' : 'text-texto'}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
          {totalChecked === 4 && (
            <div className="mt-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center">
              <p className="text-verde font-bold text-sm">¡La vianda está completa! 🎉</p>
            </div>
          )}
        </section>

        {/* 7 combos */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">7 combos listos para copiar</h2>
          <div className="space-y-2">
            {combos.map((c) => (
              <div key={c.dia} className="bg-white rounded-xl px-4 py-3 border border-gray-100 flex gap-3 items-start">
                <span className="flex-none font-bold text-verde text-sm w-16">{c.dia}</span>
                <span className="text-sm text-gray-700 leading-relaxed">{c.combo}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Qué NO mandar */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">Qué NO mandar (y por qué)</h2>
          <div className="space-y-2">
            {noCambia.map((n, i) => (
              <div key={i} className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex gap-3 items-start">
                <span className="text-xl flex-none">{n.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-texto">{n.item}</p>
                  <p className="text-xs text-red-600">{n.razon}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips presentación */}
        <section>
          <h2 className="font-bold text-texto text-lg mb-3">Tips de presentación</h2>
          <div className="space-y-2">
            {tips_presentacion.map((t, i) => (
              <div key={i} className="bg-white rounded-xl px-4 py-3 border border-gray-100 flex gap-3 items-start">
                <span className="text-xl flex-none">{t.emoji}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{t.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Link
          href="/recetas?especial=apta_vianda"
          className="block bg-verde text-white text-center font-bold py-4 rounded-2xl active:scale-[0.99] transition-transform"
        >
          Ver recetas aptas vianda →
        </Link>
      </div>

      <BottomNav />
    </div>
  )
}

export default function ViandasGuiaPage() {
  return (
    <AuthGuard>
      <ViandasGuiaContent />
    </AuthGuard>
  )
}
