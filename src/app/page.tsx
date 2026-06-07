import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedPropertiesGrid } from "@/components/properties/FeaturedPropertiesGrid";
import { ValuePropositions } from "@/components/home/ValuePropositions";
import { fetchProperties } from "@/lib/api/properties";
import type { Property } from "@/types/property";

import { RevealOnScroll, StaggerHeader } from "./HomeClientAnimations";

export default async function HomePage() {
  let properties: Property[] = [];

  try {
    const response = await fetchProperties({ per_page: 25 });
    properties = response.data.slice(0, 6);
  } catch {
    properties = [];
  }

  return (
    <>
      <PublicHeader />
      <HeroSection />
      <section id="properti-unggulan" className="relative bg-neutralWhite py-20 lg:py-24 border-t border-primaryBlack/5 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <StaggerHeader 
            badge="Katalog Terbaru"
            title="Properti Unggulan"
            description={properties.length > 0
              ? `${properties.length} listing pilihan untuk Anda`
              : "Segera hadir"
            }
          />
          
          <RevealOnScroll variant="fadeUp" delay={0.2}>
            <FeaturedPropertiesGrid properties={properties} />
          </RevealOnScroll>
        </div>
      </section>

      <ValuePropositions />
      <section className="relative bg-primaryBlack py-24 text-center border-t border-primaryBlack/10 overflow-hidden">
        <RevealOnScroll variant="scaleUp" className="max-w-4xl mx-auto px-6 flex flex-col items-center z-10 relative">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Konsultasikan Investasi Properti Anda
          </h2>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
            Hubungi konsultan ahli kami sekarang untuk mendapatkan rekomendasi ruko atau villa premium yang paling sesuai dengan portofolio investasi Anda.
          </p>
          <a
            href="/kontak"
            className="group relative rounded-xl bg-accentGold px-8 py-4 text-sm font-bold tracking-wide text-primaryBlack shadow-lg overflow-hidden block transition-transform duration-300 active:scale-[0.98]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-[shimmer_0.75s_ease-in-out]" />
            Mulai Konsultasi
          </a>
        </RevealOnScroll>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accentGold/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

      <PublicFooter />
    </>
  );
}