import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "בלוג ציוד טיולים | TrailIQ",
  description: "מדריכי ציוד מקצועיים, טיפים מטסטרים מנוסים ורשימות ציוד לטיולים ברחבי העולם.",
};

const articles = [
  {
    slug: "how-to-choose-backpack",
    title: "כיצד לבחור תרמיל גב לטיול",
    description: "מדריך מקצועי לבחירת תרמיל גב — סוגים, נפח, מערכת נשיאה, התאמה לגוף ומה לבדוק לפני הקנייה.",
    readTime: "7 דקות קריאה",
    category: "ציוד בסיסי",
  },
  {
    slug: "sleeping-bag-guide",
    title: "מדריך מקצועי לשק שינה",
    description: "דירוגי טמפרטורה, כוח מילוי, מילוי טבעי מול סינתטי — כל מה שצריך לדעת לפני שבוחרים שק שינה.",
    readTime: "6 דקות קריאה",
    category: "שינה בשטח",
  },
  {
    slug: "common-gear-mistakes",
    title: "5 טעויות נפוצות בבחירת ציוד טיול",
    description: "הטעויות שמטיילים חוזרים ועושים שוב ושוב — ואיך להימנע מהן עם ידע מקצועי פשוט.",
    readTime: "5 דקות קריאה",
    category: "טיפים",
  },
  {
    slug: "israel-trail-gear",
    title: "ציוד לשביל ישראל — רשימה מלאה",
    description: "רשימת ציוד מקיפה לשביל ישראל: מחסה, שינה, מטבח, בטיחות, ניווט, היגיינה ולבוש.",
    readTime: "8 דקות קריאה",
    category: "שבילי ישראל",
  },
  {
    slug: "ultralight-hiking",
    title: "הליכה אולטרה-לייט — עקרונות מקצועיים",
    description: "הביג 4, יעדי משקל בסיס, חלופות קלות ואיך לחצות את הקו בין נוח לקל — ללא פגיעה בביטחון.",
    readTime: "6 דקות קריאה",
    category: "אולטרה-לייט",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-24 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-4 text-cyan">תוכן מקצועי</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            בלוג ציוד טיולים
          </h1>
          <p className="text-white/30 text-sm">מדריכים מקצועיים. ידע מהשטח. בחינם.</p>
        </div>

        {/* Article cards */}
        <div className="space-y-4">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
              <div className="border border-white/8 rounded-lg p-6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/16 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-cyan/70">
                        {article.category}
                      </span>
                      <span className="text-white/20 text-xs">·</span>
                      <span className="text-white/30 text-xs">{article.readTime}</span>
                    </div>
                    <h2 className="text-white font-black text-lg leading-snug mb-2 group-hover:text-white/90 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-white/70 group-hover:border-white/30 transition-all duration-300 mt-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-180">
                      <path d="M8 6H2M5 2L1 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back */}
        <div className="mt-14 pt-10 border-t border-white/5">
          <Link href="/" className="text-white/25 text-sm hover:text-white/55 transition-colors">
            ← דף הבית
          </Link>
        </div>

      </div>
    </div>
  );
}
