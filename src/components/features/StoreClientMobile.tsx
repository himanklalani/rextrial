"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/features/ProductCard";
import { Product } from "@/types";

interface Props {
  products: Product[];
}

const CATEGORY_LABELS: Record<string, string> = {
  "cat-dotmatrix": "Dotmatrix Printers",
  "cat-laser": "Laser Printers",
  "cat-inktank": "Ink Tank Printers",
};

function HorizontalProductRow({ title, products }: { title: string; products: Product[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <h2 className="text-base font-bold font-outfit text-brand-dark mb-3 px-4">{title}</h2>
      <div
        ref={rowRef}
        className="flex gap-3 overflow-x-auto pb-3 px-4 snap-x snap-mandatory scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start flex-shrink-0 w-[46vw] max-w-[200px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StoreClientMobile({ products }: Props) {
  // Group by category
  const grouped = products.reduce<Record<string, Product[]>>((acc, p) => {
    const key = p.categoryId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(grouped).map(([catId, catProducts]) => (
        <HorizontalProductRow
          key={catId}
          title={CATEGORY_LABELS[catId] ?? catId.replace("cat-", "")}
          products={catProducts}
        />
      ))}
    </div>
  );
}
