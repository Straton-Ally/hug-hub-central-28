import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, Clock3, Globe2, PackageCheck, Route as RouteIcon, ShieldCheck } from "lucide-react";

import { SiteFooter } from "@/components/shopify/SiteFooter";
import { SiteHeader } from "@/components/shopify/SiteHeader";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/delivery-information")({
  head: () =>
    pageHead(
      "Delivery Information",
      "How delivery charges, lead times, dispatch updates, tracking, and delivery issues are handled.",
      "/delivery-information",
    ),
  component: DeliveryPage,
});

const DELIVERY_DETAILS = [
  {
    icon: Calculator,
    title: "Charges calculated before payment",
    copy: "Available delivery services and charges are calculated in Shopify checkout from the basket and delivery address. You see the applicable total before placing the order.",
  },
  {
    icon: Clock3,
    title: "Stock and sourced lead times",
    copy: "Stock items can usually move quickly once payment or account details are complete. For sourced or additional quantities, the sales desk confirms the expected lead time.",
  },
  {
    icon: RouteIcon,
    title: "Dispatch and tracking",
    copy: "When fulfilment and courier tracking are available, Shopify emails the order update and exposes it through the secure order-status link in your account.",
  },
  {
    icon: ShieldCheck,
    title: "Damage, shortages, or errors",
    copy: "Check deliveries promptly. Report visible damage, missing quantities, or an incorrect product with the order number and keep the packaging while the team investigates.",
  },
  {
    icon: PackageCheck,
    title: "Large or specialist items",
    copy: "Heavy, oversized, hazardous, or supplier-direct consignments may need a separately confirmed service. Any manual charge is agreed before the order is accepted.",
  },
  {
    icon: Globe2,
    title: "International delivery",
    copy: "Availability, transport, duties, taxes, import requirements, and delivery responsibility are confirmed for the destination before an overseas order is processed.",
  },
];

function DeliveryPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <SiteHeader />
      <main id="main-content">
        <section className="border-b border-rule bg-ink text-white">
          <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              Delivery information
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-4xl">
              Clear costs and traceable delivery
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
              Delivery options and charges are calculated from the actual basket and destination,
              with fulfilment and tracking updates kept against the Shopify order.
            </p>
            <Link to="/cart" className="mt-5 inline-flex h-11 items-center gap-2 bg-accent px-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:brightness-110">
              Review basket <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6 md:py-14">
          <section aria-labelledby="delivery-journey-title" className="grid gap-px border border-rule bg-rule md:grid-cols-3">
            {[
              ["01", "Basket", "Products and quantities determine which delivery services can be offered."],
              ["02", "Checkout", "The delivery address and Shopify shipping rules calculate the available charge."],
              ["03", "Order updates", "Dispatch and tracking are emailed and shown on the secure order-status page."],
            ].map(([number, title, copy]) => (
              <article key={number} className="bg-surface p-5 md:p-6">
                <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-accent">{number}</p>
                <h2 id={number === "01" ? "delivery-journey-title" : undefined} className="mt-4 font-display text-lg font-bold uppercase tracking-tight">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{copy}</p>
              </article>
            ))}
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DELIVERY_DETAILS.map((detail) => (
              <article key={detail.title} className="border border-rule bg-surface p-5 md:p-6">
                <detail.icon aria-hidden="true" className="h-6 w-6 text-accent" />
                <h2 className="mt-5 font-display text-lg font-bold uppercase tracking-tight">{detail.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink-muted">{detail.copy}</p>
              </article>
            ))}
          </section>

          <section className="mt-10 border border-rule bg-surface p-5 md:flex md:items-center md:justify-between md:gap-8 md:p-7">
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">Something wrong with a delivery?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
                Open a return request and select the affected item, quantity, and reason. The request is saved in the CMS and immediately receives an email reference.
              </p>
            </div>
            <Link to="/returns-policy" hash="return-request" className="mt-5 inline-flex h-11 shrink-0 items-center gap-2 bg-accent px-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white hover:brightness-110 md:mt-0">
              Start a return <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
