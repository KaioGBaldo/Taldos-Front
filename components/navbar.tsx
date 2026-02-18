'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { LogOut } from 'lucide-react'

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false)
  const router = useRouter()

  // Função nativa para ler cookies
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return null
  }

  // Verifica o login ao carregar e quando a rota mudar
  useEffect(() => {
    const token = getCookie('session_token')
    setIsLogged(!!token)
  }, [])

  const handleLogout = () => {
    // Remove o cookie nativamente (expirando a data dele)
    document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    setIsLogged(false)
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="w-full bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/logo.png" 
            alt="Taldo Logo" 
            width={40} 
            height={40} 
            className="object-contain"
          />
          <span className="text-brand-accent font-bold uppercase text-xs">Taldo's Bar</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-muted dark:text-slate-300">
          <Link href="/" className="hover:text-brand-accent transition-colors">Inicio</Link>
          <Link href="/recursos" className="hover:text-brand-accent transition-colors">Recursos</Link>
          <Link href="/comunidade" className="hover:text-brand-accent transition-colors">Comunidade</Link>
          <Link href="/sobre" className="hover:text-brand-accent transition-colors">Sobre</Link>
          {isLogged && (
            <Link href="/perfil" className="hover:text-brand-accent transition-colors text-brand-accent">Meu Perfil</Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isLogged ? (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 px-6 py-2 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
            >
              Sair <LogOut size={16} />
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-brand-accent text-white px-6 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition-all shadow-md shadow-amber-900/10">
                Login →
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}