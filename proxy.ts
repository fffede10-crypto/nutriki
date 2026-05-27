import { NextRequest, NextResponse } from 'next/server'

// Auth is handled client-side by AuthGuard and EnsaladasGuard.
// Supabase v2 (without @supabase/ssr) stores the session in localStorage,
// not in cookies, so server-side session checks here would always fail.
export function proxy(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
