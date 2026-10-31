# MixMate

MixMate is a JavaScript Next.js mocktail recipe manager.

## Setup

Create `.env` from `.env.example`. To reuse the previous VexRig PostgreSQL database safely, keep the database name as `vexrig` and use the separate schema `mixmate` in `DATABASE_URL`.

```powershell
npm install
npx prisma generate
npx prisma migrate dev --name initial_mixmate
npm run db:seed
npm run dev
```

The current MVP includes a recipe catalog, seeded recipes, recipe detail pages, account registration, and login.

MixMate is a JavaScript Next.js mocktail recipe manager.

## Setup

```bash
npm install
copy .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Open `http://localhost:3000` to view the starter catalog.

## Current foundation

- Next.js App Router with JavaScript
- Prisma/PostgreSQL data model for users, recipes, ingredients, favorites, and personal recipes
- Seeded recipe catalog
- Health endpoint at `/api/health`
- Initial home page and recipe catalog UI
