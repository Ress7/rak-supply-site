"use client";

import { motion } from "framer-motion";

interface MarqueeTickerProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
}

export function MarqueeTicker({
  items,
  speed = 20,
  direction = "left",
}: MarqueeTickerProps) {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden bg-primary py-3">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="text-primary-foreground font-mono text-sm tracking-wider flex items-center gap-4"
          >
            <span>{item}</span>
            <span className="text-secondary">///</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
