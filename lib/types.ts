export type StoreType = 'dropshipping' | 'single-product' | 'beauty' | 'fitness' | 'home' | 'tech' | 'fashion' | 'pets' | 'baby' | 'jewelry' | 'kitchen' | 'car' | 'gadgets' | 'wellness' | 'outdoor' | 'gaming' | 'office' | 'travel' | 'eco' | 'accessories';
export type StoreStyle = 'futurista' | 'minimal' | 'premium' | 'natural' | 'bold';
export type Plan = 'basic' | 'pro' | 'premium';

export type UploadedImage = { name: string; dataUrl: string };

export type Product = {
  name: string;
  headline: string;
  price: string;
  compareAt: string;
  bullets: string[];
  images: string[];
  reviews: { name: string; text: string }[];
};

export type GeneratedStore = {
  id: string;
  brand: string;
  niche: string;
  style: StoreStyle;
  palette: { background: string; surface: string; text: string; muted: string; accent: string; accent2: string };
  product: Product;
  home: {
    heroTitle: string;
    heroSubtitle: string;
    cta: string;
    benefits: string[];
    problem: string;
    solution: string;
    howItWorks: string[];
    guarantees: string[];
    faqs: { q: string; a: string }[];
  };
  pages: {
    catalogTitle: string;
    about: string;
    contact: string;
    policies: string[];
  };
};

export type GeneratePayload = {
  description: string;
  productUrl?: string;
  storeType: StoreType;
  style: StoreStyle;
  images: UploadedImage[];
};
