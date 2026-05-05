'use client';

import { useEffect, useMemo, useState } from 'react';
import { GeneratedStore, Plan, StoreStyle, StoreType, UploadedImage } from '@/lib/types';
import { MinimalIcon, YoookoMark } from '@/components/Icons';

function Icon({ name, size = 18, className = '' }: { name: string; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className };
  const paths: Record<string, React.ReactNode> = {
    image: <><path d="M4 16l4-4 4 4 3-3 5 5"/><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="8" r="1.5"/></>,
    loader: <><path d="M21 12a9 9 0 1 1-6.2-8.6"/></>,
    wand: <><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 6.2l1.4-1.4"/><path d="M10.8 13.2l-6 6"/><path d="M4.8 19.2l5-5"/><path d="M12.2 6.2l-1.4-1.4"/></>,
    phone: <><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></>,
    sparkles: <><path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>,
    refresh: <><path d="M21 12a9 9 0 0 1-15.5 6.2"/><path d="M3 12A9 9 0 0 1 18.5 5.8"/><path d="M18 2v4h4"/><path d="M6 22v-4H2"/></>,
    check: <path d="M20 6L9 17l-5-5"/>,
    download: <><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></>,
    lock: <><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    layers: <><path d="M12 2l9 5-9 5-9-5 9-5Z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M9 12l2 2 4-4"/></>,
    zap: <path d="M13 2L3 14h8l-1 8 11-13h-8l0-7Z"/>,
    chevron: <path d="M6 9l6 6 6-6"/>
  };
  return <svg {...common}>{paths[name]}</svg>;
}

