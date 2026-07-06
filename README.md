# Muhammad Umer Alam — Portfolio

Single-page developer portfolio built with **Next.js 16** (App Router) and **Tailwind CSS v4**.

## Design concept
A "system status" dashboard is the signature element in the hero — your real
impact metrics (−40% load time, +55% organic sessions, −70% reconciliation
time, 200+ daily users) are rendered like a live monitoring panel. That's
deliberate: it puts the numbers a recruiter actually cares about front and
center, readable in the first few seconds, and it reflects who you are as a
developer (performance + security + reliability), not a generic template.

Everything a recruiter needs is visible within the first screen or two:
name, role, availability, headline metrics, and a direct email CTA. Full
detail (experience, stack, projects, contact) is one scroll away.

## Run locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Build for production
```bash
npm run build
npm run start
```

## Deploy
The fastest path is Vercel (vercel.com/new) — connect the repo (or
run `npx vercel`) and it deploys with zero config.

## Editing content
All copy lives in `src/components/`:
- `Hero.tsx` — name, tagline, headline metrics
- `Work.tsx` — featured projects
- `Experience.tsx` — role history
- `Stack.tsx` — tech stack groups
- `Contact.tsx` — email / LinkedIn / footer details

Colors and fonts are defined once in `src/app/globals.css` under `:root` and
`@theme inline` — change a value there and it updates everywhere.
