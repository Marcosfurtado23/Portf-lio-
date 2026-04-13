import { motion } from 'motion/react';
import { projects } from '../data';

export default function Portfolio() {
  return (
    <section id="work" className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            TRABALHOS <span className="italic font-light text-secondary">SELECIONADOS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  {project.category}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-wide">
                  {project.title}
                </h3>
                <p className="text-sm text-secondary tracking-wider uppercase">
                  {project.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
