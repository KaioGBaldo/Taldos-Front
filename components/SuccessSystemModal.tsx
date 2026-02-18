'use client'
import { X, Zap, PartyPopper, User as UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  isSolo: boolean
}

export function SuccessSystemModal({ isOpen, onClose, isSolo }: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 400);
  };

const handleRedirect = () => {
  setIsAnimating(false);
  // No front-end puro, simulamos o ID. Em um sistema real, usaríamos o ID retornado pelo banco.
  setTimeout(() => router.push('/personagens/novo-heroi'), 400); 
};

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      
      <style>{`
        @keyframes systemPop {
          0% { transform: scaleX(0); opacity: 0; }
          60% { transform: scaleX(1.1); opacity: 1; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes scanline {
          0% { bottom: 100%; }
          100% { bottom: 0%; }
        }
        .system-window {
          animation: systemPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
          clip-path: polygon(2% 0, 98% 0, 100% 15%, 100% 85%, 98% 100%, 2% 100%, 0 85%, 0 15%);
        }
        .exit-animation {
          transform: scaleX(0) !important;
          opacity: 0 !important;
          transition: all 0.4s cubic-bezier(0.7, 0, 0.84, 0);
        }
      `}</style>

      {/* JANELA ESTILO SISTEMA */}
      <div className={`system-window relative w-full max-w-2xl border-x-2 border-brand-accent shadow-[0_0_50px_rgba(234,88,12,0.2)] overflow-hidden ${!isAnimating ? 'exit-animation' : ''}`}>
        
        {/* LINHA DE SCANNER */}
        <div className="absolute left-0 right-0 h-[2px] bg-brand-accent/30 shadow-[0_0_15px_#EA580C] z-20 animate-[scanline_4s_linear_infinite]" />

        {/* HEADER */}
        <div className="relative h-10 flex items-center justify-between px-8 bg-brand-accent/20 border-b border-brand-accent/30">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-brand-accent animate-pulse" />
            <span className="text-brand-accent font-black text-[10px] uppercase tracking-[0.4em]">
              Notificação de Conclusão
            </span>
          </div>
          <button onClick={handleClose} className="text-brand-accent hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className="p-10 flex flex-col items-center gap-6 relative">
          
          <div className="flex items-center gap-8 w-full">
            {/* ÍCONE DE SUCESSO À ESQUERDA */}
            <div className="hidden md:flex w-24 h-24 rounded-full border border-brand-accent/50 items-center justify-center bg-brand-accent/5 shadow-[inset_0_0_20px_rgba(234,88,12,0.2)]">
               <PartyPopper size={48} className="text-brand-accent" />
            </div>

            <div className="flex-1 text-left space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">[ ACERTO CRÍTICO ]</span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic transition-colors">
                  HERÓI <span className="text-brand-accent">FORJADO</span>
                </h2>
              </div>
              
              <div className="h-[1px] w-full bg-gradient-to-r from-brand-accent via-brand-accent/20 to-transparent" />
              
              <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-tight">
                {isSolo 
                  ? "Aventureiro solitário registrado. A alma foi vinculada ao sistema e aguarda uma jornada futura." 
                  : "Vínculo com a campanha estabelecido. As coordenadas de destino foram sincronizadas com o mestre."}
              </p>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="w-full flex flex-col md:flex-row justify-end gap-4 mt-4">
            <button 
              onClick={handleClose}
              className="px-8 py-3 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors"
            >
              [ CONTINUAR ]
            </button>
            <button 
              onClick={handleRedirect}
              className="px-12 py-3 bg-brand-accent/10 border border-brand-accent/50 text-brand-accent font-black uppercase tracking-[0.3em] text-[11px] hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.1)]"
            >
              [ VER PERFIL ]
            </button>
          </div>
        </div>

        {/* FOOTER TECH */}
        <div className="absolute bottom-2 right-8 text-[8px] text-brand-accent/30 font-mono font-bold uppercase">
          Status: Sincronizado | ID: {Math.random().toString(36).substring(7).toUpperCase()}
        </div>
      </div>
    </div>
  )
}