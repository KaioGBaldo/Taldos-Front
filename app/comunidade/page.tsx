import { 
  Users, MessageSquare, Trophy, 
  Search, Globe, Sword, 
  ChevronRight, Disc, Github, 
  Calendar, Flame
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

/* --- SUB-COMPONENTE: CARD DE MURAL --- */
function GuildCard({ title, members, status, type }: any) {
  return (
    <div className="relative group p-[1px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Card: bg-white/70 (Light) | dark:bg-white/5 (Dark) */}
      <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur-3xl border border-white dark:border-white/10 h-full p-8 rounded-[2.5rem] flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 bg-brand-dark rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-brand-accent transition-colors">
            <Users className="text-white" size={24} />
          </div>
          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${status === 'Ativo' ? 'bg-green-600/20 text-green-700 dark:text-green-400' : 'bg-brand-accent/20 text-brand-accent'}`}>
            {status}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">{type}</span>
          <h3 className="text-xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic mt-1">{title}</h3>
          <p className="text-brand-muted dark:text-slate-400 text-[11px] font-bold mt-2 uppercase tracking-tight">{members} Membros Ativos</p>
        </div>
        <button className="mt-auto w-full py-3 bg-brand-dark dark:bg-brand-accent text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all">
          Unir-se à Guilda
        </button>
      </div>
    </div>
  )
}

export default function ComunidadePage() {
  return (
    <main className="w-full bg-brand-bg dark:bg-brand-dark min-h-screen transition-colors duration-500">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[550px] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_rpg.png" 
            alt="Comunidade Background"
            fill
            className="object-cover scale-105 brightness-[0.6] grayscale-[0.2]" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bg dark:to-brand-dark transition-colors duration-500 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-brand-accent">
              <Flame size={18} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Taverna Lotada</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase italic">
              Onde as lendas <br /><span className="text-brand-accent not-italic">se reúnem.</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-lg font-medium">
              Encontra o teu próximo grupo, partilha recursos homebrew e participa em eventos globais da nossa comunidade.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="bg-brand-accent text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-brand-accent/20">
                Ver Mural de Mesas
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all flex items-center gap-2">
                <Disc size={18} /> Discord Oficial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- MURAL DE GUILDAS --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <div className="h-[2px] w-12 bg-brand-accent" />
            <h2 className="text-4xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic leading-none transition-colors">
              Guildas em <span className="text-brand-accent">Destaque</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black text-brand-accent uppercase tracking-widest hover:brightness-125 transition-all">
            Explorar todas as guildas <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GuildCard type="High Fantasy" title="Ordem do Cálice" members="1.2k" status="Ativo" />
          <GuildCard type="Terror/Dark" title="Círculo de Sangue" members="850" status="Ativo" />
          <GuildCard type="Cyberpunk" title="Neon Syndicate" members="420" status="Recrutando" />
          <GuildCard type="Casual/RP" title="Taverna do Bardo" members="2.5k" status="Ativo" />
        </div>
      </section>

      {/* --- SEÇÃO: EVENTOS (DINÂMICA) --- */}
      <section className="bg-white/30 dark:bg-white/[0.02] border-y border-white dark:border-white/5 py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 flex flex-col gap-6">
            <h3 className="text-3xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic">Eventos <br />Próximos</h3>
            <p className="text-brand-muted dark:text-slate-400 font-bold text-sm">Não fiques de fora das One-Shots globais e concursos de criação de mundo.</p>
            <div className="mt-4 p-6 bg-brand-dark rounded-3xl shadow-xl">
              <Calendar className="text-brand-accent mb-4" size={32} />
              <p className="text-white font-black text-lg uppercase tracking-tight italic">Game Jam de RPG</p>
              <p className="text-brand-accent font-black text-[10px] uppercase tracking-widest mt-1">20 de Março - 2026</p>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { t: "Workshop de Mestres", d: "Aprende a criar vilões memoráveis.", icon: Sword },
              { t: "Copa de Homebrew", d: "Vota nos melhores itens mágicos.", icon: Trophy },
              { t: "Arena de Fichas", d: "Testa a tua build em combates rápidos.", icon: Zap },
              { t: "Fórum Global", d: "Tira as tuas dúvidas sobre regras.", icon: MessageSquare }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[2rem] hover:shadow-lg transition-all flex flex-col gap-4 group">
                <item.icon className="text-brand-accent group-hover:scale-110 transition-transform" size={24} />
                <h4 className="text-lg font-black text-brand-dark dark:text-white uppercase tracking-tighter italic leading-none transition-colors">{item.t}</h4>
                <p className="text-brand-muted dark:text-slate-400 text-xs font-bold leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- CTA DISCORD --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="bg-brand-dark rounded-[3.5rem] p-12 flex flex-col items-center text-center gap-8 shadow-2xl relative overflow-hidden group border border-transparent dark:border-white/5 transition-colors">
          <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center rotate-12 shadow-xl">
             <Disc size={40} className="text-brand-accent" />
          </div>
          <div className="flex flex-col gap-2 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">
              A conversa continua no Discord.
            </h2>
            <p className="text-white/60 font-black uppercase tracking-widest text-[10px]">Mais de 15,000 aventureiros online agora</p>
          </div>
          <button className="bg-brand-accent text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl z-10">
            Entrar no Servidor Oficial
          </button>
        </div>
      </section>

    </main>
  )
}

function Zap({ size, className }: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}