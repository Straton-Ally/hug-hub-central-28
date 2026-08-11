import { createFileRoute } from "@tanstack/react-router";

import { CollectionPage } from "@/components/shopify/CollectionPage";
import { getCollection, getLatestProducts } from "@/lib/api/shopify.functions";
import homeImg from "@/assets/Home automation pic.jpg";
import { SITE } from "@/lib/site";

const collectionHandle = "home-controls";
const productLines = [
  {
    slug: "lighting",
    label: "Lighting",
    keywords: ["lighting", "light", "lamp", "led", "dimmer"],
  },
  {
    slug: "security",
    label: "Security",
    keywords: ["security", "alarm", "camera", "cctv", "access control", "motion detector"],
  },
];

export const Route = createFileRoute("/home-controls")({
  validateSearch: (search: Record<string, unknown>) => ({
    line: typeof search.line === "string" ? search.line : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Home Automation and Controls | Spares Automation" },
      {
        name: "description",
        content: "Product range for home automation and control products.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/home-controls` }],
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
  component: HomeControlsPage,
});

function HomeControlsPage() {
  const { collection, products } = Route.useLoaderData();
  const { line } = Route.useSearch();

  return (
    <CollectionPage
      eyebrow="Home Automation and Controls"
      title="HOME AUTOMATION AND CONTROLS"
      image={homeImg}
      imageAlt="Home automation and controls"
      collection={collection}
      fallbackProducts={products}
      expectedHandle={collectionHandle}
      productLines={productLines}
      activeLine={line}
    />
  );
}
