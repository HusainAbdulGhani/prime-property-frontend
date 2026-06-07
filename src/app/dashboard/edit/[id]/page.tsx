"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SuperadminGuard } from "@/components/auth/SuperadminGuard";
import { PropertyForm } from "@/components/properties/PropertyForm";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/context/ToastContext";
import { fetchPropertyById, updateProperty } from "@/lib/api/properties";
import type { Property, PropertyPayload } from "@/types/property";

export default function EditPropertyPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { showToast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const result = await fetchPropertyById(Number(params.id));
      setProperty(result);
      setIsLoading(false);
    }
    void load();
  }, [params.id]);

  const handleUpdate = async (data: PropertyPayload) => {
    await updateProperty(Number(params.id), data);
    showToast("Properti berhasil diperbarui.");
    router.push(`/dashboard/detail/${params.id}`);
  };

  return (
    <SuperadminGuard>
      <div className="animate-slide-up space-y-6">
        <div className="border-b border-primaryBlack/8 pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accentGold">
            Super Admin
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-primaryBlack lg:text-3.5xl">
            Edit Properti
          </h1>
          <p className="mt-1 text-sm text-primaryBlack/60">
            Perbarui informasi listing properti
          </p>
        </div>

        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        )}
        {!isLoading && property && (
          <PropertyForm
            initialData={property}
            onSubmit={handleUpdate}
            submitLabel="Simpan Perubahan"
          />
        )}
        {!isLoading && !property && (
          <p className="text-accentRed font-semibold">Properti tidak ditemukan.</p>
        )}
      </div>
    </SuperadminGuard>
  );
}
