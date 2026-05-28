import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדריך מקצועי לשק שינה | TrailIQ",
  description: "דירוגי טמפרטורה, כוח מילוי, מילוי טבעי מול סינתטי — כל מה שצריך לדעת לפני שבוחרים שק שינה.",
};

export default function SleepingBagGuidePage() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-24 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-4 text-cyan">שינה בשטח · 6 דקות קריאה</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            מדריך מקצועי לשק שינה
          </h1>
          <p className="text-white/30 text-sm">
            ידע מקצועי שיעזור לבחור את שק השינה הנכון לכל מסע.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-white/55 leading-relaxed text-[15px]">

          <section>
            <p>
              שק שינה הוא ההבדל בין לילה של מנוחה אמיתית לבין שעות של רעד מקור. בחירה שגויה
              לא רק פוגעת בנוחות — היא יכולה להיות מסוכנת בתנאי מזג אוויר קיצוניים. המדריך
              הזה מסביר את מה שטסטרי ציוד מקצועיים יודעים ורוב הקונים מפספסים.
            </p>
          </section>

          {/* Temperature ratings */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">דירוגי טמפרטורה</h2>
            <p className="mb-5">
              שקי שינה מדורגים לפי תקן אירופאי (EN 13537 / ISO 23537) הכולל שלוש רמות.
              הבנת ההבדל ביניהן היא קריטית לבחירה נכונה:
            </p>
            <div className="space-y-4">
              {[
                {
                  level: "Comfort — נוחות",
                  color: "text-emerald-400",
                  border: "border-emerald-400/20",
                  bg: "bg-emerald-400/[0.03]",
                  desc: "הטמפרטורה שבה אדם ממוצע (אישה) יכול לישון בנוחות מלאה, לא מכורבל, ולהרגיש חם. זהו הדירוג הרלוונטי ביותר לרוב המטיילים.",
                },
                {
                  level: "Limit — גבול",
                  color: "text-amber-400",
                  border: "border-amber-400/20",
                  bg: "bg-amber-400/[0.03]",
                  desc: "הטמפרטורה שבה גבר ממוצע יכול לישון מכורבל, לא בנוחות מלאה. מתחת לדירוג זה — השינה לא נעימה, אך עדיין אפשרית.",
                },
                {
                  level: "Extreme — קיצוני",
                  color: "text-red-400",
                  border: "border-red-400/20",
                  bg: "bg-red-400/[0.03]",
                  desc: "גבול ההישרדות — הטמפרטורה שבה קיימת סכנת היפותרמיה. זהו דירוג בטיחות, לא דירוג נוחות. לעולם אל תתכננו טיול לפי דירוג Extreme.",
                },
              ].map((item) => (
                <div key={item.level} className={`border ${item.border} rounded-lg p-5 ${item.bg}`}>
                  <h3 className={`font-bold mb-2 ${item.color}`}>{item.level}</h3>
                  <p className="text-white/55 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-cyan/20 rounded-lg p-4 bg-cyan/[0.03]">
              <p className="text-white/70 text-sm">
                <strong className="text-white">טיפ מקצועי:</strong> תמיד בחרו שק שינה עם דירוג Comfort
                נמוך ב-3–5 מעלות מהטמפרטורה הנמוכה שתצפו אליה. לילות בשטח תמיד מורגשים קרים יותר
                ממה שהתחזית מציגה.
              </p>
            </div>
          </section>

          {/* Fill power */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">
              מילוי טבעי: כוח מילוי (Fill Power)
            </h2>
            <p className="mb-5">
              שקי שינה עם מילוי טבעי (ברווז או אווז) מדורגים לפי כוח המילוי — מדד ליחס שבין
              משקל המילוי לנפח האוויר שהוא לוכד. ככל שכוח המילוי גבוה יותר, כך הבידוד קל ויעיל יותר:
            </p>
            <div className="space-y-3">
              {[
                {
                  fp: "650 Fill Power",
                  label: "בסיסי / תקציבי",
                  desc: "מילוי אמין לטיולים מזדמנים. כבד יותר ואורז לנפח גדול יותר. מחיר נגיש.",
                  color: "text-white/50",
                },
                {
                  fp: "800 Fill Power",
                  label: "איכות בינונית-גבוהה",
                  desc: "האיזון הטוב ביותר בין מחיר לביצועים. הבחירה הנפוצה של מטיילים מנוסים.",
                  color: "text-cyan/80",
                },
                {
                  fp: "900+ Fill Power",
                  label: "פרימיום / אולטרה-לייט",
                  desc: "מינימום משקל ונפח. פרמיום במחיר, אך ההבדל מורגש בכל טיול. בחירת אלפיניסטים ומטיילי אולטרה-לייט.",
                  color: "text-white",
                },
              ].map((item) => (
                <div key={item.fp} className="border border-white/8 rounded-lg p-5 bg-white/[0.02] flex gap-4">
                  <div className="flex-shrink-0 text-right">
                    <span className={`font-black text-sm ${item.color}`}>{item.fp}</span>
                    <p className="text-white/30 text-xs mt-0.5">{item.label}</p>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Down vs Synthetic */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">
              מילוי טבעי מול סינתטי — ההשוואה המלאה
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/8 rounded-lg p-5 bg-white/[0.02]">
                <h3 className="text-white font-bold mb-4">מילוי טבעי (ברווז / אווז)</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-cyan/70 text-xs font-bold tracking-wider uppercase mb-2">יתרונות</p>
                    <ul className="space-y-2">
                      {[
                        "קל משקל — המיטב ביחס חום/משקל",
                        "אורז לנפח קטן יותר — עד גודל בקבוק מים",
                        "עמיד לאורך שנים רבות בטיפול נכון",
                        "מרגיש רך ונוח יותר",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/50 text-sm">
                          <span className="text-cyan mt-0.5">+</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-red-400/70 text-xs font-bold tracking-wider uppercase mb-2">חסרונות</p>
                    <ul className="space-y-2">
                      {[
                        "מאבד בידוד כמעט מוחלט כשרטוב",
                        "מתייבש לאט — מסוכן בתנאי גשם",
                        "יקר יותר משמעותית",
                        "מטיילים מסוימים אלרגיים",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/50 text-sm">
                          <span className="text-red-400/70 mt-0.5">−</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border border-white/8 rounded-lg p-5 bg-white/[0.02]">
                <h3 className="text-white font-bold mb-4">מילוי סינתטי</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-cyan/70 text-xs font-bold tracking-wider uppercase mb-2">יתרונות</p>
                    <ul className="space-y-2">
                      {[
                        "שומר על בידוד גם כשרטוב — בטוח יותר",
                        "מתייבש מהיר",
                        "זול יותר — נגיש לכולם",
                        "ידידותי לאלרגיים",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/50 text-sm">
                          <span className="text-cyan mt-0.5">+</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-red-400/70 text-xs font-bold tracking-wider uppercase mb-2">חסרונות</p>
                    <ul className="space-y-2">
                      {[
                        "כבד יותר — לחצות קיזוז בלתי נמנע",
                        "אורז לנפח גדול יותר",
                        "מתבלה מהר יותר לאורך השנים",
                        "פחות נוח לתחושה",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/50 text-sm">
                          <span className="text-red-400/70 mt-0.5">−</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 border border-white/8 rounded-lg p-4 bg-white/[0.02]">
              <p className="text-white/60 text-sm">
                <strong className="text-white/80">המלצה מקצועית:</strong> באזורים עם גשם תכוף (פטגוניה, סקנדינביה, אנגליה)
                — מילוי סינתטי בעדיפות ברורה. לאזורים יבשים יחסית (הרי האטלס, שביל ישראל, הימלאיה בעונה יבשה)
                — מילוי טבעי יציע ביצועים טובים יותר במשקל נמוך יותר.
              </p>
            </div>
          </section>

          {/* Women's bags */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">שק שינה לנשים</h2>
            <p className="mb-4">
              שקי שינה לנשים (Women&apos;s Specific) מחושבים בצורה שונה — לא רק בצבע:
            </p>
            <ul className="space-y-3">
              {[
                "חתך רחב יותר בירכיים ובאגן — מתאים לפרופורציות נשיות",
                "חתך צר יותר בכתפיים — פחות אוויר ריק לחימום, יעילות חום גבוהה יותר",
                "ריפוד נוסף אזור כף הרגל — נשים מאבדות חום מהרגליים מהר יותר",
                "מילוי מוגבר בפלג גוף עליון — מפצה על ייצור חום פנימי נמוך יותר",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              גברים רזים עם ייצור חום פנימי נמוך עשויים להפיק תועלת משק שינה לנשים — הרוכסן
              הצרפתי מציין שאין בושה בניסיון.
            </p>
          </section>

          {/* Packing size */}
          <section>
            <h2 className="text-xl font-black text-white mb-5 tracking-tight">גודל אריזה ומשקל</h2>
            <p className="mb-4">
              שקי שינה אולטרה-לייט איכותיים עם מילוי טבעי בכוח מילוי 900+ יכולים להיארז
              לנפח של בקבוק מים — זוהי אחת ההתפתחויות הגדולות של עשור הציוד האחרון.
            </p>
            <div className="border border-white/8 rounded-lg p-5 bg-white/[0.02]">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "שק שינה תקני", weight: "1.2–1.8 ק\"ג", vol: "8–14 ליטר" },
                  { label: "שק שינה קל", weight: "0.7–1.1 ק\"ג", vol: "4–7 ליטר" },
                  { label: "אולטרה-לייט", weight: "0.3–0.6 ק\"ג", vol: "1.5–3 ליטר" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-white/40 text-xs mb-2">{item.label}</p>
                    <p className="text-white font-bold text-sm">{item.weight}</p>
                    <p className="text-cyan/60 text-xs mt-1">{item.vol}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-14 pt-10 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
          <Link href="/blog" className="text-white/25 text-sm hover:text-white/55 transition-colors">
            ← חזרה לבלוג
          </Link>
          <Link href="/blog/common-gear-mistakes" className="text-cyan/50 text-sm hover:text-cyan transition-colors">
            טעויות נפוצות בציוד ←
          </Link>
        </div>

      </div>
    </div>
  );
}
