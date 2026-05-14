import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MakinoWorks — Creative Designer Portfolio",
  description: "Makino Haruka 的個人作品集。涵蓋空間設計、平面設計、動態影像、網站設計等多元創作。",
  keywords: ["MakinoWorks", "Creative Designer", "Portfolio", "Makino Haruka"],
  authors: [{ name: "Makino Haruka" }],
  openGraph: {
    title: "MakinoWorks",
    description: "Creative Designer Portfolio",
    type: "website",
    locale: "zh_TW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}