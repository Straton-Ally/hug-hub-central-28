import { createFileRoute } from "@tanstack/react-router";

import { InfoPage } from "@/components/shopify/InfoPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/returns-policy")({
  head: () =>
    pageHead(
      "Returns Policy",
      "Information about return eligibility, approvals, shipping, inspections, refunds, and exchanges.",
      "/returns-policy",
    ),
  component: ReturnsPolicyPage,
});

function ReturnsPolicyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Returns policy"
      intro="This policy explains the general process and conditions for returning products purchased from Spares Automation. Order-specific terms confirmed at checkout or in writing may also apply."
      ctaLabel="Start a return"
      ctaTo="/returns"
      sections={[
        {
          title: "Return eligibility",
          copy: "Return requests should be submitted within the applicable return period and before goods are sent back. Products should remain unused, complete, and in their original packaging unless they are faulty, damaged, or were supplied incorrectly.",
        },
        {
          title: "Return authorisation",
          copy: "All returns require review and authorisation. Once a request is approved, we will provide a return reference and instructions. Goods sent without authorisation may be delayed or refused.",
        },
        {
          title: "Special-order products",
          copy: "Made-to-order, configured, personalised, sealed, or specially sourced products may not be eligible for a change-of-mind return. Any restrictions will be identified in the quotation or order confirmation where possible.",
        },
        {
          title: "Faulty or incorrect goods",
          copy: "Please report faults, transit damage, shortages, or incorrect products promptly and include clear details and photographs where available. Keep all packaging and labels while the issue is assessed.",
        },
        {
          title: "Return shipping",
          copy: "The customer is normally responsible for securely packaging approved returns and following the supplied shipping instructions. Responsibility for return costs depends on the reason for return and any rights that apply to the purchase.",
        },
        {
          title: "Inspection and refunds",
          copy: "Returned goods are inspected before a refund, replacement, repair, or credit is confirmed. Approved refunds are normally issued to the original payment method, subject to payment-provider processing times.",
        },
        {
          title: "Consumer rights",
          copy: "Nothing in this policy is intended to limit statutory rights that cannot lawfully be excluded. Different rules may apply depending on whether a purchase was made as a consumer or in the course of business.",
        },
        {
          title: "Questions about a return",
          copy: "Contact the sales team with your order number, product details, and reason for return if you need help before submitting a request or sending any goods.",
        },
      ]}
    />
  );
}
