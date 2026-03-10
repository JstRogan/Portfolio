'use client';

export function ProjectsSectionSkeleton() {
  return (
    <section id="projects" className="py-32 px-6 max-w-6xl mx-auto overflow-hidden">
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
    </section>
  );
}

