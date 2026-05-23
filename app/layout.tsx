import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageProvider";
import { BagProvider } from "@/lib/BagContext";
import Navbar from "@/components/Navbar";
import WeightBar from "@/components/WeightBar";

export const metadata: Metadata = {
  title: "TrailIQ — הציוד הנכון. כל הרפתקה.",
  description:
    "AI-powered outdoor gear recommendations for hikers and trekkers. Bilingual Hebrew/English.",
  themeColor: "#0A0F1E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen bg-bg text-white antialiased">
        <LanguageProvider>
          <BagProvider>
            <Navbar />
            <main>{children}</main>
            <WeightBar />
          </BagProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
