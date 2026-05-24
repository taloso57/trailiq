import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תנאי שימוש — TrailIQ",
  description: "תנאי השימוש באתר TrailIQ — אתר השוואת ציוד טיולים.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-24 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-4 text-cyan">משפטי</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            תנאי שימוש
          </h1>
          <p className="text-white/30 text-sm">עודכן לאחרונה: מאי 2026</p>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-white/55 leading-relaxed text-[15px]">

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">1. אודות האתר</h2>
            <p>
              TrailIQ (<span className="text-white/80 font-medium">trailiq-two.vercel.app</span>) הוא אתר
              השוואה ושיווק שותפים לציוד טיולים. אנחנו{" "}
              <strong className="text-white/80">אינם חנות מקוונת ואינם מוכרים מוצרים ישירות</strong>.
              כל הרכישות מתבצעות ישירות מול הקמעונאים השונים דרך קישורים חיצוניים.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">2. קישורי שותפים ועמלות</h2>
            <p>
              חלק מהקישורים באתר הם קישורי שותפים. כאשר אתם רוכשים מוצר דרך הקישורים שלנו, אנחנו עשויים
              לקבל עמלה מהקמעונאי —{" "}
              <strong className="text-white/80">ללא כל עלות נוספת עבורכם</strong>. הכנסות אלו מסייעות לנו
              לתחזק ולשפר את האתר.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">3. דיוק מידע המוצרים</h2>
            <p>
              המידע על המוצרים — מחירים, מפרטים, זמינות — מוצג לצורך השוואה בלבד ועשוי שלא להיות מדויק
              לחלוטין או עדכני.{" "}
              <strong className="text-white/80">לפני כל רכישה, ודאו את הפרטים ישירות באתר הקמעונאי.</strong>{" "}
              TrailIQ אינה אחראית לשינויים במחירים, אי-זמינות מוצרים, או כל אי-התאמה בין המידע המוצג
              לבין המציאות.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">4. מחירים ושערי חליפין</h2>
            <p>
              המחירים המוצגים באתר הם אומדנים בלבד ועשויים להיות שונים מהמחירים בפועל אצל הקמעונאים.
              מחירים בשקלים חדשים מחושבים לפי שערי חליפין מוערכים ואינם מחירים סופיים. TrailIQ לא תישא
              באחריות לכל הפרש מחיר.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">5. הגבלת אחריות</h2>
            <p>
              TrailIQ אינה אחראית לכל נזק, ישיר או עקיף, הנובע משימוש בהמלצות האתר, מרכישת מוצרים דרך
              הקישורים שלנו, או מהסתמכות על המידע המוצג. השימוש באתר ובהמלצותיו הוא{" "}
              <strong className="text-white/80">באחריות המשתמש בלבד</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">6. קניין רוחני</h2>
            <p>
              כל תוכן האתר — עיצוב, טקסטים, קוד, לוגואים — הוא רכושה של TrailIQ, אלא אם צוין אחרת.
              אין להעתיק, לשכפל, או לעשות שימוש מסחרי בתכנים ללא אישור מפורש בכתב.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">7. שינויים בתנאים</h2>
            <p>
              אנחנו שומרים לעצמנו את הזכות לעדכן תנאים אלו בכל עת. שימוש מתמשך באתר לאחר פרסום תנאים
              מעודכנים מהווה הסכמה לתנאים החדשים.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">8. יצירת קשר</h2>
            <p>
              לשאלות בנוגע לתנאי השימוש, פנו אלינו:{" "}
              <a
                href="mailto:info@trailiq.co.il"
                className="text-cyan hover:text-cyan/70 transition-colors underline decoration-cyan/30"
              >
                info@trailiq.co.il
              </a>
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/5 flex gap-6 text-sm text-white/25">
          <Link href="/" className="hover:text-white/55 transition-colors">← דף הבית</Link>
          <Link href="/privacy" className="hover:text-white/55 transition-colors">מדיניות פרטיות</Link>
          <Link href="/accessibility" className="hover:text-white/55 transition-colors">הצהרת נגישות</Link>
        </div>

      </div>
    </div>
  );
}
