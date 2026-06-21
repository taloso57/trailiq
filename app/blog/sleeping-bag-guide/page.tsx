"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageProvider";

const ParallaxHero = () => {
  const { lang } = useLang();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = 1 + scrollY * 0.0008;
  const opacity = Math.max(0, 1 - scrollY * 0.0015);
  const translateY = scrollY * 0.6;

  return (
    <div className="hero-mobile-small" style={{ position: 'relative', overflow: 'hidden' }}>
      <img
        src="https://images.pexels.com/photos/10762580/pexels-photo-10762580.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Sleeping bags in forest tent"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '130%',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: `translateY(${translateY}px) scale(${scale})`,
          willChange: 'transform',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))',
        zIndex: 5,
      }} />
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        opacity: opacity,
        transform: `translateY(${translateY * 0.3}px)`,
      }}>
        <h1 style={{
          color: 'white',
          fontSize: 'clamp(2rem,6vw,5rem)',
          fontWeight: 900,
          textAlign: 'center',
          textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          padding: '0 1rem',
        }}>
          {lang === 'he' ? 'המדריך המלא לשקי שינה' : 'The Complete Sleeping Bag Guide'}
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: '1.2rem',
          marginTop: '1rem',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)',
        }}>
          {lang === 'he' ? 'איך לבחור שק שינה לפי מזג אוויר ויעד' : 'How to Choose a Sleeping Bag for Any Climate and Destination'}
        </p>
        <div style={{
          marginTop: '2rem',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.9rem',
          animation: 'bounce 2s infinite',
        }}>
          ↓
        </div>
      </div>
    </div>
  );
};

const TEMP_RATINGS = {
  he: [
    { level: "Comfort — נוחות", color: "#22C55E", rgb: "34,197,94", icon: "😊",
      desc: "לפי תקן ISO 23537 — הטמפרטורה שבה אישה ממוצעת ישנה בנוחות מלאה, לא מכורבלת. זהו הדירוג הרלוונטי ביותר לרכישה. שקי שינה לנשים מדורגים בדרך כלל גבוה ב-5 מעלות — גוף האישה מייצר פחות חום." },
    { level: "Limit — גבול", color: "#F59E0B", rgb: "245,158,11", icon: "😬",
      desc: "הטמפרטורה שבה גבר ממוצע ישן מכורבל, ללא נוחות מלאה. מתחת לגבול זה קיימת סכנה ממשית. לעולם אל תתכננו טיול לפי דירוג Limit." },
    { level: "Extreme — קיצוני", color: "#EF4444", rgb: "239,68,68", icon: "⚠️",
      desc: "גבול הישרדות בלבד — קיים סיכון היפותרמיה. זהו דירוג בטיחות, לא דירוג נוחות. לעולם אל תתכננו טיול לפי Extreme — זה גבול שרידה, לא שינה." },
  ],
  en: [
    { level: "Comfort Rating", color: "#22C55E", rgb: "34,197,94", icon: "😊",
      desc: "Per ISO 23537 standard — temperature where an average woman sleeps comfortably, not curled up. This is the most relevant rating for purchase decisions. Women's bags are typically rated 5°C warmer to compensate for lower heat output." },
    { level: "Lower Limit Rating", color: "#F59E0B", rgb: "245,158,11", icon: "😬",
      desc: "Temperature where an average man can sleep curled up, without full comfort. Below this, real danger exists. Never plan a trip to the Limit rating — always use Comfort as your baseline." },
    { level: "Extreme Rating", color: "#EF4444", rgb: "239,68,68", icon: "⚠️",
      desc: "Survival threshold only — hypothermia risk exists. This is a safety rating, NOT a comfort rating. Never plan any trip based on the Extreme rating. It is a survival floor, not a sleeping temperature." },
  ],
};

