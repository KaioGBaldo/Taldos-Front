'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Lock, ChevronRight, Github, Chrome } from 'lucide-react'
import { SoloLevelingModal } from '@/components/SoloLevelingModal'

export default function LoginPage() {
  const router = useRouter()
  const [showErrorModal, setShowErrorModal] = useState(false)

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // VERIFICAÇÃO DO BALDUR
    if (email === 'baldur' && password === '12102003') {
      document.cookie = "session_token=valid_token_baldur; path=/; max-age=3600"
      router.push('/perfil')
    } else {
      setShowErrorModal(true)
    }
  }

  return (
    <main className="relative w-full min-h-screen flex items-center justify-center bg-[#0F172A] p-6 overflow-hidden">
      
      {/* MODAL DE SEGURANÇA INTEGRADO */}
      <SoloLevelingModal 
        isOpen={showErrorModal} 
        onClose={() => setShowErrorModal(false)} 
      />

      {/* BACKGROUND IMERSIVO */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero_rpg.png" 
          alt="Background"
          fill
          className="object-cover opacity-30 grayscale-[0.5] scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0F172A] z-10" />
      </div>

      {/* CARD DE LOGIN */}
      <div className="relative z-20 w-full max-w-[440px]">
        
        {/* LOGO + TÍTULO */}
        <div className="flex flex-col items-center mb-10 group">
          <h1 className="text-[#F8F5F2] font-black text-4xl tracking-[-0.05em] uppercase italic text-center leading-none">
            <span className="text-[#B45309] not-italic">Taldo's Bar</span> 
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-[1px] w-4 bg-[#B45309]/50" />
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">Inicie sua Sessão</p>
            <div className="h-[1px] w-4 bg-[#B45309]/50" />
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)]">
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="space-y-4">
              <input 
                name="email"
                type="text" 
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#B45309] focus:bg-white/[0.08] transition-all text-sm font-medium"
                placeholder="Nome de Guerra"
              />
              <input 
                name="password"
                type="password" 
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#B45309] focus:bg-white/[0.08] transition-all text-sm font-medium"
                placeholder="Sinal Secreto"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#B45309] hover:bg-white hover:text-[#0F172A] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-500 flex items-center justify-center gap-2 group shadow-lg shadow-[#B45309]/10"
            >
              Entrar na Taverna
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* SOCIAL LOGIN */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Acesso Rápido</span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest">
              Github
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest">
              Google
            </button>
          </div>

          <div className="mt-8 text-center border-t border-white/5 pt-8">
            <Link href="/cadastro" className="text-[10px] font-black text-slate-400 hover:text-[#B45309] uppercase tracking-widest transition-colors">
              Novo aventureiro? <span className="text-white ml-1">Crie sua ficha →</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}