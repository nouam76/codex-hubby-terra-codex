"use client";

import { Zap, ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useNav } from "@/lib/nav-context";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { goProducts, goContact } = useNav();

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* Grid background */}
      <div className="hero-grid absolute inset-0 opacity-100" aria-hidden />
      {/* Glow orbs */}
      <div
        className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #00bbc3, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute top-20 right-0 h-[300px] w-[400px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, #0074c7, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Applications SaaS • IA • Automatisation • Digitalisation métier
        </div>

        {/* H1 */}
        <h1 className="font-[Space_Grotesk] text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          <span className="gradient-text">Codex Hub</span>
          <span className="block text-foreground/90 mt-2 text-2xl sm:text-3xl md:text-4xl font-medium">
            by TerraCodex
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Des applications professionnelles SaaS pour digitaliser, automatiser et
          propulser votre activité. Solutions clés en main, accessibles
          immédiatement.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            onClick={goProducts}
            size="lg"
            className="gradient-primary w-full text-background hover:opacity-90 sm:w-auto"
          >
            Découvrir les produits
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={goContact}
            size="lg"
            variant="outline"
            className="w-full border-border bg-secondary/40 hover:bg-secondary sm:w-auto"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Nous contacter
          </Button>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 sm:gap-8">
          <Stat number="8+" label="Applications" />
          <Stat number="24h" label="Livraison" />
          <Stat number="100%" label="Cloud" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-[Space_Grotesk] text-3xl font-bold gradient-text sm:text-4xl">
        {number}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">
        {label}
      </div>
    </div>
  );
}
