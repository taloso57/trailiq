"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBag } from "@/lib/BagContext";
import { usdToIls } from "@/lib/products";
import type { Category } from "@/lib/products";

const CAT_HE: Record<Category, string> = {
  backpack:     "תיק",
  sleeping_bag: "שק שינה",
  sleeping_pad: "מזרון",
  tent:         "אוהל",
  apparel:      "ביגוד",
};

export default function WeightBar() {
  const { items, removeItem, clearBag, totalWeight, totalCostUsd } = useBag();
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const kg = totalWeight / 1000;
  const weightColor = kg < 10 ? "text-cyan" : kg < 15 ? "text-yellow-400" : "text-red-400";
  const overLimit = kg >= 15;

  const catWeights = items.reduce<Partial<Record<Category, number>>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + p.weight_grams;
    return acc;
  }, {});

  return (
    <>
      {/* Spacer */}
      <div className="h-16" aria-hidden />

      <div className="fixed bottom-0 inset-x-0 z-40">

        {/* Expanded items panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="items"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="bg-black border-t border-white/8 px-6 py-4"
            >
              <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
                {items.map((p) => (
                  <span
                    key={p.id}
                    className="flex items-center gap-2 bg-white/5 border border-white/8 px-3 py-1.5 text-[10px] text-white/70 tracking-[0.08em]"
                  >
                    <span className="max-w-[110px] truncate">{p.name_english}</span>
                    <span className="text-white/30">
                      {p.weight_grams >= 1000 ? `${(p.weight_grams / 1000).toFixed(1)}kg` : `${p.weight_grams}g`}
                    </span>
                    <button
                      onClick={() => removeItem(p.id)}
                      className="text-white/25 hover:text-red-400 transition-colors"
                      aria-label={`Remove ${p.name_english}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main bar — pure black, cyan border, DJI-minimal */}
        <div className="bg-black border-t-2 border-cyan/30 shadow-[0_-8px_40px_rgba(0,212,255,0.15)]">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">

            {/* Bag icon + count */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors shrink-0"
            >
              <span className="text-xl">🎒</span>
              <span className="text-sm font-bold text-white">{items.length}</span>
              <span className="text-[10px] text-white/25 tracking-[0.1em] uppercase">{expanded ? "▼" : "▲"}</span>
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 hidden sm:block" />

            {/* Category breakdown */}
            <div className="hidden sm:flex items-center gap-5 text-[11px] flex-1 min-w-0 overflow-hidden">
              {(Object.entries(catWeights) as [Category, number][]).map(([cat, w]) => (
                <span key={cat} className="whitespace-nowrap text-white/30">
                  {CAT_HE[cat]}{" "}
                  <span className="text-white font-semibold">
                    {w >= 1000 ? `${(w / 1000).toFixed(1)}kg` : `${w}g`}
                  </span>
                </span>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1 sm:hidden" />

            {/* Over-limit warning */}
            {overLimit && (
              <span className="hidden md:flex items-center gap-1.5 text-[10px] text-red-400 font-semibold tracking-[0.1em] uppercase whitespace-nowrap">
                <span>⚠</span> עומס גבוה מ-15kg
              </span>
            )}

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 hidden sm:block" />

            {/* Totals */}
            <div className="flex items-center gap-4 shrink-0 text-sm">
              <div>
                <span className="text-white/30 text-[10px] uppercase tracking-[0.1em] me-2">סה״כ</span>
                <span className={`font-black text-base ${weightColor}`}>{kg.toFixed(2)} kg</span>
              </div>
              <div className="hidden sm:block text-[11px]">
                <span className="text-cyan font-bold">${totalCostUsd}</span>
                <span className="text-white/25 ms-1">/ ₪{usdToIls(totalCostUsd)}</span>
              </div>
            </div>

            {/* Clear */}
            <button
              onClick={clearBag}
              className="text-[10px] tracking-[0.12em] uppercase text-white/25 hover:text-red-400 transition-colors shrink-0 border border-white/8 hover:border-red-400/30 px-4 py-2"
            >
              {`נקה`}
            </button>
          </div>

          {/* Mobile cost */}
          <div className="sm:hidden flex justify-center pb-2 text-xs gap-3">
            <span className="text-cyan font-bold">${totalCostUsd}</span>
            <span className="text-white/25">/ ₪{usdToIls(totalCostUsd)}</span>
            {overLimit && <span className="text-red-400 font-semibold">⚠ מעל 15kg</span>}
          </div>
        </div>
      </div>
    </>
  );
}
