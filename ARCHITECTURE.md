# Pinventory System Architecture

## 📌 Overview

Pinventory is a lightweight, zero-database affiliate catalog website built with Next.js 16 (App Router). It decouples inventory content management from traditional database infrastructure by utilizing local JSON files as the single source of truth. 

The application serves two distinct user classes:
1. **Human Buyers:** Consumers browsing curated lookbooks and navigating to Amazon via affiliate links.
2. **Pinterest Ingestion Crawlers:** Automated crawlers consuming `/api/catalog` CSV feed every 24 hours to automatically generate Shoppable Pins.

---

## 🏗️ System Architecture Diagram

```mermaid
flowchart TD
    subgraph Data Layer
        PDB[data/products.json]
        CDB[data/categories.json]
    end

    subgraph Business Logic Layer
        LIB[src/lib/data.ts]
    end

    subgraph Next.js App Router
        HOME[src/app/page.tsx]
        CAT[src/app/category/[slug]/page.tsx]
        PROD[src/app/product/[id]/page.tsx]
        API[src/app/api/catalog/route.ts]
    end

    subgraph External Systems
        PINTEREST[Pinterest Shopping Catalogs]
        AMAZON[Amazon Associates Affiliate Program]
    end

    PDB --> LIB
    CDB --> LIB
    LIB --> HOME
    LIB --> CAT
    LIB --> PROD
    LIB --> API

    API -->|Live CSV Feed| PINTEREST
    PROD -->|Outbound Affiliate Links| AMAZON
```

---

## ⚙️ Core Technical Specifications

### 1. Framework & Rendering Strategy
- **Next.js 16 (App Router):** Pre-compiles all product detail and category pages using **Static Site Generation (SSG)** via `generateStaticParams()`.
- **Zero Database Costs:** Inventory is read directly from disk (`fs.readFileSync`), producing 100% static HTML cached at Vercel's Edge CDN.

### 2. Pinterest CSV Feed Spec (`src/app/api/catalog/route.ts`)
The endpoint outputs a standard `text/csv` stream configured for Pinterest Catalog Ingestion.

| Header Column | Source Property | Transformation / Example |
|---|---|---|
| `id` | `product.id` | `premium-minimalist-shirt` |
| `title` | `product.name` | `Premium Minimalist Casual Shirt` |
| `description` | `product.name` | Escaped string |
| `link` | `https://pinventory-5hr5.vercel.app/product/${product.id}` | Absolute detail URL |
| `image_link` | `https://pinventory-5hr5.vercel.app${product.image}` | Absolute asset URL |
| `price` | `product.price` | Numerical extraction + currency (`2499 INR`) |
| `availability` | Constant | `in stock` |
| `condition` | Constant | `new` |

### 3. Cross-Selling Relational Graph
Each product entity in `data/products.json` contains a `relatedItems` array referencing other product IDs:
```json
"relatedItems": [
  {
    "id": "rare-rabbit-baggy-trouser",
    "relationship": "Pairs perfectly with",
    "type": "pants"
  }
]
```
The product page looks up these IDs in O(N) time at build time to render recommendation sections.

---

## 🔒 Security & Domain Verification
- **Pinterest Domain Verification:** Verified via custom `<meta name="p:domain_verify" content="2b35d9cc56f50526ac82aa5aec6d6e44" />` injected in `src/app/layout.tsx`.
