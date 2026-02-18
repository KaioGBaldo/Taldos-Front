'use client'

import { useState, useEffect } from 'react'
import { 
  Users, Scroll, Sword, ChevronLeft, 
  MessageSquare, Bell, Heart, Settings, 
  Skull, Music, Map, Plus, Edit3, Share2, Search, X, Dices, Trash2 // Adicionado Trash2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation' // Adicionado useRouter

export default function DetalhesMesaPage() {
  const { id } = useParams()
  const router = useRouter() // Inicializa o roteador para redirecionamento
  
  const [loading, setLoading] = useState(true)
  const [isMaster, setIsMaster] = useState(false)
  const [activeTab, setActiveTab] = useState<'grupo' | 'mestre' | 'sons'>('grupo')
  const [mesa, setMesa] = useState<any>(null)
  const [minhaFicha, setMinhaFicha] = useState<any>(null)

  useEffect(() => {
    const TERMO_MESTRE = "baldur";

    const mesasIniciais = [
      { id: 'm1', name: "O Despertar do Dragão", mestre: "Taldo", sistemaId: 'dnd', players: 2, slots: 5, status: 'Em Combate' },
      { id: 'm2', name: "Sombras de Taldaria", mestre: "Mestre Érico", sistemaId: 'ordem', players: 4, slots: 6, status: 'Exploração' }
    ]
    
    const mesasCustom = JSON.parse(localStorage.getItem('mesas_custom') || '[]')
    const todasMesas = [...mesasIniciais, ...mesasCustom]

    const mesaEncontrada = todasMesas.find(m => String(m.id) === String(id)) || todasMesas[0]
    
    if (mesaEncontrada) {
      setMesa(mesaEncontrada)

      const mestreNormalizado = String(mesaEncontrada.mestre || "").toLowerCase().trim();
      
      const souMestre = 
        mestreNormalizado.includes(TERMO_MESTRE) || 
        mestreNormalizado.includes("você") || 
        mestreNormalizado.includes("voce") ||
        mesaEncontrada.master === "Baldur (Você)";

      setIsMaster(souMestre)

      const charsCustom = JSON.parse(localStorage.getItem('personagens_custom') || '[]')
      const fichaCompativel = charsCustom.find((c: any) => c.sistemaId === mesaEncontrada.sistemaId)
      setMinhaFicha(fichaCompativel)
    }

    setLoading(false)
  }, [id])

  // --- FUNÇÃO PARA DELETAR A MESA ---
  const handleDeleteMesa = () => {
    const confirmar = confirm("ADVERTÊNCIA: Deseja realmente destruir esta mesa e banir todos os registros dela?")
    
    if (confirmar) {
      const mesasCustom = JSON.parse(localStorage.getItem('mesas_custom') || '[]')
      // Filtra a lista removendo a mesa atual
      const novasMesas = mesasCustom.filter((m: any) => String(m.id) !== String(id))
      
      localStorage.setItem('mesas_custom', JSON.stringify(novasMesas))
      
      // Redireciona para o perfil com um pequeno delay para garantir o salvamento
      router.push('/perfil')
    }
  }

  if (loading || !mesa) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <Dices className="text-brand-accent animate-spin" size={48} />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-brand-bg dark:bg-brand-dark transition-colors duration-500 pb-20">
      
      {/* HEADER DINÂMICO */}
      <header className="relative h-[28vh] flex items-end overflow-hidden border-b border-white/5 bg-brand-dark">
        <Image src="/hero_rpg.png" alt="Banner" fill className="object-cover opacity-10 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg dark:from-brand-dark to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex items-center gap-6">
            <Link href="/perfil" className="p-4 bg-white/5 rounded-3xl hover:bg-brand-accent transition-all text-white border border-white/10 shadow-2xl group">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">{mesa?.name}</h1>
                <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg ${isMaster ? 'bg-brand-accent text-white' : 'bg-white/10 text-slate-400'}`}>
                  {isMaster ? 'Modo Mestre' : 'Modo Jogador'}
                </span>

                {/* BOTÃO DELETAR (Apenas se for o Mestre) */}
                {isMaster && (
                  <button 
                    onClick={handleDeleteMesa}
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all ml-2"
                    title="Deletar Mesa"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-2 transition-colors">
                Sistema: {mesa?.sistemaId?.toUpperCase()} • Mestre: {mesa?.mestre}
              </p>
            </div>
          </div>

          {isMaster && (
            <nav className="flex gap-1 bg-black/40 p-1.5 rounded-2xl backdrop-blur-md border border-white/5 shadow-2xl">
              <button onClick={() => setActiveTab('grupo')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'grupo' ? 'bg-brand-accent text-white' : 'text-slate-500 hover:text-white'}`}>Grupo</button>
              <button onClick={() => setActiveTab('mestre')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'mestre' ? 'bg-brand-accent text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Painel</button>
              <button onClick={() => setActiveTab('sons')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'sons' ? 'bg-brand-accent text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Sons</button>
            </nav>
          )}
        </div>
      </header>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        <div className="lg:col-span-8">
          {isMaster ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              {activeTab === 'grupo' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex flex-col gap-6 shadow-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-brand-dark overflow-hidden relative border border-white/10">
                          <Image src="/hero_rpg.png" alt="Player" fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-white uppercase text-sm italic">Aventureiro {i}</h4>
                          <p className="text-[9px] text-brand-accent font-black uppercase">Conectado</p>
                        </div>
                      </div>
                      <div className="space-y-2 bg-black/40 p-4 rounded-2xl">
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-red-600 w-[75%]" />
                        </div>
                        <div className="flex justify-between text-[8px] font-black uppercase text-slate-500 italic">
                          <span>Vida</span>
                          <span className="text-white">75/100 HP</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                         <button className="flex-1 py-3 bg-red-500/10 text-red-500 rounded-xl text-[8px] font-black uppercase border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Dano</button>
                         <button className="flex-1 py-3 bg-green-500/10 text-green-500 rounded-xl text-[8px] font-black uppercase border border-green-500/20 hover:bg-green-500 hover:text-white transition-all">Cura</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'mestre' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4">
                  <div className="bg-orange-600/10 border border-orange-600/20 p-8 rounded-[2.5rem] space-y-4 shadow-xl">
                    <h3 className="text-orange-500 font-black text-xs uppercase flex items-center gap-2"><Bell size={16}/> Alerta Global</h3>
                    <textarea placeholder="Mensagem para os players..." className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs text-white outline-none focus:border-orange-500 h-24 italic" />
                    <button className="w-full bg-orange-600 text-white py-4 rounded-xl font-black text-[10px] uppercase">Enviar Agora</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* VISÃO JOGADOR */
            <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
              <h2 className="text-xl font-black text-white uppercase italic flex items-center gap-3 tracking-tighter">
                <Scroll className="text-brand-accent" size={24} /> Meu Status na Mesa
              </h2>
              {minhaFicha ? (
                <div className="bg-white/5 border-2 border-brand-accent/30 p-8 rounded-[3rem] flex flex-col md:flex-row gap-8 items-center relative overflow-hidden shadow-2xl">
                   <div className="w-40 h-40 rounded-[2.5rem] bg-brand-dark overflow-hidden border-4 border-brand-accent/20 flex-shrink-0 relative shadow-2xl">
                      <Image src={minhaFicha?.img} alt="Avatar" fill className="object-cover" />
                   </div>
                   <div className="flex-1 space-y-6 w-full text-center md:text-left relative z-10">
                      <div>
                        <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">{minhaFicha?.name}</h3>
                        <p className="text-xs text-brand-accent font-black uppercase tracking-widest mt-2">{minhaFicha?.class}</p>
                      </div>
                      <div className="space-y-2 bg-black/40 p-6 rounded-3xl border border-white/5 shadow-inner">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-400 italic">Energia Vital</span>
                          <span className="text-white">100 / 100 HP</span>
                        </div>
                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-[1.5px] border border-white/10">
                          <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 w-full rounded-full" />
                        </div>
                      </div>
                      <div className="flex gap-4 justify-center md:justify-start">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/personagens/${minhaFicha?.name?.toLowerCase()}/overlay`)
                            alert("Link do Overlay copiado!")
                          }}
                          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-slate-400 uppercase hover:border-brand-accent hover:text-white transition-all"
                        >
                          <Share2 size={12} /> Link OBS
                        </button>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-dashed border-white/10 p-16 rounded-[3rem] text-center space-y-6 shadow-inner text-slate-500 font-bold uppercase text-xs">
                  Vincule um personagem para começar a jogar.
                </div>
              )}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-brand-accent/10 border border-brand-accent/20 p-8 rounded-[3rem] shadow-xl">
            <h3 className="text-brand-accent font-black text-xs uppercase flex items-center gap-2 mb-6 tracking-widest"><Bell size={16}/> Mural do Mestre</h3>
            <div className="p-5 bg-black/40 rounded-2xl border-l-4 border-brand-accent shadow-inner">
               <p className="text-[10px] text-white font-bold leading-relaxed uppercase italic">"Preparem-se para a aventura!"</p>
               <span className="block text-[8px] text-slate-600 mt-3 font-mono">
                 ENVIADO POR {mesa?.mestre?.toUpperCase() || "SISTEMA"}
               </span>
            </div>
          </div>
        </div>
      </section>

      {/* CHAT FLUTUANTE */}
      <button className="fixed bottom-10 right-10 w-20 h-20 bg-brand-accent text-white rounded-full shadow-[0_10px_40px_rgba(234,88,12,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
         <MessageSquare size={32} />
      </button>
    </main>
  )
}