import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'experience.json');

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const data = await fs.readFile(dataFilePath, 'utf8');
    let experience = JSON.parse(data);
    
    const id = parseInt(idParam, 10);
    experience = experience.filter((e: any) => e.id !== id);
    
    await fs.writeFile(dataFilePath, JSON.stringify(experience, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const patch = await request.json();
    const data = await fs.readFile(dataFilePath, 'utf8');
    let experience = JSON.parse(data);

    const id = parseInt(idParam, 10);
    experience = experience.map((e: any) => (e.id === id ? { ...e, ...patch, id } : e));

    await fs.writeFile(dataFilePath, JSON.stringify(experience, null, 2));
    const updated = experience.find((e: any) => e.id === id);
    return NextResponse.json(updated ?? { error: 'Not found' }, { status: updated ? 200 : 404 });
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

export async function PUT(request: Request, ctx: { params: Promise<{ id: string }> }) {
  return PATCH(request, ctx);
}
