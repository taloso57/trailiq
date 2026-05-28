import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "כיצד לבחור תרמיל גב לטיול | TrailIQ",
  description: "מדריך מקצועי לבחירת תרמיל גב: סוגים, נפח, מערכת נשיאה, חגורת ירכיים, התאמה לנשים ומה לבדוק לפני הקנייה.",
};

export default function BackpackGuidePage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-24 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-4 text-cyan">ציוד בסיסי · 7 דקות קריאה</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            כיצד לבחור תרמיל גב לטיול
          </h1>
          <p className="text-white/30 text-sm">
            מדריך מקצועי המבוסס על אלפי שעות בדיקות ציוד בשטח.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-white/55 leading-relaxed text-[15px]">

          <section>
            <p>
              תרמיל הגב הוא אחת ההחלטות הגדולות ביותר שמטייל מקבל. תרמיל שלא מתאים לגוף
              עלול לגרום לכאבי גב, כתף וירך עוד ביום הראשון — בעוד שתרמיל שנבחר נכון הופך
              את הטיול לחוויה שונה לחלוטין. המדריך הזה מסכם ידע שנצבר ממאות בדיקות ציוד מקצועיות.
            </p>
          </section>

          {/* Types */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">סוגי תרמילים</h2>
            <p className="mb-5">
              לפני שבוחרים תרמיל, חשוב להבין מה סוג הטיול שמתכננים. הבחירה בין קטגוריות
              שגויה היא הטעות הנפוצה ביותר בקרב מטיילים מתחילים.
            </p>
            <div className="space-y-4">
              <div className="border border-white/8 rounded-lg p-5 bg-white/[0.02]">
                <h3 className="text-white font-bold mb-3">תרמיל טרקינג רב-יומי</h3>
                <ul className="space-y-2.5">
                  {[
                    "נפח: 50–80 ליטר, מיועד לטיולים של מספר ימים עד מספר שבועות",
                    "עומס מיועד: 15–25 ק\"ג הכולל אוהל, שק שינה, אוכל ומים",
                    "מסגרת פנימית מוצקה ומערכת נשיאה מפותחת לחלוקת משקל אמיתית",
                    "מתאים לטרקינגים כמו שביל ישראל, האנפורנה, EBC ועוד",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-white/8 rounded-lg p-5 bg-white/[0.02]">
                <h3 className="text-white font-bold mb-3">תרמיל אולטרה-לייט</h3>
                <ul className="space-y-2.5">
                  {[
                    "מתאים לעומסים של 5–12 ק\"ג — לא יותר",
                    "נאבק עם עומסים מעל 15 ק\"ג: הגב מרגיש את זה, ולרוב אין חגורת ירכיים אמיתית",
                    "קל משקל, אך מחייב מטייל שיודע להפחית משקל ציוד בצורה שיטתית",
                    "מעולה לטיולי יום ארוכים או טיולים בגישת אולטרה-לייט מלאה",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Suspension */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">
              מערכת הנשיאה — הגורם הקריטי ביותר
            </h2>
            <p className="mb-5">
              מערכת הנשיאה (Suspension System) היא הגורם החשוב ביותר בבחירת תרמיל — הרבה יותר
              מנפח, צבע או מספר כיסים. היא זו שמחלקת את המשקל בין הכתפיים לירכיים, ואיכותה
              קובעת עד כמה תרגישו את המשא לאורך יום שלם של הליכה.
            </p>
            <ul className="space-y-3">
              {[
                "תרמיל רב-יומי איכותי מעביר 60–70% מהמשקל לחגורת הירכיים — לא לכתפיים",
                "רצועות הכתף אמורות לנחות בנוחות ולייצב — לא לשאת את עיקר המשקל",
                "בדקו שהמסגרת הפנימית (frame sheet) תואמת את עקומת הגב שלכם",
                "כמה תרמילים מציעים מסגרת מתכווננת לאורך גב שונה — תמיד מדדו לפני קנייה",
                "תרמיל עם גב מסגרת כפולה (dual frame) מחלק משקל טוב יותר בעומסים גבוהים",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Hip Belt */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">חגורת הירכיים</h2>
            <p className="mb-5">
              חגורת הירכיים היא אחד המרכיבים הכי מזולזלים בתרמיל — ואחד הכי חשובים.
              מטיילים רבים מהדקים אותה בצורה שגויה ומפספסים את מרבית היתרון שהיא מציעה.
            </p>
            <div className="border border-cyan/20 rounded-lg p-5 bg-cyan/[0.03] mb-5">
              <p className="text-white/80">
                <strong className="text-white">כלל מפתח:</strong> חגורת הירכיים צריכה להתיישב
                בדיוק על עצם הכסל (Iliac Crest) — החלק העליון של עצמות הירכיים. אם החגורה
                יושבת מעל לכסל או מתחתיו, המשקל עובר לגב התחתון ולכתפיים.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "מדדו את אורך הגב: מהחוליה הבולטת בבסיס הצוואר ועד לקצה עצם הכסל",
                "חגורה רחבה ומרופדת מחלקת משקל טוב יותר ממניעת לחץ על עצמות הירך",
                "בדקו שהחגורה לא לוחצת על עצמות הירך — תחושת לחץ אחרי 10 דקות היא סימן אזהרה",
                "חגורת ירכיים יכולה לשאת 60–70% מהמשקל הכולל כשמהודקת נכון",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Women's packs */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">תרמיל לנשים</h2>
            <p className="mb-5">
              תרמילי נשים (Women&apos;s Specific) אינם רק תרמילים בצבעים שונים — הם שונים
              מבחינה ארגונומית ויכולים לשנות מהותית את נוחות הטיול:
            </p>
            <ul className="space-y-3">
              {[
                "אורך גב קצר יותר — מותאם לפרופורציות נשיות בממוצע",
                "רצועות כתף צרות ומעוקלות פנימה — מתאימות לרוחב כתף נשי ומונעות שפשוף",
                "חגורת ירכיים בזווית שונה — מיועדת לאגן נשי שרחב יותר ביחס לכתפיים",
                "כניסת החגורה רחבה יותר — מתאימה לעצמות ירך נשיות",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              גם גברים בעלי מבנה גוף מסוים עשויים להרגיש נוח יותר עם תרמיל מסוג נשי.
              לעולם לא כדאי לדחות אפשרות לפני שמנסים עם משקל אמיתי.
            </p>
          </section>

          {/* Ventilated back */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">גב מאוורר</h2>
            <p className="mb-4">
              בטיולים ארוכים, במיוחד באקלים חם ולח, פנל גב מאוורר (Trampoline Back System)
              יכול לשנות את חוויית הטיול לחלוטין. המנגנון יוצר מרווח בין הגב לתרמיל ומאפשר
              זרימת אוויר חופשית — מה שמפחית משמעותית הצטברות חום והזעה.
            </p>
            <p>
              הצד השלילי: גב מאוורר מרחיק את המשקל ממרכז הגוף, מה שיכול להשפיע על שיווי המשקל
              בעומסים גבוהים מאוד. לרוב המטיילים הנושאים עד 18 ק&quot;ג — הנוחות שווה את ההתפשרות הקלה.
            </p>
          </section>

          {/* Testing */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">בדיקה לפני הקנייה</h2>
            <div className="border border-white/8 rounded-lg p-6 bg-white/[0.02]">
              <p className="text-white/80 font-medium mb-4">
                כלל הזהב של טסטרי ציוד מקצועיים: לעולם אל תקנו תרמיל ללא ניסיון עם משקל
                אמיתי — הפרש בין תרמילים מורגש רק כשהגב מרגיש אותם.
              </p>
              <ul className="space-y-3">
                {[
                  "מלאו את התרמיל עם 10–15 ק\"ג (שקיות חול, ספרים) ותלכו איתו 15–20 דקות בחנות",
                  "בדקו נקודות לחץ: עצמות כסל, בית השחי, עמוד שדרה תחתון",
                  "בדקו שהתרמיל לא מתנדנד לצדדים בהליכה — תנועה לרוחב מעייפת את הגב",
                  "שימו לב לתחושת ה'צמידות' — תרמיל טוב מרגיש כחלק מהגוף, לא כעול",
                  "בדקו נגישות לכיסים ותאים כשהתרמיל על הגב — לא תמיד תוכלו להוריד אותו",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan mt-2" />
                    <span className="text-white/55">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Additional tips */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">שיקולים נוספים</h2>
            <ul className="space-y-3">
              {[
                "גישה לתא הראשי: גישה מלמעלה בלבד (top-loading) קלאסית ועמידה; גישה כפולה (מלמעלה ומהצד) נוחה יותר לאיתור ציוד",
                "כיסי הצד: חשוב שיהיו נגישים בזמן הליכה — עבור בקבוק מים, חטיפים, מפה",
                "כיסוי גשם (rain cover): רוב התרמילים אינם אטומים למים — בדקו אם מגיע כיסוי או רכשו בנפרד",
                "חומרים: ניילון 210D עד 420D מציע איזון טוב בין חוזק קרע למשקל",
                "מערכת הידרציה: בדקו אם יש כיס ייעודי לשלפוחית שתייה ופתח לצינור בכתף",
                "נסיעה באוויר: תרמיל עד 46 ליטר עשוי להכנס כמטען יד — בדקו מדיניות חברת התעופה",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-14 pt-10 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
          <Link href="/blog" className="text-white/25 text-sm hover:text-white/55 transition-colors">
            ← חזרה לבלוג
          </Link>
          <Link href="/blog/sleeping-bag-guide" className="text-cyan/50 text-sm hover:text-cyan transition-colors">
            מדריך שק שינה ←
          </Link>
        </div>

      </div>
    </div>
  );
}
