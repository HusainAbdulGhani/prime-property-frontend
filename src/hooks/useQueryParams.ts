"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const setParams = useCallback(
    (updates: Record<string, string | string[] | null | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        next.delete(key);
        if (value === null || value === undefined || value === "") return;
        if (Array.isArray(value)) {
          if (value.length) next.set(key, value.join(","));
        } else {
          next.set(key, value);
        }
      });

      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const getParam = useCallback(
    (key: string) => searchParams.get(key) ?? "",
    [searchParams],
  );

  const getArrayParam = useCallback(
    (key: string) => {
      const value = searchParams.get(key);
      return value ? value.split(",").filter(Boolean) : [];
    },
    [searchParams],
  );

  return { params, setParams, getParam, getArrayParam, searchParams };
}
