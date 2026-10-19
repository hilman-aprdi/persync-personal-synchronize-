import { PublicFooter } from "./public-footer";
import { PublicHeader } from "./public-header";

export function LegalPage({ eyebrow, title, intro, children }) {
  return (
    <main className="site-shell min-h-screen">
      <div className="site-background" aria-hidden="true" />
      <div className="site-grid-overlay" aria-hidden="true" />
      <div className="site-noise-overlay" aria-hidden="true" />
      <PublicHeader />
      <article className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/55">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">{intro}</p>
        </header>
        <div className="legal-content mt-14 rounded-[30px] border border-white/8 bg-white/[0.03] px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
          {children}
        </div>
      </article>
      <PublicFooter />
    </main>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
