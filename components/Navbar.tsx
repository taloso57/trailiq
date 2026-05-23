"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import { getAlertCount } from "@/lib/alertsStore";

function fireHomeReset() {
  window.dispatchEvent(new CustomEvent("trailiq:reset-home"));
}

export default function Navbar() {
  const { t, toggle, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => setAlertCount(getAlertCount());
    update();
    window.addEventListener("focus", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("focus", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const links = [
    { href: "/",       label: t.nav.home },
    { href: "/browse", label: t.nav.browse },
    { href: "/compare",label: t.nav.compare },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/85 backdrop-blur-2xl border-b border-white/6"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between" style={{ height: "72px" }}>

        {/* Logo */}
        <Link
          href="/"
          onClick={fireHomeReset}
          className="flex items-center gap-2.5 group"
        >
          <span className="relative w-7 h-7 rounded-full bg-white grid place-items-center">
            <span className="block w-2.5 h-2.5 rounded-full bg-black" />
          </span>
          <span className="text-xl font-black tracking-[0.12em] uppercase text-white group-hover:text-white/80 transition-colors duration-200">
            {t.brand}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10 text-lg text-white/50 tracking-[0.08em] uppercase font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={l.href === "/" ? fireHomeReset : undefined}
              className="hover:text-white transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/alerts"
            className="hover:text-white transition-colors duration-200 flex items-center gap-1.5"
          >
            <span className="text-sm">🔔</span>
            <span>{lang === "he" ? "התראות" : "Alerts"}</span>
            {alertCount > 0 && (
              <span className="bg-cyan text-black text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {alertCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="px-3 py-1.5 rounded-sm border border-white/15 text-[10px] font-bold tracking-[0.12em] uppercase text-white/50 hover:text-white hover:border-white/40 transition-all duration-200"
          >
            {lang === "he" ? "EN" : "עב"}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="md:hidden w-9 h-9 grid place-items-center text-white/60 hover:text-white transition-colors"
          >
            {/* Hamburger — 3 lines */}
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <rect width="18" height="1.5" rx="0.75" fill="currentColor" />
              <rect y="5.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
              <rect y="10.5" width="18" height="1.5" rx="0.75" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-black border-b border-white/8"
          >
            <div className="px-6 py-5 flex flex-col gap-4 text-lg tracking-[0.08em] uppercase">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => { setMobileOpen(false); if (l.href === "/") fireHomeReset(); }}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/alerts"
                onClick={() => setMobileOpen(false)}
                className="text-white/50 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>🔔</span>
                <span>{lang === "he" ? "התראות" : "Alerts"}</span>
                {alertCount > 0 && (
                  <span className="bg-cyan text-black text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {alertCount}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
