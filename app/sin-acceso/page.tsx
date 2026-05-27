'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

const PRODUCTOS: Record<string, { nombre: string; emoji: string; descripcion: string; precio: string; checkoutUrl: string }> = {
  ensaladas: {
    nombre: 'Ensaladas Gourmet',
    emoji: '🥗',
    descripcion: '50 recetas gourmet + 10 aderezos que te cambian la cocina. Listas en minutos, con sabor de restaurante.',
    precio: '$9.999 ARS',
    checkoutUrl: 'https://nutriki.com.ar/productos/ensaladas-gourmet',
  },
}

function SinAccesoContent() {
  const params = useSearchParams()
  const productoKey = params.get('producto') || ''
  const producto = PRODUCTOS[productoKey]

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center px-5 text-center">
      <div className="max-w-sm w-full">
        <div className="text-6xl mb-4">{producto?.emoji || '🔒'}</div>

        <h1 className="text-2xl font-bold mb-2" style={{ color: '#2D6A4F' }}>
          {producto ? `Este módulo no está incluido en tu plan` : 'Acceso no disponible'}
        </h1>

        {producto ? (
          <>
            <p className="text-gray-600 mb-6 leading-relaxed">
              <strong>{producto.nombre}</strong> es un módulo aparte. {producto.descripcion}
            </p>

            <div className="bg-white rounded-2xl p-5 mb-6 border border-gray-100 shadow-sm text-left">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{producto.emoji}</span>
                <div>
                  <p className="font-bold text-gray-900">{producto.nombre}</p>
                  <p className="text-sm text-gray-500">{producto.descripcion.split('.')[0]}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold" style={{ color: '#2D6A4F' }}>{producto.precio}</span>
                <span className="text-xs text-gray-400">acceso de por vida</span>
              </div>
            </div>

            <a
              href={producto.checkoutUrl}
              className="block w-full py-4 rounded-2xl font-bold text-white text-center mb-4 active:scale-95 transition-transform"
              style={{ backgroundColor: '#F4A261' }}
            >
              Comprar acceso →
            </a>

            <p className="text-xs text-gray-400 mb-6">
              Después de la compra, el acceso se activa automáticamente.
            </p>
          </>
        ) : (
          <p className="text-gray-600 mb-6">No tenés acceso a este contenido todavía.</p>
        )}

        <div className="flex flex-col gap-3">
          <Link href="/dashboard" className="text-sm font-semibold" style={{ color: '#2D6A4F' }}>
            ← Volver al inicio
          </Link>
          <a
            href="https://wa.me/5493518509904"
            className="text-sm text-gray-500"
          >
            ¿Preguntas? Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SinAccesoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center"><div className="text-4xl">🔒</div></div>}>
      <SinAccesoContent />
    </Suspense>
  )
}
