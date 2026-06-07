"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/lib/api/contact";
import { getApiErrorMessage } from "@/lib/api/client";
import { validateContactForm } from "@/lib/validation";
import { useToast } from "@/context/ToastContext";

export function ContactForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    nama: "",
    email: "",
    nomor_hp: "",
    pesan: "",
  });
  const [errors, setErrors] = useState<ReturnType<typeof validateContactForm>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setIsLoading(true);
    try {
      await submitContact({
        ...form,
        nomor_hp: form.nomor_hp.replace(/\D/g, ""),
      });
      showToast("Pesan terkirim, tim kami akan menghubungi Anda.");
      setForm({ nama: "", email: "", nomor_hp: "", pesan: "" });
    } catch (error) {
      showToast(
        getApiErrorMessage(error, "Gagal mengirim pesan. Silakan coba lagi."),
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nama *"
        name="nama"
        value={form.nama}
        onChange={(e) => setForm((prev) => ({ ...prev, nama: e.target.value }))}
        error={errors.nama}
      />
      <Input
        label="Email *"
        name="email"
        type="email"
        value={form.email}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        error={errors.email}
      />
      <Input
        label="Nomor HP *"
        name="nomor_hp"
        value={form.nomor_hp}
        onChange={(e) => setForm((prev) => ({ ...prev, nomor_hp: e.target.value }))}
        error={errors.nomor_hp}
      />
      <Textarea
        label="Pesan *"
        name="pesan"
        value={form.pesan}
        onChange={(e) => setForm((prev) => ({ ...prev, pesan: e.target.value }))}
        error={errors.pesan}
      />
      <Button type="submit" size="lg" isLoading={isLoading}>
        Kirim Pesan
      </Button>
    </form>
  );
}
