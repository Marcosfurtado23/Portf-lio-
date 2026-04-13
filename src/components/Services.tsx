import { motion } from 'motion/react';
import { services } from '../data';
import { Scissors, Camera, Palette } from 'lucide-react';

const iconMap = {
  Scissors,
  Camera,
  Palette
};

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-6">
              ESPECIALI<span className="italic font-light text-secondary">DADES</span>
            </h2>
            <p className="text-secondary text-sm md:text-base leading-relaxed max-w-md">
              Uma abordagem holística para a narrativa visual. Desde a captura da luz perfeita até a colorização final, cada etapa é elaborada com intenção e precisão.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              
              return (
                <motion.div 
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col"
                >
                  <div className="mb-6 text-accent">
                    <Icon size={32} strokeWidth={1} />
                  </div>
                  <h3 className="text-xl font-medium tracking-wide mb-4 uppercase">
                    {service.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
