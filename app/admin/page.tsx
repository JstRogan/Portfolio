'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { 
  FolderKanban, 
  Mail, 
  Briefcase, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Github, 
  Loader2,
  CheckCircle2,
  Circle,
  Sun,
  Moon,
  Lock,
  ArrowRight
} from 'lucide-react';

type Tab = 'projects' | 'messages' | 'experience';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Data states
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Project form
  const [pTitle, setPTitle] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pImage, setPImage] = useState('');
  const [pTech, setPTech] = useState('');
  const [pGithub, setPGithub] = useState('');
  const [pExternal, setPExternal] = useState('');
  const [pFeatured, setPFeatured] = useState(false);

  // Experience form
  const [eRole, setERole] = useState('');
  const [eCompany, setECompany] = useState('');
  const [ePeriod, setEPeriod] = useState('');
  const [eDesc, setEDesc] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, msgRes, expRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/messages'),
        fetch('/api/experience')
      ]);
      
      setProjects(await projRes.json());
      setMessages(await msgRes.json());
      setExperience(await expRes.json());
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      setLoginError(true);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newProject = {
      title: pTitle,
      description: pDesc,
      image: pImage || `https://picsum.photos/seed/${pTitle.replace(/\s+/g, '')}/800/500`,
      tech: pTech.split(',').map(t => t.trim()).filter(Boolean),
      github: pGithub,
      external: pExternal,
      featured: pFeatured
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        setPTitle(''); setPDesc(''); setPImage(''); setPTech(''); setPGithub(''); setPExternal(''); setPFeatured(false);
        setShowForm(false);
        fetchData();
      }
    } catch (error) {
      console.error('Failed to add project', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newExp = { role: eRole, company: eCompany, period: ePeriod, description: eDesc };

    try {
      const res = await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExp),
      });
      if (res.ok) {
        setERole(''); setECompany(''); setEPeriod(''); setEDesc('');
        setShowForm(false);
        fetchData();
      }
    } catch (error) {
      console.error('Failed to add experience', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (type: Tab, id: string | number) => {
    if (!confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;
    try {
      const res = await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (error) {
      console.error(`Failed to delete ${type}`, error);
    }
  };

  const toggleMessageRead = async (id: number, currentReadStatus: boolean) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !currentReadStatus }),
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error('Failed to update message', error);
    }
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-purple-500/10 dark:bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none transition-colors duration-700" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 transition-colors duration-300"
        >
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300">
              <Lock className="w-5 h-5 text-white dark:text-black" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-2 tracking-tight transition-colors duration-300">Admin Access</h1>
          <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mb-8 transition-colors duration-300">Enter your credentials to access the dashboard</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 transition-colors duration-300">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-emerald-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>
            
            {loginError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs text-center">
                Incorrect password. Try &quot;admin&quot;
              </motion.p>
            )}
            
            <button 
              type="submit"
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-3 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <Link href="/" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-700 dark:text-zinc-300 font-sans flex flex-col md:flex-row transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#0a0a0a] border-r border-zinc-200 dark:border-white/10 flex flex-col h-auto md:h-screen sticky top-0 z-20 transition-colors duration-300">
        <div className="p-6 border-b border-zinc-200 dark:border-white/10">
          <Link href="/" className="flex items-center gap-2 text-zinc-900 dark:text-white font-mono font-bold tracking-tighter hover:text-purple-600 dark:hover:text-emerald-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO SITE</span>
          </Link>
        </div>
        
        <div className="p-4 flex-1">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 px-2">Dashboard Menu</div>
          <nav className="space-y-1">
            <button 
              onClick={() => { setActiveTab('projects'); setShowForm(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'projects' ? 'bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              <FolderKanban className="w-4 h-4" />
              Projects
            </button>
            <button 
              onClick={() => { setActiveTab('experience'); setShowForm(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'experience' ? 'bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              <Briefcase className="w-4 h-4" />
              Experience
            </button>
            <button 
              onClick={() => { setActiveTab('messages'); setShowForm(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'messages' ? 'bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                Messages
              </div>
              {messages.filter(m => !m.read).length > 0 && (
                <span className="bg-purple-500 dark:bg-emerald-500 text-white dark:text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {messages.filter(m => !m.read).length}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-600">
          <span>SYS.ADMIN_V1.0</span>
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between px-8 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md shrink-0 transition-colors duration-300">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white capitalize">{activeTab}</h1>
            <p className="text-xs font-mono text-zinc-500 mt-1">Manage your {activeTab} data</p>
          </div>
          
          {activeTab !== 'messages' && (
            <button 
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 dark:hover:bg-emerald-400 hover:text-white transition-colors"
            >
              {showForm ? 'Cancel' : <><Plus className="w-4 h-4" /> Add New</>}
            </button>
          )}
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8 relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500 dark:text-emerald-500" />
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <AnimatePresence mode="wait">
                {showForm && activeTab === 'projects' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    className="mb-8 bg-white dark:bg-[#111] border border-zinc-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none"
                  >
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 font-mono">CREATE_PROJECT</h2>
                    <form onSubmit={handleAddProject} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 mb-1">TITLE</label>
                          <input required type="text" value={pTitle} onChange={e => setPTitle(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-emerald-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 mb-1">TECH STACK (CSV)</label>
                          <input required type="text" value={pTech} onChange={e => setPTech(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-emerald-500 transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-zinc-500 mb-1">DESCRIPTION</label>
                        <textarea required value={pDesc} onChange={e => setPDesc(e.target.value)} rows={3} className="w-full bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-emerald-500 transition-colors resize-none" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 mb-1">IMAGE URL</label>
                          <input type="url" value={pImage} onChange={e => setPImage(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-emerald-500 transition-colors" placeholder="Leave empty for random" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 mb-1">GITHUB URL</label>
                          <input type="url" value={pGithub} onChange={e => setPGithub(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-emerald-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 mb-1">LIVE URL</label>
                          <input type="url" value={pExternal} onChange={e => setPExternal(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-emerald-500 transition-colors" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <input type="checkbox" id="featured" checked={pFeatured} onChange={e => setPFeatured(e.target.checked)} className="w-4 h-4 rounded border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#050505] text-purple-500 dark:text-emerald-500 focus:ring-purple-500 dark:focus:ring-emerald-500 focus:ring-offset-white dark:focus:ring-offset-[#111]" />
                        <label htmlFor="featured" className="text-sm font-mono text-zinc-500 dark:text-zinc-400 cursor-pointer">FEATURE ON HOME</label>
                      </div>
                      <div className="pt-4 flex justify-end">
                        <button type="submit" disabled={isSubmitting} className="bg-purple-500 dark:bg-emerald-500 text-white dark:text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-purple-600 dark:hover:bg-emerald-400 transition-colors flex items-center gap-2 disabled:opacity-50">
                          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SAVE_PROJECT'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {showForm && activeTab === 'experience' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    className="mb-8 bg-white dark:bg-[#111] border border-zinc-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none"
                  >
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 font-mono">ADD_EXPERIENCE</h2>
                    <form onSubmit={handleAddExperience} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 mb-1">ROLE</label>
                          <input required type="text" value={eRole} onChange={e => setERole(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-emerald-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 mb-1">COMPANY</label>
                          <input required type="text" value={eCompany} onChange={e => setECompany(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-emerald-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-zinc-500 mb-1">PERIOD</label>
                          <input required type="text" value={ePeriod} onChange={e => setEPeriod(e.target.value)} className="w-full bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-emerald-500 transition-colors" placeholder="e.g. 2021 - Present" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-zinc-500 mb-1">DESCRIPTION</label>
                        <textarea required value={eDesc} onChange={e => setEDesc(e.target.value)} rows={3} className="w-full bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-emerald-500 transition-colors resize-none" />
                      </div>
                      <div className="pt-4 flex justify-end">
                        <button type="submit" disabled={isSubmitting} className="bg-purple-500 dark:bg-emerald-500 text-white dark:text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-purple-600 dark:hover:bg-emerald-400 transition-colors flex items-center gap-2 disabled:opacity-50">
                          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SAVE_EXPERIENCE'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Data Grids */}
              <div className="bg-white dark:bg-[#111] border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm dark:shadow-none">
                {/* Projects Grid */}
                {activeTab === 'projects' && (
                  <div className="w-full text-left border-collapse">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#0a0a0a] text-xs font-mono text-zinc-500 uppercase tracking-wider">
                      <div className="col-span-4">Project</div>
                      <div className="col-span-4">Tech Stack</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    {projects.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500 font-mono text-sm">NO_DATA_FOUND</div>
                    ) : (
                      projects.map(p => (
                        <div key={p.id} className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-100 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors items-center text-sm group">
                          <div className="col-span-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-zinc-100 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 overflow-hidden shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.image} alt="" className="w-full h-full object-cover opacity-80" />
                            </div>
                            <span className="font-medium text-zinc-900 dark:text-white truncate">{p.title}</span>
                          </div>
                          <div className="col-span-4 font-mono text-xs text-zinc-500 dark:text-zinc-400 truncate">
                            {p.tech.join(', ')}
                          </div>
                          <div className="col-span-2">
                            {p.featured ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-purple-500/10 dark:bg-emerald-500/10 text-purple-600 dark:text-emerald-400 text-[10px] font-mono uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-emerald-400"></span> Featured
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-[10px] font-mono uppercase">
                                Standard
                              </span>
                            )}
                          </div>
                          <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded"><Github className="w-3.5 h-3.5" /></a>}
                            {p.external && <a href={p.external} target="_blank" rel="noreferrer" className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded"><ExternalLink className="w-3.5 h-3.5" /></a>}
                            <button onClick={() => handleDelete('projects', p.id)} className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 bg-white dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Experience Grid */}
                {activeTab === 'experience' && (
                  <div className="w-full text-left border-collapse">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#0a0a0a] text-xs font-mono text-zinc-500 uppercase tracking-wider">
                      <div className="col-span-4">Role</div>
                      <div className="col-span-4">Company</div>
                      <div className="col-span-3">Period</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    {experience.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500 font-mono text-sm">NO_DATA_FOUND</div>
                    ) : (
                      experience.map(e => (
                        <div key={e.id} className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-100 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors items-center text-sm group">
                          <div className="col-span-4 font-medium text-zinc-900 dark:text-white truncate">{e.role}</div>
                          <div className="col-span-4 text-zinc-500 dark:text-zinc-400 truncate">{e.company}</div>
                          <div className="col-span-3 font-mono text-xs text-zinc-500">{e.period}</div>
                          <div className="col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleDelete('experience', e.id)} className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 bg-white dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Messages Grid */}
                {activeTab === 'messages' && (
                  <div className="w-full text-left border-collapse">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#0a0a0a] text-xs font-mono text-zinc-500 uppercase tracking-wider">
                      <div className="col-span-3">Sender</div>
                      <div className="col-span-6">Message</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    {messages.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500 font-mono text-sm">NO_MESSAGES_FOUND</div>
                    ) : (
                      messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(m => (
                        <div key={m.id} className={`grid grid-cols-12 gap-4 p-4 border-b border-zinc-100 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors items-start text-sm group ${!m.read ? 'bg-purple-500/5 dark:bg-emerald-500/5' : ''}`}>
                          <div className="col-span-3">
                            <div className={`font-medium ${!m.read ? 'text-purple-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-white'} truncate flex items-center gap-2`}>
                              {!m.read && <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-emerald-400 shrink-0"></span>}
                              {m.name}
                            </div>
                            <div className="text-xs text-zinc-500 truncate mt-0.5">{m.email}</div>
                          </div>
                          <div className="col-span-6 text-zinc-600 dark:text-zinc-400 text-sm pr-4 line-clamp-2">
                            {m.message}
                          </div>
                          <div className="col-span-2 font-mono text-xs text-zinc-500">
                            {new Date(m.date).toLocaleDateString()}
                          </div>
                          <div className="col-span-1 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => toggleMessageRead(m.id, m.read)} 
                              className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-emerald-400 bg-white dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded"
                              title={m.read ? "Mark as unread" : "Mark as read"}
                            >
                              {m.read ? <Circle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                            </button>
                            <button onClick={() => handleDelete('messages', m.id)} className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 bg-white dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