const FILL_POWER = {
  he: [
    { fp: "550–600 Fill Power", label: "תקציבי / ברמת כניסה", pct: 30, color: "#94A3B8",
      desc: "נוצות ברמה בסיסית — כבדות יותר ואורזות לנפח גדול. מתאים לטיולים מזדמנים ותקציב מצומצם." },
    { fp: "650–700 Fill Power", label: "ערך מצוין לרוב המטיילים", pct: 55, color: "#B8C4E8",
      desc: "האיזון הטוב ביותר בין מחיר לביצועים. קל מספיק לטיולים רב-יומיים. הבחירה הנפוצה ביותר." },
    { fp: "750–850 Fill Power", label: "איכות גבוהה / רצינית", pct: 78, color: "#A78BFA",
      desc: "קל וניתן לאריזה קלה — הפרש מורגש בתיק. מתאים למטיילים מנוסים שאין להם פשרות על משקל." },
    { fp: "900+ Fill Power", label: "פרימיום / אולטרה-לייט", pct: 100, color: "#6C63FF",
      desc: "הטוב ביותר בשוק. שקי דאון פרימיום מגיעים ל-950+ FP — מהגבוה ביותר שניתן לרכוש. פרמיום במחיר, אך ההבדל מורגש בכל טיול." },
  ],
  en: [
    { fp: "550–600 Fill Power", label: "Budget / Entry-Level", pct: 30, color: "#94A3B8",
      desc: "Basic down fill — heavier and packs larger. Suitable for occasional trips on a tight budget." },
    { fp: "650–700 Fill Power", label: "Best Value for Most Hikers", pct: 55, color: "#B8C4E8",
      desc: "Best balance of price and performance. Light enough for multi-day trips. The most widely chosen range by tested hikers." },
    { fp: "750–850 Fill Power", label: "High Quality / Serious Hiking", pct: 78, color: "#A78BFA",
      desc: "Noticeably lighter and more packable. The difference shows up in your pack. Right choice for experienced hikers who don't compromise on weight." },
    { fp: "900+ Fill Power", label: "Premium / Ultralight", pct: 100, color: "#6C63FF",
      desc: "Best available. Premium down bags reach 950+ fill — among the highest commercially available. Premium price, but the weight savings are real on every trip." },
  ],
};

const DOWN_COLS = {
  he: {
    downTitle: "🪶 מילוי טבעי", downSub: "ברווז / אווז",
    synTitle: "🧵 מילוי סינתטי", synSub: "פוליאסטר / סינתטי",
    pros: "✅ יתרונות", cons: "⚠️ חסרונות",
    downPros: ["קל יותר — ביחס חום/משקל הטוב ביותר בשוק","קומפקטי — שקים איכותיים שוקלים פחות מ-750 גרם לשימוש ב-3 עונות","עמיד עשרות שנים עם טיפול נכון","תחושה רכה ונוחה יותר"],
    downCons: ["מאבד בידוד כמעט מוחלט כשרטוב — מסוכן בגשם מתמשך","מתייבש לאט","יקר משמעותית — פי 2–3 מסינתטי מקביל","דורש שטיפה בחומר מיוחד לנוצות — לא סבון רגיל"],
    synPros: ["שומר על 80–90% מהבידוד גם כשרטוב — בטוח יותר בגשם","מתייבש מהיר","זול יותר — נגיש לכולם","ידידותי לאלרגיים, ניתן לשטוף בחומר רגיל"],
    synCons: ["כבד יותר — 1–1.5 ק\"ג לשק 3-עונות לעומת 450–700 גרם לדאון","אורז לנפח גדול יותר","מתבלה מהר יותר — מאבד נפח לאחר 3–5 שנים","פחות נוח לתחושה"],
    rec: "המלצה:",
    recText: "באזורים עם גשם תכוף (פטגוניה, סקנדינביה, בריטניה) — סינתטי בעדיפות ברורה. לאזורים יבשים (שביל ישראל, הימלאיה בעונה יבשה, מדבר) — טבעי מציע ביצועים טובים יותר במשקל נמוך משמעותית.",
  },
  en: {
    downTitle: "🪶 Down Fill", downSub: "Duck / Goose",
    synTitle: "🧵 Synthetic Fill", synSub: "Polyester / Synthetic",
    pros: "✅ Pros", cons: "⚠️ Cons",
    downPros: ["Lighter — best warmth-to-weight ratio available","Packs small — quality down bags weigh under 750g for 3-season use","Lasts decades with proper care and down wash","Softer, more comfortable loft feel"],
    downCons: ["Loses nearly all insulation when wet — dangerous in sustained rain","Dries slowly","Significantly more expensive — 2–3× the cost of comparable synthetic","Requires a specialized down-specific wash — not regular detergent"],
    synPros: ["Retains 80–90% insulation when wet — safer in rain","Dries fast","More affordable — accessible for all budgets","Allergy-friendly, machine washable with regular detergent"],
    synCons: ["Heavier — 1–1.5 kg for a 3-season bag vs. 450–700g for equivalent down","Packs to larger volume","Shorter lifespan — loses loft after 3–5 years of regular use","Less comfortable loft feel"],
    rec: "Recommendation:",
    recText: "In wet climates (Patagonia, Scandinavia, UK, Pacific Northwest) — synthetic is the clear winner. In dry regions (Israel Trail, Himalayas in dry season, desert) — down delivers significantly better performance at much lower weight.",
  },
};

