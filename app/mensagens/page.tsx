import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { 
  User, MessageSquare, Settings, 
  Send, Shield, Sword, Zap, Bell, Scroll, 
  MapPin, Clock, ChevronRight
} from 'lucide-react'

/* --- SIMULAÇÃO DE DADOS DO BANCO (DADOS DO BALDUR) --- */
const NOTIFICACOES_MESAS = [
  { id: 1, mesa: "O Despertar do Dragão", msg: "O Mestre iniciou o combate!", tipo: "combate", icon: Sword },
  { id: 2, mesa: "Sombras de Taldaria", msg: "Sua ficha foi atualizada pelo mestre.", tipo: "update", icon: Scroll }
]

const QUESTS_ATIVAS = [
  { id: 1, titulo: "O Coração do Inverno", local: "Pico Gélido", recompensa: "500 PO", urgencia: "Alta" },
  { id: 2, titulo: "O Roubo da Relíquia", local: "Taverna do Taldo", recompensa: "Gema Mística", urgencia: "Média" }
]

export default async function MensagensPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value

  if (!token) redirect('/login')

  return (
    <main className="min-h-screen w-full bg-brand-bg dark:bg-brand-dark flex transition-colors duration-500">
      
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-24 flex-col items-center py-8 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-black/20 transition-colors">
        <Link href="/" className="mb-12">
          <Image src="/logo.png" alt="Logo" width={32} height={32} className="brightness-110" />
        </Link>
        <nav className="flex flex-col gap-8">
          <Link href="/perfil" className="text-brand-muted dark:text-slate-500 hover:text-brand-accent transition-colors p-3">
            <User size={24} />
          </Link>
          <Link href="/mensagens" className="text-brand-accent p-3 bg-brand-accent/10 rounded-2xl border border-brand-accent/20">
            <MessageSquare size={24} />
          </Link>
          <Link href="/configuracoes" className="text-brand-muted dark:text-slate-500 hover:text-brand-accent transition-colors p-3">
            <Settings size={24} />
          </Link>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="flex-1 flex flex-col md:flex-row h-screen overflow-hidden">
        
        {/* COLUNA ESQUERDA: CHATS E NOTIFICAÇÕES */}
        <div className="w-full md:w-[400px] border-r border-slate-200 dark:border-white/5 flex flex-col bg-slate-50/50 dark:bg-transparent overflow-y-auto">
          
          {/* HEADER SEÇÃO */}
          <div className="p-8 pb-4">
            <h2 className="text-2xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic transition-colors">Painel da Guilda</h2>
          </div>

          {/* NOTIFICAÇÕES DE MESAS (REAL-TIME STYLE) */}
          <div className="px-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="text-brand-accent" size={16} />
              <span className="text-[10px] font-black text-brand-dark dark:text-white uppercase tracking-widest transition-colors">Avisos das Mesas</span>
            </div>
            <div className="space-y-3">
              {NOTIFICACOES_MESAS.map(notif => (
                <div key={notif.id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl hover:scale-[1.02] transition-all cursor-pointer">
                  <div className="flex gap-3 items-start">
                    <div className="bg-brand-accent/10 p-2 rounded-lg text-brand-accent">
                      <notif.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-brand-dark dark:text-white uppercase">{notif.mesa}</h4>
                      <p className="text-[11px] text-brand-muted dark:text-slate-400 font-medium">{notif.msg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LISTA DE CHATS */}
          <div className="px-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="text-brand-accent" size={16} />
              <span className="text-[10px] font-black text-brand-dark dark:text-white uppercase tracking-widest transition-colors">Conversas</span>
            </div>
            <div className="space-y-2">
              <div className="p-4 bg-brand-dark dark:bg-white/10 rounded-2xl flex items-center gap-4 border border-white/10">
                <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-white font-black text-xs">TC</div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-xs font-black text-white uppercase truncate">Taldo's Clan</h4>
                  <p className="text-[10px] text-brand-accent font-bold truncate italic">Digitando...</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: QUESTS E DETALHES DA CAMPANHA */}
        <div className="flex-1 flex flex-col bg-white dark:bg-brand-dark transition-colors duration-500 overflow-y-auto">
          
          {/* HEADER DA MESA ATIVA */}
          <div className="p-8 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                   <span className="text-brand-accent font-black text-[10px] uppercase tracking-[0.4em]">Mesa Ativa</span>
                   <h3 className="text-3xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic leading-none transition-colors">O Despertar do Dragão</h3>
                </div>
                <button className="bg-brand-accent text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-accent/20 hover:scale-105 transition-all">
                   Abrir Mesa →
                </button>
             </div>
          </div>

          {/* GRID DE QUESTS ABERTAS */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="text-brand-accent" size={20} />
              <h2 className="text-xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic transition-colors">Quests Abertas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {QUESTS_ATIVAS.map(quest => (
                <div key={quest.id} className="relative group overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-8 hover:border-brand-accent transition-all shadow-sm">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-brand-dark rounded-xl text-brand-accent">
                        <MapPin size={20} />
                      </div>
                      <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                        quest.urgencia === 'Alta' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20'
                      }`}>
                        Urgência {quest.urgencia}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-brand-dark dark:text-white uppercase italic leading-tight transition-colors">{quest.titulo}</h4>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-slate-500 text-[10px] font-bold uppercase transition-colors">
                          <Clock size={12} /> {quest.local}
                        </div>
                        <div className="flex items-center gap-1 text-brand-accent text-[10px] font-black uppercase transition-colors">
                          <Sword size={12} /> {quest.recompensa}
                        </div>
                      </div>
                    </div>

                    <Link href={`/quest/${quest.id}`} className="flex items-center gap-2 text-[10px] font-black text-brand-dark dark:text-white uppercase tracking-widest mt-2 group-hover:text-brand-accent transition-colors">
                      Ver no Mapa <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* FEED DE ATIVIDADES DA MESA */}
            <div className="mt-12">
               <h3 className="text-xs font-black text-brand-muted dark:text-slate-500 uppercase tracking-widest mb-6">Diário da Campanha</h3>
               <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                     <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/5 transition-colors" />
                     <span className="text-[10px] font-black text-slate-400 uppercase">Hoje</span>
                     <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/5 transition-colors" />
                  </div>
                  <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl p-6 transition-colors">
                     <p className="text-sm text-brand-muted dark:text-slate-400 font-medium">O grupo derrotou os Kobolds na entrada da caverna. <span className="text-brand-accent font-black">Loot: 20 peças de prata e uma chave enferrujada.</span></p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}