'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/ensaladas-gourmet', label: 'Inicio', icon: '🏠' },
  { href: '/ensaladas-gourmet/recetas', label: 'Recetas', icon: '🥗' },
  { href: '/ensaladas-gourmet/aderezos', label: 'Aderezos', icon: '🫙' },
  { href: '/ensaladas-gourmet/meal-prep', label: 'Meal prep', icon: '📦' },
  { href: '/ensaladas-gourmet/guias', label: 'Guías', icon: '📚' },
]

export default function EnsaladasNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const active = pathname === tab.href || (tab.href !== '/ensaladas-gourmet' && pathname.startsWith(tab.href))
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors ${
                active ? 'text-[#2D6A4F]' : 'text-gray-400'
              }`}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span className={`text-[10px] font-medium leading-none ${active ? 'text-[#2D6A4F]' : 'text-gray-400'}`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
