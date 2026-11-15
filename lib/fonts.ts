import { Geist_Mono, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";

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

export const fontClasses = `${serif.variable} ${sans.variable} ${mono.variable} antialiased`;
