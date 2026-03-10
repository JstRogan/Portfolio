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
