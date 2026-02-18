import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { 
  User, MessageSquare, Settings, 
  Camera, Shield, Bell, 
  Gamepad2, Palette, Lock,
  ChevronRight, Save
} from 'lucide-react'

export default async function ConfiguracoesPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value

  if (!token) redirect('/login')

  return (
    <main className="min-h-screen w-full bg-brand-bg dark:bg-brand-dark flex transition-colors duration-500">
      
      {/* SIDEBAR (CONSISTENTE COM PERFIL E MENSAGENS) */}
      <aside className="hidden lg:flex w-24 flex-col items-center py-8 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-black/20 transition-colors">
        <Link href="/" className="mb-12">
          <Image src="/logo.png" alt="Logo" width={32} height={32} className="brightness-110" />
        </Link>
        <nav className="flex flex-col gap-8">
          <Link href="/perfil" className="text-brand-muted dark:text-slate-500 hover:text-brand-accent transition-colors p-3">
            <User size={24} />
          </Link>
          <Link href="/mensagens" className="text-brand-muted dark:text-slate-500 hover:text-brand-accent transition-colors p-3">
            <MessageSquare size={24} />
          </Link>
          <Link href="/configuracoes" className="text-brand-accent p-3 bg-brand-accent/10 rounded-2xl border border-brand-accent/20">
            <Settings size={24} />
          </Link>
        </nav>
      </aside>

      {/* CONTEÚDO DE CONFIGURAÇÕES */}
      <section className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          <header className="mb-12">
            <h1 className="text-4xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic leading-none transition-colors">
              Configurações
            </h1>
            <p className="text-brand-muted dark:text-slate-400 font-bold text-sm mt-3 uppercase tracking-widest transition-colors">
              Ajuste as engrenagens da sua jornada
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8">
            
            {/* SEÇÃO: PERFIL PÚBLICO */}
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-white/5 pb-4">
                <Palette className="text-brand-accent" size={20} />
                <h2 className="font-black text-brand-dark dark:text-white uppercase text-sm tracking-widest transition-colors">Identidade Visual</h2>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative group cursor-pointer">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-brand-accent flex items-center justify-center border-4 border-white dark:border-brand-dark shadow-2xl overflow-hidden transition-colors">
                    <Image src="/logo.png" alt="Avatar" width={60} height={60} className="brightness-0 invert" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-brand-muted dark:text-slate-500 uppercase tracking-widest mb-2 block">Nome de Exibição</label>
                    <input 
                      type="text" 
                      defaultValue="Baldur, o Destemido"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-brand-dark dark:text-white outline-none focus:border-brand-accent transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-brand-muted dark:text-slate-500 uppercase tracking-widest mb-2 block">Título Honorário</label>
                    <input 
                      type="text" 
                      defaultValue="Guerreiro Nórdico"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-brand-dark dark:text-white outline-none focus:border-brand-accent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEÇÃO: PREFERÊNCIAS DE JOGO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Gamepad2 className="text-brand-accent" size={20} />
                  <h2 className="font-black text-brand-dark dark:text-white uppercase text-sm tracking-widest transition-colors">Sistemas</h2>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-slate-100 dark:border-white/5">
                      <span className="text-xs font-bold text-brand-muted dark:text-slate-400">Rolagem Automática</span>
                      <div className="w-10 h-5 bg-brand-accent rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-slate-100 dark:border-white/5">
                      <span className="text-xs font-bold text-brand-muted dark:text-slate-400">Notificações de Turno</span>
                      <div className="w-10 h-5 bg-brand-accent rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                   </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="text-brand-accent" size={20} />
                  <h2 className="font-black text-brand-dark dark:text-white uppercase text-sm tracking-widest transition-colors">Segurança</h2>
                </div>
                <button className="w-full text-left p-3 bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-slate-100 dark:border-white/5 hover:border-brand-accent transition-all group">
                   <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-brand-muted dark:text-slate-400">Alterar Senha</span>
                      <ChevronRight size={16} className="text-brand-accent group-hover:translate-x-1 transition-transform" />
                   </div>
                </button>
                <button className="w-full text-left p-3 mt-3 bg-red-500/5 rounded-xl border border-red-500/10 hover:bg-red-500 hover:text-white transition-all group">
                   <span className="text-xs font-bold text-red-500 group-hover:text-white transition-colors">Encerrar Sessão em outros dispositivos</span>
                </button>
              </div>

            </div>

            {/* BOTÃO SALVAR */}
            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-3 bg-brand-accent text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-brand-accent/30 group">
                <Save size={18} className="group-hover:rotate-12 transition-transform" /> Salvar Alterações
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}