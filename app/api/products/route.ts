import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_DESCRIPTION = "High quality 1:1";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  size: string;
  color: string;
  category: string;
}

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://usbcfgglcxbtyjxvmdyp.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYmNmZ2dsY3hidHlqeHZtZHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NTY5MTEsImV4cCI6MjA4NjIzMjkxMX0.oTeZuPIu4hkp4BNm1c6UvQTPtVT0uNsh_HgqDO_AaQo";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function coerceProduct(row: any, index: number): Product | null {
  const data =
    typeof row.data === "string"
      ? safeParseJSON(row.data)
      : row.data || {};

  const name =
    (data?.name as string) ||
    (data?.title as string) ||
    (data?.item as string) ||
    "Unnamed Product";
  const price =
    typeof row.price === "number"
      ? row.price
      : Number(row.price) || 0;
  const image =
    (row.image as string) ||
    (data?.image as string) ||
    (data?.image_url as string) ||
    "";

  const description =
    (data?.description as string) ||
    (data?.desc as string) ||
    DEFAULT_DESCRIPTION;
  const size =
    (data?.size as string) ||
    (data?.sizes as string) ||
    (data?.size_range as string) ||
    "M US7–US13";
  const color = (data?.color as string) || "N/A";
  const category = (
    (data?.category as string) ||
    (data?.type as string) ||
    "SNEAKERS"
  ).toUpperCase();

  if (!name || price <= 0) return null;

  return {
    id: String(row.id ?? index + 1),
    name,
    price,
    image,
    description,
    size,
    color,
    category,
  };
}

function safeParseJSON(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function GET(request: Request) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, price, data, image");

    if (error) {
      throw error;
    }

    const products = (data || [])
      .map((row, idx) => coerceProduct(row, idx))
      .filter((p): p is Product => !!p);

    return NextResponse.json({
      products,
      source: "supabase",
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching products from Supabase:", error);
    return NextResponse.json({
      products: [],
      source: "error",
      error: "Failed to fetch from Supabase. Verify URL, anon key, and table schema.",
    });
  }
}
