"use client";
import { useState } from "react";
import { BackToShop } from "@/components/back-to-shop";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <BackToShop className="mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Contact</h1>
        <p className="font-mono text-muted-foreground mb-8">
          {">>> Reach out for orders, sizing, or drops"}
        </p>

        {!sent ? (
          <form onSubmit={submit} className="bg-card y2k-border p-6 space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-4 py-3 bg-muted text-foreground border border-border font-mono"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full px-4 py-3 bg-muted text-foreground border border-border font-mono"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              rows={6}
              className="w-full px-4 py-3 bg-muted text-foreground border border-border font-mono"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-primary text-primary-foreground font-mono cursor-pointer"
            >
              SEND
            </button>
          </form>
        ) : (
          <div className="bg-card y2k-border p-6">
            <p className="text-foreground">Thanks — we’ll get back to you.</p>
            <p className="font-mono text-xs text-muted-foreground mt-2">
              {">>> You can also email us at support@rak2k.example"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
