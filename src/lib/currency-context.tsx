"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";
import { CurrencyCode, CURRENCIES, CURRENCY_LIST } from "@/lib/currency";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  switchCurrency: (c: CurrencyCode) => void;
  currencies: typeof CURRENCY_LIST;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

const STORAGE_KEY = "codexhub_currency";
const EVENT_NAME = "codexhub:currency-change";

// Default value used both on the server and during the first client render
// (avoids hydration mismatch). The real value is read after mount.
const DEFAULT_CURRENCY: CurrencyCode = "DZD";

let inMemoryCurrency: CurrencyCode = DEFAULT_CURRENCY;
let listenersCount = 0;

function subscribe(callback: () => void): () => void {
  function onStorage(e: StorageEvent) {
    if (e.key === STORAGE_KEY) {
      try {
        const v = e.newValue as CurrencyCode | null;
        if (v && CURRENCIES[v]) {
          inMemoryCurrency = v;
          callback();
        }
      } catch {
        // ignore
      }
    }
  }
  function onCustom() {
    callback();
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT_NAME, onCustom);
  listenersCount++;
  // Lazy-read on first subscription (client only)
  if (listenersCount === 1) {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (saved && CURRENCIES[saved] && saved !== inMemoryCurrency) {
        inMemoryCurrency = saved;
        // Defer notification to next tick to avoid sync re-render in subscribe
        Promise.resolve().then(() => window.dispatchEvent(new Event(EVENT_NAME)));
      }
    } catch {
      // ignore
    }
  }
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT_NAME, onCustom);
    listenersCount--;
  };
}

function getSnapshot(): CurrencyCode {
  return inMemoryCurrency;
}

function getServerSnapshot(): CurrencyCode {
  return DEFAULT_CURRENCY;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currency = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setCurrency = useCallback((c: CurrencyCode) => {
    inMemoryCurrency = c;
    try {
      window.localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  const switchCurrency = setCurrency;

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, switchCurrency, currencies: CURRENCY_LIST }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
