import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react'

export default function CadastroPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-6 bg-brand-dark overflow-hidden">
      
      {/* --- BACKGROUND IDENTICO AO HERO DA HOME --- */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero_rpg.png" 
          alt="Background Cadastro"
          fill
          className="object-cover object-center scale-105 brightness-[0.5] grayscale-[0.3]" 
          priority
        />
        {/* Gradientes de foco e transição */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/60 to-brand-dark z-10" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-dark/80 z-10" />
      </div>

      {/* --- CARD DE CADASTRO (GLASSMORPHISM) --- */}
      <div className="relative z-20 w-full max-w-[500px]">
        
        {/* CABEÇALHO DO CARD */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-white font-black text-3xl md:text-4xl tracking-tighter uppercase italic text-center">
            Forjar <span className="text-brand-accent not-italic">Personagem</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-2">Inicie sua crônica agora</p>
        </div>

        {/* FORMULÁRIO ESTILO VIDRO */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          
          <form className="grid grid-cols-1 gap-5">
            
            {/* NOME DE GUERRA (USER) */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-brand-accent uppercase tracking-widest ml-2">Nome de Guerra</label>
              <input 
                type="text" 
                placeholder="Ex: Arathor_99"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all font-bold"
              />
            </div>

            {/* CORVO DE CONTATO (EMAIL) */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-brand-accent uppercase tracking-widest ml-2">Corvo de Contato</label>
              <input 
                type="email" 
                placeholder="seu@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all font-bold"
              />
            </div>

            {/* GRID DE SENHAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-brand-accent uppercase tracking-widest ml-2">Código</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-brand-accent outline-none font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-brand-accent uppercase tracking-widest ml-2">Confirmação</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-brand-accent outline-none font-bold"
                />
              </div>
            </div>

            {/* TERMOS */}
            <div className="flex items-start gap-3 px-2 mt-2 group cursor-pointer">
              <input type="checkbox" className="mt-1 accent-brand-accent rounded" id="terms" />
              <label htmlFor="terms" className="text-[10px] text-slate-400 font-bold uppercase leading-tight tracking-tight group-hover:text-white transition-colors">
                Aceito os <span className="text-brand-accent">Termos da Taverna</span> e prometo honrar meus dados.
              </label>
            </div>

            {/* BOTÃO FINAL */}
            <button className="w-full bg-brand-accent text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-110 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-accent/20 mt-4 group">
              Concluir Criação <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            </button>
          </form>

          {/* VOLTAR AO LOGIN */}
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <Link href="/login" className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-all inline-flex items-center gap-2">
              <ArrowLeft size={14} /> Já tem uma ficha? <span className="text-brand-accent">Fazer Login</span>
            </Link>
          </div>
        </div>

        {/* FOOTER DO CARD */}
        <div className="mt-8 flex items-center justify-center gap-2 text-white/20">
          <ShieldCheck size={16} />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Ambiente Protegido por Magia de Criptografia</span>
        </div>
      </div>
    </main>
  )
}