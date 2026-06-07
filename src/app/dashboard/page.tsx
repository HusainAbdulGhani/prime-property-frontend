import { DashboardView } from "@/components/dashboard/DashboardView";

export const metadata = {
  title: "Dashboard | Prime Property",
};

export default function DashboardPage() {
  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-accentGold/10 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accentGold font-display">
            Agent Portal
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-accentGold lg:text-3.5xl font-display">
            Katalog Properti
          </h1>
          <p className="mt-1 text-sm font-light text-primaryBlack/60">
            Kelola dan jelajahi seluruh listing properti Prime Property
          </p>
        </div>
        
        <a
          href="/dashboard/create"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accentGold via-accentGoldLight to-accentGold px-5 py-3 text-sm font-bold tracking-wide text-luxuryDark shadow-luxury transition-all duration-300 hover:scale-[1.03] hover:shadow-gold-glow/20 active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Properti
        </a>
      </div>

      <DashboardView />
    </div>
  );
}