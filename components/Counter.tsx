"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up when scrolled into view. `since` counts the years from that year to now. */
export default function Counter({
  to,
  since,
  duration = 1800,
  suffix = "",
}: {
  to?: number;
  since?: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = since ? new Date().getFullYear() - since : (to ?? 0);
    const ms = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : duration;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / ms, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setValue(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, since, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
