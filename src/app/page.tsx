import Image from "next/image";
import Link from "next/link";
import { DEFAULT_BLUR_DATA_URL } from "@/lib/imageUtils";
import { FadeIn } from "@/lib/animations";

export default async function Home() {

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="px-6 py-12 md:px-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <FadeIn className="flex flex-col items-start max-w-xl">
          <div className="font-mono text-xs tracking-widest uppercase mb-8 text-ebony/70">
            VOL. 01 &bull; SPRING CORE
          </div>
          <h1 className="font-brand text-5xl md:text-7xl font-[800] tracking-tight leading-[1.05] uppercase mb-8">
            The Quieter <br /> Statement.
          </h1>
          <p className="font-ui text-lg text-ebony/80 leading-relaxed mb-12">
            A curated selection of minimalist essentials for men and women. Designed for longevity, sourced for quality, and compiled for the modern aesthetic.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/category/men" 
              className="bg-ebony text-bone px-8 py-4 font-ui text-sm uppercase tracking-wider hover:bg-amber transition-colors focus-visible:outline-none"
            >
              Shop Men &rarr;
            </Link>
            <Link 
              href="/category/women" 
              className="bg-ebony text-bone px-8 py-4 font-ui text-sm uppercase tracking-wider hover:bg-amber transition-colors focus-visible:outline-none"
            >
              Shop Women &rarr;
            </Link>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2} className="relative aspect-square md:aspect-[4/5] w-full border border-ebony overflow-hidden group">
          <Image 
            src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=1200&auto=format&fit=crop" 
            alt="Editorial Cover" 
            fill 
            priority
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </FadeIn>
      </section>




    </div>
  );
}
