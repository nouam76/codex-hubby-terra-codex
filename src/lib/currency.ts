/**
 * Currency conversion utilities
 *
 * Rates based on the Algerian black market:
 *  - 1 EUR = 275 DZD
 *  - 1 USD = 245 DZD
 *
 * All product prices are stored in DZD (Dinars Algériens) and converted on the fly.
 */

export type CurrencyCode = "DZD" | "EUR" | "USD";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** How many DZD for 1 unit of this currency */
  rateFromDzd: number; // 1 unit = X DZD, so DZD amount / rate = amount in this currency
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  DZD: {
    code: "DZD",
    symbol: "DA",
    label: "Dinar Algérien",
    rateFromDzd: 1,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    label: "Euro",
    rateFromDzd: 275,
  },
  USD: {
    code: "USD",
    symbol: "$",
    label: "Dollar US",
    rateFromDzd: 245,
  },
};

export const CURRENCY_LIST = Object.values(CURRENCIES);

/**
 * Convert an amount from DZD to the target currency.
 */
export function convertFromDzd(amountInDzd: number, target: CurrencyCode): number {
  const currency = CURRENCIES[target];
  return amountInDzd / currency.rateFromDzd;
}

/**
 * Format a price according to the target currency.
 *  - DZD: no decimals, thousands separated by space, " DA" suffix
 *  - EUR/USD: 2 decimals, " €" / " $" suffix
 *
 * Optional floor (in target currency) — if provided and the converted amount
 * is below it, the floor value is displayed instead. Useful for psychological
 * pricing (e.g. "à partir de 400 €" for high-value services).
 */
export function formatPrice(
  amountInDzd: number,
  currency: CurrencyCode,
  floor?: number
): string {
  if (amountInDzd === 0 || isNaN(amountInDzd)) return "Sur devis";

  let converted = convertFromDzd(amountInDzd, currency);
  if (floor !== undefined && floor > 0 && converted < floor) {
    converted = floor;
  }
  const info = CURRENCIES[currency];

  if (currency === "DZD") {
    const rounded = Math.round(converted);
    return `${rounded.toLocaleString("fr-FR").replace(/\u00a0/g, " ")} ${info.symbol}`;
  }
  return `${converted.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${info.symbol}`;
}

/**
 * Format price with the currency code (for compact display in dropdowns etc.).
 */
export function formatPriceShort(amountInDzd: number, currency: CurrencyCode): string {
  if (amountInDzd === 0 || isNaN(amountInDzd)) return "Sur devis";
  const converted = convertFromDzd(amountInDzd, currency);
  const info = CURRENCIES[currency];
  if (currency === "DZD") {
    return `${Math.round(converted).toLocaleString("fr-FR")} ${info.symbol}`;
  }
  return `${converted.toFixed(2)} ${info.symbol}`;
}
