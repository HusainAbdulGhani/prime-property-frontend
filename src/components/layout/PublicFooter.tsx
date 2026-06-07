import Link from "next/link";
import Image from "next/image";
import { CONTACT_INFO } from "@/lib/constants";

export function PublicFooter() {
  return (
    <footer className="bg-gradient-to-b from-primaryBlack to-[#0b0b0b] text-neutralWhite border-t border-neutralWhite/5 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 pb-16">
          
          <div className="flex flex-col items-start gap-5 lg:col-span-1">
            <Link href="/" className="transition-transform duration-300 hover:scale-105">
              <Image 
                src="/logo-property.png"
                alt="Prime Property Logo" 
                width={140} 
                height={40} 
                className="object-contain"
                priority
              />
            </Link>
            <p className="text-sm leading-relaxed text-neutralWhite/60 font-light max-w-sm">
              Platform properti premium dengan data transparan dan katalog
              terlengkap di Sumatera Utara.
            </p>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-neutralWhite shadow-lg shadow-[#25D366]/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#20ba5a] hover:shadow-[#25D366]/20"
            >
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>

          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-neutralWhite/40 border-b border-neutralWhite/10 pb-2">
              Navigasi
            </p>
            <ul className="space-y-3.5">
              {[
                { href: "/", label: "Beranda" },
                { href: "/tentang-kami", label: "Tentang Kami" },
                { href: "/kontak", label: "Kontak" },
                { href: "/agent/login", label: "Login Agent" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-neutralWhite/60 transition-all duration-300 hover:text-accentGold"
                  >
                    <span className="mr-0 h-[1px] w-0 bg-accentGold transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-neutralWhite/40 border-b border-neutralWhite/10 pb-2">
              Kontak
            </p>
            <ul className="space-y-4">
              <li className="group">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutralWhite/30 transition-colors group-hover:text-accentGold/60">
                  Telepon
                </p>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="mt-1 block text-sm text-neutralWhite/70 transition-colors duration-300 hover:text-accentGold font-medium"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="group">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutralWhite/30 transition-colors group-hover:text-accentGold/60">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="mt-1 block text-sm text-neutralWhite/70 transition-colors duration-300 hover:text-accentGold font-medium"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutralWhite/30">
                  Alamat
                </p>
                <p className="mt-1 text-sm leading-relaxed text-neutralWhite/70 font-light">
                  {CONTACT_INFO.address}
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutralWhite/40 border-b border-neutralWhite/10 pb-2">
              Jam Operasional
            </p>
            <div className="rounded-xl border border-neutralWhite/5 p-4 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-neutralWhite/10 hover:bg-white/[0.04]">
              <p className="text-xs text-neutralWhite/50 font-medium">Senin – Jumat</p>
              <p className="mt-1.5 text-xl font-bold text-accentGold tracking-tight">
                09:00 – 17:00
              </p>
              <p className="text-[10px] text-neutralWhite/30 font-semibold mt-0.5">WIB</p>
            </div>
            
            <div className="flex items-center gap-3 rounded-xl border border-neutralWhite/5 p-4 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-neutralWhite/10 hover:bg-white/[0.04]">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
              </div>
              <p className="text-[11px] text-neutralWhite/70 uppercase tracking-widest font-bold">
                Online Sekarang
              </p>
            </div>
          </div>

        </div>
        <div className="border-t border-neutralWhite/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-neutralWhite/40 font-light">
            <p>
              © {new Date().getFullYear()} Prime Property. Seluruh hak cipta dilindungi.
            </p>
            <div className="flex gap-6">
              {["Kebijakan Privasi", "Syarat &amp; Ketentuan"].map((item) => (
                <span 
                  key={item} 
                  className="cursor-pointer hover:text-accentGold transition-colors duration-300 underline-offset-4 hover:underline"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}