'use client';

import { FolderKanban, Mail, Briefcase, ArrowLeft, Sun, Moon, Loader2, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { ComponentType, ReactNode } from 'react';
import type { AdminTab } from '@/store/admin-ui';
import { useAdminActions } from '@/hooks/admin/use-admin-actions';
import { Link } from '@/i18n/navigation';

const tabs: { id: AdminTab; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'messages', label: 'Messages', icon: Mail },
  { id: 'experience', label: 'Experience', icon: Briefcase },
];

export function AdminShell({
  tab,
  onTab,
  children,
}: {
  tab: AdminTab;
  onTab: (t: AdminTab) => void;
  children: ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const { isPending, logout } = useAdminActions();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] transition-colors duration-300">
      <header className="sticky top-0 z-20 border-b border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-[#050505]/60 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-mono text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <nav className="flex items-center gap-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTab(id)}
                className={[
                  'inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm border transition-colors duration-300',
                  tab === id
                    ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white'
                    : 'bg-white/60 dark:bg-white/5 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10',
                ].join(' ')}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={logout}
              disabled={isPending}
              className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors duration-300 disabled:opacity-60"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
              <span className="hidden sm:inline font-mono text-xs">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
