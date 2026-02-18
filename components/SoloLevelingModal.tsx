'use client'
import { X, ShieldAlert, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SoloLevelingModal({ isOpen, onClose }: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Controle para animação de fechamento suave
  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 400); // Tempo da animação de saída
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

      {/* JANELA RETANGULAR ESTILO SISTEMA */}
      <div className={`system-window relative w-full max-w-2xl border-x-2 border-brand-accent shadow-[0_0_50px_rgba(180,83,9,0.2)] overflow-hidden ${!isAnimating ? 'exit-animation' : ''}`}>
        
        {/* LINHA DE SCANNER ANIMADA */}
        <div className="absolute left-0 right-0 h-[2px] bg-brand-accent/30 shadow-[0_0_15px_#B45309] z-20 animate-[scanline_3s_linear_infinite]" />

        {/* HEADER DO SISTEMA */}
        <div className="relative h-10 flex items-center justify-between px-6 bg-brand-accent/20 border-b border-brand-accent/30">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-brand-accent animate-pulse" />
            <span className="text-brand-accent font-black text-[10px] uppercase tracking-[0.4em]">
              Notificação do Sistema
            </span>
          </div>
          <button onClick={handleClose} className="text-brand-accent hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="p-10 flex flex-col items-center gap-6 relative">
          
          <div className="flex items-center gap-8 w-full">
            {/* ÍCONE DE ERRO À ESQUERDA */}
            <div className="hidden md:flex w-24 h-24 rounded-full border border-brand-accent/50 items-center justify-center bg-brand-accent/5 shadow-[inset_0_0_20px_rgba(180,83,9,0.2)]">
               <ShieldAlert size={48} className="text-brand-accent" />
            </div>

            <div className="flex-1 text-left space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">[ ERRO CRÍTICO ]</span>
                <h2 className="text-3xl font-black text-brand-bg uppercase tracking-tighter italic">
                  IDENTIDADE <span className="text-brand-accent">NÃO RECONHECIDA</span>
                </h2>
              </div>
              
              <div className="h-[1px] w-full bg-gradient-to-r from-brand-accent via-brand-accent/20 to-transparent" />
              
              <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-tight">
                A tentativa de login falhou. As coordenadas de alma fornecidas não coincidem com nenhum aventureiro registrado no <span className="text-brand-accent italic">Taldo's Bar</span>.
              </p>
            </div>
          </div>

          {/* BOTÃO DE RETORNO */}
          <div className="w-full flex justify-end mt-4">
            <button 
              onClick={handleClose}
              className="px-12 py-3 bg-brand-accent/10 border border-brand-accent/50 text-brand-accent font-black uppercase tracking-[0.3em] text-[11px] hover:bg-brand-accent hover:text-white transition-all duration-300"
            >
              [ CONFIRMAR ]
            </button>
          </div>
        </div>

        {/* DETALHES TÉCNICOS NOS CANTOS */}
        <div className="absolute bottom-2 right-6 text-[8px] text-brand-accent/30 font-mono font-bold uppercase">
          Status: Interrompido
        </div>
      </div>
    </div>
  )
}