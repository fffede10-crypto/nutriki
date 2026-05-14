'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crema">
        <div className="text-center">
          <div className="text-4xl mb-3">🥦</div>
          <p className="text-verde font-semibold">Cargando Nutriki...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}
