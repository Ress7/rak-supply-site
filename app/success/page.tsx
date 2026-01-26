"use client";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Payment Successful
        </h1>
        <p className="font-mono text-muted-foreground">
          {">>> Thanks for your purchase. Your order is being processed."}
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="px-4 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-mono cursor-pointer"
          >
            BACK TO SHOP
          </a>
        </div>
      </div>
    </main>
  );
}
