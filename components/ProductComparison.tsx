"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import { products, usdToIls, type Product, type Category } from "@/lib/products";

type CatFilter = Category | "all";

const CAT_TABS: { value: CatFilter; he: string; en: string }[] = [
  { value: "all",          he: "הכל",      en: "All" },
  { value: "backpack",     he: "תרמילים",  en: "Backpacks" },
  { value: "sleeping_bag", he: "שקי שינה", en: "Sleeping Bags" },
  { value: "sleeping_pad", he: "מזרונים",  en: "Sleeping Pads" },
  { value: "tent",         he: "אוהלים",   en: "Tents" },
  { value: "apparel",      he: "ביגוד",    en: "Apparel" },
];

const CAT_LABEL: Record<Category, { he: string; en: string }> = {
  backpack:     { he: "תרמיל",   en: "Backpack" },
  sleeping_bag: { he: "שק שינה", en: "Sleeping Bag" },
  sleeping_pad: { he: "מזרון",   en: "Sleeping Pad" },
  tent:         { he: "אוהל",    en: "Tent" },
  apparel:      { he: "ביגוד",   en: "Apparel" },
};

const CAT_COLOR: Record<Category, string> = {
  backpack:     "#0EA5E9",
  sleeping_bag: "#A855F7",
  sleeping_pad: "#14B8A6",
  tent:         "#22C55E",
  apparel:      "#F97316",
};

const BRAND_LIST = [
  "Osprey", "RAB", "Patagonia", "Arc'teryx", "Black Diamond",
  "MSR", "Therm-a-Rest", "Sea to Summit", "Nemo", "Gregory",
  "Salomon", "The North Face", "Deuter", "Mountain Hardwear", "Fjallraven",
];

// Each brand gets a subtle accent color just for its name text
const BRAND_ACCENT: Record<string, string> = {
  "Osprey":            "#FB923C",
  "RAB":               "#F87171",
  "Patagonia":         "#2DD4BF",
  "Arc'teryx":         "#C084FC",
  "Black Diamond":     "#94A3B8",
  "MSR":               "#A78BFA",
  "Therm-a-Rest":      "#4ADE80",
  "Sea to Summit":     "#22D3EE",
  "Nemo":              "#FCD34D",
  "Gregory":           "#60A5FA",
  "Salomon":           "#A3E635",
  "The North Face":    "#FCA5A5",
  "Deuter":            "#FCD34D",
  "Mountain Hardwear": "#818CF8",
  "Fjallraven":        "#34D399",
};

const MAX_WEIGHT_SLIDER     = 5000;
const MAX_WATERPROOF_SLIDER = 30000;
const MAX_VOLUME_SLIDER     = 100;
const PRICE_MAX = Math.max(...products.map((p) => p.price_usd), 100);

// ── Bar helpers ──────────────────────────────────────────────────────────────
function normPct(val: number, lo: number, hi: number, invert = false, minPct = 15): number {
  const range = hi - lo;
  if (range === 0) return Math.round((100 + minPct) / 2);
  const ratio = invert ? (hi - val) / range : (val - lo) / range;
  return Math.round(minPct + ratio * (100 - minPct));
}

function rankCol(val: number, lo: number, hi: number, invert = false): string {
  const range = hi - lo;
  if (range === 0) return "bg-yellow-400";
  const ratio = invert ? (hi - val) / range : (val - lo) / range;
  if (ratio >= 0.67) return "bg-green-400";
  if (ratio >= 0.33) return "bg-yellow-400";
  return "bg-red-400";
}

