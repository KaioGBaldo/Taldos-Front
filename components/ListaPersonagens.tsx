'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Star, ChevronRight } from 'lucide-react'

export function ListaPersonagens({ iniciais }: { iniciais: any[] }) {
  const [lista, setLista] = useState(iniciais)

  useEffect(() => {
    // Busca os personagens criados no localStorage
    const salvos = JSON.parse(localStorage.getItem('personagens_custom') || '[]')
    if (salvos.length > 0) {
      setLista([...iniciais, ...salvos])
    }
  }, [iniciais])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* CARD DE CRIAR NOVO */}
      <Link href="/personagens/novo" className="group">
        <div className="h-full min-h-[105px] border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl flex items-center justify-center gap-3 hover:border-brand-accent hover:bg-brand-accent/5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-brand-accent group-hover:text-white transition-all">
            <Plus size={20} />
          </div>
          <span className="text-xs font-black text-brand-muted dark:text-slate-400 uppercase tracking-widest transition-colors">Criar Novo Herói</span>
        </div>
      </Link>

      {/* LISTA DINÂMICA */}
      {lista.map((char, index) => (
        <Link 
          key={index} 
          href={`/personagens/${char.name.toLowerCase().replace(/\s+/g, '-')}`}
          className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-3xl p-5 flex items-center gap-4 hover:border-brand-accent/50 transition-all group shadow-lg relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-dark overflow-hidden relative border border-slate-200 dark:border-white/5">
            <Image src={char.img} alt={char.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            {char.isMain && (
              <div className="absolute top-0 left-0 bg-brand-accent p-1 rounded-br-lg"><Star size={8} className="text-white fill-white" /></div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-black text-brand-dark dark:text-white uppercase text-sm tracking-tight leading-none">{char.name}</h4>
            <p className="text-[10px] text-brand-muted dark:text-slate-500 font-bold uppercase mt-1">Lv. {char.lv} • {char.class}</p>
          </div>
          <ChevronRight size={18} className="text-brand-accent group-hover:translate-x-1 transition-transform" />
        </Link>
      ))}
    </div>
  )
}