'use client'

import { useState } from 'react'
import { 
  Shield, Heart, Zap, Brain, 
  Sword, Scroll, Ghost, Eye, 
  Dices, ChevronLeft, Settings, 
  Star, Activity, Bookmark,
  Target, Crosshair, TrendingUp, Trash2 // Adicionado Trash2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation' // Adicionados para lógica de deleção

export default function StatusWindowPage() {
  const router = useRouter()
  const { id } = useParams() // Captura o ID/Nome da URL
  const [sistema] = useState<'dnd' | 'ordem' | 'cthulhu'>('dnd')

  // --- FUNÇÃO PARA DELETAR PERSONAGEM ---
  const handleDeletePersonagem = () => {
    const confirmar = confirm("ADVERTÊNCIA: Deseja realmente apagar este registro do Grimório? Esta ação é irreversível.")
    
    if (confirmar) {
      const fichasCustom = JSON.parse(localStorage.getItem('personagens_custom') || '[]')
      // Filtra as fichas removendo a atual (pelo nome/id da URL)
      const novasFichas = fichasCustom.filter((c: any) => 
        c.name.toLowerCase().replace(/\s+/g, '-') !== id
      )
      
      localStorage.setItem('personagens_custom', JSON.stringify(novasFichas))
      router.push('/perfil') // Redireciona para o perfil
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#0f172a] text-slate-200 overflow-x-hidden relative pb-20">
      
      {/* BACKGROUND DECORATIVO (SCANLINES) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'linear-gradient(rgba(180, 83, 9, 0.5) 1px, transparent 1px)', backgroundSize: '100% 4px' }} />

      <style>{`
        .status-clip {
          clip-path: polygon(0 0, 95% 0, 100% 10%, 100% 100%, 5% 100%, 0 90%);
          background: linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%);
        }
        .stat-hex {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }
        @keyframes pulse-neon {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; text-shadow: 0 0 15px #EA580C; }
        }
        .neon-text { animation: pulse-neon 2s infinite; }
      `}</style>

      {/* --- HEADER DO SISTEMA --- */}
      <header className="relative w-full pt-12 pb-6 px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6 z-10">
        <div className="flex flex-col gap-2">
           <div className="flex items-center gap-4">
              <Link href="/perfil" className="text-brand-accent hover:scale-110 transition-transform">
                <ChevronLeft size={32} />
              </Link>
              <div>
                <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.5em] neon-text">Status do Jogador</span>
                <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic">Baldur</h1>
              </div>
           </div>
           <div className="flex items-center gap-6 mt-2">
              <div className="flex flex-col">
                 <span className="text-[8px] text-slate-500 font-bold uppercase">Título</span>
                 <span className="text-xs font-black text-brand-accent uppercase tracking-widest">O Destemido</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-800" />
              <div className="flex flex-col">
                 <span className="text-[8px] text-slate-500 font-bold uppercase">Nível</span>
                 <span className="text-xs font-black text-white uppercase tracking-widest">20</span>
              </div>

              {/* BOTÃO DELETAR FICHA */}
              <div className="h-8 w-[1px] bg-slate-800" />
              <button 
                onClick={handleDeletePersonagem}
                className="flex flex-col group transition-all"
              >
                 <span className="text-[8px] text-slate-500 font-bold uppercase group-hover:text-red-500 transition-colors">Registro</span>
                 <div className="flex items-center gap-1 text-red-500/50 group-hover:text-red-500 transition-colors">
                    <Trash2 size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Deletar Ficha</span>
                 </div>
              </button>
           </div>
        </div>

        <div className="flex flex-col items-end gap-2">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Classe: Guerreiro Nórdico</span>
           <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
              <div className="h-full w-[85%] bg-brand-accent shadow-[0_0_10px_#EA580C]" />
           </div>
           <span className="text-[9px] font-bold text-slate-500 uppercase italic">EXP: 185.000 / 200.000</span>
        </div>
      </header>

      {/* --- GRID PRINCIPAL --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* COLUNA ESQUERDA: ATRIBUTOS */}
        <div className="lg:col-span-4 space-y-6">
           <div className="status-clip border-l-2 border-brand-accent p-8 space-y-8">
              <div className="flex items-center gap-3">
                 <TrendingUp className="text-brand-accent" size={18} />
                 <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">Estatísticas Base</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                 {[
                   { label: 'Força', value: 20, mod: '+5' },
                   { label: 'Destreza', value: 14, mod: '+2' },
                   { label: 'Constituição', value: 18, mod: '+4' },
                   { label: 'Inteligência', value: 10, mod: '+0' },
                   { label: 'Sabedoria', value: 12, mod: '+1' },
                   { label: 'Carisma', value: 14, mod: '+2' }
                 ].map((attr) => (
                   <div key={attr.label} className="flex items-center justify-between group cursor-help">
                      <span className="text-xs font-black text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">{attr.label}</span>
                      <div className="flex items-center gap-4">
                         <div className="text-[10px] font-black text-brand-accent bg-brand-accent/10 px-2 py-1 rounded border border-brand-accent/20">
                            {attr.mod}
                         </div>
                         <span className="text-xl font-black text-white w-8 text-right">{attr.value}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="status-clip border-l-2 border-slate-700 p-6 bg-slate-900/40">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Informação de Alma</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">
                 O portador desta ficha possui resistência natural a climas gélidos e bônus em testes de intimidação contra criaturas inferiores.
              </p>
           </div>
        </div>

        {/* COLUNA CENTRAL: STATUS VITAIS */}
        <div className="lg:col-span-5 space-y-8">
           <div className="grid grid-cols-2 gap-4">
              <div className="status-clip p-6 border-b-2 border-red-500 bg-red-500/5">
                 <div className="flex justify-between items-center mb-2">
                    <Heart size={16} className="text-red-500" />
                    <span className="text-[10px] font-black text-red-500 uppercase">HP</span>
                 </div>
                 <p className="text-3xl font-black text-white">142<span className="text-slate-500 text-lg">/142</span></p>
              </div>
              <div className="status-clip p-6 border-b-2 border-brand-accent bg-brand-accent/5">
                 <div className="flex justify-between items-center mb-2">
                    <Zap size={16} className="text-brand-accent" />
                    <span className="text-[10px] font-black text-brand-accent uppercase">MP</span>
                 </div>
                 <p className="text-3xl font-black text-white">20<span className="text-slate-500 text-lg">/20</span></p>
              </div>
           </div>

           <div className="status-clip p-8 border-t-2 border-brand-accent relative overflow-hidden group">
              <div className="absolute right-[-20px] top-[-20px] rotate-12 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                 <Shield size={180} />
              </div>
              
              <div className="grid grid-cols-3 gap-8 relative z-10">
                 <div className="text-center">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Defesa</p>
                    <div className="w-16 h-16 mx-auto bg-slate-800 stat-hex flex items-center justify-center border-t border-brand-accent/50 group-hover:scale-110 transition-transform">
                       <span className="text-2xl font-black text-white">18</span>
                    </div>
                 </div>
                 <div className="text-center">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Iniciativa</p>
                    <div className="w-16 h-16 mx-auto bg-slate-800 stat-hex flex items-center justify-center border-t border-brand-accent/50 group-hover:scale-110 transition-transform">
                       <span className="text-2xl font-black text-white">+4</span>
                    </div>
                 </div>
                 <div className="text-center">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Velocidade</p>
                    <div className="w-16 h-16 mx-auto bg-slate-800 stat-hex flex items-center justify-center border-t border-brand-accent/50 group-hover:scale-110 transition-transform">
                       <span className="text-2xl font-black text-white">9m</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                 <Crosshair className="text-brand-accent" size={18} />
                 <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">Habilidades Ativas</h2>
              </div>
              
              <div className="space-y-3">
                 {['Golpe Brutal', 'Rugido do Inverno'].map((hab, i) => (
                    <div key={i} className="status-clip p-4 flex justify-between items-center border-l-2 border-transparent hover:border-brand-accent hover:bg-white/5 transition-all cursor-pointer group">
                       <div className="flex items-center gap-4">
                          <span className="text-brand-accent font-black italic text-lg">0{i+1}</span>
                          <span className="text-xs font-black text-white uppercase tracking-widest">{hab}</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-[9px] font-bold text-slate-500 uppercase">Custo: 2 MP</span>
                          <Dices size={16} className="text-slate-600 group-hover:text-brand-accent" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* COLUNA DIREITA: PERÍCIAS */}
        <div className="lg:col-span-3 space-y-6">
           <div className="status-clip p-8 bg-slate-900/60 border-r-2 border-slate-700">
              <h3 className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-6">Perícias Treinadas</h3>
              <div className="space-y-4">
                 {['Atletismo', 'Intimidação', 'Sobrevivência'].map(p => (
                   <div key={p} className="flex flex-col gap-1">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-bold text-white uppercase">{p}</span>
                        <span className="text-[10px] font-black text-brand-accent">+7</span>
                      </div>
                      <div className="h-[2px] w-full bg-slate-800">
                         <div className="h-full w-[70%] bg-brand-accent/40" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="status-clip p-6 bg-brand-accent/5 border border-brand-accent/20">
              <div className="flex items-center gap-2 text-brand-accent mb-4">
                 <Target size={14} />
                 <span className="text-[9px] font-black uppercase">Missão em Progresso</span>
              </div>
              <p className="text-[11px] text-white font-black uppercase italic leading-tight">
                 Matar o Dragão do Pico Gélido
              </p>
              <div className="mt-4 flex justify-between items-center">
                 <span className="text-[8px] text-slate-500 font-bold uppercase">Progresso</span>
                 <span className="text-[8px] text-brand-accent font-bold uppercase">65%</span>
              </div>
           </div>
        </div>
      </section>

      {/* BOTÃO FLUTUANTE DE DADOS */}
      <button className="fixed bottom-10 right-10 w-20 h-20 bg-brand-accent text-white stat-hex shadow-[0_0_30px_rgba(234,88,12,0.6)] flex items-center justify-center hover:scale-110 transition-all z-50 group">
          <div className="absolute inset-0 bg-brand-accent animate-ping rounded-full opacity-20 group-hover:hidden" />
          <Dices size={32} className="relative z-10" />
      </button>
    </main>
  )
}