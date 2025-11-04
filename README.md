# Next.js SaaS Starter (minimal ZIP)

This ZIP contains a scaffold for a Next.js 14 (App Router) SaaS starter using TypeScript, Prisma schema (no migrations), NextAuth (email+Google), and Stripe stubs.

## Quickstart

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and fill values.

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

4. Run dev server:
   ```bash
   npm run dev
   ```

Notes:
- This package includes `prisma/schema.prisma` only (no migrations).
- You still must run `npx prisma migrate dev` if you want migrations (not included).
- Replace env values (Google keys, DB URL, Stripe keys) before using auth/stripe features.
