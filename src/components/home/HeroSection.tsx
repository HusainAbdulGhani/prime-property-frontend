"use client";

import Image from "next/image";
import { Easing, EasingFunction, motion } from "framer-motion";
import { HeroSearch } from "@/components/home/HeroSearch";

const popularKawasan = ["Krakatau", "Pancing", "Cemara Asri", "Medan Kota"];

const luxuryEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: luxuryEase as unknown as Easing[] as EasingFunction[] },
  },
};

const beamLeftVariants = {
  hidden: { opacity: 0, x: -60, rotate: 25, filter: "blur(100px)" },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 35,
    filter: "blur(80px)",
    transition: { duration: 1.6, ease: luxuryEase as unknown as Easing[] },
  },
};

const beamRightVariants = {
  hidden: { opacity: 0, x: 60, rotate: -25, filter: "blur(100px)" },
  visible: {
    opacity: 1,
    x: 0,
    rotate: -35,
    filter: "blur(80px)",
    transition: { duration: 1.6, ease: luxuryEase as unknown as Easing[] },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen lg:h-[95vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A] py-28 lg:py-0 transform-gpu">

      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1.8, ease: luxuryEase as unknown as Easing[] }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none will-change-transform"
        style={{ backgroundImage: "url('/background.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A] pointer-events-none" />

      <motion.div 
        variants={beamLeftVariants}
        initial="hidden"
        animate="visible"
        className="absolute -left-36 top-1/4 h-[550px] w-[220px] rounded-full bg-gradient-to-r from-accentGold/15 to-transparent pointer-events-none will-change-transform" 
      />
      <div className="absolute -left-20 top-1/3 h-[450px] w-[170px] rotate-[35deg] rounded-full bg-gradient-to-r from-white/8 to-transparent blur-[60px] pointer-events-none opacity-90" />

      <motion.div 
        variants={beamRightVariants}
        initial="hidden"
        animate="visible"
        className="absolute -right-36 top-1/4 h-[550px] w-[220px] rounded-full bg-gradient-to-l from-accentGold/15 to-transparent pointer-events-none will-change-transform" 
      />
      <div className="absolute -right-20 top-1/3 h-[450px] w-[170px] -rotate-[35deg] rounded-full bg-gradient-to-l from-white/8 to-transparent blur-[60px] pointer-events-none opacity-90" />

      <div className="absolute left-[12%] top-1/3 h-32 w-32 rounded-full bg-accentGold/10 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute right-[12%] top-1/3 h-32 w-32 rounded-full bg-accentGold/10 blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-particle absolute left-[20%] top-[20%] h-1 w-1 rounded-full bg-accentGold/60" style={{ animationDelay: "0s" }} />
        <div className="hero-particle absolute left-[75%] top-[15%] h-0.5 w-0.5 rounded-full bg-accentGold/40" style={{ animationDelay: "1.5s" }} />
        <div className="hero-particle absolute left-[45%] top-[70%] h-1 w-1 rounded-full bg-accentGold/50" style={{ animationDelay: "3s" }} />
        <div className="hero-particle absolute left-[85%] top-[55%] h-0.5 w-0.5 rounded-full bg-white/30" style={{ animationDelay: "0.8s" }} />
        <div className="hero-particle absolute left-[10%] top-[60%] h-0.5 w-0.5 rounded-full bg-accentGold/35" style={{ animationDelay: "2.2s" }} />
        <div className="hero-particle absolute left-[60%] top-[25%] h-1 w-1 rounded-full bg-accentGold/45" style={{ animationDelay: "1.1s" }} />
        <div className="hero-particle absolute left-[30%] top-[80%] h-0.5 w-0.5 rounded-full bg-white/20" style={{ animationDelay: "4s" }} />
      </div>

      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-accentGold/8 to-transparent pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full px-6 max-w-7xl mx-auto"
      >
        <div className="mx-auto flex flex-col items-center text-center">

          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.92, filter: "blur(12px)" },
              visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1, ease: luxuryEase as unknown as Easing[] } }
            }}
            className="mb-8 mt-10"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-[40px] bg-accentGold/20 scale-150 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
              <Image
                src="/logo-property.png"
                alt="Prime Property"
                width={480}
                height={140}
                className="relative h-32 w-auto object-contain drop-shadow-[0_0_40px_rgba(201,169,97,0.5)] md:h-40 lg:h-44"
                priority
              />
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accentGold/25 bg-accentGold/8 px-5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accentGold animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.18em] text-accentGold uppercase">
              Platform Properti Premium · Sumatera Utara
            </span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:text-6xl lg:text-7xl">
            Temukan Ruko &amp;{" "}
            <span className="relative inline-block text-accentGold drop-shadow-[0_0_32px_rgba(201,169,97,0.4)]">
              Villa Impian
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: luxuryEase as unknown as Easing[], delay: 0.6 }}
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent via-accentGold to-transparent rounded-full" 
              />
            </span>{" "}
            Anda
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base tracking-wide font-light">
            Platform properti premium dengan data transparan, filter canggih,
            dan katalog terlengkap di Sumatera Utara.
          </motion.p>

          <motion.div variants={itemVariants} className="w-full max-w-4xl mt-12 relative">
            <div className="absolute inset-x-0 -top-6 h-px bg-gradient-to-r from-transparent via-accentGold/50 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 -top-[7px] h-[3px] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[1px] pointer-events-none" />

            <HeroSearch />
            <div className="mt-6 flex flex-wrap justify-center items-center gap-2.5">
              <span className="text-[11px] font-semibold tracking-widest text-white/35 uppercase">Populer:</span>
              {popularKawasan.map((area, i) => (
                <motion.a
                  key={area}
                  href={`/dashboard?search=${encodeURIComponent(area)}`}
                  whileHover={{ scale: 1.04, y: -2, borderColor: "rgba(201,169,97,0.6)", backgroundColor: "rgba(201,169,97,0.12)", color: "rgb(201,169,97)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/55 block"
                >
                  {area}
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-14 grid grid-cols-3 gap-4 w-full max-w-2xl border-t border-white/8 pt-10">
            {[
              { value: "500+", label: "Properti Pilihan" },
              { value: "10+", label: "Tahun Pengalaman" },
              { value: "100%", label: "Data Terverifikasi" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, borderColor: "rgba(201,169,97,0.4)", backgroundColor: "rgba(201,169,97,0.06)", boxShadow: "0 20px 40px -15px rgba(201,169,97,0.15)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative overflow-hidden border border-white/8 bg-white/4 px-6 py-4 rounded-2xl backdrop-blur-sm cursor-pointer will-change-transform"
              >
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accentGold/20 rounded-bl-none rounded-tr-2xl group-hover:border-accentGold/50 transition-colors duration-300" />
                <p className="text-2xl lg:text-3xl font-extrabold tracking-tight text-accentGold drop-shadow-[0_0_16px_rgba(201,169,97,0.4)] transition-transform duration-300 group-hover:scale-105">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium transition-colors duration-300 group-hover:text-white/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
    </section>
  );
}