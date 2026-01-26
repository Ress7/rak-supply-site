import { NextResponse } from "next/server";
import Stripe from "stripe";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CartItemInput = {
  id: string;
  name: string;
  priceInCents: number;
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secret);
    const body = await req.json();
    const items: CartItemInput[] = body?.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid cart items" },
        { status: 400 }
      );
    }

    const origin = process.env.SITE_URL || new URL(req.url).origin;
    const successUrl = `${origin}/success`;
    const cancelUrl = `${origin}/cart`;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.priceInCents,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
