"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { content, type Locale } from "@/lib/content";
import Reveal from "./Reveal";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

export default function Partners({ locale }: { locale: Locale }) {
  const { regions, partners: t } = content[locale];
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % regions.length);
    }, 4200);
    return () => clearInterval(id);
  }, [regions.length]);

  const region = regions[active];

  return (
    <section id="partners" className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-brass">03 — Partners</p>
          <h2 className="mt-5 font-serif text-4xl font-bold leading-tight tracking-[0.08em] text-paper md:text-6xl">
            {t.title[0]}
            <span className="text-brass-soft">{locale === "en" ? " " : ""}{t.title[1]}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-paper/70">
            {t.lead}
          </p>
        </Reveal>

        <div
          className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
          onPointerEnter={() => (paused.current = true)}
          onPointerLeave={() => (paused.current = false)}
        >
          <div className="order-2 lg:order-1">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.tablist}>
              {regions.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  className={`rounded-full border px-4 py-2 text-sm tracking-[0.15em] transition-colors duration-300 ${
                    i === active
                      ? "border-brass bg-brass text-ink"
                      : "border-paper/20 text-paper/70 hover:border-brass/60 hover:text-paper"
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>

            <div key={region.id} className="fade-up mt-8 min-h-[22rem] border-t border-paper/15 pt-8" role="tabpanel">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-3xl font-bold tracking-[0.15em] text-paper">{region.name}</h3>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-mute">
                  {region.en} → Taipei
                </span>
              </div>
              <dl className="mt-6 space-y-4">
                {region.makers.map((m, i) => (
                  <div key={i} className="grid grid-cols-[6.5rem_1fr] gap-4 text-sm leading-7">
                    <dt className="font-serif font-bold tracking-wider text-brass-soft">{m.maker ?? t.itemsLabel}</dt>
                    <dd className="text-paper/75">{m.items}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="relative order-1 mx-auto aspect-square w-full max-w-[36rem] lg:order-2">
            <Globe active={active} />
            <div className="pointer-events-none absolute inset-x-0 bottom-2 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-mute">
              <span className="h-1.5 w-1.5 rounded-full bg-seal" />
              Taipei
              <span className="ml-4 h-1.5 w-1.5 rounded-full bg-brass-soft" />
              {region.en}
            </div>
          </div>
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-col items-start justify-between gap-6 border border-brass/30 bg-ink-2 p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h3 className="font-serif text-2xl font-bold tracking-[0.12em] text-paper">{t.cta.title}</h3>
              <p className="mt-3 text-sm leading-7 text-paper/70">
                {t.cta.body}
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-brass px-7 py-3 text-sm font-medium tracking-[0.2em] text-ink transition-colors hover:bg-brass-soft"
            >
              {t.cta.button}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
