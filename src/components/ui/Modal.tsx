"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function Modal({
  isOpen,
  title,
  children,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  onConfirm,
  onCancel,
  isLoading = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primaryBlack/50 p-4 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md animate-scale-in rounded-2xl border border-primaryBlack/8 bg-neutralWhite p-6 shadow-premium"
        role="dialog"
        aria-modal
        aria-labelledby="modal-title"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accentRed/10">
          <svg className="h-6 w-6 text-accentRed" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 id="modal-title" className="text-lg font-bold text-primaryBlack">
          {title}
        </h2>
        <div className="mb-6 mt-2 text-sm leading-relaxed text-primaryBlack/65">
          {children}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
