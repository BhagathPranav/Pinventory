import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts, getAllCategories } from "@/lib/data";
import CategoryProductsGrid from "./CategoryProductsGrid";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categoriesData = getAllCategories();
  const categories = categoriesData.map((cat: any) => ({ slug: cat.slug }));
  return [...categories, { slug: "men" }, { slug: "women" }];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoriesData = getAllCategories();
  const matchedCategory = categoriesData.find(
    (c: any) => c.slug.toLowerCase() === slug.toLowerCase()
  );

  const title = matchedCategory ? `${matchedCategory.name} | Pinventory` : `${slug.toUpperCase()} | Pinventory`;
  const description = matchedCategory
    ? matchedCategory.description
    : `Explore the curated ${slug} selection at Pinventory. Minimalist fashion essentials.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://pinventory-5hr5.vercel.app/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const productsData = getAllProducts();
  const categoriesData = getAllCategories();

  const matchedCategory = categoriesData.find(
    (c: any) => c.slug.toLowerCase() === slug.toLowerCase()
  );
  
  const title = matchedCategory ? matchedCategory.name.toUpperCase() : slug.toUpperCase();
  const description = matchedCategory 
    ? matchedCategory.description 
    : "All curated essentials for this section.";

  const filteredProducts = productsData.filter((product: any) => {
    const matchSection = product.section && product.section.toLowerCase() === slug.toLowerCase();
    const matchCategory = product.category && product.category.toLowerCase() === slug.toLowerCase();
    return matchSection || matchCategory;
  });

  return (
    <div className="flex flex-col">
      {/* CATEGORY HEADER */}
      <section className="px-6 py-16 md:px-12 md:py-24 border-b border-ebony bg-ebony text-site-bg">
        <div className="max-w-3xl">
          <div className="font-mono text-xs tracking-widest uppercase mb-6 opacity-70">
            Category &bull; 01
          </div>
          <h1 className="font-brand text-5xl md:text-7xl font-[800] tracking-tight uppercase mb-6">
            {title}.
          </h1>
          <p className="font-ui text-lg opacity-80 leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* PRODUCT GRID & SORTING */}
      <section className="px-6 py-16 md:px-12">
        <Suspense fallback={
          <div className="py-24 text-center font-mono text-xs uppercase text-ebony/60 tracking-widest">
            Loading collection...
          </div>
        }>
          <CategoryProductsGrid products={filteredProducts} />
        </Suspense>
      </section>
    </div>
  );
}
