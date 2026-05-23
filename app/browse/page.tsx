"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import { products, usdToIls, type Product, type Category } from "@/lib/products";
import { useBag } from "@/lib/BagContext";
import PriceAlertModal from "@/components/PriceAlertModal";

type CatFilter = Category | "all";

const CAT_TABS: { value: CatFilter; he: string; en: string }[] = [
  { value: "all",          he: "הכל",      en: "All" },
  { value: "backpack",     he: "תרמילים",  en: "Backpacks" },
  { value: "sleeping_bag", he: "שקי שינה", en: "Sleeping Bags" },
  { value: "sleeping_pad", he: "מזרונים",  en: "Sleeping Pads" },
  { value: "tent",         he: "אוהלים",   en: "Tents" },
  { value: "apparel",      he: "ביגוד",    en: "Apparel" },
];

const CAT_COLOR: Record<Category, string> = {
  backpack:     "#0EA5E9",
  sleeping_bag: "#A855F7",
  sleeping_pad: "#14B8A6",
  tent:         "#22C55E",
  apparel:      "#F97316",
};

const CAT_LABEL: Record<Category, { he: string; en: string }> = {
  backpack:     { he: "תרמיל",   en: "Backpack" },
  sleeping_bag: { he: "שק שינה", en: "Sleeping Bag" },
  sleeping_pad: { he: "מזרון",   en: "Sleeping Pad" },
  tent:         { he: "אוהל",    en: "Tent" },
  apparel:      { he: "ביגוד",   en: "Apparel" },
};

export default function BrowsePage() {
  const { lang } = useLang();
  const { addItem, removeItem, hasItem } = useBag();
  const [catFilter, setCatFilter] = useState<CatFilter>("all");
  const [sortBy, setSortBy] = useState<"rating" | "price" | "weight">("rating");
  const [alertProduct, setAlertProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const base = catFilter === "all" ? products : products.filter((p) => p.category === catFilter);
    return [...base].sort((a, b) => {
      if (sortBy === "price")  return a.price_usd - b.price_usd;
      if (sortBy === "weight") return a.weight_grams - b.weight_grams;
      return b.rating - a.rating;
    });
  }, [catFilter, sortBy]);

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Page header */}
        <div className="mb-16">
          <p className="section-label mb-4">{lang === "he" ? "קטלוג ציוד" : "Gear Catalog"}</p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            {lang === "he" ? "כל הציוד" : "ALL GEAR"}
          </h1>
          <p className="text-white/30 text-sm font-light">
            {lang === "he"
              ? `${products.length} מוצרים ממותגים מובילים`
              : `${products.length} products from top brands`}
          </p>
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 border-b border-white/5 pb-6">
          <div className="flex flex-wrap gap-2">
            {CAT_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setCatFilter(tab.value)}
                className={`px-5 py-2 text-[10px] tracking-[0.14em] uppercase font-bold transition-all duration-200 border ${
                  catFilter === tab.value
                    ? "border-white/60 text-white bg-white/8"
                    : "border-white/10 text-white/35 hover:text-white hover:border-white/25"
                }`}
              >
                {lang === "he" ? tab.he : tab.en}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-black border border-white/10 text-white/50 text-[10px] tracking-[0.12em] uppercase px-4 py-2 outline-none hover:border-white/25 transition-colors cursor-pointer"
          >
            <option value="rating">{lang === "he" ? "מיין: דירוג" : "Sort: Rating"}</option>
            <option value="price">{lang === "he" ? "מיין: מחיר" : "Sort: Price"}</option>
            <option value="weight">{lang === "he" ? "מיין: משקל" : "Sort: Weight"}</option>
          </select>
        </div>

        <p className="text-white/20 text-[10px] tracking-[0.14em] uppercase mb-8">
          {filtered.length} {lang === "he" ? "מוצרים" : "products"}
        </p>

        {/* Product grid — DJI-style black cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5">
          {filtered.map((p, i) => {
            const inBag  = hasItem(p.id);
            const cat    = CAT_LABEL[p.category];
            const catColor = CAT_COLOR[p.category];

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                className="product-card group bg-black flex flex-col"
              >
                {/* Image */}
                <div className="card-image relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={p.image_url}
                    alt={p.name_english}
                    className="w-full h-full object-cover"
                  />

                  {/* Top gradient for badge readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

                  {/* Category + brand stacked in top-start — no horizontal overlap possible */}
                  <div className="absolute top-3 start-3 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: catColor }} />
                      <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-white/85 drop-shadow-sm">
                        {lang === "he" ? cat.he : cat.en}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-white/45 font-medium ps-3">
                      {p.brand}
                    </span>
                  </div>

                  {/* Alert bell */}
                  <button
                    onClick={() => setAlertProduct(p)}
                    className="absolute bottom-3 end-3 w-7 h-7 bg-black/60 border border-white/10 flex items-center justify-center text-xs hover:border-yellow-400/50 hover:bg-yellow-400/10 transition-all duration-200"
                    aria-label="התראת מחיר"
                  >
                    🔔
                  </button>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col border-t border-white/4">
                  {/* Stars */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-yellow-400 text-[10px] tracking-tight">
                      {"★".repeat(Math.round(p.rating))}{"☆".repeat(5 - Math.round(p.rating))}
                    </span>
                    <span className="text-white/25 text-[10px]">{p.rating}</span>
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-white text-xl leading-snug mb-3 flex-1">
                    {p.name_english}
                  </h3>

                  {/* Stats row */}
                  <div className="flex items-end justify-between mb-4">
                    <div className="text-[10px] text-white/30 font-light leading-relaxed">
                      <div>{p.weight_grams >= 1000 ? `${(p.weight_grams / 1000).toFixed(1)} kg` : `${p.weight_grams} g`}</div>
                      {p.waterproof_mm && <div>{p.waterproof_mm.toLocaleString()} mm</div>}
                    </div>
                    <div className="text-end">
                      <span className="text-cyan font-bold text-lg">${p.price_usd}</span>
                      <div className="text-white/20 text-[10px]">₪{usdToIls(p.price_usd)}</div>
                    </div>
                  </div>

                  {/* Action buttons — animate in on hover */}
                  <div className="card-actions flex flex-col gap-1.5">
                    <a
                      href={p.buy_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="cta w-full py-3 text-[11px]"
                    >
                      🛒 {lang === "he" ? "קנה עכשיו" : "Buy Now"}
                    </a>
                    <button
                      onClick={() => (inBag ? removeItem(p.id) : addItem(p))}
                      className={`w-full py-2.5 text-[10px] tracking-[0.1em] uppercase font-semibold border transition-all duration-200 ${
                        inBag
                          ? "border-cyan/40 text-cyan hover:bg-red-500/10 hover:text-red-400 hover:border-red-400/40"
                          : "border-white/12 text-white/40 hover:text-white hover:border-white/30"
                      }`}
                    >
                      {inBag
                        ? lang === "he" ? "✓ בתיק" : "✓ In Bag"
                        : lang === "he" ? "🎒 הוסף לתיק" : "🎒 Add to Bag"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {alertProduct && (
        <PriceAlertModal product={alertProduct} onClose={() => setAlertProduct(null)} />
      )}
    </div>
  );
}
