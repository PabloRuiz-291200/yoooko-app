import OpenAI from 'openai';
import { GeneratePayload, GeneratedStore } from './types';

const palettes = {
  futurista: { background: '#070812', surface: '#101223', text: '#f7f8ff', muted: '#a7adbf', accent: '#8b5cf6', accent2: '#22d3ee' },
  minimal: { background: '#0b0b0c', surface: '#151517', text: '#ffffff', muted: '#b7b7bd', accent: '#ffffff', accent2: '#9ca3af' },
  premium: { background: '#080608', surface: '#161014', text: '#fff8ee', muted: '#c8bfb4', accent: '#d6a85f', accent2: '#7c3aed' },
  natural: { background: '#07110d', surface: '#10231b', text: '#f4fff8', muted: '#adc6b8', accent: '#6ee7b7', accent2: '#84cc16' },
  bold: { background: '#08090d', surface: '#13151f', text: '#ffffff', muted: '#b4bbcc', accent: '#ff4d6d', accent2: '#facc15' }
};

const nicheLabels: Record<string, string> = {
  'single-product': 'producto ganador',
  dropshipping: 'dropshipping',
  beauty: 'belleza y cuidado personal',
  fitness: 'fitness y deporte',
  home: 'hogar y decoración',
  tech: 'tecnología',
  fashion: 'moda y accesorios',
  pets: 'mascotas',
  baby: 'bebés y maternidad',
  jewelry: 'joyas y relojes',
  kitchen: 'cocina',
  car: 'coche y moto',
  gadgets: 'gadgets virales',
  wellness: 'salud y bienestar',
  outdoor: 'outdoor y aventura',
  gaming: 'gaming',
  office: 'oficina y productividad',
  travel: 'viajes',
  eco: 'eco y sostenible',
  accessories: 'accesorios premium'
};

function titleCase(input: string) {
  return input.toLowerCase().replace(/(^|\s)\S/g, t => t.toUpperCase()).slice(0, 42) || 'Marca Shopify';
}

function inferProduct(description: string) {
  const clean = description.replace(/https?:\/\/\S+/g, '').trim();
  const words = clean.split(/[,.\n]/)[0]?.trim() || 'producto ganador';
  return titleCase(words.length > 8 ? words : `Tienda de ${words}`);
}

