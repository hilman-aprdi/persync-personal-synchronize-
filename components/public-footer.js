import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="relative px-6 pb-8 pt-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1360px]">
        <div className="divider-line mb-8" />
        <div className="flex flex-col gap-6 text-sm text-white/40 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-white/60">
              <span
                className="h-2.5 w-2.5 rounded-full bg-linear-to-br from-cyan-300/70 via-blue-300/40 to-violet-200/40 shadow-[0_0_12px_rgba(96,183,255,0.16)]"
                aria-hidden="true"
              />
              Persync, AI Business Advisor
            </Link>
            <p className="mt-2 text-xs text-white/30">Arah bisnis yang lebih realistis.</p>
          </div>
          <nav aria-label="Tautan informasi" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/about" className="transition hover:text-white/75">Tentang Persync</Link>
            <Link href="/terms" className="transition hover:text-white/75">Ketentuan penggunaan</Link>
            <Link href="/privacy" className="transition hover:text-white/75">Kebijakan privasi</Link>
          </nav>
        </div>
        <p className="mt-5 text-xs text-white/25">Kontak: <a href="mailto:hilmanokk09@gmail.com" className="transition hover:text-white/60">hilmanokk09@gmail.com</a> · <a href="https://instagram.com/mnaprd_" target="_blank" rel="noreferrer" className="transition hover:text-white/60">@mnaprd_</a></p>
        <p className="mt-7 text-xs text-white/25">© 2026</p>
      </div>
    </footer>
  );
}
