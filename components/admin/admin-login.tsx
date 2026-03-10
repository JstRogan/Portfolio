'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api/admin';

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await adminLogin(password);
      router.refresh();
    } catch {
      setError('Wrong password');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-purple-500/10 dark:bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none transition-colors duration-700" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 transition-colors duration-300">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300">
            <Lock className="w-5 h-5 text-white dark:text-black" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-2 tracking-tight transition-colors duration-300">Admin Access</h1>
        <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mb-8 transition-colors duration-300">Enter your password to access the dashboard</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 transition-colors duration-300">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/40 dark:focus:ring-emerald-500/40 transition-colors duration-300" />
          </div>
          {error ? (
            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          ) : null}
          <button type="submit" disabled={pending} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-opacity disabled:opacity-60">
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            Continue
          </button>
        </form>
      </motion.div>
    </div>
  );
}

