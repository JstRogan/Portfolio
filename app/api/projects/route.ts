import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProject = await request.json();
    const data = await fs.readFile(dataFilePath, 'utf8');
    const projects = JSON.parse(data);
    
    // Assign a new ID
    newProject.id = Date.now();
    projects.push(newProject);
    
    await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2));
    return NextResponse.json(newProject);
  } catch (error) {
    console.error('Error saving project:', error);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}
