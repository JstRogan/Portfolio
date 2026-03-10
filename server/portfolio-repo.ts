import { dataPath, readJsonFile, writeJsonFile } from '@/server/json-store';
import type { Experience, Message } from '@/lib/types';
import { listProjects } from '@/server/projects-repo';

const messagesFile = dataPath('messages.json');
const experienceFile = dataPath('experience.json');

export async function getAllPortfolioData() {
  const [projects, messages, experience] = await Promise.all([
    listProjects(),
    readJsonFile<Message[]>(messagesFile, []),
    readJsonFile<Experience[]>(experienceFile, []),
  ]);
  return { projects, messages, experience };
}

export async function updateExperience(id: number, patch: Partial<Experience>) {
  const experience = await readJsonFile<Experience[]>(experienceFile, []);
  const next = experience.map((e) => (e.id === id ? { ...e, ...patch, id } : e));
  await writeJsonFile(experienceFile, next);
  return next.find((e) => e.id === id) ?? null;
}
