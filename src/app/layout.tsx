import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "MakinoWorks — Creative Designer Portfolio",
  description:
    "牧野春香的個人作品集。涵蓋空間設計、平面設計、動態影像、網站設計等多元創作。",
  keywords: [
    "MakinoWorks",
    "Creative Designer",
    "Portfolio",
    "Makino Haruka",
    "牧野春香",
  ],
  authors: [{ name: "Makino Haruka" }],
  openGraph: {
    title: "MakinoWorks",
    description: "Creative Designer Portfolio — 間",
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
      <body
        className={`${cormorant.variable} ${outfit.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}