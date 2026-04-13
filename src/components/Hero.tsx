import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image / Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1574717024453-354056a3df3c?auto=format&fit=crop&q=80&w=2000" 
          alt="Cinematic background" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-accent uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-6">
            Contador de Histórias Visuais
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-8">
            CRIANDO <br />
            <span className="italic font-light text-white/90">CINEMA</span>
          </h1>
          <p className="text-secondary max-w-xl mx-auto text-sm md:text-base tracking-wide leading-relaxed mb-12">
            Editor, Diretor de Fotografia e Colorista. 
            Transformando momentos brutos em experiências visuais inesquecíveis.
          </p>
          
          <a 
            href="#reel" 
            className="inline-flex items-center justify-center border border-white/30 rounded-full px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-background transition-all duration-300"
          >
            Assistir Reel
          </a>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
