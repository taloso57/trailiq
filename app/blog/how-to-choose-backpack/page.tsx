"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageProvider";

const VideoParallaxHero = () => {
  const { lang } = useLang();
  const [scrollY, setScrollY] = useState(0);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [activePlayer, setActivePlayer] = useState(0);
  const videoRef0 = useRef<HTMLVideoElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const urlsRef   = useRef<string[]>([]);
  const nextIdxRef = useRef(1); // what's preloaded on the inactive slot

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/blog-videos")
      .then((r) => r.json())
      .then((data) => {
        setVideoUrls(data.urls);
        urlsRef.current = data.urls;
      });
  }, []);

  // Initialise once URLs arrive
  useEffect(() => {
    if (!videoUrls.length) return;
    const v0 = videoRef0.current;
    if (v0) { v0.src = videoUrls[0]; v0.load(); v0.play().catch(() => {}); }
    const v1 = videoRef1.current;
    if (v1 && videoUrls.length > 1) { v1.src = videoUrls[1]; v1.load(); }
    nextIdxRef.current = 1 % videoUrls.length;
  }, [videoUrls]);

  function handleEnded(playerIdx: number) {
    const refs = [videoRef0, videoRef1];
    const nextPlayerIdx = playerIdx === 0 ? 1 : 0;

    // Show next player instantly — no fade
    setActivePlayer(nextPlayerIdx);
    refs[nextPlayerIdx].current?.play().catch(() => {});

    // Preload the video after next on the now-hidden slot
    const afterNextIdx = (nextIdxRef.current + 1) % urlsRef.current.length;
    nextIdxRef.current = afterNextIdx;
    const hidden = refs[playerIdx].current;
    if (hidden) {
      hidden.pause();
      hidden.src = urlsRef.current[afterNextIdx];
      hidden.load();
    }
  }

  const ty = scrollY * 0.4;
  const heroOpacity = Math.max(0, 1 - scrollY * 0.002);
  const vidStyle = (active: boolean) => ({
    position: "absolute" as const,
    top: 0, left: 0,
    width: "100%", height: "130%",
    objectFit: "cover" as const,
    objectPosition: "center",
    transform: `translateY(${ty}px)`,
    willChange: "transform",
    opacity: active ? 1 : 0,
    zIndex: active ? 1 : 0,
  });

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden", width: "100%" }}>
      <video ref={videoRef0} muted playsInline onEnded={() => handleEnded(0)} style={vidStyle(activePlayer === 0)} />
      <video ref={videoRef1} muted playsInline onEnded={() => handleEnded(1)} style={vidStyle(activePlayer === 1)} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)",
      }} />
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        height: "100%",
        opacity: heroOpacity,
        transform: `translateY(${ty * 0.25}px)`,
        textAlign: "center", padding: "0 1.5rem",
      }}>
        <h1 style={{
          color: "#FFFFFF",
          fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
          fontWeight: 900,
          textShadow: "0 3px 25px rgba(0,0,0,0.95)",
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}>
          {lang === 'he' ? 'איך לבחור תיק גב' : 'How to Choose a Backpack'}
        </h1>
        <p style={{
          color: "#F0F0F0",
          fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
          fontWeight: 500,
          textShadow: "0 2px 15px rgba(0,0,0,0.95)",
          maxWidth: "600px",
        }}>
          {lang === 'he' ? 'המדריך המלא לכל סוג טיול' : 'The Complete Guide for Every Type of Trip'}
        </p>
      </div>
    </div>
  );
};

