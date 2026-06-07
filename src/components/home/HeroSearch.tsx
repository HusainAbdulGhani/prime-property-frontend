"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Tipe } from "@/types/property";

type TypeFilter = "Semua" | Tipe;

const typeOptions: TypeFilter[] = ["Semua", "Ruko", "Villa"];

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("Semua");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (query.trim()) {
      params.set("search", query.trim());
    }

    if (typeFilter !== "Semua") {
      params.set("tipe", typeFilter);
    }

    const qs = params.toString();
    router.push(qs ? `/dashboard?${qs}` : "/dashboard");
  };

  return (
    <div className="mx-auto w-full max-w-4xl relative">
      <span className="absolute -bottom-10 -right-2 text-white/20 text-xl pointer-events-none select-none">
        ✦
      </span>

      <form
        onSubmit={handleSearch}
        className="rounded-2xl border border-white/10 bg-[#0F0F0E]/85 p-3.5 shadow-2xl backdrop-blur-md transition-all duration-300 focus-within:border-accentGold/60 focus-within:ring-2 focus-within:ring-accentGold/20"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
              Tipe
            </span>
            <div className="flex gap-1 rounded-xl bg-black/45 p-1 border border-white/5">
              {typeOptions.map((item) => {
                const active = item === typeFilter;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTypeFilter(item)}
                    className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                      active
                        ? "bg-white text-black shadow-sm"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nama, properti, kawasan, atau grup..."
              className="h-11 w-full rounded-xl border border-white/5 bg-black/45 pl-11 pr-4 text-xs font-semibold text-white placeholder:text-white/35 outline-none transition-all focus:border-accentGold/50"
            />
          </div>
          <div className="flex items-center gap-4 justify-between md:justify-end">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-1 text-xs font-bold text-white/70 hover:text-accentGold transition-colors"
            >
              Filter Lanjutan
              <svg className="h-3 w-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <button
              type="submit"
              className="h-11 rounded-xl bg-accentGold px-6 font-bold text-xs text-primaryBlack transition-all hover:bg-accentGold/90 active:scale-[0.98] shadow-md shadow-accentGold/10"
            >
              Cari
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}