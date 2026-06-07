"use client";

import { Modal } from "@/components/ui/Modal";

interface DeletePropertyModalProps {
  isOpen: boolean;
  propertyName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeletePropertyModal({
  isOpen,
  propertyName,
  onConfirm,
  onCancel,
  isLoading,
}: DeletePropertyModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title="Hapus Properti"
      confirmLabel="Ya, Hapus"
      onConfirm={onConfirm}
      onCancel={onCancel}
      isLoading={isLoading}
    >
      Yakin hapus properti <strong className="text-primaryBlack font-bold">{propertyName}</strong>?
      Tindakan ini tidak dapat dibatalkan.
    </Modal>
  );
}
