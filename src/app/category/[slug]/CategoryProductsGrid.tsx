'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_BLUR_DATA_URL } from '@/lib/imageUtils';
import { StaggerContainer, StaggerItem } from '@/lib/animations';
import { useWishlist } from '@/context/WishlistContext';

interface Product {
  id: string;
  name: string;
  price: string;
  amazonLink: string;
  image: string;
  section: string;
  category: string;
}

interface CategoryProductsGridProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 12;

export default function CategoryProductsGrid({ products }: CategoryProductsGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Read page and sort from URL search params
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const sortBy = (searchParams.get('sort') || 'featured') as 'featured' | 'price-asc' | 'price-desc';

  const getNumericPrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return getNumericPrice(a.price) - getNumericPrice(b.price);
    }
    if (sortBy === 'price-desc') {
      return getNumericPrice(b.price) - getNumericPrice(a.price);
    }
    return 0; // default order
  });

  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Helper to update URL search parameters cleanly
  const updateUrlParams = (newParams: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSort: string) => {
    updateUrlParams({ sort: newSort, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateUrlParams({ page: newPage });
    }
  };

  return (
    <div className="flex flex-col gap-12">
      {/* FILTER & SORT HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-ebony/20">
        <div className="font-mono text-xs text-ebony/70 uppercase tracking-widest">
          {totalItems > 0 ? (
            <>Showing {startIndex + 1}–{endIndex} of {totalItems} items</>
          ) : (
            <>0 items found</>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="font-mono text-xs uppercase tracking-wider text-ebony/70">
            Sort By:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-site-bg border border-ebony px-3 py-1.5 font-mono text-xs uppercase text-ebony focus:outline-none focus:border-amber cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* PAGINATED PRODUCT GRID WITH STAGGER ANIMATION */}
      {paginatedProducts.length > 0 ? (
        <StaggerContainer key={`${currentPage}-${sortBy}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {paginatedProducts.map((product, idx) => (
            <StaggerItem key={product.id}>
              <Link 
                href={`/product/${product.id}`}
                className="group flex flex-col focus-visible:outline-none"
              >
                <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden border border-ebony">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    placeholder="blur"
                    blurDataURL={DEFAULT_BLUR_DATA_URL}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-4 left-4 bg-site-bg border border-ebony px-2 py-1 font-mono text-xs z-10 text-ebony">
                    {String(startIndex + idx + 1).padStart(2, '0')}
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-4 right-4 bg-site-bg border border-ebony p-1.5 z-20 text-ebony hover:bg-amber transition-colors"
                    aria-label="Save to Wishlist"
                  >
                    <svg
                      className={`w-4 h-4 transition-colors ${isWishlisted(product.id) ? 'fill-ebony text-ebony' : 'fill-none stroke-current'}`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-col gap-2 group-hover:text-amber transition-colors">
                  <div className="flex justify-between items-start font-ui text-sm uppercase tracking-wide font-medium">
                    <h3 className="truncate pr-4">{product.name}</h3>
                    <span className="font-mono">{product.price}</span>
                  </div>
                  <div className="font-mono text-xs text-ebony/60 uppercase">
                    {product.category}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="py-12 text-center font-ui text-ebony/80 text-lg">
          Curated essentials for this section are arriving soon.
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-ebony">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-ebony text-bone disabled:opacity-30 disabled:cursor-not-allowed px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-amber hover:text-ebony transition-colors border border-ebony"
          >
            &larr; Previous
          </button>

          <div className="flex items-center gap-2 font-mono text-xs">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 flex items-center justify-center border border-ebony font-mono transition-colors ${
                  pageNum === currentPage
                    ? 'bg-ebony text-bone font-bold'
                    : 'bg-site-bg text-ebony hover:bg-amber'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-ebony text-bone disabled:opacity-30 disabled:cursor-not-allowed px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-amber hover:text-ebony transition-colors border border-ebony"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
