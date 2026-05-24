import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הצהרת נגישות — TrailIQ",
  description: "הצהרת הנגישות של אתר TrailIQ — WCAG 2.1 רמה AA.",
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-24 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-4 text-cyan">נגישות</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            הצהרת נגישות
          </h1>
          <p className="text-white/30 text-sm">עודכן לאחרונה: מאי 2026</p>
        </div>

        <div className="space-y-10 text-white/55 leading-relaxed text-[15px]">

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">1. מחויבות לנגישות</h2>
            <p>
              TrailIQ מחויבת להנגשת האתר לכלל המשתמשים, כולל אנשים עם מוגבלויות. אנחנו שואפים לעמוד
              בתקן הבינלאומי{" "}
              <strong className="text-white/80">WCAG 2.1 ברמת AA</strong> (Web Content Accessibility
              Guidelines), ולדאוג לכך שהאתר יהיה שמיש, תפיסתי, מובן ועמיד.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">2. תכונות נגישות קיימות</h2>
            <ul className="list-none space-y-3 text-sm">
              {[
                {
                  title: "ניווט במקלדת",
                  body: "כל האלמנטים האינטראקטיביים נגישים באמצעות מקלדת בלבד (Tab, Enter, Space, חצים).",
                },
                {
                  title: "טקסט חלופי לתמונות",
                  body: "כל תמונות המוצרים כוללות alt text המתאר את המוצר לסייענים קוליים.",
                },
                {
                  title: "ניגודיות צבעים",
                  body: "יחסי ניגודיות הצבעים עומדים בדרישות WCAG AA — טקסט לבן על רקע כהה עם ניגודיות מינימלית של 4.5:1.",
                },
                {
                  title: "תמיכה ב-RTL",
                  body: "האתר תומך מלא בכיוון ימין-לשמאל (RTL) לשפה העברית, כולל פריסה, ניווט, וסדר קריאה.",
                },
                {
                  title: "עיצוב רספונסיבי",
                  body: "האתר מותאם לכל גדלי המסך — מובייל, טאבלט ודסקטופ — ללא אובדן תוכן או פונקציונליות.",
                },
                {
                  title: "דילוג לתוכן הראשי",
                  body: "קיים קישור 'דלג לתוכן הראשי' בראש הדף, נגיש בלחיצת Tab, לדילוג על הניווט החוזר.",
                },
                {
                  title: "ניגודיות בפוקוס",
                  body: "כל האלמנטים שמקבלים מיקוד (focus) מוצגים עם מסגרת ברורה לזיהוי מיקום המשתמש.",
                },
                {
                  title: "תוויות ARIA",
                  body: "כפתורים ואלמנטים אינטראקטיביים מכילים aria-label לתיאור ברור לסייענים קוליים.",
                },
              ].map((f) => (
                <li key={f.title} className="flex items-start gap-3">
                  <span className="text-cyan mt-0.5 shrink-0 text-xs">✓</span>
                  <span>
                    <strong className="text-white/75 font-semibold">{f.title}</strong>
                    {" — "}
                    {f.body}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">3. טכנולוגיות נתמכות</h2>
            <p className="mb-3">האתר נבדק ונועד לעבוד עם:</p>
            <ul className="list-none space-y-1.5 text-white/45 text-sm">
              {[
                "NVDA + Chrome (Windows)",
                "VoiceOver + Safari (macOS / iOS)",
                "TalkBack + Chrome (Android)",
                "כל דפדפן מודרני (Chrome, Firefox, Safari, Edge)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-cyan/50 mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">4. מגבלות ידועות</h2>
            <p>
              אנחנו פועלים לשיפור מתמיד. ייתכן שחלק מרכיבי האתר טרם הותאמו במלואם לתקן WCAG 2.1 AA.
              אם נתקלתם בבעיית נגישות, נשמח לדעת.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 tracking-tight">5. יצירת קשר בנושא נגישות</h2>
            <p>
              אם נתקלתם בבעיה כלשהי בנגישות האתר, אנחנו רוצים לדעת ולתקן. פנו אלינו:{" "}
              <a
                href="mailto:accessibility@trailiq.co.il"
                className="text-cyan hover:text-cyan/70 transition-colors underline decoration-cyan/30"
              >
                accessibility@trailiq.co.il
              </a>
            </p>
            <p className="mt-3 text-white/40 text-sm">
              נשתדל להגיב תוך 5 ימי עסקים ולטפל בבעיה בהקדם האפשרי.
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/5 flex gap-6 text-sm text-white/25">
          <Link href="/" className="hover:text-white/55 transition-colors">← דף הבית</Link>
          <Link href="/terms" className="hover:text-white/55 transition-colors">תנאי שימוש</Link>
          <Link href="/privacy" className="hover:text-white/55 transition-colors">פרטיות</Link>
        </div>

      </div>
    </div>
  );
}
