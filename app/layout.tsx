import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yoooko — Temas Shopify con IA',
  description: 'Genera una tienda Shopify completa con IA, previsualiza gratis y exporta un tema funcional.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}
