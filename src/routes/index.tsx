import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Mail } from "lucide-react";

import asphalt from "@/assets/asphalt-plant.jpg";
import concrete from "@/assets/concrete-plant.jpg";
import catAutomation from "@/assets/cat-automation.jpg";
import catHome from "@/assets/cat-home.jpg";
import catPacking from "@/assets/cat-packing.jpg";
import { SiteFooter } from "@/components/shopify/SiteFooter";
import { SiteHeader } from "@/components/shopify/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spares Automation - Industrial Parts & Automation Spares" },
      {
        name: "description",
        content:
          "Browse industrial spares, automation parts, and cart-ready product ranges.",
      },
      { property: "og:title", content: "Spares Automation" },
      { property: "og:description", content: "Industrial parts and automation support." },
    ],
  }),
  component: Home,
});

const primaryRanges = [
  {
    title: "Asphalt / Blacktop Spares",
    copy: "Feeders, burner and drying parts, bitumen equipment, hot stone, silos, baghouse and mixing tower spares.",
    img: asphalt,
    to: "/asphalt",
    accent: "text-accent",
  },
  {
    title: "Ready-Mix / Concrete Spares",
    copy: "Batching, weighing, mixers, silos, pneumatic valves and plant control components.",
    img: concrete,
    to: "/concrete",
    accent: "text-amber",
  },
];

const categories = [
  { n: "01", title: "Packing Machinery", copy: "Sealers, rollers, belts and conveyor parts", img: catPacking, to: "/packing" },
  { n: "02", title: "Automation & Drives", copy: "VFDs, PLC modules, relays and sensors", img: catAutomation, to: "/automation" },
  { n: "03", title: "Home Controls", copy: "Smart relays, sensors and DIN rail supplies", img: catHome, to: "/home-controls" },
  { n: "04", title: "New Arrivals", copy: "Recently added catalogue items", img: catAutomation, to: "/new-arrivals" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <SiteHeader />

      <section className="grid w-full grid-cols-1 md:grid-cols-2">
        {primaryRanges.map((range) => (
          <Link
            key={range.title}
            to={range.to}
            className="group relative flex min-h-[430px] items-end overflow-hidden border-b border-rule md:min-h-[620px]"
          >
            <img
              src={range.img}
              alt={range.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/65 to-charcoal-deep/15" />
            <div className="relative p-6 md:p-10">
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                <span className="h-px w-8 bg-accent" />
                Product range
              </div>
              <h1 className="max-w-2xl font-display text-[2.2rem] font-extrabold uppercase leading-[0.95] tracking-tight text-white md:text-[4.5rem]">
                {range.title}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                {range.copy}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-colors group-hover:text-accent">
                Browse range
                <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.title}
            to={category.to}
            className="group flex min-h-[360px] flex-col border-b border-rule bg-surface lg:border-l"
          >
            <div className="relative flex-1 overflow-hidden bg-[oklch(0.96_0.005_250)]">
              <img
                src={category.img}
                alt={category.title}
                loading="lazy"
                className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">
                Range / {category.n}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-rule px-5 py-5 transition-colors group-hover:bg-charcoal-deep group-hover:text-white">
              <div>
                <h2 className="font-display text-[15px] font-bold uppercase tracking-tight">
                  {category.title}
                </h2>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted group-hover:text-white/50">
                  {category.copy}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </div>
          </Link>
        ))}
      </section>

      <section className="border-b border-rule bg-surface">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6 lg:px-10">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">
              Need help finding a part?
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">
              Send a part number, product photo, or cart details.
            </h2>
          </div>
          <Link
            to="/contact-us"
            className="inline-flex h-12 items-center justify-center gap-2 bg-accent px-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <Mail className="h-4 w-4" />
            Got a question?
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
