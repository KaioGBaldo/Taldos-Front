import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { ListaPersonagens } from '@/components/ListaPersonagens'
import { ListaMesas } from '@/components/ListaMesas'
import { 
  User, Scroll, Sword, LogOut, 
  MessageSquare, Settings, Users 
} from 'lucide-react'

/* --- BACK-END SIMULADO --- */
async function getPlayerData(sessionToken: string) {
  // Simulação de verificação de banco de dados
  if (sessionToken === 'valid_token_baldur') {
    return {
      name: "Baldur, o Destemido",
      class: "Guerreiro Nórdico",
      level: 20,
      guild: "Taldo's Clan",
      avatar: "/logo.png"
    }
  }
  return null
}

export default async function PerfilPage() {
  // 1. Verificação de Sessão
  const cookieStore = await cookies() 
  const token = cookieStore.get('session_token')?.value

  if (!token) {
    redirect('/login')
  }

  // 2. Busca de Dados do Player
  const player = await getPlayerData(token)

  if (!player) {
    redirect('/login')
  }

  /* 3. Arrays Vazios: 
     Isso garante que o sistema não mostre dados "fake".
     Os componentes ListaPersonagens e ListaMesas buscarão os dados reais no localStorage.
  */
  const personagensIniciais: any[] = []
  const mesasIniciais: any[] = []

  return (
    <main className="min-h-screen w-full bg-brand-bg dark:bg-brand-dark flex transition-colors duration-500">
      
      {/* SIDEBAR LATERAL */}
      <aside className="hidden lg:flex w-24 flex-col items-center py-8 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-black/20 transition-colors">
        <Link href="/" className="mb-12">
          <Image src="/logo.png" alt="Logo" width={32} height={32} className="brightness-110" />
        </Link>
        <nav className="flex flex-col gap-8">
          <Link href="/perfil" className="text-brand-accent p-3 bg-brand-accent/10 rounded-2xl border border-brand-accent/20">
            <User size={24} />
          </Link>
          <Link href="/mensagens" className="text-brand-muted dark:text-slate-500 hover:text-brand-accent transition-colors p-3">
            <MessageSquare size={24} />
          </Link>
          <Link href="/configuracoes" className="text-brand-muted dark:text-slate-500 hover:text-brand-accent transition-colors p-3">
            <Settings size={24} />
          </Link>
        </nav>
        <Link href="/login" className="mt-auto text-slate-400 hover:text-red-500 transition-colors p-3">
          <LogOut size={24} />
        </Link>
      </aside>

      <section className="flex-1 flex flex-col overflow-y-auto">
        {/* HEADER / BANNER */}
        <header className="relative w-full h-72 flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/hero_rpg.png" alt="Banner" fill className="object-cover opacity-30 grayscale-[0.5]" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg dark:from-brand-dark via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pb-10 flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="w-32 h-32 rounded-[2.5rem] border-4 border-brand-bg dark:border-brand-dark bg-brand-accent overflow-hidden shadow-2xl relative transition-colors">
                <Image src={player.avatar} alt="Avatar" fill className="p-4 brightness-0 invert" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic leading-none transition-colors">
                {player.name}
              </h1>
              <p className="text-brand-muted dark:text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mt-2 transition-colors">
                {player.class} • Guilda {player.guild}
              </p>
            </div>
            <button className="bg-brand-dark dark:bg-white/5 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all">
              Editar Perfil
            </button>
          </div>
        </header>

        {/* GRID DE CONTEÚDO */}
        <div className="max-w-7xl mx-auto px-8 py-12 w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            
            {/* SEÇÃO PERSONAGENS (DINÂMICA) */}
            <div>
              <h2 className="text-xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic flex items-center gap-3 mb-6 transition-colors">
                <Scroll className="text-brand-accent" size={24} /> Personagens
              </h2>
              <ListaPersonagens iniciais={personagensIniciais} />
            </div>

            {/* SEÇÃO MESAS (DINÂMICA) */}
            <div>
              <h2 className="text-xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic flex items-center gap-3 mb-6 transition-colors">
                <Sword className="text-brand-accent" size={24} /> Campanhas Ativas
              </h2>
              <ListaMesas iniciais={mesasIniciais} />
            </div>
          </div>

          {/* COLUNA DIREITA (GUILDA + STATS) */}
          <div className="space-y-8">
            <div className="bg-brand-accent rounded-[2.5rem] p-8 relative overflow-hidden group shadow-2xl text-white">
              <span className="text-[10px] font-black opacity-70 uppercase tracking-[0.3em]">Minha Guilda</span>
              <h3 className="text-2xl font-black uppercase italic leading-none">{player.guild}</h3>
              <div className="absolute -right-8 -bottom-8 opacity-20 group-hover:scale-110 transition-transform duration-700">
                <Users size={120} />
              </div>
            </div>
            
            <div className="bg-white/70 dark:bg-white/5 border border-white dark:border-white/10 rounded-[2rem] p-8 transition-colors">
               <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-black text-brand-dark dark:text-white leading-none">58</p>
                    <p className="text-[8px] font-black text-brand-accent uppercase mt-1">Sessões</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-brand-dark dark:text-white leading-none">12</p>
                    <p className="text-[8px] font-black text-brand-accent uppercase mt-1">Troféus</p>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}