const CARDS = [
  {
    emoji: "🎒", color: "#4A9EFF", rgb: "74,158,255",
    he: { title: "לטיול יום", range: "מתחת ל-30 ליטר", uses: "טיולי יום בלבד. לא מתאים ללינה בשטח. קל ודינמי לכל יום פעיל. משקל תיק: 0.3–0.7 ק\"ג.", packing: ["בקבוק מים / מימייה", "אוכל קל ליום", "שכבת הגנה קלה", "ערכת עזרה ראשונה"], examples: ["טיול יום בנחל", "סיור עיר", "יום בים", "פארק לאומי"] },
    en: { title: "Day Pack", range: "Under 30L", uses: "Day hikes only. Not suitable for overnight trips. Light and dynamic for any active day. Pack weight: 0.3–0.7 kg.", packing: ["Water bottle / hydration bladder", "Day food", "Light weather layer", "First aid kit"], examples: ["River day hike", "City tour", "Beach day", "National park"] },
  },
  {
    emoji: "🏕️", color: "#6C63FF", rgb: "108,99,255",
    he: { title: "לסוף שבוע", range: "30–50 ליטר", uses: "הטווח המומלץ של REI לטיולים של לילה אחד עד 3 לילות. מספיק לציוד שינה וקמפינג בסיסי. משקל תיק: 0.9–1.5 ק\"ג.", packing: ["מערכת שינה (שק + מזרן)", "ביגוד ל-3 ימים", "ציוד בישול קל", "אוהל 1–2 אנשים"], examples: ["קמפינג 2 לילות", "טיול שבילים עם לינה", "טיול קתות"] },
    en: { title: "1–3 Night Pack", range: "30–50L", uses: "REI's recommended range for overnight to 3-night trips. Enough for a sleep system and basic camp gear. Pack weight: 0.9–1.5 kg.", packing: ["Sleep system (bag + pad)", "3 days of clothing", "Light cook system", "1–2P tent"], examples: ["2-night camping", "Trail with overnights", "Hut-to-hut trips"] },
  },
  {
    emoji: "🌲", color: "#00D4FF", rgb: "0,212,255",
    he: { title: "לטיול שבוע", range: "50–70 ליטר", uses: "הטווח הנפוץ ביותר — REI: מתאים לטיולים של 3+ ימים בתנאי מזג אוויר ממוצעים. הטווח שרוב המטיילים המנוסים בוחרים. משקל תיק: 1.2–2.0 ק\"ג.", packing: ["אוהל קל", "שק שינה", "ציוד בישול", "אוכל ל-5–7 ימים"], examples: ["שביל ישראל קטע", "הרי האלפים", "שבילי 5–7 ימים"] },
    en: { title: "3+ Days / Most Popular", range: "50–70L", uses: "The most popular range — REI: ideal for 3+ day warm-weather trips. The range most experienced hikers choose. Pack weight: 1.2–2.0 kg.", packing: ["Lightweight tent", "Sleeping bag", "Cook system", "5–7 days of food"], examples: ["Israel Trail section", "Alps trekking", "5–7 day thru-hikes"] },
  },
  {
    emoji: "🏔️", color: "#F97316", rgb: "249,115,22",
    he: { title: "למסע ארוך", range: "70+ ליטר", uses: "REI: טיולים של 5+ ימים, קמפינג חורף עם ציוד כבד, או הורים הנושאים חלק מציוד ילדים. גדול יותר = כבד יותר — השתמשו רק כשנדרש. משקל תיק: 1.8–3.0 ק\"ג.", packing: ["ציוד חורף מלא", "אוכל ל-7+ ימים", "ציוד בטיחות מורחב", "ציוד לילדים"], examples: ["קמפינג חורף", "המלאיה", "פטגוניה", "שביל ישראל מלא"] },
    en: { title: "5+ Days / Winter / Kids Gear", range: "70+L", uses: "REI: 5+ day trips, winter camping with heavy gear, or parents carrying children's gear share. Bigger = heavier — only use when truly required. Pack weight: 1.8–3.0 kg.", packing: ["Full winter gear", "7+ days of food", "Extended safety kit", "Children's gear share"], examples: ["Winter camping", "Himalayas", "Patagonia", "Full Israel Trail"] },
  },
];

