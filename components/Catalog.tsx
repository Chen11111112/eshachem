"use client";

import { useMemo, useState } from "react";
import raw from "@/lib/catalog.json";

type Item = { code: string; en: string; zh: string; group: string };

const CJK = /[一-鿿]/;

const items: Item[] = (raw as { code: string; en: string; zh: string }[]).map((r) => {
  // rows that only carry a Chinese trade name are the company's own formulated products
  if (!r.code && !r.zh && CJK.test(r.en)) return { code: "", en: "", zh: r.en, group: "其他" };
  if (!r.code) return { ...r, group: (r.en[0] ?? "#").toUpperCase() };
  return { ...r, group: r.code[0] };
});

const groups = Array.from(new Set(items.map((i) => i.group)));
const PAGE = 24;

export default function Catalog() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string | null>(null);
  const [all, setAll] = useState(false);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter((i) => {
      if (s) return `${i.code} ${i.en} ${i.zh}`.toLowerCase().includes(s);
      return group ? i.group === group : true;
    });
  }, [q, group]);

  const shown = all || q ? filtered : filtered.slice(0, PAGE);

  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <label className="relative block w-full md:max-w-sm">
          <span className="sr-only">搜尋產品</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜尋中文、英文品名或編號…"
            className="w-full border-b-2 border-ink/25 bg-transparent py-3 pr-10 text-base text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-brass-deep"
          />
          <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-ink/40" aria-hidden>
            ⌕
          </span>
        </label>
        <p className="font-mono text-xs tracking-[0.2em] text-ink/50" aria-live="polite">
          {filtered.length} / {items.length} 品項
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {[null, ...groups].map((g) => {
          const on = !q && group === g;
          return (
            <button
              key={g ?? "all"}
              type="button"
              onClick={() => {
                setGroup(g);
                setQ("");
                setAll(g !== null);
              }}
              className={`h-9 min-w-9 rounded-sm px-2.5 font-mono text-xs transition-colors ${
                on ? "bg-ink text-paper" : "bg-ink/[0.06] text-ink/70 hover:bg-ink/15"
              }`}
            >
              {g ?? "全部"}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-x-10 border-t border-ink/15 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((i, n) => (
          <li
            key={`${i.code}-${i.en}-${n}`}
            className="group flex items-baseline gap-4 border-b border-ink/10 py-3.5 transition-colors hover:bg-ink/[0.04]"
          >
            <span className="w-11 shrink-0 font-mono text-[11px] text-brass-deep">{i.code || "—"}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-[15px] font-bold tracking-wide text-ink">
                {i.zh || i.en}
              </span>
              {i.zh && i.en && <span className="block truncate text-xs text-ink/55">{i.en}</span>}
            </span>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="py-14 text-center text-sm leading-7 text-ink/60">
          目錄中找不到「{q}」。我們也提供特殊化學原料代尋與代辦進口，歡迎直接來電洽詢。
        </p>
      )}

      {!all && !q && filtered.length > PAGE && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setAll(true)}
            className="rounded-full border border-ink/40 px-8 py-3 text-sm tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            展開全部 {filtered.length} 項
          </button>
        </div>
      )}
    </div>
  );
}
