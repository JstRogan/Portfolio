import { NextResponse } from 'next/server';
import { createProject, listProjects } from '@/server/projects-repo';

export async function GET() {
  try {
    const projects = await listProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const created = await createProject(payload);
    return NextResponse.json(created);
  } catch (error) {
    console.error('Error saving project:', error);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}
