import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import PageWrapper from "@/components/common/PageWrapper";
import { Providers } from "./providers";
import JsonLd from "@/components/JsonLd";
import PerformanceMonitor from "@/components/PerformanceMonitor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "パルムちゃんブログ",
    template: "%s | パルムちゃんブログ",
  },
  description:
    "パルムちゃんの写真とひとことを毎日更新するブログサイト。愛犬パルムの日常をお届けします。",
  keywords: ["パルム", "犬", "ブログ", "ペット", "日常", "写真"],
  authors: [{ name: "パルムちゃん" }],
  creator: "パルムちゃん",
  publisher: "パルムちゃんブログ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://paruparu.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://paruparu.com",
    title: "パルムちゃんブログ",
    description:
      "パルムちゃんの写真とひとことを毎日更新するブログサイト。愛犬パルムの日常をお届けします。",
    siteName: "パルムちゃんブログ",
    images: [
      {
        url: "https://paruparu.com/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "パルムちゃんブログ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "パルムちゃんブログ",
    description:
      "パルムちゃんの写真とひとことを毎日更新するブログサイト。愛犬パルムの日常をお届けします。",
    images: ["https://paruparu.com/og/default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <PageWrapper>
            <div className="min-h-screen bg-white">
              <Header />
              <main className="pt-16">{children}</main>
            </div>
          </PageWrapper>
          <JsonLd
            type="website"
            title="パルムちゃんブログ"
            description="パルムちゃんの写真とひとことを毎日更新するブログサイト。愛犬パルムの日常をお届けします。"
            url="https://paruparu.com"
          />
          <PerformanceMonitor />
        </Providers>
      </body>
    </html>
  );
}
