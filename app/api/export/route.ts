import { NextResponse } from 'next/server';
import { createShopifyZip } from '@/lib/shopify';
import { GeneratedStore, Plan } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body = await req.json() as { store: GeneratedStore; plan: Plan };
    if (!body.store?.brand) return NextResponse.json({ error: 'Primero genera una tienda.' }, { status: 400 });
    const buffer = await createShopifyZip(body.store, body.plan || 'basic');
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="yoooko-${body.store.brand.toLowerCase().replace(/\s+/g, '-')}-${body.plan}.zip"`
      }
    });
  } catch {
    return NextResponse.json({ error: 'No se pudo exportar el tema Shopify.' }, { status: 500 });
  }
}
