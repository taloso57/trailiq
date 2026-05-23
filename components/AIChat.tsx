"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import type { Product } from "@/lib/products";
import RecommendationGrid from "./RecommendationGrid";

interface Recommendation {
  product_id: string;
  reason_hebrew: string;
  reason_english: string;
}

interface ChatResponse {
  extracted: {
    destination: string | null;
    duration_days: number | null;
    budget_usd: number | null;
    weight_priority: number;
    waterproof_priority: number;
    season: string | null;
    climate: string | null;
    night_low_c: number | null;
    day_high_c: number | null;
  };
  recommendations: Recommendation[];
  products: Product[];
  summary_hebrew: string;
  summary_english: string;
}

const MAX_TEXTAREA_HEIGHT = 260;

export default function AIChat({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { t, lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ChatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [value]);

  async function performSubmit() {
    if (!value.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value, lang }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as ChatResponse;
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(t.common.error);
    } finally {
      setLoading(false);
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    await performSubmit();
  }

  return (
    <div className="w-full">
      <form
        onSubmit={submit}
        className="glass rounded-2xl p-2 md:p-3 flex items-end gap-2 shadow-glow"
      >
        <textarea
          ref={textareaRef}
          dir="auto"
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              performSubmit();
            }
          }}
          placeholder={t.hero.chatPlaceholder}
          className="flex-1 bg-transparent outline-none text-white placeholder:text-muted/70 px-4 py-3 text-base md:text-lg resize-none min-h-[96px] max-h-[260px] leading-relaxed overflow-y-auto"
        />
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="cta px-5 md:px-6 py-3 text-sm md:text-base self-end"
        >
          {loading ? "..." : t.hero.send}
        </button>
      </form>

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-center gap-3 text-muted"
          >
            <span className="compass" />
            <span>{t.common.loading}</span>
          </motion.div>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-red-400 text-sm"
          >
            {error}
          </motion.p>
        )}

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <p className="text-muted mb-6 leading-relaxed">
              {lang === "he" ? result.summary_hebrew : result.summary_english}
            </p>
            <RecommendationGrid
              products={result.products}
              recommendations={result.recommendations}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