function StatBar({ pct, color }: { pct: number; color: string }) {
  const w = Math.max(15, Math.min(100, Math.round(pct)));
  return (
    <div className="w-full h-1 bg-white/8 overflow-hidden mt-1">
      <div className={`h-full ${color}`} style={{ width: `${w}%` }} />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-2 text-sm">
      <span className="text-white/30 shrink-0">{label}</span>
      <span className="text-white font-medium text-end">{value || "—"}</span>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductComparison({ onBack }: { onBack: () => void }) {
  const { lang } = useLang();

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [catFilter, setCatFilter]         = useState<CatFilter>("all");
  const [maxWeight, setMaxWeight]         = useState(MAX_WEIGHT_SLIDER);
  const [minWaterproof, setMinWaterproof] = useState(0);
  const [maxVolume, setMaxVolume]         = useState(MAX_VOLUME_SLIDER);
  const [maxPrice, setMaxPrice]           = useState(PRICE_MAX);
  const [showFilters, setShowFilters]     = useState(false);
  const [selected, setSelected]           = useState<string[]>([]);

  const showBrandGrid = selectedBrand === null && catFilter === "all";

  const filtered = useMemo(() => products.filter((p) => {
    if (selectedBrand !== null && p.brand !== selectedBrand) return false;
    if (catFilter !== "all" && p.category !== catFilter)    return false;
    if (p.weight_grams > maxWeight)                         return false;
    if (minWaterproof > 0 && (p.waterproof_mm === null || p.waterproof_mm < minWaterproof)) return false;
    if (maxVolume < MAX_VOLUME_SLIDER && p.volume_liters !== null && p.volume_liters > maxVolume) return false;
    if (p.price_usd > maxPrice)                             return false;
    return true;
  }), [selectedBrand, catFilter, maxWeight, minWaterproof, maxVolume, maxPrice]);

  function toggleProduct(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id)
        : prev.length < 4 ? [...prev, id] : prev,
    );
  }

  const compareProducts: Product[] = selected
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  // Precomputed comparison stats
  const cmpMinW  = compareProducts.length ? Math.min(...compareProducts.map((p) => p.weight_grams)) : 0;
  const cmpMaxW  = compareProducts.length ? Math.max(...compareProducts.map((p) => p.weight_grams)) : 1;
  const cmpMaxWp = compareProducts.length ? Math.max(...compareProducts.map((p) => p.waterproof_mm ?? 0)) : 1;
  const cmpMinP  = compareProducts.length ? Math.min(...compareProducts.map((p) => p.price_usd)) : 0;
  const cmpMaxP  = compareProducts.length ? Math.max(...compareProducts.map((p) => p.price_usd)) : 1;
  const vfmRaw   = compareProducts.map((p) => p.rating * 20 - p.price_usd / 20);
  const vfmMin   = compareProducts.length ? Math.min(...vfmRaw) : 0;
  const vfmMax   = compareProducts.length ? Math.max(...vfmRaw) : 1;

  return (
    <div className="w-full">

      {/* Back */}
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs tracking-[0.14em] uppercase group"
      >
        <svg className="w-3.5 h-3.5 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {lang === "he" ? "חזרה" : "Back"}
      </button>

      {/* Header */}
      <div className="mb-8">
        <p className="section-label mb-3">{lang === "he" ? "השוואה" : "Compare"}</p>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
          {showBrandGrid
            ? (lang === "he" ? "בחר מותג" : "SELECT A BRAND")
            : (lang === "he" ? "בחר עד 4 מוצרים" : "SELECT UP TO 4 PRODUCTS")}
        </h2>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CAT_TABS.map((tab) => {
          const active = catFilter === tab.value && !(tab.value === "all" && showBrandGrid)
            || (tab.value === "all" && showBrandGrid);
          return (
            <button
              key={tab.value}
              onClick={() => { setCatFilter(tab.value); if (tab.value !== "all") setSelectedBrand(null); }}
              className={`px-5 py-2 text-[10px] tracking-[0.14em] uppercase font-bold border transition-all duration-200 ${
                active
                  ? "border-white/60 text-white bg-white/8"
                  : "border-white/10 text-white/30 hover:text-white hover:border-white/25"
              }`}
            >
              {lang === "he" ? tab.he : tab.en}
            </button>
          );
        })}
        {selected.length > 0 && (
          <span className="ms-auto text-[10px] tracking-[0.12em] uppercase">
            <span className="text-cyan font-bold">{selected.length}/4</span>
            <span className="text-white/25 ms-2">{lang === "he" ? "נבחרו" : "selected"}</span>
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">

        {/* ── Brand grid ── */}
        {showBrandGrid && (
          <motion.div
            key="brands"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-px bg-white/5">
              {BRAND_LIST.map((brand, i) => {
                const count  = products.filter((p) => p.brand === brand).length;
                const accent = BRAND_ACCENT[brand] ?? "#ffffff";
                return (
                  <motion.button
                    key={brand}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                    onClick={() => setSelectedBrand(brand)}
                    disabled={count === 0}
                    className={`bg-black hover:bg-[#0a0a0a] border border-transparent hover:border-white/10 px-3 py-5 text-center transition-all duration-200 ${
                      count === 0 ? "opacity-20 cursor-not-allowed" : "group"
                    }`}
                  >
                    <div
                      className="font-bold text-sm leading-snug mb-1 transition-colors duration-200"
                      style={{ color: count > 0 ? accent : "#555" }}
                    >
                      {brand}
                    </div>
                    <div className="text-white/25 text-[10px] tracking-[0.08em] uppercase">
                      {count > 0 ? `${count} product${count !== 1 ? "s" : ""}` : "coming soon"}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Product grid ── */}
        {!showBrandGrid && (
          <motion.div
            key="products"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Sub-header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <button
                onClick={() => { setSelectedBrand(null); setCatFilter("all"); }}
                className="flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-white/30 hover:text-white transition-colors group"
              >
                <svg className="w-3.5 h-3.5 rtl:rotate-180 group-hover:-translate-x-1 transition-transform"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                {lang === "he" ? "חזרה למותגים" : "Back to brands"}
                {selectedBrand && (
                  <span className="ms-1 font-bold text-white/60">· {selectedBrand}</span>
                )}
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-[0.12em] uppercase border transition-all duration-200 ${
                  showFilters ? "border-white/30 text-white" : "border-white/10 text-white/30 hover:text-white"
                }`}
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                {lang === "he" ? "פילטרים" : "Filters"} {showFilters ? "▲" : "▼"}
              </button>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  key="filters"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="bg-black border border-white/8 p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: lang === "he" ? "משקל מקסימלי" : "Max weight",
                        val: maxWeight, setVal: setMaxWeight, min: 100, max: MAX_WEIGHT_SLIDER, step: 100,
                        display: maxWeight >= MAX_WEIGHT_SLIDER ? (lang === "he" ? "הכל" : "Any") : maxWeight >= 1000 ? `${(maxWeight/1000).toFixed(1)} kg` : `${maxWeight} g` },
                      { label: lang === "he" ? "אטימות מינימלית" : "Min waterproof",
                        val: minWaterproof, setVal: setMinWaterproof, min: 0, max: 30000, step: 1000,
                        display: minWaterproof === 0 ? (lang === "he" ? "הכל" : "Any") : `${minWaterproof.toLocaleString()} mm` },
                      { label: lang === "he" ? "נפח מקסימלי" : "Max volume",
                        val: maxVolume, setVal: setMaxVolume, min: 10, max: MAX_VOLUME_SLIDER, step: 5,
                        display: maxVolume >= MAX_VOLUME_SLIDER ? (lang === "he" ? "הכל" : "Any") : `${maxVolume} L` },
                      { label: lang === "he" ? "מחיר מקסימלי" : "Max price",
                        val: maxPrice, setVal: setMaxPrice, min: 50, max: PRICE_MAX, step: 25,
                        display: maxPrice >= PRICE_MAX ? (lang === "he" ? "הכל" : "Any") : `$${maxPrice}` },
                    ].map((f) => (
                      <div key={f.label}>
                        <div className="flex justify-between text-[10px] mb-2 tracking-[0.1em] uppercase">
                          <span className="text-white/30">{f.label}</span>
                          <span className="text-white font-semibold">{f.display}</span>
                        </div>
                        <input type="range" min={f.min} max={f.max} step={f.step}
                          value={f.val} onChange={(e) => f.setVal(Number(e.target.value))}
                          className="w-full" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-white/20 text-[10px] tracking-[0.14em] uppercase mb-5">
              {filtered.length} {lang === "he" ? "מוצרים" : "products"}
              {selected.length > 0 && ` · ${selected.length}/4 ${lang === "he" ? "נבחרו" : "selected"}`}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center text-white/25 py-16 text-sm">
                {lang === "he" ? "אין מוצרים — הרחב את הפילטרים" : "No products — try widening the filters."}
              </div>
            ) : (
              <div
                className="grid gap-px bg-white/5 mb-12"
                style={{ gridTemplateColumns: `repeat(${Math.min(filtered.length, 5)}, minmax(160px, 1fr))` }}
              >
                {filtered.map((product) => {
                  const isChosen = selected.includes(product.id);
                  const canAdd   = !isChosen && selected.length < 4;
                  const catColor = CAT_COLOR[product.category];
                  const catLabel = CAT_LABEL[product.category];

                  return (
                    <div
                      key={product.id}
                      className={`bg-black flex flex-col transition-all duration-200 ${
                        isChosen ? "ring-1 ring-inset ring-cyan/40" : ""
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={product.image_url}
                          alt={product.name_english}
                          className="w-full h-28 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />

                        {/* Category */}
                        <div className="absolute top-2 start-2 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full" style={{ background: catColor }} />
                          <span className="text-[8px] uppercase tracking-[0.14em] text-white/60 font-bold">
                            {lang === "he" ? catLabel.he : catLabel.en}
                          </span>
                        </div>

                        {isChosen && (
                          <span className="absolute top-2 end-2 w-5 h-5 bg-cyan flex items-center justify-center">
                            <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                      </div>

                      <div className="p-2.5 flex flex-col flex-1">
                        <div className="text-white text-base font-bold leading-snug line-clamp-2 mb-0.5">
                          {product.name_english}
                        </div>
                        <div className="text-white/25 text-xs uppercase tracking-[0.1em] mb-2">{product.brand}</div>

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-cyan text-sm font-bold">${product.price_usd}</span>
                          <span className="text-white/25 text-xs">
                            {product.weight_grams >= 1000 ? `${(product.weight_grams/1000).toFixed(1)}kg` : `${product.weight_grams}g`}
                          </span>
                        </div>

                        {/* Buy */}
                        <a
                          href={product.buy_url}
                          target="_blank"
                          rel="noreferrer noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="cta w-full py-1.5 text-[10px] mb-1.5 block text-center"
                        >
                          🛒 {lang === "he" ? "קנה" : "Buy"}
                        </a>

                        {/* Compare toggle */}
                        <button
                          onClick={() => toggleProduct(product.id)}
                          disabled={!isChosen && !canAdd}
                          className={`w-full py-1.5 text-[10px] tracking-[0.1em] uppercase font-semibold border transition-all duration-200 ${
                            isChosen
                              ? "border-cyan/40 text-cyan hover:bg-red-500/10 hover:text-red-400 hover:border-red-400/40"
                              : canAdd
                              ? "border-white/12 text-white/40 hover:text-white hover:border-white/30"
                              : "opacity-20 cursor-not-allowed border-white/5 text-white/20"
                          }`}
                        >
                          {isChosen ? (lang === "he" ? "הסר" : "Remove") : canAdd ? (lang === "he" ? "+ השווה" : "+ Compare") : (lang === "he" ? "מלא" : "Full")}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Comparison table ── */}
      <AnimatePresence>
        {compareProducts.length >= 2 && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="section-label mb-1">{lang === "he" ? "השוואה" : "Side-by-Side"}</p>
                <h3 className="text-2xl md:text-4xl font-black text-white">{lang === "he" ? "השוואה מפורטת" : "DETAILED COMPARISON"}</h3>
              </div>
              <button
                onClick={() => setSelected([])}
                className="text-[10px] tracking-[0.12em] uppercase text-white/25 hover:text-white transition-colors border border-white/8 hover:border-white/25 px-4 py-2"
              >
                {lang === "he" ? "נקה" : "Clear"}
              </button>
            </div>

            <div
              className="grid gap-px bg-white/5"
              style={{ gridTemplateColumns: `repeat(${compareProducts.length}, minmax(200px, 1fr))` }}
            >
              {compareProducts.map((p, idx) => {
                const wPct  = normPct(p.weight_grams, cmpMinW, cmpMaxW, true);
                const wCol  = rankCol(p.weight_grams, cmpMinW, cmpMaxW, true);
                const wpPct = cmpMaxWp > 0 ? normPct(p.waterproof_mm ?? 0, 0, cmpMaxWp) : 0;
                const wpCol = rankCol(p.waterproof_mm ?? 0, 0, cmpMaxWp);
                const pPct  = normPct(p.price_usd, cmpMinP, cmpMaxP, true);
                const pCol  = rankCol(p.price_usd, cmpMinP, cmpMaxP, true);
                const vPct  = normPct(vfmRaw[idx], vfmMin, vfmMax, false, 15);
                const vCol  = rankCol(vfmRaw[idx], vfmMin, vfmMax, false);
                const rColor = p.rating >= 4.5 ? "text-green-400" : p.rating >= 3.5 ? "text-yellow-400" : "text-red-400";
                const catColor = CAT_COLOR[p.category];
                const catLabel = CAT_LABEL[p.category];

                return (
                  <div
                    key={p.id}
                    className="bg-black p-5 flex flex-col gap-4 min-w-0"
                  >
                    {/* Image */}
                    <img src={p.image_url} alt={p.name_english} className="w-full h-36 object-cover" />

                    {/* Name + brand */}
                    <div>
                      <div className="text-white font-bold text-xl leading-snug">{p.name_english}</div>
                      <div className="text-white/30 text-sm uppercase tracking-[0.1em] mt-0.5">{p.brand}</div>
                    </div>

                    {/* Category badge */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: catColor }} />
                      <span className="text-xs uppercase tracking-[0.14em] text-white/40 font-bold">
                        {lang === "he" ? catLabel.he : catLabel.en}
                      </span>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-3 border-t border-white/5 pt-4">
                      {/* Price */}
                      <div>
                        <Row label={lang === "he" ? "מחיר (USD)" : "Price (USD)"} value={`$${p.price_usd}`} />
                        <StatBar pct={pPct} color={pCol} />
                      </div>
                      <Row label={lang === "he" ? "מחיר (ILS)" : "Price (ILS)"} value={`₪${usdToIls(p.price_usd)}`} />

                      {/* Weight */}
                      <div>
                        <Row
                          label={lang === "he" ? "משקל" : "Weight"}
                          value={p.weight_grams >= 1000 ? `${(p.weight_grams/1000).toFixed(2)} kg` : `${p.weight_grams} g`}
                        />
                        <StatBar pct={wPct} color={wCol} />
                      </div>

                      {/* Waterproof */}
                      {p.waterproof_mm !== null && (
                        <div>
                          <Row label={lang === "he" ? "אטימות" : "Waterproof"} value={`${p.waterproof_mm.toLocaleString()} mm`} />
                          <StatBar pct={wpPct} color={wpCol} />
                        </div>
                      )}

                      {/* Value for money */}
                      <div>
                        <div className="flex justify-between items-start gap-2 text-sm">
                          <span className="text-white/30 shrink-0">{lang === "he" ? "תמורה לכסף" : "Value for money"}</span>
                          <span className={`font-bold ${vCol.replace("bg-", "text-")}`}>{vPct}%</span>
                        </div>
                        <StatBar pct={vPct} color={vCol} />
                      </div>

                      {/* Rating */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/30">{lang === "he" ? "דירוג" : "Rating"}</span>
                        <span className={`font-bold ${rColor}`}>
                          {"★".repeat(Math.round(p.rating))}{"☆".repeat(Math.max(0, 5 - Math.round(p.rating)))} {p.rating}
                        </span>
                      </div>

                      {p.volume_liters !== null && <Row label={lang === "he" ? "נפח" : "Volume"} value={`${p.volume_liters} L`} />}
                      {p.temperature_rating !== null && <Row label={lang === "he" ? "טמפרטורה" : "Temp rating"} value={`${p.temperature_rating}°C`} />}
                      {p.r_value !== null && <Row label="R-value" value={`R ${p.r_value}`} />}

                      {p.tags.length > 0 && (
                        <div>
                          <div className="text-white/25 text-xs uppercase tracking-[0.12em] mb-1.5">{lang === "he" ? "תגיות" : "Tags"}</div>
                          <div className="flex flex-wrap gap-1">
                            {p.tags.map((tag) => (
                              <span key={tag} className="text-xs px-2 py-0.5 bg-white/5 text-white/35 tracking-[0.06em]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Buy Now CTA — full-width */}
                    <a
                      href={p.buy_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta mt-auto text-center text-sm py-4 block w-full"
                    >
                      🛒 {lang === "he" ? "קנה עכשיו ←" : "Buy Now →"}
                    </a>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
