"use client";
import Image from "next/image";
import { useWishlist } from "@/components/wishlist-context";
import { useCart } from "@/components/cart-context";
import { BackToShop } from "@/components/back-to-shop";
import { toast } from "sonner";

export default function WishlistPage() {
  const { items, removeWish, clearWish } = useWishlist();
  const { addItem } = useCart();

  const addToCart = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const size = item.size || "";
    if (!size) {
      toast("Select size on product page to add to cart.");
      return;
    }
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size,
    });
    toast.success("Added to cart", {
      description: `${item.name} — ${size}`,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <BackToShop className="mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Your Wishlist</h1>
        {items.length === 0 ? (
          <p className="text-muted-foreground font-mono">{">>> No saved items yet"}</p>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={clearWish}
                className="px-4 py-2 bg-muted text-foreground border border-border font-mono cursor-pointer"
              >
                CLEAR WISHLIST
              </button>
            </div>
            {items.map((item, idx) => (
              <div key={`${item.id}-${item.size || ""}-${idx}`} className="flex gap-4 bg-card y2k-border p-4">
                <div className="relative w-24 h-24 bg-muted">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-foreground">{item.name}</h3>
                      <p className="font-mono text-sm text-muted-foreground">
                        {item.size ? `Size: ${item.size}` : "Size: Choose in product"}
                      </p>
                    </div>
                    <div className="font-mono text-secondary">${item.price}</div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => addToCart(item.id)}
                      className="px-3 py-1 bg-primary text-primary-foreground font-mono cursor-pointer"
                    >
                      ADD TO CART
                    </button>
                    <button
                      onClick={() => removeWish(item.id, item.size)}
                      className="px-3 py-1 bg-destructive text-white font-mono cursor-pointer"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
