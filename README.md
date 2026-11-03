# HimCraft Studio

A warm, modern catalogue website for handmade crochet and woollen creations.

## Stack
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- Local JSON catalogue and settings
- WhatsApp enquiry links (no cart, checkout, payment gateway or shipping integration)
- Static export configured for Cloudflare Pages

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Build
```bash
npm run build
```
The static site is exported to `out/`. Deploy the contents of `out` to Cloudflare Pages. Build command: `npm run build`; output directory: `out`.

## Before launch
1. Replace `REPLACE_WITH_WHATSAPP_NUMBER`, `REPLACE_WITH_PHONE`, and `REPLACE_WITH_BUSINESS_EMAIL` in `src/data/site-settings.json` with the studio's real contact details.
2. Replace the sample catalogue entries and illustrative SVGs with approved product names, descriptions, categories, and authentic product photographs.
3. Confirm the purchased domain and connect it in Cloudflare Pages after the first deployment.

The current catalogue and SVG artwork are starter placeholders, not verified live inventory or product photography. The WhatsApp link will not be ready until the number is configured.

## Update catalogue
Edit `src/data/products.json` and `src/data/categories.json`. Product images belong in `public/images/products/`; category/hero images belong in `public/images/categories/` and `public/images/hero/`. Replace the starter image paths with your real product photography.

## Enquiries
WhatsApp number and business contact details are in `src/data/site-settings.json`. Use the international format without +, spaces or dashes for the WhatsApp number.

## Future Supabase phase
The catalogue currently reads local JSON. Authentication, database-backed product management and image uploads are intentionally not enabled in this static MVP. Add Supabase and a compatible server/runtime before enabling a real admin dashboard.
