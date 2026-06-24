import { createFileRoute } from "@tanstack/react-router";

import { CollectionPage } from "@/components/shopify/CollectionPage";
import { getCollection, getLatestProducts } from "@/lib/api/shopify.functions";
import concrete from "@/assets/concrete-plant.jpg";

const collectionHandle = "concrete";
const productLines = [
  { slug: "batching", label: "Batching", keywords: ["batch", "hopper", "aggregate"] },
  { slug: "mixers", label: "Mixers", keywords: ["mixer", "paddle", "shaft", "liner"] },
  { slug: "silos", label: "Silos", keywords: ["silo", "filter", "aerator"] },
  { slug: "weighing", label: "Weighing", keywords: ["weigh", "load cell", "scale"] },
  { slug: "valves", label: "Valves", keywords: ["valve", "butterfly", "pneumatic"] },
];

export const Route = createFileRoute("/concrete")({
  validateSearch: (search: Record<string, unknown>) => ({
    line: typeof search.line === "string" ? search.line : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Concrete Spares | Spares Automation" },
      {
        name: "description",
        content: "Product range for ready-mix concrete plant spares.",
      },
    ],
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
  component: ConcretePage,
});

function ConcretePage() {
  const { collection, products } = Route.useLoaderData();
  const { line } = Route.useSearch();

  return (
    <CollectionPage
      eyebrow="Catalogue / Heavy Plant / Vertical 02"
      title="READY-MIX / CONCRETE"
      accent="amber"
      image={concrete}
      imageAlt="Ready-mix concrete plant"
      intro="Comprehensive parts support for ready-mix concrete plants, batching systems, mixers, silos, and valves."
      collection={collection}
      fallbackProducts={products}
      expectedHandle={collectionHandle}
      productLines={productLines}
      activeLine={line}
    />
  );
}
