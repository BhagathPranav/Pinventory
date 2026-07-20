'use client';

import { useWishlist } from '@/context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_BLUR_DATA_URL } from '@/lib/imageUtils';

interface Product {
  id: string;
  name: string;
  price: string;
  amazonLink: string;
  image: string;
  section: string;
  category: string;
}

interface WishlistDrawerProps {
  allProducts: Product[];
}

export default function WishlistDrawer({ allProducts }: WishlistDrawerProps) {
  const { isDrawerOpen, closeDrawer, wishlistIds, toggleWishlist, clearWishlist } = useWishlist();

  const savedProducts = allProducts.filter((product) => wishlistIds.includes(product.id));

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-ebony z-40"
          />

          {/* SLIDE-OUT DRAWER */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-site-bg border-l border-ebony z-50 flex flex-col justify-between shadow-2xl"
          >
            {/* DRAWER HEADER */}
            <div className="p-6 md:p-8 border-b border-ebony flex justify-between items-center bg-ebony text-site-bg">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-site-bg/70 mb-1">
                  Saved Looks
                </div>
                <h2 className="font-brand text-2xl font-[800] uppercase tracking-tight">
                  Your Lookbook ({savedProducts.length})
                </h2>
              </div>
              <button
                onClick={closeDrawer}
                className="w-10 h-10 flex items-center justify-center border border-site-bg/30 text-site-bg hover:bg-amber hover:text-ebony transition-colors font-mono text-sm focus:outline-none"
                aria-label="Close Wishlist"
              >
                ✕
              </button>
            </div>

            {/* DRAWER ITEMS LIST */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">
              {savedProducts.length > 0 ? (
                savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-4 border border-ebony bg-bone relative group"
                  >
                    <div className="relative aspect-[4/5] w-24 border border-ebony overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        placeholder="blur"
                        blurDataURL={DEFAULT_BLUR_DATA_URL}
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    <div className="flex flex-col justify-between flex-1 pr-6">
                      <div>
                        <div className="font-mono text-[10px] text-ebony/60 uppercase mb-1">
                          {product.section} &bull; {product.category}
                        </div>
                        <Link
                          href={`/product/${product.id}`}
                          onClick={closeDrawer}
                          className="font-brand text-sm font-[800] uppercase text-ebony hover:text-amber line-clamp-2 leading-tight transition-colors"
                        >
                          {product.name}
                        </Link>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="font-mono text-sm font-semibold">{product.price}</span>
                        <a
                          href={product.amazonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-amber text-ebony px-3 py-1.5 font-brand text-xs font-[800] uppercase hover:bg-ebony hover:text-bone transition-colors"
                        >
                          Amazon &rarr;
                        </a>
                      </div>
                    </div>

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 text-ebony/40 hover:text-red-600 font-mono text-xs"
                      title="Remove from saved looks"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-center py-16">
                  <div className="text-4xl mb-4">🖤</div>
                  <h3 className="font-brand text-xl font-[800] uppercase mb-2">Your Lookbook is Empty</h3>
                  <p className="font-ui text-sm text-ebony/70 max-w-xs mb-6 leading-relaxed">
                    Save your favorite essentials as you browse to curating your minimalist wardrobe.
                  </p>
                  <button
                    onClick={closeDrawer}
                    className="bg-ebony text-bone px-6 py-3 font-brand text-xs uppercase tracking-wider hover:bg-amber hover:text-ebony transition-colors"
                  >
                    Explore Collections
                  </button>
                </div>
              )}
            </div>

            {/* DRAWER FOOTER */}
            {savedProducts.length > 0 && (
              <div className="p-6 border-t border-ebony bg-ebony/5 flex items-center justify-between">
                <button
                  onClick={clearWishlist}
                  className="font-mono text-xs uppercase text-ebony/60 hover:text-red-600 underline"
                >
                  Clear Lookbook
                </button>
                <button
                  onClick={closeDrawer}
                  className="bg-ebony text-bone px-6 py-3 font-brand text-xs uppercase tracking-wider hover:bg-amber hover:text-ebony transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
