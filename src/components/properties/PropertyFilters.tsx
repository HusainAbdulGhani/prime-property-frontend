"use client";

import { useState } from "react";
import { useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { HADAP_OPTIONS, SIAP_OPTIONS } from "@/types/property";
import { formatCurrency, formatSiapLabel } from "@/lib/format";

export interface FilterState {
  search: string;
  kawasan: string[];
  lebar_min: string;
  hadap: string[];
  price_max: string;
  tipe: "" | "Ruko" | "Villa";
  status: "" | "in stock" | "sold_out";
  siap: string[];
  carport: "" | "true" | "false";
}

interface PropertyFiltersProps {
  filters: FilterState;
  kawasanOptions: string[];
  onChange: (updates: Partial<FilterState>) => void;
  onReset: () => void;
}

function PillToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value || "all"}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
            value === opt.value
              ? "bg-primaryBlack text-neutralWhite shadow-sm"
              : "bg-softGray text-primaryBlack/65 hover:bg-primaryBlack/8"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ChipMultiSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(
      selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt],
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-primaryBlack/40">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              selected.includes(opt)
                ? "border-accentGold bg-accentGold/10 text-primaryBlack"
                : "border-primaryBlack/10 text-primaryBlack/55 hover:border-primaryBlack/25"
            }`}
          >
            {label === "Siap" ? formatSiapLabel(opt) : opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PropertyFilters({
  filters,
  kawasanOptions,
  onChange,
  onReset,
}: PropertyFiltersProps) {
  const [expanded, setExpanded] = useState(false);

  const activeChips = useMemo(() => {
    const chips: Array<{ key: string; label: string }> = [];
    if (filters.search) chips.push({ key: "search", label: `"${filters.search}"` });
    filters.kawasan.forEach((k) => chips.push({ key: `kawasan-${k}`, label: k }));
    if (filters.lebar_min) chips.push({ key: "lebar_min", label: `≥ ${filters.lebar_min}m` });
    filters.hadap.forEach((h) => chips.push({ key: `hadap-${h}`, label: h }));
    if (filters.price_max)
      chips.push({ key: "price_max", label: `≤ ${formatCurrency(Number(filters.price_max))}` });
    if (filters.tipe) chips.push({ key: "tipe", label: filters.tipe });
    if (filters.status)
      chips.push({
        key: "status",
        label: filters.status === "in stock" ? "In Stock" : "Sold Out",
      });
    filters.siap.forEach((s) =>
      chips.push({ key: `siap-${s}`, label: formatSiapLabel(s) }),
    );
    if (filters.carport)
      chips.push({
        key: "carport",
        label: filters.carport === "true" ? "Carport" : "No Carport",
      });
    return chips;
  }, [filters]);

  const removeChip = (key: string) => {
    if (key === "search") onChange({ search: "" });
    else if (key === "lebar_min") onChange({ lebar_min: "" });
    else if (key === "price_max") onChange({ price_max: "" });
    else if (key === "tipe") onChange({ tipe: "" });
    else if (key === "status") onChange({ status: "" });
    else if (key === "carport") onChange({ carport: "" });
    else if (key.startsWith("kawasan-"))
      onChange({ kawasan: filters.kawasan.filter((k) => `kawasan-${k}` !== key) });
    else if (key.startsWith("hadap-"))
      onChange({ hadap: filters.hadap.filter((h) => `hadap-${h}` !== key) });
    else if (key.startsWith("siap-"))
      onChange({ siap: filters.siap.filter((s) => `siap-${s}` !== key) });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-primaryBlack/8 bg-neutralWhite shadow-card">
      <div className="flex flex-col gap-3 border-b border-primaryBlack/6 p-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Cari Properti"
            placeholder="Nama, group, kawasan..."
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded((v) => !v)}
            className="whitespace-nowrap h-[46px]"
          >
            {expanded ? "Sembunyikan" : "Filter Lanjutan"}
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6 px-5 py-4 bg-softGray/25">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primaryBlack/40">
            Tipe Properti
          </span>
          <PillToggle
            options={[
              { value: "" as const, label: "Semua" },
              { value: "Ruko" as const, label: "Ruko" },
              { value: "Villa" as const, label: "Villa" },
            ]}
            value={filters.tipe}
            onChange={(tipe) => onChange({ tipe })}
          />
        </div>
        <div className="hidden h-10 w-px bg-primaryBlack/6 sm:block" />
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primaryBlack/40">
            Status
          </span>
          <PillToggle
            options={[
              { value: "" as const, label: "Semua" },
              { value: "in stock" as const, label: "In Stock" },
              { value: "sold_out" as const, label: "Sold Out" },
            ]}
            value={filters.status}
            onChange={(status) => onChange({ status })}
          />
        </div>
      </div>

      {expanded && (
        <div className="animate-fade-in border-t border-primaryBlack/6 bg-softGray/15 p-5">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              label="Lebar Min (m)"
              type="number"
              min="0"
              step="0.01"
              value={filters.lebar_min}
              onChange={(e) => onChange({ lebar_min: e.target.value })}
            />
            <Input
              label="Harga Max (Rp)"
              type="number"
              min="0"
              value={filters.price_max}
              onChange={(e) => onChange({ price_max: e.target.value })}
            />
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primaryBlack/40">
                Carport
              </span>
              <PillToggle
                options={[
                  { value: "" as const, label: "Semua" },
                  { value: "true" as const, label: "Ya" },
                  { value: "false" as const, label: "Tidak" },
                ]}
                value={filters.carport}
                onChange={(carport) => onChange({ carport })}
              />
            </div>
            {kawasanOptions.length > 0 && (
              <ChipMultiSelect
                label="Kawasan"
                options={kawasanOptions}
                selected={filters.kawasan}
                onChange={(kawasan) => onChange({ kawasan })}
              />
            )}
            <ChipMultiSelect
              label="Hadap"
              options={[...HADAP_OPTIONS]}
              selected={filters.hadap}
              onChange={(hadap) => onChange({ hadap })}
            />
            <ChipMultiSelect
              label="Siap"
              options={[...SIAP_OPTIONS]}
              selected={filters.siap}
              onChange={(siap) => onChange({ siap })}
            />
          </div>
        </div>
      )}

      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-primaryBlack/6 px-5 py-4 bg-softGray/10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primaryBlack/35">
            Aktif:
          </span>
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => removeChip(chip.key)}
              className="inline-flex items-center gap-1.5 rounded-full border border-primaryBlack/10 bg-softGray px-3.5 py-1 text-xs font-semibold text-primaryBlack/70 transition-all duration-200 hover:border-accentRed/30 hover:bg-accentRed/5 hover:text-accentRed"
            >
              {chip.label}
              <span aria-hidden className="text-primaryBlack/30">×</span>
            </button>
          ))}
          <button
            type="button"
            onClick={onReset}
            className="ml-2 text-xs font-bold text-accentRed hover:underline transition-all"
          >
            Reset Semua
          </button>
        </div>
      )}
    </div>
  );
}
