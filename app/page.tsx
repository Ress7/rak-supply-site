"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IntroScreen } from "@/components/intro-screen";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { MarqueeTicker } from "@/components/marquee-ticker";
import { CustomCursor } from "@/components/custom-cursor";

const tickerItems = [
  "RAK.2K - STEP INTO THE FUTURE",
  "FREE SHIPPING WORLDWIDE",
  "LIVE GOOGLE SHEETS SYNC",
  "Y2K ENERGY",
  "AUTHENTIC KICKS ONLY",
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("raks_intro_seen");
      if (seen === "1") {
        setShowIntro(false);
      }
    } catch {}
  }, []);

  const handleEnter = () => {
    try {
      localStorage.setItem("raks_intro_seen", "1");
    } catch {}
    setShowIntro(false);
  };

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {showIntro && <IntroScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {!showIntro && (
        <motion.main 
          className="min-h-screen bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SiteHeader />
          <MarqueeTicker items={tickerItems} speed={25} />
          <HeroSection />
          <div id="products">
            <ProductGrid />
          </div>
          <MarqueeTicker items={tickerItems} speed={20} direction="right" />
          <SiteFooter />
        </motion.main>
      )}
    </>
  );
}
