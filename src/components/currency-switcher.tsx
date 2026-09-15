"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";
import { CURRENCY_LIST, type CurrencyCode } from "@/lib/currency";

const FLAGS: Record<CurrencyCode, string> = {
  DZD: "🇩🇿",
  EUR: "🇪🇺",
  USD: "🇺🇸",
};

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:bg-secondary"
        aria-label="Changer de devise"
      >
        <span className="text-base leading-none">{FLAGS[currency]}</span>
        <span className="font-mono text-xs">{currency}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-popover shadow-xl">
          <div className="px-3 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            Afficher les prix en
          </div>
          {CURRENCY_LIST.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                setCurrency(c.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-secondary ${
                currency === c.code ? "bg-secondary/60" : ""
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">{FLAGS[c.code]}</span>
                <span>
                  <span className="font-medium">{c.code}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{c.label}</span>
                </span>
              </span>
              {currency === c.code && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
          <div className="border-t border-border bg-muted/40 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
            Taux : 1 € = 275 DA · 1 $ = 245 DA
          </div>
        </div>
      )}
    </div>
  );
}
