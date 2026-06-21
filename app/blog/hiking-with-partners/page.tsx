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

  const ty = scrollY * 0.35;
  const opacity = Math.max(0, 1 - scrollY * 0.002);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '110%',
          backgroundImage: 'url(https://images.pexels.com/photos/35813753/pexels-photo-35813753.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: '50% 30%',
          transform: `translateY(${ty}px)`,
          willChange: 'transform',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)' }} />
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        opacity,
        transform: `translateY(${ty * 0.25}px)`,
        padding: '0 1.5rem',
        textAlign: 'center',
      }}>
        <h1 style={{
          color: '#ffffff',
          fontSize: 'clamp(2.2rem, 6vw, 5rem)',
          fontWeight: 900,
          textShadow: '0 4px 24px rgba(0,0,0,0.95)',
          lineHeight: 1.15,
          marginBottom: '1rem',
        }}>
          {lang === 'he' ? 'אל תטייל לבד' : 'Never Hike Alone'}
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          textShadow: '0 2px 12px rgba(0,0,0,0.95)',
          maxWidth: '560px',
        }}>
          {lang === 'he' ? 'למה שותף למסע יכול להציל את חייך' : "Why a Trail Partner Could Save Your Life"}
        </p>
      </div>
    </div>
  );
};

/* ── Card data ────────────────────────────────────────────────────────────── */
const CARDS = [
  {
    emoji: "🌩️",
    color: "#3498DB",
    rgb: "52,152,219",
    title_he: "מזג אוויר פתאומי",
    title_en: "Sudden Weather",
    body_he: "סופות ברקים, ערפל פתאומי, שלג בקיץ — מזג האוויר בהרים משתנה תוך דקות. שותף למסע יכול לעזור לך לקבל החלטה בזמן אמת, לחלוק ציוד חירום ולשמור על שפיות הדעת.",
    body_en: "Lightning storms, sudden fog, summer snowfall — mountain weather changes in minutes. A trail partner helps you make real-time decisions, share emergency gear, and maintain mental clarity.",
    tip_he: "תמיד בדוק תחזית מזג אוויר 48 שעות מראש + קבע נקודת יעד מוגדרת וחזרה ברורה",
    tip_en: "Always check the weather forecast 48 hours ahead + set a defined waypoint and clear turnaround",
  },
  {
    emoji: "🦵",
    color: "#E74C3C",
    rgb: "231,76,60",
    title_he: "פציעה ועייפות",
    title_en: "Injury & Exhaustion",
    body_he: "נקע בקרסול, עווית שרירים או קריעת שריר, התייבשות חמורה המובילה לירידה בתפקוד הגופני והמנטלי — פציעה שנראית קטנה עלולה להפוך לאסון כשאתה לבד. שותף יכול לספק תמיכה פיזית, להפעיל ציוד חירום ולהוביל לפינוי שדה מהיר.",
    body_en: "A sprained ankle, muscle cramp or torn muscle, severe dehydration leading to impaired physical and mental function — a seemingly minor injury can become catastrophic when alone. A partner can provide physical support, activate emergency equipment, and lead to rapid field evacuation.",
    tip_he: "נשאו תמיד ערכת עזרה ראשונה מלאה + ידעו איך להשתמש בה בשטח",
    tip_en: "Always carry a full first aid kit + know how to use it in the field",
  },
  {
    emoji: "🧭",
    color: "#F39C12",
    rgb: "243,156,18",
    title_he: "אבדן כיוון",
    title_en: "Getting Lost",
    body_he: "גם עם GPS, אנשים הולכים לאיבוד. שני זוגות עיניים רואים יותר. שותף זוכר את הנתיב, מזהה סימנים שפספסת, ומונע את 'אפקט הנהר' — הנטייה האנושית ללכת בעיגולים.",
    body_en: "Even with GPS, people get lost. Two pairs of eyes see more. A partner remembers the route, spots markers you missed, and prevents the river effect — the human tendency to walk in circles.",
    tip_he: "הורידו מפה טופוגרפית אופליין לפני היציאה + סמנו נקודות יעד מוגדרות כל 30 דקות",
    tip_en: "Download an offline topographic map before leaving + mark defined waypoints every 30 minutes",
  },
  {
    emoji: "🧠",
    color: "#9B59B6",
    rgb: "155,89,182",
    title_he: "חולשה מנטלית",
    title_en: "Mental Weakness",
    body_he: "שעות של הליכה לבד גורמות לתשישות מנטלית שמפגימה שיקול דעת. שותף שומר עליך מרוכז, מעלה את המורל, ומזהה סימני תשישות מוקדמים שאתה לא רואה בעצמך.",
    body_en: "Hours of solo hiking cause mental exhaustion that impairs judgment. A partner keeps you focused, boosts morale, and recognizes early fatigue signs you can't see in yourself.",
    tip_he: "קבעו עצירות קבועות כל שעה לשתייה, אכילה ובדיקת מצב — הגדירו פרוטוקול חירום מראש",
    tip_en: "Set regular stops every hour for water, food and a status check — define an emergency protocol in advance",
  },
  {
    emoji: "🆘",
    color: "#E67E22",
    rgb: "230,126,34",
    title_he: "תקשורת עם העולם",
    title_en: "Reaching the Outside World",
    body_he: "בגרעיני ההרים אין קליטה סלולרית. אם נפלת ואיבדת הכרה — מי יתקשר לעזרה? שותף יכול לרוץ לקבל קליטה, לירות זיקוקי אות, להישאר איתך עד להגעת עזרה, ולהפעיל PLB במיקום מדויק לפינוי שדה.",
    body_en: "In mountain cores there is no cell coverage. If you fall and lose consciousness — who calls for help? A partner can run to get signal, fire distress flares, stay with you until help arrives, and activate a PLB at the precise location for field evacuation.",
    tip_he: "נשאו PLB (Personal Locator Beacon) בטיולים מרוחקים — ₪500 שיכולים להציל חיים",
    tip_en: "Carry a PLB (Personal Locator Beacon) on remote hikes — ₪500 that could save your life",
  },
  {
    emoji: "💪",
    color: "#2ECC71",
    rgb: "46,204,113",
    title_he: "הכוח של ביחד",
    title_en: "The Power of Together",
    body_he: "מעבר לבטיחות — טיול עם שותף פשוט טוב יותר. אתם חולקים רגעים מדהימים, מדרבנים אחד את השני, ויוצרים זיכרונות שישארו לכל החיים. הסיכון יורד, הכיף עולה.",
    body_en: "Beyond safety — hiking with a partner is simply better. You share incredible moments, push each other forward, and create memories that last a lifetime. Risk goes down, enjoyment goes up.",
    tip_he: "מצאו שותף מנוסה דרך: קבוצות טיולים מקומיות, Wikiloc, קבוצות פייסבוק של מטיילים",
    tip_en: "Find an experienced partner through: local hiking clubs, Wikiloc, Facebook hiking groups",
  },
  {
    emoji: "⚠️",
    color: "#F39C12",
    rgb: "243,156,18",
    title_he: "חשוב לדעת: גם מטיילים בקבוצה נפגעים",
    title_en: "Important: Group Hikers Get Hurt Too",
    body_he: "טיול בקבוצה מפחית סיכון אך אינו מבטל אותו. מחקרים מראים כי תאונות רבות קורות גם לקבוצות — בעיקר בשל חוסר ניסיון, ציוד לא מתאים, ותכנון מסלול לקוי. מטייל שמצטרף לקבוצה מבלי להתכונן כראוי עלול להכניס את כל הקבוצה לסיכון. המסר האמיתי: לא רק 'לך עם מישהו' — אלא 'לך מוכן, עם מישהו מנוסה'.",
    body_en: "Hiking in a group reduces risk but does not eliminate it. Research shows many accidents happen in groups too — mainly due to inexperience, improper gear, and poor route planning. A hiker who joins a group unprepared can endanger everyone. The real message: not just 'go with someone' — but 'go prepared, with someone experienced'.",
    tip_he: "לפני כל טיול קבוצתי: ודא שכל חבר הקבוצה מצויד, מוכן ומכיר את פרוטוקול החירום",
    tip_en: "Before any group hike: confirm every member is equipped, prepared, and knows the emergency protocol",
  },
];


