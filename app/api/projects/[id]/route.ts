import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await fs.readFile(dataFilePath, 'utf8');
    let projects = JSON.parse(data);
    
    const projectId = parseInt(id, 10);
    projects = projects.filter((p: any) => p.id !== projectId);
    
    await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
