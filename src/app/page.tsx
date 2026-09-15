"use client";

import { CurrencyProvider } from "@/lib/currency-context";
import { NavProvider } from "@/lib/nav-context";
import { CodexHubApp } from "@/components/codexhub-app";

export default function Page() {
  return (
    <CurrencyProvider>
      <NavProvider>
        <CodexHubApp />
      </NavProvider>
    </CurrencyProvider>
  );
}