const TIPS = {
  he: [
    { emoji: "📏", color: "#4A9EFF", rgb: "74,158,255", title: "מדדו אורך גב — לא גובה גוף (REI)", desc: "גובה גוף אינו קובע את גודל התיק. מדדו מחוליית C7 (הבליטה הגרמית בבסיס הצוואר) עד ל-Iliac Crest (קצה עצם הכסל העליון). זהו המדד שכל יצרן תיקים מסתמך עליו לקביעת סייז." },
    { emoji: "🎯", color: "#6C63FF", rgb: "108,99,255", title: "חגורת ירכיים נושאת 60–80% מהמשקל (REI)", desc: "חגורה נכונה יושבת ישירות על עצם הכסל ומעבירה את רוב המשא מהכתפיים לירכיים. חגורה שמחליקה כלפי מעלה או מטה מאבדת את יעילות העברת המשקל." },
    { emoji: "⬆️", color: "#00D4FF", rgb: "0,212,255", title: "כתפיות מתחברות לתיק בגובה הכתף בדיוק", desc: "גבוה מדי: לוחצות על הצוואר ומגבילות תנועה. נמוך מדי: מאבדות את יכולת העברת המשקל לחגורה. כוונו את אורך הכתפיות עד שהן עוטפות את הכתף בחצי עיגול." },
    { emoji: "🧪", color: "#F97316", rgb: "249,115,22", title: "בדקו תמיד עם עומס מלא לפני קנייה", desc: "מלאו את התיק בציוד אמיתי שלכם — לא משקולות. ציוד אמיתי מתפלג שונה ומגלה איך מערכת ההשעיה מתפקדת. 15 דקות הליכה בחנות שוות יותר מכל ביקורת אונליין." },
    { emoji: "✈️", color: "#EF4444", rgb: "239,68,68", title: "תיק עד 46 ליטר עשוי להיכנס כמטען יד", desc: "בדקו מדיניות חברת התעופה מראש — חיסכון של עשרות דולרים על משלוח מטען. מידות מחמירות: בדרך כלל 56×36×23 ס\"מ." },
  ],
  en: [
    { emoji: "📏", color: "#4A9EFF", rgb: "74,158,255", title: "Measure torso length — not body height (REI)", desc: "Your height doesn't determine pack size. Measure from C7 vertebra (the bony bump at the base of your neck) to your iliac crest (top of hip bones). This is the measurement every pack manufacturer uses for sizing." },
    { emoji: "🎯", color: "#6C63FF", rgb: "108,99,255", title: "Hip belt carries 60–80% of load (REI)", desc: "A proper hip belt sits squarely on the iliac crest and transfers most weight from shoulders to hips. A belt that slides up or down loses its weight-transfer efficiency entirely." },
    { emoji: "⬆️", color: "#00D4FF", rgb: "0,212,255", title: "Shoulder straps meet pack at exact shoulder level", desc: "Too high: pinches the neck and limits movement. Too low: loses weight transfer to the hip belt. Adjust strap length until they curve around the shoulder in a half-circle." },
    { emoji: "🧪", color: "#F97316", rgb: "249,115,22", title: "Always test with full load before buying", desc: "Fill the pack with your actual gear — not sandbags. Real gear distributes differently and reveals how the suspension really performs. 15 minutes walking with real weight beats any online review." },
    { emoji: "✈️", color: "#EF4444", rgb: "239,68,68", title: "Packs up to 46L may qualify as carry-on", desc: "Check airline policy in advance — can save tens of dollars on checked baggage fees. Strict dimensions: typically 56×36×23 cm maximum." },
  ],
};

const FACTORS = {
  he: [
    { emoji: "🎯", color: "#4A9EFF", rgb: "74,158,255", title: "מערכת גב", desc: "ה-Suspension System מחלקת את המשקל בין הכתפיים לירכיים — הגורם החשוב ביותר בנוחות הטיול." },
    { emoji: "⚖️", color: "#6C63FF", rgb: "108,99,255", title: "משקל עומס", desc: "הכלל המקצועי: סך המשא לא יעלה על 15% ממשקל גופכם. חריגה פוגעת ביציבה ומגבירה סיכון לפציעה." },
    { emoji: "💧", color: "#00D4FF", rgb: "0,212,255", title: "עמידות למים", desc: "ציפוי DWR דוחה גשם קל אך לא כבד. בדקו אם יש כיסוי גשם מובנה — זה שווה הרבה בטיול רטוב." },
  ],
  en: [
    { emoji: "🎯", color: "#4A9EFF", rgb: "74,158,255", title: "Suspension System", desc: "The suspension system distributes weight between your shoulders and hips — the single most important factor in hiking comfort." },
    { emoji: "⚖️", color: "#6C63FF", rgb: "108,99,255", title: "Load Weight", desc: "The professional rule: total load should not exceed 15% of your body weight. Exceeding this hurts posture and raises injury risk." },
    { emoji: "💧", color: "#00D4FF", rgb: "0,212,255", title: "Water Resistance", desc: "DWR coating repels light rain but not heavy downpours. Check for a built-in rain cover — essential in wet conditions." },
  ],
};

