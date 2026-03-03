import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "KeywordTool Pro - Free Keyword Research Tool",
  description: "Find thousands of keyword suggestions for Google, YouTube, Bing, Amazon and more. Get search volume, competition data, and discover long-tail keywords.",
  keywords: "keyword research, SEO tools, keyword planner, search volume, keyword suggestions",
  authors: [{ name: "KeywordTool Pro" }],
  openGraph: {
    title: "KeywordTool Pro - Free Keyword Research Tool",
    description: "Find thousands of keyword suggestions for Google, YouTube, Bing, Amazon and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-gray-50 min-h-screen">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
