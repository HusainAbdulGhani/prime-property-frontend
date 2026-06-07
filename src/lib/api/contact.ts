import { apiRequest } from "@/lib/api/client";

export interface ContactPayload {
  nama: string;
  email: string;
  nomor_hp: string;
  pesan: string;
}

export async function submitContact(
  payload: ContactPayload,
): Promise<{ message: string }> {
  return apiRequest(
    { method: "POST", url: "/api/contact", data: payload },
    { requireCsrf: true },
  );
}
