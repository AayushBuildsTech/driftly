# Driftly Travels

A premium, mobile-first travel lead-generation website — Next.js 15 (App Router),
TypeScript, Tailwind CSS, Framer Motion. Statically exported and hosted on **GitHub Pages**.

**Live:** https://aayushbuildstech.github.io/driftly/

## Features
- Cinematic "flight route" journey connecting the three destinations
- Dedicated detail page per destination (itinerary, gallery, FAQ, downloadable PDF)
- Lead capture via WhatsApp deep-links and a callback form (FormSubmit — no server)
- SEO: per-page metadata, Open Graph, JSON-LD, sitemap & robots

## Local development
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)
```bash
npm run build    # outputs a static site to ./out
```

## Deployment (automatic)
Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages.

**One-time repo setup:** GitHub → repo **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

## Configuration — everything is in `lib/constants.ts`
- `BRAND.whatsappNumber` / `email` / `url`
- Destination content lives in `lib/packages.ts` (add an object → new page + card + PDF)

### FormSubmit activation (one time)
The callback form posts to FormSubmit. The **first** submission emails
`driftlytravels@gmail.com` an "Activate Form" link — click it once and all future
leads are delivered automatically.

### Custom domain (later)
1. Set `BRAND.url` to the domain and add a `public/CNAME` file containing it.
2. Set `basePath` in `next.config.ts` and `BASE_PATH` in `lib/constants.ts` to `""`.
3. Configure the domain under repo Settings → Pages.

## Assets
Images live in `public/images/` (WebP). Itinerary PDFs in `public/itineraries/`.
Generation prompts for new imagery are in `ai_prompts.md`.