const PACK_SIZES = {
  he: [
    { label: "שק שינה קל", weight: "300–500 גרם", vol: "2–5 ליטר", color: "#22C55E", rgb: "34,197,94" },
    { label: "אולטרה-לייט 3 עונות", weight: "450–700 גרם", vol: "3–6 ליטר", color: "#6C63FF", rgb: "108,99,255" },
    { label: "דאון תקני 3 עונות", weight: "700 גרם–1 ק\"ג", vol: "5–9 ליטר", color: "#A78BFA", rgb: "167,139,250" },
    { label: "סינתטי תקציבי 3 עונות", weight: "1–1.5 ק\"ג", vol: "8–14 ליטר", color: "#B8C4E8", rgb: "184,196,232" },
    { label: "חורף (−10°C ומטה)", weight: "1.2–1.8 ק\"ג", vol: "10–15 ליטר", color: "#F59E0B", rgb: "245,158,11" },
  ],
  en: [
    { label: "Summer Quilt", weight: "300–500g", vol: "2–5L packed", color: "#22C55E", rgb: "34,197,94" },
    { label: "Ultralight 3-Season", weight: "450–700g", vol: "3–6L packed", color: "#6C63FF", rgb: "108,99,255" },
    { label: "Standard Down 3-Season", weight: "700g–1kg", vol: "5–9L packed", color: "#A78BFA", rgb: "167,139,250" },
    { label: "Budget Synthetic 3-Season", weight: "1–1.5kg", vol: "8–14L packed", color: "#B8C4E8", rgb: "184,196,232" },
    { label: "Winter Bag (−10°C+)", weight: "1.2–1.8kg", vol: "10–15L packed", color: "#F59E0B", rgb: "245,158,11" },
  ],
};

const UI = {
  he: {
    badge: "שינה בשטח",
    subtitle: "מדירוגי טמפרטורה ועד מילוי טבעי — כל מה שצריך לדעת",
    intro: "שק שינה הוא ההבדל בין לילה של מנוחה אמיתית לבין שעות של רעד מקור. מרבית המטיילים קונים שק שינה עם דירוג גבוה מדי לתנאים שלהם — ובלילות הקרים, הם מרגישים את זה.",
    secTemp: "דירוגי טמפרטורה (תקן ISO 23537)", tempScale: "סולם טמפרטורה",
    tempProTipText: "כלל הזהב: בחרו שק שינה עם דירוג Comfort נמוך ב-5–10 מעלות מהטמפרטורה הנמוכה שתצפו אליה. לילות בשטח תמיד מורגשים קרים יותר ממה שהתחזית מציגה. לנשים: דירוגי Comfort סטנדרטיים מחושבים לגוף גברי — שקי שינה לנשים מפצים על כך ומדורגים גבוה ב-5 מעלות.",
    secFill: "כוח מילוי (Fill Power)",
    fillSubtext: "Fill Power מודד כמה קוב-אינץ' נפח תופס אאונס אחד של נוצות. ככל שהמספר גבוה יותר, הנוצות קלות ויעילות יותר. שקי פרימיום מגיעים ל-950+ FP — מהגבוה ביותר בשוק.",
    secCompare: "מילוי טבעי מול סינתטי",
    secPack: "משקל וגודל אריזה — לפי קטגוריה",
    related: "מאמרים נוספים",
    share: "שתפו:", backToBlog: "← חזרה לבלוג",
    rel1badge: "ציוד בסיסי", rel1title: "איך לבחור תיק גב לטיול?",
    rel2badge: "טיפים", rel2title: "טעויות נפוצות בבחירת ציוד טיול",
    nextLink: "טעויות נפוצות בציוד →",
  },
  en: {
    badge: "Sleep Gear",
    subtitle: "Temperature ratings, fill types & everything you need to know",
    intro: "A sleeping bag is the difference between a night of real rest and hours of shivering. Most hikers buy a bag rated too warm for their conditions — and on cold nights, they feel it.",
    secTemp: "Temperature Ratings (ISO 23537 Standard)", tempScale: "Temperature Scale",
    tempProTipText: "Golden rule: choose a sleeping bag with a Comfort rating 5–10°C below the coldest temperature you expect. Nights in the field always feel colder than the forecast. For women: standard Comfort ratings are calculated for a male body — women's-specific bags compensate by rating 5°C warmer.",
    secFill: "Fill Power",
    fillSubtext: "Fill power measures how many cubic inches one ounce of down lofts to. Higher = lighter and more efficient insulation. Premium down bags reach 950+ fill — among the highest commercially available.",
    secCompare: "Down vs. Synthetic Fill",
    secPack: "Weight & Packed Size by Category",
    related: "More Articles",
    share: "Share:", backToBlog: "← Back to Blog",
    rel1badge: "Gear Basics", rel1title: "How to Choose a Backpack",
    rel2badge: "Tips", rel2title: "5 Common Gear Mistakes to Avoid",
    nextLink: "Common Gear Mistakes →",
  },
};

