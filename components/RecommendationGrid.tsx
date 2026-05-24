"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import { type Category, type Product, usdToIls } from "@/lib/products";
import { useBag } from "@/lib/BagContext";
import PriceAlertModal from "./PriceAlertModal";
import PackingList from "./PackingList";

interface Recommendation {
  product_id: string;
  reason_hebrew: string;
  reason_english: string;
}

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

export default function RecommendationGrid({
  products,
  recommendations,
  summaryHe = "",
  summaryEn = "",
}: {
  products: Product[];
  recommendations: Recommendation[];
  summaryHe?: string;
  summaryEn?: string;
}) {
  const { lang } = useLang();
  const { addItem, removeItem, hasItem } = useBag();
  const [alertProduct, setAlertProduct] = useState<Product | null>(null);
  const [showPackingList, setShowPackingList] = useState(false);

  const totalWeight = products.reduce((s, p) => s + p.weight_grams, 0);
  const totalUsd    = products.reduce((s, p) => s + p.price_usd, 0);

  if (products.length === 0) return null;

  return (
    <>
      <div className="space-y-8">
        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {products.map((p, i) => {
            const rec      = recommendations.find((r) => r.product_id === p.id);
            const inBag    = hasItem(p.id);
            const catColor = CAT_COLOR[p.category];
            const catLabel = CAT_LABEL[p.category];
            const reason   = rec
              ? (lang === "he" ? rec.reason_hebrew : rec.reason_english)
              : (lang === "he" ? p.description_hebrew : p.description_english);

            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="product-card group bg-black flex flex-col"
              >
                {/* Image */}
                <div className="card-image relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={p.image_url}
                    alt={p.name_english}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

                  {/* Category */}
                  <div className="absolute top-3 start-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: catColor }} />
                    <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-white/70">
                      {lang === "he" ? catLabel.he : catLabel.en}
                    </span>
                  </div>

                  {/* Brand */}
                  <span className="absolute top-3 end-3 text-[9px] uppercase tracking-[0.12em] text-white/30 font-medium">
                    {p.brand}
                  </span>

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
                  {/* Name */}
                  <h3 className="font-bold text-white text-sm leading-snug mb-2" dir="ltr">
                    {p.name_english}
                  </h3>

                  {/* AI reason */}
                  <p className="text-white/30 text-xs leading-relaxed font-light mb-4 line-clamp-3">
                    {reason}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] mb-5 border-t border-white/5 pt-4">
                    <div>
                      <div className="text-white/25 mb-0.5">USD</div>
                      <div className="text-cyan font-bold text-sm">${p.price_usd}</div>
                      <div className="text-white/20">₪{usdToIls(p.price_usd)}</div>
                    </div>
                    <div>
                      <div className="text-white/25 mb-0.5">{lang === "he" ? "משקל" : "Weight"}</div>
                      <div className="text-white font-semibold">{p.weight_grams}g</div>
                    </div>
                    <div>
                      <div className="text-white/25 mb-0.5">{lang === "he" ? "אטימות" : "Waterproof"}</div>
                      <div className="text-white font-semibold">
                        {p.waterproof_mm ? `${p.waterproof_mm}mm` : "—"}
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="card-actions mt-auto flex gap-2">
                    <a
                      href={p.buy_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      title={lang === "he" ? "קישור שותפים — אנו עשויים להרוויח עמלה, ללא עלות נוספת עבורך" : "Affiliate link — we may earn a commission at no extra cost to you"}
                      aria-label={`${lang === "he" ? "קנה עכשיו" : "Buy Now"} — ${p.name_english} (${lang === "he" ? "קישור שותפים" : "affiliate link"})`}
                      className="cta flex-1 py-3 text-[11px]"
                    >
                      🛒 {lang === "he" ? "קנה עכשיו" : "Buy Now"}
                    </a>
                    <button
                      type="button"
                      onClick={() => (inBag ? removeItem(p.id) : addItem(p))}
                      aria-label={inBag
                        ? (lang === "he" ? `הסר ${p.name_english} מהתיק` : `Remove ${p.name_english} from bag`)
                        : (lang === "he" ? `הוסף ${p.name_english} לתיק` : `Add ${p.name_english} to bag`)}
                      className={`px-3 py-3 text-[10px] border transition-all duration-200 ${
                        inBag
                          ? "border-cyan/40 text-cyan hover:bg-red-500/10 hover:text-red-400 hover:border-red-400/40"
                          : "border-white/12 text-white/40 hover:text-white hover:border-white/30"
                      }`}
                    >
                      {inBag ? "✓" : "🎒"}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Summary strip */}
        <div className="bg-black border border-white/6 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-8 text-sm">
            <div>
              <span className="text-white/25 text-[10px] uppercase tracking-[0.14em] me-2">
                {lang === "he" ? "סה״כ משקל" : "Total Weight"}
              </span>
              <span className="text-white font-bold">{(totalWeight / 1000).toFixed(2)} kg</span>
            </div>
            <div>
              <span className="text-white/25 text-[10px] uppercase tracking-[0.14em] me-2">
                {lang === "he" ? "סה״כ עלות" : "Total Cost"}
              </span>
              <span className="text-cyan font-bold">${totalUsd}</span>
              <span className="text-white/25 text-xs ms-1">/ ₪{usdToIls(totalUsd)}</span>
            </div>
          </div>

          {summaryHe && (
            <button
              onClick={() => setShowPackingList(true)}
              className="cta-outline px-6 py-2.5 text-[10px]"
            >
              📋 {lang === "he" ? "רשימת ציוד מלאה" : "Full Packing List"}
            </button>
          )}
        </div>
      </div>

      {alertProduct && (
        <PriceAlertModal product={alertProduct} onClose={() => setAlertProduct(null)} />
      )}

      {showPackingList && (
        <PackingList
          products={products}
          recommendations={recommendations}
          summaryHe={summaryHe}
          summaryEn={summaryEn}
          onClose={() => setShowPackingList(false)}
        />
      )}
    </>
  );
}
