"use client";

import { useState, useEffect } from "react";
import { Zap, Menu, X, ArrowRight } from "lucide-react";
import { useNav } from "@/lib/nav-context";
import { CurrencySwitcher } from "@/components/currency-switcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { route, goHome, goProducts, goResellers, goContact } = useNav();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (name: string) => route.name === name;

  const navItems = [
    { label: "Accueil", action: goHome, active: isActive("home") },
    { label: "Produits", action: goProducts, active: isActive("products") || isActive("product") || isActive("order") },
    { label: "Revendeurs", action: goResellers, active: isActive("resellers") },
    { label: "Contact", action: goContact, active: isActive("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={goHome}
          className="flex items-center gap-2.5"
          aria-label="Codex Hub - Accueil"
        >
          <div className="gradient-primary glow-cyan flex h-8 w-8 items-center justify-center rounded-lg">
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

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                item.active
                  ? "bg-secondary/60 text-foreground"
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <CurrencySwitcher />
          <Button
            onClick={goProducts}
            size="sm"
            className="hidden gradient-primary text-background hover:opacity-90 sm:inline-flex"
          >
            Voir les produits
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/40 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setMobileOpen(false);
                }}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  item.active
                    ? "bg-secondary/60 text-foreground"
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => {
                goProducts();
                setMobileOpen(false);
              }}
              size="sm"
              className="mt-2 gradient-primary text-background hover:opacity-90"
            >
              Voir les produits
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
