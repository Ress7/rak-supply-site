"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { useSearch } from "@/components/search-context";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count } = useCart();
  const { query, setQuery } = useSearch();

  const navItems = [
    { label: "SHOP", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
    { label: "TRACKING", href: "/tracking" },
    { label: "ACCOUNT", href: "/account" },
    { label: "WISHLIST", href: "/wishlist" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-baseline gap-1"
          >
            <span className="text-2xl md:text-3xl font-bold chrome-text">
              RAK
            </span>
            <span className="text-sm md:text-base font-mono text-primary">
              .2K
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Search size={18} className="text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search inventory"
                className="px-3 py-2 bg-muted text-foreground border border-border font-mono w-56"
              />
            </div>

            <motion.a
              href="/cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-mono flex items-center justify-center">
                {count}
              </span>
            </motion.a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground cursor-pointer"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: isMenuOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden bg-card border-t border-border"
      >
        <nav className="flex flex-col p-4 gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-lg font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2">
            <Search size={18} className="text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search inventory"
              className="flex-1 px-3 py-2 bg-muted text-foreground border border-border font-mono"
            />
          </div>
        </nav>
      </motion.div>
    </header>
  );
}
