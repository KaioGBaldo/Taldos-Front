import { FileText, Map, Headphones, Users, Sword, Shield, Check, Disc, Twitter, Youtube, Instagram } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

/* --- SUB-COMPONENTE: FEATURE CARD MODERNO --- */
function FeatureCard({ title, description, icon: Icon }: { title: string, description: string, icon: any }) {
  return (
    <div className="relative group p-[1px] rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Ajuste de cores para o card: bg-white/70 e border-white no light | bg-white/5 e border-white/10 no dark */}
      <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 h-full p-8 rounded-[2rem] flex flex-col gap-5 shadow-sm hover:shadow-xl hover:shadow-brand-accent/5 transition-all">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-full h-full bg-brand-dark rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:-rotate-12 group-hover:bg-brand-accent">
            <Icon className="text-white" size={26} strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {/* Título: text-brand-dark no light | text-white no dark */}
          <h3 className="font-black text-brand-dark dark:text-white text-xl tracking-tight leading-tight">{title}</h3>
          {/* Descrição: text-brand-muted no light | text-slate-400 no dark */}
          <p className="text-brand-muted dark:text-slate-400 text-sm leading-relaxed font-medium">{description}</p>
        </div>
        <div className="mt-auto pt-4 flex items-center gap-2 text-brand-accent opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
          <span className="text-[10px] font-black uppercase tracking-widest">Saiba mais</span>
          <div className="h-[1px] w-8 bg-brand-accent" />
        </div>
      </div>
    </div>
  )
}

/* --- PÁGINA PRINCIPAL --- */
export default function Home() {
  return (
    // Fundo principal dinâmico
    <main className="flex flex-col w-full bg-brand-bg dark:bg-brand-dark transition-colors duration-500">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[650px] md:min-h-[750px] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_rpg.png" 
            alt="Background RPG"
            fill
            className="object-cover object-center scale-105 brightness-[0.7] grayscale-[0.3]" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          {/* Gradiente inferior: to-brand-bg no light | to-brand-dark no dark */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bg dark:to-brand-dark transition-colors duration-500 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-brand-accent font-black uppercase tracking-[0.4em] text-[10px]">
              Bem Vindo(a) ao Taldo's suas aventuras começam aqui
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter uppercase italic">
              Seu RPG.<br /> Seu mundo.<br /> Suas regras.
            </h1>
            <p className="text-lg text-gray-200 max-w-md leading-relaxed font-medium">
              Jogue, crie e gerencie campanhas em um único lugar. Uma plataforma pensada para mestres que buscam imersão total.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <button className="bg-brand-accent text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:brightness-110 transition-all shadow-2xl">
                Começar agora
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                Explorar Recursos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO: COMO FUNCIONA (STEP BY STEP) --- */}
      {/* bg-white dark:bg-brand-dark/50 | border-slate-100 dark:border-white/5 */}
      <section className="relative z-30 w-full bg-white dark:bg-brand-dark/50 py-16 border-b border-slate-100 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-12">
          {[ 
            { n: "01", t: "Crie a sua conta" }, 
            { n: "02", t: "Monte a sua mesa" }, 
            { n: "03", t: "Chame o seu grupo" }, 
            { n: "04", t: "Role os dados" } 
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4 group">
              {/* bg-brand-surface dark:bg-white/5 | border-slate-200 dark:border-white/10 */}
              <span className="w-10 h-10 rounded-xl bg-brand-surface dark:bg-white/5 flex items-center justify-center font-black text-xs text-brand-accent border border-slate-200 dark:border-white/10 group-hover:bg-brand-dark dark:group-hover:bg-brand-accent group-hover:text-white transition-all">
                {step.n}
              </span>
              <span className="text-xs font-black text-brand-dark dark:text-white uppercase tracking-widest transition-colors">{step.t}</span>
              {i < 3 && <div className="hidden lg:block w-8 h-[1px] bg-slate-200 dark:bg-white/10" />}
            </div>
          ))}
        </div>
      </section>

      {/* --- SEÇÃO DE RECURSOS --- */}
      <section className="relative max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full -z-10" />
        
        <div className="flex flex-col gap-4 mb-20 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="h-[2px] w-12 bg-brand-accent" />
            <span className="text-xs font-black text-brand-accent uppercase tracking-[0.4em]">Ferramentas do Sistema</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark dark:text-white tracking-tighter italic uppercase transition-colors">
            Tudo o que você precisa <br /> para narrar como um mestre.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={FileText} title="Fichas Dinâmicas" description="Crie atributos e perícias customizadas para qualquer sistema de RPG do mundo." />
          <FeatureCard icon={Map} title="Mapas de Batalha" description="Grid inteligente com Fog of War e suporte para tokens animados em tempo real." />
          <FeatureCard icon={Headphones} title="Atmosfera Sonora" description="Mixagem de som integrada para trilhas e efeitos ambientais simultâneos." />
          <FeatureCard icon={Users} title="Busca de Grupos" description="Sistema de LFG para encontrar jogadores que combinam com seu estilo de jogo." />
          <FeatureCard icon={Sword} title="Compêndio Custom" description="Biblioteca própria para monstros, itens e magias criadas pela comunidade." />
          <FeatureCard icon={Shield} title="Sincronização Cloud" description="Acesse suas notas e campanhas de qualquer dispositivo, a qualquer momento." />
        </div>
      </section>

      {/* --- SEÇÃO: VOCÊ JOGA COMO? --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
        <h2 className="text-3xl font-black text-brand-dark dark:text-white text-center mb-16 uppercase tracking-widest italic transition-colors">Escolha o seu caminho</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* CARD PLAYER / MESTRE: bg-white dark:bg-brand-dark/40 | border-slate-200 dark:border-white/10 */}
          {[
            { label: "PLAYER", features: ["Inventário interativo", "Diário de aventuras", "Chat com rolagem de dados"], btn: "Sou Jogador" },
            { label: "MESTRE", features: ["Gerenciador de NPCs", "Controle de iniciativa", "Editor de mundo (Wiki)"], btn: "Sou Mestre" }
          ].map((role, idx) => (
            <div key={idx} className="bg-white dark:bg-brand-dark/40 border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-sm hover:border-brand-accent transition-all group">
              <div className="h-48 bg-brand-dark flex items-center justify-center border-b border-slate-100 dark:border-white/5">
                  <p className="text-brand-bg font-black text-5xl tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">{role.label}</p>
              </div>
              <div className="p-10 flex flex-col gap-8">
                <ul className="space-y-4 text-brand-muted dark:text-slate-400 font-bold text-sm transition-colors">
                  {role.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3"><Check size={18} className="text-brand-accent" /> {f}</li>
                  ))}
                </ul>
                <button className="w-full py-4 bg-brand-surface dark:bg-white/5 text-brand-dark dark:text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-dark dark:hover:bg-brand-accent hover:text-white transition-all">
                  {role.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}