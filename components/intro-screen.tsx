"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroScreenProps {
  onEnter: () => void;
}

export function IntroScreen({ onEnter }: IntroScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowEnter(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden scanlines"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.55 0.25 25 / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.55 0.25 25 / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "float 20s linear infinite",
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
        style={{ background: "oklch(0.55 0.25 25)" }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full blur-3xl opacity-20"
        style={{ background: "oklch(0.75 0.15 60)" }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 60, -80, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`text-center ${glitchActive ? "glitch-text" : ""}`}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter chrome-text">
            Rak
          </h1>
          <motion.span
            className="text-2xl md:text-4xl font-mono tracking-widest text-primary"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Supply
          </motion.span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-center font-mono text-sm md:text-base tracking-wider"
        >
          {">>> LOADING FUTURE FOOTWEAR <<<"}
        </motion.p>

        {/* Loading bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-64 md:w-80 h-2 bg-muted y2k-border relative overflow-hidden"
        >
          <motion.div
            className="h-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.55 0.25 25), oklch(0.75 0.15 60), oklch(0.45 0.22 20))",
              width: `${Math.min(loadingProgress, 100)}%`,
            }}
            transition={{ duration: 0.1 }}
          />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 8px, oklch(0 0 0 / 0.3) 8px, oklch(0 0 0 / 0.3) 16px)",
            }}
          />
        </motion.div>

        {/* Loading percentage */}
        <motion.div
          className="font-mono text-xl md:text-2xl text-primary"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {Math.min(Math.floor(loadingProgress), 100)}%
        </motion.div>

        {/* Enter button */}
        <AnimatePresence>
          {showEnter && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
              className="relative px-12 py-4 text-xl md:text-2xl font-bold tracking-wider bg-primary text-primary-foreground y2k-glow pixel-corners cursor-pointer group overflow-hidden"
              style={{ animation: "pulse-glow 2s infinite" }}
            >
              <span className="relative z-10">ENTER SITE</span>
              <motion.div
                className="absolute inset-0 bg-secondary"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-4 text-muted-foreground font-mono text-xs"
        >
          <span>EST. 2000</span>
          <span>|</span>
          <span>RARE KICKS</span>
          <span>|</span>
          <span>Y2K VIBES</span>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary opacity-50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary opacity-50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary opacity-50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary opacity-50" />
    </motion.div>
  );
}
