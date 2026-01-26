"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  size: string;
  color: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: () => void;
}

export function ProductCard({ product, index, onClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      <div className="relative bg-card y2k-border overflow-hidden">
        {/* Product image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end p-4"
          >
            <span className="font-mono text-sm text-primary">
              {">>> VIEW DETAILS"}
            </span>
          </motion.div>

          {/* Glitch effect on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.3 : 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.55 0.25 25 / 0.1) 2px, oklch(0.55 0.25 25 / 0.1) 4px)",
            }}
          />
        </div>

        {/* Product info */}
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-foreground line-clamp-1 flex-1">
              {product.name}
            </h3>
            <span className="font-mono text-secondary text-lg ml-2">
              ${product.price}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-0.5 text-xs font-mono bg-muted text-muted-foreground">
              {product.category}
            </span>
            <span className="px-2 py-0.5 text-xs font-mono bg-muted text-muted-foreground">
              {product.color}
            </span>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-primary border-l-[40px] border-l-transparent" />
      </div>

      {/* Glow effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute -inset-1 -z-10 blur-xl"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.25 25 / 0.3), oklch(0.75 0.15 60 / 0.2))",
        }}
      />
    </motion.div>
  );
}
