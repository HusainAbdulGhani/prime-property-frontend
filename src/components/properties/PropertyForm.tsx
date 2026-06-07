"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  HADAP_OPTIONS,
  SIAP_OPTIONS,
  STATUS_OPTIONS,
  TIPE_OPTIONS,
  type Property,
  type PropertyPayload,
} from "@/types/property";
import { validatePropertyForm } from "@/lib/validation";

interface PropertyFormProps {
  initialData?: Property;
  onSubmit: (data: PropertyPayload) => Promise<void>;
  onSaveAndAdd?: (data: PropertyPayload) => Promise<void>;
  submitLabel?: string;
}

const emptyForm: PropertyPayload = {
  nama_property: "",
  group: "",
  lebar: 0,
  panjang: 0,
  hadap: [],
  tipe: "Ruko",
  tingkat: 1,
  price: 0,
  carport: false,
  status: "in stock",
  siap: "siap_huni",
  maps_link: "",
  kawasan: [],
  unit: "",
};

function propertyToForm(property: Property): PropertyPayload {
  return {
    nama_property: property.nama_property,
    group: property.group ?? "",
    lebar: Number(property.lebar),
    panjang: Number(property.panjang),
    hadap: property.hadap,
    tipe: property.tipe,
    tingkat: Number(property.tingkat),
    price: property.price,
    carport: property.carport,
    status: property.status,
    siap: property.siap,
    maps_link: property.maps_link ?? "",
    kawasan: property.kawasan,
    unit: property.unit ?? "",
  };
}

