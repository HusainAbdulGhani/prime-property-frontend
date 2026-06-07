export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDimensions(lebar: string | number, panjang: string | number): string {
  return `${lebar} x ${panjang}`;
}

export function formatSiapLabel(siap: string): string {
  const labels: Record<string, string> = {
    siap_huni: "Siap Huni",
    siap_kosong: "Siap Kosong",
    siap_huni_renovasi: "Siap Huni Renovasi",
  };
  return labels[siap] ?? siap;
}

export function formatStatusLabel(status: string): string {
  if (status === "in stock") return "In Stock";
  if (status === "sold_out") return "Sold Out";
  return status;
}
