"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, oklch(0.55 0.25 25 / 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, oklch(0.75 0.15 60 / 0.4) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, oklch(0.45 0.22 20 / 0.3) 0%, transparent 50%)
            `,
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.55 0.25 25 / 0.2) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.55 0.25 25 / 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 border-2 border-primary/30 rotate-45"
        animate={{ rotate: [45, 90, 45], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-24 h-24 border-2 border-secondary/30"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary"
        animate={{ y: [0, -20, 0], opacity: [1, 0.5, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-secondary"
        animate={{ y: [0, 20, 0], opacity: [1, 0.5, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block px-4 py-1 mb-6 text-sm font-mono text-secondary bg-secondary/10 border border-secondary"
          >
            NEW COLLECTION 2025
          </motion.div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6">
            <span className="chrome-text">STEP INTO</span>
            <br />
            <motion.span
              className="text-primary inline-block"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              THE FUTURE
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Rare kicks. Bold style. 2,500+ rare kicks in rotation.
            <br />
            <span className="font-mono text-sm text-primary">
              {">>> LIVE INVENTORY FROM OUR VAULT <<<"}
            </span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#products"
              className="px-8 py-4 bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors y2k-glow pixel-corners"
            >
              SHOP NOW
            </a>
            <a
              href="#about"
              className="px-8 py-4 border-2 border-foreground text-foreground font-bold text-lg hover:bg-foreground hover:text-background transition-colors"
            >
              LEARN MORE
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-8 md:gap-16 mt-16 font-mono text-sm"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                2500+
              </div>
              <div className="text-muted-foreground">RARE KICKS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary">
                2000
              </div>
              <div className="text-muted-foreground">Y2K VIBES</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">
                24/7
              </div>
              <div className="text-muted-foreground">LIVE SYNC</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a
          href="#products"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs font-mono">SCROLL</span>
          <ChevronDown size={24} />
        </a>
      </motion.div>
    </section>
  );
}
