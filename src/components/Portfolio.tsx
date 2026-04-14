import { useState, useEffect, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  role: string;
  category: string;
  image: string;
  gallery?: string[];
}

const ProjectCard = ({ project, index }: { project: Project; index: number; key?: string }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const images = [project.image, ...(project.gallery || [])].filter(Boolean);

  const nextImg = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
    >
      <div className="relative overflow-hidden aspect-[4/3] mb-6 group/slider">
        <img 
          src={images[currentImg]} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-accent hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-accent hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentImg ? 'bg-accent' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
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
  );
};

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData: Project[] = [];
      snapshot.forEach((doc) => {
        projectsData.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching projects:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="work" className="py-24 md:py-32 bg-surface min-h-[50vh]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            TRABALHOS <span className="italic font-light text-secondary">SELECIONADOS</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="animate-spin text-accent" size={48} />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 text-secondary">
            <p className="text-lg">Nenhum trabalho cadastrado ainda.</p>
            <p className="text-sm mt-2">Acesse /admin para adicionar seus projetos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
