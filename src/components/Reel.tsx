import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function Reel() {
  return (
    <section id="reel" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
              SHOW<span className="italic font-light text-secondary">REEL</span>
            </h2>
            <p className="text-secondary mt-4 uppercase tracking-widest text-xs">2024 / 2025</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video w-full group cursor-pointer overflow-hidden rounded-sm"
        >
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000" 
            alt="Showreel thumbnail" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:border-accent transition-all duration-500">
              <Play className="text-white ml-2 group-hover:text-accent transition-colors" size={32} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
