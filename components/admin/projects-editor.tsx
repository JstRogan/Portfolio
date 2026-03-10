'use client';

import type { Project } from '@/lib/types';
import { ProjectsList } from '@/components/admin/projects-list';
import { ProjectForm } from '@/components/admin/project-form';
import { useAdminUi } from '@/store/admin-ui';

export function ProjectsEditor({ projects }: { projects: Project[] }) {
  const editingId = useAdminUi((s) => s.editingProjectId);
  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-8">
      <ProjectsList projects={projects} />
      <ProjectForm key={editingId ?? 'new'} projects={projects} editingId={editingId} />
    </div>
  );
}
