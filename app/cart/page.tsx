"use client";
import { useCart } from "@/components/cart-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BackToShop } from "@/components/back-to-shop";

export default function CartPage() {
  const { items, addItem, removeItem, clearCart } = useCart();
  const router = useRouter();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const inc = (id: string, size: string) => {
    const target = items.find((i) => i.id === id && i.size === size);
    if (target) {
      addItem({
        id: target.id,
        name: target.name,
        price: target.price,
        image: target.image,
        size: target.size,
      });
    }
  };

  const dec = (id: string, size: string) => {
    const target = items.find((i) => i.id === id && i.size === size);
    if (target) {
      if (target.quantity <= 1) {
        removeItem(id, size);
      } else {
        // emulate decrement by removing one then adding remaining
        removeItem(id, size);
        for (let k = 0; k < target.quantity - 1; k++) {
          addItem({
            id: target.id,
            name: target.name,
            price: target.price,
            image: target.image,
            size: target.size,
          });
        }
      }
    }
  };

  const checkout = async () => {
    if (items.length === 0) {
      toast("Your cart is empty.");
      return;
    }
    toast("Checkout is currently disabled.");
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <BackToShop className="mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Your Cart</h1>
        {items.length === 0 ? (
          <p className="text-muted-foreground font-mono">{">>> No items yet"}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((item, idx) => (
                <div key={`${item.id}-${item.size}-${idx}`} className="flex gap-4 bg-card y2k-border p-4">
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
                        <p className="font-mono text-sm text-muted-foreground">Size: {item.size}</p>
                      </div>
                      <div className="font-mono text-secondary">${item.price}</div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => dec(item.id, item.size)}
                        className="px-3 py-1 bg-muted text-foreground border border-border font-mono cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono">{item.quantity}</span>
                      <button
                        onClick={() => inc(item.id, item.size)}
                        className="px-3 py-1 bg-muted text-foreground border border-border font-mono cursor-pointer"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="ml-auto px-3 py-1 bg-destructive text-white font-mono cursor-pointer"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 bg-card y2k-border p-4 h-fit">
              <h2 className="font-bold text-lg">Summary</h2>
              <div className="flex justify-between font-mono">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-mono text-primary">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={checkout}
                className="w-full px-4 py-3 bg-muted text-muted-foreground font-mono cursor-not-allowed"
              >
                CHECKOUT DISABLED
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
