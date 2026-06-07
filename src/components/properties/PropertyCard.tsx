import type { ReactNode } from "react";
import { formatCurrency } from "@/lib/format";
import type { Property } from "@/types/property";
import { SiapBadge, StatusBadge } from "@/components/ui/StatusBadge";

interface PropertyCardProps {
  property: Property;
}

function SpecItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-primaryBlack/65 font-medium">
      <span className="text-primaryBlack/35">{icon}</span>
      {label}
    </span>
  );
}

const VillaBlueprint = () => (
  <svg
    className="absolute -right-2 -bottom-2 h-28 w-28 text-accentGold/12 pointer-events-none transform transition-all duration-500 group-hover:scale-115 group-hover:rotate-3 group-hover:text-accentGold/20"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.75"
  >
    <line x1="10" y1="10" x2="10" y2="90" strokeDasharray="2 2" />
    <line x1="30" y1="10" x2="30" y2="90" strokeDasharray="2 2" />
    <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="2 2" />
    <line x1="70" y1="10" x2="70" y2="90" strokeDasharray="2 2" />
    <line x1="90" y1="10" x2="90" y2="90" strokeDasharray="2 2" />
    <line x1="10" y1="10" x2="90" y2="10" strokeDasharray="2 2" />
    <line x1="10" y1="30" x2="90" y2="30" strokeDasharray="2 2" />
    <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="2 2" />
    <line x1="10" y1="70" x2="90" y2="70" strokeDasharray="2 2" />
    <line x1="10" y1="90" x2="90" y2="90" strokeDasharray="2 2" />
    <path d="M15,75 L85,75 L85,45 L70,45 L70,35 L30,35 L30,45 L15,45 Z" />
    <path d="M30,35 L50,20 L70,35" />
    <rect x="45" y="60" width="10" height="15" />
    <rect x="25" y="50" width="8" height="8" />
    <rect x="67" y="50" width="8" height="8" />
    <path d="M10,80 L90,80" strokeWidth="1.2" />
  </svg>
);

const RukoBlueprint = () => (
  <svg
    className="absolute -right-2 -bottom-2 h-28 w-28 text-primaryBlack/5 pointer-events-none transform transition-all duration-500 group-hover:scale-115 group-hover:-rotate-3 group-hover:text-accentGold/15"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.75"
  >
    <line x1="10" y1="10" x2="10" y2="90" strokeDasharray="2 2" />
    <line x1="30" y1="10" x2="30" y2="90" strokeDasharray="2 2" />
    <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="2 2" />
    <line x1="70" y1="10" x2="70" y2="90" strokeDasharray="2 2" />
    <line x1="90" y1="10" x2="90" y2="90" strokeDasharray="2 2" />
    <line x1="10" y1="10" x2="90" y2="10" strokeDasharray="2 2" />
    <line x1="10" y1="30" x2="90" y2="30" strokeDasharray="2 2" />
    <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="2 2" />
    <line x1="10" y1="70" x2="90" y2="70" strokeDasharray="2 2" />
    <line x1="10" y1="90" x2="90" y2="90" strokeDasharray="2 2" />
    <rect x="30" y="15" width="40" height="70" />
    <line x1="30" y1="38" x2="70" y2="38" />
    <line x1="30" y1="61" x2="70" y2="61" />
    <rect x="36" y="66" width="28" height="19" strokeDasharray="1 1" />
    <rect x="36" y="44" width="10" height="11" />
    <rect x="54" y="44" width="10" height="11" />
    <rect x="36" y="21" width="10" height="11" />
    <rect x="54" y="21" width="10" height="11" />
  </svg>
);

export function PropertyCard({ property }: PropertyCardProps) {
  const typeLabel = property.tipe.toUpperCase();
  const isVilla = property.tipe === "Villa";
  const typeBg = isVilla
    ? "bg-gradient-to-br from-accentGold/10 via-softGray/30 to-neutralWhite border-b border-primaryBlack/5"
    : "bg-gradient-to-br from-softGray/40 to-neutralWhite border-b border-primaryBlack/5";

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-primaryBlack/8 bg-neutralWhite shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-accentGold/40 hover:-translate-y-1 animate-fade-in">
      <div className={`relative flex min-h-[156px] flex-col justify-between p-5 overflow-hidden ${typeBg}`}>
        {isVilla ? <VillaBlueprint /> : <RukoBlueprint />}

        <div className="relative z-10 flex items-start justify-between gap-3">
          <span className="inline-flex rounded-xl border border-primaryBlack/8 bg-neutralWhite/95 px-3.5 py-1.5 text-xs font-bold tracking-[0.15em] text-primaryBlack shadow-sm">
            {typeLabel}
          </span>
          <StatusBadge status={property.status} />
        </div>

        <p className="relative z-10 mt-4 text-2xl font-extrabold leading-none tracking-tight text-primaryBlack">
          {formatCurrency(property.price)}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-primaryBlack transition-colors duration-200 group-hover:text-accentGold">
          {property.nama_property}
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5">
          <SpecItem
            icon={
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            }
            label={`${property.lebar} x ${property.panjang} m`}
          />
          <SpecItem
            icon={
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            label={`${property.tingkat} Lantai`}
          />
          <SpecItem
            icon={
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            }
            label={property.carport ? "Ada Carport" : "Tanpa Carport"}
          />
          <SpecItem
            icon={
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            }
            label={property.hadap.join(", ")}
          />
        </div>

        <div className="mt-auto border-t border-primaryBlack/6 pt-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {property.group && (
              <span className="rounded-full bg-primaryBlack px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutralWhite">
                {property.group}
              </span>
            )}
            {property.kawasan.map((area) => (
              <span
                key={area}
                className="rounded-full border border-primaryBlack/10 px-2.5 py-0.5 text-[9px] font-semibold text-primaryBlack/55"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
