import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PublicHeader() {
  return (
    <header className="relative z-10 px-6 pt-5 sm:px-8 lg:px-10">
      <nav className="nav-glass mx-auto max-w-[1400px]" aria-label="Navigasi utama">
        <div className="flex items-center justify-between px-6 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full bg-linear-to-br from-cyan-300/80 via-blue-300/50 to-violet-200/40 shadow-[0_0_16px_rgba(96,183,255,0.2)]"
              aria-hidden="true"
            />
            <span className="text-lg font-semibold tracking-tight text-white/90" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Persync
            </span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-7">
            <Link href="/about" className="hidden text-sm text-white/48 transition hover:text-white/80 sm:inline">
              Tentang
            </Link>
            <Link href="/new" className="btn-primary px-4 py-2.5 text-xs font-semibold sm:px-5">
              Mulai analisis
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
