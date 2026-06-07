"use client";

import { Easing, motion } from "framer-motion";

const luxuryEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: luxuryEase as unknown as Easing[] },
  },
};

const values = [
  {
    title: "Data Akurat & Transparan",
    description:
      "Informasi properti disajikan secara lengkap tanpa manipulasi visual — fokus pada fakta yang Anda butuhkan.",
    icon: (
      <svg className="h-6 w-6 text-accentGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17v-2m3 2v-4m3 4v-6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    accent: "bg-accentGold/10",
  },
  {
    title: "Pencarian Cepat",
    description:
      "Filter berdasarkan nama, kawasan, dan tipe properti — langsung menuju katalog lengkap dengan satu klik.",
    icon: (
      <svg className="h-6 w-6 text-primaryBlack" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    accent: "bg-primaryBlack/5",
  },
  {
    title: "Lokasi Strategis",
    description:
      "Fokus pada kawasan premium di Medan dan sekitarnya dengan akses mudah ke pusat bisnis.",
    icon: (
      <svg className="h-6 w-6 text-accentGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: "bg-accentGold/10",
  },
  {
    title: "Dukungan Responsif",
    description:
      "Tim kami siap membantu via telepon, WhatsApp, dan email setiap hari kerja.",
    icon: (
      <svg className="h-6 w-6 text-accentRed" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    accent: "bg-accentRed/8",
  },
];

export function ValuePropositions() {
  return (
    <section className="border-t border-primaryBlack/6 bg-softGray py-20 lg:py-24 transform-gpu">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: luxuryEase as unknown as Easing[] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accentRed">
            Keunggulan Kami
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primaryBlack md:text-4xl">
            Mengapa Prime Property
          </h2>
        </motion.div>

        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {values.map((item) => (
            <motion.article
              key={item.title}
              variants={cardVariants}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.08)",
                borderColor: "rgba(0,0,0,0.12)"
              }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group rounded-2xl border border-primaryBlack/6 bg-neutralWhite p-6 backdrop-blur-sm cursor-pointer will-change-transform"
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-2 ${item.accent}`}
              >
                {item.icon}
              </div>
              <h3 className="mb-2 font-bold text-primaryBlack text-lg transition-colors duration-300 group-hover:text-accentGold">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-primaryBlack/60 font-normal">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}