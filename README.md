# Reyansh Joshi — Portfolio Website

Personal portfolio for **Reyansh Joshi**, a Senior Full Stack Engineer specializing in backend & AI platform engineering. Built with Next.js 15+, TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting Started

This project requires **Node.js >= 20.9.0**. If you use `nvm`:

```bash
nvm use 20
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
```

## Project Structure

- `app/` — Next.js App Router routes, layout, globals, SEO files (`sitemap.ts`, `robots.ts`, `opengraph-image.tsx`)
- `components/` — Reusable UI components and page sections
- `data/profile.ts` — Resume content and profile data
- `public/resume.pdf` — Downloadable resume
- `public/llms.txt` — AI-crawler summary

## Deployment

Recommended: deploy to [Vercel](https://vercel.com) and point the custom domain `reyansh.dev`.

## Notes

- The site ships with dark mode as default and a light mode toggle.
- The resume download route is at `/resume`.
- SEO/AEO files: `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, and `public/llms.txt`.
