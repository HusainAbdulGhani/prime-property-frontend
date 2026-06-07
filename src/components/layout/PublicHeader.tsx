"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menutup mobile menu secara otomatis jika ukuran layar melebar ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full select-none">
      {/* Top Gradient Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accentGold to-transparent opacity-70" />

      {/* Main Navbar Container */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-primaryBlack/92 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            : "bg-primaryBlack/65"
        }`}
        style={{
          // Safari & Chrome Backdrop Blur Compatibility
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
        }}
      >
        {/* Responsivitas Grid: 
          Mobile: flex justify-between agar logo & burger rapat kanan-kiri.
          Desktop (lg): Dikembalikan ke grid-cols-3 supaya nav center benar-benar presisi di tengah.
        */}
        <div className="flex h-[68px] w-full items-center justify-between px-6 sm:px-8 lg:grid lg:grid-cols-3 lg:px-14">
          
          {/* LEFT — Logo */}
          <div className="flex items-center justify-start">
            <Link href="/" className="transition-opacity hover:opacity-80 active:opacity-70">
              <Image
                src="/logo-property.png"
                alt="Prime Property"
                width={140}
                height={36}
                className="h-9 w-auto object-contain will-change-transform"
                priority
              />
            </Link>
          </div>

          {/* CENTER — Navigation (Desktop Only) */}
          <nav className="hidden items-center justify-center lg:flex">
            <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-5 py-1.5 text-sm font-medium tracking-wide transition-all duration-200 ${
                      active
                        ? "bg-accentGold text-primaryBlack font-semibold shadow-[0_2px_12px_rgba(201,169,97,0.4)]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* RIGHT — Actions (Desktop Only) */}
          <div className="hidden items-center justify-end gap-3 lg:flex">
            <Link
              href="/agent/login"
              className="rounded-full border border-accentGold/50 px-5 py-1.5 text-sm font-medium text-accentGold transition-all hover:border-accentGold hover:bg-accentGold/10 active:scale-[0.97]"
            >
              Login Agent
            </Link>
            <Link
              href="/kontak"
              className="rounded-full bg-accentGold px-5 py-1.5 text-sm font-semibold text-primaryBlack shadow-[0_4px_16px_rgba(201,169,97,0.3)] transition-all hover:bg-accentGold/90 hover:shadow-[0_4px_24px_rgba(201,169,97,0.5)] active:scale-[0.97]"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* HAMBURGER BUTTON (Mobile Only) */}
          <div className="flex items-center justify-end lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 p-2.5 text-white/70 transition-colors hover:bg-white/8 hover:text-white focus:outline-none focus:ring-2 focus:ring-accentGold/40"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg className="h-5 w-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
        
        {/* Bottom Border Accent */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileOpen && (
        <div 
          className="border-t border-white/8 bg-primaryBlack/95 shadow-2xl transition-all duration-300 ease-in-out lg:hidden"
          style={{
            WebkitBackdropFilter: "blur(20px)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex flex-col gap-2 px-6 py-5 max-h-[calc(100vh-70px)] overflow-y-auto">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    active
                      ? "bg-accentGold/10 text-accentGold font-semibold"
                      : "text-white/60 hover:bg-white/5 hover:text-white active:bg-white/10"
                  }`}
                >
                  {item.label}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-accentGold shadow-[0_0_8px_#c9a961]" />}
                </Link>
              );
            })}
            
            <div className="my-2 h-px bg-white/10" />
            
            {/* Mobile Buttons */}
            <div className="flex flex-col gap-2.5 pt-1">
              <Link
                href="/agent/login"
                onClick={() => setMobileOpen(false)}
                className="w-full rounded-xl border border-accentGold/40 py-3 text-center text-sm font-medium text-accentGold transition-all hover:bg-accentGold/8 active:bg-accentGold/15"
              >
                Login Agent
              </Link>
              <Link
                href="/kontak"
                onClick={() => setMobileOpen(false)}
                className="w-full rounded-xl bg-accentGold py-3 text-center text-sm font-semibold text-primaryBlack transition-all hover:bg-accentGold/90 active:scale-[0.99]"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}