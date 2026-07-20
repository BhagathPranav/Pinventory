---
name: pinventory-workflow
description: Standard operating procedures for inventory hydration, Pinterest feed verification, and feature development on Pinventory.
---

# Pinventory Developer Skill & SOP

This skill outlines the step-by-step workflow for managing inventory, verifying Pinterest feed outputs, and maintaining the Next.js 16 codebase.

## 📦 Workflow 1: Hydrating New Inventory (Product Addition)

To add a new product to Pinventory, follow this exact 4-step sequence:

### Step 1: Asset Preparation
1. Obtain high-resolution editorial product photography.
2. Save the image file in `/public/images/` using lower-case hyphenated naming (e.g., `/public/images/linen-overshirt.jpg`).
3. Ensure image aspect ratio matches the standard 4:5 editorial display format.

### Step 2: Link Sourcing
1. Generate an Amazon Associates shortlink (`https://amzn.to/...`) for the item.

### Step 3: Data Hydration (`data/products.json`)
Append the new product entry to `/data/products.json`:
```json
{
  "id": "linen-overshirt-olive",
  "name": "Relaxed Fit Linen Overshirt in Olive",
  "price": "₹2,899",
  "amazonLink": "https://amzn.to/example",
  "image": "/images/linen-overshirt.jpg",
  "section": "men",
  "category": "tops",
  "relatedItems": [
    {
      "id": "rare-rabbit-baggy-trouser",
      "relationship": "Pairs perfectly with",
      "type": "pants"
    }
  ]
}
```

### Step 4: Reciprocal Cross-Selling
Edit the related product (e.g., `rare-rabbit-baggy-trouser`) to append a reciprocal relation link back to `linen-overshirt-olive`.

---

## 🔍 Workflow 2: Verifying the Pinterest Catalog Feed

Whenever product fields or images are modified:
1. Start the local server: `npm run dev`.
2. Fetch `/api/catalog` or open `http://localhost:3000/api/catalog`.
3. Verify that the generated CSV contains:
   - Valid header: `id,title,description,link,image_link,price,availability,condition`
   - Price formatted with currency code (e.g., `2899 INR`).
   - Absolute live URLs (`https://pinventory-5hr5.vercel.app/...`).

---

## 💅 Workflow 3: UI & Design Tokens Verification

When modifying page layouts or components:
- Ensure all custom styling uses Tailwind v4 theme variables defined in `src/app/globals.css`.
- Colors: `bg-site-bg`, `bg-ebony`, `bg-amber`, `bg-bone`.
- Typography: `font-brand` (Headlines), `font-ui` (UI/Body), `font-mono` (Labels).
- Always test responsive layouts across `sm` (640px), `md` (768px), and `lg` (1024px+).
