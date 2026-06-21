"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useLang } from "@/lib/LanguageProvider";

const MISTAKES = {
  he: [
    {
      num: "01",
      title: "מכנסיים ללא נשימתיות לאקלים חם",
      problem: "מטיילים רבים מביאים מכנסיים כותנה או ג'ינס לטיולים באקלים חם ולח. כותנה סופגת זיעה, שומרת לחות ומתייבשת לאט — מתכון בטוח לשפשופים, פצעים ותחושת אי-נוחות לאורך כל היום.",
      fix: ["בחרו בד עם ציון UPF 50+ להגנה מפני קרינה — חשוב לאזורים עם שמש ישירה","חפשו חומר Moisture-Wicking שמעביר זיעה מהגוף החוצה","מכנסיים עם רוכסן כפול שנפתח משני הכיוונים מציעים גמישות מרבית","כותנה מתייבשת שעות; פוליאסטר/ניילון — דקות"],
    },
    {
      num: "02",
      title: "קניית מעיל גשם ללא בדיקת עמידות למים",
      problem: "מעיל 'עמיד למים' ו'אטום למים' הם לא אותו דבר. מטיילים רבים מגיעים לטיול עם מעיל שנרטב לאחר 20 דקות בגשם — כי לא בדקו את הנתונים הטכניים לפני הקנייה.",
      fix: ["Water Column Rating: 5,000mm = בסיסי; 10,000mm = טוב; 20,000mm+ = מצוין","לטיולים בגשם אמיתי — אל תסתפקו בפחות מ-10,000mm","בדקו גם Breathability (MVTR): 10,000g/m²/24h ומעלה","ציפוי DWR הכרחי — ללא DWR, גם 20,000mm מעיל יירטב"],
    },
    {
      num: "03",
      title: "העדר מערכת ריבוד (Layering System)",
      problem: "הלבשה 'בשכבה אחת' — חולצה עבה, סוודר כבד — היא הגישה הפחות יעילה לוויסות חום בשטח. תנאי מזג האוויר משתנים בקצב מהיר בהרים, ומערכת ריבוד מאפשרת הסתגלות מהירה.",
      fix: ["שכבת בסיס (Base Layer): מוציאה זיעה — פוליאסטר או צמר מרינו. לא כותנה","שכבת ביניים (Mid Layer): בידוד — פליז או מעיל ממולא","שכבה חיצונית (Shell): הגנה מרוח וגשם — לא בהכרח מחממת","הוסיפו/הסירו שכבות לפי אינטנסיביות ההליכה ושינויי הטמפרטורה"],
    },
    {
      num: "04",
      title: "התעלמות מציפוי DWR",
      problem: "DWR (Durable Water Repellent) הוא ציפוי חיצוני שמחייב מים להתגלגל מהבד. ללא ציפוי DWR פעיל, אפילו ג'קט אטום למים נשאר רטוב מבחוץ ומונע נשימה.",
      fix: ["ציפוי DWR נשחק עם הזמן — בדקו כל 10–15 יציאות לשטח","סימן להחלפה: הבד סופג מים ומתרטב — במקום שהמים יתגלגלו ויידחו","ניתן לרענן את ציפוי ה-DWR עם תרסיס מיוחד ולאחר מכן לייבש את הבגד במייבש כביסה על חום נמוך","כבסו ג'קט הגנה לפי הוראות היצרן — כביסה בלחץ נמוך מחדשת את ה-DWR"],
    },
    {
      num: "05",
      title: "ויתור על מקלות הליכה",
      problem: "מטיילים רבים תופסים מקלות הליכה כציוד לקשישים. זוהי אחת הטעויות הגדולות ביותר. ירידות ארוכות בלי מקלות מצטברות לנזק ממשי על המפרקים — במיוחד בטיולים רב-יומיים.",
      fix: ["מחקרים מראים שמקלות הליכה מפחיתים עומס על ברכיים ב-25% בממוצע בירידות","בעליות, מקלות מפחיתים עומס על הרגליים ועוזרים להניע את הגוף קדימה","מקלות מסייעים לשיווי משקל במעברי נחל ועל אבנים חלקות","מקלות מתקפלים שוקלים 200–350 גרם לזוג — שווה כל גרם"],
    },
    {
      num: "06",
      title: "הסתמכות על GPS בלבד",
      problem: "GPS הוא כלי מעולה, אך סוללות נגמרות, מסכים נשברים ואות יכול ללכת לאיבוד. מטיילים שנסמכים אך ורק על GPS ומוצאים עצמם ללא מכשיר פעיל בשטח נמצאים בסכנה ממשית.",
      fix: ["GPS לבד אינו תחליף למפה ומצפן — תמיד שאו את שניהם","מפה טופוגרפית פיזית אינה תלויה בסוללה — יתרון משמעותי בשטח","למדו קריאת מפה ושימוש במצפן לפני שאתם יוצאים לשטח","הורידו מפות לשימוש אופליין באפליקציות ניווט מוכרות — אך אל תסמכו על זה בלבד"],
    },
  ],
  en: [
    {
      num: "01",
      title: "Wearing Non-Breathable Pants in Warm Climates",
      problem: "Many hikers bring cotton or denim pants to hot, humid environments. Cotton absorbs sweat, retains moisture and dries slowly — a guaranteed recipe for chafing, blisters and discomfort throughout the day.",
      fix: ["Look for UPF 50+ fabric for UV protection — essential in direct sunlight","Seek Moisture-Wicking material that moves sweat away from your skin","Zip-off convertible pants offer maximum versatility across temperature swings","Synthetic fabrics (polyester/nylon) dry in minutes; cotton takes hours"],
    },
    {
      num: "02",
      title: "Buying a Rain Jacket Without Checking Specs",
      problem: "'Water-resistant' and 'waterproof' are not the same thing. Hikers often arrive with a jacket that soaks through after 20 minutes of rain — because they didn't check the technical specs before buying.",
      fix: ["Water Column Rating: 5,000mm = basic; 10,000mm = good; 20,000mm+ = excellent","Never accept less than 10,000mm for real rain hiking","Also check Breathability Rating (MVTR): 10,000g/m²/24h is acceptable; 20,000g+ is excellent","DWR coating is essential — without it, even a 20,000mm jacket will wet out"],
    },
    {
      num: "03",
      title: "Not Using a Layering System",
      problem: "Single-layer dressing — a thick hoodie or heavy sweater — is the least efficient approach to temperature regulation in the field. Mountain weather changes fast, and a proper layering system enables rapid adaptation.",
      fix: ["Base Layer: moisture management, no cotton — polyester or merino wool","Mid Layer: insulation — fleece or a down/synthetic puffer","Shell Layer: weather protection — wind and rain resistant, not necessarily warm","Add/remove layers as activity intensity and temperature change throughout the day"],
    },
    {
      num: "04",
      title: "Ignoring DWR Coating Maintenance",
      problem: "DWR (Durable Water Repellent) is a surface treatment that makes water bead off fabric. Without active DWR, even a waterproof jacket stays wet on the outside and stops breathing properly.",
      fix: ["DWR wears off over time — check every 10–15 outings","Sign of failure: the fabric absorbs water and gets wet — instead of water beading up and rolling off","DWR coating can be refreshed with a spray-on treatment, then tumble dry on low heat to reactivate it","Always wash your shell jacket per manufacturer instructions — low-heat washing restores DWR"],
    },
    {
      num: "05",
      title: "Skipping Trekking Poles",
      problem: "Many hikers view trekking poles as gear for the elderly. This is one of the biggest mistakes. Long descents without poles accumulate real joint damage — especially on multi-day trips.",
      fix: ["Studies show poles reduce knee joint stress by 25% on average during descents","On ascents, poles offload leg fatigue and add upper body propulsion","Poles improve balance at stream crossings, on slippery rocks and rough terrain","Folding ultralight poles weigh 200–350g per pair — worth every gram on long trips"],
    },
    {
      num: "06",
      title: "Relying on GPS Alone",
      problem: "GPS is an excellent tool, but batteries die, screens break and signal can be lost. Hikers who rely solely on GPS and find themselves without a working device in the field face real danger.",
      fix: ["GPS alone is not a substitute for map and compass — always carry both","A physical topographic map will never run out of battery or break — even in rain or cold","Learn to read a map and use a compass before heading into the field","Download offline maps in popular navigation apps — but never rely on this alone"],
    },
  ],
};

