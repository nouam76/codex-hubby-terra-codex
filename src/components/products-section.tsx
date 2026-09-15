"use client";

import { ArrowRight, CirclePlay } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useNav } from "@/lib/nav-context";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DEMOS = [
  "Cartes de Visite Numériques",
  "Restaurant QR",
  "JetDiag-Pro",
  "Nautica",
  "Création de Site Web",
];

export function ProductsSection({
  showAll = false,
  limit,
}: {
  showAll?: boolean;
  limit?: number;
}) {
  const { goProducts } = useNav();
  const products = limit ? PRODUCTS.slice(0, limit) : PRODUCTS;

  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {!showAll && (
            <Badge className="mb-3 border-primary/30 bg-primary/10 text-primary">
              Catalogue complet
            </Badge>
          )}
          <h2 className="font-[Space_Grotesk] text-3xl font-bold sm:text-4xl">
            Nos <span className="gradient-text">Applications</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {showAll
              ? "Des solutions SaaS professionnelles pour digitaliser et automatiser votre activité."
              : "Choisissez la solution adaptée à votre métier."}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        {!showAll && (
          <div className="mt-10 text-center">
            <Button
              onClick={goProducts}
              variant="outline"
              size="lg"
              className="border-border bg-secondary/40 hover:bg-secondary"
            >
              Voir tout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {showAll && (
          <div className="mt-20">
            <div className="text-center">
              <Badge className="mb-3 border-primary/30 bg-primary/10 text-primary">
                Démonstrations vidéo
              </Badge>
              <h3 className="font-[Space_Grotesk] text-2xl font-bold sm:text-3xl">
                Visualisez nos produits en action
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Découvrez comment nos solutions peuvent transformer votre
                activité grâce à des démonstrations vidéo détaillées.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEMOS.map((title) => (
                <button
                  key={title}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 p-4 text-left transition-all hover:border-primary/40 hover:bg-card"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <CirclePlay className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Cliquez pour regarder la démonstration
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-2xl rounded-lg border border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
              📹 Vidéos en cours de chargement — Les démonstrations vidéo seront
              disponibles très prochainement. Contactez-nous pour une
              démonstration personnalisée en direct.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
