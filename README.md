# Yoooko — AI Shopify Store Builder

App SaaS en Next.js para generar tiendas Shopify completas con IA y exportarlas como ZIP de tema.

## Qué incluye

- Frontend mobile-first, dark/futurista, sin emojis ni UI infantil.
- Generador con estructura fija CRO: home, producto, catálogo, FAQ, contacto, sobre nosotros y políticas.
- Upload de imágenes de producto.
- Preview realista solo después de generar.
- Límite local de 3 previews gratis.
- Planes Básico / Pro / Premium.
- Export Shopify ZIP con:
  - `layout/theme.liquid`
  - `templates/*.json`
  - `sections/*.liquid`
  - `assets/yoooko-theme.css`
  - `config/settings_schema.json`
  - `locales/es.default.json`

## IA

Si `OPENAI_API_KEY` está configurada, usa OpenAI para mejorar el copy CRO.
Si no existe, usa un generador local determinista para que la app siga funcionando durante desarrollo.

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run typecheck
npm run build
npm start
```

## Futuro recomendado

1. Stripe Checkout antes de permitir exportar.
2. Sistema real de usuarios y contador de previews en base de datos.
3. Shopify OAuth + Theme API para instalar el tema como borrador directamente en la tienda del cliente.
4. Validación más estricta del ZIP con tests contra Shopify Theme Check.
