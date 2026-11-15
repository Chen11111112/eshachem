import type { Metadata, Viewport } from "next";
import { Geist_Mono, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const serif = Noto_Serif_TC({
  variable: "--font-serif-tc",
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const sans = Noto_Sans_TC({
  variable: "--font-sans-tc",
  weight: ["400", "500"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "益協實業有限公司｜E Sha Chemical Co. — 自 1978 年的化學品進口行銷",
  description:
    "益協實業自 1978 年創立於台北迪化街，專營各行業化學品進口與行銷，代理德國、日本、歐美等原廠化工原料，並提供特殊化學原料代尋與代辦進口服務。",
};

export const viewport: Viewport = {
  themeColor: "#0a1218",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant-TW"
      className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
