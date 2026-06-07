"use client";

import { useState, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  Variants,
  Easing,
  EasingFunction,
} from "framer-motion";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_INFO } from "@/lib/constants";

const ultraSmoothEase = [0.16, 1, 0.3, 1]; 

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: ultraSmoothEase as unknown as Easing[] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.08, delayChildren: 0.05 } 
  },
};

const itemFade: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: ultraSmoothEase as unknown as Easing[] },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
  visible: {
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: ultraSmoothEase as unknown as EasingFunction },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: ultraSmoothEase as unknown as Easing[] },
  },
};

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 120, damping: 25, mass: 1.2 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), springConfig);
  
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileTap={{ scale: 0.99 }}
      className={`relative group ${className ?? ""}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
        style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.12) 0%, transparent 60%)` }}
      />
      {children}
    </motion.div>
  );
}

function SectionHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(" ");

  return (
    <motion.h2
      ref={ref}
      className="text-xl font-extrabold text-primaryBlack tracking-tight"
      style={{ perspective: "1000px" }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 12, rotateX: -15 },
            visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: ultraSmoothEase as unknown as Easing[] } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

const contactItems = [
  {
    label: "Alamat Kantor",
    value: CONTACT_INFO.address,
    href: null,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Telepon",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Email Resmi",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    question: "Apakah data properti di website ini selalu diperbarui?",
    answer: "Ya, seluruh listing properti di portal kami terhubung langsung ke database internal agen dan diperbarui secara otomatis setiap kali ada perubahan status unit (in_stock/sold_out).",
  },
  {
    question: "Bagaimana cara menjadwalkan kunjungan survei fisik properti?",
    answer: "Anda dapat langsung menekan tombol WhatsApp pada detail properti atau menghubungi kontak agen yang tertera. Tim advisor kami akan memfasilitasi survei lapangan secara gratis.",
  },
  {
    question: "Apakah ada biaya tambahan saat bertransaksi di Prime Property?",
    answer: "Kami tidak membebankan komisi transaksi kepada pihak pembeli. Komisi agen sepenuhnya ditanggung oleh pihak penjual/developer sesuai dengan kesepakatan tertulis.",
  },
  {
    question: "Bagaimana cara menitipkan properti saya untuk dipasarkan?",
    answer: "Hubungi departemen Kemitraan kami melalui email (partner@primeproperty.id) or nomor telepon yang tertera. Agen spesialis kami akan segera melakukan verifikasi data fisik dan kelayakan sebelum listing ditayangkan.",
  },
];

const departments = [
  { name: "Layanan Pemasaran", email: "sales@primeproperty.id", desc: "Konsultasi pembelian unit komersial & hunian" },
  { name: "Kemitraan Listing", email: "partner@primeproperty.id", desc: "Kerjasama pemasaran proyek developer baru" },
  { name: "Dukungan IT Portal", email: "support@primeproperty.id", desc: "Keluhan akses akun agent & audit log" },
];

const transitDistances = [
  { destination: "Pusat Bisnis Cemara Asri", time: "8 Menit", desc: "Akses kuliner dan perkantoran elit" },
  { destination: "Gerbang Tol Bandar Selamat", time: "10 Menit", desc: "Konektivitas tol Trans-Sumatera" },
  { destination: "Stasiun KA Medan (Kota)", time: "15 Menit", desc: "Pusat transportasi kota dan KA Bandara" },
  { destination: "Bandara Internasional Kualanamu", time: "45 Menit", desc: "Akses udara domestik & internasional" },
];

const topics = [
  "Konsultasi Pembelian Ruko",
  "Pencarian Vila Eksklusif",
  "Titip Jual / Sewa Aset",
  "Konsultasi Investasi Wilayah Medan",
];

