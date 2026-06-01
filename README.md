# 🛒 Pinventory

> A high-performance, statically generated affiliate commerce platform built with Next.js, designed for seamless aesthetic discovery and outbound conversions.

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Site-success?style=for-the-badge)](https://pinventory-rho.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

**🌐 Live Production Site:** [pinventory-rho.vercel.app](https://pinventory-rho.vercel.app)

## 📌 Overview

Pinventory is a custom-built, minimalist editorial catalog designed to bridge the gap between social media discovery (Pinterest) and e-commerce purchasing (Amazon Associates). 

**The Engineering Challenge:** Traditional CMS or database-heavy architectures (like WordPress or Shopify) introduce unnecessary latency, complexity, and hosting costs for a pure affiliate routing site. 

**The Solution:** Pinventory utilizes a lightweight, serverless Next.js architecture with a local JSON data layer. This enables **0ms database query latency**, 100% static generation for flawless SEO, and zero running costs while maintaining a premium, dynamic user experience.

## 🚀 Technical Architecture

* **The "Invisible Backend" (Local JSON):** Inventory, pricing, category mapping, and affiliate routing are managed entirely via a strictly typed `products.json` file. Next.js dynamically generates the category and product routes based on this payload at build time.
* **Component-Driven UI:** Built utilizing standard React composition patterns, leveraging Tailwind CSS for a fully responsive, mobile-first design.
* **Image Optimization:** Utilizes the Next.js `<Image>` component coupled with strict CSS aspect-ratio enforcement (`aspect-[4/5]`) to ensure all unpredictable third-party product photos render uniformly in a high-end, magazine-style grid.

## ✨ Core Features

* **Dynamic Content Routing:** Fully dynamic category pages (`/category/[slug]`) that filter inventory on the fly with graceful handling of empty states.
* **Cross-Selling Engine:** A built-in relational data model utilizing `relatedItems` arrays to automatically populate "Complete the Look" suggestions, increasing average session duration.
* **Editorial UI/UX:** A distraction-free layout utilizing custom typography (Inter, Manrope, JetBrains Mono) and deliberate whitespace to mimic high-end fashion editorials.
* **Frictionless Affiliate Routing:** Strategic CTA placements directly connected to localized `amzn.to` tracking shortlinks.

## 💻 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript / JavaScript
* **Styling:** Tailwind CSS
* **Data Management:** Local JSON API
* **Deployment & CI/CD:** Vercel + GitHub Integration

## ⚙️ The CI/CD Publication Engine

Adding new inventory to the live production site takes less than 60 seconds through a streamlined developer workflow:

1. **Asset Prep:** Drop optimized product images into `/public/images/`.
2. **Hydrate:** Append the new JSON object (with tracking links) to `/data/products.json`.
3. **Deploy:** Execute `git push`. Vercel intercepts the webhook, statically rebuilds the affected routes, and deploys globally to the Edge Network instantly.

## 🛠️ Local Development

To run this project locally and explore the architecture:

```bash
# Clone the repository
git clone [https://github.com/BhagathPranav/Pinventory.git](https://github.com/BhagathPranav/Pinventory.git)

# Navigate to the project directory
cd Pinventory

# Install dependencies
npm install

# Run the development server
npm run dev
