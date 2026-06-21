"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageProvider";

type Season = "summer" | "winter" | "spring" | "autumn";

/* ── Israeli flag palette ────────────────────────────────────────────────── */
const IL_BLUE   = "#0038b8";
const IL_ORANGE = "#FF6B35";

const SEASON_META = {
  he: {
    summer: { emoji: "☀️", label: "קיץ",  color: IL_ORANGE, rgb: "255,107,53"  },
    winter: { emoji: "🌧️", label: "חורף", color: IL_BLUE,   rgb: "0,56,184"   },
    spring: { emoji: "🌸", label: "אביב", color: "#22C55E", rgb: "34,197,94"   },
    autumn: { emoji: "🍂", label: "סתיו", color: "#F59E0B", rgb: "245,158,11"  },
  },
  en: {
    summer: { emoji: "☀️", label: "Summer", color: IL_ORANGE, rgb: "255,107,53" },
    winter: { emoji: "🌧️", label: "Winter", color: IL_BLUE,   rgb: "0,56,184"  },
    spring: { emoji: "🌸", label: "Spring",  color: "#22C55E", rgb: "34,197,94"  },
    autumn: { emoji: "🍂", label: "Autumn",  color: "#F59E0B", rgb: "245,158,11" },
  },
};

const SEASON_TIPS = {
  he: {
    summer: [
      "הגנת שמש UPF 50+ הכרחית — חולצה, מכנסיים, כובע רחב שוליים",
      "כמות מים: 3–4 ליטר בין נקודות מים; בנגב ובערבה — עד 6 ליטר",
      "הימנעו מהליכה בין 11:00–15:00 בחום קיצוני בנגב ובערבה",
      "בגדים בצבעים בהירים מפחיתים ספיגת חום ב-30%",
      "אלקטרוליטים חשובים כמו מים — אבקות אלקטרוליטים, אגוזים מלוחים או חטיפי אנרגיה עשירים במינרלים",
    ],
    winter: [
      "בגליל ובכרמל: ג'קט עמיד למים 20,000mm+ עם Breathability גבוה",
      "מזרן שינה בידוד R-value 4+ — הקרקע הגלילית קרה מאוד בינואר",
      "שק שינה מתאים ל-0°C עד -5°C לצפון בינואר, ל-+5°C למרכז ולדרום",
      "כיסויי נעליים (Gaiters) למניעת בוץ — השבילים הצפוניים בוציים מאוד",
      "שכבת בסיס + שכבת חום (פליז/פוך) + ג'קט עמיד רוח וגשם = שלוש שכבות לחורף",
    ],
    spring: [
      "האביב הוא עונת השיא — מזג אוויר נוח אך משתנה מהר",
      "שכבת מעבר קלה לרוח קרה בבוקר ובערב",
      "הנגב פעיל בנחשים באביב — חשוב לקשור שרוכים היטב ולבחור נעליים עם סוליה קשיחה ותמיכה לקרסול",
      "מקלות הליכה חיוניים בשבילים לחים אחרי גשמי מרץ",
      "2 ליטר מים מספיקים ברוב מסלולי הצפון בעונת האביב",
    ],
    autumn: [
      "הסתיו הוא עונת מעבר מצוינת — טמפרטורות נוחות בצפון ובמרכז",
      "בנגב: הלילות קרירים אך הימים עדיין חמים — לבשו שכבות שניתן להוסיף ולהוריד בקלות לאורך היום",
      "גשמי הסתיו יכולים להגיע מוקדם — דאגו למעיל גשם ולכיסויי ציוד אטומים למים",
      "עונה מצוינת לדרום השביל — הנגב יפהפה בצבעי הסתיו",
      "שעות אור קצרות יותר — תכננו את ההפסקות ונקודות המים בהתאם",
    ],
  },
  en: {
    summer: [
      "UPF 50+ sun protection is essential — shirt, pants, wide-brim hat",
      "Hydration: 3–4L between water sources; Negev — carry up to 6L",
      "Avoid hiking 11am–3pm in extreme heat in the Negev and Arava",
      "Light-colored clothing reduces heat absorption by 30%",
      "Electrolytes are as important as water — use electrolyte powder or sports drinks",
    ],
    winter: [
      "In Galilee and Carmel: 20,000mm+ waterproof jacket with high breathability rating",
      "Sleeping pad insulation R-value 4+ — Galilee ground is very cold in January",
      "Sleeping bag: Comfort 0°C for the north, +5°C for other sections",
      "Gaiters essential for muddy northern trails — they get very boggy",
      "Full layering system: base layer + fleece mid layer + shell jacket",
    ],
    spring: [
      "Peak season — comfortable weather but it changes fast",
      "Light transition layer (~100g jacket) for cool mornings and evenings",
      "High-ankle boots in the Negev — protection from snakes in spring",
      "Trekking poles essential on wet trails after March rains",
      "Flexible hydration: 2L often sufficient for most northern sections",
    ],
    autumn: [
      "Autumn is an excellent transition season — comfortable temperatures north and center",
      "In the Negev: cool nights but still warm days — bring a flexible layering system",
      "Early rains can arrive unexpectedly — prepare a rain jacket and dry bags",
      "Excellent season for the southern trail — the Negev is stunning in autumn colors",
      "Shorter daylight hours — plan water and camp stops accordingly",
    ],
  },
};

