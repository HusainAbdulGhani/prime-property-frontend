import type { PropertyPayload } from "@/types/property";
import {
  HADAP_OPTIONS,
  SIAP_OPTIONS,
  STATUS_OPTIONS,
  TIPE_OPTIONS,
} from "@/types/property";

export interface ContactFormData {
  nama: string;
  email: string;
  nomor_hp: string;
  pesan: string;
}

export interface ContactFormErrors {
  nama?: string;
  email?: string;
  nomor_hp?: string;
  pesan?: string;
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.nama.trim()) errors.nama = "Nama wajib diisi.";
  if (!data.email.trim()) {
    errors.email = "Email wajib diisi.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Format email tidak valid.";
  }
  if (!data.nomor_hp.trim()) {
    errors.nomor_hp = "Nomor HP wajib diisi.";
  } else if (!/^\d{10,}$/.test(data.nomor_hp.replace(/\D/g, ""))) {
    errors.nomor_hp = "Nomor HP minimal 10 digit angka.";
  }
  if (!data.pesan.trim()) errors.pesan = "Pesan wajib diisi.";

  return errors;
}

export type PropertyFormErrors = Partial<Record<keyof PropertyPayload, string>>;

const MAPS_REGEX = /(googleusercontent\.com|maps\.google\.com)/i;

export function validatePropertyForm(
  data: PropertyPayload,
): PropertyFormErrors {
  const errors: PropertyFormErrors = {};

  if (!data.nama_property || data.nama_property.length < 3) {
    errors.nama_property = "Nama property minimal 3 karakter.";
  } else if (data.nama_property.length > 100) {
    errors.nama_property = "Nama property maksimal 100 karakter.";
  }

  if (data.lebar === undefined || data.lebar <= 0) {
    errors.lebar = "Lebar harus lebih besar dari 0.";
  } else if (!Number.isInteger(data.lebar * 100)) {
    errors.lebar = "Lebar tidak boleh desimal lebih dari 2 angka.";
  }

  if (data.panjang === undefined || data.panjang <= 0) {
    errors.panjang = "Panjang harus lebih besar dari 0.";
  } else if (!Number.isInteger(data.panjang * 100)) {
    errors.panjang = "Panjang tidak boleh desimal lebih dari 2 angka.";
  }

  if (!data.hadap?.length) {
    errors.hadap = "Pilih minimal satu arah hadap.";
  } else if (!data.hadap.every((h) => HADAP_OPTIONS.includes(h))) {
    errors.hadap = "Hadap tidak valid.";
  }

  if (!TIPE_OPTIONS.includes(data.tipe)) {
    errors.tipe = "Tipe harus Ruko atau Villa.";
  }

  if (data.tingkat === undefined || data.tingkat < 1 || data.tingkat > 10) {
    errors.tingkat = "Tingkat harus antara 1 dan 10.";
  }

  if (data.price === undefined || !Number.isInteger(data.price) || data.price <= 0) {
    errors.price = "Harga harus angka bulat lebih dari 0.";
  }

  if (data.status && !STATUS_OPTIONS.includes(data.status)) {
    errors.status = "Status tidak valid.";
  }

  if (!SIAP_OPTIONS.includes(data.siap)) {
    errors.siap = "Status kesiapan tidak valid.";
  }

  if (data.maps_link && !MAPS_REGEX.test(data.maps_link)) {
    errors.maps_link =
      "Link maps harus dari domain googleusercontent.com atau maps.google.com.";
  }

  if (!data.kawasan?.length) {
    errors.kawasan = "Minimal satu kawasan wajib diisi.";
  }

  return errors;
}
