import { 
  FileText, Map as MapIcon, Headphones, 
  Users, Sword, Shield, Zap, Scroll, 
  ChevronRight, Coffee 
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

/* --- SUB-COMPONENTE: RESOURCE CARD (DINÂMICO) --- */
function ResourceCard({ title, description, icon: Icon, tag }: any) {
  return (
    <div className="relative group p-[1px] rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Ajuste de Vidro: Branco translúcido no Light | Escuro profundo no Dark */}
      <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 h-full p-8 rounded-[2rem] flex flex-col gap-5 shadow-sm hover:shadow-xl hover:shadow-brand-accent/5 transition-all">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-full h-full bg-brand-dark rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:-rotate-12 group-hover:bg-brand-accent">
            <Icon className="text-white" size={26} strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em]">{tag}</span>
          {/* Títulos: Dark no Light | Bege/Branco no Dark */}
          <h3 className="font-black text-brand-dark dark:text-brand-bg text-xl tracking-tight leading-tight italic uppercase">{title}</h3>
          {/* Descrição: Muted no Light | Slate-400 no Dark */}
          <p className="text-brand-muted dark:text-slate-400 text-sm leading-relaxed font-medium">{description}</p>
        </div>
        <div className="mt-auto pt-4 flex items-center gap-2 text-brand-accent opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
          <span className="text-[10px] font-black uppercase tracking-widest">Ver detalhes</span>
          <div className="h-[1px] w-8 bg-brand-accent" />
        </div>
      </div>
    </div>
  )
}

export default function RecursosPage() {
  return (
    // Fundo dinâmico da página
    <main className="flex flex-col w-full bg-brand-bg dark:bg-brand-dark transition-colors duration-500 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[500px] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_rpg.png" 
            alt="Recursos Background"
            fill
            className="object-cover object-center scale-105 brightness-[0.6] grayscale-[0.2]" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          {/* Transição de gradiente para o fundo dinâmico */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bg dark:to-brand-dark z-10 transition-colors duration-500" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col gap-6 max-w-2xl">
            <span className="text-brand-accent font-black uppercase tracking-[0.4em] text-[10px]">
              Arsenal do Mestre
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter uppercase italic">
              Ferramentas de <br /><span className="text-brand-accent not-italic">Elite.</span>
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed font-medium">
              Explore o ecossistema completo do Taldo's Bar. De fichas automatizadas a mapas dinâmicos, tudo pensado para sua imersão.
            </p>
          </div>
        </div>
      </section>

      {/* --- GRID DE RECURSOS --- */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 w-full">
        {/* Efeito de brilho de fundo adaptado */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 dark:bg-brand-accent/10 blur-[120px] rounded-full -z-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ResourceCard 
            tag="Sistemas"
            icon={Scroll}
            title="Grimório Automatizado" 
            description="Crie fichas que calculam bônus, perícias e resistências instantaneamente para qualquer sistema." 
          />
          <ResourceCard 
            tag="Visual"
            icon={MapIcon}
            title="Mapas em Tempo Real" 
            description="Sistema de névoa de guerra e grid magnético para movimentação precisa de tokens dos jogadores." 
          />
          <ResourceCard 
            tag="Áudio"
            icon={Headphones}
            title="Mixer de Imersão" 
            description="Biblioteca de sons ambientais e trilhas sonoras que sincronizam com todos na mesa." 
          />
          <ResourceCard 
            tag="Comunidade"
            icon={Users}
            title="Mural de Missões" 
            description="Encontre grupos ou mestres com o mesmo estilo de jogo através do nosso sistema de matchmaking." 
          />
          <ResourceCard 
            tag="Performance"
            icon={Zap}
            title="Iniciativa Inteligente" 
            description="Rastreador de combate que automatiza turnos, condições de status e efeitos temporários." 
          />
          <ResourceCard 
            tag="Segurança"
            icon={Shield}
            title="Backup na Nuvem" 
            description="Suas campanhas, NPCs e notas de mundo protegidas e acessíveis em qualquer dispositivo." 
          />
        </div>
      </section>

      {/* --- SEÇÃO CTA --- */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {/* Ajuste de borda no CTA: border-slate-200 no light | border-white/5 no dark */}
        <div className="bg-brand-dark rounded-[3rem] p-12 relative overflow-hidden group border border-transparent dark:border-white/5 transition-colors">
          <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Pronto para começar a narrar?</h2>
              <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest">Sua primeira taverna está a um clique de distância.</p>
            </div>
            <Link href="/cadastro">
              <button className="bg-brand-accent text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-brand-accent/20">
                Criar Minha Conta
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}