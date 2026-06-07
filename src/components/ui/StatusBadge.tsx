import { formatStatusLabel, formatSiapLabel } from "@/lib/format";

interface StatusBadgeProps {
  status: string;
}

interface SiapBadgeProps {
  siap: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = formatStatusLabel(status);

  if (status === "sold_out") {
    return (
      <span className="inline-flex items-center rounded-lg bg-accentRed/10 border border-accentRed/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accentRed">
        {label}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
      {label}
    </span>
  );
}

export function SiapBadge({ siap }: SiapBadgeProps) {
  const label = formatSiapLabel(siap);

  if (siap === "siap_huni" || siap === "siap_huni_renovasi") {
    return (
      <span className="inline-flex items-center rounded-lg border border-accentGold/20 bg-accentGold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#917535]">
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-700">
      {label}
    </span>
  );
}
