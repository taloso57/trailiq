"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { usdToIls } from "@/lib/products";

interface Recommendation {
  product_id: string;
  reason_hebrew: string;
  reason_english: string;
}

interface Props {
  products: Product[];
  recommendations: Recommendation[];
  summaryHe: string;
  summaryEn: string;
  onClose: () => void;
}

const GENERAL_CHECKLIST = [
  {
    section: "🔦 בטיחות",
    items: [
      "פנס ראש + סוללות רזרביות",
      "ערכת עזרה ראשונה",
      "שריקת חירום",
      "מסנן מים / טבליות ניקוי",
      "ספריי חרקים",
      "שמיכת חירום (מיילר)",
    ],
  },
  {
    section: "🍶 אוכל ומים",
    items: [
      "בקבוק מים (2L+)",
      "מזון לחירום (בר אנרגיה)",
      "כלי בישול קל",
      "גז + מצת / גפרורים",
    ],
  },
  {
    section: "🗺️ ניווט",
    items: ["מפה מודפסת", "מצפן", "GPS / טלפון מטעון", "כבל טעינה + סוללה נייד"],
  },
  {
    section: "📄 מסמכים",
    items: [
      "דרכון / תעודת זהות",
      "ביטוח נסיעות",
      "כסף מזומן",
      "עותק מסמכים (צילום)",
    ],
  },
  {
    section: "👕 ביגוד בסיסי",
    items: [
      "גרביים x3 (לחות-הרחקה)",
      "כובע שמש / כובע חורף",
      "משקפי שמש UV400",
      "כפפות (בעונת קור)",
    ],
  },
  {
    section: "🧴 היגיינה",
    items: [
      "קרם הגנה SPF50+",
      "שפתון הגנה",
      "מגבת מיקרופייבר",
      "ניקוי ידיים / אנטיספטי",
    ],
  },
];

