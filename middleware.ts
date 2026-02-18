// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Tenta buscar o cookie de sessão (ou token)
  const session = request.cookies.get('session_token')?.value

  // 2. Define quais rotas são privadas
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/perfil') || 
    request.nextUrl.pathname.startsWith('/mensagens')

  // 3. Se for privada e não tiver sessão, manda para o login
  if (isProtectedRoute && !session) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Configura em quais caminhos o middleware deve rodar
export const config = {
  matcher: ['/perfil/:path*', '/mensagens/:path*'],
}