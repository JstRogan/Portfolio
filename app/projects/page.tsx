'use client';

import { useMemo, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { useProjects } from '@/hooks/use-projects';
import { ProjectsPageLoading } from '@/components/projects-page/projects-page-loading';
import { ProjectsPageHeader } from '@/components/projects-page/projects-page-header';
import { ProjectsPageFilter } from '@/components/projects-page/projects-page-filter';
import { ProjectsPageGrid } from '@/components/projects-page/projects-page-grid';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const { projects, loading } = useProjects();

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.tech.forEach((t: string) => techs.add(t)));
    return ['All', ...Array.from(techs)].sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter(p => p.tech.includes(filter));
  }, [filter, projects]);

  if (loading) {
    return <ProjectsPageLoading />;
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <ProjectsPageHeader
          title="All Projects"
          subtitle="A complete list of things I&apos;ve worked on, from personal experiments to full-stack applications."
        />
        <ProjectsPageFilter items={allTechs} value={filter} onChange={setFilter} />
        <ProjectsPageGrid projects={filteredProjects} />
      </div>
    </main>
  );
}