/* ── Safety tips section ─────────────────────────────────────────────────── */
const SAFETY_TIPS = {
  he: {
    title: "כיצד לטייל בצורה בטוחה",
    tips: [
      { icon: "🗺️", title: "תכנון מסלול",        body: "הורד מפה טופוגרפית ולמד את תנאי השטח מראש. זהה נקודות יעד מוגדרות לאורך המסלול וקבע נקודת חזרה ברורה." },
      { icon: "📍", title: "הודע לגורם אחראי",   body: "השאר פרטי מסלול מלאים אצל אדם אחראי לפני היציאה — כולל שעת חזרה צפויה ומה לעשות אם לא תחזור." },
      { icon: "🆘", title: "ציוד חירום",          body: "בכל טיול בשטח פתוח חשוב לשאת ציוד חירום בסיסי: ערכת עזרה ראשונה, מים ומזון עודפים, ושמיכת מילוט. לטיולים מרוחקים מומלץ גם PLB — מכשיר חירום שמשדר את מיקומך לרשויות החילוץ גם ללא קליטה סלולרית." },
      { icon: "📊", title: "הכר את גבולותיך",    body: "חילוץ בשטח הוא תרחיש שעדיף להימנע ממנו — בחר מסלול שמתאים לרמה שלך ושל הקבוצה." },
      { icon: "📋", title: "פרוטוקול חירום",     body: "קבע מראש מה עושים במקרה חירום — מי מתקשר לעזרה, מי נשאר עם הנפגע, מה נקודת הכינוס החלופית." },
    ],
  },
  en: {
    title: "How to Hike Safely",
    tips: [
      { icon: "🗺️", title: "Route Planning",             body: "Download a topographic map and study terrain conditions in advance. Identify defined waypoints along the route and set a clear turnaround point." },
      { icon: "📍", title: "Notify a Responsible Party", body: "Leave complete route details with a responsible person before departure — including expected return time and what to do if you don't return." },
      { icon: "🆘", title: "Emergency Equipment",        body: "On any backcountry trip, always carry basic emergency gear: a first aid kit, extra water and food, and an emergency blanket. For remote trips, a PLB (Personal Locator Beacon) is highly recommended — it transmits your location to rescue services even without cell coverage." },
      { icon: "📊", title: "Know Your Limits",           body: "A field rescue is a scenario best avoided — choose a route that matches your fitness level and that of your group." },
      { icon: "📋", title: "Emergency Protocol",         body: "Decide in advance what to do in an emergency — who calls for help, who stays with the injured, what is the alternate rally point." },
    ],
  },
};

