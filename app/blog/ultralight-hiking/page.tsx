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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const ty = scrollY * 0.5;
  const scale = 1 + scrollY * 0.0006;
  const opacity = Math.max(0, 1 - scrollY * 0.0015);
  return (
    <div className="hero-mobile-55" style={{ position: "relative", overflow: "hidden", width: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "130%",
          backgroundImage: "url(https://images.pexels.com/photos/821750/pexels-photo-821750.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transform: `translateY(${ty}px) scale(${scale})`,
          willChange: "transform",
        }}
      />
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)",
      }} />
      <div style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        opacity: opacity,
        transform: `translateY(${ty * 0.25}px)`,
        padding: "0 1.5rem",
        textAlign: "center",
      }}>
        <h1 style={{
          color: "#FFFFFF",
          fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
          fontWeight: 900,
          textShadow: "0 3px 25px rgba(0,0,0,0.95)",
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}>
          {lang === 'he' ? 'טיול אולטרה-לייט' : 'Ultralight Hiking'}
        </h1>
        <p style={{
          color: "#F0F0F0",
          fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
          fontWeight: 500,
          textShadow: "0 2px 15px rgba(0,0,0,0.95)",
          maxWidth: "600px",
        }}>
          {lang === 'he' ? 'איך להוריד משקל בלי לוותר על נוחות ובטיחות' : 'How to Cut Weight Without Sacrificing Comfort or Safety'}
        </p>
      </div>
    </div>
  );
};

const BIG4 = {
  he: [
    { name: "תרמיל גב (40–50L)", emoji: "🎒", typical: "1.5–2.5", ul: "0.8–1.3", saving: "עד 1.7 ק\"ג", savingPct: 68 },
    { name: "אוהל (1 אדם)", emoji: "⛺", typical: "1.8–3.5", ul: "0.7–1.0", saving: "עד 2.8 ק\"ג", savingPct: 80 },
    { name: "שק שינה (3 עונות)", emoji: "🛏️", typical: "1.0–1.8", ul: "0.45–0.7", saving: "עד 1.3 ק\"ג", savingPct: 72 },
    { name: "מזרן שינה", emoji: "🛋️", typical: "0.5–0.9", ul: "0.24–0.37", saving: "עד 0.65 ק\"ג", savingPct: 58 },
  ],
  en: [
    { name: "Backpack (40–50L)", emoji: "🎒", typical: "1.5–2.5", ul: "0.8–1.3", saving: "Save up to 1.7 kg", savingPct: 68 },
    { name: "Tent (1-person)", emoji: "⛺", typical: "1.8–3.5", ul: "0.7–1.0", saving: "Save up to 2.8 kg", savingPct: 80 },
    { name: "Sleeping bag (3-season)", emoji: "🛏️", typical: "1.0–1.8", ul: "0.45–0.7", saving: "Save up to 1.3 kg", savingPct: 72 },
    { name: "Sleeping pad", emoji: "🛋️", typical: "0.5–0.9", ul: "0.24–0.37", saving: "Save up to 0.65 kg", savingPct: 58 },
  ],
};

