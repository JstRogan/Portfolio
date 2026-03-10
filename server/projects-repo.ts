import { prisma } from '@/server/prisma';
import type { Project } from '@/lib/types';

const parseTech = (value: unknown): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return value.split(',').map((t) => t.trim()).filter(Boolean);
    }
  }
  return [];
};

const toProject = (p: any): Project => ({
  id: p.id,
  title: p.title,
  description: p.description,
  image: p.image,
  tech: parseTech(p.tech),
  github: p.github ?? undefined,
  external: p.external ?? undefined,
  featured: Boolean(p.featured),
});

export async function listProjects() {
  const rows = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return rows.map(toProject);
}

export async function createProject(input: Omit<Project, 'id'>) {
  const fallbackImage =
    input.image?.trim() || `https://picsum.photos/seed/${(input.title || 'project').replace(/\s+/g, '')}/800/500`;
  const row = await prisma.project.create({
    data: {
      title: input.title,
      description: input.description,
      image: fallbackImage,
      tech: JSON.stringify(input.tech ?? []),
      github: input.github ?? null,
      external: input.external ?? null,
      featured: Boolean(input.featured),
    },
  });
  return toProject(row);
}

export async function updateProjectById(id: number, patch: Partial<Project>) {
  const row = await prisma.project.update({
    where: { id },
    data: {
      title: patch.title,
      description: patch.description,
      image: patch.image,
      tech: patch.tech ? JSON.stringify(patch.tech) : undefined,
      github: patch.github ?? undefined,
      external: patch.external ?? undefined,
      featured: patch.featured ?? undefined,
    },
  });
  return toProject(row);
}

export async function deleteProjectById(id: number) {
  await prisma.project.delete({ where: { id } });
}
