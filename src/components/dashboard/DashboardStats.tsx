import type { PaginatedProperties } from "@/types/property";

interface DashboardStatsProps {
  data: PaginatedProperties | null;
  isLoading: boolean;
}

export function DashboardStats({ data, isLoading }: DashboardStatsProps) {
  const stats = [
    {
      label: "Total Listing",
      value: isLoading ? "—" : String(data?.total ?? 0),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      accent: "text-accentGold",
      bg: "bg-accentGold/10 border border-accentGold/20",
    },
    {
      label: "Halaman Aktif",
      value: isLoading ? "—" : `${data?.current_page ?? 1} / ${data?.last_page ?? 1}`,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      accent: "text-primaryBlack/70",
      bg: "bg-softGray border border-primaryBlack/6",
    },
    {
      label: "Ditampilkan",
      value: isLoading ? "—" : `${data?.from ?? 0}–${data?.to ?? 0}`,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      accent: "text-primaryBlack/70",
      bg: "bg-softGray border border-primaryBlack/6",
    },
    {
      label: "Per Halaman",
      value: isLoading ? "—" : String(data?.per_page ?? 50),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      accent: "text-primaryBlack/70",
      bg: "bg-softGray border border-primaryBlack/6",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 animate-fade-in">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 rounded-2xl border border-primaryBlack/8 bg-neutralWhite p-4 shadow-card hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200"
        >
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.accent}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primaryBlack/40">
              {stat.label}
            </p>
            <p className="text-xl font-bold tabular-nums text-primaryBlack mt-0.5">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
