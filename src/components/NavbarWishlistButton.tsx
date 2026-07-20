'use client';

import { useWishlist } from '@/context/WishlistContext';

export default function NavbarWishlistButton() {
  const { openDrawer, wishlistCount } = useWishlist();

  return (
    <button
      onClick={openDrawer}
      className="flex items-center gap-2 border border-ebony px-3 py-1.5 font-mono text-xs uppercase text-ebony hover:bg-ebony hover:text-bone transition-colors focus-visible:outline-none"
      aria-label="Open Saved Lookbook"
    >
      <svg
        className={`w-4 h-4 transition-colors ${wishlistCount > 0 ? 'fill-ebony group-hover:fill-bone' : 'fill-none stroke-current'}`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span>Saved ({wishlistCount})</span>
    </button>
  );
}
