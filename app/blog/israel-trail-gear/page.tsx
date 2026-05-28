import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ציוד לשביל ישראל — רשימה מלאה | TrailIQ",
  description: "רשימת ציוד מקיפה לשביל ישראל: מחסה, שינה, מטבח, בטיחות, ניווט, היגיינה ולבוש — הכל במקום אחד.",
};

const sections = [
  {
    icon: "⛺",
    title: "מחסה",
    color: "border-blue-400/20 bg-blue-400/[0.03]",
    accent: "text-blue-400",
    items: [
      { name: "אוהל", note: "עדיף 3 עונות קל משקל, עמיד לרוח" },
      { name: "מוטות אוהל", note: "בדקו שמגיעים בתוך האוהל או שמור בנפרד" },
      { name: "יתדות", note: "6–8 יתדות לפחות, עם פטיש קטן" },
      { name: "גגון עליון (Rainfly)", note: "הכרחי — גשם בשביל ישראל בלתי נמנע בחורף" },
      { name: "שטיח תחתון / Footprint", note: "מגן על תחתית האוהל מנקב" },
    ],
  },
  {
    icon: "🛏️",
    title: "שינה",
    color: "border-purple-400/20 bg-purple-400/[0.03]",
    accent: "text-purple-400",
    items: [
      { name: "שק שינה", note: "דירוג Comfort +5°C לקיץ, -5°C לחורף" },
      { name: "מזרן שינה / Sleeping Pad", note: "מבודד מהקרקע — הכרחי, לא אופציונלי" },
      { name: "כרית קמפינג", note: "מתנפחת — 60–120 גרם, חוסכת עומס על הצוואר" },
    ],
  },
  {
    icon: "🍳",
    title: "מטבח שטח",
    color: "border-orange-400/20 bg-orange-400/[0.03]",
    accent: "text-orange-400",
    items: [
      { name: "כיריים שטח", note: "כיריים גז קומפקטיות לשימוש יחיד" },
      { name: "מחסנית גז", note: "150–230 גרם לשבוע שימוש" },
      { name: "סיר בישול קטן", note: "400–900 מ\"ל, טיטניום לקל משקל" },
      { name: "כפית/מזלג משולב (Spork)", note: "חוסך משקל ומקום" },
      { name: "פילטר מים", note: "הכרחי — לא לסמוך על מקורות מים בכל נקודה" },
      { name: "בקבוק מים 1–2 ליטר", note: "לנשיאת מים בין נקודות מים" },
    ],
  },
  {
    icon: "🏥",
    title: "בטיחות",
    color: "border-red-400/20 bg-red-400/[0.03]",
    accent: "text-red-400",
    items: [
      { name: "ערכת עזרה ראשונה", note: "כולל תחבושת, פלסטרים, משחת אנטיביוטיקה, כדורי כאב" },
      { name: "פנס ראש (Headlamp)", note: "LED, 200–400 לומן לפחות" },
      { name: "סוללות גיבוי", note: "לפחות ערכה אחת נוספת לפנס הראש" },
      { name: "שריקת חירום", note: "נשמעת מרחק רב יותר מהקול האנושי" },
      { name: "מצית / Fire Starter", note: "שניים — אחד עמיד למים" },
      { name: "סכין כיס", note: "רב שימושי, עם להב, מפתח שעון ועוד" },
      { name: "שמיכת חירום", note: "20–30 גרם, מציל חיים במקרה חירום" },
    ],
  },
  {
    icon: "🧭",
    title: "ניווט",
    color: "border-cyan/20 bg-cyan/[0.03]",
    accent: "text-cyan",
    items: [
      { name: "מפת שביל ישראל", note: "מפות 1:50,000 — לפחות לחלק הרלוונטי" },
      { name: "מצפן", note: "בסיסי, לא דיגיטלי — סוללות מתרוקנות" },
      { name: "שעון GPS", note: "אופציונלי אך ממש שימושי לשביל ישראל" },
      { name: "טלפון עם מפות אופליין", note: "הורידו מפות offline לפני היציאה לשטח" },
      { name: "פאוורבנק", note: "10,000 mAh לשבוע שטח, 20,000 mAh לטיול ארוך" },
    ],
  },
  {
    icon: "🧴",
    title: "היגיינה ושיקים",
    color: "border-green-400/20 bg-green-400/[0.03]",
    accent: "text-green-400",
    items: [
      { name: "פצירה (Trowel)", note: "קבורת שאריות ביולוגיות — כבדו את הטבע" },
      { name: "נייר טואלט", note: "בשקית ניילון אטומה" },
      { name: "ג'ל ידיים", note: "לאחר שירותים וטיפול באוכל — 50–100 מ\"ל" },
      { name: "קרם הגנה SPF 50+", note: "מריחה מחדש כל שעתיים בחשיפה ישירה" },
      { name: "שפתון עם SPF", note: "השפתיים נשחקות מהר בשמש ורוח" },
      { name: "תרסיס נגד חרקים", note: "חובה לעונות ולאזורים עם ריכוז גבוה" },
      { name: "מגבת מיקרופייבר", note: "מתייבשת תוך דקות, קלה ומקופלת" },
    ],
  },
  {
    icon: "👕",
    title: "לבוש",
    color: "border-yellow-400/20 bg-yellow-400/[0.03]",
    accent: "text-yellow-400",
    items: [
      { name: "תחתוני ספורט Moisture-Wicking", note: "2–3 זוגות; כותנה = שפשוף בטוח" },
      { name: "גרבי הליכה", note: "3 זוגות לפחות; צמר מרינו מומלץ — מונע שלפוחיות" },
      { name: "חולצות נושמות", note: "2–3 חולצות ספורט; UPF 50+ לעונת הקיץ" },
      { name: "כובע שמש רחב שוליים", note: "הגנה על פנים ועורף — חיוני בשביל ישראל" },
      { name: "פליז (Fleece)", note: "לשכבת ביניים בימים קרירים ולפנות בוקר/ערב" },
      { name: "ג'קט גשם", note: "עמיד למים, 10,000mm+, קל וקומפקטי" },
      { name: "מכנסי הליכה", note: "נושמים, Moisture-Wicking, UPF 50+" },
      { name: "נעלי הליכה / מגפיים", note: "הנעלה המתאימה לסוג הטיול וסוג השביל" },
    ],
  },
];

