"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemScaleUp: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const wordItem: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: -30 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedHeading({ text, highlight }: { text: string; highlight?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const full = highlight ? text + " " + highlight : text;
  const words = full.split(" ");
  const highlightWords = highlight ? highlight.split(" ") : [];

  return (
    <motion.h2
      ref={ref}
      className="text-3xl font-extrabold tracking-tight text-primaryBlack sm:text-4xl"
      style={{ perspective: "600px" }}
      variants={wordContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, i) => {
        const isHighlight = highlightWords.includes(word);
        return (
          <motion.span
            key={i}
            variants={wordItem}
            className={`inline-block mr-[0.25em] ${isHighlight ? "text-accentGold" : ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h2>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileTap={{ scale: 0.97 }}
      className={`relative ${className ?? ""}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.12) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  suffix?: string;
}
function AnimatedCounter({ value, duration = 2000, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value, 10);
    const increment = Math.max(Math.floor(duration / end), 10);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, increment);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="text-5xl font-extrabold text-primaryBlack tracking-tight group-hover:text-accentGold transition-colors duration-300">
      {count}{suffix}
    </span>
  );
}

function MagneticAvatar({ initials }: { initials: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 25 });
  const springY = useSpring(y, { stiffness: 400, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="shrink-0">
      <motion.div
        style={{ x: springX, y: springY }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primaryBlack to-[#2d2d2d] text-accentGold font-bold text-lg shadow-sm border border-accentGold/20 cursor-pointer"
      >
        {initials}
      </motion.div>
    </div>
  );
}

function ParallaxSection({ children, offset = 40, className }: { children: React.ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

const values = [
  {
    title: "Integritas Data",
    desc: "Setiap data harga, ukuran, dan status properti disajikan apa adanya tanpa manipulasi visual. Kejujuran adalah mata uang utama kami.",
    icon: (
      <svg className="h-6 w-6 text-accentGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Profesionalisme Agen",
    desc: "Seluruh agen kami melalui sertifikasi internal dan memiliki pemahaman mendalam mengenai dinamika pasar lokal Sumatera Utara.",
    icon: (
      <svg className="h-6 w-6 text-accentGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Inovasi Digital",
    desc: "Portal internal yang responsif dan tabular memudahkan agen mencocokkan listing dengan kebutuhan spesifik klien secara real-time.",
    icon: (
      <svg className="h-6 w-6 text-accentGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Pendekatan Personal",
    desc: "Kami mendengarkan lebih banyak. Setiap negosiasi dan rekomendasi properti dipersonalisasi demi keuntungan finansial jangka panjang Anda.",
    icon: (
      <svg className="h-6 w-6 text-accentGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const milestones = [
  {
    year: "2016",
    title: "Kelahiran Prime Property",
    desc: "Didirikan di Medan dengan visi merevolusi transparansi industri real estate di Sumatera Utara.",
    details: "Berbekal keyakinan bahwa transaksi properti harus berlandaskan kejujuran data, kami memulai langkah awal dengan melayani area Medan Kota menggunakan katalog properti fisik sederhana namun verifikasi 100%.",
  },
  {
    year: "2019",
    title: "Ekspansi Wilayah & Komersial",
    desc: "Memperluas layanan ke wilayah Pancing, Krakatau, dan Deli Serdang untuk properti ruko dan pergudangan.",
    details: "Melihat pertumbuhan ekonomi yang masif di Deli Serdang dan sekitarnya, Prime Property membuka divisi komersial khusus untuk memfasilitasi bisnis retail dan pergudangan industri.",
  },
  {
    year: "2022",
    title: "Transformasi Digital Agent",
    desc: "Meluncurkan portal internal khusus agen guna menyajikan pencarian tabular instan dan filter akurat.",
    details: "Kami merevolusi cara kerja agen internal dengan membangun portal listing database terpusat. Kecepatan pencarian properti naik hingga 80%, memastikan agen dapat merespons kebutuhan pembeli secara real-time dan akurat.",
  },
  {
    year: "2026",
    title: "Pemimpin Kepercayaan Pasar",
    desc: "Menjadi rujukan utama portal agen properti di Sumut dengan komitmen nol manipulasi visual.",
    details: "Dengan mengadopsi standar modern Zillow, kami menyederhanakan data properti dan fokus pada kemudahan akses, integritas listing, serta kecepatan transaksi yang tepercaya di seluruh Sumatera Utara.",
  },
];

const team = [
  {
    name: "Hendra Wijaya",
    role: "Founder & Managing Partner",
    specialty: "Strategi Investasi & Komersial",
    bio: "15 tahun memimpin transaksi properti strategis dan pengembangan komersial di Sumatera Utara.",
    initials: "HW",
  },
  {
    name: "Sofia Siregar",
    role: "Head of Residential Sales",
    specialty: "Spesialis Medan Kota & Cemara Asri",
    bio: "Berkomitmen mencocokkan hunian impian dengan riset kebutuhan pasar keluarga muda secara mendalam.",
    initials: "SS",
  },
  {
    name: "Rian Hutapea",
    role: "Senior Property Advisor",
    specialty: "Spesialis Area Krakatau & Pancing",
    bio: "Pakar analisis pasar ruko komersial, prospek bisnis jalan raya, dan regulasi tata kota lokal.",
    initials: "RH",
  },
];

const workflows = [
  { step: "01", title: "Konsultasi & Analisis", desc: "Kami menganalisis kebutuhan spesifik bisnis atau hunian Anda secara terperinci." },
  { step: "02", title: "Penyaringan Listing", desc: "Menyaring database tabular kami untuk menemukan kecocokan ukuran dan kawasan yang 100% akurat." },
  { step: "03", title: "Survei & Transparansi Fisik", desc: "Melakukan survei lapangan langsung bersama advisor tanpa ada manipulasi visual." },
  { step: "04", title: "Finalisasi & Legalitas", desc: "Proses administrasi dan negosiasi berlandaskan asas keterbukaan penuh hingga serah terima kunci." },
];

const testimonials = [
  {
    name: "Ir. Budi Santoso",
    role: "Direktur PT Medan Industri",
    quote: "Akurasi data ukuran ruko dari Prime Property menyelamatkan rencana ekspansi gudang kami. Nol deviasi antara listing dan kenyataan lapangan!",
    rating: 5,
  },
  {
    name: "Clara Amanda",
    role: "Investor Properti Residensial",
    quote: "Sangat menyukai pendekatan tabular tanpa manipulasi foto kosmetik. Saya menghemat puluhan jam survei lapangan karena semua rincian valid.",
    rating: 5,
  },
  {
    name: "H. Faisal Akbar",
    role: "Pemilik Rantai Kuliner Khas Medan",
    quote: "Mendapatkan 3 ruko gandeng di kawasan Pancing berkat rekomendasi wilayah yang presisi dari tim advisor Prime Property. Luar biasa profesional!",
    rating: 5,
  },
];

const partners = [
  { name: "Bank Mandiri", logoText: "MANDIRI" },
  { name: "Bank BCA", logoText: "BCA" },
  { name: "Bank BRI", logoText: "BRI" },
  { name: "Husain Technology", logoText: "H TECH" },
];

export default function TentangKamiPage() {
  const [activeMilestone, setActiveMilestone] = useState(0);

  return (
    <>
      <PublicHeader />
      <PageHero
        eyebrow="TENTANG KAMI"
        title="Mendefinisikan Ulang Kepercayaan Properti"
        description="Mitra tepercaya untuk properti komersial dan hunian premium di Sumatera Utara. Berdedikasi menghadirkan transparansi penuh dan efisiensi digital."
        dark
      />

      <main className="flex-1 bg-neutralWhite blueprint-bg overflow-x-hidden">

        <section className="py-20 border-b border-primaryBlack/5 relative">

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <ParallaxSection offset={60} className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-accentGold/4 blur-3xl" >
              <div />
            </ParallaxSection>
            <ParallaxSection offset={-40} className="absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-accentGold/3 blur-3xl">
              <div />
            </ParallaxSection>
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 items-center">

              <motion.div
                className="lg:col-span-7 space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-accentGold/30 bg-accentGold/5 px-3 py-1 text-xs font-semibold text-accentGold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "backOut" }}
                >
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-accentGold"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  Kredibilitas Utama
                </motion.div>

                <AnimatedHeading
                  text="Transparansi Tanpa Kompromi,"
                  highlight="Hasil Maksimal"
                />

                <motion.p
                  className="text-base leading-relaxed text-primaryBlack/70"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Prime Property bukan sekadar agen properti biasa. Kami hadir untuk menepis bias informasi
                  yang sering membingungkan klien. Mengikuti standar industri kelas dunia, kami menyajikan
                  data properti yang ringkas, tabular, dan informatif secara presisi. Mulai dari ukuran
                  akurat, orientasi hadap, hingga kesiapan huni — tanpa trik kosmetik visual.
                </motion.p>

                <motion.div
                  className="flex flex-col gap-4 border-l-4 border-accentGold pl-5 py-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="text-lg font-medium italic text-primaryBlack">
                    &ldquo;Keputusan investasi properti terbaik lahir dari data yang jujur, bukan sekadar janji manis visual.&rdquo;
                  </p>
                  <span className="text-sm font-bold text-accentGold">— Direksi Prime Property</span>
                </motion.div>
              </motion.div>

              <motion.div
                className="lg:col-span-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                {[
                  { value: "10", suffix: "+", label: "Tahun Pengalaman", sub: "Navigasi pasar properti komersial & residensial Sumatera Utara." },
                  { value: "500", suffix: "+", label: "Properti Terjual & Disewa", sub: "Mulai dari ruko komersial strategis hingga vila hunian eksklusif.", duration: 2500 },
                  { value: "100", suffix: "%", label: "Verifikasi Data Listing", sub: "Garansi kecocokan ukuran fisik, kawasan, dan sertifikat legalitas.", span: true },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={itemScaleUp}
                    whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)" }}
                    className={`group relative rounded-2xl border border-primaryBlack/8 bg-neutralWhite p-8 shadow-sm overflow-hidden cursor-default ${stat.span ? "sm:col-span-2 lg:col-span-1" : ""}`}
                  >
                    <motion.div
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accentGold/8 to-transparent skew-x-12"
                      initial={false}
                      whileHover={{ translateX: "200%", transition: { duration: 0.6, ease: "easeInOut" } }}
                    />
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={stat.duration} />
                    <p className="mt-2 text-sm font-semibold text-primaryBlack">{stat.label}</p>
                    <p className="mt-1 text-xs text-primaryBlack/50">{stat.sub}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-softGray/30 border-b border-primaryBlack/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accentGold">NILAI UTAMA KAMI</h2>
              <AnimatedHeading text="Prinsip Kerja yang Membuat Kami Terpilih" />
              <p className="text-sm text-primaryBlack/60">
                Kami membangun reputasi berlandaskan empat pilar utama demi kepastian investasi Anda.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {values.map((v) => (
                <motion.div key={v.title} variants={itemScaleUp} className="h-full group">
                  <TiltCard className="h-full">
                    <Card padding="lg" hover className="flex flex-col justify-between h-full hover:shadow-lg hover:border-accentGold/30 transition-all duration-300">
                      <div className="space-y-4">
                        <motion.div
                          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accentGold/10"
                          whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {v.icon}
                        </motion.div>
                        <h3 className="text-lg font-bold text-primaryBlack">{v.title}</h3>
                        <p className="text-xs leading-relaxed text-primaryBlack/60">{v.desc}</p>
                      </div>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section className="py-20 border-b border-primaryBlack/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accentGold">METODE KERJA</h2>
              <AnimatedHeading text="Prosedur Transaksi Sistematis" />
              <p className="text-sm text-primaryBlack/60">
                Menjamin kenyamanan Anda di setiap langkah, dari konsultasi awal hingga serah terima kunci.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div
                className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-accentGold/30 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
                style={{ originX: 0 }}
              />

              {workflows.map((flow, idx) => (
                <motion.div
                  key={flow.step}
                  variants={itemScaleUp}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group rounded-3xl border border-primaryBlack/8 bg-neutralWhite p-8 shadow-sm cursor-default"
                  >
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: "0 0 0 1.5px rgba(var(--accentGold-rgb, 212,175,55), 0.45)" }}
                  />
                  <div className="relative mb-5 flex items-center gap-3">
                    <motion.div
                      className="h-8 w-8 rounded-full bg-accentGold/15 border border-accentGold/30 flex items-center justify-center"
                      whileHover={{ scale: 1.2 }}
                    >
                      <span className="text-xs font-black text-accentGold">{flow.step}</span>
                    </motion.div>
                    {idx < workflows.length - 1 && (
                      <div className="lg:hidden flex-1 h-px bg-accentGold/20" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-primaryBlack group-hover:text-accentGold transition-colors duration-200">
                      {flow.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-primaryBlack/60 font-medium">{flow.desc}</p>
                  </div>
                  <span className="absolute bottom-4 right-6 text-5xl font-black text-accentGold/8 group-hover:text-accentGold/18 transition-colors select-none">
                    {flow.step}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          </section>
        <section className="py-20 bg-softGray/20 border-b border-primaryBlack/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="max-w-3xl mb-16 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accentGold">REKAM JEJAK</h2>
              <AnimatedHeading text="Perjalanan Menuju Profesionalisme Digital" />
              <p className="text-sm text-primaryBlack/60">
                Klik tahun-tahun di bawah untuk melihat tonggak penting sejarah perkembangan Prime Property.
              </p>
            </motion.div>

            <div className="grid gap-10 lg:grid-cols-12 items-start">
              <motion.div
                className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-l border-primaryBlack/10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                {milestones.map((item, idx) => (
                  <motion.button
                    key={item.year}
                    onClick={() => setActiveMilestone(idx)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.96 }}
                    className={`flex items-center gap-4 py-3 px-4 rounded-xl text-left transition-all shrink-0 lg:shrink lg:border-l-2 lg:-ml-[2px] ${
                      activeMilestone === idx
                        ? "bg-accentGold/10 text-primaryBlack font-bold lg:border-accentGold"
                        : "text-primaryBlack/40 hover:text-primaryBlack hover:bg-softGray/50 lg:border-transparent"
                    }`}
                  >
                    <span className={`text-xl font-extrabold transition-colors ${activeMilestone === idx ? "text-accentGold" : ""}`}>
                      {item.year}
                    </span>
                    <span className="hidden sm:inline text-xs font-semibold">{item.title}</span>
                    {activeMilestone === idx && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-accentGold"
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>

              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMilestone}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-3xl border border-accentGold/20 bg-neutralWhite p-8 lg:p-10 shadow-sm relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute top-0 right-0 h-56 w-56 bg-accentGold/5 rounded-full blur-3xl -z-10"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.span
                      className="text-7xl font-extrabold text-accentGold/8 absolute top-4 right-8 select-none"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {milestones[activeMilestone].year}
                    </motion.span>
                    <div className="space-y-4">
                      <motion.span
                        className="inline-block rounded-lg bg-accentGold/10 px-3 py-1 text-xs font-bold text-accentGold"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15, ease: "backOut" }}
                      >
                        Milestone {milestones[activeMilestone].year}
                      </motion.span>
                      <motion.h3
                        className="text-2xl font-bold text-primaryBlack"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {milestones[activeMilestone].title}
                      </motion.h3>
                      <motion.p
                        className="text-base text-primaryBlack/80 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                      >
                        {milestones[activeMilestone].desc}
                      </motion.p>
                      <div className="h-px bg-primaryBlack/5 my-4" />
                      <motion.p
                        className="text-sm leading-relaxed text-primaryBlack/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {milestones[activeMilestone].details}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 border-b border-primaryBlack/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accentGold">TESTIMONI KLIEN</h2>
              <AnimatedHeading text="Apa Kata Mitra Bisnis & Investor Kami" />
              <p className="text-sm text-primaryBlack/60">
                Ulasan jujur dari klien premium yang mempercayakan kebutuhan asetnya kepada Prime Property.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={itemScaleUp}
                  whileHover={{ y: -8, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                  className="flex flex-col justify-between rounded-3xl border border-primaryBlack/8 bg-neutralWhite p-8 shadow-sm hover:border-accentGold/30 hover:shadow-xl transition-[border,shadow] duration-300"
                >
                  <div className="space-y-4">
                    <motion.div
                      className="flex gap-1"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: i * 0.15 } } }}
                    >
                      {[...Array(t.rating)].map((_, si) => (
                        <motion.svg
                          key={si}
                          variants={{ hidden: { opacity: 0, scale: 0, rotate: -30 }, visible: { opacity: 1, scale: 1, rotate: 0 } }}
                          transition={{ type: "spring", stiffness: 500, damping: 18 }}
                          className="h-4 w-4 text-accentGold"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </motion.div>
                    <p className="text-sm font-medium leading-relaxed text-primaryBlack/80 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 border-t border-primaryBlack/5 pt-4">
                    <p className="text-sm font-bold text-primaryBlack">{t.name}</p>
                    <p className="text-xs text-primaryBlack/50 font-semibold">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section className="py-20 border-b border-primaryBlack/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accentGold">TIM PROFESIONAL</h2>
              <AnimatedHeading text="Dipimpin oleh Agen & Advisor Elit Terbaik" />
              <p className="text-sm text-primaryBlack/60">
                Konsultan berdedikasi tinggi yang siap membantu menyusun strategi portofolio aset Anda.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={itemScaleUp}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                  className="group rounded-3xl border border-primaryBlack/8 bg-neutralWhite p-6 shadow-sm transition-[border,shadow] duration-300 hover:shadow-xl hover:border-accentGold/40"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <MagneticAvatar initials={member.initials} />
                    <div>
                      <h3 className="font-bold text-primaryBlack text-lg group-hover:text-accentGold transition-colors duration-200">
                        {member.name}
                      </h3>
                      <p className="text-xs font-medium text-primaryBlack/50">{member.role}</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs leading-relaxed text-primaryBlack/70">
                    <motion.div
                      className="inline-block rounded-md bg-softGray px-2.5 py-1 font-semibold text-primaryBlack/70"
                      whileHover={{ scale: 1.04 }}
                    >
                      {member.specialty}
                    </motion.div>
                    <p className="text-sm text-primaryBlack/65 leading-relaxed">{member.bio}</p>
                    <div className="h-px bg-primaryBlack/5 pt-2" />
                    <div className="flex gap-2.5">
                      <motion.a
                        href="https://wa.me/628123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-primaryBlack/8 bg-softGray/50 py-2.5 font-bold text-primaryBlack transition-all hover:bg-accentGold hover:text-primaryBlack hover:border-accentGold"
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </motion.a>
                      <motion.a
                        href="mailto:advisor@primeproperty.id"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        className="flex items-center justify-center rounded-xl border border-primaryBlack/8 bg-softGray/30 p-2.5 text-primaryBlack transition-all hover:bg-primaryBlack hover:text-neutralWhite hover:border-primaryBlack"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-softGray/20 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.p
              className="text-center text-xs font-bold uppercase tracking-[0.25em] text-primaryBlack/40 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              MITRA STRATEGIS PERBANKAN & DEVELOPER
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {partners.map((p) => (
                <motion.div
                  key={p.name}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 0.55, y: 0 } }}
                  whileHover={{ opacity: 1, scale: 1.08, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center grayscale hover:grayscale-0 transition-all duration-300 cursor-default"
                >
                  <span className="text-xl font-black tracking-[0.2em] text-primaryBlack/70 select-none">
                    {p.logoText}
                  </span>
                  <span className="text-[10px] tracking-wider text-primaryBlack/45 mt-0.5 uppercase">
                    {p.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </main>
      <PublicFooter />
    </>
  );
}