const UI = {
  he: {
    badge: "טיפים",
    subtitle: "הטעויות שמטיילים חוזרים ועושים שוב ושוב — ואיך להימנע מהן",
    intro: "רוב הטעויות בבחירת ציוד לא נובעות מחוסר תקציב — הן נובעות מחוסר מידע. הטעויות הבאות חוזרות שוב ושוב בקרב מטיילים מתחילים ומנוסים כאחד, ולכולן יש פתרון פשוט.",
    warningText: "הכלל החשוב: קראו את המפרטים הטכניים לפני כל קנייה. 10 דקות מחקר חוסכות שעות של אי-נוחות בשטח.",
    problem: "הבעיה", fix: "טיפ מקצועי",
    summaryTitle: "סיכום",
    summaryText: "הציוד הנכון לא חייב להיות הכי יקר — הוא חייב להיות הנכון לתנאים שלכם. השקיעו 10 דקות בקריאת המפרטים הטכניים לפני קנייה, ותחסכו כאב ראש ולעיתים כאב גב שעות רבות בשטח.",
    related: "מאמרים נוספים",
    share: "שתפו:", backToBlog: "← חזרה לבלוג",
    rel1badge: "שבילי ישראל", rel1title: "ציוד לשביל ישראל — רשימה מלאה",
    rel2badge: "אולטרה-לייט", rel2title: "הליכה אולטרה-לייט — עקרונות מקצועיים",
    nextLink: "ציוד לשביל ישראל →",
  },
  en: {
    badge: "Tips",
    subtitle: "Mistakes hikers make over and over — and how to avoid them with simple knowledge",
    intro: "Most gear mistakes don't come from a lack of budget — they come from a lack of information. The following mistakes are repeated by beginners and experienced hikers alike, and every single one has a simple solution.",
    warningText: "The key rule: always read the technical specs before any purchase. 10 minutes of research saves hours of discomfort in the field.",
    problem: "The Problem", fix: "The Fix",
    summaryTitle: "Summary",
    summaryText: "The right gear doesn't have to be the most expensive — it has to be right for your conditions. Invest 10 minutes reading technical specs before buying, and save yourself a lot of pain (literally) on the trail.",
    related: "More Articles",
    share: "Share:", backToBlog: "← Back to Blog",
    rel1badge: "Israel Trail", rel1title: "Israel National Trail Gear Guide",
    rel2badge: "Ultralight", rel2title: "Ultralight Hiking: Professional Principles",
    nextLink: "Israel Trail Gear →",
  },
};

