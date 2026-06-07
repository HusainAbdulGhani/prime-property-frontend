"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { SiapBadge, StatusBadge } from "@/components/ui/StatusBadge";
import { DeletePropertyModal } from "@/components/properties/DeletePropertyModal";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { deleteProperty, fetchPropertyById } from "@/lib/api/properties";
import { formatCurrency, formatDimensions } from "@/lib/format";
import type { Property } from "@/types/property";

interface PropertyDetailViewProps {
  id: number;
}

export function PropertyDetailView({ id }: PropertyDetailViewProps) {
  const router = useRouter();
  const { isSuperadmin } = useAuth();
  const { showToast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const result = await fetchPropertyById(id);
      setProperty(result);
      setIsLoading(false);
    }
    void load();
  }, [id]);

  const handleDelete = async () => {
    if (!property) return;
    setIsDeleting(true);
    try {
      await deleteProperty(property.id);
      showToast("Properti berhasil dihapus.");
      router.push("/dashboard");
    } catch {
      showToast("Gagal menghapus properti.", "error");
    } finally {
      setIsDeleting(false);
      setShowDelete(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-fade-in space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center py-20 text-center animate-fade-in">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accentRed/10 border border-accentRed/25">
          <svg className="h-8 w-8 text-accentRed" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="font-semibold tracking-wide text-accentRed">Properti tidak ditemukan</p>
        <Link href="/dashboard" className="mt-4">
          <Button variant="outline" size="sm">← Kembali ke Katalog</Button>
        </Link>
      </div>
    );
  }

  const isSoldOut = property.status === "sold_out";

  const specs = [
    { label: "Group", value: property.group ?? "—" },
    { label: "Ukuran", value: formatDimensions(property.lebar, property.panjang) },
    { label: "Hadap", value: property.hadap.join(", ") },
    { label: "Tipe", value: property.tipe },
    { label: "Tingkat", value: `${property.tingkat} Lantai` },
    { label: "Carport", value: property.carport ? "Ada" : "Tidak Ada" },
    { label: "Unit", value: property.unit ?? "—" },
    { label: "Kawasan", value: property.kawasan.join(", ") },
  ];

  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primaryBlack/60 transition-colors duration-200 hover:text-accentGold"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Katalog Properti
        </Link>

        {isSuperadmin && (
          <div className="flex gap-2">
            <Link href={`/dashboard/edit/${property.id}`}>
              <Button variant="outline" size="sm">Edit Properti</Button>
            </Link>
            <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>
              Hapus
            </Button>
          </div>
        )}
      </div>

      <div
        className={`relative overflow-hidden rounded-2xl p-8 shadow-sm border ${
          isSoldOut
            ? "bg-gradient-to-br from-accentRed/90 to-accentRed border-accentRed/35 text-white"
            : "bg-primaryBlack text-neutralWhite border-primaryBlack/15"
        }`}
      >
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-md border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutralWhite">
                {property.tipe}
              </span>
              <StatusBadge status={property.status} />
              <SiapBadge siap={property.siap} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
              {property.nama_property}
            </h1>
          </div>
          <div className="lg:text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutralWhite/50">
              Harga
            </p>
            <p className="text-3xl font-extrabold tabular-nums text-accentGold lg:text-4xl mt-1">
              {formatCurrency(property.price)}
            </p>
          </div>
        </div>
      </div>

      <Card padding="lg">
        <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-primaryBlack/40">
          Spesifikasi Properti
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="rounded-xl border border-primaryBlack/6 bg-softGray/30 p-4 hover:border-primaryBlack/15 transition-all duration-200"
            >
              <dt className="text-[10px] font-bold uppercase tracking-widest text-primaryBlack/40">
                {spec.label}
              </dt>
              <dd className="mt-1.5 text-sm font-semibold tracking-wide text-primaryBlack">
                {spec.value}
              </dd>
            </div>
          ))}
        </div>
      </Card>

      {property.maps_link && (
        <a
          href={property.maps_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <Button size="lg" className="gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Buka di Google Maps
          </Button>
        </a>
      )}

      <DeletePropertyModal
        isOpen={showDelete}
        propertyName={property.nama_property}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        isLoading={isDeleting}
      />
    </div>
  );
}
