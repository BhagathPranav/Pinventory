'use client';

import { useWishlist } from '@/context/WishlistContext';

interface ProductActionsProps {
  productId: string;
  amazonLink: string;
  pinUrl: string;
}

export default function ProductActions({ productId, amazonLink, pinUrl }: ProductActionsProps) {
  const { isWishlisted, toggleWishlist, openDrawer } = useWishlist();
  const saved = isWishlisted(productId);

  return (
    <div className="flex flex-col gap-4 w-full">
      <a 
        href={amazonLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-amber text-ebony text-center px-8 py-5 font-brand text-xl font-[800] uppercase tracking-wide hover:bg-ebony hover:text-bone transition-colors focus-visible:outline-none w-full border border-ebony"
      >
        View on Amazon &rarr;
      </a>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => {
            toggleWishlist(productId);
            if (!saved) openDrawer();
          }}
          className={`px-6 py-4 font-brand text-sm font-[800] uppercase tracking-wide transition-colors border border-ebony flex items-center justify-center gap-2 ${
            saved
              ? 'bg-ebony text-bone hover:bg-amber hover:text-ebony'
              : 'bg-site-bg text-ebony hover:bg-ebony hover:text-bone'
          }`}
        >
          <svg
            className={`w-4 h-4 ${saved ? 'fill-bone' : 'fill-none stroke-current'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {saved ? 'Saved in Lookbook' : 'Save to Lookbook'}
        </button>

        <a 
          href={pinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-site-bg text-ebony text-center px-6 py-4 font-brand text-sm font-[800] uppercase tracking-wide hover:bg-ebony hover:text-bone transition-colors focus-visible:outline-none border border-ebony flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 fill-current text-[#E60023]" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
          </svg>
          Pin on Pinterest
        </a>
      </div>
    </div>
  );
}
