"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import ChatSection from "@/components/ChatSection";
import FeatureCards from "@/components/FeatureCards";
import HeroVideo from "@/components/HeroVideo";

const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full grid place-items-center text-white/20">
      <span className="compass" />
    </div>
  ),
});

export default function HomePage() {
  const { t, lang } = useLang();
  const [mapQuery,    setMapQuery]    = useState("");
  const [mapExpanded, setMapExpanded] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  function scrollToChat() {
    chatRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      {/*
       * Layout (flex column, no justify-center so rows don't overlap):
       *
       *   ┌──────────────────────────────────┐  ← section top
       *   │  flex-1 (pt-28 clears navbar)    │
       *   │  headline + subtitle + CTAs       │  centered inside flex-1
       *   ├──────────────────────────────────┤
       *   │  map zone (desktop only)         │  natural height at bottom
       *   └──────────────────────────────────┘  ← section bottom
       *
       * Video layers live absolutely behind everything (z 1-4).
       */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">

        {/* ── Background video (z-[1..3]) ── */}
        <HeroVideo />

        {/* ── Subtle cyan radial glow (z-[4]) ── */}
        <div className="absolute inset-0 z-[4] bg-hero-glow pointer-events-none" />

        {/* ── Headline + CTAs — flex-1 pushes map zone to bottom ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full pt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            {/* Brand label */}
            <p className="section-label mb-6 text-cyan">{t.brand}</p>

            {/* Main headline */}
            <h1
              className="font-black leading-[0.88] tracking-tight text-white mb-8"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
            >
              {lang === "he" ? (
                <>
                  הציוד<br />
                  <span
                    className="text-cyan"
                    style={{ textShadow: "0 0 40px rgba(0,212,255,0.55), 0 0 80px rgba(0,212,255,0.25)" }}
                  >הנכון.</span><br />
                  לכל<br />
                  הרפתקה.
                </>
              ) : (
                <>
                  THE RIGHT<br />
                  <span
                    className="text-cyan"
                    style={{ textShadow: "0 0 40px rgba(0,212,255,0.55), 0 0 80px rgba(0,212,255,0.25)" }}
                  >GEAR.</span><br />
                  EVERY<br />
                  ADVENTURE.
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-white/40 text-base font-light leading-relaxed mb-12 max-w-sm">
              {lang === "he"
                ? "בינה מלאכותית שמתאימה לך את הציוד המושלם לכל יעד בעולם."
                : "AI that matches you with the perfect gear for any destination on earth."}
            </p>

            {/* CTAs */}
            <div
              className={`flex gap-4 items-center flex-wrap ${
                lang === "he" ? "flex-row-reverse justify-end" : ""
              }`}
            >
              <button onClick={scrollToChat} className="cta px-9 py-4 text-[11px]">
                {lang === "he" ? "מצא ציוד" : "Find My Gear"}
              </button>
              <Link href="/browse" className="cta-outline px-9 py-4 text-[11px]">
                {lang === "he" ? "כל הציוד" : "Browse All"}
              </Link>
            </div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-16 flex items-center gap-3 text-white/20 text-[10px] tracking-[0.2em] uppercase"
            >
              <span className="block w-6 h-px bg-white/20" />
              {lang === "he" ? "גלול למטה" : "Scroll"}
            </motion.div>
          </motion.div>
        </div>

        {/* ── Floating map widget — sits at the bottom, desktop only ── */}
        {/*
         * This is a flex sibling (not absolute), so it naturally pushes the
         * content div upward and never overlaps the headline text.
         * direction:ltr keeps the widget pinned left even in RTL (Hebrew) mode.
         */}
        <div className="relative z-10 hidden md:block px-8 pb-8" style={{ direction: "ltr" }}>
          <AnimatePresence mode="wait" initial={false}>

            {mapExpanded ? (
              /* ── Expanded map card ─────────────────────────────────────── */
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{    opacity: 0, scale: 0.88, y: 16 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
                style={{ width: 350, height: 250 }}
              >
                {/* Minimize button — top-right of card */}
                <button
                  onClick={() => setMapExpanded(false)}
                  className="
                    absolute top-2.5 right-2.5 z-10
                    w-6 h-6 rounded-full
                    bg-black/80 border border-white/15
                    flex items-center justify-center
                    text-[10px] text-white/40
                    hover:text-white hover:border-white/40
                    transition-all duration-200
                  "
                  aria-label="Minimize map"
                >
                  ✕
                </button>

                {/* Map container with rounded corners + glow */}
                <div
                  className="w-full h-full overflow-hidden"
                  style={{
                    borderRadius: 16,
                    border:      "1px solid rgba(0,212,255,0.20)",
                    boxShadow:
                      "0 0 0 1px rgba(0,212,255,0.06), " +   // inner ring
                      "0 0 24px rgba(0,212,255,0.14), "  +   // cyan glow
                      "0 20px 50px rgba(0,0,0,0.75)",         // drop shadow
                    background: "#080808",
                  }}
                >
                  <Globe3D onSelect={(query) => setMapQuery(query)} />
                </div>

                {/* Label strip along the bottom edge */}
                <div
                  className="
                    absolute bottom-0 inset-x-0 flex items-center justify-between
                    px-3 pb-1.5 pt-5 pointer-events-none
                    text-[8px] uppercase tracking-[0.16em] text-white/25
                  "
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                    borderRadius: "0 0 16px 16px",
                  }}
                >
                  <span>{lang === "he" ? "בחר יעד" : "Pick a destination"}</span>
                  <span className="text-cyan/50">🌍</span>
                </div>
              </motion.div>

            ) : (
              /* ── Collapsed toggle button ───────────────────────────────── */
              <motion.button
                key="collapsed"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1   }}
                exit={{    opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMapExpanded(true)}
                className="
                  w-12 h-12 rounded-2xl
                  bg-black/85 border border-cyan/25
                  flex items-center justify-center text-xl
                  hover:border-cyan/55 hover:scale-110
                  transition-all duration-300
                "
                style={{
                  boxShadow:
                    "0 0 18px rgba(0,212,255,0.14), " +
                    "0 8px 20px rgba(0,0,0,0.55)",
                }}
                aria-label="Expand map"
              >
                🗺️
              </motion.button>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* ── CHAT SECTION ──────────────────────────────────────────────────── */}
      <section
        ref={chatRef}
        className="bg-black border-t border-white/5 py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <ChatSection initialMessage={mapQuery} />
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <FeatureCards />

      {/* Footer is rendered globally by SiteFooter in layout.tsx */}
    </>
  );
}
