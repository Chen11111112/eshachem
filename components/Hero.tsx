"use client";

import dynamic from "next/dynamic";
import type { CSSProperties } from "react";
import { content, type Locale } from "@/lib/content";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero({ locale }: { locale: Locale }) {
  const { company, hero } = content[locale];
  const gap = locale === "en" ? "mr-[0.22em]" : "";
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 72% 45%, rgba(201,163,90,0.13), transparent 70%), radial-gradient(50% 50% at 10% 100%, rgba(26,42,53,0.9), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 opacity-60 lg:opacity-100">
        <HeroScene />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-32 md:px-10">
        <p className="fade-up font-mono text-xs uppercase tracking-[0.4em] text-brass" style={d(200)}>
          {hero.eyebrow}
        </p>

        <h1 className="mt-6 font-serif font-black leading-[1.05] tracking-[0.06em] text-paper">
          <span className={`rise-mask ${gap}`}>
            <span className={`rise ${hero.titleSize}`} style={d(350)}>
              {hero.title[0]}
            </span>
          </span>
          <span className="rise-mask">
            <span className={`rise text-brass-soft ${hero.titleSize}`} style={d(480)}>
              {hero.title[1]}
            </span>
          </span>
        </h1>

        <p className="fade-up mt-8 font-serif text-xl tracking-[0.25em] text-paper/90 md:text-2xl" style={d(900)}>
          {company.motto}
        </p>
        <p className="fade-up mt-5 max-w-xl text-[15px] leading-8 text-paper/65" style={d(1050)}>
          {hero.lead}
        </p>

        <div className="fade-up mt-10 flex flex-wrap items-center gap-4" style={d(1200)}>
          <a
            href="#catalog"
            className="group inline-flex items-center gap-3 rounded-full bg-brass px-8 py-3.5 text-sm font-medium tracking-[0.25em] text-ink transition-colors hover:bg-brass-soft"
          >
            {hero.primary}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-paper/30 px-8 py-3.5 text-sm tracking-[0.25em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            {hero.secondary}
          </a>
        </div>
      </div>

      <div
        className="fade-up absolute right-6 top-1/2 hidden -translate-y-1/2 font-serif text-sm tracking-[0.6em] text-paper/40 [writing-mode:vertical-rl] xl:block"
        style={d(1500)}
        aria-hidden
      >
        誠信・平實・謙和
      </div>

      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3" aria-hidden>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper/40">Scroll</span>
        <span className="cue block h-10 w-px bg-brass" />
      </div>
    </section>
  );
}
