import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ClipboardCheck, Mail, PackageOpen } from "lucide-react";

import { ReturnRequestForm } from "@/components/shopify/ReturnRequestForm";
import { SiteFooter } from "@/components/shopify/SiteFooter";
import { SiteHeader } from "@/components/shopify/SiteHeader";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/returns-policy")({
  head: () =>
    pageHead(
      "Returns & Online Return Request",
      "Select products and quantities, choose a return reason, and submit a tracked return request.",
      "/returns-policy",
    ),
  component: ReturnsPage,
});

const PROCESS = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Submit the request",
    copy: "Choose the order, items, quantities, reasons, and preferred outcome using the form below.",
  },
  {
    number: "02",
    icon: Mail,
    title: "Receive instructions",
    copy: "An email confirms your reference. The returns team then sends approval and the correct return route.",
  },
  {
    number: "03",
    icon: PackageOpen,
    title: "Return the goods",
    copy: "Pack the approved items securely and follow the supplied collection or dispatch instructions.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Resolution",
    copy: "Once assessed, the agreed refund, replacement, repair, or advice is completed and your status is emailed.",
  },
];

function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <SiteHeader />
      <main id="main-content">
        <section className="border-b border-rule bg-ink text-white">
          <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              Delivery & returns
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-4xl">
              Returns made simple
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
              Request a return online, specify exactly what is coming back, and receive a
              traceable reference and email updates at each staff-managed stage.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#return-request" className="inline-flex h-12 items-center gap-2 bg-accent px-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:brightness-110">
                Start a return <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <Link to="/account" className="inline-flex h-12 items-center border border-white/30 px-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:border-white">
                View order history
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-10 md:px-6 md:py-14">
          <section aria-labelledby="return-process-title">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted">How it works</p>
                <h2 id="return-process-title" className="mt-2 font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl">Four simple stages</h2>
              </div>
              <p className="hidden max-w-md text-right text-sm leading-6 text-ink-muted md:block">
                Do not send an item until your return has been reviewed and instructions have been issued.
              </p>
            </div>
            <ol className="mt-6 grid gap-px bg-rule border border-rule md:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((step) => (
                <li key={step.number} className="bg-surface p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-accent">{step.number}</span>
                    <step.icon aria-hidden="true" className="h-5 w-5 text-ink-muted" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-bold uppercase tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{step.copy}</p>
                </li>
              ))}
            </ol>
          </section>

          <ReturnRequestForm />

          <section className="grid gap-px border border-rule bg-rule lg:grid-cols-3">
            <PolicyCard
              title="Online consumer cancellations"
              copy="Where UK consumer distance-selling rights apply, you can normally tell us within 14 days of receiving the goods that you wish to cancel, then return them within the following 14 days. You do not have to give a reason. Exceptions can apply, including certain made-to-order goods."
            />
            <PolicyCard
              title="Faulty, damaged, or incorrect goods"
              copy="Tell us promptly and include clear fault or damage details. Keep the product, serial labels, packaging, and delivery materials while we assess the most suitable remedy and return method."
            />
            <PolicyCard
              title="Refunds and delivery costs"
              copy="Eligible refunds are sent through the appropriate original payment route. Where the statutory online cancellation rules apply, the standard outbound delivery cost is included; enhanced-delivery extras may not be."
            />
          </section>

          <section className="border border-rule bg-surface p-5 md:flex md:items-center md:justify-between md:gap-8 md:p-7">
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">Need delivery information?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
                See how live checkout charges, lead times, dispatch, tracking, shortages, and international orders are handled.
              </p>
            </div>
            <Link to="/delivery-information" className="mt-5 inline-flex h-11 shrink-0 items-center gap-2 border border-accent px-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent hover:bg-accent hover:text-white md:mt-0">
              Delivery guide <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </section>

          <p className="text-xs leading-5 text-ink-muted">
            This page does not limit statutory rights. Official UK guidance is available from{" "}
            <a href="https://www.gov.uk/accepting-returns-and-giving-refunds" target="_blank" rel="noreferrer" className="font-semibold text-accent hover:underline">
              GOV.UK
            </a>.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function PolicyCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="bg-surface p-5 md:p-6">
      <h2 className="font-display text-lg font-bold uppercase tracking-tight">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-ink-muted">{copy}</p>
    </article>
  );
}
