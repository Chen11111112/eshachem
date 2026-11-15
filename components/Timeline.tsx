"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { history } from "@/lib/data";

export default function Timeline() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 60%", scrub: 0.6 },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-item]").forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 78%", toggleActions: "play none none reverse" },
        });
        tl.fromTo(item.querySelector("[data-dot]"), { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(3)" })
          .fromTo(
            item.querySelector("[data-year]"),
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
            0,
          )
          .fromTo(
            item.querySelector("[data-body]"),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            0.1,
          );
      });
      gsap.to("[data-ghost]", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <div
        data-ghost
        className="pointer-events-none absolute -right-6 top-10 select-none font-serif text-[30vw] font-black leading-none text-ink/[0.045] md:text-[18rem]"
        aria-hidden
      >
        1978
      </div>

      <ol className="relative ml-2 md:ml-0">
        <div className="absolute bottom-3 left-[5px] top-3 w-px bg-ink/15 md:left-[11.5rem]" aria-hidden />
        <div
          data-line
          className="absolute bottom-3 left-[5px] top-3 w-px origin-top bg-brass-deep md:left-[11.5rem]"
          aria-hidden
        />
        {history.map((h) => (
          <li
            key={h.year}
            data-item
            className="relative grid gap-2 pb-14 pl-10 last:pb-0 md:grid-cols-[11.5rem_1fr] md:gap-0 md:pb-20 md:pl-0"
          >
            <span
              data-dot
              className="absolute left-0 top-3 h-[11px] w-[11px] rounded-full border-2 border-brass-deep bg-paper md:left-[calc(11.5rem-5px)] md:top-5"
              aria-hidden
            />
            <div data-year className="font-serif text-4xl font-black tabular-nums text-ink md:text-6xl">
              {h.year}
            </div>
            <div data-body className="md:pl-14">
              <h3 className="font-serif text-xl font-bold tracking-[0.15em] text-ink md:text-2xl">{h.title}</h3>
              <p className="mt-2 max-w-xl text-[15px] leading-8 text-ink/70">{h.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
