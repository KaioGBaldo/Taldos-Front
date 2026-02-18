'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, ChevronRight, X, Sword } from 'lucide-react'

export function ListaMesas({ iniciais }: { iniciais: any[] }) {
  const [lista, setLista] = useState(iniciais)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [novaMesa, setNovaMesa] = useState({ name: '', sistemaId: 'dnd' })

  useEffect(() => {
    const salvas = JSON.parse(localStorage.getItem('mesas_custom') || '[]')
    if (salvas.length > 0) {
      setLista([...iniciais, ...salvas])
    }
  }, [iniciais])

  const handleCriarMesa = (e: React.FormEvent) => {
    e.preventDefault()
    const mesaFormatada = {
      id: `m-${Math.random().toString(36).substr(2, 9)}`,
      name: novaMesa.name,
      master: "Baldur (Você)",
      sistemaId: novaMesa.sistemaId,
      players: 1,
      status: "Aguardando",
    }

    const salvasAtuais = JSON.parse(localStorage.getItem('mesas_custom') || '[]')
    localStorage.setItem('mesas_custom', JSON.stringify([...salvasAtuais, mesaFormatada]))
    
    setLista([...lista, mesaFormatada])
    setIsModalOpen(false)
    setNovaMesa({ name: '', sistemaId: 'dnd' })
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BOTÃO PARA ABRIR MODAL */}
        <button onClick={() => setIsModalOpen(true)} className="group text-left">
          <div className="h-full min-h-[105px] border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl flex items-center justify-center gap-3 hover:border-brand-accent hover:bg-brand-accent/5 transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-brand-accent group-hover:text-white transition-all">
              <Plus size={20} />
            </div>
            <span className="text-xs font-black text-brand-muted dark:text-slate-400 uppercase tracking-widest transition-colors">Nova Jornada</span>
          </div>
        </button>

        {/* LISTA DE MESAS */}
        {lista.map((mesa, index) => (
          <Link 
            key={index} 
            href={`/mesas/${mesa.id}`}
            className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-3xl p-5 flex items-center gap-4 hover:border-brand-accent/50 transition-all group cursor-pointer shadow-lg relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-dark overflow-hidden relative border border-slate-200 dark:border-white/5 transition-colors">
              <Image src="/hero_rpg.png" alt={mesa.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" />
              <span className="absolute bottom-1 w-full text-center text-[8px] font-black text-white uppercase tracking-tighter">{mesa.players} Jogs</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-black text-brand-dark dark:text-white uppercase text-sm tracking-tight leading-none truncate">{mesa.name}</h4>
                <span className={`text-[7px] px-1.5 py-0.5 rounded font-black uppercase ${mesa.status === "Em Combate" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
                  {mesa.status}
                </span>
              </div>
              <p className="text-[10px] text-brand-muted dark:text-slate-500 font-bold uppercase mt-1 truncate">Mestre: {mesa.master}</p>
            </div>
            <ChevronRight size={18} className="text-brand-accent group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>

      {/* MODAL DE CRIAÇÃO DE MESA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-brand-dark border-2 border-brand-accent rounded-[3.5rem] p-10 max-w-lg w-full shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-brand-dark dark:text-white uppercase italic">Anunciar Campanha</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleCriarMesa} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-accent uppercase tracking-widest">Nome da Mesa</label>
                <input required type="text" className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-brand-dark dark:text-white outline-none focus:border-brand-accent" value={novaMesa.name} onChange={(e) => setNovaMesa({...novaMesa, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-accent uppercase tracking-widest">Sistema</label>
                <select className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-brand-dark dark:text-white outline-none focus:border-brand-accent" value={novaMesa.sistemaId} onChange={(e) => setNovaMesa({...novaMesa, sistemaId: e.target.value})}>
                  <option value="dnd">Dungeons & Dragons 5e</option>
                  <option value="ordem">Ordem Paranormal</option>
                  <option value="cthulhu">Call of Cthulhu 7e</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-brand-accent text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-brand-accent/20">Forjar Mesa</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}