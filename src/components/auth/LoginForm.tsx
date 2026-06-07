"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { getApiErrorMessage } from "@/lib/api/client";
import { parseLockoutError } from "@/lib/api/auth";

function LockoutScreen({
  error,
  lockoutSeconds,
}: {
  error: string;
  lockoutSeconds: number;
}) {
  const minutes = Math.ceil(lockoutSeconds / 60);

  return (
    <div className="animate-fade-in text-center p-2">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-md">
        <svg className="h-8 w-8 text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Akses Terkunci Sementara</h2>
      <p className="mt-2 text-sm text-neutral-500 px-4">{error}</p>
      
      <div className="mt-8 inline-flex items-baseline gap-2 rounded-2xl bg-white/80 border border-neutral-200/60 px-8 py-5 shadow-sm backdrop-blur-sm">
        <span className="text-5xl font-extrabold tabular-nums tracking-tight text-neutral-900">
          {Math.floor(lockoutSeconds / 60)}
        </span>
        <span className="text-3xl font-bold text-neutral-300 animate-ping">:</span>
        <span className="text-5xl font-extrabold tabular-nums tracking-tight text-neutral-900">
          {String(lockoutSeconds % 60).padStart(2, "0")}
        </span>
      </div>
      
      <p className="mt-4 text-xs font-medium text-neutral-400">
        Silakan coba kembali dalam {minutes} menit.
      </p>
      
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors duration-200"
        >
          ← Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const isLocked = lockoutSeconds > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      const lockout = parseLockoutError(err);
      if (lockout) {
        setLockoutSeconds(lockout.retry_after_seconds);
        setError(lockout.message);
      } else {
        setError(getApiErrorMessage(err, "Login gagal. Silakan periksa kembali email dan password Anda."));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 font-sans antialiased selection:bg-amber-500/30">
      <div className="relative hidden w-[42%] overflow-hidden bg-neutral-950 lg:flex lg:flex-col justify-between p-12 border-r border-neutral-800/50">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950" />

        <div className="relative z-10">
          <Logo variant="inverted" size="lg" href="/" />
        </div>
        <div className="relative z-10 my-auto space-y-10 max-w-md">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-medium text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Portal Agent Khusus
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight text-white">
              Portal Agent <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                Prime Property
              </span>
            </h2>
            <p className="text-base leading-relaxed text-neutral-400">
              Akses katalog properti real-time, kelola listing secara cerdas, dan monitor performa bisnis Anda dalam satu dashboard terintegrasi.
            </p>
          </div>

          <ul className="space-y-3.5 border-t border-neutral-800/60 pt-6">
            {[
              "Katalog properti real-time mendalam",
              "Manajemen listing instan & akurat",
              "Sistem filter & pencarian AI-Ready",
              "Laporan data transparan & tervalidasi",
            ].map((feat) => (
              <li key={feat} className="flex items-center gap-3 group">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 group-hover:border-amber-500/50 transition-colors duration-300">
                  <svg className="h-3 w-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-neutral-300 font-medium">{feat}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-3 gap-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 p-4 backdrop-blur-md">
            {[
              { value: "500+", label: "Listing Aktif" },
              { value: "24/7", label: "Akses Data" },
              { value: "100%", label: "Transparan" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-transparent">{stat.value}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-neutral-600 font-medium">
          © {mounted ? new Date().getFullYear() : "2026"} Prime Property. Internal Use Only.
        </p>
      </div>

      <div 
        className="flex flex-1 flex-col items-center justify-center px-6 py-16 sm:px-12 relative bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30 lg:bg-gradient-to-r lg:from-neutral-950/90 lg:via-neutral-950/20 lg:to-transparent" />

        <div className="relative z-10 mb-8 lg:hidden bg-neutral-950/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <Logo variant="inverted" size="md" href="/" />
        </div>

        <div className="relative z-10 w-full max-w-[420px] bg-white/90 rounded-3xl border border-white/20 p-8 sm:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300">
          {isLocked ? (
            <LockoutScreen error={error} lockoutSeconds={lockoutSeconds} />
          ) : (
            <>
              <div className="mb-7 space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                  Selamat Datang
                </h1>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Silakan masuk untuk mengakses manajemen dashboard agen Anda.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4.5">
                <Input
                  label="Alamat Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="name@primeproperty.id"
                  className="bg-white/70 border-neutral-200/80 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all rounded-xl"
                  icon={
                    <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />
                
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="bg-white/70 border-neutral-200/80 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all rounded-xl"
                    icon={
                      <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    }
                  />
                  {password && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 bottom-3 text-neutral-400 hover:text-neutral-700 text-xs font-bold focus:outline-none select-none transition-colors"
                    >
                      {showPassword ? "Sembunyikan" : "Lihat"}
                    </button>
                  )}
                </div>

                {error && !isLocked && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/90 p-3.5 animate-shake shadow-sm">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs font-semibold text-red-700 leading-normal">{error}</p>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-neutral-950 text-white hover:bg-neutral-800 active:scale-[0.99] focus:ring-4 focus:ring-neutral-950/10 transition-all duration-200 py-3 rounded-xl font-bold tracking-wide shadow-md"
                    isLoading={isLoading}
                  >
                    Masuk ke Dashboard
                  </Button>
                </div>
              </form>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-[1px] flex-1 bg-neutral-200" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">atau</span>
                <div className="h-[1px] flex-1 bg-neutral-200" />
              </div>
              <p className="mt-6 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-bold text-neutral-600 hover:text-neutral-950 border-b border-transparent hover:border-neutral-950 pb-0.5 transition-all duration-200"
                >
                  ← Kembali ke situs publik
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}