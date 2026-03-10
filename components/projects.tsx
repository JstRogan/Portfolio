'use client';
import { useI18n } from '@/hooks/use-i18n';
import { useProjects } from '@/hooks/use-projects';
import { ProjectsSectionSkeleton } from '@/components/sections/projects/projects-section-skeleton';
import { ProjectsSectionHeader } from '@/components/sections/projects/projects-section-header';
import { FeaturedProjectCard } from '@/components/sections/projects/featured-project-card';
import { Link } from '@/i18n/navigation';

export function Projects() {
  const { projects, loading } = useProjects();
  const { t } = useI18n();

  const featuredProjects = projects.filter((p) => p.featured);

  if (loading) return <ProjectsSectionSkeleton />;

  return (
    <section id="projects" className="py-32 px-6 max-w-6xl mx-auto overflow-hidden">
      <ProjectsSectionHeader title={t('projects.title')} subtitle={t('projects.subtitle')} viewAllLabel={t('projects.viewAll')} />

      <div className="flex flex-col gap-8">
        {featuredProjects.map((project, i) => (
          <FeaturedProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
      
      <div className="mt-12 md:hidden flex justify-center">
        <Link href="/projects" className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium transition-colors duration-300">
          {t('projects.viewAll')}
        </Link>
      </div>
    </section>
  );
}
