"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg =
    type === "success"
      ? "bg-neutralWhite text-primaryBlack border-accentGold shadow-premium"
      : "bg-red-50 text-accentRed border-accentRed/30 shadow-md";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-xl border px-4 py-3.5 text-sm font-semibold tracking-wide animate-slide-up ${bg}`}
      role="status"
    >
      <div className="flex items-center gap-2">
        {type === "success" && (
          <span className="h-2 w-2 rounded-full bg-accentGold animate-pulse" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}
