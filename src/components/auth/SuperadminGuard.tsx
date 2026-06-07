"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function SuperadminGuard({ children }: { children: ReactNode }) {
  const { isSuperadmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isSuperadmin) {
      router.replace("/dashboard");
    }
  }, [isSuperadmin, isLoading, router]);

  if (isLoading || !isSuperadmin) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-primaryBlack/60">
        Memverifikasi akses...
      </div>
    );
  }

  return <>{children}</>;
}