export default function CommonGearMistakesPage() {
  const { lang } = useLang();
  const S = UI[lang];
  const mistakes = MISTAKES[lang];

  return (
    <div className="min-h-screen bg-[#0D0B1F]" dir={lang === 'he' ? 'rtl' : 'ltr'}>

      {/* HERO */}
      <div className="relative overflow-hidden" style={{ height: "72vh", minHeight: "520px" }}>
        <img src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(13,11,31,0.2) 0%,rgba(13,11,31,0.65) 55%,#0D0B1F 100%)" }} />
        <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-4 pb-14 pt-28">
          <div style={{ fontSize: "4rem", lineHeight: 1, marginBottom: "1.25rem", filter: "drop-shadow(0 0 24px rgba(249,115,22,0.6))" }}>⚠️</div>
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.45)", color: "#F97316" }}>{S.badge}</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
            {lang === 'he' ? (
              <><span style={{ background: "linear-gradient(135deg,#F97316,#EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>טעויות נפוצות</span>{" "}בבחירת ציוד טיול</>
            ) : (
              <>Common{" "}<span style={{ background: "linear-gradient(135deg,#F97316,#EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gear Mistakes</span>{" "}to Avoid</>
            )}
          </h1>
          <p className="text-lg sm:text-xl font-semibold max-w-2xl" style={{ color: "white" }}>{S.subtitle}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 blog-body">
        <p className="mt-10 mb-8" style={{ color: "white", fontSize: "1.1rem", lineHeight: "1.9" }}>
          <span style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 0.85, color: "#FFB347", marginInlineEnd: "0.06em", display: "inline-block", verticalAlign: "bottom" }}>
            {S.intro.charAt(0)}
          </span>
          {S.intro.slice(1)}
        </p>

        {/* Warning box */}
        <div className="rounded-2xl p-5 mb-14" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.3)" }}>
          <div className="flex items-start gap-3">
            <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>⚠️</span>
            <p className="text-sm leading-relaxed" style={{ color: "white" }}>{S.warningText}</p>
          </div>
        </div>

        {/* Mistake Cards */}
        <div className="space-y-8 mb-16">
          {mistakes.map((m) => (
            <div key={m.num} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(249,115,22,0.22)", background: "rgba(13,11,31,0.7)", boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
              <div className="flex items-center gap-4 px-6 py-5" style={{ background: "linear-gradient(135deg,rgba(249,115,22,0.12) 0%,rgba(249,115,22,0.02) 100%)", borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,rgba(255,179,71,0.25),rgba(255,179,71,0.08))", border: "2px solid rgba(255,179,71,0.5)", color: "#FFB347" }}>{m.num}</div>
                <h2 className="font-black text-lg leading-snug tracking-tight" style={{ color: "#FFB347" }}>{m.title}</h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="rounded-xl p-4" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ fontSize: "1rem" }}>⚠️</span>
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: "#E74C3C" }}>{S.problem}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "white" }}>{m.problem}</p>
                </div>
                <div className="rounded-xl p-4" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.22)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ fontSize: "1rem" }}>✅</span>
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: "#2ECC71" }}>{S.fix}</p>
                  </div>
                  <ul className="space-y-2">
                    {m.fix.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "white" }}>
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                          style={{ background: "rgba(46,204,113,0.15)", color: "#2ECC71" }}>{i + 1}</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-2xl p-6 mb-14" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }}>
          <div className="flex items-start gap-3">
            <span style={{ fontSize: "1.75rem", lineHeight: 1, flexShrink: 0 }}>💡</span>
            <div>
              <h3 className="font-black mb-2" style={{ color: "#FFB347" }}>{S.summaryTitle}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "white" }}>{S.summaryText}</p>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mb-14">
          <p className="font-black text-lg mb-6" style={{ color: "#FFB347" }}>{S.related}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([{ href: "/blog/israel-trail-gear", badge: S.rel1badge, title: S.rel1title }, { href: "/blog/ultralight-hiking", badge: S.rel2badge, title: S.rel2title }]).map(a => (
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
            <a href="https://wa.me/?text=https://trailiq.co/blog/common-gear-mistakes" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125" style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#A78BFA" }}>WhatsApp</a>
            <a href="https://twitter.com/intent/tweet?url=https://trailiq.co/blog/common-gear-mistakes" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-125" style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", color: "#A78BFA" }}>Twitter / X</a>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110" style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)", color: "#A78BFA" }}>{S.backToBlog}</Link>
            <Link href="/blog/israel-trail-gear" className="text-sm hover:brightness-125 transition-all" style={{ color: "#4A9EFF" }}>{S.nextLink}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
