import { PropertyCard } from "@/components/properties/PropertyCard";
import type { Property } from "@/types/property";

interface FeaturedPropertiesGridProps {
  properties: Property[];
}

export function FeaturedPropertiesGrid({ properties }: FeaturedPropertiesGridProps) {
  if (!properties.length) {
    return (
      <div className="rounded-2xl border border-dashed border-primaryBlack/12 bg-softGray/30 py-16 text-center animate-fade-in">
        <p className="text-sm font-semibold text-primaryBlack/60">
          Belum ada properti unggulan saat ini.
        </p>
        <p className="mt-1.5 text-xs text-primaryBlack/40">
          Silakan kembali lagi nanti atau hubungi tim kami.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
