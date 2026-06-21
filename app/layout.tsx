import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageProvider";
import { BagProvider } from "@/lib/BagContext";
import { ExchangeRateProvider } from "@/lib/ExchangeRateContext";
import Navbar from "@/components/Navbar";
import WeightBar from "@/components/WeightBar";
import SiteFooter from "@/components/SiteFooter";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import CookieBanner from "@/components/CookieBanner";
import SkipLink from "@/components/SkipLink";
import Script from "next/script";

const SITE_URL = "https://trailiq.co";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "TrailIQ — הציוד הנכון. כל הרפתקה.",
  description:
    "AI-powered outdoor gear recommendations for hikers and trekkers. Bilingual Hebrew/English.",
  themeColor: "#030811",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "he": `${SITE_URL}/?lang=he`,
      "en": `${SITE_URL}/?lang=en`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    locale: "he_IL",
    alternateLocale: ["en_US"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        {/* hreflang — bilingual Hebrew/English */}
        <link rel="alternate" hrefLang="he" href={`${SITE_URL}/?lang=he`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/?lang=en`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z7CGXMPFD2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z7CGXMPFD2');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-bg text-white antialiased">
        <LanguageProvider>
          {/* Skip-to-content — keyboard accessibility */}
          <SkipLink />
          <ExchangeRateProvider>
            <BagProvider>
              <Navbar />
              <main id="main-content">{children}</main>
              <WeightBar />
              <SiteFooter />
              <AccessibilityWidget />
              <CookieBanner />
            </BagProvider>
          </ExchangeRateProvider>
        </LanguageProvider>

      </body>
    </html>
  );
}
