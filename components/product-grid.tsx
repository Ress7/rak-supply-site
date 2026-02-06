"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard, Product } from "./product-card";
import { ProductModal } from "./product-modal";
import useSWR from "swr";
import { RefreshCw } from "lucide-react";
import { useSearch } from "@/components/search-context";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<string>("ALL");
   const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const { query } = useSearch();

  const { data, error, isLoading, mutate } = useSWR<{ products: Product[] }>(
    "/api/products",
    fetcher,
    {
      refreshInterval: 30000, // Auto-refresh every 30 seconds
    }
  );
  const [refreshing, setRefreshing] = useState(false);

  const products = data?.products || [];
  const categories = [
    "ALL",
    ...new Set(products.map((p) => p.category).filter((c) => c !== "SNEAKERS")),
  ];
  const brands = [
    "NEW BALANCE",
    "OFF-WHITE",
    "LOUIS VUITTON",
    "AIR JORDAN",
    "NIKE",
    "BALENCIAGA",
    "DIOR",
    "AMIRI",
    "ADIDAS",
    "BOTTEGA",
    "MARNI",
    "ASICS",
    "MIHARA",
    "PRADA",
    "GUCCI",
    "MAISON MARGIELA",
    "TIMBERLAND",
    "ALEXANDER MCQEEN",
    "LANVIN",
  ];

  const byCategory =
    filter === "ALL" ? products : products.filter((p) => p.category === filter);
  const byBrand = brandFilter
    ? byCategory.filter((p) => {
        const name = p.name.toLowerCase();
        const category = (p.category || "").toLowerCase();
        const brand = brandFilter.toLowerCase();
        return name.includes(brand) || category.includes(brand);
      })
    : byCategory;
  const q = query.trim().toLowerCase();
  const filteredProducts = byBrand.filter((p) => {
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.color.toLowerCase().includes(q)
    );
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-destructive font-mono">
          {">>> ERROR LOADING PRODUCTS"}
        </p>
        <button
          onClick={() => mutate()}
          className="px-4 py-2 bg-primary text-primary-foreground font-mono cursor-pointer"
        >
          RETRY
        </button>
      </div>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="chrome-text">FRESH</span>{" "}
            <span className="text-primary">DROPS</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            {">>> UPDATED LIVE FROM INVENTORY <<<"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-4 flex justify-center"
        >
          <button
            onClick={async () => {
              setRefreshing(true);
              await mutate(
                async () =>
                  fetch(`/api/products?refresh=1`).then((res) => res.json()),
                { revalidate: false }
              );
              setRefreshing(false);
            }}
            className={`px-6 py-2 font-mono text-sm flex items-center gap-2 cursor-pointer transition-all ${
              refreshing
                ? "bg-primary text-primary-foreground y2k-glow animate-pulse"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "REFRESHING..." : "REFRESH"}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8 mt-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 font-mono text-sm transition-all cursor-pointer ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}

          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() =>
                setBrandFilter((current) => (current === brand ? null : brand))
              }
              className={`px-4 py-2 font-mono text-sm transition-all cursor-pointer ${
                brandFilter === brand
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {brand}
            </button>
          ))}
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted animate-pulse y2k-border"
              />
            ))}
          </div>
        )}

        {/* Products grid */}
        {!isLoading && filteredProducts.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20 max-w-2xl mx-auto">
            <div className="y2k-border p-8 bg-card">
              <p className="text-primary font-mono text-xl mb-4">
                {">>> CONNECT YOUR GOOGLE SHEET <<<"}
              </p>
              <div className="text-left text-muted-foreground text-sm space-y-4 font-mono">
                <p>1. Your Google Sheet should have these columns:</p>
                <div className="bg-muted p-4 overflow-x-auto">
                  <code className="text-xs text-foreground">
                    ITEM | DESCRIPTON | SIZE RANGE | PRICE | IMAGES
                  </code>
                </div>
                <p>2. Publish your sheet:</p>
                <p className="text-xs pl-4">File → Share → Publish to web → Select CSV</p>
                <p>3. Add <span className="text-primary">GOOGLE_SHEET_URL</span> environment variable in the Vars section</p>
                <p className="text-xs">
                  Format: https://docs.google.com/spreadsheets/d/YOUR_ID/gviz/tq?tqx=out:csv
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Product modal */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </section>
  );
}
