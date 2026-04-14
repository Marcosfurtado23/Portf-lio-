import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Trash2, Edit2, Plus, LogOut, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  role: string;
  category: string;
  image: string;
  gallery?: string[];
  order?: number;
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    category: '',
    image: '',
    gallery: [] as string[],
    order: 0
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    setLoadingData(true);
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData: Project[] = [];
      snapshot.forEach((doc) => {
        projectsData.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projectsData);
      setLoadingData(false);
    }, (error) => {
      console.error("Error fetching projects:", error);
      setLoadingData(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.error("Login error:", error);
      setLoginError('E-mail ou senha incorretos.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentId) {
        await updateDoc(doc(db, 'projects', currentId), {
          ...formData
        });
      } else {
        await addDoc(collection(db, 'projects'), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Erro ao salvar projeto. Verifique se você tem permissão.");
    }
  };

  const handleEdit = (project: Project) => {
    setIsEditing(true);
    setCurrentId(project.id);
    setFormData({
      title: project.title,
      role: project.role,
      category: project.category,
      image: project.image,
      gallery: project.gallery || [],
      order: project.order || 0
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId('');
    setFormData({
      title: '',
      role: '',
      category: '',
      image: '',
      gallery: [],
      order: 0
    });
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-4xl mb-6">Painel de <span className="italic text-accent">Administração</span></h1>
        <p className="text-secondary mb-8 max-w-md">Faça login para gerenciar os projetos do portfólio.</p>
        
        <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4 bg-surface p-8 rounded-2xl border border-white/5">
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          <div className="text-left">
            <label className="block text-xs uppercase tracking-wider text-secondary mb-2">E-mail</label>
            <input 
              type="email" 
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="seu@email.com"
            />
          </div>
          <div className="text-left mb-2">
            <label className="block text-xs uppercase tracking-wider text-secondary mb-2">Senha</label>
            <input 
              type="password" 
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-white text-background px-8 py-3 rounded-lg font-medium tracking-wide hover:bg-accent hover:text-white transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-primary p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 pb-6 border-b border-white/10">
          <h1 className="font-serif text-3xl">Painel <span className="italic text-accent">Admin</span></h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-secondary hidden md:inline">{user.email}</span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-secondary hover:text-white transition-colors"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-1 bg-surface p-6 rounded-2xl border border-white/5 h-fit">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              {isEditing ? <Edit2 size={20} className="text-accent"/> : <Plus size={20} className="text-accent"/>}
              {isEditing ? 'Editar Projeto' : 'Novo Projeto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-secondary mb-2">Título</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="Ex: ECOS DO SILÊNCIO"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-wider text-secondary mb-2">Papel / Função</label>
                <input 
                  type="text" 
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="Ex: Diretor de Fotografia"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-secondary mb-2">Categoria</label>
                <input 
                  type="text" 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="Ex: Curta-metragem"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-secondary mb-2">URL da Imagem Principal (Capa)</label>
                <input 
                  type="url" 
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="https://..."
                />
                {formData.image && (
                  <div className="mt-2 aspect-video rounded overflow-hidden border border-white/10">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Erro+na+Imagem')} />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-secondary mb-2">Galeria de Imagens (Carrossel)</label>
                {formData.gallery.map((url, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        const newGallery = [...formData.gallery];
                        newGallery[index] = e.target.value;
                        setFormData({...formData, gallery: newGallery});
                      }}
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                      placeholder="https://..."
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        const newGallery = formData.gallery.filter((_, i) => i !== index);
                        setFormData({...formData, gallery: newGallery});
                      }} 
                      className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/40 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, gallery: [...formData.gallery, '']})} 
                  className="text-xs text-accent hover:text-white flex items-center gap-1 mt-2 transition-colors"
                >
                  <Plus size={14} /> Adicionar Imagem ao Carrossel
                </button>
              </div>

              <div className="flex gap-4 mt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-accent text-background font-medium py-2 rounded-lg hover:bg-accent/90 transition-colors"
                >
                  {isEditing ? 'Atualizar' : 'Salvar'}
                </button>
                {isEditing && (
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-white/10 text-white font-medium py-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-medium mb-6">Projetos Cadastrados</h2>
            
            {loadingData ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-secondary" size={32} />
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-surface border border-white/5 rounded-2xl p-12 text-center text-secondary">
                Nenhum projeto cadastrado ainda.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-surface border border-white/5 rounded-xl overflow-hidden group">
                    <div className="aspect-video relative">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button 
                          onClick={() => handleEdit(project)}
                          className="bg-white/20 hover:bg-accent text-white p-3 rounded-full backdrop-blur-sm transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="bg-white/20 hover:bg-red-500 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-widest text-accent mb-1">{project.category}</p>
                      <h3 className="font-serif text-lg truncate">{project.title}</h3>
                      <p className="text-xs text-secondary truncate mt-1">{project.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
