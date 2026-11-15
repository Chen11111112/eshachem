import type { Metadata, Viewport } from "next";
import { content } from "@/lib/content";
import { fontClasses } from "@/lib/fonts";
import "../globals.css";

const t = content.zh;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: "/",
    languages: { "zh-Hant-TW": "/", en: "/en" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1218",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={t.htmlLang} className={fontClasses}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
