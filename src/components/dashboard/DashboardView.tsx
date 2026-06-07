"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { PropertyFilters, type FilterState } from "@/components/properties/PropertyFilters";
import { PropertyTable } from "@/components/properties/PropertyTable";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Button } from "@/components/ui/Button";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { fetchProperties } from "@/lib/api/properties";
import { DEFAULT_PER_PAGE, PER_PAGE_OPTIONS } from "@/lib/constants";
import type { PaginatedProperties } from "@/types/property";

function DashboardContent() {
  const { getParam, getArrayParam, setParams } = useQueryParams();
  const [data, setData] = useState<PaginatedProperties | null>(null);
  const [resolvedQueryKey, setResolvedQueryKey] = useState("");
  const [error, setError] = useState("");

  const filters: FilterState = useMemo(
    () => ({
      search: getParam("search"),
      kawasan: getArrayParam("kawasan"),
      lebar_min: getParam("lebar_min"),
      hadap: getArrayParam("hadap"),
      price_max: getParam("price_max"),
      tipe: (getParam("tipe") as FilterState["tipe"]) || "",
      status: (getParam("status") as FilterState["status"]) || "",
      siap: getArrayParam("siap"),
      carport: (getParam("carport") as FilterState["carport"]) || "",
    }),
    [getParam, getArrayParam],
  );

  const debouncedSearch = useDebounce(filters.search, 300);
  const page = Number(getParam("page") || "1");
  const perPage = Number(getParam("per_page") || String(DEFAULT_PER_PAGE)) as 25 | 50 | 100;
  const sortBy = (getParam("sort_by") || "created_at") as
    | "nama_property"
    | "price"
    | "created_at"
    | "status";
  const sortDir = (getParam("sort_dir") || "desc") as "asc" | "desc";

  const queryKey = JSON.stringify({
    page,
    perPage,
    debouncedSearch,
    filters,
    sortBy,
    sortDir,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadProperties() {
      try {
        const response = await fetchProperties({
          page,
          per_page: PER_PAGE_OPTIONS.includes(perPage) ? perPage : DEFAULT_PER_PAGE,
          search: debouncedSearch || undefined,
          kawasan: filters.kawasan.length ? filters.kawasan : undefined,
          lebar_min: filters.lebar_min ? Number(filters.lebar_min) : undefined,
          hadap: filters.hadap.length ? filters.hadap : undefined,
          price_max: filters.price_max ? Number(filters.price_max) : undefined,
          tipe: filters.tipe || undefined,
          status: filters.status || undefined,
          siap: filters.siap.length ? filters.siap : undefined,
          carport:
            filters.carport === ""
              ? undefined
              : filters.carport === "true",
          sort_by: sortBy,
          sort_dir: sortDir,
        });

        if (!cancelled) {
          setData(response);
          setError("");
          setResolvedQueryKey(queryKey);
        }
      } catch {
        if (!cancelled) {
          setError("Gagal memuat data properti.");
          setResolvedQueryKey(queryKey);
        }
      }
    }

    void loadProperties();

    return () => {
      cancelled = true;
    };
  }, [queryKey]);

  const isLoading = resolvedQueryKey !== queryKey;

  const kawasanOptions = useMemo(() => {
    const fromData = data?.data.flatMap((p) => p.kawasan) ?? [];
    const fromFilters = filters.kawasan;
    return Array.from(new Set([...fromData, ...fromFilters])).sort();
  }, [data, filters.kawasan]);

  const updateFilters = (updates: Partial<FilterState>) => {
    setParams({
      search: updates.search ?? filters.search,
      kawasan: updates.kawasan ?? filters.kawasan,
      lebar_min: updates.lebar_min ?? filters.lebar_min,
      hadap: updates.hadap ?? filters.hadap,
      price_max: updates.price_max ?? filters.price_max,
      tipe: updates.tipe ?? filters.tipe,
      status: updates.status ?? filters.status,
      siap: updates.siap ?? filters.siap,
      carport: updates.carport ?? filters.carport,
      page: "1",
    });
  };

  const resetFilters = () => {
    setParams({
      search: null,
      kawasan: null,
      lebar_min: null,
      hadap: null,
      price_max: null,
      tipe: null,
      status: null,
      siap: null,
      carport: null,
      page: "1",
    });
  };

  const handleSort = (column: typeof sortBy) => {
    const nextDir = sortBy === column && sortDir === "asc" ? "desc" : "asc";
    setParams({ sort_by: column, sort_dir: nextDir });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardStats data={data} isLoading={isLoading} />

      <PropertyFilters
        filters={filters}
        kawasanOptions={kawasanOptions}
        onChange={updateFilters}
        onReset={resetFilters}
      />

      {error && (
        <div className="rounded-xl border border-accentRed/20 bg-accentRed/5 px-4 py-3 text-sm text-accentRed font-semibold">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-primaryBlack/8 bg-neutralWhite p-6 shadow-card">
          <TableSkeleton />
        </div>
      ) : (
        data && (
          <>
            <PropertyTable
              properties={data.data}
              sortBy={sortBy}
              sortDir={sortDir}
              onSort={handleSort}
            />

            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-primaryBlack/8 bg-neutralWhite px-6 py-4 shadow-card sm:flex-row">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-primaryBlack/50">Baris:</span>
                <div className="flex gap-1.5">
                  {PER_PAGE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setParams({ per_page: String(option), page: "1" })}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                        perPage === option
                          ? "bg-primaryBlack text-neutralWhite shadow-sm"
                          : "bg-softGray text-primaryBlack/60 hover:bg-primaryBlack/8"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs tabular-nums text-primaryBlack/50 font-normal">
                {data.from ?? 0}–{data.to ?? 0} dari {data.total} properti
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setParams({ page: String(page - 1) })}
                  className="!px-3 !py-1"
                >
                  ← Prev
                </Button>
                <span className="min-w-[80px] text-center text-xs font-semibold tabular-nums text-primaryBlack/60">
                  {data.current_page} / {data.last_page}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= data.last_page}
                  onClick={() => setParams({ page: String(page + 1) })}
                  className="!px-3 !py-1"
                >
                  Next →
                </Button>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export function DashboardView() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-primaryBlack/8 bg-neutralWhite p-6 shadow-card">
          <TableSkeleton />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