const UI = {
  he: {
    badge: "ציוד בסיסי",
    subtitle: "המדריך המלא — מתיק יום ועד משלחת",
    intro: "הבחירה בתיק גב נכון היא אחת ההחלטות החשובות ביותר שמטייל מקבל. תיק לא מתאים גורם לכאבי גב וכתפיים כבר ביום הראשון, בעוד שתיק שנבחר נכון — לפי סוג הטיול, אורכו ומשקל הציוד — הופך כל מסלול לחוויה שונה לחלוטין.",
    sectionSizes: "גדלי תיקים — מה מתאים לך?", clickHint: "לחצו על כל קטגוריה לפרטים נוספים",
    sectionFactors: "3 גורמים קריטיים לבחירה", sectionTips: "5 טיפים מקצועיים",
    mataim: "מתאים ל", laAroze: "מה לארוז", dugmaot: "דוגמאות",
    proTipTitle: "טיפ הזהב",
    proTipText: "תמיד קנו תיק בחנות פיזית עם אפשרות להחזרה — לא באונליין. ההבדל בין תיקים מורגש רק כשהגב מרגיש אותם עם משקל אמיתי.",
    related: "מאמרים נוספים",
    share: "שתפו:", backToBlog: "← חזרה לבלוג",
    rel1badge: "שינה בשטח", rel1title: "מדריך מקצועי לשק שינה",
    rel2badge: "אולטרה-לייט", rel2title: "הליכה אולטרה-לייט — עקרונות מקצועיים",
    nextLink: "מדריך שק שינה →",
  },
  en: {
    badge: "Gear Basics",
    subtitle: "From Day Packs to Expedition Packs",
    intro: "Choosing the right backpack is one of the most important decisions a hiker makes. A poor fit causes back and shoulder pain from day one, while a well-chosen pack — matched to trip type, duration and load — transforms every trail into a completely different experience.",
    sectionSizes: "Backpack Sizes — Which Is Right for You?", clickHint: "Click each category for details",
    sectionFactors: "3 Critical Factors for Choosing", sectionTips: "5 Pro Tips",
    mataim: "Best for", laAroze: "What to pack", dugmaot: "Examples",
    proTipTitle: "Golden Rule",
    proTipText: "Always buy a pack at a physical store with a return policy — never online. The difference between packs is only felt when your back carries real weight.",
    related: "More Articles",
    share: "Share:", backToBlog: "← Back to Blog",
    rel1badge: "Sleep Gear", rel1title: "The Expert's Guide to Sleeping Bags",
    rel2badge: "Ultralight", rel2title: "Ultralight Hiking: Professional Principles",
    nextLink: "Sleeping Bag Guide →",
  },
};

