"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageProvider";
import { useExchangeRate } from "@/lib/ExchangeRateContext";

export default function SiteFooter() {
  const { t, lang } = useLang();
  const { rate } = useExchangeRate();

  return (
    <footer className="border-t border-blue/10" style={{ background: "#030811" }} aria-label="Footer">

      {/* ── Blue gradient accent line at very top ── */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent 0%, #0066FF 30%, #00D4FF 70%, transparent 100%)" }}
      />

      {/* ── Affiliate disclosure strip ── */}
      <div className="border-b border-white/4 bg-white/[0.015] py-3 px-6">
        <p className="max-w-7xl mx-auto text-center text-white/30 text-[10px] tracking-wide leading-relaxed" dir={lang === "he" ? "rtl" : "ltr"}>
          <span className="text-cyan/50 me-1">*</span>
          {lang === "he"
            ? "האתר מכיל קישורי שותפים. רכישה דרך הקישורים שלנו עשויה לזכות אותנו בעמלה, ללא עלות נוספת עבורך."
            : "This site contains affiliate links. Purchases through our links may earn us a commission, at no extra cost to you."
          }{" "}
          <Link href="/terms" className="underline decoration-white/20 hover:text-white/50 transition-colors">
            {lang === "he" ? "תנאי שימוש" : "Terms"}
          </Link>
        </p>
      </div>

      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10" dir={lang === "he" ? "rtl" : "ltr"}>

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <img src="/logo.svg" alt="TrailIQ" style={{ height: '70px', width: 'auto', marginBottom: '8px' }} />
            <p className="text-white font-black tracking-[0.15em] uppercase text-sm mb-2">{t.brand}</p>
            <p className="text-white/25 text-[11px] leading-relaxed">
              {lang === "he"
                ? "הציוד הנכון לכל הרפתקה — המלצות מבוססות AI לטיולים."
                : "The right gear for every adventure — AI-powered recommendations."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/30 text-[9px] tracking-[0.2em] uppercase mb-4">
              {lang === "he" ? "ניווט" : "Navigate"}
            </p>
            <nav className="flex flex-col gap-1 text-[11px] text-white/40 tracking-[0.08em] uppercase">
              <Link href="/browse"  className="hover:text-white/70 transition-colors flex items-center" style={{ minHeight: "44px" }}>{t.nav.browse}</Link>
              <Link href="/compare" className="hover:text-white/70 transition-colors flex items-center" style={{ minHeight: "44px" }}>{t.nav.compare}</Link>
              <Link href="/about"   className="hover:text-white/70 transition-colors flex items-center" style={{ minHeight: "44px" }}>{t.nav.about}</Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white/30 text-[9px] tracking-[0.2em] uppercase mb-4">
              {lang === "he" ? "משפטי" : "Legal"}
            </p>
            <nav className="flex flex-col gap-1 text-[11px] text-white/40 tracking-[0.08em] uppercase">
              <Link href="/terms"         className="hover:text-white/70 transition-colors flex items-center" style={{ minHeight: "44px" }}>
                {lang === "he" ? "תנאי שימוש" : "Terms"}
              </Link>
              <Link href="/privacy"       className="hover:text-white/70 transition-colors flex items-center" style={{ minHeight: "44px" }}>
                {lang === "he" ? "פרטיות" : "Privacy"}
              </Link>
              <Link href="/accessibility" className="hover:text-white/70 transition-colors flex items-center" style={{ minHeight: "44px" }}>
                {lang === "he" ? "נגישות" : "Accessibility"}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/30 text-[9px] tracking-[0.2em] uppercase mb-4">
              {lang === "he" ? "צור קשר" : "Contact"}
            </p>
            <a
              href="mailto:info@trailiq.co.il"
              className="text-[11px] text-white/40 hover:text-white/70 transition-colors tracking-wide"
            >
              info@trailiq.co.il
            </a>
          </div>

        </div>

        {/* ── Bottom bar: copyright + rate + social ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-blue/8">
          <div className="flex items-center gap-5" dir="rtl">
            <p className="text-white/15 text-[10px] tracking-wide">
              © 2026 TrailIQ. {lang === "he" ? "כל הזכויות שמורות." : "All rights reserved."}
            </p>
            <span className="text-white/12 text-[10px] tracking-wide">
              {lang === "he" ? "שער יציג" : "ILS Rate"}: ₪{rate.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
