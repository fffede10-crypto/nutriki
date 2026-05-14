import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Nutriki — Recetas infantiles para Argentina',
  description: '+200 recetas rápidas y nutritivas para niños de 1 a 12 años. Listas en menos de 15 minutos con ingredientes de tu verdulería.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-crema text-texto antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
