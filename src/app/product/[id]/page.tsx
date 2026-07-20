import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductById } from "@/lib/data";
import { DEFAULT_BLUR_DATA_URL } from "@/lib/imageUtils";
import ProductActions from "./ProductActions";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const productsData = getAllProducts();
  return productsData.map((product: any) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const title = `${product.name} | Pinventory`;
  const description = `Shop the ${product.name} at Pinventory. A curated selection of minimalist menswear essentials.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productsData = getAllProducts();
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  // Find related products
  const relatedProducts = (product.relatedItems || [])
    .map((relatedItem: any) => {
      const item = productsData.find((p: any) => p.id === relatedItem.id);
      if (item) {
        return { ...item, relationship: relatedItem.relationship };
      }
      return null;
    })
    .filter((item: any) => item !== null);

  const numericPrice = product.price.replace(/[^0-9.]/g, '');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [`https://pinventory-5hr5.vercel.app${product.image}`],
    description: `Shop ${product.name} on Pinventory. Curated minimalist apparel.`,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: `https://pinventory-5hr5.vercel.app/product/${product.id}`,
      priceCurrency: 'INR',
      price: numericPrice,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
    `https://pinventory-5hr5.vercel.app/product/${product.id}`
  )}&media=${encodeURIComponent(
    `https://pinventory-5hr5.vercel.app${product.image}`
  )}&description=${encodeURIComponent(
    `Shop ${product.name} (${product.price}) on Pinventory.`
  )}`;

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* PRODUCT TOP SECTION */}
      <section className="px-6 py-12 md:px-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div className="relative aspect-[4/5] w-full border border-ebony overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            priority
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        
        <div className="flex flex-col max-w-xl sticky top-12">
          <div className="font-mono text-xs tracking-widest uppercase mb-6 text-ebony/70">
            {product.category} &bull; {product.section}
          </div>
          <h1 className="font-brand text-4xl md:text-6xl font-[800] tracking-tight uppercase mb-6">
            {product.name}
          </h1>
          <div className="font-mono text-2xl mb-12">
            {product.price}
          </div>
          
          <p className="font-ui text-lg text-ebony/80 leading-relaxed mb-12">
            An essential piece for the minimalist wardrobe. The {product.name.toLowerCase()} offers unmatched versatility, premium construction, and a timeless silhouette. Carefully selected to elevate your daily uniform.
          </p>

          <ProductActions 
            productId={product.id}
            amazonLink={product.amazonLink}
            pinUrl={pinUrl}
          />
          
          <div className="mt-8 p-4 border border-ebony/20 bg-ebony/5 flex flex-col gap-1.5 font-ui text-xs text-ebony/80">
            <div className="font-mono text-ebony font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span>✓ Official Amazon Associate Link</span>
            </div>
            <div className="text-ebony/60">Dispatched & fulfilled directly via Amazon with standard buyer protection.</div>
          </div>
        </div>
      </section>

      {/* PAIRS PERFECTLY WITH SECTION */}
      {relatedProducts.length > 0 && (
        <section className="px-6 py-24 md:px-12 border-t border-ebony">
          <div className="mb-16">
            <h2 className="font-brand text-3xl md:text-4xl font-[800] tracking-tight uppercase">
              Pairs Perfectly With.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {relatedProducts.map((relatedItem: any, idx: number) => (
              <Link 
                key={relatedItem.id} 
                href={`/product/${relatedItem.id}`}
                className="group flex flex-col focus-visible:outline-none"
              >
                <div className="font-ui text-sm mb-4 font-medium italic text-ebony/80">
                  {relatedItem.relationship}
                </div>
                <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden border border-ebony">
                  <Image 
                    src={relatedItem.image} 
                    alt={relatedItem.name} 
                    fill 
                    placeholder="blur"
                    blurDataURL={DEFAULT_BLUR_DATA_URL}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-4 left-4 bg-site-bg border border-ebony px-2 py-1 font-mono text-xs z-10">
                    0{idx + 1}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 group-hover:text-amber transition-colors">
                  <div className="flex justify-between items-start font-ui text-sm uppercase tracking-wide font-medium">
                    <h3 className="truncate pr-4">{relatedItem.name}</h3>
                    <span className="font-mono">{relatedItem.price}</span>
                  </div>
                  <div className="font-mono text-xs text-ebony/60 uppercase">
                    {relatedItem.category}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