const WEIGHT_TIERS = {
  he: [
    { label: "Superlight", weight: "מתחת ל-2.3 ק\"ג (5 ליברות)", color: "#22C55E", rgb: "34,197,94", pct: 100,
      desc: "לאולטרה-thru-hikers מנוסים בלבד — בדרך כלל ללא אוהל ו/או ללא כיריים. מחייב שנים של ניסיון ותכנון קפדני." },
    { label: "Ultralight", weight: "מתחת ל-4.5 ק\"ג (10 ליברות)", color: "#4A9EFF", rgb: "74,158,255", pct: 75,
      desc: "מחייב ציוד מיוחד קל — תרמיל אולטרה-לייט עובד טוב כשמשקל הבסיס כבר ב-4.5–5.5 ק\"ג. אם כבד יותר — השתמשו בתרמיל עם מסגרת מוצקה." },
    { label: "Lightweight", weight: "4.5–9 ק\"ג (10–20 ליברות)", color: "#F59E0B", rgb: "245,158,11", pct: 50,
      desc: "היעד הטוב ביותר לרוב המטיילים. שדרוג ניכר על הממוצע, ניתן להשיג ללא ציוד קיצוני יקר." },
    { label: "Standard", weight: "מעל 9 ק\"ג (20+ ליברות)", color: "#EF4444", rgb: "239,68,68", pct: 25,
      desc: "מתחילים, קמפינג חורף עם ציוד כבד. יעיל ובטוח, אך כבד יותר מהנדרש ברוב הטיולים." },
  ],
  en: [
    { label: "Superlight", weight: "Under 2.3 kg (5 lbs)", color: "#22C55E", rgb: "34,197,94", pct: 100,
      desc: "Experienced thru-hikers only — typically tentless and/or stoveless. Requires years of experience and meticulous planning." },
    { label: "Ultralight", weight: "Under 4.5 kg (10 lbs)", color: "#4A9EFF", rgb: "74,158,255", pct: 75,
      desc: "Requires specialized lightweight gear — ultralight packs work best for hikers who have dialed base weight to 4.5–5.5 kg. If your base weight is heavier, use a pack with proper frame and suspension." },
    { label: "Lightweight", weight: "4.5–9 kg (10–20 lbs)", color: "#F59E0B", rgb: "245,158,11", pct: 50,
      desc: "The best target for most hikers. A significant upgrade from average, achievable without extreme or expensive gear choices." },
    { label: "Standard", weight: "Over 9 kg (20+ lbs)", color: "#EF4444", rgb: "239,68,68", pct: 25,
      desc: "Beginners, winter camping with heavy gear. Effective and safe, but heavier than necessary for most trips." },
  ],
};

const SHELTER_ALTS = {
  he: [
    { name: "ביוואק (Bivy Sack)", weight: "150–350 גרם", saving: "חיסכון: 800–1,500 גרם", color: "#22C55E", rgb: "34,197,94",
      desc: "שק מגן חיצוני שעוטף את שק השינה. אטום לרוח ומים, מרחב מינימלי. לא לכלואופובים." },
    { name: "ברזנט / Tarp", weight: "200–450 גרם", saving: "חיסכון: 700–1,200 גרם", color: "#4A9EFF", rgb: "74,158,255",
      desc: "פיסת בד עמיד למים שנפרשת מעל מזרן ושק שינה. גמישות מרבית, אפס הגנה מחרקים. לאזורים יבשים." },
    { name: "ערסל (Hammock)", weight: "400–700 גרם עם מגן", saving: "חיסכון: עד 2 ק\"ג", color: "#A78BFA", rgb: "167,139,250",
      desc: "מחליף הן את האוהל והן את המזרן — בסביבת יער. לא ישים בשטח פתוח. שינה נוחה מאוד." },
  ],
  en: [
    { name: "Bivy Sack", weight: "150–350g", saving: "Save 800–1,500g", color: "#22C55E", rgb: "34,197,94",
      desc: "Protective outer shell that wraps your sleeping bag. Wind and water resistant, minimal internal space. Not for claustrophobic hikers." },
    { name: "Tarp", weight: "200–450g", saving: "Save 700–1,200g", color: "#4A9EFF", rgb: "74,158,255",
      desc: "A piece of waterproof fabric pitched above your sleeping mat and bag. Maximum flexibility, zero bug protection. Best for dry regions." },
    { name: "Hammock", weight: "400–700g with bug net", saving: "Save up to 2 kg", color: "#A78BFA", rgb: "167,139,250",
      desc: "Replaces both tent and sleeping pad in forest environments. Not viable in open terrain. Very comfortable sleep for many hikers." },
  ],
};

const PRINCIPLES = {
  he: ["כתבו רשימת ציוד מלאה עם משקל של כל פריט — לא ניתן לשפר מה שלא מודדים","השאלה לא 'כמה זה עולה?' אלא 'כמה זה שוקל?' — עבור כל פריט","לכל ציוד שמוסיפים, הסירו ציוד אחר שמבצע פונקציה דומה","ציוד רב-שימושי (tarp גם כגשמיה, מקלות כעמודי אוהל) חוסך כפל","בדקו את הרשימה 3 ימים לפני הטיול — תמיד תגלו פריטים שלא חתכתם"],
  en: ["Write a complete gear list with the weight of every item — you can't improve what you don't measure","The question isn't 'how much does it cost?' but 'how much does it weigh?' — for every item","For every piece of gear you add, remove something that serves a similar function","Multi-use gear (tarp as rain cover, trekking poles as tent poles) saves double weight","Review your list 3 days before the trip — you'll always find items you forgot to cut"],
};

