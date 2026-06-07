"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  {
    href: "/dashboard/overview",
    label: "Overview",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM14 13a1 1 0 011-1h5a1 1 0 011 1v6a1 1 0 01-1 1h-5a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    match: (path: string) => path === "/dashboard/overview",
  },
  {
    href: "/dashboard",
    label: "Katalog Properti",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    match: (path: string) => path === "/dashboard",
  },
  {
    href: "/dashboard/create",
    label: "Tambah Properti",
    superadminOnly: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4v16m8-8H4" />
      </svg>
    ),
    match: (path: string) =>
      path.startsWith("/dashboard/create") || path.startsWith("/dashboard/edit"),
  },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, isSuperadmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const visibleNav = navItems.filter(
    (item) => !item.superadminOnly || (mounted && isSuperadmin),
  );

  const roleLabel = mounted && user?.role === "superadmin" ? "Super Admin" : "Admin";
  const userInitial = mounted && user?.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <div className="flex min-h-screen bg-softGray text-primaryBlack">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-primaryBlack/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Tutup menu"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-neutralWhite border-r border-primaryBlack/10 shadow-sm transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b border-primaryBlack/6 px-5">
          <Logo size="sm" variant="default" href="/dashboard" />
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="mb-2 px-3 pt-2 text-[10px] font-bold uppercase tracking-widest text-primaryBlack/30">
            Menu
          </p>

          {visibleNav.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 ${
                  active
                    ? "bg-accentGold/10 text-primaryBlack border-l-2 border-l-accentGold"
                    : "text-primaryBlack/65 hover:bg-softGray hover:text-primaryBlack"
                }`}
              >
                <span className={active ? "text-accentGold" : "text-primaryBlack/45"}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}

          <div className="my-4 border-t border-primaryBlack/6" />
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold tracking-wide text-primaryBlack/50 transition-all duration-200 hover:bg-softGray hover:text-primaryBlack"
          >
            <svg className="h-5 w-5 text-primaryBlack/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Situs Publik
          </Link>
        </nav>
        <div className="border-t border-primaryBlack/6 p-3">
          <div className="rounded-xl border border-primaryBlack/8 bg-softGray/50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primaryBlack text-xs font-bold text-accentGold">
                {userInitial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold tracking-wide text-primaryBlack">
                  {mounted ? user?.name : "Loading..."}
                </p>
                <p className="truncate text-xs text-primaryBlack/45">
                  {mounted ? user?.email : "..."}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-md border border-accentGold/30 bg-accentGold/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#917535]">
                {roleLabel}
              </span>
              <button
                type="button"
                onClick={() => logout()}
                className="text-xs font-bold tracking-wide text-primaryBlack/40 transition-colors duration-200 hover:text-accentRed"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col bg-softGray">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-primaryBlack/6 bg-neutralWhite px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-primaryBlack hover:bg-softGray"
            aria-label="Buka menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Logo size="sm" variant="default" href="/dashboard" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primaryBlack text-xs font-bold text-accentGold">
            {userInitial}
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}