/* ── Trail route waypoints (north → south) ───────────────────────────────── */
const TRAIL_ROUTE = [
  { name: "חרמון",        nameEn: "Hermon",          km:    0, difficulty: 2, color: "#EFF6FF", rgb: "239,246,255" },
  { name: "גליל עליון",  nameEn: "Upper Galilee",   km:  130, difficulty: 4, color: "#BFDBFE", rgb: "191,219,254" },
  { name: "כרמל",        nameEn: "Carmel",           km:  290, difficulty: 3, color: "#93C5FD", rgb: "147,197,253" },
  { name: "מישור החוף",  nameEn: "Coastal Plain",    km:  530, difficulty: 1, color: "#3B82F6", rgb: "59,130,246"  },
  { name: "הרי ירושלים", nameEn: "Jerusalem Hills", km:  470, difficulty: 3, color: "#60A5FA", rgb: "96,165,250"  },
  { name: "נגב צפוני",   nameEn: "Northern Negev",  km:  700, difficulty: 5, color: "#FB923C", rgb: "251,146,60"  },
  { name: "מכתש רמון",   nameEn: "Ramon Crater",    km:  820, difficulty: 4, color: "#F97316", rgb: "249,115,22"  },
  { name: "ערבה",        nameEn: "Arava",            km:  935, difficulty: 3, color: "#EA580C", rgb: "234,88,12"   },
  { name: "אילת",        nameEn: "Eilat",            km: 1000, difficulty: 4, color: "#C2410C", rgb: "194,65,12"   },
];

