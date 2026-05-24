"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────
 * Accessibility Widget
 * ─────────────────────────────────────────────────────────────────────
 * Applies modes by toggling classes on <html> and setting inline
 * filter styles (so high-contrast + grayscale can combine cleanly).
 * All prefs are persisted to localStorage under STORAGE_KEY.
 */

const STORAGE_KEY = "trailiq-a11y";

type A11ySettings = {
  highContrast:   boolean;
  largeText:      boolean;
  highlightLinks: boolean;
  grayscale:      boolean;
};

const DEFAULT: A11ySettings = {
  highContrast:   false,
  largeText:      false,
  highlightLinks: false,
  grayscale:      false,
};

function applyToDOM(s: A11ySettings) {
  const html = document.documentElement;

  // CSS filter — combine high-contrast and grayscale cleanly
  const filters: string[] = [];
  if (s.highContrast) filters.push("contrast(1.6) brightness(1.05)");
  if (s.grayscale)    filters.push("grayscale(100%)");
  html.style.filter = filters.join(" ");

  // Class-based modes
  html.classList.toggle("a11y-large-text",      s.largeText);
  html.classList.toggle("a11y-highlight-links",  s.highlightLinks);
}

const OPTIONS: {
  key:   keyof A11ySettings;
  label: string;
  icon:  string;
  desc:  string;
}[] = [
  { key: "highContrast",   label: "ניגודיות גבוהה",   icon: "◑",  desc: "הגדל ניגודיות צבעים" },
  { key: "largeText",      label: "טקסט גדול",         icon: "Aא", desc: "הגדל גופנים ב-30%" },
  { key: "highlightLinks", label: "הדגשת קישורים",     icon: "🔗", desc: "קו תחתי לכל הקישורים" },
  { key: "grayscale",      label: "גווני אפור",         icon: "◻",  desc: "הצג האתר בגווני אפור" },
];

export default function AccessibilityWidget() {
  const [open, setOpen]         = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT);
  const panelRef  = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // ── Load saved prefs on mount ────────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULT, ...JSON.parse(raw) } as A11ySettings;
        setSettings(parsed);
        applyToDOM(parsed);
      }
    } catch {}
  }, []);

  // ── Persist + apply whenever settings change ─────────────────────────
  useEffect(() => {
    applyToDOM(settings);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {}
  }, [settings]);

  // ── Keyboard: Escape closes, focus returns to trigger ───────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // ── Move focus into panel when it opens ──────────────────────────────
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const first = panelRef.current?.querySelector<HTMLElement>(
          "button, [href], input, select, [tabindex]:not([tabindex='-1'])"
        );
        first?.focus();
      }, 60);
    }
  }, [open]);

  // ── Focus trap: Tab cycles inside panel ──────────────────────────────
  function handlePanelKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return;
    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), [href], input, select, [tabindex]:not([tabindex='-1'])"
      ) ?? []
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function toggle(key: keyof A11ySettings) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function reset() {
    setSettings(DEFAULT);
  }

  const anyActive = Object.values(settings).some(Boolean);

  return (
    /* direction:ltr so the panel always opens to the right of the button,
       even when the page is RTL */
    <div className="fixed bottom-5 left-5 z-[9998] flex flex-col items-start gap-2" style={{ direction: "ltr" }}>

      {/* ── Panel ─────────────────────────────────────────────────── */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="הגדרות נגישות"
          onKeyDown={handlePanelKeyDown}
          className="w-64 rounded-2xl overflow-hidden"
          style={{
            background:  "#0a0a0a",
            border:      "1px solid rgba(0,212,255,0.22)",
            boxShadow:
              "0 0 0 1px rgba(0,212,255,0.06), " +
              "0 0 30px rgba(0,212,255,0.08), " +
              "0 20px 60px rgba(0,0,0,0.85)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07]">
            <div className="flex items-center gap-2">
              <span className="text-cyan text-base" aria-hidden="true">♿</span>
              <span className="text-white text-[11px] font-bold tracking-[0.14em] uppercase">נגישות</span>
            </div>
            <button
              onClick={() => { setOpen(false); triggerRef.current?.focus(); }}
              aria-label="סגור חלונית נגישות"
              className="w-6 h-6 flex items-center justify-center rounded-full text-white/35 hover:text-white hover:bg-white/8 transition-all duration-150 text-xs"
            >
              ✕
            </button>
          </div>

          {/* Options */}
          <div className="p-2 space-y-1" dir="rtl">
            {OPTIONS.map(({ key, label, icon, desc }) => {
              const active = settings[key];
              return (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  aria-pressed={active}
                  aria-label={`${label}: ${active ? "פעיל" : "כבוי"}. לחץ להחלפה`}
                  className={`
                    w-full flex items-center justify-between gap-3
                    px-3 py-2.5 rounded-xl text-right
                    border transition-all duration-150 cursor-pointer
                    ${active
                      ? "bg-cyan/12 border-cyan/30 text-cyan"
                      : "bg-transparent border-transparent text-white/50 hover:bg-white/[0.04] hover:text-white/80 hover:border-white/8"
                    }
                  `}
                >
                  {/* Toggle pill */}
                  <span
                    className={`shrink-0 w-8 h-[18px] rounded-full flex items-center transition-all duration-200 ${
                      active ? "bg-cyan" : "bg-white/15"
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-200 mx-0.5 ${
                        active ? "translate-x-[14px]" : "translate-x-0"
                      }`}
                    />
                  </span>

                  {/* Label + icon */}
                  <span className="flex-1 flex items-center justify-end gap-2">
                    <span className="flex flex-col items-end">
                      <span className="text-[12px] font-semibold leading-tight">{label}</span>
                      <span className="text-[10px] text-white/25 leading-tight font-normal">{desc}</span>
                    </span>
                    <span className="text-base w-5 text-center shrink-0" aria-hidden="true">{icon}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reset */}
          <div className="px-2 pb-3">
            <button
              onClick={reset}
              disabled={!anyActive}
              aria-label="אפס את כל הגדרות הנגישות לברירת המחדל"
              className="
                w-full py-2.5 rounded-xl text-[11px] tracking-[0.1em] uppercase font-bold
                border border-white/[0.07] text-white/25
                hover:text-white/55 hover:border-white/18
                disabled:opacity-25 disabled:cursor-not-allowed
                transition-all duration-150
              "
            >
              איפוס הגדרות
            </button>
          </div>
        </div>
      )}

      {/* ── Trigger button ─────────────────────────────────────────── */}
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "סגור חלונית נגישות" : "פתח חלונית נגישות"}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls="a11y-panel"
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          text-xl transition-all duration-300
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2
          ${anyActive
            ? "bg-cyan text-black border-2 border-cyan scale-110"
            : "bg-[#0a0a0a] text-white/80 border-2 border-cyan/30 hover:border-cyan/65 hover:scale-105"
          }
        `}
        style={{
          boxShadow: anyActive
            ? "0 0 0 5px rgba(0,212,255,0.18), 0 8px 28px rgba(0,0,0,0.6)"
            : "0 0 20px rgba(0,212,255,0.10), 0 8px 24px rgba(0,0,0,0.55)",
        }}
      >
        <span aria-hidden="true">♿</span>
      </button>

    </div>
  );
}
