import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'experience.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading experience:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newExp = await request.json();
    const data = await fs.readFile(dataFilePath, 'utf8');
    const experience = JSON.parse(data);
    
    newExp.id = Date.now();
    experience.push(newExp);
    
    await fs.writeFile(dataFilePath, JSON.stringify(experience, null, 2));
    return NextResponse.json(newExp);
  } catch (error) {
    console.error('Error saving experience:', error);
    return NextResponse.json({ error: 'Failed to save experience' }, { status: 500 });
  }
}