const GEAR_SECTIONS = {
  he: [
    { icon: "⛺", title: "מחסה", color: "#4A9EFF", rgb: "74,158,255",
      items: [["אוהל","3 עונות קל משקל, עמיד לרוח"],["יתדות","4–6 יתדות, עם פטיש קטן"],["Tarp","אפשרות קלה וגמישה למחסה בשטח פתוח"],["מחצלת קלה","מגינה על תחתית האוהל ומוסיפה שכבת בידוד מהקרקע"]] },
    { icon: "🛏️", title: "שינה", color: "#6C63FF", rgb: "108,99,255",
      items: [["שק שינה","דירוג Comfort +15°C לקיץ, 0°C עד -5°C לחורף"],["מזרן שינה / Sleeping Pad","מבודד מהקרקע — חובה בכל עונות השנה"],["כרית קמפינג","מתנפחת — 60–120 גרם, חוסכת עומס על הצוואר"]] },
    { icon: "🍳", title: "מטבח שטח", color: "#F97316", rgb: "249,115,22",
      items: [["גזייה אלפינית","קומפקטית וקלה, מתאימה לבישול בשטח"],["מיכל גז","מתאים לגזייה האלפינית"],["סיר בישול","בגודל מתאים לצרכי הטיול"],["Spork","כפית/מזלג משולב"],["בקבוק מים","מומלץ בקבוק קל וגמיש שנוח למלא בחניוני הלילה לצרכי הבישול"]] },
    { icon: "🏥", title: "בטיחות", color: "#EF4444", rgb: "239,68,68",
      items: [["ערכת עזרה ראשונה","תחבושות, פלסטרים, משחה אנטיביוטית, כדורי כאב"],["פנס ראש (Headlamp)","LED, 200–400 לומן לפחות"],["סוללות גיבוי","ערכה נוספת לפחות לפנס הראש"],["משרוקית חירום","לרוב כלולה בתיק הגב, נשמעת מרחק רב יותר מהקול האנושי"],["מצית","אחת מספיקה, עדיף עמידה למים"]] },
    { icon: "🧭", title: "ניווט", color: "#00D4FF", rgb: "0,212,255",
      items: [["מפת שביל ישראל","מפות 1:50,000 — לחלק הרלוונטי"],["מצפן","מצפן בסיסי לניווט בשטח"],["טלפון עם מפות אופליין","הורידו offline לפני היציאה"]] },
    { icon: "👕", title: "לבוש", color: "#A78BFA", rgb: "167,139,250",
      items: [["תחתוני ספורט (Moisture-Wicking)","2–3 זוגות, בד סינתטי שמנדף זיעה"],["גרבי הליכה","3 זוגות לפחות; צמר מרינו מומלץ"],["חולצות נושמות","2–3 חולצות ספורט; UPF 50+ לקיץ","UPF (Ultraviolet Protection Factor) — מדד הגנה מקרינת UV. UPF 50+ חוסם 98% מהקרינה"],["כובע שמש רחב שוליים","הגנה על פנים ועורף — חיוני בשביל ישראל"],["פליז (Fleece)","לשכבת ביניים בימים קרירים"],["ג'קט גשם","עמיד למים 10,000mm+, קל וקומפקטי"]] },
  ],
  en: [
    { icon: "⛺", title: "Shelter", color: "#4A9EFF", rgb: "74,158,255",
      items: [["Tent","3-season lightweight, wind-resistant"],["Tent poles","Confirm they're included or store separately"],["Tent stakes","6–8 minimum, with a small mallet"],["Rainfly","Essential — rain on the Israel Trail is inevitable in winter"],["Ground sheet / Footprint","Protects tent floor from punctures"]] },
    { icon: "🛏️", title: "Sleep System", color: "#6C63FF", rgb: "108,99,255",
      items: [["Sleeping bag","Comfort +5°C for summer, -5°C for winter"],["Sleeping pad","Insulates from cold ground — essential, not optional"],["Camp pillow","Inflatable — 60–120g, saves neck strain"]] },
    { icon: "🍳", title: "Camp Kitchen", color: "#F97316", rgb: "249,115,22",
      items: [["Camp stove","Compact canister stove for solo use"],["Gas canister","150–230g per week of cooking"],["Cook pot","400–900ml; titanium for ultralight"],["Spork","Spoon-fork combo — saves weight and space"],["Water filter","Essential — don't rely on all sources being clean"],["1–2L water bottle","Carry water between sources"]] },
    { icon: "🏥", title: "Safety", color: "#EF4444", rgb: "239,68,68",
      items: [["First aid kit","Bandages, blister pads, antibiotic ointment, pain relief"],["Headlamp","LED, minimum 200–400 lumens"],["Spare batteries","At least one spare set for the headlamp"],["Emergency whistle","Carries much farther than your voice"],["Fire starter / Lighter","Two — one waterproof"],["Emergency blanket","20–30g, life-saving in an emergency"]] },
    { icon: "🧭", title: "Navigation", color: "#00D4FF", rgb: "0,212,255",
      items: [["Israel Trail map","1:50,000 scale — at least for your section"],["Compass","Basic, non-digital — batteries die"],["Phone with offline maps","Download before leaving cell service"],["Power bank","10,000 mAh for a week; 20,000 mAh for longer"]] },
    { icon: "👕", title: "Clothing", color: "#A78BFA", rgb: "167,139,250",
      items: [["Moisture-wicking underwear","2–3 pairs; cotton = guaranteed chafing"],["Hiking socks","3+ pairs; merino wool recommended to prevent blisters"],["Breathable shirts","2–3 sport shirts; UPF 50+ for summer","UPF (Ultraviolet Protection Factor) — UV protection rating. UPF 50+ blocks 98% of UV radiation"],["Wide-brim sun hat","Protects face and neck — essential on the Israel Trail"],["Fleece jacket","Mid-layer for cool days and cold mornings"],["Rain jacket","Waterproof 10,000mm+, lightweight and packable"]] },
  ],
};

