import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import contactImg from "@/assets/cat-automation.jpg";
import { SiteFooter } from "@/components/shopify/SiteFooter";
import { SiteHeader } from "@/components/shopify/SiteHeader";

export const Route = createFileRoute("/contact-us")({
  component: ContactUsPage,
});

function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <SiteHeader />

      <section className="relative flex min-h-[300px] items-end overflow-hidden md:min-h-[380px]">
        <img
          src={contactImg}
          alt="Industrial automation support"
          className="absolute inset-0 h-full w-full scale-105 object-cover blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/65 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-12 md:px-6 lg:px-10">
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
            <span className="h-px w-8 bg-accent" />
            Support
          </div>
          <h1 className="font-display text-[2.2rem] font-extrabold uppercase leading-[0.95] tracking-tight text-white md:text-[4rem]">
            Contact <span className="text-accent">Spares Automation</span>
          </h1>
        </div>
      </section>

      <main className="bg-surface py-12 md:py-16">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-5 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4 lg:px-10">
          <ContactCard icon={Phone} title="Technical Sales" copy="+44 (0)161 818 7420" detail="Mon-Fri 07:30-18:00 GMT" />
          <ContactCard icon={Mail} title="Email Enquiries" copy="trade@spares-automation.co.uk" detail="Send product questions or cart details" />
          <ContactCard icon={MessageCircle} title="WhatsApp" copy="+44 (0)161 818 7420" detail="Useful for photos and part numbers" />
          <ContactCard icon={MapPin} title="UK Support" copy="Manchester" detail="Industrial parts and automation support" />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  copy,
  detail,
}: {
  icon: typeof Phone;
  title: string;
  copy: string;
  detail: string;
}) {
  return (
    <article className="border border-rule bg-background p-6">
      <Icon className="h-5 w-5 text-accent" />
      <h2 className="mt-5 font-display text-lg font-bold uppercase tracking-tight">{title}</h2>
      <p className="mt-3 text-sm font-semibold text-ink">{copy}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{detail}</p>
    </article>
  );
}
