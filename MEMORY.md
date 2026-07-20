# Pinventory AI Agent Memory

This document stores essential environment settings, persistent identifiers, and codebase invariants for AI agents operating on the Pinventory codebase.

## 🔑 Key Identifiers & Configuration

- **Live Production URL:** `https://pinventory-5hr5.vercel.app`
- **Pinterest Domain Verification Token:** `2b35d9cc56f50526ac82aa5aec6d6e44`
- **Pinterest Feed URL:** `https://pinventory-5hr5.vercel.app/api/catalog`

---

## 🛠️ Codebase Invariants & Gotchas

1. **Next.js 16 Breaking Changes:**
   - In Next.js 16 (App Router), `params` in Page components is a `Promise`. Always await `params` before accessing fields!
   - Example:
     ```typescript
     export default async function Page({ params }: { params: Promise<{ id: string }> }) {
       const { id } = await params;
       // ...
     }
     ```

2. **Tailwind CSS v4 Configuration:**
   - Theme variables are configured in `src/app/globals.css` using `@theme inline`.
   - Palette: `site-bg` (`#FAFAFA`), `ebony` (`#111827`), `bone` (`#FFFFFF`), `amber` (`#D97706`).
   - Fonts: `font-brand` (Manrope), `font-ui` (Inter), `font-mono` (JetBrains Mono).

3. **Data Files Location:**
   - `data/products.json` is the sole source of truth for inventory.
   - `data/categories.json` defines primary category taxonomy.
   - Never write direct database calls; always use helper functions in `src/lib/data.ts`.

4. **Product Object Requirements:**
   - `id`: unique hyphenated slug.
   - `amazonLink`: must use `https://amzn.to/` shortlink.
   - `image`: must point to an asset in `/public/images/` with a 4:5 aspect ratio.
