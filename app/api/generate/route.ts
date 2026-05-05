import { NextResponse } from 'next/server';
import { generateStore } from '@/lib/generator';
import { GeneratePayload } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GeneratePayload;
    if (!body.description || body.description.trim().length < 8) {
      return NextResponse.json({ error: 'Describe la tienda o el producto con un poco más de detalle.' }, { status: 400 });
    }
    const store = await generateStore({ ...body, images: body.images?.slice(0, 8) || [] });
    return NextResponse.json({ store, usedAI: Boolean(process.env.OPENAI_API_KEY) });
  } catch (error) {
    return NextResponse.json({ error: 'No se pudo generar la tienda.' }, { status: 500 });
  }
}
