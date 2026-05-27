'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

export default function EnsaladasGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [acceso, setAcceso] = useState<boolean | null>(null)

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace('/login')
      return
    }
    verificarAcceso(user.id)
  }, [user, loading])

  async function verificarAcceso(userId: string) {
    const { data } = await supabase
      .from('usuario_productos')
      .select('activo')
      .eq('usuario_id', userId)
      .eq('producto', 'ensaladas_gourmet')
      .eq('activo', true)
      .single()

    if (!data) {
      router.replace('/sin-acceso?producto=ensaladas')
      return
    }
    setAcceso(true)
  }

  if (loading || acceso === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="text-center">
          <div className="text-4xl mb-3">🥗</div>
          <p className="font-semibold" style={{ color: '#2D6A4F' }}>Cargando...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
