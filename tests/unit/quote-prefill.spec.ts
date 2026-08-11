import { expect, test } from "@playwright/test";

import { quoteContactDetailsFromCustomer } from "../../src/lib/shopify/quote";

test("prefills quote contact details from a signed-in Shopify customer", () => {
  expect(
    quoteContactDetailsFromCustomer({
      firstName: "Alex",
      lastName: "Morgan",
      email: "alex@example.com",
      phone: "+441611234567",
      defaultAddress: { company: "Example Engineering", phone: "+441619999999" },
      companyMetafield: { value: "Fallback Company" },
    }),
  ).toEqual({
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex@example.com",
    company: "Example Engineering",
    phone: "+441611234567",
  });
});

test("uses Shopify fallbacks and leaves guest quote details blank", () => {
  expect(
    quoteContactDetailsFromCustomer({
      companyMetafield: { value: "Account Company" },
      defaultAddress: { phone: "+441617777777" },
    }),
  ).toMatchObject({ company: "Account Company", phone: "+441617777777" });

  expect(quoteContactDetailsFromCustomer(null)).toEqual({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
  });
});
