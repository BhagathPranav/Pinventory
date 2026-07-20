'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  wishlistCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'pinventory_wishlist_ids';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setWishlistIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load wishlist from localStorage:', e);
    }
  }, []);

  const saveToStorage = (ids: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage:', e);
    }
  };

  const toggleWishlist = (id: string) => {
    const isAlreadySaved = wishlistIds.includes(id);
    const updated = isAlreadySaved
      ? wishlistIds.filter((item) => item !== id)
      : [...wishlistIds, id];

    setWishlistIds(updated);
    saveToStorage(updated);

    if (isAlreadySaved) {
      showToast('Item removed from Lookbook', 'info');
    } else {
      showToast('Item saved to your Lookbook 🖤', 'success');
    }
  };

  const isWishlisted = (id: string) => wishlistIds.includes(id);

  const clearWishlist = () => {
    setWishlistIds([]);
    saveToStorage([]);
    showToast('Lookbook cleared', 'info');
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds: isMounted ? wishlistIds : [],
        toggleWishlist,
        isWishlisted,
        wishlistCount: isMounted ? wishlistIds.length : 0,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
