import { motion } from 'motion/react';

export default function Featured() {
  return (
    <section id="featured" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
              EM <span className="italic font-light text-secondary">DESTAQUE</span>
            </h2>
            <p className="text-secondary mt-4 uppercase tracking-widest text-xs">Trabalho Recente</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] md:aspect-[21/9] w-full group overflow-hidden rounded-sm"
        >
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000" 
            alt="Foto destaque" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        </motion.div>
      </div>
    </section>
  );
}