const storeTypes: { label: string; value: StoreType }[] = [
  { label: 'Producto ganador', value: 'single-product' },
  { label: 'Dropshipping general', value: 'dropshipping' },
  { label: 'Belleza y cuidado', value: 'beauty' },
  { label: 'Fitness y deporte', value: 'fitness' },
  { label: 'Hogar y decoración', value: 'home' },
  { label: 'Tecnología', value: 'tech' },
  { label: 'Moda y accesorios', value: 'fashion' },
  { label: 'Mascotas', value: 'pets' },
  { label: 'Bebés y maternidad', value: 'baby' },
  { label: 'Joyas y relojes', value: 'jewelry' },
  { label: 'Cocina', value: 'kitchen' },
  { label: 'Coche y moto', value: 'car' },
  { label: 'Gadgets virales', value: 'gadgets' },
  { label: 'Salud y bienestar', value: 'wellness' },
  { label: 'Outdoor y aventura', value: 'outdoor' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Oficina y productividad', value: 'office' },
  { label: 'Viajes', value: 'travel' },
  { label: 'Eco / sostenible', value: 'eco' },
  { label: 'Accesorios premium', value: 'accessories' }
];
const styles: { label: string; value: StoreStyle }[] = [
  { label: 'Futurista', value: 'futurista' },
  { label: 'Minimal', value: 'minimal' },
  { label: 'Premium', value: 'premium' },
  { label: 'Natural', value: 'natural' },
  { label: 'Bold', value: 'bold' }
];
const plans: { id: Plan; name: string; price: string; reason: string; features: string[] }[] = [
  { id: 'basic', name: 'Básico', price: '19€', reason: 'Para validar un producto rápido sin gastar de más.', features: ['1 export Shopify', '1 producto', 'Home + producto', '2 regeneraciones'] },
  { id: 'pro', name: 'Pro', price: '39€', reason: 'Para lanzar una tienda completa con más confianza.', features: ['Tienda completa', 'Catálogo, FAQ y páginas legales', 'Más secciones CRO', '6 regeneraciones'] },
  { id: 'premium', name: 'Premium', price: '79€', reason: 'Para campañas serias con más personalización y mejor acabado.', features: ['Más imágenes', 'Más variaciones', 'Copy más avanzado', 'Personalización premium'] }
];

export default function Home() {
  const [description, setDescription] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [storeType, setStoreType] = useState<StoreType>('single-product');
  const [style, setStyle] = useState<StoreStyle>('futurista');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [store, setStore] = useState<GeneratedStore | null>(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState<Plan | null>(null);
  const [error, setError] = useState('');
  const [view, setView] = useState<'mobile' | 'desktop'>('mobile');
  const [previews, setPreviews] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPreviews(Number(localStorage.getItem('yoooko_previews') || 0));
  }, []);

  const freeLeft = Math.max(0, 3 - previews);

  async function onFiles(fileList: FileList | null) {
    if (!fileList) return;
    const files = Array.from(fileList).slice(0, 6);
    const encoded = await Promise.all(files.map(file => new Promise<UploadedImage>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ name: file.name, dataUrl: String(reader.result) });
      reader.onerror = () => reject(new Error('No se pudo leer la imagen'));
      reader.readAsDataURL(file);
    })));
    setImages(prev => [...prev, ...encoded].slice(0, 8));
  }

  async function generate() {
    setError('');
    if (description.trim().length < 8) { setError('Describe tu producto o tienda con un poco más de detalle.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ description, productUrl, storeType, style, images }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo generar');
      setStore(data.store);
      const next = previews + 1;
      setPreviews(next);
      if (typeof window !== 'undefined') localStorage.setItem('yoooko_previews', String(next));
    } catch (e) { setError(e instanceof Error ? e.message : 'Ha ocurrido un error'); }
    finally { setLoading(false); }
  }

  async function exportTheme(plan: Plan) {
    if (!store) return;
    setExporting(plan);
    setError('');
    try {
      const res = await fetch('/api/export', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ store, plan }) });
      if (!res.ok) throw new Error('No se pudo exportar el ZIP');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `yoooko-${store.brand.toLowerCase().replace(/\s+/g, '-')}-${plan}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) { setError(e instanceof Error ? e.message : 'No se pudo exportar'); }
    finally { setExporting(null); }
  }

  return <main className="noise min-h-screen overflow-hidden relative">
    <div className="orb left-[-90px] top-[-90px] h-72 w-72 bg-violet-600" />
    <div className="orb right-[-80px] top-28 h-72 w-72 bg-cyan-500" />
    <Header />
    <section id="inicio" className="mx-auto grid w-full max-w-7xl gap-5 px-4 pb-10 pt-6 sm:px-6 lg:grid-cols-[.88fr_1.12fr] lg:pt-10">
      <BuilderPanel description={description} setDescription={setDescription} productUrl={productUrl} setProductUrl={setProductUrl} storeType={storeType} setStoreType={setStoreType} style={style} setStyle={setStyle} images={images} setImages={setImages} onFiles={onFiles} generate={generate} loading={loading} error={error} freeLeft={freeLeft} mounted={mounted} />
      <PreviewPanel store={store} loading={loading} view={view} setView={setView} onRegenerate={generate} />
    </section>
    <LandingSections />
    <Pricing store={store} exporting={exporting} onExport={exportTheme} />
    <Trust />
  </main>;
}

function Header() {
  return <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
    <a href="#inicio" className="group flex items-center gap-3" aria-label="Yoooko">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/20 bg-white/[.045] shadow-[0_0_36px_rgba(34,211,238,.16)]">
        <span className="absolute inset-1 rounded-xl bg-gradient-to-br from-cyan-300/20 via-violet-400/20 to-transparent blur-sm" />
        <span className="relative h-5 w-5 rounded-full border border-cyan-200/70 shadow-[0_0_18px_rgba(34,211,238,.45)]" />
        <span className="absolute h-px w-7 rotate-45 bg-gradient-to-r from-transparent via-cyan-100 to-transparent" />
      </div>
      <span className="brand-word text-2xl font-black uppercase tracking-[-.08em] sm:text-3xl">YOOOKO</span>
    </a>
    <nav className="hidden items-center gap-6 text-sm font-bold text-white/55 md:flex">
      <a className="transition hover:text-white" href="#como-funciona">Cómo funciona</a>
      <a className="transition hover:text-white" href="#shopify">Shopify</a>
      <a className="transition hover:text-white" href="#precios">Precios</a>
    </nav>
    <a href="#precios" className="btn btn-secondary px-4 text-sm">Ver precios</a>
  </header>;
}

function BuilderPanel(props: any) {
  return <div className="glass rounded-[32px] p-4 sm:p-6 lg:sticky lg:top-5 lg:self-start">
    <div className="mb-5">
      <p className="mini-label mb-3">Generador Shopify IA</p>
      <h1 className="text-[42px] font-black leading-[.92] tracking-[-.06em] sm:text-6xl">Crea una tienda Shopify que parezca una marca real.</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-white/60">Describe el producto, sube imágenes y genera una tienda completa con home, producto, catálogo, FAQ, contacto, sobre nosotros y políticas. Previsualiza gratis antes de exportar.</p>
    </div>
    <div className="space-y-3">
      <textarea className="input min-h-[136px] resize-none p-4 text-base leading-6" placeholder="Ejemplo: Quiero una tienda premium para vender una lámpara LED minimalista para escritorios, enfocada a productividad y setup aesthetic..." value={props.description} onChange={(e)=>props.setDescription(e.target.value)} />
      <input className="input px-4 py-3 text-sm" placeholder="URL de producto opcional (AliExpress, proveedor, competidor...)" value={props.productUrl} onChange={(e)=>props.setProductUrl(e.target.value)} />
      <div className="grid grid-cols-2 gap-3">
        <Select label="Tipo" value={props.storeType} onChange={props.setStoreType} options={storeTypes} />
        <Select label="Estilo" value={props.style} onChange={props.setStyle} options={styles} />
      </div>
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/[.04] p-4 transition hover:bg-white/[.07]">
        <span className="flex items-center gap-3"><MinimalIcon><Icon name="image" size={18}/></MinimalIcon><span><span className="block text-sm font-bold">Subir imágenes</span><span className="text-xs text-white/45">Producto, catálogo o lifestyle</span></span></span>
        <input className="hidden" type="file" accept="image/*" multiple onChange={(e)=>props.onFiles(e.target.files)} />
        <span className="text-xs text-cyan-200">{props.images.length}/8</span>
      </label>
      {props.images.length > 0 && <div className="flex gap-2 overflow-x-auto pb-1">{props.images.map((img: UploadedImage, i: number)=><button key={i} onClick={()=>props.setImages((prev: UploadedImage[])=>prev.filter((_,idx)=>idx!==i))} className="h-16 w-16 flex-none overflow-hidden rounded-2xl border border-white/10"><img src={img.dataUrl} alt="" className="h-full w-full object-cover" /></button>)}</div>}
      {props.error && <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-100">{props.error}</div>}
      <button onClick={props.generate} disabled={props.loading} className="btn btn-primary w-full gap-2 px-6 py-4 text-base disabled:cursor-not-allowed disabled:opacity-60">{props.loading ? <Icon name="loader" className="animate-spin" size={18}/> : <Icon name="wand" size={18}/>} Generar tienda completa</button>
      <div className="flex items-center justify-between text-xs text-white/45"><span>{props.freeLeft > 0 ? `${props.freeLeft} previews gratis restantes` : 'Previews gratis agotadas: exporta o conecta pagos'}</span><span>Sin código · ZIP Shopify</span></div>
    </div>
  </div>
}

function Select({ label, value, onChange, options }: any) {
  return <label className="relative block"><span className="mb-1 block px-1 text-xs font-bold text-white/45">{label}</span><select className="input appearance-none px-4 py-3 text-sm" value={value} onChange={(e)=>onChange(e.target.value)}>{options.map((o:any)=><option key={o.value} value={o.value}>{o.label}</option>)}</select><Icon name="chevron" className="pointer-events-none absolute bottom-3.5 right-3 text-white/45" size={16}/></label>
}

function PreviewPanel({ store, loading, view, setView, onRegenerate }: { store: GeneratedStore | null; loading: boolean; view: 'mobile'|'desktop'; setView: (v:'mobile'|'desktop')=>void; onRegenerate:()=>void }) {
  return <div className="glass min-h-[620px] rounded-[32px] p-3 sm:p-4">
    <div className="flex items-center justify-between gap-3 p-2">
      <div><p className="mini-label">Preview real</p><p className="text-sm text-white/45">Solo aparece después de generar</p></div>
      <div className="flex rounded-full border border-white/10 bg-white/[.04] p-1"><button onClick={()=>setView('mobile')} className={`btn h-9 min-h-0 px-3 ${view==='mobile'?'btn-primary':'text-white/50'}`}><Icon name="phone" size={16}/></button><button onClick={()=>setView('desktop')} className={`btn h-9 min-h-0 px-3 ${view==='desktop'?'btn-primary':'text-white/50'}`}><Icon name="monitor" size={16}/></button></div>
    </div>
    <div className="relative mt-2 flex min-h-[540px] items-center justify-center overflow-hidden rounded-[26px] border border-white/10 bg-[#090b12] p-3">
      {!store && !loading && <EmptyPreview />}
      {loading && <div className="text-center"><Icon name="loader" className="mx-auto mb-4 animate-spin text-cyan-200" size={34}/><h3 className="text-xl font-black">Construyendo estructura CRO</h3><p className="mt-2 max-w-sm text-sm text-white/50">Home, producto, catálogo, FAQ, contacto, sobre nosotros y políticas.</p></div>}
      {store && !loading && <StorePreview store={store} view={view} onRegenerate={onRegenerate} />}
    </div>
  </div>
}

function EmptyPreview() {
  return <div className="max-w-md text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[.04]"><Icon name="sparkles" className="text-cyan-200" size={28}/></div><h2 className="text-2xl font-black tracking-tight">Aquí aparecerá tu tienda</h2><p className="mt-3 text-sm leading-6 text-white/50">No usamos una preview falsa en el hero. Primero describes tu tienda; después ves una maqueta realista generada con tu producto, copy, beneficios y estructura ecommerce.</p></div>
}

function StorePreview({ store, view, onRegenerate }: { store: GeneratedStore; view: 'mobile'|'desktop'; onRegenerate:()=>void }) {
  const img = store.product.images[0];
  return <div className="h-full w-full">
    <div className="mb-3 flex items-center justify-between gap-3 px-1"><div><strong>{store.brand}</strong><p className="text-xs text-white/45">Tema Shopify generado</p></div><button onClick={onRegenerate} className="btn btn-secondary h-9 min-h-0 gap-2 px-3 text-xs"><Icon name="refresh" size={14}/> Regenerar</button></div>
    <div className={`store-scroll mx-auto overflow-y-auto rounded-[28px] border border-white/10 bg-[${store.palette.background}] shadow-2xl ${view==='mobile'?'h-[500px] max-w-[360px]':'h-[500px] w-full'}`} style={{ background: store.palette.background }}>
      <div className="p-4" style={{ color: store.palette.text }}>
        <div className="flex items-center justify-between"><strong>{store.brand}</strong><span className="rounded-full border border-white/10 px-3 py-1 text-[11px]">Oferta activa</span></div>
        <section className={`grid gap-5 py-8 ${view==='desktop'?'grid-cols-2 items-center':'grid-cols-1'}`}>
          <div><p className="text-[11px] font-black uppercase tracking-[.18em]" style={{ color: store.palette.accent2 }}>{store.niche}</p><h1 className="mt-3 text-4xl font-black leading-[.95] tracking-[-.05em]">{store.home.heroTitle}</h1><p className="mt-4 text-sm leading-6" style={{ color: store.palette.muted }}>{store.home.heroSubtitle}</p><div className="mt-5 flex flex-wrap gap-2"><button className="rounded-full px-5 py-3 text-sm font-black text-white" style={{ background: `linear-gradient(135deg,${store.palette.accent},${store.palette.accent2})` }}>{store.home.cta}</button><span className="rounded-full border border-white/10 px-4 py-3 text-xs" style={{ color: store.palette.muted }}>Envío rastreado · Garantía</span></div></div>
          <div className="rounded-[26px] border border-white/10 p-3" style={{ background: store.palette.surface }}><img src={img} alt="" className="aspect-square w-full rounded-[22px] object-cover"/><h2 className="mt-3 text-xl font-black">{store.product.name}</h2><p className="mt-1 text-sm" style={{ color: store.palette.muted }}>{store.product.headline}</p><p className="mt-3"><b className="text-2xl">{store.product.price}</b> <span className="line-through" style={{ color: store.palette.muted }}>{store.product.compareAt}</span></p></div>
        </section>
        <section className="grid gap-3 py-4" style={{ gridTemplateColumns: view==='desktop'?'repeat(4,1fr)':'1fr' }}>{store.home.benefits.map((b,i)=><div key={i} className="rounded-2xl border border-white/10 p-4 text-sm" style={{ background: 'rgba(255,255,255,.05)' }}>{b}</div>)}</section>
        <section className="py-7"><p className="text-[11px] font-black uppercase tracking-[.18em]" style={{ color: store.palette.accent2 }}>Problema → solución</p><h2 className="mt-2 text-2xl font-black">{store.home.problem}</h2><p className="mt-3 text-sm leading-6" style={{ color: store.palette.muted }}>{store.home.solution}</p></section>
        <section className="grid gap-3 py-4" style={{ gridTemplateColumns: view==='desktop'?'repeat(3,1fr)':'1fr' }}>{store.product.reviews.map((r,i)=><div key={i} className="rounded-2xl border border-white/10 p-4" style={{ background: store.palette.surface }}><b>{r.name}</b><p className="mt-2 text-sm" style={{ color: store.palette.muted }}>{r.text}</p></div>)}</section>
        <section className="py-7"><p className="text-[11px] font-black uppercase tracking-[.18em]" style={{ color: store.palette.accent2 }}>Página de producto</p><div className="mt-3 rounded-2xl border border-white/10 p-4" style={{ background: store.palette.surface }}><h2 className="text-2xl font-black">Oferta clara + beneficios + urgencia</h2><p className="mt-2 text-sm leading-6" style={{ color: store.palette.muted }}>{store.product.bullets.join(' · ')}</p><button className="mt-4 w-full rounded-full px-5 py-3 text-sm font-black text-white" style={{ background: `linear-gradient(135deg,${store.palette.accent},${store.palette.accent2})` }}>Añadir al carrito</button></div></section>
        <section className="grid gap-3 py-4" style={{ gridTemplateColumns: view==='desktop'?'repeat(3,1fr)':'1fr' }}><div className="rounded-2xl border border-white/10 p-4" style={{ background: 'rgba(255,255,255,.05)' }}><b>Catálogo</b><p className="mt-2 text-sm" style={{ color: store.palette.muted }}>{store.pages.catalogTitle}</p></div><div className="rounded-2xl border border-white/10 p-4" style={{ background: 'rgba(255,255,255,.05)' }}><b>FAQ</b><p className="mt-2 text-sm" style={{ color: store.palette.muted }}>{store.home.faqs.length} preguntas listas</p></div><div className="rounded-2xl border border-white/10 p-4" style={{ background: 'rgba(255,255,255,.05)' }}><b>Páginas legales</b><p className="mt-2 text-sm" style={{ color: store.palette.muted }}>Contacto, sobre nosotros y políticas</p></div></section>
      </div>
    </div>
  </div>
}


function LandingSections() {
  const steps = [
    { title: 'Describe la tienda', text: 'El usuario explica el producto, el nicho y el estilo. Puede pegar una URL o subir imágenes.' },
    { title: 'Yoooko estructura la tienda', text: 'Se genera siempre con una arquitectura ecommerce fija: home, producto, catálogo, FAQ, contacto, sobre nosotros y políticas.' },
    { title: 'Previsualiza y exporta', text: 'Primero ve el resultado. Solo paga cuando quiere descargar el ZIP compatible con Shopify.' }
  ];
  const shopify = [
    'layout/theme.liquid',
    'templates/*.json',
    'sections/*.liquid',
    'assets/theme.css',
    'config/settings_schema.json',
    'locales/es.default.json'
  ];
  return <>
    <section id="como-funciona" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.03))] p-6 sm:p-8 lg:p-10">
        <div className="absolute right-6 top-6 hidden text-[92px] font-black leading-none tracking-[-.12em] text-white/[.035] sm:block">YOOOKO</div>
        <div className="relative max-w-3xl">
          <p className="mini-label mb-3">Landing de conversión</p>
          <h2 className="text-3xl font-black leading-[.98] tracking-[-.05em] sm:text-5xl">Una experiencia simple: generar, revisar y comprar.</h2>
          <p className="mt-4 text-base leading-7 text-white/55">La app está pensada para tráfico de anuncios: entra, entiende qué hace, genera una tienda realista y llega al precio sin perderse.</p>
        </div>
        <div className="relative mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, i)=><div key={step.title} className="rounded-3xl border border-white/10 bg-black/25 p-5">
            <span className="text-sm font-black text-cyan-100/70">0{i+1}</span>
            <h3 className="mt-3 text-xl font-black tracking-tight">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/50">{step.text}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section id="shopify" className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_.85fr]">
      <div className="glass rounded-[32px] p-6 sm:p-8">
        <p className="mini-label mb-3">Export Shopify</p>
        <h2 className="text-3xl font-black leading-tight tracking-[-.04em] sm:text-4xl">No genera una web cualquiera. Genera un tema preparado para Shopify.</h2>
        <p className="mt-4 text-sm leading-7 text-white/55">La IA futura no tendrá libertad total para inventar bloques sin sentido. Trabajará sobre una estructura fija de ecommerce y después esa estructura se convierte a Liquid, JSON templates, CSS y configuración editable desde Shopify.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {['Home completa CRO','Producto optimizado','Catálogo limpio','FAQ y garantías','Contacto','Sobre nosotros y políticas'].map(item=><div key={item} className="rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3 text-sm font-bold text-white/70">{item}</div>)}
        </div>
      </div>
      <div className="rounded-[32px] border border-white/10 bg-[#070912] p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="brand-word text-xl font-black uppercase tracking-[-.08em]">YOOOKO</span>
          <span className="rounded-full border border-cyan-200/20 px-3 py-1 text-xs font-bold text-cyan-100/70">ZIP theme</span>
        </div>
        <div className="space-y-2 font-mono text-sm text-white/60">
          {shopify.map(file=><div key={file} className="rounded-xl border border-white/10 bg-white/[.035] px-4 py-3">{file}</div>)}
        </div>
      </div>
    </section>
  </>;
}

function Pricing({ store, exporting, onExport }: { store: GeneratedStore | null; exporting: Plan | null; onExport: (plan: Plan)=>void }) {
  return <section id="precios" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="mini-label mb-2">Precios</p><h2 className="text-3xl font-black tracking-[-.04em] sm:text-5xl">Previsualiza gratis. Paga solo para exportar.</h2></div><p className="max-w-md text-sm leading-6 text-white/50">Los planes suben porque aumentan páginas, regeneraciones, imágenes, estructura CRO y personalización.</p></div>
    <div className="grid gap-4 lg:grid-cols-3">{plans.map((p,idx)=><div key={p.id} className={`glass rounded-[30px] p-5 ${idx===1?'ring-1 ring-cyan-300/30':''}`}><div className="flex items-start justify-between"><div><h3 className="text-xl font-black">{p.name}</h3><p className="mt-1 text-sm text-white/50">{p.reason}</p></div>{idx===1 && <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">Recomendado</span>}</div><div className="my-6 text-5xl font-black tracking-[-.06em]">{p.price}</div><ul className="space-y-3">{p.features.map(f=><li key={f} className="flex gap-3 text-sm text-white/70"><Icon name="check" className="mt-.5 flex-none text-cyan-200" size={16}/>{f}</li>)}</ul><button onClick={()=>onExport(p.id)} disabled={!store || Boolean(exporting)} className={`btn mt-6 w-full gap-2 px-5 py-3 ${idx===1?'btn-primary':'btn-secondary'} disabled:cursor-not-allowed disabled:opacity-45`}>{exporting===p.id ? <Icon name="loader" className="animate-spin" size={16}/> : store ? <Icon name="download" size={16}/> : <Icon name="lock" size={16}/>} {store ? 'Exportar tema' : 'Genera primero'}</button></div>)}</div>
  </section>
}

function Trust() {
  const items = [
    { icon: <Icon name="layers" size={18}/>, title: 'Tema Shopify real', text: 'Layout, templates JSON, sections Liquid, assets, config y locales.' },
    { icon: <Icon name="shield" size={18}/>, title: 'Estructura fija CRO', text: 'No genera páginas random: sigue home, producto, FAQ y garantías.' },
    { icon: <Icon name="zap" size={18}/>, title: 'Preparado para escalar', text: 'Listo para OpenAI, pagos y futura conexión directa con Shopify OAuth.' }
  ];
  return <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6"><div className="grid gap-4 md:grid-cols-3">{items.map(item=><div key={item.title} className="rounded-3xl border border-white/10 bg-white/[.035] p-5"><MinimalIcon>{item.icon}</MinimalIcon><h3 className="mt-4 font-black">{item.title}</h3><p className="mt-2 text-sm leading-6 text-white/50">{item.text}</p></div>)}</div></section>
}
