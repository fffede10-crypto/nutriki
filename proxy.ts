import { NextRequest, NextResponse } from 'next/server'

const PROTECTED = [
  '/dashboard',
  '/recetas',
  '/plan-semanal',
  '/lista-compras',
  '/viandas',
  '/perfil',
  '/guias',
  '/onboarding',
  '/ensaladas-gourmet',
]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED.some((r) => pathname === r || pathname.startsWith(r + '/'))
  if (!isProtected) return NextResponse.next()

  // Supabase v2 stores session in sb-*-auth-token cookie
  const cookies = request.cookies.getAll()
  const hasSession = cookies.some((c) => c.name.includes('auth-token') && c.value.length > 10)

  if (!hasSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Product-level access (/ensaladas-gourmet) is enforced client-side by EnsaladasGuard
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
