import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות — TrailIQ",
  description: "מדיניות הפרטיות של אתר TrailIQ.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-24 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-4 text-cyan">משפטי</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            מדיניות פרטיות
          </h1>
          <p className="text-white/30 text-sm">עודכן לאחרונה: מאי 2026</p>
        </div>

        <div className="space-y-10 text-white/55 leading-relaxed text-[15px]">

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">1. כללי</h2>
            <p>
              TrailIQ מחויבת לשמירה על פרטיות המשתמשים. מדיניות זו מסבירה אילו נתונים נאספים, כיצד הם
              משמשים, ומהן זכויותיכם.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">2. Google Analytics</h2>
            <p className="mb-3">
              אנחנו משתמשים ב-<strong className="text-white/80">Google Analytics</strong> (מזהה: G-Z7CGXMPFD2)
              לניתוח אנונימי של תנועת גולשים. הנתונים הנאספים כוללים:
            </p>
            <ul className="list-none space-y-1.5 text-white/45 text-sm">
              {[
                "עמודים שנצפו ומשך הביקור",
                "סוג מכשיר ומערכת הפעלה",
                "ארץ המקור (ברמת מדינה בלבד)",
                "מקור ההפניה (כיצד הגעתם לאתר)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-cyan/50 mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              <strong className="text-white/80">לא נאספים</strong> פרטים מזהים כגון שם, כתובת IP מלאה,
              או מידע אישי אחר. Google Analytics פועל על-פי{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:text-cyan/70 transition-colors underline decoration-cyan/30"
              >
                מדיניות הפרטיות של Google
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">3. עוגיות (Cookies)</h2>
            <p>
              Google Analytics משתמש בעוגיות לצורך ניתוח הביקורים. עוגיות אלו מאוחסנות בדפדפן שלכם ועוזרות
              להבחין בין ביקורים שונים. <strong className="text-white/80">ניתן לבטל</strong> את איסוף
              הנתונים בכל עת דרך הגדרות הדפדפן או דרך{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:text-cyan/70 transition-colors underline decoration-cyan/30"
              >
                תוסף הביטול של Google
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">4. Pexels — תוכן וידאו</h2>
            <p>
              הסרטונים בדף הבית נטענים מ-<strong className="text-white/80">Pexels API</strong>. TrailIQ
              אינה אוספת נתונים על צפייה בסרטונים. לפרטים, ראו את{" "}
              <a
                href="https://www.pexels.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:text-cyan/70 transition-colors underline decoration-cyan/30"
              >
                מדיניות הפרטיות של Pexels
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">5. התראות מחיר ו-localStorage</h2>
            <p>
              התראות המחיר שהגדרתם נשמרות{" "}
              <strong className="text-white/80">על המכשיר שלכם בלבד</strong> באמצעות localStorage. נתונים
              אלו אינם נשלחים לשרתינו ואינם משותפים עם צד שלישי כלשהו. ניקוי נתוני הדפדפן ימחק את
              ההתראות.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">6. איסוף מידע אישי</h2>
            <p>
              אנחנו <strong className="text-white/80">לא אוספים מידע אישי</strong> (שם, כתובת, פרטי תשלום)
              אלא אם בחרתם לספק כתובת דוא״ל לצורך התראות עתידיות. במקרה כזה, הדוא״ל ישמש אך ורק
              לשליחת ההתראות שביקשתם.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">7. שיתוף מידע עם צדדים שלישיים</h2>
            <p>
              אנחנו <strong className="text-white/80">לא מוכרים, לא משכירים, ולא משתפים</strong> מידע
              אישי של משתמשים עם צדדים שלישיים, למעט בנסיבות הבאות:
            </p>
            <ul className="list-none space-y-1.5 text-white/45 text-sm mt-3">
              {[
                "Google Analytics — לניתוח אנונימי בלבד",
                "Pexels — לטעינת תוכן וידאו",
                "קמעונאים שאליהם אתם עוברים דרך קישורינו",
                "עמידה בדרישות חוקיות",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-cyan/50 mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">8. ביטול עיקוב ובקרת פרטיות</h2>
            <p>
              תוכלו לשלוט בעוגיות ובנתוני גלישה דרך הגדרות הדפדפן שלכם. כל דפדפן מאפשר חסימה או מחיקה
              של עוגיות. שימו לב שחסימת עוגיות עשויה להשפיע על חוויית השימוש באתר.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">9. יצירת קשר</h2>
            <p>
              לשאלות בנוגע לפרטיות, פנו אלינו:{" "}
              <a
                href="mailto:privacy@trailiq.co.il"
                className="text-cyan hover:text-cyan/70 transition-colors underline decoration-cyan/30"
              >
                privacy@trailiq.co.il
              </a>
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/5 flex gap-6 text-sm text-white/25">
          <Link href="/" className="hover:text-white/55 transition-colors">← דף הבית</Link>
          <Link href="/terms" className="hover:text-white/55 transition-colors">תנאי שימוש</Link>
          <Link href="/accessibility" className="hover:text-white/55 transition-colors">הצהרת נגישות</Link>
        </div>

      </div>
    </div>
  );
}
