"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
}

interface WishlistContextValue {
  items: WishlistItem[];
  addWish: (item: WishlistItem) => void;
  removeWish: (id: string, size?: string) => void;
  clearWish: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("raks_wishlist");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("raks_wishlist", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addWish = (item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find(
        (i) => i.id === item.id && (i.size || "") === (item.size || "")
      );
      if (exists) return prev;
      return [item, ...prev];
    });
  };

  const removeWish = (id: string, size?: string) => {
    setItems((prev) =>
      prev.filter((i) => i.id !== id || ((i.size || "") !== (size || "")))
    );
  };

  const clearWish = () => setItems([]);

  const value = useMemo(
    () => ({ items, addWish, removeWish, clearWish }),
    [items]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
