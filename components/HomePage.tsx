import Catalog from "@/components/Catalog";
import Counter from "@/components/Counter";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Partners from "@/components/Partners";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import { content, FOUNDED, type Locale } from "@/lib/content";

function SectionHead({
  index,
  en,
  title,
  children,
}: {
  index: string;
  en: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-brass-deep">
        {index} — {en}
      </p>
      <h2 className="mt-5 font-serif text-4xl font-bold leading-tight tracking-[0.08em] text-ink md:text-6xl">
        {title}
      </h2>
      {children && <p className="mt-6 max-w-2xl text-base leading-8 text-ink/70">{children}</p>}
    </Reveal>
  );
}

export default function HomePage({ locale }: { locale: Locale }) {
  const t = content[locale];
  const { company, nav, values, marquee } = t;
  const en = locale === "en";
  const stats = [
    { node: <Counter since={FOUNDED} />, unit: t.stats.units[0], label: t.stats.years },
    { node: <Counter to={9} />, unit: t.stats.units[1], label: t.stats.makers },
    { node: <Counter to={8} />, unit: t.stats.units[2], label: t.stats.sources },
    { node: <Counter to={380} suffix="+" />, unit: t.stats.units[3], label: t.stats.items },
  ];

  return (
    <>
      <Nav locale={locale} />
      <main>
        <Hero locale={locale} />

        {/* marquee */}
        <div className="marquee overflow-hidden border-y border-paper/10 bg-ink py-5" aria-hidden>
          <div className="marquee-track flex w-max">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0">
                {marquee.map((m) => (
                  <span key={m} className="flex items-center font-serif text-lg tracking-[0.3em] text-paper/50">
                    <span className="px-8">{m}</span>
                    <span className="h-1.5 w-1.5 rotate-45 bg-brass/70" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* stats */}
        <section className="bg-ink py-20 md:py-28">
          <div className="mx-auto grid max-w-[104rem] grid-cols-2 gap-y-12 px-4 md:px-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 110} className="border-l border-paper/15 pl-5 md:pl-8">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-6xl font-black text-brass-soft md:text-8xl">{s.node}</span>
                  {s.unit && <span className="font-serif text-xl text-paper/70">{s.unit}</span>}
                </div>
                <p className="mt-3 text-sm tracking-[0.15em] text-paper/60">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* about */}
        <section id="about" className="paper-grain overflow-hidden bg-paper py-24 text-ink md:py-36">
          <div className="mx-auto max-w-[104rem] px-4 md:px-8">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
              <SectionHead index="01" en="About" title={<>{t.about.title[0]}<br />{t.about.title[1]}</>} />
              <Reveal delay={150} className="relative">
                <p className={`font-serif text-2xl font-bold leading-[1.9] tracking-[0.1em] text-ink md:text-3xl md:leading-[1.9] ${en ? "pr-24 md:pr-28" : ""}`}>
                  {t.about.quote[0]}
                  <br />
                  {t.about.quote[1]}
                </p>
                <p className="mt-8 text-[15px] leading-9 text-ink/75">
                  {t.about.body[0]}
                </p>
                <p className="mt-5 text-[15px] leading-9 text-ink/75">
                  {t.about.body[1]}
                </p>
                <div
                  className="stamp absolute -top-4 right-1 grid h-20 w-20 place-items-center rounded-[4px] border-[3px] border-seal font-serif text-2xl font-black leading-[1.1] text-seal md:-top-8 md:h-24 md:w-24 md:text-3xl"
                  style={{ "--d": "500ms" } as React.CSSProperties}
                  aria-hidden
                >
                  誠信
                  <br />
                  為本
                </div>
              </Reveal>
            </div>

            <div className="mt-20 grid gap-px bg-ink/15 md:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 130} className="h-full">
                  <article className="group relative h-full overflow-hidden bg-paper p-8 transition-colors duration-500 hover:bg-ink md:p-10">
                    <span
                      className="pointer-events-none absolute -bottom-10 -right-4 font-serif text-[11rem] font-black leading-none text-ink/[0.06] transition-all duration-700 group-hover:-translate-y-3 group-hover:text-brass/25"
                      aria-hidden
                    >
                      {v.char}
                    </span>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass-deep group-hover:text-brass">
                      {v.en}
                    </p>
                    <h3 className="mt-4 font-serif text-3xl font-bold tracking-[0.2em] text-ink transition-colors duration-500 group-hover:text-paper">
                      {v.title}
                    </h3>
                    <p className="relative mt-5 text-[15px] leading-8 text-ink/70 transition-colors duration-500 group-hover:text-paper/75">
                      {v.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* history */}
        <section id="history" className="overflow-hidden bg-paper-2 py-24 text-ink md:py-36">
          <div className="mx-auto max-w-[104rem] px-4 md:px-8">
            <SectionHead index="02" en="History" title={t.history.title}>
              {t.history.lead}
            </SectionHead>
            <div className="mt-16 md:mt-24">
              <Timeline locale={locale} />
            </div>
          </div>
        </section>

        <Partners locale={locale} />

        {/* catalog */}
        <section id="catalog" className="paper-grain bg-paper py-24 text-ink md:py-36">
          <div className="mx-auto max-w-[104rem] px-4 md:px-8">
            <SectionHead index="04" en="Catalog" title={t.catalog.title}>
              {t.catalog.lead}
            </SectionHead>
            <Reveal className="mt-14">
              <Catalog locale={locale} />
            </Reveal>
          </div>
        </section>

        {/* thanks */}
        <section className="relative overflow-hidden bg-ink-2 py-28 md:py-40">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-serif text-[38vw] font-black leading-none text-paper/[0.025]"
            aria-hidden
          >
            感謝
          </div>
          <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
            <Reveal>
              <span className="mx-auto block h-12 w-px bg-brass" aria-hidden />
              <p className="mt-10 font-serif text-xl font-medium leading-[2.3] tracking-[0.12em] text-paper/90 md:text-2xl md:leading-[2.4]">
                {t.thanks.lines[0]}
                <br className="hidden md:block" />{en ? " " : ""}
                {t.thanks.lines[1]}
              </p>
              <p className="mt-10 font-serif text-base tracking-[0.3em] text-brass-soft">
                {t.thanks.sign}
              </p>
            </Reveal>
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="bg-ink py-24 md:py-36">
          <div className="mx-auto max-w-[104rem] px-4 md:px-8">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-brass">05 — Contact</p>
              <h2 className="mt-5 font-serif text-4xl font-bold tracking-[0.08em] text-paper md:text-6xl">{t.contact.title}</h2>
            </Reveal>

            <Reveal delay={120} className="mt-14">
              <a
                href={company.telHref}
                className="group block border-y border-paper/15 py-10 transition-colors hover:border-brass md:py-14"
              >
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-mute">{t.contact.tel}</span>
                <span className="mt-3 flex items-center justify-between gap-6">
                  <span className="font-serif text-[11vw] font-black leading-none tracking-wide text-paper transition-colors group-hover:text-brass-soft sm:text-7xl lg:text-8xl">
                    {company.tel}
                  </span>
                  <span className="hidden text-5xl text-brass transition-transform duration-500 group-hover:translate-x-3 md:block">
                    →
                  </span>
                </span>
              </a>
            </Reveal>

            <div className="mt-12 grid gap-10 md:grid-cols-3">
              <Reveal delay={0}>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-mute">{t.contact.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ulink mt-3 inline-block pb-1 text-lg leading-8 text-paper"
                >
                  {company.address}
                </a>
              </Reveal>
              <Reveal delay={120}>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-mute">{t.contact.email}</p>
                <a href={`mailto:${company.email}`} className="ulink mt-3 inline-block pb-1 text-lg leading-8 text-paper">
                  {company.email}
                </a>
              </Reveal>
              <Reveal delay={240}>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-mute">{t.contact.fax}</p>
                <p className="mt-3 text-lg leading-8 text-paper">{company.fax}</p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-paper/10 bg-ink py-10">
        <div className="mx-auto flex max-w-[104rem] flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-serif text-lg font-bold tracking-[0.2em] text-paper">{company.name}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
              {company.sub} · Est. {FOUNDED}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label={t.ui.footerNav}>
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="ulink pb-0.5 text-sm tracking-[0.12em] text-paper/60 hover:text-paper">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
