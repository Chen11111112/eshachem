"use client";

import { useEffect, useState } from "react";
import { content, type Locale } from "@/lib/content";
import Seal from "./Seal";

export default function Nav({ locale }: { locale: Locale }) {
  const { company, nav, ui, langSwitch } = content[locale];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open
          ? "border-b border-paper/10 bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[104rem] items-center justify-between px-4 md:h-20 md:px-8">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Seal className="h-9 w-9 shrink-0" />
          <span className="leading-tight">
            <span className="block font-serif text-lg font-bold tracking-[0.2em] text-paper">
              {company.short}
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
              {company.sub}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label={ui.menu}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="ulink pb-1 text-sm tracking-[0.15em] text-paper/80 hover:text-paper">
              {n.label}
            </a>
          ))}
          <a
            href={langSwitch.href}
            hrefLang={langSwitch.lang}
            lang={langSwitch.lang}
            className="ulink pb-1 font-mono text-xs tracking-[0.2em] text-brass-soft"
          >
            {langSwitch.label}
          </a>
          <a
            href={company.telHref}
            className="rounded-full border border-brass/60 px-5 py-2 font-mono text-xs tracking-wider text-brass-soft transition-colors hover:bg-brass hover:text-ink"
          >
            {company.tel}
          </a>
        </nav>

        <button
          type="button"
          className="relative h-10 w-10 lg:hidden"
          aria-label={open ? ui.closeMenu : ui.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute left-2 right-2 h-px bg-paper transition-transform duration-300 ${
              open ? "top-5 rotate-45" : "top-4"
            }`}
          />
          <span
            className={`absolute left-2 right-2 h-px bg-paper transition-transform duration-300 ${
              open ? "top-5 -rotate-45" : "top-6"
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden bg-ink/95 transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 pb-8 pt-2" aria-label={ui.menu}>
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-paper/10 py-4 font-serif text-xl tracking-[0.2em] text-paper"
            >
              {n.label}
            </a>
          ))}
          <div className="mt-6 flex items-center justify-between">
            <a href={company.telHref} className="font-mono text-sm tracking-wider text-brass-soft">
              {company.tel}
            </a>
            <a
              href={langSwitch.href}
              hrefLang={langSwitch.lang}
              lang={langSwitch.lang}
              className="rounded-full border border-paper/30 px-4 py-1.5 font-mono text-xs tracking-[0.2em] text-paper"
            >
              {langSwitch.label}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
