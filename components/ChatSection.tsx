"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import GuidedQuestionnaire from "./GuidedQuestionnaire";
import FreeChat from "./FreeChat";
import ProductComparison from "./ProductComparison";

type Mode = "select" | "guided" | "free" | "compare";

export default function ChatSection({ initialMessage = "" }: { initialMessage?: string }) {
  const { lang } = useLang();
  const [mode, setMode] = useState<Mode>(initialMessage ? "free" : "select");
  const [pendingMessage, setPendingMessage] = useState(initialMessage);

  useEffect(() => {
    const handler = () => { setMode("select"); setPendingMessage(""); };
    window.addEventListener("trailiq:reset-home", handler);
    return () => window.removeEventListener("trailiq:reset-home", handler);
  }, []);

  function enterFree(msg = "") {
    setPendingMessage(msg);
    setMode("free");
  }

  function backToSelect() {
    setPendingMessage("");
    setMode("select");
  }

  const cards = [
    {
      id: "guided",
      emoji: "◎",
      color: "cyan",
      title: lang === "he" ? "עזור לי לבחור" : "Help me choose",
      body:  lang === "he"
        ? "לא בטוח מה צריך? נשאל כמה שאלות ונמצא ציוד מושלם"
        : "Not sure what you need? We'll ask a few questions",
      cta:   lang === "he" ? "התחל" : "Start",
      onClick: () => setMode("guided"),
    },
    {
      id: "free",
      emoji: "◈",
      color: "orange",
      title: lang === "he" ? "ספר לי על הטיול" : "Tell me about your trip",
      body:  lang === "he"
        ? "שתף את הפרטים ונמצא ציוד מותאם לך"
        : "Share your plans and we'll find the right gear",
      cta:   lang === "he" ? "התחל" : "Start",
      onClick: () => enterFree(),
    },
    {
      id: "compare",
      emoji: "⊞",
      color: "green",
      title: lang === "he" ? "השוואת מוצרים" : "Compare products",
      body:  lang === "he"
        ? "השווה בין חברות ומוצרים — כל המידע במקום אחד"
        : "Compare brands and products side by side",
      cta:   lang === "he" ? "השווה" : "Compare",
      onClick: () => setMode("compare"),
    },
  ] as const;

  const colorMap = {
    cyan:   { border: "hover:border-cyan/25", glow: "text-cyan",   bg: "bg-cyan/8" },
    orange: { border: "hover:border-orange/25", glow: "text-orange/80", bg: "bg-orange/8" },
    green:  { border: "hover:border-green-400/25", glow: "text-green-400", bg: "bg-green-400/8" },
  } as const;

  return (
    <AnimatePresence mode="wait">
      {mode === "select" && (
        <motion.div
          key="select"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          {/* Header */}
          <div className="mb-12">
            <p className="section-label mb-3">
              {lang === "he" ? "איך נוכל לעזור?" : "How can we help?"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {lang === "he" ? "מצא את הציוד המושלם" : "FIND YOUR PERFECT GEAR"}
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {cards.map((card, i) => {
              const c = colorMap[card.color];
              return (
                <motion.button
                  key={card.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={card.onClick}
                  className={`group bg-black text-start p-8 border border-transparent ${c.border} transition-all duration-300`}
                >
                  {/* Icon */}
                  <div className={`text-2xl mb-6 ${c.glow} font-light transition-transform duration-300 group-hover:scale-110`}>
                    {card.emoji}
                  </div>

                  <h3 className="text-white font-bold text-base mb-2 tracking-tight">{card.title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed font-light mb-6">{card.body}</p>

                  {/* CTA line */}
                  <div className={`flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold ${c.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <span>{card.cta}</span>
                    <span className="rtl:rotate-180">→</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {mode === "guided" && (
        <motion.div key="guided" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="w-full">
          <GuidedQuestionnaire onBack={backToSelect} />
        </motion.div>
      )}

      {mode === "free" && (
        <motion.div key="free" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="w-full">
          <FreeChat initialMessage={pendingMessage} onBack={backToSelect} />
        </motion.div>
      )}

      {mode === "compare" && (
        <motion.div key="compare" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="w-full">
          <ProductComparison onBack={backToSelect} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
