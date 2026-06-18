import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut, PackageSearch, ShieldCheck, User } from "lucide-react";
import { useEffect, useState } from "react";

import { SiteHeader } from "@/components/shopify/SiteHeader";
import {
  getCustomerAccountProfile,
  getCustomerAuthStatus,
  logoutCustomer,
} from "@/lib/api/customer-account.functions";
import {
  getShopifyCustomer,
  logoutShopifyCustomer,
} from "@/lib/api/shopify.functions";

type AuthStatus = Awaited<ReturnType<typeof getCustomerAuthStatus>>;
type CustomerProfile = Awaited<ReturnType<typeof getCustomerAccountProfile>>;
type StorefrontCustomer = Awaited<ReturnType<typeof getShopifyCustomer>>;

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

function AccountPage() {
  const [status, setStatus] = useState<AuthStatus | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [storefrontCustomer, setStorefrontCustomer] = useState<StorefrontCustomer>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAccount() {
      try {
        const nextStatus = await getCustomerAuthStatus();
        setStatus(nextStatus);
        if (nextStatus.loggedIn) {
          setProfile(await getCustomerAccountProfile());
        }
        
        const sfCustomer = await getShopifyCustomer();
        setStorefrontCustomer(sfCustomer);
      } finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, []);

  async function handleLogout() {
    await logoutCustomer();
    await logoutShopifyCustomer();
    window.location.href = "/";
  }

  const displayName =
    storefrontCustomer?.displayName ||
    storefrontCustomer?.firstName ||
    profile?.displayName ||
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    "Customer Account";
  const email = storefrontCustomer?.email || profile?.email;

  const isLoggedIn = storefrontCustomer || status?.loggedIn;

  return (
    <div className="min-h-screen bg-background text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="mb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">
            Shopify Customer Account
          </div>
          <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight">
            Account
          </h1>
        </div>

        {loading ? (
          <div className="border border-rule bg-surface px-8 py-16 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
            Loading account
          </div>
        ) : !isLoggedIn ? (
          <section className="border border-rule bg-surface p-8">
            <User className="mb-5 h-8 w-8 text-accent" />
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              Sign in to view your trade account
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
              Customer account access is handled by Shopify, then returned securely to this site.
            </p>
            <Link
              to="/login"
              className="mt-8 inline-flex h-11 items-center justify-center bg-accent px-5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Sign in
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <section className="border border-rule bg-surface p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center bg-accent text-accent-foreground">
                <User className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                {displayName}
              </h2>
              {email && (
                <p className="mt-3 text-sm text-ink-muted">
                  {email}
                </p>
              )}
              {storefrontCustomer?.phone && (
                <p className="mt-2 text-sm text-ink-muted">
                  {storefrontCustomer.phone}
                </p>
              )}
            </section>

            <aside className="space-y-4">
              <Link
                to="/products"
                className="flex items-center justify-between border border-rule bg-surface p-5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors hover:border-accent hover:text-accent"
              >
                Browse catalogue <PackageSearch className="h-4 w-4" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-between border border-rule bg-surface p-5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors hover:border-accent hover:text-accent"
              >
                Sign out <LogOut className="h-4 w-4" />
              </button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
