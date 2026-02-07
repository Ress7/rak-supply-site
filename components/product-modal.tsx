"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { Product } from "./product-card";
import { Button } from "./ui/button";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWishlist } from "@/components/wishlist-context";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  const SIZE_OPTIONS = [
    "M US7/UK6/EUR40/CM26",
    "M US8/UK7/EUR41/CM26.5",
    "M US9/UK8/EUR42/CM27",
    "M US10/UK9/EUR43/CM27.5",
    "M US11/UK10/EUR44/CM28",
    "M US12/UK11/EUR45/CM28.5",
    "M US13/UK12/EUR46/CM29",
  ];

  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addItem } = useCart();
  const router = useRouter();
  const { addWish } = useWishlist();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-card y2k-border y2k-glow overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image section */}
            <div className="relative aspect-square bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />

              {/* Scanline effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.1) 2px, oklch(0 0 0 / 0.1) 4px)",
                }}
              />

              {/* Price tag */}
              <div className="absolute bottom-4 left-4 px-4 py-2 bg-primary text-primary-foreground font-mono text-2xl">
                ${product.price}
              </div>
            </div>

            {/* Info section */}
            <div className="p-6 md:p-8 flex flex-col">
              <div className="flex-1 space-y-6">
                {/* Header */}
                <div>
                  <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-foreground mb-2"
                  >
                    {product.name}
                  </motion.h2>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-2"
                  >
                    <span className="px-3 py-1 text-sm font-mono bg-secondary text-secondary-foreground">
                      {product.category}
                    </span>
                    <span className="px-3 py-1 text-sm font-mono bg-muted text-muted-foreground">
                      {product.color}
                    </span>
                  </motion.div>
                </div>

                {/* Description */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-sm font-mono text-primary mb-2">
                    {">>> DESCRIPTION"}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </motion.div>

                {/* Size selector */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="space-y-2"
                >
                  <h3 className="text-sm font-mono text-primary mb-2">
                    {">>> SELECT SIZE"}
                  </h3>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-4 py-3 bg-muted text-foreground border border-border font-mono cursor-pointer"
                  >
                    <option value="" disabled>
                      Choose a size
                    </option>
                    {SIZE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <h3 className="text-sm font-mono text-primary mb-2">
                    {">>> FEATURES"}
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground font-mono">
                    <li>+ Bold Y2K Design</li>
                    <li>+ Premium Materials</li>
                    <li>+ Limited Edition</li>
                    <li>+ Free Shipping</li>
                  </ul>
                </motion.div>
              </div>

              {/* Action buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4 mt-6"
              >
                <Button
                  disabled={!selectedSize}
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      size: selectedSize,
                    });
                    toast.success("Added to cart", {
                      description: `${product.name} — ${selectedSize}`,
                    });
                    router.push("/cart");
                  }}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 pixel-corners disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedSize ? `ADD TO CART (${selectedSize})` : "ADD TO CART"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    addWish({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      size: selectedSize || undefined,
                    });
                    toast.success("Added to wishlist", {
                      description: selectedSize
                        ? `${product.name} — ${selectedSize}`
                        : product.name,
                    });
                  }}
                  className="px-6 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  WISHLIST
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
