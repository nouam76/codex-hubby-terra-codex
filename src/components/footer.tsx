"use client";

import { Zap, MessageCircle, Mail, ExternalLink } from "lucide-react";
import { useNav } from "@/lib/nav-context";
import { PRODUCTS } from "@/lib/products";
import { WHATSAPP_URL, EMAIL, CARD_URL } from "@/lib/contact";

export function Footer() {
  const { goHome, goProducts, goProduct, goResellers, goContact, goLegal } = useNav();

  return (
    <footer className="relative mt-auto border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={goHome} className="flex items-center gap-2.5">
              <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Zap className="h-4 w-4 text-background" fill="currentColor" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="font-[Space_Grotesk] text-base font-bold text-foreground">
                  Codex Hub
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
                  by TerraCodex
                </span>
              </div>
            </button>
            <p className="mt-3 text-sm text-muted-foreground">
              Applications SaaS • IA • Automatisation • Digitalisation métier
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-[Space_Grotesk] text-sm font-semibold text-foreground">
              Produits
            </h3>
            <ul className="mt-3 space-y-2">
              {PRODUCTS.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <button
                    onClick={() => goProduct(p.slug)}
                    className="text-left text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-[Space_Grotesk] text-sm font-semibold text-foreground">
              Liens
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <button
                  onClick={goResellers}
                  className="text-left text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Programme Revendeur
                </button>
              </li>
              <li>
                <button
                  onClick={goContact}
                  className="text-left text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => goLegal("mentions")}
                  className="text-left text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Mentions légales
                </button>
              </li>
              <li>
                <button
                  onClick={() => goLegal("privacy")}
                  className="text-left text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Confidentialité
                </button>
              </li>
              <li>
                <button
                  onClick={() => goLegal("cgv")}
                  className="text-left text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  CGV
                </button>
              </li>
              <li>
                <a
                  href={CARD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Carte de visite
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Catalogue CTA */}
          <div>
            <h3 className="font-[Space_Grotesk] text-sm font-semibold text-foreground">
              Découvrir
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Parcourez l'ensemble de nos applications SaaS professionnelles.
            </p>
            <button
              onClick={goProducts}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              Voir le catalogue
            </button>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © 2026 Codex Hub by TerraCodex. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
