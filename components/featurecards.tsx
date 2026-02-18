import { LucideIcon } from 'lucide-react'

interface FeatureProps {
  title: string
  description: string
  icon: LucideIcon
}

export function FeatureCard({ title, description, icon: Icon }: FeatureProps) {
  return (
    <div className="relative group p-[1px] rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.02]">
      {/* BORDA ANIMADA NO HOVER: Um gradiente sutil que aparece atrás */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* CORPO DO CARD */}
      <div className="relative bg-white/70 backdrop-blur-xl border border-white h-full p-8 rounded-[2rem] flex flex-col gap-5 shadow-sm hover:shadow-xl hover:shadow-brand-accent/5 transition-all">
        
        {/* ÍCONE COM "GLOW" (BRILHO) */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-full h-full bg-brand-dark rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:-rotate-12 group-hover:bg-brand-accent">
            <Icon className="text-white" size={26} strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <h3 className="font-black text-brand-dark text-xl tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-brand-muted text-sm leading-relaxed font-medium">
            {description}
          </p>
        </div>

        {/* DETALHE MINIMALISTA: Uma seta que aparece no hover */}
        <div className="mt-auto pt-4 flex items-center gap-2 text-brand-accent opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
          <span className="text-[10px] font-black uppercase tracking-widest">Saiba mais</span>
          <div className="h-[1px] w-8 bg-brand-accent" />
        </div>
      </div>
    </div>
  )
}