export default function SleepingBagGuidePage() {
  const { lang } = useLang();
  const S = UI[lang];
  const temps = TEMP_RATINGS[lang];
  const fills = FILL_POWER[lang];
  const dc = DOWN_COLS[lang];
  const sizes = PACK_SIZES[lang];

  return (
    <div className="min-h-screen bg-[#0D0B1F]" dir={lang === 'he' ? 'rtl' : 'ltr'}>

      <ParallaxHero />

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <p className="mt-10 mb-14" style={{ color: "#B8C4E8", fontSize: "1.1rem", lineHeight: "1.9" }}>
          <span style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 0.85, color: "#6C63FF", marginInlineEnd: "0.06em", display: "inline-block", verticalAlign: "bottom" }}>
            {S.intro.charAt(0)}
          </span>
          {S.intro.slice(1)}
        </p>

        {/* Temperature Ratings */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#6C63FF,#A78BFA)" }} />
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ letterSpacing: "-0.02em", background: "linear-gradient(135deg,#6C63FF,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{S.secTemp}</h2>
          </div>
          <div className="rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid rgba(108,99,255,0.25)", background: "rgba(13,11,31,0.8)" }}>
            <div className="p-5 border-b" style={{ borderColor: "rgba(108,99,255,0.15)" }}>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">{S.tempScale}</p>
              <div className="relative h-3 rounded-full overflow-hidden">
                <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,#3B82F6 0%,#22C55E 33%,#F59E0B 66%,#EF4444 100%)" }} />
              </div>
              <div className="flex justify-between mt-1.5">
                {lang === 'he'
                  ? [["#EF4444","קר מאוד"],["#F59E0B","קר"],["#22C55E","נוח"],["#4A9EFF","חמים"]].map(([c,l])=><span key={l} className="text-xs" style={{color:c}}>{l}</span>)
                  : [["#EF4444","Very Cold"],["#F59E0B","Cold"],["#22C55E","Comfortable"],["#4A9EFF","Warm"]].map(([c,l])=><span key={l} className="text-xs" style={{color:c}}>{l}</span>)
                }
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(108,99,255,0.1)" }}>
              {temps.map(r => (
                <div key={r.level} className="flex items-start gap-4 p-5">
                  <span style={{ fontSize: "1.75rem", lineHeight: 1, flexShrink: 0 }}>{r.icon}</span>
                  <div>
                    <h3 className="font-black text-sm mb-1" style={{ color: r.color }}>{r.level}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.72 }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }}>
            <div className="flex items-start gap-3">
              <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>💡</span>
              <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.85 }}>{S.tempProTipText}</p>
            </div>
          </div>
        </section>

        {/* Fill Power */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#A78BFA,#6C63FF)" }} />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{S.secFill}</h2>
          </div>
          <p className="text-sm mb-6" style={{ color: "#B8C4E8", opacity: 0.72 }}>{S.fillSubtext}</p>
          <div className="space-y-3">
            {fills.map(f => (
              <div key={f.fp} className="rounded-2xl p-5" style={{ background: "rgba(13,11,31,0.7)", border: "1px solid rgba(108,99,255,0.2)" }}>
                <div className="flex items-start justify-between mb-3 gap-4">
                  <div>
                    <h3 className="font-black text-base" style={{ color: f.color }}>{f.fp}</h3>
                    <p className="text-xs" style={{ color: "#B8C4E8", opacity: 0.5 }}>{f.label}</p>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${f.pct}%`, background: `linear-gradient(90deg,${f.color},rgba(108,99,255,0.7))` }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.68 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Down vs Synthetic */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#4A9EFF,#6C63FF)" }} />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{S.secCompare}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Down */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(13,11,31,0.7)", border: "1px solid rgba(74,158,255,0.3)" }}>
              <div className="px-5 py-4" style={{ background: "linear-gradient(135deg,rgba(74,158,255,0.15) 0%,rgba(74,158,255,0.03) 100%)", borderBottom: "1px solid rgba(74,158,255,0.2)" }}>
                <h3 className="font-black text-white text-base">{dc.downTitle}</h3>
                <p className="text-xs" style={{ color: "#4A9EFF" }}>{dc.downSub}</p>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#22C55E" }}>{dc.pros}</p>
                  <ul className="space-y-1.5">{dc.downPros.map(v=><li key={v} className="flex items-start gap-2 text-sm" style={{color:"#B8C4E8",opacity:0.78}}><span style={{color:"#22C55E",flexShrink:0}}>+</span>{v}</li>)}</ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#EF4444" }}>{dc.cons}</p>
                  <ul className="space-y-1.5">{dc.downCons.map(v=><li key={v} className="flex items-start gap-2 text-sm" style={{color:"#B8C4E8",opacity:0.6}}><span style={{color:"#EF4444",flexShrink:0}}>−</span>{v}</li>)}</ul>
                </div>
              </div>
            </div>
            {/* Synthetic */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(13,11,31,0.7)", border: "1px solid rgba(249,115,22,0.3)" }}>
              <div className="px-5 py-4" style={{ background: "linear-gradient(135deg,rgba(249,115,22,0.15) 0%,rgba(249,115,22,0.03) 100%)", borderBottom: "1px solid rgba(249,115,22,0.2)" }}>
                <h3 className="font-black text-white text-base">{dc.synTitle}</h3>
                <p className="text-xs" style={{ color: "#F97316" }}>{dc.synSub}</p>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#22C55E" }}>{dc.pros}</p>
                  <ul className="space-y-1.5">{dc.synPros.map(v=><li key={v} className="flex items-start gap-2 text-sm" style={{color:"#B8C4E8",opacity:0.78}}><span style={{color:"#22C55E",flexShrink:0}}>+</span>{v}</li>)}</ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#EF4444" }}>{dc.cons}</p>
                  <ul className="space-y-1.5">{dc.synCons.map(v=><li key={v} className="flex items-start gap-2 text-sm" style={{color:"#B8C4E8",opacity:0.6}}><span style={{color:"#EF4444",flexShrink:0}}>−</span>{v}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }}>
            <div className="flex items-start gap-3">
              <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>💡</span>
              <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.85 }}>
                <strong className="text-white">{dc.rec}</strong>{" "}{dc.recText}
              </p>
            </div>
          </div>
        </section>

        {/* Packed Size */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#00D4FF,#6C63FF)" }} />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{S.secPack}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {sizes.map(s => (
              <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: `rgba(${s.rgb},0.06)`, border: `1px solid rgba(${s.rgb},0.25)` }}>
                <p className="text-xs mb-2" style={{ color: "#B8C4E8", opacity: 0.55 }}>{s.label}</p>
                <p className="font-black text-sm mb-1" style={{ color: s.color }}>{s.weight}</p>
                <p className="text-xs" style={{ color: "#00D4FF", opacity: 0.75 }}>{s.vol}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <div className="mb-14">
          <p className="font-black text-lg mb-6" style={{ color: "#A78BFA" }}>{S.related}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([{ href: "/blog/how-to-choose-backpack", badge: S.rel1badge, title: S.rel1title }, { href: "/blog/common-gear-mistakes", badge: S.rel2badge, title: S.rel2title }]).map(a => (
              <Link key={a.href} href={a.href} className="block group rounded-xl p-5 relative overflow-hidden transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#1a1040 0%,#0d1f4a 100%)", border: "1px solid rgba(108,99,255,0.22)" }}>
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-xl opacity-25 pointer-events-none" style={{ background: "radial-gradient(circle,#6C63FF,#4A9EFF)" }} />
                <div className="relative z-10">
                  <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full text-white inline-block mb-3" style={{ background: "linear-gradient(135deg,#6C63FF,#4A9EFF)" }}>{a.badge}</span>
                  <h3 className="text-white font-bold text-sm leading-snug mb-2">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="pt-10 flex flex-col gap-5" style={{ borderTop: "1px solid rgba(108,99,255,0.2)" }}>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(108,99,255,0.7)" }}>{S.share}</span>
            <a href="https://wa.me/?text=https://trailiq.co/blog/sleeping-bag-guide" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125" style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#A78BFA" }}>WhatsApp</a>
            <a href="https://twitter.com/intent/tweet?url=https://trailiq.co/blog/sleeping-bag-guide" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125" style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#A78BFA" }}>Twitter / X</a>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110" style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)", color: "#A78BFA" }}>{S.backToBlog}</Link>
            <Link href="/blog/common-gear-mistakes" className="text-sm hover:brightness-125 transition-all" style={{ color: "#4A9EFF" }}>{S.nextLink}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