export default function IsraelTrailGearPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-24 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-4 text-cyan">שבילי ישראל · 8 דקות קריאה</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            ציוד לשביל ישראל
          </h1>
          <p className="text-white/30 text-sm">
            רשימת ציוד מלאה ומקצועית — ממחסה ושינה ועד ניווט ובטיחות.
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-4 text-white/55 leading-relaxed text-[15px] mb-14">
          <p>
            שביל ישראל עובר כ-1,000 ק&quot;מ מדן בצפון עד אילת בדרום, חוצה מגוון טרריין עצום:
            חורשות ירוקות בגליל, עמקים פוריים, מדבר יהודה, הנגב והערבה. אין שביל מרשים
            יותר ביופיו ובמגוון האתגרים שהוא מציב.
          </p>
          <p>
            כתוצאה מהמגוון האקלימי הגדול — מהחורף הגלילי הקר ועד לחום הכבד של הנגב —
            הציוד לשביל ישראל חייב להיות מקיף ומחושב. הרשימה הבאה מחולקת לקטגוריות
            ומבוססת על ניסיון של מטיילים שהשלימו את השביל בשלמותו.
          </p>
        </div>

        {/* Checklist sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title} className={`border rounded-lg p-6 ${section.color}`}>
              <h2 className="text-white font-black text-lg mb-5 flex items-center gap-3">
                <span className="text-xl">{section.icon}</span>
                <span>{section.title}</span>
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.name} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-4 h-4 rounded border mt-0.5 ${section.color.replace("bg-", "border-").split(" ")[0]} flex items-center justify-center`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${section.accent.replace("text-", "bg-")}`} />
                    </div>
                    <div>
                      <span className="text-white/80 font-medium text-[14px]">{item.name}</span>
                      {item.note && (
                        <span className="text-white/35 text-[13px] mr-2">— {item.note}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Pro tips */}
        <div className="mt-12 border border-cyan/20 rounded-lg p-6 bg-cyan/[0.03]">
          <h2 className="text-white font-black mb-4">טיפים מקצועיים לשביל ישראל</h2>
          <ul className="space-y-3 text-[15px]">
            {[
              "תכננו נקודות מים מראש — ישנן קטעים בנגב ובערבה עם מרחקים ארוכים בין מקורות מים",
              "בחורף בצפון: הכינו ציוד לגשם כבד ובוץ — הגליל יכול להיות מאתגר מאוד",
              "בדרום (נגב/ערבה): הכינו ציוד לחום קיצוני ביום וקור בלילה — ההפרשים גדולים",
              "יש אפשרות לאתר ציוד בנקודות שילוח (Resupply) בערים הגדולות לאורך השביל",
              "הצטרפו לקבוצות Facebook ייעודיות לשביל ישראל — תמצאו מידע עדכני על מקורות מים",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan mt-2" />
                <span className="text-white/60">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-14 pt-10 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
          <Link href="/blog" className="text-white/25 text-sm hover:text-white/55 transition-colors">
            ← חזרה לבלוג
          </Link>
          <Link href="/blog/ultralight-hiking" className="text-cyan/50 text-sm hover:text-cyan transition-colors">
            הליכה אולטרה-לייט ←
          </Link>
        </div>

      </div>
    </div>
  );
}