const PRO_TIPS = {
  he: [
    "תכננו נקודות מים מראש — בנגב ובערבה יש קטעים ארוכים בין מקורות מים",
    "בחורף בצפון: הכינו ציוד לגשם כבד ובוץ — הגליל יכול להיות מאתגר מאוד",
    "בדרום: הכינו ציוד לחום קיצוני ביום וקור בלילה — ההפרשים גדולים מאוד",
    "מלאכי שביל לאורך הדרך — קיבוצים, מושבים ותושבים מקומיים שמציעים מים, מקלחת ולפעמים אוכל למטיילים. כדאי לתכנן מראש היכן ממלאים מזון וציוד",
    "הביאו בגד ים — לאורך השביל יש גבים ומעיינות מרהיבים שכדאי מאוד לקפוץ אליהם",
    "תעדו את המסע — מצלמה או סמארטפון עם סוללה טובה יתפסו רגעים שתזכרו כל החיים",
    "תכננו ימי מנוחה במקומות מיוחדים — עצרו בקיבוצים ובמושבים, התנדבו בחוות, הכירו אנשים מדהימים לאורך הדרך",
  ],
  en: [
    "Plan water sources in advance — in the Negev and Arava there are long stretches between water points",
    "In winter in the north: prepare for heavy rain and mud — the Galilee can be very challenging",
    "In the south: prepare for extreme heat during the day and cold at night — the temperature gaps are significant",
    "Trail angels along the way — kibbutzim, moshavim and locals who offer water, showers and sometimes food. Plan ahead where to resupply",
    "Bring a swimsuit — along the trail there are stunning springs and pools worth diving into",
    "Document your journey — a camera or smartphone with good battery life will capture moments you'll remember forever",
    "Plan rest days in special places — stop at kibbutzim and moshavim, volunteer on farms, meet amazing people along the way",
  ],
};

const UI = {
  he: {
    badge: "שביל ישראל",
    subtitle: "רשימת ציוד מלאה ומקצועית — ממחסה ושינה ועד ניווט ובטיחות",
    intro1: "שביל ישראל עובר כ-1,000 ק\"מ מדן בצפון עד אילת בדרום, חוצה מגוון טרריין עצום: חורשות ירוקות בגליל, עמקים פוריים, מדבר יהודה, הנגב והערבה.",
    intro2: "בגלל המגוון האקלימי הגדול — מהחורף הגלילי הקר ועד לחום הכבד של הנגב — הציוד חייב להיות מקיף ומחושב.",
    secRoute: "מסלול השביל — מצפון לדרום",
    diffLabel: "צבע לפי אזור", kmLabel: "ק\"מ",
    stat1: "1,000+", stat1l: "ק\"מ",
    stat2: "45–60",  stat2l: "ימי הליכה",
    stat3: "4",      stat3l: "אזורי אקלים",
    stat4: "כל השנה", stat4l: "עונות הליכה",
    secSeason: "המלצות לפי עונה",
    seasonLabel: (s: string) => `המלצות לעונת ${s}`,
    secGear: "רשימת ציוד מלאה",
    proTipsTitle: "טיפים מקצועיים לשביל ישראל",
    related: "מאמרים נוספים",
    share: "שתפו:", backToBlog: "← חזרה לבלוג",
    rel1badge: "טיפים", rel1title: "טעויות נפוצות בבחירת ציוד טיול",
    rel2badge: "שינה בשטח", rel2title: "מדריך מקצועי לשק שינה",
    nextLink: "הליכה אולטרה-לייט →",
  },
  en: {
    badge: "Israel Trail",
    subtitle: "Everything you need to know — shelter, sleep, kitchen, safety, navigation & clothing",
    intro1: "The Israel National Trail spans ~1,000km from Dan in the north to Eilat in the south, crossing an enormous variety of terrain: green Galilee forests, fertile valleys, the Judean Desert, the Negev and the Arava.",
    intro2: "Because of the extreme climate diversity — from cold Galilean winters to the heavy heat of the Negev — gear must be comprehensive and carefully planned.",
    secRoute: "Trail Route — North to South",
    diffLabel: "Color by region", kmLabel: "km",
    stat1: "1,000+", stat1l: "km",
    stat2: "45–60",  stat2l: "Days hiking",
    stat3: "4",      stat3l: "Climate zones",
    stat4: "Year-round", stat4l: "Hiking seasons",
    secSeason: "Seasonal Recommendations",
    seasonLabel: (s: string) => `${s} Recommendations`,
    secGear: "Complete Gear Checklist",
    proTipsTitle: "Pro Tips for the Israel Trail",
    related: "More Articles",
    share: "Share:", backToBlog: "← Back to Blog",
    rel1badge: "Tips", rel1title: "5 Common Gear Mistakes to Avoid",
    rel2badge: "Sleep Gear", rel2title: "Expert Sleeping Bag Guide",
    nextLink: "Ultralight Hiking →",
  },
};

