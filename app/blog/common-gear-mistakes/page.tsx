import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 טעויות נפוצות בבחירת ציוד טיול | TrailIQ",
  description: "הטעויות שמטיילים חוזרים ועושים שוב ושוב — ואיך להימנע מהן עם ידע מקצועי פשוט.",
};

const mistakes = [
  {
    number: "01",
    title: "מכנסיים ללא נשימתיות לאקלים חם",
    problem:
      "מטיילים רבים מביאים מכנסיים כותנה או ג'ינס לטיולים באקלים חם ולח. כותנה סופגת זיעה, שומרת לחות ומתייבשת לאט — מתכון בטוח לשפשופים, פצעים ותחושת אי-נוחות לאורך כל היום.",
    solution: [
      "בחרו בד עם ציון UPF 50+ להגנה מפני קרינה — חשוב לאזורים עם שמש ישירה",
      "חפשו חומר Moisture-Wicking (שואב לחות) שמעביר זיעה מהגוף החוצה",
      "מכנסיים עם רוכסן הנתקים ל-2 חלקים מציעים גמישות מרבית בשינויי טמפרטורה",
      "בדקו תג הטיפוח: חומרים מלאכותיים (פוליאסטר, ניילון) מתייבשים תוך דקות; כותנה — שעות",
    ],
  },
  {
    number: "02",
    title: "קניית מעיל גשם ללא בדיקת עמידות למים",
    problem:
      "מעיל \"עמיד למים\" ו\"אטום למים\" הם לא אותו דבר. מטיילים מגיעים לטיול עם מעיל שנרטב לאחר 20 דקות בגשם — כי לא בדקו את הנתונים הטכניים לפני הקנייה.",
    solution: [
      "בדקו את ה-Water Column Rating: 5,000mm = הגנה בסיסית; 10,000mm = הגנה טובה; 20,000mm+ = הגנה מצוינת",
      "לטיולים בגשם אמיתי — אל תסתפקו בפחות מ-10,000mm water column",
      "בדקו גם את ה-Breathability Rating (MVTR): 10,000g/m²/24h ומעלה הוא סביר; 20,000g+ מצוין",
      "ציפוי DWR (ראו טעות מספר 4) הכרחי להפעלת עמידות המים — ללא DWR, גם 20,000mm מעיל יירטב",
    ],
  },
  {
    number: "03",
    title: "העדר מערכת ריבוד (Layering System)",
    problem:
      "הלבשה \"בשכבה אחת\" — חולצה עבה, סוודר כבד, או מעיל גורף — היא הגישה הפחות יעילה לוויסות חום בשטח. תנאי מזג האוויר משתנים בקצב מהיר בהרים, ומערכת ריבוד מאפשרת הסתגלות מהירה.",
    solution: [
      "שכבת בסיס (Base Layer): מגע עם הגוף, תפקידה להוציא זיעה — חומר סינתטי או צמר מרינו. אין להשתמש בכותנה",
      "שכבת ביניים (Mid Layer): בידוד — פליז (Fleece) או מעיל ממולא. שומרת על חום גוף בתנאים קרים",
      "שכבה חיצונית (Outer / Shell Layer): הגנה ממזג האוויר — עמידה לרוח, גשם ושלג. לא בהכרח מחממת",
      "הוסיפו/הסירו שכבות בהתאם לאינטנסיביות ההליכה ושינויי הטמפרטורה — זה הסוד לוויסות חום יעיל",
    ],
  },
  {
    number: "04",
    title: "התעלמות מציפוי DWR",
    problem:
      "DWR (Durable Water Repellent) הוא ציפוי חיצוני שמחייב מים להתגלגל מהבד — בדומה לטפות מים על עלה לוטוס. ללא ציפוי DWR פעיל, אפילו ג'קט אטום למים נשאר רטוב מבחוץ ומונע נשימה.",
    solution: [
      "ציפוי DWR נשחק עם הזמן — בדקו כל 10–15 יציאות לשטח",
      "סימן להחלפה: הבד 'מתספג' (wetting out) — מים נדבקים לבד במקום להתגלגל",
      "ניתן לרענן DWR עם תרסיס מיוחד שניתן לרכוש בחנויות ציוד — ולאחר מכן ייבוש בסיקי",
      "תמיד כבסו ג'קט הגנה לפי הוראות היצרן — כביסה בלחץ נמוך ויבוש בחום מחדשים את ה-DWR",
    ],
  },
  {
    number: "05",
    title: "ויתור על מקלות הליכה",
    problem:
      "מטיילים רבים תופסים מקלות הליכה כציוד לקשישים. זוהי אחת הטעויות הגדולות ביותר. ירידות ארוכות בלי מקלות מצטברות לנזק ממשי על המפרקים — במיוחד בטיולים רב-יומיים.",
    solution: [
      "מחקרים מראים שמקלות הליכה מפחיתים עומס על מפרקי הברך ב-25% בממוצע בירידות",
      "בעליות, מקלות מפחיתים עומס על הרגליים ועוזרים לתנע עם הפלג העליון",
      "מקלות מסייעים לשיווי משקל במעברי נחל, על אבנים חלקות ובמסלולים לא סלולים",
      "מקלות מתקפלים קלי משקל שוקלים 200–350 גרם לזוג — שווה כל גרם בטיולים ארוכים",
      "בחרו מקלות עם ידיות קורק — קורק סופג זיעה, לא מחליק ונוח לתחושה לאורך היום",
    ],
  },
];

