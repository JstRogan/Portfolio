'use client';

import { Navbar } from '@/components/navbar';

export function ProjectsPageLoading() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded col-span-2" />
                <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded col-span-1" />
              </div>
              <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

