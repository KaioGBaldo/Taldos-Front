'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evita erros de renderização entre servidor e cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-9 h-9" /> // Espaço reservado enquanto carrega

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-xl bg-brand-accent/10 border border-brand-accent/20 hover:bg-brand-accent/20 transition-all flex items-center justify-center"
    >
      {theme === 'dark' ? (
        <Sun className="text-brand-accent" size={20} />
      ) : (
        <Moon className="text-brand-accent" size={20} />
      )}
    </button>
  )
}