import { createFileRoute } from "@tanstack/react-router";

import { CollectionPage } from "@/components/shopify/CollectionPage";
import { getCollection, getLatestProducts } from "@/lib/api/shopify.functions";
import automation from "@/assets/Automation pic.jpg";
import { SITE } from "@/lib/site";

const collectionHandle = "automation";
const productLines = [
  { slug: "contactors", label: "Contactors", keywords: ["contactor"] },
  { slug: "sensors", label: "Sensors", keywords: ["sensor", "proximity", "m18"] },
  {
    slug: "buttons-switches",
    label: "Buttons/Switches",
    keywords: ["button", "pushbutton", "push button", "switch", "selector"],
  },
  {
    slug: "inverter-drives",
    label: "Inverter Drives",
    keywords: ["inverter", "drive", "vfd", "variable frequency"],
  },
];

export const Route = createFileRoute("/automation")({
  validateSearch: (search: Record<string, unknown>) => ({
    line: typeof search.line === "string" ? search.line : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Automation & Drives | Spares Automation" },
      {
        name: "description",
        content: "Product range for automation, drives, and controls.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/automation` }],
  }),
  loader: async () => {
    const collection = await getCollection({ data: { handle: collectionHandle, first: 48 } });
    const products = collection
      ? []
      : await getLatestProducts({
          data: { first: 48, query: `tag:'collection:${collectionHandle}'` },
        });
    return { collection, products };
  },
  component: AutomationPage,
});

function AutomationPage() {
  const { collection, products } = Route.useLoaderData();
  const { line } = Route.useSearch();

  return (
    <CollectionPage
      eyebrow="Automation & Drives"
      title="AUTOMATION / DRIVES"
      image={automation}
      imageAlt="Automation and drives"
      collection={collection}
      fallbackProducts={products}
      expectedHandle={collectionHandle}
      productLines={productLines}
      activeLine={line}
    />
  );
}