const UI = {
  he: {
    badge: "בטיחות",
    subtitle: "הסכנות האמיתיות של טיול ביחידות — ו-7 סיבות לקחת מישהו מנוסה איתך",
    intro: "כל שנה מאות מטיילים נמצאים בסכנה אמיתית בהרים — חלקם לא חוזרים הביתה. הסיבה הנפוצה ביותר? הם יצאו לבד, ללא תכנון מסלול מספק וללא פרוטוקול חירום מוגדר.",
    sectionCards: "7 סיבות שהשותף שלך הוא ציוד ההצלה שלך",
    tipLabel: "טיפ מקצועי:",
    expandHint: "לחץ לפרטים",
    statsText: "מחקרים שנערכו במדינות שונות מצביעים באופן עקבי על כך שטיול ביחיד מגדיל משמעותית את הסיכון במצבי חירום. הנתונים משתנים ממדינה למדינה ומשביל לשביל, אך המסר ברור: שותף למסע מספק רשת ביטחון שאי אפשר להחליפה.",
    safetyTitle: "כיצד לטייל בצורה בטוחה",
    ctaTitle: "הטיול הבא שלך — קח מישהו מנוסה איתך",
    ctaSubtitle: "שיתוף טיול לא רק מגן עליך — הוא הופך כל רגע לזיכרון.",
    ctaBtn: "מצא שותף לטיול",
    shareLabel: "שתפו:",
    backToBlog: "← חזרה לבלוג",
    related: "מאמרים נוספים",
    rel1title: "טעויות נפוצות בבחירת ציוד",
    rel2title: "ציוד לשביל ישראל — רשימה מלאה",
  },
  en: {
    badge: "Safety",
    subtitle: "The real dangers of solo hiking — and 7 reasons to bring an experienced partner",
    intro: "Every year hundreds of hikers face real danger in the mountains — some don't come home. The most common reason? They went alone, without adequate route planning or a defined emergency protocol.",
    sectionCards: "7 Reasons Your Partner Is Your Most Important Safety Gear",
    tipLabel: "Pro tip:",
    expandHint: "Click for details",
    statsText: "Studies conducted across different countries consistently show that solo hiking significantly increases risk in emergency situations. Numbers vary by country and trail type, but the message is clear: a trail partner provides a safety net that cannot be replaced.",
    safetyTitle: "How to Hike Safely",
    ctaTitle: "Your next hike — take an experienced partner",
    ctaSubtitle: "Sharing a trail doesn't just protect you — it turns every moment into a memory.",
    ctaBtn: "Find a Trail Partner",
    shareLabel: "Share:",
    backToBlog: "← Back to Blog",
    related: "More Articles",
    rel1title: "5 Common Gear Selection Mistakes",
    rel2title: "Israel Trail Gear — Full List",
  },
};

