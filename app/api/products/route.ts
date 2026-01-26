import { NextResponse } from "next/server";

// Google Sheets public CSV URL format:
// https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}

const SHEET_URL = process.env.GOOGLE_SHEET_URL;
const DEFAULT_DESCRIPTION =
  "High-quality footwear made for comfort, durability, and everyday wear. Designed with premium materials and a clean finish, this shoe delivers a reliable fit and a modern look suitable for any occasion.";

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

const DEMO_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Demo Product 1",
    price: 19.99,
    image: "https://example.com/demo1.jpg",
    description: "This is a demo product.",
    size: "S,M,L",
    color: "Black",
    category: "SNEAKERS"
  },
  {
    id: "2",
    name: "Demo Product 2",
    price: 29.99,
    image: "https://example.com/demo2.jpg",
    description: "This is another demo product.",
    size: "9-12",
    color: "White",
    category: "BOOTS"
  }
];

// Spreadsheet column mapping guide:
// Your Google Sheet should have these columns (case-insensitive):
// - ITEM (or name, product_name, title) - Product name
// - DESCRIPTON (or description, desc) - Product description text
// - SIZE RANGE (or size, sizes) - Available sizes (e.g., "9-12" or "S,M,L")
// - PRICE - Price in dollars (numbers only, no currency symbol)
// - IMAGES (or image, image_url, photo) - Full URL to product image

function parseCSV(csv: string): Product[] {
  const lines = csv.split("\n");
  if (lines.length < 2) return [];

  // Parse header row
  const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().trim());

  // Find column indexes - supports your exact column names
  const idIdx = headers.findIndex((h) => h === "id" || h === "product_id");
  const nameIdx = headers.findIndex((h) => h === "item" || h === "name" || h === "product_name" || h === "title");
  const priceIdx = headers.findIndex((h) => h === "price");
  const imageIdx = headers.findIndex((h) => h === "images" || h === "image" || h === "image_url" || h === "photo");
  const descIdx = headers.findIndex((h) => h === "descripton" || h === "description" || h === "desc"); // Note: supports typo "descripton"
  const sizeIdx = headers.findIndex((h) => h === "size range" || h === "size" || h === "sizes");
  const colorIdx = headers.findIndex((h) => h === "color" || h === "colour");
  const categoryIdx = headers.findIndex((h) => h === "category" || h === "type");

  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < 2) continue;

    const product: Product = {
      id: idIdx >= 0 ? values[idIdx] || String(i) : String(i),
      name: nameIdx >= 0 ? values[nameIdx] || "Unnamed Product" : "Unnamed Product",
      price: priceIdx >= 0 ? parsePrice(values[priceIdx]) : 0,
      image: imageIdx >= 0 ? values[imageIdx] || "" : "",
      description: DEFAULT_DESCRIPTION,
      size: "M US7–US13",
      color: colorIdx >= 0 ? values[colorIdx] || "N/A" : "N/A",
      category: categoryIdx >= 0 ? values[categoryIdx]?.toUpperCase() || "OTHER" : "OTHER",
    };

    // Only add products with valid name and price
    if (product.name && product.price > 0) {
      products.push(product);
    }
  }

  return products;
}

function parsePrice(raw: string): number {
  const cleaned = (raw || "").replace(/[^0-9.\-]/g, "");
  const val = parseFloat(cleaned);
  return isNaN(val) ? 0 : val;
}

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

export async function GET(request: Request) {
  try {
    // If no sheet URL is configured, return empty with setup instructions
    if (!SHEET_URL) {
      return NextResponse.json({ 
        products: [],
        source: "not_configured",
        message: "Add your GOOGLE_SHEET_URL environment variable to connect your spreadsheet."
      });
    }

    const url = new URL(request.url);
    const forceRefresh = url.searchParams.get("refresh") === "1";

    // Fetch data from Google Sheets
    const response = await fetch(SHEET_URL, {
      next: { revalidate: forceRefresh ? 0 : 10 },
      cache: forceRefresh ? "no-store" : "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status}`);
    }

    const csv = await response.text();
    const products = parseCSV(csv);

    return NextResponse.json({ 
      products,
      source: "google_sheets",
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    
    // Return empty on error with message
    return NextResponse.json({
      products: [],
      source: "error",
      error: "Failed to fetch from Google Sheets. Check your GOOGLE_SHEET_URL."
    });
  }
}
