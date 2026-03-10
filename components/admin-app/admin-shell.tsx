'use client';

import type { ReactNode } from 'react';
import { LayoutDashboard, FolderKanban, Briefcase, MessageCircle, LogOut, Menu, X, ArrowLeft } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { LangToggle } from '@/components/lang-toggle';
import { useI18n } from '@/hooks/use-i18n';
import { useUIStore } from '@/store/useUIStore';
import { Link, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

const nav = [
  { href: '/admin/dashboard', icon: LayoutDashboard, key: 'admin.nav.dashboard' },
  { href: '/admin/projects', icon: FolderKanban, key: 'admin.nav.projects' },
  { href: '/admin/experience', icon: Briefcase, key: 'admin.nav.experience' },
  { href: '/admin/messages', icon: MessageCircle, key: 'admin.nav.messages' },
] as const;

function titleFromPath(pathname: string) {
  const hit = nav.find((n) => pathname.endsWith(n.href));
  return hit?.key || 'admin.nav.dashboard';
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t } = useI18n();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid lg:grid-cols-[260px_1fr] gap-6">
        <div className={sidebarOpen ? 'fixed inset-0 z-40 lg:static' : 'lg:static'}>
          {sidebarOpen ? <div className="absolute inset-0 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} /> : null}
          <aside className={`absolute left-0 top-0 h-full w-[260px] lg:relative lg:w-auto lg:h-auto rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-[#0a0a0a]/60 backdrop-blur-xl p-4 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-[110%] lg:translate-x-0'}`}>
            <div className="flex items-center justify-between px-2 pb-4">
              <Link href="/" className="font-mono font-bold tracking-tighter text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 dark:bg-emerald-500 rounded-full" />
                MURAD.
              </Link>
              <button className="lg:hidden text-zinc-400 hover:text-zinc-900 dark:hover:text-white" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {nav.map((item) => {
                const active = pathname.endsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2 rounded-2xl border transition-colors ${active ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white' : 'bg-white/60 dark:bg-white/5 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10'}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{t(item.key)}</span>
                  </Link>
                );
              })}
              <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-2xl border bg-white/60 dark:bg-white/5 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">{t('admin.nav.viewSite')}</span>
              </Link>
            </nav>
          </aside>
        </div>

        <div className="min-w-0">
          <header className="sticky top-4 z-20 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-[#050505]/60 backdrop-blur-xl px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button className="lg:hidden w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/5 inline-flex items-center justify-center" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
                <Menu className="w-4 h-4" />
              </button>
              <h1 className="text-lg font-bold text-zinc-900 dark:text-white">{t(titleFromPath(pathname))}</h1>
            </div>
            <div className="flex items-center gap-2">
              <LangToggle />
              <Button variant="subtle" shape="pill" size="md" onClick={() => void signOut({ redirect: true })}>
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t('admin.logout')}</span>
              </Button>
            </div>
          </header>
          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

