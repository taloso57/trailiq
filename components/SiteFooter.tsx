"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageProvider";

/** SVG social icons — minimal, inline, aria-labelled */
function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.257 5.626L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
function IconGitHub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

export default function SiteFooter() {
  const { t, lang } = useLang();

  return (
    <footer className="bg-black border-t border-white/5" aria-label="Footer">

      {/* ── Affiliate disclosure strip ── */}
      <div className="border-b border-white/4 bg-white/[0.015] py-3 px-6">
        <p className="max-w-7xl mx-auto text-center text-white/30 text-[10px] tracking-wide leading-relaxed" dir="rtl">
          <span className="text-cyan/50 me-1">*</span>
          האתר מכיל קישורי שותפים. רכישה דרך הקישורים שלנו עשויה לזכות אותנו בעמלה, ללא עלות נוספת עבורך.{" "}
          <Link href="/terms" className="underline decoration-white/20 hover:text-white/50 transition-colors">
            תנאי שימוש
          </Link>
        </p>
      </div>

      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10" dir="rtl">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
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
            <nav className="flex flex-col gap-2.5 text-[11px] text-white/40 tracking-[0.08em] uppercase">
              <Link href="/browse"  className="hover:text-white/70 transition-colors">{t.nav.browse}</Link>
              <Link href="/compare" className="hover:text-white/70 transition-colors">{t.nav.compare}</Link>
              <Link href="/alerts"  className="hover:text-white/70 transition-colors">
                {lang === "he" ? "התראות" : "Alerts"}
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white/30 text-[9px] tracking-[0.2em] uppercase mb-4">
              {lang === "he" ? "משפטי" : "Legal"}
            </p>
            <nav className="flex flex-col gap-2.5 text-[11px] text-white/40 tracking-[0.08em] uppercase">
              <Link href="/terms"         className="hover:text-white/70 transition-colors">
                {lang === "he" ? "תנאי שימוש" : "Terms"}
              </Link>
              <Link href="/privacy"       className="hover:text-white/70 transition-colors">
                {lang === "he" ? "פרטיות" : "Privacy"}
              </Link>
              <Link href="/accessibility" className="hover:text-white/70 transition-colors">
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

        {/* ── Bottom bar: copyright + social ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-white/15 text-[10px] tracking-wide" dir="rtl">
            © 2026 TrailIQ. כל הזכויות שמורות.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            <a
              href="#"
              aria-label="Instagram"
              className="text-white/20 hover:text-white/55 transition-colors duration-200"
            >
              <IconInstagram />
            </a>
            <a
              href="#"
              aria-label="X (Twitter)"
              className="text-white/20 hover:text-white/55 transition-colors duration-200"
            >
              <IconX />
            </a>
            <a
              href="https://github.com/taloso57/trailiq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/20 hover:text-white/55 transition-colors duration-200"
            >
              <IconGitHub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