export function localGenerate(payload: GeneratePayload): GeneratedStore {
  const productName = inferProduct(payload.description);
  const brand = productName.replace(/^Tienda De /, '').replace(/^Tienda de /, '').split(' ').slice(0, 2).join(' ') || 'Yoooko';
  const images = payload.images.map(i => i.dataUrl);
  const fallback = [
    'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#111827"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="650" cy="250" r="180" fill="#22d3ee" opacity=".25"/><text x="50%" y="52%" text-anchor="middle" fill="white" font-family="Arial" font-size="54" font-weight="700">${brand}</text></svg>`)
  ];
  const palette = palettes[payload.style];
  const niche = nicheLabels[payload.storeType] || payload.storeType;
  return {
    id: crypto.randomUUID(),
    brand,
    niche,
    style: payload.style,
    palette,
    product: {
      name: productName,
      headline: `Consigue ${productName} con una oferta exclusiva hoy`,
      price: '39,95€',
      compareAt: '69,95€',
      bullets: [
        'Diseñado para resolver un problema real desde el primer uso',
        'Presentación premium lista para una tienda de alto valor percibido',
        'Compra segura, envío rastreado y garantía de satisfacción',
        'Ideal para campañas de Meta Ads y TikTok Ads'
      ],
      images: images.length ? images : fallback,
      reviews: [
        { name: 'Laura M.', text: 'La tienda transmite confianza y el producto se entiende en segundos.' },
        { name: 'Daniel R.', text: 'Diseño limpio, llamadas a la acción claras y muy fácil de comprar.' },
        { name: 'Marta G.', text: 'Parece una marca real, no una plantilla genérica.' }
      ]
    },
    home: {
      heroTitle: `Convierte visitas en pedidos con ${brand}`,
      heroSubtitle: `Una tienda Shopify completa, clara y enfocada en conversión para vender ${productName.toLowerCase()} sin complicaciones.`,
      cta: 'Comprar ahora',
      benefits: ['Oferta clara desde el primer scroll', 'Beneficios visibles antes de características', 'Prueba social y garantías integradas', 'Estructura preparada para conversión móvil'],
      problem: 'Muchas tiendas pierden ventas porque explican tarde el valor del producto, parecen genéricas o generan poca confianza.',
      solution: `${brand} presenta el producto con una narrativa directa: problema, solución, beneficio, prueba social y compra segura.`,
      howItWorks: ['El cliente entiende el valor', 'Ve beneficios y pruebas', 'Confía en la garantía', 'Compra desde un CTA claro'],
      guarantees: ['Pago seguro', 'Envío con seguimiento', 'Garantía de satisfacción', 'Soporte por email'],
      faqs: [
        { q: '¿Puedo editar el tema en Shopify?', a: 'Sí. El ZIP usa secciones y bloques editables desde el editor de temas.' },
        { q: '¿Sirve para dropshipping?', a: 'Sí. Está pensado para tiendas de producto ganador, catálogo pequeño o marca nicho.' },
        { q: '¿Necesito saber código?', a: 'No. Subes el ZIP en Shopify y editas textos, imágenes y colores desde el editor.' },
        { q: '¿Qué incluye?', a: 'Home, producto, catálogo, FAQ, contacto, sobre nosotros, políticas, assets y configuración.' }
      ]
    },
    pages: {
      catalogTitle: `Colección ${brand}`,
      about: `${brand} nace para acercar productos útiles con una experiencia de compra clara, cuidada y fiable.`,
      contact: '¿Tienes dudas? Escríbenos desde el formulario de contacto y te responderemos lo antes posible.',
      policies: ['Envíos con seguimiento', 'Devoluciones dentro del plazo legal', 'Pago seguro cifrado', 'Atención al cliente por email']
    }
  };
}

export async function generateStore(payload: GeneratePayload): Promise<GeneratedStore> {
  if (!process.env.OPENAI_API_KEY) return localGenerate(payload);
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const base = localGenerate(payload);
  const prompt = `Genera copy ecommerce en español para una tienda Shopify completa. NO generes una web aleatoria: sigue siempre esta estructura fija CRO. Producto/tienda: ${payload.description}. Nicho seleccionado: ${nicheLabels[payload.storeType] || payload.storeType}. URL opcional: ${payload.productUrl || 'no disponible'}. Estructura obligatoria: HOME con hero potente, producto destacado, beneficios, problema-solución, cómo funciona, prueba social, CTA repetidos, FAQ y garantías. PRODUCT PAGE con oferta clara, precio/descuento, urgencia, beneficios, imágenes, prueba social, garantías, FAQ y CTA repetido. También catálogo, contacto, sobre nosotros y políticas. Devuelve solo JSON parcial con heroTitle, heroSubtitle, productHeadline, benefits[4], bullets[4], problem, solution, faqs[4]{q,a}.`; 
  try {
    const res = await client.chat.completions.create({ model: 'gpt-4o-mini', messages: [{ role: 'system', content: 'Eres experto CRO Shopify. Escribes en español claro, premium y orientado a conversión. Sin emojis.' }, { role: 'user', content: prompt }], response_format: { type: 'json_object' }, temperature: .7 });
    const parsed = JSON.parse(res.choices[0]?.message?.content || '{}');
    return {
      ...base,
      product: { ...base.product, headline: parsed.productHeadline || base.product.headline, bullets: parsed.bullets || base.product.bullets },
      home: { ...base.home, heroTitle: parsed.heroTitle || base.home.heroTitle, heroSubtitle: parsed.heroSubtitle || base.home.heroSubtitle, benefits: parsed.benefits || base.home.benefits, problem: parsed.problem || base.home.problem, solution: parsed.solution || base.home.solution, faqs: parsed.faqs || base.home.faqs }
    };
  } catch {
    return base;
  }
}
