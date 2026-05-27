import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "אודות TrailIQ — הסיפור שלנו",
  description:
    "TrailIQ נולד מתוך אהבה לטיולים ולציוד איכותי. פלטפורמת המלצות ציוד מבוססת AI לטיולים.",
};

const partners = [
  "Osprey", "RAB", "Patagonia", "Arc'teryx", "Black Diamond",
  "MSR", "Therm-a-Rest", "Sea to Summit", "Salomon", "The North Face",
  "Gregory", "Deuter", "Nemo", "Hilleberg",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-24 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-14">
          <p className="section-label mb-4 text-cyan">אודות</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            אודות TrailIQ
          </h1>
          <p className="text-white/30 text-sm">ציוד טיולים. ממוקד. חכם. שלך.</p>
        </div>

        {/* ── Sections ── */}
        <div className="space-y-14 text-white/55 leading-relaxed text-[15px]">

          {/* 1 — החזון שלנו */}
          <section>
            <h2 className="text-xl font-black text-white mb-4 tracking-tight">
              החזון שלנו
            </h2>
            <p>
              החזון שלנו הוא להנגיש את עולם ציוד הטיולים לכולם. כיום קיימות עשרות ואף מאות חברות
              ציוד טיולים ברחבי העולם — חלקן מוכרות וחלקן פחות. מטיילים רבים מכירים רק 2–3 מותגים
              ומפספסים מוצרים מעולים מחברות שלא שמעו עליהן. המטרה שלנו היא לרכז את כל החברות במקום
              אחד, להציג את המוצרים שלהן זה לצד זה, ולאפשר לכל מטייל — מתחיל או מנוסה — לגלות,
              להשוות ולבחור את הציוד שמתאים בדיוק לו. אנחנו מאמינים שהציוד הנכון יכול לשנות חוויית
              טיול, ושכל מטייל ראוי לקבל את המידע המלא לפני שהוא בוחר.
            </p>
          </section>

          {/* 3 — הסיפור שלנו */}
          <section>
            <h2 className="text-xl font-black text-white mb-4 tracking-tight">
              הסיפור שלנו
            </h2>
            <p>
              TrailIQ נולד מתוך אהבה לטיולים ולציוד איכותי. גילינו שמטיילים מבלים שעות
              בחיפוש ובהשוואת ציוד בין עשרות אתרים שונים. החלטנו לבנות פלטפורמה אחת
              שמרכזת את כל המידע — מפרטים טכניים, מחירים, והמלצות מותאמות אישית.
            </p>
          </section>

          {/* 2 — מה אנחנו עושים */}
          <section>
            <h2 className="text-xl font-black text-white mb-4 tracking-tight">
              מה אנחנו עושים
            </h2>
            <p>
              אנחנו עוזרים לך למצוא את הציוד המושלם לטיול שלך. האתר מנתח את היעד,
              מזג האוויר, משך הטיול והתקציב שלך ומציע ציוד מותאם אישית מהמותגים
              המובילים בעולם.
            </p>
          </section>

          {/* 3 — איך זה עובד */}
          <section>
            <h2 className="text-xl font-black text-white mb-4 tracking-tight">
              איך זה עובד
            </h2>
            <ol className="space-y-4 mt-2">
              {[
                "ספר לנו לאן אתה טס ומתי",
                "אנחנו מנתחים את מזג האוויר והתנאים ביעד",
                "מקבל המלצות ציוד מותאמות אישית",
                "משווה בין מוצרים ובוחר את מה שמתאים לך",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="
                      flex-shrink-0 w-7 h-7 rounded-full
                      bg-white/6 border border-white/10
                      flex items-center justify-center
                      text-[11px] font-bold text-cyan
                    "
                  >
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* 4 — השותפים שלנו */}
          <section>
            <h2 className="text-xl font-black text-white mb-4 tracking-tight">
              השותפים שלנו
            </h2>
            <p className="mb-6">
              אנחנו עובדים עם המותגים המובילים בעולם הציוד:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {partners.map((brand) => (
                <span
                  key={brand}
                  className="
                    px-3 py-1.5
                    rounded-sm border border-white/10
                    bg-white/[0.04]
                    text-[12px] font-medium text-white/50
                    tracking-wide
                  "
                >
                  {brand}
                </span>
              ))}
            </div>
          </section>

          {/* 5 — גילוי נאות */}
          <section className="border border-white/8 rounded-lg p-6 bg-white/[0.02]">
            <h2 className="text-xl font-black text-white mb-4 tracking-tight">
              גילוי נאות
            </h2>
            <p>
              TrailIQ הוא אתר השוואה עצמאי. אנחנו מקבלים עמלה על רכישות שנעשות דרך
              הקישורים שלנו,{" "}
              <strong className="text-white/80">ללא עלות נוספת עבורך</strong>.
              ההמלצות שלנו מבוססות על מפרטים טכניים ולא מושפעות מתשלום.
            </p>
          </section>

        </div>

        {/* ── Contact CTA ── */}
        <div className="mt-14 pt-10 border-t border-white/5">
          <p className="text-white/30 text-sm mb-3">שאלות? נשמח לשמוע.</p>
          <a
            href="mailto:info@trailiq.co.il"
            className="text-cyan hover:text-cyan/70 transition-colors text-sm underline decoration-cyan/30"
          >
            info@trailiq.co.il
          </a>
        </div>

        {/* ── Back links ── */}
        <div className="mt-10 flex gap-6 text-sm text-white/25">
          <Link href="/" className="hover:text-white/55 transition-colors">← דף הבית</Link>
          <Link href="/browse" className="hover:text-white/55 transition-colors">קטגוריות</Link>
          <Link href="/terms" className="hover:text-white/55 transition-colors">תנאי שימוש</Link>
        </div>

      </div>
    </div>
  );
}
