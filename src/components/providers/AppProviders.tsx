"use client";

import { useState, useEffect, type ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";

export function AppProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <div style={{ opacity: mounted ? 1 : 0 }}>
          {children}
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}