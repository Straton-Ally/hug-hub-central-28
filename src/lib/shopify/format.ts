import type { ShopifyMoney, ShopifyProduct } from "./types";

export const STANDARD_VAT_RATE = 0.2;

export function formatMoney(money: ShopifyMoney) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: money.currencyCode,
  }).format(Number(money.amount));
}

export function addVat(
  money: ShopifyMoney,
  vatRate = STANDARD_VAT_RATE,
): ShopifyMoney {
  return {
    amount: (Number(money.amount) * (1 + vatRate)).toFixed(2),
    currencyCode: money.currencyCode,
  };
}

export function formatProductPrice(product: Pick<ShopifyProduct, "priceRange">) {
  const min = product.priceRange.minVariantPrice;
  const max = product.priceRange.maxVariantPrice;

  if (min.amount === max.amount && min.currencyCode === max.currencyCode) {
    return formatMoney(min);
  }

  return `From ${formatMoney(min)}`;
}

export function shopifyImageUrl(url: string, width: number) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith("shopify.com")) return url;
    parsed.searchParams.set("width", String(width));
    return parsed.toString();
  } catch {
    return url;
  }
}
