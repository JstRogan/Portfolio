import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'messages.json');

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const data = await fs.readFile(dataFilePath, 'utf8');
    let messages = JSON.parse(data);
    
    const id = parseInt(idParam, 10);
    messages = messages.filter((m: any) => m.id !== id);
    
    await fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const updates = await request.json();
    const data = await fs.readFile(dataFilePath, 'utf8');
    let messages = JSON.parse(data);
    
    const id = parseInt(idParam, 10);
    messages = messages.map((m: any) => m.id === id ? { ...m, ...updates } : m);
    
    await fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}