export default function CommonGearMistakesPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-24 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-4 text-cyan">טיפים · 5 דקות קריאה</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            5 טעויות נפוצות בבחירת ציוד טיול
          </h1>
          <p className="text-white/30 text-sm">
            ידע מקצועי מטסטרים שבדקו מאות פריטי ציוד — כדי שלא תלמדו את זה בשטח.
          </p>
        </div>

        {/* Intro */}
        <p className="text-white/55 leading-relaxed text-[15px] mb-14">
          רוב הטעויות בבחירת ציוד לא נובעות מחוסר תקציב — הן נובעות מחוסר מידע. הטעויות
          הבאות חוזרות שוב ושוב בקרב מטיילים מתחילים ומנוסים כאחד, ולכולן יש פתרון פשוט.
        </p>

        {/* Mistakes */}
        <div className="space-y-12">
          {mistakes.map((mistake) => (
            <section key={mistake.number} className="border border-white/8 rounded-lg p-6 bg-white/[0.02]">
              <div className="flex items-start gap-4 mb-5">
                <span className="flex-shrink-0 text-[11px] font-black tracking-[0.15em] text-cyan/40 mt-1">
                  {mistake.number}
                </span>
                <h2 className="text-xl font-black text-white leading-snug tracking-tight">
                  {mistake.title}
                </h2>
              </div>

              <div className="space-y-5 text-[15px] leading-relaxed">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-400/60 mb-2">הבעיה</p>
                  <p className="text-white/50">{mistake.problem}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan/60 mb-3">הפתרון</p>
                  <ul className="space-y-2.5">
                    {mistake.solution.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan mt-2" />
                        <span className="text-white/55">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-12 border border-cyan/20 rounded-lg p-6 bg-cyan/[0.03]">
          <h2 className="text-white font-black mb-3">סיכום</h2>
          <p className="text-white/60 text-[15px] leading-relaxed">
            הציוד הנכון לא חייב להיות הכי יקר — הוא חייב להיות הנכון לתנאים שלכם. השקיעו
            10 דקות בקריאת המפרטים הטכניים לפני קנייה, ותחסכו כאב ראש (ולעיתים כאב גב)
            שעות רבות בשטח.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-14 pt-10 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
          <Link href="/blog" className="text-white/25 text-sm hover:text-white/55 transition-colors">
            ← חזרה לבלוג
          </Link>
          <Link href="/blog/israel-trail-gear" className="text-cyan/50 text-sm hover:text-cyan transition-colors">
            ציוד לשביל ישראל ←
          </Link>
        </div>

      </div>
    </div>
  );
}