export function PropertyForm({
  initialData,
  onSubmit,
  onSaveAndAdd,
  submitLabel = "Simpan",
}: PropertyFormProps) {
  const [form, setForm] = useState<PropertyPayload>(
    initialData ? propertyToForm(initialData) : emptyForm,
  );
  const [kawasanInput, setKawasanInput] = useState("");
  const [errors, setErrors] = useState<ReturnType<typeof validatePropertyForm>>({});
  const [isLoading, setIsLoading] = useState(false);

  const update = <K extends keyof PropertyPayload>(
    key: K,
    value: PropertyPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleHadap = (direction: (typeof HADAP_OPTIONS)[number]) => {
    const next = form.hadap.includes(direction)
      ? form.hadap.filter((d) => d !== direction)
      : [...form.hadap, direction];
    update("hadap", next);
  };

  const addKawasan = () => {
    const value = kawasanInput.trim();
    if (!value || form.kawasan.includes(value)) return;
    update("kawasan", [...form.kawasan, value]);
    setKawasanInput("");
  };

  const handleSubmit = async (saveAndAdd = false) => {
    const validation = validatePropertyForm(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setIsLoading(true);
    try {
      if (saveAndAdd && onSaveAndAdd) {
        await onSaveAndAdd(form);
        setForm(emptyForm);
        setKawasanInput("");
      } else {
        await onSubmit(form);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(false);
      }}
      className="grid gap-5 rounded-2xl border border-primaryBlack/8 bg-neutralWhite p-6 shadow-card lg:grid-cols-2 lg:p-8"
    >
      <Input
        label="Nama Property *"
        value={form.nama_property}
        onChange={(e) => update("nama_property", e.target.value)}
        error={errors.nama_property}
      />
      <Input
        label="Group"
        value={form.group ?? ""}
        onChange={(e) => update("group", e.target.value)}
      />
      <Input
        label="Lebar (m) *"
        type="number"
        step="0.01"
        value={form.lebar || ""}
        onChange={(e) => update("lebar", Number(e.target.value))}
        error={errors.lebar}
      />
      <Input
        label="Panjang (m) *"
        type="number"
        step="0.01"
        value={form.panjang || ""}
        onChange={(e) => update("panjang", Number(e.target.value))}
        error={errors.panjang}
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-primaryBlack/85">Hadap *</span>
        <div className="flex flex-wrap gap-4 py-2">
          {HADAP_OPTIONS.map((direction) => (
            <label key={direction} className="flex items-center gap-2 text-sm text-primaryBlack/70 font-semibold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.hadap.includes(direction)}
                onChange={() => toggleHadap(direction)}
                className="accent-accentGold"
              />
              {direction}
            </label>
          ))}
        </div>
        {errors.hadap && <p className="text-xs font-semibold text-accentRed">{errors.hadap}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-primaryBlack/85">Tipe *</span>
        <select
          value={form.tipe}
          onChange={(e) => update("tipe", e.target.value as PropertyPayload["tipe"])}
          className="w-full rounded-xl border border-primaryBlack/12 bg-neutralWhite px-4 py-3 text-sm text-primaryBlack outline-none transition-all placeholder:text-primaryBlack/35 focus:border-accentGold focus:ring-4 focus:ring-accentGold/10 cursor-pointer"
        >
          {TIPE_OPTIONS.map((tipe) => (
            <option key={tipe} value={tipe}>
              {tipe}
            </option>
          ))}
        </select>
        {errors.tipe && <p className="text-xs font-semibold text-accentRed">{errors.tipe}</p>}
      </div>

      <Input
        label="Tingkat *"
        type="number"
        step="0.1"
        min="1"
        max="10"
        value={form.tingkat || ""}
        onChange={(e) => update("tingkat", Number(e.target.value))}
        error={errors.tingkat}
      />
      <Input
        label="Harga (Rp) *"
        type="number"
        value={form.price || ""}
        onChange={(e) => update("price", Number(e.target.value))}
        error={errors.price}
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-primaryBlack/85">Carport</span>
        <label className="flex items-center gap-2 text-sm text-primaryBlack/70 font-semibold cursor-pointer select-none py-2">
          <input
            type="checkbox"
            checked={form.carport}
            onChange={(e) => update("carport", e.target.checked)}
            className="accent-accentGold"
          />
          Ada carport
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-primaryBlack/85">Status</span>
        <select
          value={form.status}
          onChange={(e) =>
            update("status", e.target.value as PropertyPayload["status"])
          }
          className="w-full rounded-xl border border-primaryBlack/12 bg-neutralWhite px-4 py-3 text-sm text-primaryBlack outline-none transition-all placeholder:text-primaryBlack/35 focus:border-accentGold focus:ring-4 focus:ring-accentGold/10 cursor-pointer"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status === "in stock" ? "In Stock" : "Sold Out"}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-primaryBlack/85">Siap *</span>
        <select
          value={form.siap}
          onChange={(e) => update("siap", e.target.value as PropertyPayload["siap"])}
          className="w-full rounded-xl border border-primaryBlack/12 bg-neutralWhite px-4 py-3 text-sm text-primaryBlack outline-none transition-all placeholder:text-primaryBlack/35 focus:border-accentGold focus:ring-4 focus:ring-accentGold/10 cursor-pointer"
        >
          {SIAP_OPTIONS.map((siap) => (
            <option key={siap} value={siap}>
              {siap}
            </option>
          ))}
        </select>
        {errors.siap && <p className="text-xs font-semibold text-accentRed">{errors.siap}</p>}
      </div>

      <Input
        label="Unit"
        value={form.unit ?? ""}
        onChange={(e) => update("unit", e.target.value)}
      />

      <Input
        label="Google Maps Link"
        value={form.maps_link ?? ""}
        onChange={(e) => update("maps_link", e.target.value)}
        error={errors.maps_link}
        className="lg:col-span-2"
      />

      <div className="flex flex-col gap-2 lg:col-span-2">
        <span className="text-sm font-semibold text-primaryBlack/85">Kawasan *</span>
        <div className="flex gap-2">
          <Input
            placeholder="Tambah kawasan..."
            value={kawasanInput}
            onChange={(e) => setKawasanInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addKawasan();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addKawasan} className="h-[46px] mt-[26px]">
            Tambah
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {form.kawasan.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                update(
                  "kawasan",
                  form.kawasan.filter((k) => k !== tag),
                )
              }
              className="rounded-full border border-primaryBlack/10 bg-softGray px-3 py-1.5 text-xs text-primaryBlack/70 hover:border-accentRed/45 hover:bg-accentRed/10 hover:text-accentRed transition-all duration-200"
            >
              {tag} ×
            </button>
          ))}
        </div>
        {errors.kawasan && (
          <p className="text-xs font-semibold text-accentRed">{errors.kawasan}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 lg:col-span-2 mt-4">
        <Button type="submit" isLoading={isLoading}>
          {submitLabel}
        </Button>
        {onSaveAndAdd && (
          <Button
            type="button"
            variant="outline"
            isLoading={isLoading}
            onClick={() => void handleSubmit(true)}
          >
            Simpan & Tambah Lagi
          </Button>
        )}
      </div>
    </form>
  );
}
