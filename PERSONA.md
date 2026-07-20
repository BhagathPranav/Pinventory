# Pinventory Brand Persona & Design System

## 🏛️ Brand Essence

**Tagline:** "The Quieter Statement."

Pinventory is an editorial gateway to minimalist menswear and womenswear essentials. Rather than looking like a noisy e-commerce shop, Pinventory presents products with the composure, elegance, and visual restraint of a high-end print architecture magazine or fashion lookbook.

---

## 🎨 Visual Identity & Color Palette

The color system relies on high-contrast monochrome values with subtle warm amber accents to guide conversion:

- **Site Background (`--color-site-bg`):** `#FAFAFA` (Off-white / Warm paper)
- **Ebony (`--color-ebony`):** `#111827` (Deep charcoal/black for typography & borders)
- **Bone (`--color-bone`):** `#FFFFFF` (Pure white for contrast cards)
- **Amber (`--color-amber`):** `#D97706` (Primary action highlight & CTA hover state)

---

## ✒️ Typography System

- **Brand & Headlines (`font-brand`):** `Manrope` (Font-weight 800 / ExtraBold, Uppercase, tight tracking).
- **Body & UI Elements (`font-ui`):** `Inter` (Clean, highly legible sans-serif for descriptions & navigation).
- **Metadata & Prices (`font-mono`):** `JetBrains Mono` (Technical, tabular figures for pricing, section numbers, and tags).

---

## 📐 Layout & Component Rules

1. **Aspect Ratios:** All product images must maintain a uniform **4:5 aspect ratio** (`aspect-[4/5]`) inside cards and detail views to ensure visual harmony.
2. **Borders:** Structural elements, image containers, headers, and footers use crisp 1px solid ebony borders (`border border-ebony`).
3. **Buttons & Action CTAs:**
   - Primary Amazon Affiliate CTA: Full-width, high-contrast block button with `bg-amber`, `font-brand`, `font-[800]`, uppercase label, and arrow indicator (`View on Amazon →`).
   - Secondary Navigation: High-contrast `bg-ebony text-bone` buttons with amber hover states (`hover:bg-amber`).
4. **Numbering:** Editorial grid cards include subtle numbered tags (e.g. `01`, `02`) in `font-mono` at the top-left of image containers to evoke lookbook indices.
