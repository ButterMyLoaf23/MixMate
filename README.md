# MixMate

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
