'use client'

import { useState } from 'react'
import { 
  Scroll, Sword, Shield, Zap, 
  ChevronRight, ChevronLeft, Dices, 
  Check, Globe
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SuccessSystemModal } from '@/components/SuccessSystemModal'

const SISTEMAS = [
  { id: 'dnd', name: 'Dungeons & Dragons 5e', desc: 'Alta fantasia, heróis épicos e masmorras.', classes: ['Guerreiro', 'Mago', 'Ladino'], stats: ['Força', 'Destreza', 'Constituição', 'Inteligência', 'Sabedoria', 'Carisma'] },
  { id: 'ordem', name: 'Ordem Paranormal', desc: 'Investigação, mistério e horror paranormal.', classes: ['Combatente', 'Especialista', 'Ocultista'], stats: ['Força', 'Agilidade', 'Vigor', 'Intelecto', 'Presença'] },
  { id: 'cthulhu', name: 'Call of Cthulhu 7e', desc: 'Horror cósmico e sanidade frágil.', classes: ['Detetive', 'Professor', 'Médico'], stats: ['STR', 'CON', 'DEX', 'APP', 'INT', 'POW', 'EDU', 'SAN'] }
]

const CAMPANHAS = [
  { id: 'c1', name: 'O Despertar do Dragão', mestre: 'Taldo', sistemaId: 'dnd', slots: '4/5' },
  { id: 'c2', name: 'Sinais do Outro Lado', mestre: 'Kian', sistemaId: 'ordem', slots: '3/6' }
]

export default function CriarPersonagemPage() {
  const [step, setStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    sistema: '',
    campanha: '', 
    nome: '',
    classe: '',
    atributos: {} as Record<string, number>
  })

  const sistemaAtivo = SISTEMAS.find(s => s.id === formData.sistema)
  const campanhasFiltradas = CAMPANHAS.filter(c => c.sistemaId === formData.sistema)