export default function KontakPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const getWhatsAppLink = () => {
    const baseText = `Halo Prime Property, saya ingin menjadwalkan konsultasi mengenai "${selectedTopic}".`;
    const dateText = scheduleDate ? `\nTanggal: ${scheduleDate}` : "";
    const timeText = scheduleTime ? `\nWaktu: ${scheduleTime}` : "";
    const fullText = encodeURIComponent(`${baseText}${dateText}${timeText}\nMohon hubungi saya kembali.`);
    return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${fullText}`;
  };

  return (
    <>
      <PublicHeader />
      <PageHero
        eyebrow="HUBUNGI KAMI"
        title="Konsultasi Properti Tanpa Batas"
        description="Tim advisor Prime Property siap melayani pertanyaan, penjadwalan survei, hingga negosiasi properti impian Anda secara profesional."
        dark
      />

      <main className="flex-1 bg-neutralWhite py-16 lg:py-24 blueprint-bg overflow-x-hidden">
        <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
          <motion.div
            className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accentGold/4 blur-3xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 -left-32 h-72 w-72 rounded-full bg-accentGold/3 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 25 }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-start">

            <motion.div
              className="lg:col-span-5 space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
            >
              <div className="space-y-4">
                <SectionHeading text="Informasi Kantor Pusat" />
                <motion.div
                  className="grid gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {contactItems.map((item) => (
                    <motion.div key={item.label} variants={itemFade}>
                      <TiltCard>
                        <Card
                          padding="md"
                          hover
                          className="flex items-start gap-4 hover:border-accentGold/30 transition-all duration-500 ease-out overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accentGold/5 to-transparent skew-x-12 pointer-events-none"
                            initial={false}
                            whileHover={{ translateX: "250%", transition: { duration: 0.75, ease: "easeInOut" } }}
                          />
                          <motion.div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accentGold/10 text-accentGold border border-accentGold/20"
                            whileHover={{ rotate: [0, -6, 6, -3, 0], scale: 1.05 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          >
                            {item.icon}
                          </motion.div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-primaryBlack/40">
                              {item.label}
                            </p>
                            <a
                              href={item.href ?? undefined}
                              className="mt-1 block text-sm font-bold text-primaryBlack transition-colors duration-300 hover:text-accentGold"
                            >
                              {item.value}
                            </a>
                          </div>
                        </Card>
                      </TiltCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-bold text-neutralWhite shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: ultraSmoothEase as unknown as Easing[], delay: 0.1 }}
                whileHover={{ scale: 1.015, boxShadow: "0 16px 36px -8px rgba(37,211,102,0.35)" }}
                whileTap={{ scale: 0.985 }}
              >
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  initial={false}
                  whileHover={{ translateX: "250%", transition: { duration: 0.8, ease: "easeInOut" } }}
                />
                <motion.svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  animate={{ rotate: [0, -6, 6, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </motion.svg>
                Konsultasi Langsung via WhatsApp
              </motion.a>

              <motion.div
                className="rounded-3xl border border-primaryBlack/8 overflow-hidden shadow-sm bg-softGray h-64 relative group"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: ultraSmoothEase as unknown as Easing[] }}
                whileHover={{ boxShadow: "0 20px 48px -12px rgba(0,0,0,0.12)" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.9688!2d98.683!3d3.612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031317ef!2sKrakatau%20Medan!5e0!3m2!1sid!2sid!4v17000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Prime Property Medan"
                  className="transition-transform duration-700 ease-out group-hover:scale-103"
                />
                <motion.div
                  className="absolute bottom-3 left-3 bg-primaryBlack text-neutralWhite text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-lg border border-accentGold/20 shadow-md"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  KANTOR PUSAT MEDAN
                </motion.div>
              </motion.div>

              <div className="space-y-4">
                <SectionHeading text="Aksesibilitas & Jarak Tempuh" />
                <motion.div
                  className="border border-primaryBlack/8 rounded-2xl bg-neutralWhite divide-y divide-primaryBlack/5 overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {transitDistances.map((item) => (
                    <motion.div
                      key={item.destination}
                      variants={itemFade}
                      whileHover={{ backgroundColor: "rgba(245,245,245, 0.4)", x: 3 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="p-4 flex justify-between items-center gap-4 cursor-default"
                    >
                      <div>
                        <p className="text-xs font-bold text-primaryBlack">{item.destination}</p>
                        <p className="text-[10px] text-primaryBlack/50">{item.desc}</p>
                      </div>
                      <motion.span
                        className="shrink-0 rounded-lg bg-accentGold/10 px-2.5 py-1 text-xs font-bold text-accentGold border border-accentGold/15"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(212,175,55,0.18)" }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.time}
                      </motion.span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="space-y-4">
                <SectionHeading text="Kontak Khusus Departemen" />
                <motion.div
                  className="grid gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {departments.map((dept) => (
                    <motion.div
                      key={dept.name}
                      variants={itemFade}
                      whileHover={{ y: -2, boxShadow: "0 12px 24px -10px rgba(0,0,0,0.08)", borderColor: "rgba(212,175,55,0.25)" }}
                      className="rounded-2xl border border-primaryBlack/6 bg-neutralWhite p-4 space-y-1 transition-all duration-300 ease-out cursor-default"
                    >
                      <p className="text-xs font-bold text-primaryBlack">{dept.name}</p>
                      <motion.a
                        href={`mailto:${dept.email}`}
                        className="text-xs font-semibold text-accentGold hover:underline inline-block"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {dept.email}
                      </motion.a>
                      <p className="text-[11px] text-primaryBlack/50">{dept.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-7 space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
            >
              <motion.div variants={itemFade}>
                <Card padding="lg" className="border border-accentGold/25 shadow-sm relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 right-0 h-40 w-40 bg-accentGold/6 rounded-full blur-3xl -z-10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="inline-flex items-center gap-1.5 rounded-full bg-accentGold/15 px-2.5 py-0.5 text-[10px] font-bold text-accentGold uppercase border border-accentGold/20 mb-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, ease: "backOut" }}
                  >
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-accentGold"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Fitur Interaktif
                  </motion.div>

                  <h2 className="text-xl font-extrabold text-primaryBlack tracking-tight mb-2">
                    Atur Jadwal Konsultasi Cepat
                  </h2>
                  <p className="text-xs text-primaryBlack/55 mb-6">
                    Pilih topik dan perkiraan waktu survei Anda untuk membuat link WhatsApp instan secara otomatis.
                  </p>

                  <div className="space-y-4 text-xs font-semibold text-primaryBlack">
                    <div>
                      <label className="block mb-1.5 text-primaryBlack/60">Topik Konsultasi</label>
                      <select
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        className="w-full rounded-xl border border-primaryBlack/10 bg-neutralWhite p-3 text-sm focus:border-accentGold focus:outline-none transition-all duration-300 hover:border-accentGold/30"
                      >
                        {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        { label: "Pilih Tanggal", type: "date", val: scheduleDate, set: setScheduleDate },
                        { label: "Pilih Waktu", type: "time", val: scheduleTime, set: setScheduleTime },
                      ].map(({ label, type, val, set }) => (
                        <div key={label}>
                          <label className="block mb-1.5 text-primaryBlack/60">{label}</label>
                          <input
                            type={type}
                            value={val}
                            onChange={(e) => set(e.target.value)}
                            className="w-full rounded-xl border border-primaryBlack/10 bg-neutralWhite p-3 text-sm focus:border-accentGold focus:outline-none transition-all duration-300 hover:border-accentGold/30"
                          />
                        </div>
                      ))}
                    </div>

                    <motion.a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 relative flex items-center justify-center gap-2 rounded-xl bg-accentGold px-6 py-4 text-sm font-bold text-primaryBlack shadow-sm overflow-hidden"
                      whileHover={{ scale: 1.015, boxShadow: "0 16px 32px -8px rgba(212,175,55,0.4)" }}
                      whileTap={{ scale: 0.985 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        initial={false}
                        whileHover={{ translateX: "250%", transition: { duration: 0.75, ease: "easeInOut" } }}
                      />
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Kirim Jadwal ke WhatsApp
                    </motion.a>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemFade}>
                <Card padding="lg" className="border border-primaryBlack/8 shadow-sm relative overflow-hidden">
                  <motion.div
                    className="absolute bottom-0 left-0 h-32 w-32 bg-accentGold/3 rounded-full blur-3xl -z-10"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                  <h2 className="mb-2 text-xl font-extrabold text-primaryBlack tracking-tight">
                    Kirim Pesan Melalui Form
                  </h2>
                  <p className="text-xs text-primaryBlack/55 mb-6">
                    Tuliskan kebutuhan properti Anda, tim kami akan merespons dalam waktu kurang dari 24 jam kerja.
                  </p>
                  <ContactForm />
                </Card>
              </motion.div>
              <div className="space-y-4">
                <SectionHeading text="Pertanyaan yang Sering Diajukan (FAQ)" />
                <div className="border border-primaryBlack/8 rounded-2xl bg-neutralWhite overflow-hidden divide-y divide-primaryBlack/8">
                  {faqItems.map((item, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx}>
                        <motion.button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between text-left p-5 text-sm font-bold text-primaryBlack transition-colors duration-300"
                          whileHover={{ backgroundColor: "rgba(245,245,245,0.4)" }}
                          whileTap={{ scale: 0.995 }}
                        >
                          <span>{item.question}</span>
                          <div className="shrink-0 ml-3">
                            <motion.div
                              animate={{ 
                                rotate: isOpen ? 180 : 0,
                                color: isOpen ? "rgb(212,175,55)" : "rgba(0,0,0,0.3)",
                                scale: isOpen ? 1.1 : 1 
                              }}
                              transition={{ duration: 0.4, ease: ultraSmoothEase as unknown as EasingFunction }}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </motion.div>
                          </div>
                        </motion.button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: ultraSmoothEase as unknown as EasingFunction }}
                              className="overflow-hidden"
                            >
                              <motion.div
                                initial={{ y: -6 }}
                                animate={{ y: 0 }}
                                exit={{ y: -6 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="border-t border-primaryBlack/5 bg-softGray/10"
                              >
                                <p className="p-5 text-xs leading-relaxed text-primaryBlack/65 font-medium">
                                  {item.answer}
                                </p>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}