// ─── Expandable Card ─────────────────────────────────────────────────────────
function ExpandableCard({ card, lang }: { card: typeof CARDS[0]; lang: "he" | "en" }) {
  const [open, setOpen] = useState(false);
  const d = card[lang];
  const S = UI[lang];
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ border: `1px solid rgba(${card.rgb},0.35)`, background: open ? `linear-gradient(135deg,rgba(${card.rgb},0.09) 0%,rgba(13,11,31,0.97) 100%)` : "rgba(13,11,31,0.6)", boxShadow: open ? `0 0 48px rgba(${card.rgb},0.14)` : "none" }}>
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between gap-4 px-6 py-5 cursor-pointer"
        style={{ background: open ? `linear-gradient(135deg,rgba(${card.rgb},0.2) 0%,rgba(${card.rgb},0.05) 100%)` : `linear-gradient(135deg,rgba(${card.rgb},0.12) 0%,rgba(${card.rgb},0.02) 100%)` }}>
        <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-black text-lg transition-transform duration-300"
          style={{ background: `rgba(${card.rgb},0.15)`, border: `1.5px solid rgba(${card.rgb},0.45)`, color: card.color, transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
        <div className="flex-1 flex items-center gap-3 flex-wrap" style={{ justifyContent: lang === 'he' ? 'flex-end' : 'flex-start' }}>
          <span className="font-black text-white text-lg">{card.emoji} {d.title}</span>
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `rgba(${card.rgb},0.15)`, border: `1px solid rgba(${card.rgb},0.4)`, color: card.color }}>{d.range}</span>
        </div>
      </button>
      <div className="overflow-hidden transition-all duration-500 ease-in-out" style={{ maxHeight: open ? "480px" : "0px" }}>
        <div className="px-6 py-5 space-y-4">
          {([[ S.mataim, d.uses, false ], [ S.laAroze, d.packing, true ], [ S.dugmaot, d.examples, true ]] as [string, string | string[], boolean][]).map(([label, val, isPills]) => (
            <div key={label as string}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: card.color }}>{label}</p>
              {isPills ? (
                <div className="flex flex-wrap gap-2">
                  {(val as string[]).map(v => <span key={v} className="text-xs px-3 py-1.5 rounded-full" style={{ background: `rgba(${card.rgb},0.1)`, border: `1px solid rgba(${card.rgb},0.3)`, color: "rgba(255,255,255,0.8)" }}>{v}</span>)}
                </div>
              ) : <p className="text-white/75 text-sm">{val as string}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function BackpackGuidePage() {
  const { lang } = useLang();
  const S = UI[lang];
  const tips = TIPS[lang];
  const factors = FACTORS[lang];

  return (
    <div className="min-h-screen bg-[#0D0B1F]" dir={lang === 'he' ? 'rtl' : 'ltr'}>

      <VideoParallaxHero />

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <p className="mt-10 mb-14" style={{ color: "#B8C4E8", fontSize: "1.1rem", lineHeight: "1.9" }}>
          <span style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 0.85, color: "#4A9EFF", marginInlineEnd: "0.06em", display: "inline-block", verticalAlign: "bottom" }}>
            {S.intro.charAt(0)}
          </span>
          {S.intro.slice(1)}
        </p>

        {/* Sizes */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#4A9EFF,#6C63FF)" }} />
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ letterSpacing: "-0.02em", background: "linear-gradient(135deg,#4A9EFF,#6C63FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{S.sectionSizes}</h2>
          </div>
          <p className="text-sm mb-6" style={{ color: "#B8C4E8", opacity: 0.65, paddingInlineStart: "1.25rem" }}>{S.clickHint}</p>
          <div className="space-y-3">
            {CARDS.map(card => <ExpandableCard key={card.he.title} card={card} lang={lang} />)}
          </div>
        </section>

        {/* Key Factors */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#00D4FF,#6C63FF)" }} />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{S.sectionFactors}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {factors.map(f => (
              <div key={f.title} className="rounded-2xl p-6" style={{ background: `linear-gradient(135deg,rgba(${f.rgb},0.1) 0%,rgba(${f.rgb},0.02) 100%)`, border: `1px solid rgba(${f.rgb},0.3)` }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{f.emoji}</div>
                <h3 className="font-black text-white text-base mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.78 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pro Tips */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#F97316,#EF4444)" }} />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{S.sectionTips}</h2>
          </div>
          <div className="relative">
            <div className="absolute top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg,rgba(108,99,255,0.5),rgba(108,99,255,0))", insetInlineEnd: "1.375rem" }} />
            <div className="space-y-7">
              {tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-xl relative z-10"
                    style={{ background: `rgba(${tip.rgb},0.15)`, border: `2px solid ${tip.color}` }}>{tip.emoji}</div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-black text-white text-base mb-1">{tip.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.75 }}>{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pro Tip box */}
        <div className="rounded-2xl p-6 mb-16" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }}>
          <div className="flex items-start gap-3">
            <span style={{ fontSize: "1.75rem", lineHeight: 1, flexShrink: 0 }}>💡</span>
            <div>
              <h3 className="font-black text-white mb-2">{S.proTipTitle}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#B8C4E8", opacity: 0.82 }}>{S.proTipText}</p>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mb-14">
          <p className="font-black text-lg mb-6" style={{ color: "#A78BFA" }}>{S.related}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([
              { href: "/blog/sleeping-bag-guide", badge: S.rel1badge, title: S.rel1title },
              { href: "/blog/ultralight-hiking", badge: S.rel2badge, title: S.rel2title },
            ]).map(a => (
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

        <div className="pt-10 flex flex-col gap-5" style={{ borderTop: "1px solid rgba(108,99,255,0.2)" }}>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(108,99,255,0.7)" }}>{S.share}</span>
            <a href="https://wa.me/?text=https://trailiq.co/blog/how-to-choose-backpack" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125" style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#A78BFA" }}>WhatsApp</a>
            <a href="https://twitter.com/intent/tweet?url=https://trailiq.co/blog/how-to-choose-backpack" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125" style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#A78BFA" }}>Twitter / X</a>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110" style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)", color: "#A78BFA" }}>{S.backToBlog}</Link>
            <Link href="/blog/sleeping-bag-guide" className="text-sm hover:brightness-125 transition-all" style={{ color: "#4A9EFF" }}>{S.nextLink}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
