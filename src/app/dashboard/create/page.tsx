"use client";

import { useRouter } from "next/navigation";
import { SuperadminGuard } from "@/components/auth/SuperadminGuard";
import { PropertyForm } from "@/components/properties/PropertyForm";
import { useToast } from "@/context/ToastContext";
import { createProperty } from "@/lib/api/properties";
import type { PropertyPayload } from "@/types/property";

export default function CreatePropertyPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const handleCreate = async (data: PropertyPayload) => {
    await createProperty(data);
    showToast("Properti berhasil dibuat.");
    router.push("/dashboard");
  };

  const handleSaveAndAdd = async (data: PropertyPayload) => {
    await createProperty(data);
    showToast("Properti berhasil dibuat. Silakan tambah properti berikutnya.");
  };

  return (
    <SuperadminGuard>
      <div className="animate-slide-up space-y-6">
        <div className="border-b border-primaryBlack/8 pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accentGold">
            Super Admin
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-primaryBlack lg:text-3.5xl">
            Tambah Properti Baru
          </h1>
          <p className="mt-1 text-sm text-primaryBlack/60">
            Isi formulir di bawah untuk menambahkan listing baru
          </p>
        </div>
        
        <PropertyForm
          onSubmit={handleCreate}
          onSaveAndAdd={handleSaveAndAdd}
          submitLabel="Simpan"
        />
      </div>
    </SuperadminGuard>
  );
}
