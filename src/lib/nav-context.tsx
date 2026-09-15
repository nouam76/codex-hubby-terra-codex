"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

export type Route =
  | { name: "home" }
  | { name: "products" }
  | { name: "product"; slug: string }
  | { name: "order"; slug: string }
  | { name: "resellers" }
  | { name: "contact" }
  | { name: "legal"; page: "cgv" | "privacy" | "mentions" };

interface NavContextValue {
  route: Route;
  navigate: (route: Route) => void;
  goHome: () => void;
  goProducts: () => void;
  goProduct: (slug: string) => void;
  goOrder: (slug: string) => void;
  goResellers: () => void;
  goContact: () => void;
  goLegal: (page: "cgv" | "privacy" | "mentions") => void;
}

const NavContext = createContext<NavContextValue | undefined>(undefined);

const HOME: Route = { name: "home" };

function parseHashString(hash: string): Route {
  const clean = hash.replace(/^#\/?/, "");
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 0) return HOME;
  const [first, second] = parts;
  switch (first) {
    case "produits":
      if (second) return { name: "product", slug: second };
      return { name: "products" };
    case "commander":
      if (second) return { name: "order", slug: second };
      return { name: "products" };
    case "revendeurs":
      return { name: "resellers" };
    case "contact":
      return { name: "contact" };
    case "cgv":
      return { name: "legal", page: "cgv" };
    case "confidentialite":
      return { name: "legal", page: "privacy" };
    case "mentions-legales":
      return { name: "legal", page: "mentions" };
    default:
      return HOME;
  }
}

function routeToHash(route: Route): string {
  switch (route.name) {
    case "home":
      return "#/";
    case "products":
      return "#/produits";
    case "product":
      return `#/produits/${route.slug}`;
    case "order":
      return `#/commander/${route.slug}`;
    case "resellers":
      return "#/revendeurs";
    case "contact":
      return "#/contact";
    case "legal":
      return route.page === "cgv"
        ? "#/cgv"
        : route.page === "privacy"
        ? "#/confidentialite"
        : "#/mentions-legales";
  }
}

// Cache: store the last seen hash string and its parsed Route so getSnapshot
// returns a referentially-stable value when the hash hasn't changed.
let cachedHash: string | null = null;
let cachedRoute: Route = HOME;

function getRouteForCurrentHash(): Route {
  if (typeof window === "undefined") return HOME;
  const currentHash = window.location.hash;
  if (currentHash !== cachedHash) {
    cachedHash = currentHash;
    cachedRoute = parseHashString(currentHash);
  }
  return cachedRoute;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getSnapshot(): Route {
  return getRouteForCurrentHash();
}

function getServerSnapshot(): Route {
  return HOME;
}

export function NavProvider({ children }: { children: React.ReactNode }) {
  const route = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Scroll to top whenever the route changes (tracked via ref to avoid re-runs)
  const lastHashRef = React.useRef<string>("");
  React.useEffect(() => {
    const currentHash = routeToHash(route);
    if (lastHashRef.current && lastHashRef.current !== currentHash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    lastHashRef.current = currentHash;
  }, [route]);

  const navigate = useCallback((r: Route) => {
    const hash = routeToHash(r);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
  }, []);

  const value: NavContextValue = {
    route,
    navigate,
    goHome: () => navigate({ name: "home" }),
    goProducts: () => navigate({ name: "products" }),
    goProduct: (slug) => navigate({ name: "product", slug }),
    goOrder: (slug) => navigate({ name: "order", slug }),
    goResellers: () => navigate({ name: "resellers" }),
    goContact: () => navigate({ name: "contact" }),
    goLegal: (page) => navigate({ name: "legal", page }),
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within a NavProvider");
  return ctx;
}
