import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { projects } from '@/lib/data';

type ChatMessage = { role: 'user' | 'model'; content: string };

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Missing API key' }, { status: 500 });

  const body = (await request.json().catch(() => ({ messages: [] }))) as { messages?: ChatMessage[] };
  const messages = Array.isArray(body.messages) ? body.messages : [];

  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = `You are a helpful assistant for Murad Karimov's portfolio website.
Answer questions based on the following projects:
${JSON.stringify(projects, null, 2)}
Keep your answers concise, friendly, and professional.`;

  const contents = messages.map((m) => ({ role: m.role, parts: [{ text: m.content }] }));
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents,
    config: { systemInstruction },
  });

  return NextResponse.json({ text: response.text || '' });
}