const UI = {
  he: {
    badge: "אולטרה-לייט",
    subtitle: "עקרונות מקצועיים לציוד קל — ללא פגיעה בבטיחות ובנוחות",
    intro1: "הליכה אולטרה-לייט אינה קיצוניות — היא גישה מחושבת שמטרתה להפחית עומס פיזי ולשפר את חוויית הטיול. מטיילים שהצטרפו לגישה זו מדווחים על פחות כאבי ברכיים, פחות עייפות ויותר הנאה.",
    intro2: "אולטרה-לייט לא אומר להקריב בטיחות. זה אומר לשאול שאלה קריטית אחת על כל פריט ציוד: האם אני באמת צריך את זה?",
    secBig4: "הביג 4 — 4 הפריטים שקובעים הכל",
    big4Sub: "60–70% מהמשקל הכולל מגיע מ-4 פריטים בלבד. אוהלי Dyneema/Cuben Fiber: 400–600 גרם אך יקרים מאוד. מרבציות אוויר אולטרה-קל: 240–370 גרם.",
    typicalLabel: "ציוד רגיל", ulLabel: "אולטרה-לייט",
    totalTrad: "4.8–8.7 ק\"ג", totalUL: "2.2–3.4 ק\"ג",
    totalTradLabel: "ציוד מסורתי (Big 4)", totalULLabel: "אולטרה-לייט (Big 4)",
    totalSaving: "חיסכון פוטנציאלי: עד 6.5 ק\"ג ב-Big 4 בלבד ⚡",
    secWeight: "יעדי משקל בסיס",
    weightSub: "משקל בסיס (Base Weight) הוא משקל הציוד ללא אוכל, מים ודלק — המדד המקצועי להשוואה.",
    cleverHikerWarning: "תרמיל אולטרה-לייט (מתחת ל-1.4 ק\"ג) עובד טוב למטיילים שכבר הביאו את משקל הבסיס ל-4.5–5.5 ק\"ג. אם משקל הבסיס שלכם גבוה יותר — השתמשו בתרמיל עם מסגרת ומערכת השעיה מוצקה.",
    secShelter: "חלופות לאוהל מלא",
    secPrinciples: "עקרונות כלליים",
    warningText: "אל תחתכו בבטיחות: ערכת עזרה ראשונה, ניווט ושמיכת חירום תמיד נשארים ברשימה. אין פשרה על ציוד חיוני לחירום.",
    successText: "הטיפ הכי שווה: התחילו עם Big 4 — שפרו קודם את 4 הפריטים הכבדים ביותר. כל שאר החיסכונות הם בונוס.",
    related: "מאמרים נוספים",
    share: "שתפו:", backToBlog: "← חזרה לבלוג",
    rel1badge: "ציוד בסיסי", rel1title: "איך לבחור תיק גב לטיול?",
    rel2badge: "שינה בשטח", rel2title: "מדריך מקצועי לשק שינה",
    nextLink: "מדריך תרמיל גב →",
  },
  en: {
    badge: "Ultralight",
    subtitle: "Cut weight without sacrificing comfort or safety",
    intro1: "Ultralight hiking isn't extremism — it's a calculated approach aimed at reducing physical strain and improving the hiking experience. Hikers who've adopted this philosophy report fewer knee problems, less fatigue and more enjoyment.",
    intro2: "Ultralight doesn't mean sacrificing safety. It means asking one critical question about every piece of gear: Do I really need this?",
    secBig4: "The Big 4 — The 4 Items That Define Your Pack Weight",
    big4Sub: "60–70% of total gear weight comes from just 4 items. Dyneema/Cuben Fiber tents: 400–600g but very expensive. Ultralight air sleeping pads: 240–370g.",
    typicalLabel: "Traditional", ulLabel: "Ultralight",
    totalTrad: "4.8–8.7 kg", totalUL: "2.2–3.4 kg",
    totalTradLabel: "Traditional gear (Big 4)", totalULLabel: "Ultralight (Big 4)",
    totalSaving: "Potential savings: up to 6.5 kg from the Big 4 alone ⚡",
    secWeight: "Base Weight Targets",
    weightSub: "Base weight is the weight of your gear excluding food, water and fuel — the professional standard for comparison.",
    cleverHikerWarning: "Ultralight backpacks (under 1.4 kg / 3 lbs) work best for hikers who have already dialed in their base weight to 4.5–5.5 kg. If your base weight is heavier, use a pack with a proper frame and suspension system.",
    secShelter: "Shelter Alternatives to a Full Tent",
    secPrinciples: "General Principles",
    warningText: "Never sacrifice safety: first aid kit, navigation and emergency blanket always stay on the list. No compromise on essential emergency gear.",
    successText: "The single best tip: start with the Big 4 — improve the 4 heaviest items first. All other savings are a bonus.",
    related: "More Articles",
    share: "Share:", backToBlog: "← Back to Blog",
    rel1badge: "Gear Basics", rel1title: "How to Choose a Backpack",
    rel2badge: "Sleep Gear", rel2title: "Expert Sleeping Bag Guide",
    nextLink: "Backpack Guide →",
  },
};