export default function PackingList({ products, summaryHe, onClose }: Props) {
  // Checkbox state for recommended products
  const [checkedProducts, setCheckedProducts] = useState<Set<string>>(new Set());
  // Checkbox state for general items (key = "sectionIdx-itemIdx")
  const [checkedGeneral, setCheckedGeneral] = useState<Set<string>>(new Set());

  const totalWeight = products.reduce((s, p) => s + p.weight_grams, 0);
  const totalCost   = products.reduce((s, p) => s + p.price_usd, 0);

  function toggleProduct(id: string) {
    setCheckedProducts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleGeneral(key: string) {
    setCheckedGeneral((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  // Build plain-text version for sharing
  function buildShareText(): string {
    const lines: string[] = ["📋 רשימת ציוד לטיול — TrailIQ", "", summaryHe, ""];
    lines.push("=== מוצרים מומלצים ===");
    for (const p of products) {
      lines.push(
        `☐ ${p.name_english} | ${p.brand} | ${p.weight_grams}g | $${p.price_usd}`,
      );
    }
    lines.push("", `סה"כ: ${(totalWeight / 1000).toFixed(2)}kg | $${totalCost}`, "");
    lines.push("=== ציוד נוסף ===");
    for (const sec of GENERAL_CHECKLIST) {
      lines.push(`\n${sec.section}`);
      for (const item of sec.items) lines.push(`☐ ${item}`);
    }
    lines.push("\n—\nנוצר עם TrailIQ");
    return lines.join("\n");
  }

  const shareText = buildShareText();

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ direction: "rtl" }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm no-print" onClick={onClose} />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 m-4 md:m-8 flex flex-col rounded-2xl overflow-hidden max-h-[90vh] bg-[#0c1120] border border-white/10 print:m-0 print:max-h-none print:border-0 print:rounded-none print:bg-white print:text-black"
        id="packing-list-print"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0f1e]/80 print:bg-white print:border-gray-200 no-print-border">
          <div>
            <h2 className="text-white font-bold text-lg print:text-black">📋 רשימת ציוד לטיול</h2>
            <p className="text-muted text-xs mt-0.5 print:text-gray-600">{summaryHe}</p>
          </div>
          <div className="flex items-center gap-2 no-print">
            {/* Print */}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/10 text-xs text-muted hover:text-white transition"
            >
              🖨️ הדפס
            </button>
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600/20 border border-green-500/30 text-xs text-green-400 hover:bg-green-600/30 transition"
            >
              📱 WhatsApp
            </a>
            {/* Email */}
            <a
              href={`mailto:?subject=${encodeURIComponent("רשימת ציוד לטיול — TrailIQ")}&body=${encodeURIComponent(shareText)}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/10 text-xs text-muted hover:text-white transition hidden sm:flex"
            >
              📧 אימייל
            </a>
            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-muted hover:text-white transition text-lg"
            >
              ×
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-8 print:overflow-visible">

          {/* Trip totals row */}
          <div className="flex flex-wrap gap-4 text-sm text-muted border-b border-white/5 pb-4 print:border-gray-200 print:text-gray-600">
            <span>⚖️ סה״כ משקל: <strong className="text-white print:text-black">{(totalWeight / 1000).toFixed(2)} kg</strong></span>
            <span>💰 עלות מוצרים: <strong className="text-white print:text-black">${totalCost} · ₪{usdToIls(totalCost)}</strong></span>
          </div>

          {/* === SECTION A === */}
          <section>
            <h3 className="text-cyan font-bold text-base mb-4 flex items-center gap-2 print:text-black">
              <span className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center text-xs font-bold print:bg-gray-200">א</span>
              מוצרים מומלצים מהאתר
            </h3>
            <div className="space-y-2">
              {products.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    checkedProducts.has(p.id)
                      ? "border-green-500/30 bg-green-500/5"
                      : "border-white/8 glass hover:border-white/20"
                  } print:border-gray-200 print:bg-white`}
                >
                  <input
                    type="checkbox"
                    checked={checkedProducts.has(p.id)}
                    onChange={() => toggleProduct(p.id)}
                    className="w-4 h-4 accent-cyan-400 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-sm font-medium leading-snug print:text-black ${
                          checkedProducts.has(p.id) ? "text-muted line-through" : "text-white"
                        }`}
                        dir="ltr"
                      >
                        {p.name_english}
                      </span>
                      <a
                        href={p.buy_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-cyan hover:underline shrink-0 no-print print:hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        קנה עכשיו →
                      </a>
                    </div>
                    <div className="flex gap-3 text-xs text-muted mt-0.5 print:text-gray-500">
                      <span>{p.brand}</span>
                      <span>·</span>
                      <span>
                        {p.weight_grams >= 1000
                          ? `${(p.weight_grams / 1000).toFixed(1)}kg`
                          : `${p.weight_grams}g`}
                      </span>
                      <span>·</span>
                      <span>${p.price_usd}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* === SECTION B === */}
          <section>
            <h3 className="text-orange font-bold text-base mb-4 flex items-center gap-2 print:text-black">
              <span className="w-6 h-6 rounded-full bg-orange/20 flex items-center justify-center text-xs font-bold print:bg-gray-200">ב</span>
              ציוד נוסף לטיול
            </h3>
            <div className="space-y-6">
              {GENERAL_CHECKLIST.map((sec, si) => (
                <div key={si}>
                  <h4 className="text-white text-sm font-semibold mb-2 print:text-black">{sec.section}</h4>
                  <div className="space-y-1.5">
                    {sec.items.map((item, ii) => {
                      const key = `${si}-${ii}`;
                      return (
                        <label
                          key={key}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                            checkedGeneral.has(key)
                              ? "opacity-50"
                              : "hover:bg-white/4"
                          } print:hover:bg-white`}
                        >
                          <input
                            type="checkbox"
                            checked={checkedGeneral.has(key)}
                            onChange={() => toggleGeneral(key)}
                            className="w-4 h-4 accent-cyan-400 shrink-0"
                          />
                          <span
                            className={`text-sm print:text-black ${
                              checkedGeneral.has(key) ? "text-muted line-through" : "text-white/80"
                            }`}
                          >
                            {item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-white/5 pt-4 text-center text-xs text-muted print:border-gray-200 print:text-gray-400">
            נוצר עם TrailIQ · trailiq.app
          </div>
        </div>
      </motion.div>
    </div>
  );
}
