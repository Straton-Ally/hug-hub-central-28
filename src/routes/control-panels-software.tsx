import { createFileRoute } from "@tanstack/react-router";

import controls from "@/assets/Control panels and software pic.jpg";
import { CollectionPage } from "@/components/shopify/CollectionPage";
import { getCollection, getLatestProducts } from "@/lib/api/shopify.functions";
import { SITE } from "@/lib/site";

const collectionHandle = "control-panels-software";
const productLines = [
  {
    slug: "control-panels",
    label: "Control Panels",
    keywords: ["control panel", "panel", "cabinet", "enclosure"],
  },
  {
    slug: "software-design-programming",
    label: "Software Design and Programming",
    keywords: ["software", "programming", "program", "plc", "hmi", "scada"],
  },
];

export const Route = createFileRoute("/control-panels-software")({
  validateSearch: (search: Record<string, unknown>) => ({
    line: typeof search.line === "string" ? search.line : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Control Panels and Software | Spares Automation" },
      {
        name: "description",
        content: "Control panels, PLC software, upgrades, and automation support.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/control-panels-software` }],
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
  component: ControlPanelsSoftwarePage,
});

function ControlPanelsSoftwarePage() {
  const { collection, products } = Route.useLoaderData();
  const { line } = Route.useSearch();

  return (
    <CollectionPage
      eyebrow="Automation Support"
      title="CONTROL PANELS & SOFTWARE"
      image={controls}
      imageAlt="Industrial control panel and automation software"
      collection={collection}
      fallbackProducts={products}
      expectedHandle={collectionHandle}
      productLines={productLines}
      activeLine={line}
    />
  );
}
