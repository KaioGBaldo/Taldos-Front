import { Coffee, Users, Scroll, Target, Star, ShieldCheck, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

/* --- SUB-COMPONENTE: CARD DE VALORES (ESTILO RECURSOS DINÂMICO) --- */
function ValueCard({ title, desc, icon: Icon }: any) {
  return (
    <div className="relative group p-[1px] rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
      {/* Gradiente de hover adaptado */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card: bg-white/70 (Light) | dark:bg-white/5 (Dark) */}
      <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 h-full p-8 rounded-[2rem] flex flex-col gap-5 shadow-sm hover:shadow-xl hover:shadow-brand-accent/5 transition-all">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-full h-full bg-brand-dark rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:-rotate-12 group-hover:bg-brand-accent">
            <Icon className="text-white" size={26} strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em]">Fundamentos</span>
          {/* Títulos: Dark no Light | Bege no Dark */}
          <h3 className="font-black text-brand-dark dark:text-brand-bg text-xl tracking-tight leading-tight italic uppercase transition-colors">{title}</h3>
          {/* Descrição: Muted no Light | Slate-400 no Dark */}
          <p className="text-brand-muted dark:text-slate-400 text-sm leading-relaxed font-medium transition-colors">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function SobrePage() {
  return (
    // Fundo principal dinâmico
    <main className="flex flex-col w-full bg-brand-bg dark:bg-brand-dark min-h-screen transition-colors duration-500">
      
      {/* --- HERO: A FUNDAÇÃO --- */}
      <section className="relative w-full min-h-[500px] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_rpg.png" 
            alt="Sobre Background"
            fill
            className="object-cover object-center scale-105 brightness-[0.6] grayscale-[0.2]" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          {/* Gradiente inferior aponta para o bg dinâmico */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bg dark:to-brand-dark z-10 transition-colors duration-500" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col gap-6 max-w-2xl">
            <span className="text-brand-accent font-black uppercase tracking-[0.4em] text-[10px]">Nossa Crônica</span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter uppercase italic">
              Mais que dados, <br /><span className="text-brand-accent not-italic">Histórias.</span>
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed font-medium">
              O Taldo's Bar nasceu do desejo de unir a nostalgia das mesas físicas com a potência das ferramentas digitais. Somos a casa de quem narra mundos.
            </p>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: O MANIFESTO --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-accent/20 blur-[80px] rounded-full" />
          <div className="relative rounded-[3rem] overflow-hidden border-2 border-brand-accent/20 shadow-2xl">
            <Image 
              src="/hero_rpg.png" 
              alt="Criação" 
              width={600} 
              height={800} 
              className="object-cover brightness-75 hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-brand-accent p-8 rounded-full shadow-2xl animate-pulse">
            <Coffee className="text-white" size={32} />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-3">
            <div className="h-[2px] w-12 bg-brand-accent" />
            <span className="text-xs font-black text-brand-accent uppercase tracking-widest text-brand-dark dark:text-brand-bg transition-colors">O Manifesto</span>
          </div>
          {/* Título Manifesto: Dark no light | White no Dark */}
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic leading-tight transition-colors">
            Para o mestre que <br /> perde o sono criando mundos.
          </h2>
          <div className="space-y-6 text-brand-muted dark:text-slate-400 font-bold leading-relaxed transition-colors">
            <p>
              Entendemos que o RPG é uma forma de arte. Por isso, cada pixel do Taldo's Bar foi pensado para não atrapalhar o fluxo da narrativa. Queremos que a ferramenta seja invisível, e a imersão seja total.
            </p>
            <p>
              Não somos apenas uma plataforma de gerenciamento; somos o lugar onde sua campanha vive entre uma sessão e outra, onde cada mapa revelado e cada ficha atualizada constrói um legado.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-brand-dark/10 dark:border-white/10">
            <div>
              <p className="text-3xl font-black text-brand-accent tracking-tighter italic">10k+</p>
              {/* Labels numéricos: Dark no light | Bege no Dark */}
              <p className="text-[10px] text-brand-dark dark:text-brand-bg font-black uppercase tracking-widest mt-1 transition-colors">Aventureiros</p>
            </div>
            <div>
              <p className="text-3xl font-black text-brand-accent tracking-tighter italic">50k+</p>
              <p className="text-[10px] text-brand-dark dark:text-brand-bg font-black uppercase tracking-widest mt-1 transition-colors">Sessões Narradas</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: NOSSOS PILARES --- */}
      {/* Fundo da seção: bg-white/30 no light | dark:bg-white/[0.02] no dark */}
      <section className="bg-white/30 dark:bg-white/[0.02] border-y border-white dark:border-white/5 py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic mb-4 transition-colors">Os Pilares da Taverna</h2>
            <p className="text-brand-muted dark:text-slate-400 font-bold uppercase tracking-widest text-xs transition-colors">O que nos move a cada nova linha de código</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard 
              icon={Target}
              title="Precisão Mecânica"
              desc="Sistemas complexos rodando de forma simples. Automação que serve à história, não o contrário."
            />
            <ValueCard 
              icon={Users}
              title="Foco na Guilda"
              desc="O RPG é coletivo. Criamos ferramentas que facilitam a conexão entre jogadores e o entrosamento do grupo."
            />
            <ValueCard 
              icon={ShieldCheck}
              title="Legado Eterno"
              desc="Suas histórias não morrem. Garantimos que seus dados e mundos estejam protegidos por gerações."
            />
          </div>
        </div>
      </section>

      {/* --- CTA FINAL: FAÇA PARTE --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-brand-dark rounded-[3.5rem] p-12 flex flex-col items-center text-center gap-8 shadow-2xl relative overflow-hidden group border border-transparent dark:border-white/5 transition-colors">
          <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <Star className="text-brand-accent animate-spin-slow" size={48} />
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none transition-colors">
              Sua história merece um lugar épico.
            </h2>
            <Link href="/cadastro">
              <button className="bg-brand-accent text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-brand-accent/20">
                Entrar para a Guilda
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}