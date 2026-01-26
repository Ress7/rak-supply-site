"use client";
import { useOrders, type OrderStatus } from "@/components/orders-context";
import Link from "next/link";

const REVIEW_URL =
  process.env.NEXT_PUBLIC_REVIEW_FORM_URL ||
  "https://docs.google.com/forms/";

export default function AccountPage() {
  const { orders, updateStatus } = useOrders();

  const statusColor = (s: OrderStatus) =>
    s === "DELIVERED"
      ? "text-green-600"
      : s === "SHIPPED"
      ? "text-primary"
      : "text-muted-foreground";

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex justify-end mb-6">
          <Link
            href="/"
            className="px-4 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-mono cursor-pointer"
          >
            BACK TO HOME
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Your Account</h1>
        <p className="text-muted-foreground font-mono mb-8">
          {">>> View past orders, status, and leave a review"}
        </p>

        {orders.length === 0 ? (
          <div className="bg-card y2k-border p-6">
            <p className="text-muted-foreground font-mono">
              {">>> No orders yet. Start in the "}
              <Link href="/" className="text-primary underline">
                shop
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((o) => (
              <div key={o.id} className="bg-card y2k-border p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg">Order #{o.id}</h2>
                    <p className={`font-mono ${statusColor(o.status)}`}>
                      Status: {o.status}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      Placed: {new Date(o.placedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(o.id, "SHIPPED")}
                      className="px-3 py-2 bg-muted text-foreground border border-border font-mono cursor-pointer"
                    >
                      MARK SHIPPED
                    </button>
                    <button
                      onClick={() => updateStatus(o.id, "DELIVERED")}
                      className="px-3 py-2 bg-primary text-primary-foreground font-mono cursor-pointer"
                    >
                      MARK DELIVERED
                    </button>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {o.items.map((i, idx) => (
                    <div key={`${i.id}-${i.size}-${idx}`} className="flex justify-between font-mono">
                      <span>
                        {i.name} — {i.size} × {i.quantity}
                      </span>
                      <span>${(i.price * i.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-mono text-primary">
                    Total: ${o.total.toFixed(2)}
                  </span>
                  <Link
                    href={REVIEW_URL}
                    target="_blank"
                    className="px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-mono cursor-pointer"
                  >
                    LEAVE A REVIEW
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
