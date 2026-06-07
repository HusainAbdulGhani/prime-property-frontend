export const HADAP_OPTIONS = ["Utara", "Selatan", "Timur", "Barat"] as const;
export const TIPE_OPTIONS = ["Ruko", "Villa"] as const;
export const STATUS_OPTIONS = ["in stock", "sold_out"] as const;
export const SIAP_OPTIONS = [
  "siap_huni",
  "siap_kosong",
  "siap_huni_renovasi",
] as const;

export type Hadap = (typeof HADAP_OPTIONS)[number];
export type Tipe = (typeof TIPE_OPTIONS)[number];
export type PropertyStatus = (typeof STATUS_OPTIONS)[number];
export type Siap = (typeof SIAP_OPTIONS)[number];

export interface Property {
  id: number;
  nama_property: string;
  group: string | null;
  lebar: string;
  panjang: string;
  hadap: Hadap[];
  tipe: Tipe;
  tingkat: string;
  price: number;
  carport: boolean;
  status: PropertyStatus;
  siap: Siap;
  maps_link: string | null;
  kawasan: string[];
  unit: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface PropertyPayload {
  nama_property: string;
  group?: string | null;
  lebar: number;
  panjang: number;
  hadap: Hadap[];
  tipe: Tipe;
  tingkat: number;
  price: number;
  carport?: boolean;
  status?: PropertyStatus;
  siap: Siap;
  maps_link?: string | null;
  kawasan: string[];
  unit?: string | null;
}

export interface PaginatedProperties {
  data: Property[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
  links: Array<{ url: string | null; label: string; active: boolean }>;
}

export interface PropertyQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  kawasan?: string[];
  lebar_min?: number;
  hadap?: string[];
  price_max?: number;
  tipe?: Tipe | "";
  status?: PropertyStatus | "";
  siap?: string[];
  carport?: boolean;
  sort_by?: "nama_property" | "price" | "created_at" | "status";
  sort_dir?: "asc" | "desc";
}