/* ── Expandable card ──────────────────────────────────────────────────────── */
function SafetyCard({ card, lang }: { card: typeof CARDS[0]; lang: "he" | "en" }) {
  const [open, setOpen] = useState(false);
  const S = UI[lang];

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: open ? `rgba(${card.rgb},0.08)` : "rgba(13,5,2,0.65)",
        border: `1px solid rgba(${card.rgb},${open ? 0.45 : 0.22})`,
        boxShadow: open ? `0 0 30px rgba(${card.rgb},0.18)` : "none",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 cursor-pointer text-start"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" style={{ filter: `drop-shadow(0 0 8px rgba(${card.rgb},0.5))` }}>
            {card.emoji}
          </span>
          <h3 className="font-black text-base" style={{ color: card.color }}>
            {lang === "he" ? card.title_he : card.title_en}
          </h3>
        </div>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black transition-transform duration-300"
          style={{
            background: `rgba(${card.rgb},0.18)`,
            color: card.color,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

      {/* Body */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: open ? "500px" : "0px" }}
      >
        <div className="px-5 pb-5 space-y-4">
          <p className="text-sm leading-relaxed" style={{ color: "rgba(230,215,200,0.85)", lineHeight: "1.8" }}>
            {lang === "he" ? card.body_he : card.body_en}
          </p>
          <div
            className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm"
            style={{ background: `rgba(${card.rgb},0.12)`, border: `1px solid rgba(${card.rgb},0.28)` }}
          >
            <span style={{ color: card.color, fontWeight: 900, flexShrink: 0 }}>{S.tipLabel}</span>
            <span style={{ color: "rgba(230,215,200,0.82)" }}>
              {lang === "he" ? card.tip_he : card.tip_en}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function HikingWithPartnersPage() {
  const { lang } = useLang();
  const S = UI[lang];
  const he = lang === "he";
  const safetyTips = SAFETY_TIPS[lang];

  return (
    <div className="min-h-screen bg-[#0D0B1F]" dir={he ? "rtl" : "ltr"}>

      <ParallaxHero />

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">

        {/* Intro with drop cap */}
        <div className="mt-10 mb-14" style={{ fontSize: "1.1rem", lineHeight: "1.9", color: "rgba(230,215,200,0.85)" }}>
          <p>
            <span style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 0.85, color: "#E74C3C", marginInlineEnd: "0.06em", display: "inline-block", verticalAlign: "bottom" }}>
              {S.intro.charAt(0)}
            </span>
            {S.intro.slice(1)}
          </p>
        </div>

        {/* ── 7 EXPANDABLE SAFETY CARDS ──────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#E74C3C,#E67E22)" }} />
            <h2
              className="text-2xl sm:text-3xl font-black"
              style={{ letterSpacing: "-0.02em", background: "linear-gradient(135deg,#E74C3C,#E67E22)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              {S.sectionCards}
            </h2>
          </div>

          <div className="space-y-3">
            {CARDS.map((card) => (
              <SafetyCard key={card.emoji + card.title_he} card={card} lang={lang} />
            ))}
          </div>
        </section>

        {/* ── RESEARCH NOTE ──────────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="rounded-2xl px-6 py-5" style={{ background: "rgba(231,76,60,0.07)", border: "1px solid rgba(231,76,60,0.2)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(230,215,200,0.85)", lineHeight: "1.9" }}>
              {S.statsText}
            </p>
          </div>
        </section>

        {/* ── HOW TO HIKE SAFELY ─────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#2ECC71,#F39C12)" }} />
            <h2
              className="text-2xl sm:text-3xl font-black"
              style={{ letterSpacing: "-0.02em", background: "linear-gradient(135deg,#2ECC71,#F39C12)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              {safetyTips.title}
            </h2>
          </div>

          <div className="space-y-3">
            {safetyTips.tips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl px-5 py-4"
                style={{ background: "rgba(13,5,2,0.65)", border: "1px solid rgba(46,204,113,0.18)", backdropFilter: "blur(14px)" }}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{tip.icon}</span>
                <div>
                  <p className="font-black text-sm mb-1" style={{ color: "#2ECC71" }}>{tip.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(230,215,200,0.82)", lineHeight: "1.75" }}>{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CALL TO ACTION ──────────────────────────────────────────────── */}
        <section className="mb-16">
          <div
            className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #2d0808 0%, #1a0505 50%, #2d0808 100%)",
              border: "1.5px solid rgba(231,76,60,0.4)",
              boxShadow: "0 0 40px rgba(192,57,43,0.25), inset 0 0 60px rgba(192,57,43,0.05)",
            }}
          >
            <div className="absolute top-0 start-0 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(192,57,43,0.2) 0%, transparent 70%)", transform: "translate(-40%,-40%)" }} />
            <div className="absolute bottom-0 end-0 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(230,126,34,0.15) 0%, transparent 70%)", transform: "translate(40%,40%)" }} />

            <div className="relative z-10">
              <p
                className="font-black text-2xl sm:text-3xl text-white mb-3 leading-snug"
                style={{ letterSpacing: "-0.02em", textShadow: "0 0 40px rgba(231,76,60,0.3)" }}
              >
                {S.ctaTitle}
              </p>
              <p className="text-sm mb-8" style={{ color: "rgba(230,215,200,0.72)" }}>
                {S.ctaSubtitle}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:brightness-115 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #C0392B, #E74C3C)",
                  boxShadow: "0 4px 24px rgba(192,57,43,0.45)",
                }}
              >
                {S.ctaBtn} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── RELATED ────────────────────────────────────────────────────── */}
        <div className="mb-14">
          <p className="font-black text-lg mb-6" style={{ color: "#E74C3C" }}>{S.related}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/blog/common-gear-mistakes", title: S.rel1title, rgb: "231,76,60",  color: "#E74C3C" },
              { href: "/blog/israel-trail-gear",    title: S.rel2title, rgb: "46,204,113", color: "#2ECC71" },
            ].map(a => (
              <Link key={a.href} href={a.href}
                className="block group rounded-xl p-5 relative overflow-hidden transition-all duration-200 hover:scale-[1.02]"
                style={{ background: `rgba(${a.rgb},0.06)`, border: `1px solid rgba(${a.rgb},0.25)` }}
              >
                <h3 className="font-bold text-sm leading-snug text-white">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        {/* ── SHARE + NAV ─────────────────────────────────────────────────── */}
        <div className="pt-10 flex flex-col gap-5" style={{ borderTop: "1px solid rgba(192,57,43,0.2)" }}>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(192,57,43,0.6)" }}>{S.shareLabel}</span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent("https://trailiq.co/blog/hiking-with-partners")}`}
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125"
              style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(231,76,60,0.3)", color: "#E74C3C" }}
            >
              WhatsApp
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(he ? "אל תטייל לבד — TrailIQ" : "Never Hike Alone — TrailIQ")}&body=${encodeURIComponent("https://trailiq.co/blog/hiking-with-partners")}`}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125"
              style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(231,76,60,0.3)", color: "#E74C3C" }}
            >
              {he ? "אימייל" : "Email"}
            </a>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110"
              style={{ background: "rgba(192,57,43,0.10)", border: "1px solid rgba(192,57,43,0.25)", color: "#E74C3C" }}
            >
              {S.backToBlog}
            </Link>
            <Link href="/blog/ultralight-hiking" className="text-sm hover:brightness-125 transition-all" style={{ color: "#E67E22" }}>
              {he ? "הליכה אולטרה-לייט →" : "Ultralight Hiking →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
