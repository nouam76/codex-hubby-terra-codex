"use client";

import {
  CircleCheckBig,
  ArrowLeft,
  ArrowRight,
  Bell,
  Clock,
  Headset,
  CalendarX,
} from "lucide-react";
import { getProductBySlug } from "@/lib/products";
import { useNav } from "@/lib/nav-context";
import { useCurrency } from "@/lib/currency-context";
import { formatPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotFoundBlock } from "@/components/not-found";

export function ProductDetailPage({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);
  const { goProducts, goOrder } = useNav();
  const { currency } = useCurrency();

  if (!product) {
    return <NotFoundBlock />;
  }

  const Icon = product.icon;
  const isAvailable = product.status === "available";
  const isDevis = product.monthlyDzd === 0;
  const annualPerMonth = isDevis ? 0 : Math.round(product.annualDzd / 12);

  // Floor for EUR/USD display (used by "Création de Site Web" and similar)
  const floorForCurrency =
    currency === "EUR"
      ? product.floorEur
      : currency === "USD"
      ? product.floorUsd
      : undefined;

  return (
    <div className="relative mx-auto max-w-5xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <button
        onClick={goProducts}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Catalogue
      </button>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${product.accent}`}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-[Space_Grotesk] text-3xl font-bold sm:text-4xl">
              {product.name}
            </h1>
            {isAvailable ? (
              <Badge className="border-emerald-500/40 bg-emerald-500/15 text-emerald-400">
                Disponible
              </Badge>
            ) : (
              <Badge className="border-orange-500/40 bg-orange-500/15 text-orange-400">
                Bientôt disponible
              </Badge>
            )}
          </div>
          <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>
        </div>
      </div>

      {/* Long description */}
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
        {product.description}
      </p>

      {/* Features */}
      <section className="mt-10">
        <h2 className="font-[Space_Grotesk] text-xl font-bold">
          Fonctionnalités incluses
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {product.features.map((f) => (
            <div
              key={f}
              className="flex items-start gap-2.5 rounded-lg border border-border bg-card/50 p-3"
            >
              <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm text-foreground/90">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      {!isDevis && (
        <section className="mt-10">
          <h2 className="font-[Space_Grotesk] text-xl font-bold">Tarifs</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Monthly */}
            <div className="rounded-xl border border-border bg-card/60 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Mensuel
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-[Space_Grotesk] text-3xl font-bold text-foreground">
                  {formatPrice(product.monthlyDzd, currency, floorForCurrency)}
                </span>
                <span className="text-sm text-muted-foreground">/mois</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                par mois, sans engagement
              </p>
              <Button
                onClick={() => goOrder(product.slug)}
                disabled={!isAvailable}
                variant="outline"
                className="mt-4 w-full border-border bg-secondary/40 hover:bg-secondary"
              >
                Choisir mensuel
              </Button>
            </div>

            {/* Annual */}
            <div className="relative rounded-xl border-2 border-primary/50 bg-card p-6">
              <div className="absolute -top-3 left-6">
                <Badge className="gradient-primary border-0 text-background">
                  Meilleure offre
                </Badge>
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                Annuel
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-[Space_Grotesk] text-3xl font-bold text-foreground">
                  {formatPrice(product.annualDzd, currency, floorForCurrency)}
                </span>
                <span className="text-sm text-muted-foreground">/an</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                soit {formatPrice(annualPerMonth, currency, floorForCurrency)}/mois — 2 mois offerts
              </p>
              <Button
                onClick={() => goOrder(product.slug)}
                disabled={!isAvailable}
                className="mt-4 w-full gradient-primary text-background hover:opacity-90"
              >
                Choisir annuel
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Order CTA */}
      <section className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-card/80 to-secondary/30 p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-[Space_Grotesk] text-xl font-bold">
              Commander maintenant
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {!isDevis && (
                <>À partir de {formatPrice(product.monthlyDzd, currency, floorForCurrency)}/mois</>
              )}
              {isDevis && <>Solution sur mesure — contactez-nous pour un devis</>}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                Accès immédiat sous 24h
              </span>
              <span className="flex items-center gap-1.5">
                <Headset className="h-3.5 w-3.5 text-primary" />
                Support inclus
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarX className="h-3.5 w-3.5 text-primary" />
                Sans engagement mensuel
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:w-auto">
            {isAvailable ? (
              <Button
                onClick={() => goOrder(product.slug)}
                size="lg"
                className="gradient-primary text-background hover:opacity-90"
              >
                Commander
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-secondary/40"
              >
                <Bell className="mr-2 h-4 w-4" />
                Être notifié
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
