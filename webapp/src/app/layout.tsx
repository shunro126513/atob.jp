import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-jp",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A to B — 文化芸術支援プロジェクト比較・集約プラットフォーム",
  description: "音楽・アート・映像・演劇など、文化芸術のクラウドファンディングプロジェクトを横断検索・比較。ヒートスコアでトレンドを可視化。",
  openGraph: {
    title: "A to B",
    description: "支援ではなく、参加。文化芸術プロジェクトを比較・発見。",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/logo.svg", width: 240, height: 125, alt: "A to B" }],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${playfair.variable} ${dmSans.variable} ${notoSansJP.variable} font-sans antialiased`} style={{ background: "#0A0A10" }}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
