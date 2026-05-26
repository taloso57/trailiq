"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import type { Product } from "@/lib/products";
import RecommendationGrid, { type WeatherData } from "./RecommendationGrid";

interface Recommendation {
  product_id: string;
  reason_hebrew: string;
  reason_english: string;
}

interface ChatResponse {
  products: Product[];
  recommendations: Recommendation[];
  summary_hebrew: string;
  summary_english: string;
  weather?: WeatherData | null;
}

export default function FreeChat({
  initialMessage = "",
  onBack,
}: {
  initialMessage?: string;
  onBack: () => void;
}) {
  const { lang } = useLang();
  const [message, setMessage] = useState(initialMessage);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ChatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialMessage) setMessage(initialMessage);
  }, [initialMessage]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 260)}px`;
  }, [message]);

  async function doSubmit(msg: string) {
    if (!msg.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, lang }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setResult((await res.json()) as ChatResponse);
    } catch {
      setError(
        lang === "he" ? "אופס, משהו השתבש. נסה שוב." : "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-muted hover:text-white transition text-sm group"
      >
        <svg
          className="w-4 h-4 transition group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {lang === "he" ? "חזרה" : "Back"}
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {lang === "he" ? "ספר לנו על הטיול שלך" : "Tell us about your trip"}
        </h2>
        <p className="text-muted text-sm">
          {lang === "he"
            ? "תאר את היעד, המשך, העונה והתקציב — בעברית או באנגלית"
            : "Describe your destination, duration, season and budget — in Hebrew or English"}
        </p>
      </div>

      <form
        onSubmit={(e: FormEvent) => { e.preventDefault(); doSubmit(message); }}
        className="glass rounded-2xl p-3 flex items-end gap-2 shadow-glow"
      >
        <textarea
          ref={textareaRef}
          dir="auto"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); doSubmit(message); }
          }}
          placeholder={
            lang === "he"
              ? "לאן אתה נוסע? ספר לי על הטיול שלך..."
              : "Where are you going? Tell me about your trip..."
          }
          className="flex-1 bg-transparent outline-none text-white placeholder:text-muted/70 px-4 py-3 text-base resize-none min-h-[96px] max-h-[260px] leading-relaxed overflow-y-auto"
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="cta px-5 py-3 text-sm self-end"
        >
          {loading ? "..." : lang === "he" ? "מצא ציוד" : "Find Gear"}
        </button>
      </form>

      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-6 flex items-center gap-3 text-muted"
          >
            <span className="compass" />
            <span>{lang === "he" ? "מחפש ציוד מושלם..." : "Finding perfect gear..."}</span>
          </motion.div>
        )}
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-4 text-red-400 text-sm"
          >
            {error}
          </motion.p>
        )}
        {result && !loading && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <p className="text-muted mb-6 leading-relaxed">
              {lang === "he" ? result.summary_hebrew : result.summary_english}
            </p>
            <RecommendationGrid
                products={result.products}
                recommendations={result.recommendations}
                summaryHe={result.summary_hebrew}
                summaryEn={result.summary_english}
                weather={result.weather}
              />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
