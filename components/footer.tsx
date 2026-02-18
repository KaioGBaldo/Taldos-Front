import { Disc, Twitter, Youtube, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    // Ajustado: bg-white dark:bg-brand-dark | border-slate-200 dark:border-white/5
    <footer className="w-full bg-white dark:bg-brand-dark border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* COLUNA 1: LOGO E DESCRIÇÃO */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Taldo Logo" 
                width={45} 
                height={45} 
                className="object-contain"
              />
              <span className="text-brand-accent font-black uppercase text-sm tracking-tighter">Taldo's Bar</span>
            </Link>
            {/* Ajustado: text-brand-muted dark:text-slate-400 */}
            <p className="text-brand-muted dark:text-slate-400 text-sm leading-relaxed font-medium">
              A maior taverna digital para mestres e jogadores. Onde as suas histórias ganham vida e os seus dados rolam com propósito.
            </p>
            <div className="flex items-center gap-4">
              {[Disc, Twitter, Youtube, Instagram].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-brand-bg dark:bg-white/5 flex items-center justify-center text-brand-muted dark:text-slate-400 hover:bg-brand-accent hover:text-white transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* COLUNA 2: NAVEGAÇÃO */}
          <div className="flex flex-col gap-6">
            {/* Ajustado: text-brand-dark dark:text-white */}
            <h4 className="font-black text-brand-dark dark:text-white uppercase text-xs tracking-[0.2em]">Explorar</h4>
            <ul className="flex flex-col gap-3 text-sm font-bold text-brand-muted dark:text-slate-400">
              <li><Link href="/recursos" className="hover:text-brand-accent transition-colors">Recursos</Link></li>
              <li><Link href="/comunidade" className="hover:text-brand-accent transition-colors">Comunidade</Link></li>
              <li><Link href="/sobre" className="hover:text-brand-accent transition-colors">Sobre Nós</Link></li>
              <li><Link href="/suporte" className="hover:text-brand-accent transition-colors">Suporte</Link></li>
            </ul>
          </div>

          {/* COLUNA 3: CONTATO */}
          <div className="flex flex-col gap-6">
            <h4 className="font-black text-brand-dark dark:text-white uppercase text-xs tracking-[0.2em]">Contacto</h4>
            <ul className="flex flex-col gap-4 text-sm font-bold text-brand-muted dark:text-slate-400">
              <li className="flex items-center gap-3"><Mail size={16} className="text-brand-accent" /> taverna@taldosbar.com</li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-brand-accent" /> Reino de Taldaria, 142</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-brand-accent" /> +55 11 9999-9999</li>
            </ul>
          </div>

          {/* COLUNA 4: NEWSLETTER */}
          <div className="flex flex-col gap-6">
            <h4 className="font-black text-brand-dark dark:text-white uppercase text-xs tracking-[0.2em]">Fique por dentro</h4>
            <div className="relative">
              {/* Ajustado: bg-brand-bg dark:bg-white/5 | text-brand-dark dark:text-white */}
              <input 
                type="email" 
                placeholder="Seu e-mail lendário" 
                className="w-full bg-brand-bg dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-brand-dark dark:text-white outline-none focus:border-brand-accent transition-all"
              />
              <button className="mt-3 w-full bg-brand-accent text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:brightness-110 transition-all">
                Assinar Coruja
              </button>
            </div>
          </div>
        </div>

        {/* RODAPÉ FINAL */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
          <p>© 2026 Taldo's Bar. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-brand-accent">Privacidade</Link>
            <Link href="#" className="hover:text-brand-accent">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}