export default function UltralightHikingPage() {
  const { lang } = useLang();
  const S = UI[lang];
  const big4 = BIG4[lang];
  const tiers = WEIGHT_TIERS[lang];
  const shelters = SHELTER_ALTS[lang];
  const principles = PRINCIPLES[lang];

  return (
    <div className="min-h-screen bg-[#0D0B1F]" dir={lang === 'he' ? 'rtl' : 'ltr'}>

      <ParallaxHero />

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <div className="mt-10 mb-14 space-y-4" style={{ color: "#B8C4E8", fontSize: "1.1rem", lineHeight: "1.9" }}>
          <p>
            <span style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 0.85, color: "#22C55E", marginInlineEnd: "0.06em", display: "inline-block", verticalAlign: "bottom" }}>
              {S.intro1.charAt(0)}
            </span>
            {S.intro1.slice(1)}
          </p>
          <p>{S.intro2}</p>
        </div>

        {/* Big 4 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#22C55E,#4A9EFF)" }} />
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ letterSpacing: "-0.02em", background: "linear-gradient(135deg,#22C55E,#4A9EFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{S.secBig4}</h2>
          </div>
          <p className="text-sm mb-6" style={{ color: "#B8C4E8", opacity: 0.72 }}>{S.big4Sub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {big4.map(item => (
              <div key={item.name} className="rounded-2xl p-5 relative overflow-hidden"
                style={{ background: "rgba(13,11,31,0.7)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span style={{ fontSize: "2rem", lineHeight: 1, display: "block", marginBottom: "0.5rem" }}>{item.emoji}</span>
                    <h3 className="font-black text-white text-base">{item.name}</h3>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E" }}>{item.saving}</span>
                </div>
                <div className="space-y-2.5 text-xs">
                  {([[ S.typicalLabel, "100%", "rgba(255,255,255,0.25)", "rgba(255,255,255,0.08)", "#B8C4E8", item.typical ],[ S.ulLabel, `${item.savingPct}%`, "linear-gradient(90deg,#22C55E,#4A9EFF)", "rgba(34,197,94,0.15)", "#22C55E", item.ul ]] as [string, string, string, string, string, string][]).map(([label, width, barBg, trackBg, col, val]) => (
                    <div key={label} className="flex items-center gap-3">
                      <span style={{ color: col, width: "5rem", flexShrink: 0 }}>{label}</span>
                      <div className="flex-1 h-2 rounded-full" style={{ background: trackBg }}>
                        <div className="h-full rounded-full" style={{ width, background: barBg }} />
                      </div>
                      <span style={{ color: col, width: "4rem", textAlign: lang === 'he' ? "right" : "left" }}>{val} kg</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl p-5" style={{ background: "linear-gradient(135deg,rgba(34,197,94,0.08) 0%,rgba(74,158,255,0.05) 100%)", border: "1px solid rgba(34,197,94,0.25)" }}>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs mb-1" style={{ color: "#B8C4E8", opacity: 0.55 }}>{S.totalTradLabel}</p>
                <p className="font-black text-2xl" style={{ color: "#EF4444" }}>{S.totalTrad}</p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "#B8C4E8", opacity: 0.55 }}>{S.totalULLabel}</p>
                <p className="font-black text-2xl" style={{ color: "#22C55E" }}>{S.totalUL}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 text-center text-sm font-black" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "#22C55E" }}>{S.totalSaving}</div>
          </div>
        </section>

        {/* Base Weight */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#4A9EFF,#22C55E)" }} />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{S.secWeight}</h2>
          </div>
          <p className="text-sm mb-6" style={{ color: "#B8C4E8", opacity: 0.72 }}>{S.weightSub}</p>
          <div className="space-y-3">
            {tiers.map(tier => (
              <div key={tier.label} className="rounded-2xl p-5" style={{ background: `rgba(${tier.rgb},0.06)`, border: `1px solid rgba(${tier.rgb},0.25)` }}>
                <div className="flex items-center justify-between mb-2 gap-4 flex-wrap">
                  <span className="font-black text-base" style={{ color: tier.color }}>{tier.label}</span>
                  <span className="font-black text-base" style={{ color: tier.color }}>{tier.weight}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${tier.pct}%`, background: `linear-gradient(90deg,${tier.color},rgba(${tier.rgb},0.4))` }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.7 }}>{tier.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shelter Alternatives */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#F97316,#22C55E)" }} />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{S.secShelter}</h2>
          </div>
          <div className="space-y-4">
            {shelters.map(alt => (
              <div key={alt.name} className="rounded-2xl p-5" style={{ background: "rgba(13,11,31,0.7)", border: `1px solid rgba(${alt.rgb},0.25)` }}>
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                  <h3 className="font-black text-white text-base">{alt.name}</h3>
                  <div style={{ textAlign: lang === 'he' ? 'right' : 'left', flexShrink: 0 }}>
                    <span className="text-xs block" style={{ color: "#B8C4E8", opacity: 0.5 }}>{alt.weight}</span>
                    <span className="text-xs font-bold" style={{ color: alt.color }}>{alt.saving}</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.72 }}>{alt.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#22C55E,#6C63FF)" }} />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{S.secPrinciples}</h2>
          </div>
          <div className="rounded-2xl p-6" style={{ background: "rgba(13,11,31,0.7)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <ul className="space-y-3.5">
              {principles.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#B8C4E8", opacity: 0.82 }}>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                    style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E" }}>{i + 1}</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Warning + Success */}
        <div className="space-y-4 mb-14">
          <div className="rounded-2xl p-5" style={{ background: "rgba(74,158,255,0.07)", border: "1px solid rgba(74,158,255,0.28)" }}>
            <div className="flex items-start gap-3">
              <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>💡</span>
              <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.85 }}>{S.cleverHikerWarning}</p>
            </div>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.28)" }}>
            <div className="flex items-start gap-3">
              <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>⚠️</span>
              <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.85 }}>{S.warningText}</p>
            </div>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.28)" }}>
            <div className="flex items-start gap-3">
              <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>✅</span>
              <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.85 }}>{S.successText}</p>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mb-14">
          <p className="font-black text-lg mb-6" style={{ color: "#A78BFA" }}>{S.related}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([{ href: "/blog/how-to-choose-backpack", badge: S.rel1badge, title: S.rel1title }, { href: "/blog/sleeping-bag-guide", badge: S.rel2badge, title: S.rel2title }]).map(a => (
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
            <a href="https://wa.me/?text=https://trailiq.co/blog/ultralight-hiking" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125" style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#A78BFA" }}>WhatsApp</a>
            <a href="https://twitter.com/intent/tweet?url=https://trailiq.co/blog/ultralight-hiking" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125" style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#A78BFA" }}>Twitter / X</a>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110" style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)", color: "#A78BFA" }}>{S.backToBlog}</Link>
            <Link href="/blog/how-to-choose-backpack" className="text-sm hover:brightness-125 transition-all" style={{ color: "#4A9EFF" }}>{S.nextLink}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
