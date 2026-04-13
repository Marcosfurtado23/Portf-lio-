import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-surface pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
              VAMOS CRIAR <br />
              <span className="italic font-light text-secondary">JUNTOS</span>
            </h2>
            <a 
              href="mailto:ola@exemplo.com" 
              className="inline-flex items-center gap-2 text-xl md:text-2xl hover:text-accent transition-colors group"
            >
              ola@exemplo.com
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
          
          <div className="flex flex-col gap-4 text-sm uppercase tracking-widest text-secondary">
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Vimeo</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-secondary uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Marcos Silva. Todos os direitos reservados.</p>
          <p className="mt-4 md:mt-0">Disponível para projetos globais</p>
        </div>
      </div>
    </footer>
  );
}