export default function IsraelTrailGearPage() {
  const { lang } = useLang();
  const [season, setSeason] = useState<Season>("summer");
  const S = UI[lang];
  const he = lang === "he";
  const seasonMeta = SEASON_META[lang];
  const tips = SEASON_TIPS[lang][season];
  const gear = GEAR_SECTIONS[lang];
  const proTips = PRO_TIPS[lang];
  const info = seasonMeta[season];

  return (
    <div className="min-h-screen bg-[#0D0B1F]" dir={he ? "rtl" : "ltr"}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: "72vh", minHeight: "520px" }}>
        <img
          src="https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Israeli-flag-inspired gradient overlay: blue top → transparent → dark bottom */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg,
            rgba(0,56,184,0.55) 0%,
            rgba(13,11,31,0.35) 40%,
            rgba(13,11,31,0.75) 72%,
            #0D0B1F 100%)`,
        }} />
        {/* Subtle orange glow at the bottom (desert horizon) */}
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{
          background: `linear-gradient(to top, rgba(255,107,53,0.18) 0%, transparent 100%)`,
        }} />
        {/* Israeli flag accent stripe */}
        <div className="absolute top-0 inset-x-0 h-1 pointer-events-none" style={{
          background: `linear-gradient(90deg, ${IL_BLUE} 0%, #ffffff 50%, ${IL_ORANGE} 100%)`,
        }} />

        <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-4 pb-14 pt-28">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
            style={{ background: `rgba(255,107,53,0.18)`, border: `1px solid rgba(255,107,53,0.55)`, color: IL_ORANGE }}>
            {S.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight"
            style={{ letterSpacing: "-0.02em" }}>
            {he ? (
              <>ציוד{" "}
                <span style={{ background: `linear-gradient(135deg,${IL_ORANGE},#FFB347)`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>שביל ישראל</span>
              </>
            ) : (
              <><span style={{ background: `linear-gradient(135deg,${IL_ORANGE},#FFB347)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Israel Trail</span>{" "}Gear Guide</>
            )}
          </h1>
          <p className="text-lg sm:text-xl font-semibold max-w-2xl" style={{ color: "rgba(255,220,180,0.9)" }}>
            {S.subtitle}
          </p>
        </div>
      </div>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(90deg, rgba(0,56,184,0.25) 0%, rgba(13,11,31,0.8) 50%, rgba(255,107,53,0.2) 100%)`,
        borderBottom: `1px solid rgba(255,107,53,0.2)` }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {([
            [S.stat1, S.stat1l, IL_ORANGE],
            [S.stat2, S.stat2l, IL_BLUE],
            [S.stat3, S.stat3l, "#22C55E"],
            [S.stat4, S.stat4l, "#F59E0B"],
          ] as [string, string, string][]).map(([val, lbl, col]) => (
            <div key={lbl} className="text-center">
              <p className="font-black text-2xl sm:text-3xl" style={{ color: col,
                textShadow: `0 0 20px ${col}66` }}>{val}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(184,196,232,0.6)", letterSpacing: "0.08em" }}>{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">

        {/* Intro */}
        <div className="mt-10 mb-10 space-y-4" style={{ color: "#B8C4E8", fontSize: "1.1rem", lineHeight: "1.9" }}>
          <p>
            <span style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 0.85, color: IL_ORANGE,
              marginInlineEnd: "0.06em", display: "inline-block", verticalAlign: "bottom" }}>
              {S.intro1.charAt(0)}
            </span>
            {S.intro1.slice(1)}
          </p>
          <p>{S.intro2}</p>
        </div>


        {/* ── TRAIL ROUTE ─────────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{
              background: `linear-gradient(180deg,${IL_ORANGE},${IL_BLUE})` }} />
            <h2 className="text-2xl sm:text-3xl font-black" style={{
              letterSpacing: "-0.02em",
              background: `linear-gradient(135deg,${IL_ORANGE},#FFB347)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>{S.secRoute}</h2>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{
            background: "rgba(13,11,31,0.7)",
            border: `1px solid rgba(255,107,53,0.25)`,
          }}>
            {/* Route strip header */}
            <div className="px-5 py-3" style={{
              background: `linear-gradient(135deg,rgba(0,56,184,0.2),rgba(255,107,53,0.1))`,
              borderBottom: `1px solid rgba(255,107,53,0.15)`,
            }}>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#22C55E" }}>
                  {he ? "חרמון (צפון)" : "Hermon (North)"}
                </span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,#22C55E,${IL_ORANGE},${IL_BLUE})` }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: IL_BLUE }}>
                  {he ? "אילת (דרום)" : "Eilat (South)"}
                </span>
              </div>
            </div>

            {/* Waypoints — one card per section */}
            <div className="p-3 grid max-w-[600px] mx-auto" style={{ gap: "6px" }}>
              {TRAIL_ROUTE.map((pt, i) => (
                <div
                  key={i}
                  className="rounded-xl px-3 py-3"
                  style={{
                    background: `rgba(${pt.rgb},0.07)`,
                    borderLeft: `4px solid ${pt.color}`,
                  }}
                >
                  {/* Top row: name (left) + km (right) */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-sm text-white">
                      {he ? pt.name : pt.nameEn}
                    </span>
                    <span className="font-medium" style={{ fontSize: "0.75rem", color: "rgba(184,196,232,0.5)" }}>
                      {pt.km} {S.kmLabel}
                    </span>
                  </div>
                  {/* Bottom row: difficulty dots */}
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(d => (
                      <span
                        key={d}
                        className="inline-block rounded-full"
                        style={{
                          width: "10px", height: "10px",
                          background: d <= pt.difficulty ? pt.color : "rgba(255,255,255,0.08)",
                        }}
                      />
                    ))}
                    <span className="font-bold ms-1.5" style={{ fontSize: "0.7rem", color: pt.color }}>
                      {pt.difficulty}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="px-5 py-3 flex gap-5 flex-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(184,196,232,0.4)" }}>
                {S.diffLabel}:
              </span>
              {([
                ["#EFF6FF", he ? "חרמון / גליל"    : "Hermon / Galilee"],
                ["#3B82F6", he ? "מישור החוף / מרכז" : "Coastal Plain / Center"],
                ["#FB923C", he ? "נגב צפוני"        : "N. Negev"],
                ["#EA580C", he ? "ערבה"             : "Arava"],
                ["#C2410C", he ? "אילת (דרום)"      : "Eilat (South)"],
              ] as [string, string][]).map(([c, l]) => (
                <span key={l} className="text-[10px] flex items-center gap-1.5" style={{ color: "rgba(184,196,232,0.55)" }}>
                  <span className="inline-block w-2 h-2 rounded-full border border-white/10" style={{ background: c }} />{l}
                </span>
              ))}
              <p className="text-[10px] w-full mt-1" style={{ color: "rgba(184,196,232,0.4)", lineHeight: "1.6" }}>
                * {he
                  ? <>דירוגי הקושי הם הערכה כללית בלבד. לדירוג רשמי ועדכני של כל מקטע, בקר באתר החברה להגנת הטבע:{" "}
                      <a href="https://teva.org.il" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(74,158,255,0.7)", textDecoration: "underline" }}>teva.org.il</a></>
                  : <>Difficulty ratings are general estimates only. For official ratings per section, visit the Society for the Protection of Nature in Israel:{" "}
                      <a href="https://teva.org.il" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(74,158,255,0.7)", textDecoration: "underline" }}>teva.org.il</a></>}
              </p>
            </div>
          </div>
        </section>

        {/* ── SEASONAL TABS ────────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{
              background: `linear-gradient(180deg,${IL_ORANGE},#F59E0B)` }} />
            <h2 className="text-2xl sm:text-3xl font-black" style={{
              letterSpacing: "-0.02em",
              background: `linear-gradient(135deg,${IL_ORANGE},#FFB347)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>{S.secSeason}</h2>
          </div>

          {/* Season tabs */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {(["summer","winter","spring","autumn"] as Season[]).map(s => {
              const si = seasonMeta[s];
              const active = season === s;
              return (
                <button key={s} onClick={() => setSeason(s)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black transition-all duration-200 cursor-pointer"
                  style={{
                    background: active ? `linear-gradient(135deg,rgba(${si.rgb},0.28),rgba(${si.rgb},0.10))` : "rgba(13,11,31,0.6)",
                    border: active ? `1.5px solid rgba(${si.rgb},0.8)` : "1px solid rgba(255,255,255,0.1)",
                    color: active ? si.color : "rgba(255,255,255,0.45)",
                    transform: active ? "scale(1.04)" : "scale(1)",
                    boxShadow: active ? `0 0 18px rgba(${si.rgb},0.25)` : "none",
                  }}>
                  <span>{si.emoji}</span><span>{si.label}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{ background: `linear-gradient(135deg,rgba(${info.rgb},0.08) 0%,rgba(13,11,31,0.95) 100%)`,
              border: `1px solid rgba(${info.rgb},0.35)` }}>
            <div className="px-6 py-5" style={{
              background: `linear-gradient(135deg,rgba(${info.rgb},0.18) 0%,rgba(${info.rgb},0.04) 100%)`,
              borderBottom: `1px solid rgba(${info.rgb},0.2)`,
            }}>
              <h3 className="font-black text-white text-lg">{info.emoji} {S.seasonLabel(info.label)}</h3>
            </div>
            <ul className="p-6 space-y-3.5">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  {/* Orange checkmark */}
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                    style={{ background: `rgba(${info.rgb},0.18)`, color: info.color }}>
                    ✓
                  </span>
                  <p style={{ color: "#B8C4E8", fontSize: "1rem", lineHeight: "1.75" }}>{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── GEAR CHECKLIST ───────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{
              background: `linear-gradient(180deg,${IL_BLUE},${IL_ORANGE})` }} />
            <h2 className="text-2xl sm:text-3xl font-black" style={{
              letterSpacing: "-0.02em",
              background: `linear-gradient(135deg,${IL_BLUE},#4A9EFF)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>{S.secGear}</h2>
          </div>

          {/* Gear list disclaimer */}
          <p className="text-sm mb-5 px-4 py-3 rounded-xl" style={{
            background: "rgba(74,158,255,0.07)",
            border: "1px solid rgba(74,158,255,0.2)",
            color: "rgba(184,196,232,0.75)",
            lineHeight: "1.75",
          }}>
            {he
              ? "רשימת הציוד המומלצת מבוססת על ניסיון מטיילים ומקורות מהשטח. המשקל הממוצע המומלץ לתיק: עד 15 ק\"ג ללא מים"
              : "The recommended gear list is based on hiker experience and field sources. Recommended average pack weight: up to 15 kg without water"}
          </p>

          <div className="space-y-4">
            {gear.map(sec => (
              <div key={sec.title} className="rounded-2xl overflow-hidden"
                style={{ border: `1px solid rgba(${sec.rgb},0.28)`, background: "rgba(13,11,31,0.65)" }}>
                <div className="flex items-center gap-3 px-5 py-4"
                  style={{ background: `linear-gradient(135deg,rgba(${sec.rgb},0.14) 0%,rgba(${sec.rgb},0.02) 100%)`,
                    borderBottom: `1px solid rgba(${sec.rgb},0.15)` }}>
                  <span style={{ fontSize: "1.5rem" }}>{sec.icon}</span>
                  <h3 className="font-black text-base" style={{ color: sec.color }}>{sec.title}</h3>
                </div>
                <div className="p-5 space-y-3">
                  {sec.items.map(([name, note, tooltip]) => (
                    <div key={name} className="flex items-start gap-3">
                      {/* Orange checkmark square */}
                      <div className="flex-shrink-0 w-5 h-5 rounded mt-0.5 flex items-center justify-center"
                        style={{ border: `1.5px solid rgba(255,107,53,0.5)`, background: "rgba(255,107,53,0.08)" }}>
                        <span style={{ fontSize: "0.6rem", color: IL_ORANGE, fontWeight: 900 }}>✓</span>
                      </div>
                      <div className="flex-1">
                        <div>
                          <span className="font-semibold text-sm" style={{ color: "rgba(255,255,255,0.88)" }}>{name}</span>
                          {note && (
                            <span className="text-sm" style={{ color: "#B8C4E8", opacity: 0.5, marginInlineStart: "0.5rem" }}>
                              — {note}
                              {tooltip && (
                                <span className="relative group inline-block ms-1.5 align-middle">
                                  <span className="cursor-help select-none" style={{ color: "rgba(0,212,255,0.65)", fontSize: "0.7rem" }}>ⓘ</span>
                                  <span className="hidden group-hover:block absolute z-20 bottom-full start-0 mb-2 w-64 p-3 rounded-xl text-xs leading-relaxed font-normal shadow-xl"
                                    style={{ background: "#0a0a14", border: "1px solid rgba(0,212,255,0.25)", color: "rgba(0,212,255,0.85)", direction: he ? "rtl" : "ltr", textAlign: he ? "right" : "left", opacity: 1 }}>
                                    {tooltip}
                                  </span>
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                        {tooltip && (
                          <p className="md:hidden mt-2 text-xs px-3 py-2 rounded-xl leading-relaxed"
                            style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)", color: "rgba(0,212,255,0.75)" }}>
                            {tooltip}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRO TIPS ─────────────────────────────────────────────────── */}
        <div className="rounded-2xl p-6 mb-14" style={{
          background: `linear-gradient(135deg,rgba(0,56,184,0.12),rgba(255,107,53,0.08))`,
          border: `1px solid rgba(255,107,53,0.35)`,
        }}>
          <div className="flex items-start gap-3 mb-5">
            <span style={{ fontSize: "1.75rem", lineHeight: 1, flexShrink: 0 }}>💡</span>
            <h3 className="font-black text-white text-lg" style={{ letterSpacing: "-0.01em" }}>{S.proTipsTitle}</h3>
          </div>
          <ul className="space-y-3.5">
            {proTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3" style={{ color: "#B8C4E8", fontSize: "1rem", lineHeight: "1.75" }}>
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2.5" style={{ background: IL_ORANGE }} />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* ── RELATED ──────────────────────────────────────────────────── */}
        <div className="mb-14">
          <p className="font-black text-lg mb-6" style={{ color: "#A78BFA" }}>{S.related}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([
              { href: "/blog/common-gear-mistakes", badge: S.rel1badge, title: S.rel1title },
              { href: "/blog/sleeping-bag-guide",   badge: S.rel2badge, title: S.rel2title },
            ]).map(a => (
              <Link key={a.href} href={a.href}
                className="block group rounded-xl p-5 relative overflow-hidden transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#1a1040 0%,#0d1f4a 100%)", border: "1px solid rgba(108,99,255,0.22)" }}>
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-xl opacity-25 pointer-events-none"
                  style={{ background: "radial-gradient(circle,#6C63FF,#4A9EFF)" }} />
                <div className="relative z-10">
                  <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full text-white inline-block mb-3"
                    style={{ background: "linear-gradient(135deg,#6C63FF,#4A9EFF)" }}>{a.badge}</span>
                  <h3 className="text-white font-bold text-sm leading-snug mb-2">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── OFFICIAL SOURCES ─────────────────────────────────────────── */}
        <div className="mb-10 rounded-xl p-5" style={{
          background: "rgba(13,11,31,0.7)",
          border: `1px solid rgba(255,107,53,0.2)`,
        }}>
          <p className="font-bold text-sm mb-3" style={{ color: "rgba(184,196,232,0.65)" }}>
            {he ? "מקורות ומידע רשמי" : "Official Sources & Resources"}
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span style={{ color: IL_ORANGE, fontSize: "0.65rem" }}>▸</span>
              <a href="https://teva.org.il/israel-national-trail" target="_blank" rel="noopener noreferrer"
                className="hover:brightness-125 transition-all"
                style={{ color: "#4A9EFF", textDecoration: "underline" }}>
                {he ? "החברה להגנת הטבע — שביל ישראל" : "Society for Protection of Nature — Israel Trail"}
              </a>
              <span style={{ color: "rgba(184,196,232,0.35)", fontSize: "0.75rem" }}>teva.org.il/israel-national-trail</span>
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: IL_ORANGE, fontSize: "0.65rem" }}>▸</span>
              <a href="https://shvilist.com" target="_blank" rel="noopener noreferrer"
                className="hover:brightness-125 transition-all"
                style={{ color: "#4A9EFF", textDecoration: "underline" }}>
                {he ? "שביליסט" : "Shvilist"}
              </a>
              <span style={{ color: "rgba(184,196,232,0.35)", fontSize: "0.75rem" }}>shvilist.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: IL_ORANGE, fontSize: "0.65rem" }}>▸</span>
              <span style={{ color: "rgba(184,196,232,0.6)" }}>
                {he ? "מפות: אפליקציית עמוד ענן" : "Maps: Amud Anan app"}
              </span>
            </li>
          </ul>
        </div>

        {/* ── NAV ──────────────────────────────────────────────────────── */}
        <div className="pt-10 flex flex-col gap-5" style={{ borderTop: "1px solid rgba(108,99,255,0.2)" }}>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(108,99,255,0.7)" }}>{S.share}</span>
            <a href="https://wa.me/?text=https://trailiq.co/blog/israel-trail-gear" target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125"
              style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#A78BFA" }}>WhatsApp</a>
            <a href="https://twitter.com/intent/tweet?url=https://trailiq.co/blog/israel-trail-gear" target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125"
              style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#A78BFA" }}>Twitter / X</a>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110"
              style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)", color: "#A78BFA" }}>
              {S.backToBlog}
            </Link>
            <Link href="/blog/ultralight-hiking" className="text-sm hover:brightness-125 transition-all"
              style={{ color: "#4A9EFF" }}>{S.nextLink}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
