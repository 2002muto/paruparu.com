import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import PageWrapper from "@/components/common/PageWrapper";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "パルムちゃんブログ",
  description: "パルムちゃんの写真とひとことを毎日更新するブログサイト",
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
        </Providers>
      </body>
    </html>
  );
}
