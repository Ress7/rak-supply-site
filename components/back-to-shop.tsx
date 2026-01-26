"use client";
import Link from "next/link";

export function BackToShop({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-end ${className}`}>
      <Link
        href="/"
        className="px-4 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-mono cursor-pointer"
      >
        BACK TO SHOP
      </Link>
    </div>
  );
}
