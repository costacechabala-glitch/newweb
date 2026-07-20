# AI Worker Academy

Modern learning platform that teaches employees, freelancers, entrepreneurs, and professionals how to use AI at work.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's included

- Landing page with hero, benefits, AI tools, courses preview, testimonials
- Free + Premium courses ($0.99) with lesson pages (video, transcript, quiz, notes, progress)
- Dashboard (progress, streak, certificates, favorites, wishlist, profile)
- Auth UI: sign up, login, forgot password, Google/Apple buttons (demo via localStorage)
- Pricing checkout demo (Stripe / PayPal stubs + `/api/checkout`)
- AI Prompt Library (13 categories, copy + example output)
- Blog, search, FAQ, About, Contact, Privacy, Terms, Cookies
- Admin dashboard preview, referral program, live chat, cookie consent
- Dark/light mode, SEO (metadata, sitemap, robots), accessibility basics
- Prisma schema ready for PostgreSQL (`prisma/schema.prisma`)

## Production wiring

Copy `.env.example` → `.env.local` and connect:

| Service | Purpose |
|---------|---------|
| Auth.js / Clerk | Real auth, email verification, Google/Apple |
| Stripe + PayPal | Live $0.99 Premium checkout + webhooks |
| PostgreSQL + Prisma | Users, progress, payments |
| Cloudinary / S3 | Lesson videos & certificate assets |
| GA / PostHog | Analytics |

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm start` — serve production build
