"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BackToShop } from "@/components/back-to-shop";

export default function TrackingPage() {
  const [ready, setReady] = useState(false);
  const [tracked, setTracked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//www.17track.net/externalcall.js";
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const doTrack = () => {
    const num = inputRef.current?.value?.trim() || "";
    if (!num) {
      alert("Enter your number.");
      return;
    }
    const YQV5 = (window as any).YQV5;
    if (!YQV5 || !ready) {
      alert("Tracking library is loading, please try again.");
      return;
    }
    YQV5.trackSingle({
      YQ_ContainerId: containerRef.current?.id || "YQContainer",
      YQ_Height: 640,
      YQ_Fc: "0",
      YQ_Lang: "en",
      YQ_Num: num,
    });
    setTracked(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <BackToShop className="mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Package Tracking</h1>
        <p className="text-muted-foreground mb-8 font-mono">
          {">>> Enter your tracking number to view real-time shipment status"}
        </p>

        <div className="flex gap-2 mb-6">
          <input
            ref={inputRef}
            type="text"
            id="YQNum"
            maxLength={50}
            placeholder="Tracking number"
            className="flex-1 px-4 py-3 bg-muted text-foreground border border-border font-mono"
          />
          <button
            onClick={doTrack}
            className="px-4 py-3 bg-primary text-primary-foreground font-mono cursor-pointer"
          >
            TRACK
          </button>
        </div>

        <div className="space-y-6">
          <div
            id="YQContainer"
            ref={containerRef}
            className="bg-card y2k-border y2k-glow min-h-[640px] p-4"
          />

          {tracked && (
            <div className="flex justify-end">
              <Link
                href="/"
                className="px-4 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-mono cursor-pointer"
              >
                BACK TO HOME
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
