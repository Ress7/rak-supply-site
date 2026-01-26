"use client";
import { CartProvider } from "@/components/cart-context";
import { OrdersProvider } from "@/components/orders-context";
import { SearchProvider } from "@/components/search-context";
import { WishlistProvider } from "@/components/wishlist-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OrdersProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>{children}</SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </OrdersProvider>
  );
}
