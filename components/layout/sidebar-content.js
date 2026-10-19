"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PenSquare, Sparkles } from "lucide-react";
import { HistoryList } from "../history-list";

export function SidebarContent({
  history,
  quota,
  onClose,
  onDeleteSession,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const remaining = quota?.remaining ?? 3;
  const limit = quota?.limit ?? 3;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-white/8 px-4 pb-4 pt-6 pr-12 lg:pt-5 lg:pr-4">
        <Link href="/" onClick={onClose} className="mx-auto block w-full max-w-[168px]">
          <div className="relative aspect-[3.6/1] w-full">
            <Image
              src="/assets/persync-logo.png"
              alt="Persync"
              fill
              priority
              sizes="(max-width: 1024px) 140px, 168px"
              className="object-contain object-center"
            />
          </div>
        </Link>

        <button
          type="button"
          onClick={() => {
            onClose?.();
            router.push("/new");
          }}
          className={`mt-4 flex w-full items-center justify-between rounded-[20px] border px-4 py-3 text-left transition ${
            pathname === "/new"
              ? "border-cyan-400/18 bg-cyan-400/[0.07] text-white"
              : "border-white/8 bg-white/[0.03] text-white/78 hover:bg-white/[0.05]"
          }`}
        >
          <div>
            <p className="text-sm font-medium">New Analysis</p>
            <p className="mt-1 text-xs text-white/36">Susun arah bisnis baru.</p>
          </div>
          <PenSquare className="h-4 w-4 flex-shrink-0" strokeWidth={1.8} />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 app-sidebar-scroll">
        <HistoryList
          items={history}
          canDelete={true}
          onDeleteSession={onDeleteSession}
          onNavigate={onClose}
        />
      </div>

      <div className="border-t border-white/8 p-4">
        <div className="rounded-[20px] border border-white/8 bg-white/[0.025] px-3.5 py-3.5 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">Kuota Harian</p>
              <p className="mt-1 text-xs font-medium text-white/80">
                {remaining} dari {limit} analisis tersisa
              </p>
            </div>
            <Sparkles className="h-4 w-4 flex-shrink-0 text-cyan-300/65" strokeWidth={1.6} />
          </div>

          <div className="mt-3 overflow-hidden rounded-full bg-white/6 h-1.5 w-full">
            <div
              className="h-full rounded-full bg-linear-to-r from-blue-400 to-cyan-400 transition-all duration-300"
              style={{ width: `${(remaining / limit) * 100}%` }}
            />
          </div>

          <p className="mt-2.5 text-[11px] leading-4 text-white/38">
            Reset otomatis setiap hari.
          </p>
        </div>
      </div>
    </div>
  );
}
