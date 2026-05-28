import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הליכה אולטרה-לייט — עקרונות מקצועיים | TrailIQ",
  description: "הביג 4, יעדי משקל בסיס, חלופות קלות ואיך להפחית משקל ציוד בלי לסכן את הבטיחות.",
};

export default function UltralightHikingPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-24 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-4 text-cyan">אולטרה-לייט · 6 דקות קריאה</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            הליכה אולטרה-לייט
          </h1>
          <p className="text-white/30 text-sm">
            עקרונות מקצועיים לציוד קל — ללא פגיעה בבטיחות ובנוחות.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-white/55 leading-relaxed text-[15px]">

          {/* Intro */}
          <section>
            <p className="mb-4">
              הליכה אולטרה-לייט אינה קיצוניות — היא גישה מחושבת שמטרתה להפחית עומס פיזי
              ולשפר את חוויית הטיול. מטיילים שהצטרפו לגישה זו מדווחים על פחות כאבי ברכיים,
              פחות עייפות ויותר הנאה — לא מעט מהם אחרי שנים של טיול עם תרמיל כבד.
            </p>
            <p>
              אולטרה-לייט לא אומר להקריב בטיחות. זה אומר לשאול שאלה אחת קריטית על כל פריט
              ציוד: <strong className="text-white/80">האם אני באמת צריך את זה?</strong>
            </p>
          </section>

          {/* The Big 4 */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">
              הביג 4 — 4 הפריטים שקובעים הכל
            </h2>
            <p className="mb-5">
              60–70% מהמשקל הכולל של ציוד טיול רב-יומי טיפוסי מגיע מ-4 פריטים בלבד:
              תרמיל + אוהל + שק שינה + מזרן שינה. שיפור באחד מהם ישפיע יותר על המשקל
              הכולל מאשר חיסכון בעשרות פריטים קטנים אחרים.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  name: "תרמיל גב",
                  typical: "1.5–2.5 ק\"ג",
                  ultralight: "0.4–0.9 ק\"ג",
                  saving: "חיסכון: עד 1.8 ק\"ג",
                },
                {
                  name: "אוהל",
                  typical: "1.8–3.5 ק\"ג",
                  ultralight: "0.5–1.2 ק\"ג",
                  saving: "חיסכון: עד 2.5 ק\"ג",
                },
                {
                  name: "שק שינה",
                  typical: "1.0–1.8 ק\"ג",
                  ultralight: "0.3–0.6 ק\"ג",
                  saving: "חיסכון: עד 1.2 ק\"ג",
                },
                {
                  name: "מזרן שינה",
                  typical: "0.5–0.9 ק\"ג",
                  ultralight: "0.15–0.35 ק\"ג",
                  saving: "חיסכון: עד 0.7 ק\"ג",
                },
              ].map((item) => (
                <div key={item.name} className="border border-white/8 rounded-lg p-4 bg-white/[0.02]">
                  <h3 className="text-white font-bold text-sm mb-3">{item.name}</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/30">ציוד רגיל</span>
                      <span className="text-white/50">{item.typical}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/30">אולטרה-לייט</span>
                      <span className="text-cyan/70">{item.ultralight}</span>
                    </div>
                    <div className="pt-1 border-t border-white/8">
                      <span className="text-cyan/50">{item.saving}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Base weight targets */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">יעדי משקל בסיס</h2>
            <p className="mb-5">
              משקל בסיס (Base Weight) הוא משקל הציוד <strong className="text-white/80">ללא</strong> אוכל,
              מים ודלק — הפריטים שמשקלם משתנה לאורך הטיול. זהו המדד המקצועי להשוואה בין
              גישות טיול שונות:
            </p>
            <div className="space-y-3">
              {[
                {
                  category: "קל מאוד / Ultralight",
                  weight: "מתחת ל-5 ק\"ג",
                  desc: "מחייב ציוד פרימיום ופשרות מחושבות. לא מתאים לתנאי קיצון.",
                  color: "text-cyan",
                  border: "border-cyan/20",
                  bg: "bg-cyan/[0.03]",
                },
                {
                  category: "קל / Lightweight",
                  weight: "5–8 ק\"ג",
                  desc: "שדרוג משמעותי על הממוצע. מרבית המטיילים יכולים להגיע לכאן בלי הוצאות קיצוניות.",
                  color: "text-emerald-400",
                  border: "border-emerald-400/20",
                  bg: "bg-emerald-400/[0.03]",
                },
                {
                  category: "ממוצע / Traditional",
                  weight: "8–14 ק\"ג",
                  desc: "הנפוץ ביותר. יעיל ובטוח, אך כבד יותר מהנדרש ברוב הטיולים.",
                  color: "text-amber-400",
                  border: "border-amber-400/20",
                  bg: "bg-amber-400/[0.03]",
                },
              ].map((item) => (
                <div key={item.category} className={`border ${item.border} rounded-lg p-4 ${item.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-bold text-sm ${item.color}`}>{item.category}</span>
                    <span className={`text-sm font-black ${item.color}`}>{item.weight}</span>
                  </div>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Fleece vs Down */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">
              פליז לעומת מעיל ממולא — לתנאים קלים
            </h2>
            <p className="mb-5">
              מעיל ממולא הוא הבחירה הנפוצה למטיילים, אך לתנאים קלים עד בינוניים (0°C עד +15°C)
              פליז איכותי יכול להציע אלטרנטיבה קלה יותר:
            </p>
            <div className="border border-white/8 rounded-lg p-5 bg-white/[0.02]">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white/80 font-bold text-sm mb-3">פליז (Fleece)</h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "משקל: 150–300 גרם",
                      "עמיד כשרטוב",
                      "מתייבש מהר",
                      "מחיר נגיש",
                      "אחיד ופשוט לתחזוקה",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/50">
                        <span className="text-cyan/60">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white/80 font-bold text-sm mb-3">מעיל ממולא (Down)</h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "משקל: 400–600 גרם",
                      "חימום גבוה יותר",
                      "אורז קטן יותר",
                      "מחיר גבוה יותר",
                      "חלש כשרטוב (טבעי)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/50">
                        <span className="text-cyan/60">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-4 pt-4 border-t border-white/8 text-white/50 text-sm">
                לתנאים מעל אפס מעלות — פליז 100–200 גרם (Grid Fleece) יחסוך 200–300 גרם על מעיל ממולא
                ויציע בידוד מספיק לרוב הלילות.
              </p>
            </div>
          </section>

          {/* Tent alternatives */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">
              האם אתם באמת צריכים אוהל שלם?
            </h2>
            <p className="mb-5">
              אוהל מלא הוא הפריט הכבד ביותר ב-Big 4. לפני הקנייה, שאלו את עצמכם: מה
              הסביבה שתטיילו בה? יש אלטרנטיבות שיכולות לחסוך 500 גרם עד קילוגרם:
            </p>
            <div className="space-y-4">
              {[
                {
                  name: "ביוואק (Bivy Sack)",
                  weight: "150–350 גרם",
                  desc: "שק מגן חיצוני שעוטף את שק השינה. אטום לרוח ומים, עם מרחב מינימלי. מציל חיים, לא לכלואופובים.",
                  saving: "חיסכון: 800–1,500 גרם",
                },
                {
                  name: "ברזנט / Tarp",
                  weight: "200–450 גרם",
                  desc: "פיסת בד עמיד למים שנפרשת מעל מזרן ושק שינה. גמישות מרבית, אפס הגנה מחרקים. מתאים לאזורים יבשים.",
                  saving: "חיסכון: 700–1,200 גרם",
                },
                {
                  name: "ערסל (Hammock)",
                  weight: "400–700 גרם עם מגן",
                  desc: "מחליף הן את האוהל והן את המזרן — בסביבת יער. לא ישים בשטח פתוח. שינה נוחה מאוד לחלק מהאנשים.",
                  saving: "חיסכון: עד 2 ק\"ג",
                },
              ].map((item) => (
                <div key={item.name} className="border border-white/8 rounded-lg p-5 bg-white/[0.02]">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-white font-bold">{item.name}</h3>
                    <div className="text-right flex-shrink-0">
                      <span className="text-white/40 text-xs block">{item.weight}</span>
                      <span className="text-cyan/60 text-xs">{item.saving}</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Water filters */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">
              פילטרי מים — חיסכון קל ופשוט
            </h2>
            <p className="mb-4">
              פילטר מים הוא פריט בטיחות שאין לוותר עליו — אך המשקל שלו יכול להשתנות
              דרמטית בהתאם לסוג שבוחרים:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  type: "פילטר סחיטה (Squeeze)",
                  weight: "60–100 גרם",
                  pros: ["קל מאוד", "לא צריך ממפ", "אמין"],
                  cons: ["לאט יחסית", "דורש סחיטה ידנית"],
                  color: "text-cyan",
                },
                {
                  type: "פילטר משאבה (Pump)",
                  weight: "280–400 גרם",
                  pros: ["מהיר", "קל לשימוש קבוצתי"],
                  cons: ["כבד", "חלקים נעים שנשברים"],
                  color: "text-white/50",
                },
              ].map((item) => (
                <div key={item.type} className="border border-white/8 rounded-lg p-4 bg-white/[0.02]">
                  <h3 className={`font-bold text-sm mb-1 ${item.color}`}>{item.type}</h3>
                  <p className="text-white/30 text-xs mb-3">{item.weight}</p>
                  <div className="space-y-1">
                    {item.pros.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/50">
                        <span className="text-cyan/60">+</span><span>{p}</span>
                      </div>
                    ))}
                    {item.cons.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="text-white/25">−</span><span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* General principles */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">עקרונות כלליים להפחתת משקל</h2>
            <div className="border border-white/8 rounded-lg p-6 bg-white/[0.02]">
              <ul className="space-y-3">
                {[
                  "כתבו רשימת ציוד מלאה עם משקל של כל פריט — לא ניתן לשפר מה שלא מודדים",
                  "השאלה לא 'כמה זה עולה?' אלא 'כמה זה שוקל?' — עבור כל פריט",
                  "לכל ציוד שמוסיפים, הסירו ציוד אחר שמבצע פונקציה דומה",
                  "ציוד רב-שימושי (tarp שמשמש גם כגשמיה, מקלות שמשמשים כעמודי אוהל) חוסך כפל",
                  "אל תחתכו בבטיחות — ערכת עזרה ראשונה, ניווט ושמיכת חירום תמיד נשארים",
                  "בדקו את הרשימה שלושה ימים לפני הטיול — תמיד תגלו פריטים שהשתכחתם לחתוך",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan mt-2" />
                    <span className="text-white/55">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-14 pt-10 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
          <Link href="/blog" className="text-white/25 text-sm hover:text-white/55 transition-colors">
            ← חזרה לבלוג
          </Link>
          <Link href="/blog/how-to-choose-backpack" className="text-cyan/50 text-sm hover:text-cyan transition-colors">
            מדריך תרמיל גב ←
          </Link>
        </div>

      </div>
    </div>
  );
}