const handleFinalize = () => {
  // Criamos o objeto do novo personagem baseado no formulário
  const novoPersonagem = {
    name: formData.nome || "Herói Sem Nome",
    class: formData.classe || "Aventureiro",
    lv: 1,
    img: "/hero_rpg.png", // Imagem padrão
    isMain: false
  }

  // Pegamos os que já existem no localStorage ou um array vazio
  const salvos = JSON.parse(localStorage.getItem('personagens_custom') || '[]')
  
  // Adicionamos o novo e salvamos de volta
  localStorage.setItem('personagens_custom', JSON.stringify([...salvos, novoPersonagem]))

  setShowSuccess(true)
}

  return (
    <main className="min-h-screen w-full bg-brand-bg dark:bg-brand-dark transition-colors duration-500 py-12 px-6 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic">
            Forjar <span className="text-brand-accent">Lenda</span>
          </h1>
          <div className="h-1 w-20 bg-brand-accent mt-4 rounded-full" />
        </div>

        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[3.5rem] p-8 md:p-16 shadow-2xl">
          {step === 1 && (
             <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-500">
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Dices className="text-brand-accent" size={24} />
                        <h2 className="text-xl font-black text-brand-dark dark:text-white uppercase tracking-widest">1. Escolha o Sistema</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {SISTEMAS.map(s => (
                            <div key={s.id} onClick={() => setFormData({...formData, sistema: s.id, campanha: ''})} className={`relative overflow-hidden rounded-[2.5rem] border-2 cursor-pointer transition-all p-8 flex flex-col gap-4 group ${formData.sistema === s.id ? 'border-brand-accent bg-brand-accent/5' : 'border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] hover:border-brand-accent/30'}`}>
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-2xl ${formData.sistema === s.id ? 'bg-brand-accent text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-400'}`}><Scroll size={20} /></div>
                                    {formData.sistema === s.id && <Check className="text-brand-accent" size={24} />}
                                </div>
                                <h4 className="font-black text-brand-dark dark:text-white uppercase text-sm tracking-tight">{s.name}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                {formData.sistema && (
                    <section className="animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="text-brand-accent" size={24} />
                            <h2 className="text-xl font-black text-brand-dark dark:text-white uppercase tracking-widest">2. Vínculo da Jornada</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div onClick={() => setFormData({...formData, campanha: 'none'})} className={`p-6 rounded-3xl border-2 flex flex-col gap-3 cursor-pointer transition-all ${formData.campanha === 'none' ? 'border-brand-accent bg-brand-accent/5' : 'border-slate-100 dark:border-white/5 hover:border-brand-accent/20 bg-white/50 dark:bg-transparent'}`}>
                                <div className="flex justify-between items-center"><div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-brand-accent"><Globe size={20} /></div>{formData.campanha === 'none' && <Check size={18} className="text-brand-accent" />}</div>
                                <div><p className="text-xs font-black text-brand-dark dark:text-white uppercase">Aventureiro Solitário</p></div>
                            </div>
                            {campanhasFiltradas.map(c => (
                                <div key={c.id} onClick={() => setFormData({...formData, campanha: c.id})} className={`p-6 rounded-3xl border-2 flex flex-col gap-3 cursor-pointer transition-all ${formData.campanha === c.id ? 'border-brand-accent bg-brand-accent/5' : 'border-slate-100 dark:border-white/5 hover:border-brand-accent/20 bg-white/50 dark:bg-transparent'}`}>
                                    <div className="flex justify-between items-center"><div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-brand-accent font-black text-[10px]">M</div>{formData.campanha === c.id && <Check size={18} className="text-brand-accent" />}</div>
                                    <div><p className="text-xs font-black text-brand-dark dark:text-white uppercase truncate">{c.name}</p></div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
             </div>
          )}

          {step === 2 && (
             <div className="space-y-12 animate-in fade-in duration-500">
                <section className="space-y-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-brand-accent uppercase tracking-[0.4em]">Identidade do Personagem</label>
                        <input type="text" placeholder="Nome do Herói..." className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] px-8 py-6 text-xl font-black text-brand-dark dark:text-white outline-none focus:border-brand-accent transition-all" onChange={(e) => setFormData({...formData, nome: e.target.value})} />
                    </div>
                    <div className="space-y-6">
                        <label className="text-[10px] font-black text-brand-accent uppercase tracking-[0.4em]">Escolha sua Classe</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {sistemaAtivo?.classes.map(classe => (
                                <button key={classe} onClick={() => setFormData({...formData, classe: classe})} className={`p-6 rounded-[2rem] border-2 font-black uppercase text-[10px] tracking-widest transition-all ${formData.classe === classe ? 'bg-brand-accent text-white border-brand-accent' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-100 dark:border-white/10 text-slate-400'}`}>{classe}</button>
                            ))}
                        </div>
                    </div>
                </section>
             </div>
          )}

          {step === 3 && (
             <div className="space-y-10 animate-in zoom-in-95 duration-500">
                <h2 className="text-3xl font-black text-brand-dark dark:text-white uppercase tracking-tighter italic">Atributos de {sistemaAtivo?.name}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {sistemaAtivo?.stats.map(stat => (
                        <div key={stat} className="bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/10 p-8 rounded-[3rem] flex flex-col items-center gap-4 group hover:border-brand-accent transition-all">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat}</span>
                            <input type="number" defaultValue={10} className="w-full bg-transparent text-center text-4xl font-black text-brand-dark dark:text-white outline-none" />
                        </div>
                    ))}
                </div>
             </div>
          )}

          <div className="mt-16 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
            <button onClick={() => setStep(Math.max(1, step - 1))} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0' : 'text-slate-400 hover:text-brand-dark dark:hover:text-white'}`}><ChevronLeft size={16} /> Voltar</button>
            <button disabled={step === 1 && (!formData.sistema || !formData.campanha)} onClick={() => step < 3 ? setStep(step + 1) : handleFinalize()} className="bg-brand-accent text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl disabled:opacity-50">{step < 3 ? 'Próximo Passo' : 'Salvar Ficha'} <ChevronRight size={18} className="inline ml-2" /></button>
          </div>
        </div>
      </div>

      <SuccessSystemModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} isSolo={formData.campanha === 'none'} />
    </main>
  )
}