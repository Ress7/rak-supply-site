"use client";
import { motion } from "framer-motion";
import { BackToShop } from "@/components/back-to-shop";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <BackToShop className="mb-6" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About RAK.2K
          </h1>
          <p className="font-mono text-muted-foreground">
            {">>> FUTURE-PAST FOOTWEAR CULTURE <<<"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card y2k-border y2k-glow p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              We curate high-quality footwear made for comfort, durability, and
              everyday wear. Inspired by Y2K energy and modern design, every
              pair is selected for authenticity and style.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our inventory syncs live from our internal systems to ensure you
              see what’s available in real time. Limited drops and rare finds
              are part of the journey.
            </p>
          </div>

          <div className="bg-card y2k-border p-6 space-y-4">
            <h2 className="font-bold text-xl text-foreground">Values</h2>
            <ul className="font-mono text-sm text-muted-foreground space-y-2">
              <li>+ Authentic materials</li>
              <li>+ Reliable fit and build</li>
              <li>+ Clean design language</li>
              <li>+ Transparent availability</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
