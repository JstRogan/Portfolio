import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'messages.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading messages:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newMessage = await request.json();
    const data = await fs.readFile(dataFilePath, 'utf8');
    const messages = JSON.parse(data);
    
    newMessage.id = Date.now();
    newMessage.date = new Date().toISOString();
    newMessage.read = false;
    messages.push(newMessage);
    
    await fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2));
    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
