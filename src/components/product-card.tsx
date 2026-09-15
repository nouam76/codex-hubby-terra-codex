"use client";

import { CircleCheckBig, ArrowRight, Bell } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCurrency } from "@/lib/currency-context";
import { formatPrice } from "@/lib/currency";
import { useNav } from "@/lib/nav-context";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { currency } = useCurrency();
  const { goProduct } = useNav();
  const Icon = product.icon;
  const isAvailable = product.status === "available";
  const isDevis = product.monthlyDzd === 0;

  return (
    <div
      onClick={() => goProduct(product.slug)}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all",
        "hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      {/* Icon + status */}
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br",
            product.accent
          )}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        {isAvailable ? (
          <Badge className="border-emerald-500/40 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/20">
            Disponible
          </Badge>
        ) : (
          <Badge className="border-orange-500/40 bg-orange-500/15 text-orange-400 hover:bg-orange-500/20">
            Bientôt disponible
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-4 font-[Space_Grotesk] text-xl font-semibold text-foreground">
        {product.name}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{product.tagline}</p>

      {/* Features preview */}
      <ul className="mt-4 space-y-1.5">
        {product.features.slice(0, 5).map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
            <CircleCheckBig className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
        {product.features.length > 5 && (
          <li className="text-xs text-muted-foreground">
            +{product.features.length - 5} autres fonctionnalités
          </li>
        )}
      </ul>

      {/* Price */}
      <div className="mt-5 flex-1" />
      <div className="mt-4 border-t border-border/60 pt-4">
        {isDevis ? (
          <div className="flex items-end justify-between">
            <div>
              <div className="font-[Space_Grotesk] text-lg font-semibold text-foreground">
                Sur devis
              </div>
              <div className="text-xs text-muted-foreground">
                Contactez-nous
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-[Space_Grotesk] text-xl font-bold text-foreground">
                  {formatPrice(product.monthlyDzd, currency, currency === "EUR" ? product.floorEur : currency === "USD" ? product.floorUsd : undefined)}
                </span>
                <span className="text-xs text-muted-foreground">/mois</span>
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                ou {formatPrice(product.annualDzd, currency, currency === "EUR" ? product.floorEur : currency === "USD" ? product.floorUsd : undefined)}/an · 2 mois offerts
              </div>
            </div>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            goProduct(product.slug);
          }}
          className={cn(
            "mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
            isAvailable
              ? "gradient-primary text-background hover:opacity-90"
              : "border border-border bg-secondary/40 text-foreground hover:bg-secondary"
          )}
        >
          {isAvailable ? (
            <>
              Commander
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              <Bell className="h-3.5 w-3.5" />
              Être notifié au lancement
            </>
          )}
        </button>
      </div>
    </div>
  );
}
