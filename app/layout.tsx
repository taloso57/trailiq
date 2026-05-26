import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageProvider";
import { BagProvider } from "@/lib/BagContext";
import { ExchangeRateProvider } from "@/lib/ExchangeRateContext";
import Navbar from "@/components/Navbar";
import WeightBar from "@/components/WeightBar";
import SiteFooter from "@/components/SiteFooter";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import Script from "next/script";

export const metadata: Metadata = {
  title: "TrailIQ — הציוד הנכון. כל הרפתקה.",
  description:
    "AI-powered outdoor gear recommendations for hikers and trekkers. Bilingual Hebrew/English.",
  themeColor: "#0A0F1E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
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
        {/* Skip-to-content — keyboard accessibility */}
        <a href="#main-content" className="skip-link">
          דלג לתוכן הראשי
        </a>
        <LanguageProvider>
          <ExchangeRateProvider>
            <BagProvider>
              <Navbar />
              <main id="main-content">{children}</main>
              <WeightBar />
              <SiteFooter />
              <AccessibilityWidget />
            </BagProvider>
          </ExchangeRateProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
