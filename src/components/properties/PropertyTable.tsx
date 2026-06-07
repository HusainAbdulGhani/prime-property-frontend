"use client";

import { useRouter } from "next/navigation";
import { formatCurrency, formatDimensions } from "@/lib/format";
import { SiapBadge, StatusBadge } from "@/components/ui/StatusBadge";
import type { Property } from "@/types/property";

type SortableColumn = "nama_property" | "price" | "created_at" | "status";

interface PropertyTableProps {
  properties: Property[];
  sortBy: SortableColumn;
  sortDir: "asc" | "desc";
  onSort: (column: SortableColumn) => void;
}

function SortIndicator({
  column,
  sortBy,
  sortDir,
}: {
  column: SortableColumn;
  sortBy: SortableColumn;
  sortDir: "asc" | "desc";
}) {
  if (sortBy !== column) {
    return (
      <svg className="h-3 w-3 text-primaryBlack/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  return (
    <svg className="h-3 w-3 text-accentGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {sortDir === "asc" ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
      )}
    </svg>
  );
}

export function PropertyTable({
  properties,
  sortBy,
  sortDir,
  onSort,
}: PropertyTableProps) {
  const router = useRouter();

  const sortableHeader = (label: string, column: SortableColumn) => (
    <button
      type="button"
      onClick={() => onSort(column)}
      className="group inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primaryBlack/50 transition-colors hover:text-accentGold"
    >
      {label}
      <SortIndicator column={column} sortBy={sortBy} sortDir={sortDir} />
    </button>
  );

  if (!properties.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primaryBlack/12 bg-neutralWhite py-20 text-center animate-fade-in">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-softGray">
          <svg className="h-6 w-6 text-primaryBlack/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <p className="font-semibold text-primaryBlack/60">Tidak ada properti ditemukan</p>
        <p className="mt-1 text-xs text-primaryBlack/40">Coba ubah filter pencarian Anda</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-primaryBlack/8 bg-neutralWhite shadow-card animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left">
          <thead>
            <tr className="border-b border-primaryBlack/8 bg-softGray/40">
              <th className="px-5 py-4">{sortableHeader("Nama", "nama_property")}</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-primaryBlack/50">Group</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-primaryBlack/50">Ukuran</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-primaryBlack/50">Hadap</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-primaryBlack/50">Tipe</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-primaryBlack/50">Tingkat</th>
              <th className="px-5 py-4">{sortableHeader("Harga", "price")}</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-primaryBlack/50">Carport</th>
              <th className="px-4 py-4">{sortableHeader("Status", "status")}</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-primaryBlack/50">Siap</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-primaryBlack/50">Kawasan</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, idx) => (
              <tr
                key={property.id}
                onClick={() => router.push(`/dashboard/detail/${property.id}`)}
                className={`group cursor-pointer border-b border-primaryBlack/5 transition-colors duration-200 last:border-0 hover:bg-accentGold/5 ${
                  idx % 2 === 0 ? "bg-neutralWhite" : "bg-softGray/10"
                }`}
              >
                <td className="relative px-5 py-4">
                  <span className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-accentGold transition-all duration-200 group-hover:h-2/3 group-hover:w-1" />
                  <span className="text-sm font-semibold text-primaryBlack group-hover:text-accentGold transition-colors duration-200">
                    {property.nama_property}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-primaryBlack/60">{property.group ?? "—"}</td>
                <td className="px-4 py-4 text-xs tabular-nums text-primaryBlack/70">
                  {formatDimensions(property.lebar, property.panjang)}
                </td>
                <td className="px-4 py-4 text-xs text-primaryBlack/60">{property.hadap.join(", ")}</td>
                <td className="px-4 py-4">
                  <span className="rounded-md border border-primaryBlack/8 bg-softGray px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primaryBlack/70">
                    {property.tipe}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs tabular-nums text-primaryBlack/70">{property.tingkat}</td>
                <td className="px-5 py-4 text-sm font-bold tabular-nums text-primaryBlack group-hover:text-accentGold transition-colors">
                  {formatCurrency(property.price)}
                </td>
                <td className="px-4 py-4 text-xs text-primaryBlack/65">
                  {property.carport ? (
                    <span className="text-emerald-700 font-semibold">✓ Ya</span>
                  ) : (
                    <span className="text-primaryBlack/35">—</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={property.status} />
                </td>
                <td className="px-4 py-4">
                  <SiapBadge siap={property.siap} />
                </td>
                <td className="max-w-[140px] truncate px-4 py-4 text-xs text-primaryBlack/55">
                  {property.kawasan.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
