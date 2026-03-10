import { NextResponse } from 'next/server';
import { deleteProjectById, updateProjectById } from '@/server/projects-repo';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const projectId = parseInt(id, 10);
    await deleteProjectById(projectId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const patch = await request.json();
    const projectId = parseInt(id, 10);
    const updated = await updateProjectById(projectId, patch);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function PUT(request: Request, ctx: { params: Promise<{ id: string }> }) {
  return PATCH(request, ctx);
}
