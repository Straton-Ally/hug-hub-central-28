import { expect, test } from "@playwright/test";

import {
  addVat,
  formatMoney,
  STANDARD_VAT_RATE,
} from "../../src/lib/shopify/format";

test("adds standard VAT to a Shopify money value", () => {
  const inclusive = addVat({
    amount: "545.00",
    currencyCode: "GBP",
  });

  expect(STANDARD_VAT_RATE).toBe(0.2);
  expect(inclusive).toEqual({
    amount: "654.00",
    currencyCode: "GBP",
  });
  expect(formatMoney(inclusive)).toBe("£654.00");
});
