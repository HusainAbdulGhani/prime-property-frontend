"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 16 } },
};

export default function OverviewPage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 p-6 bg-[#fcfcfc] min-h-screen selection:bg-accentGold/30 text-gray-800"
    >
      <motion.div variants={itemVariants as Variants} className="space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-widest text-accentGold block">
          Agent Portal
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
          Good morning, Agent 👋
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          Berikut adalah ringkasan performa properti dan statistik bisnis Anda hari ini.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          variants={itemVariants as Variants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#222222] p-8 text-white flex flex-col justify-between min-h-[220px] shadow-xs group cursor-pointer border border-white/5"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accentGold/10 rounded-full blur-[80px] pointer-events-none transition-all duration-500 group-hover:bg-accentGold/20" />
          
          <div className="z-10 max-w-md space-y-4">
            <span className="inline-block bg-primaryBlack/10 backdrop-blur-md text-accentGold text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/5">
              Top Featured Property
            </span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-accentGold transition-colors duration-300">
                Modern Minimalis Family Home
              </h2>
              <p className="text-xs text-gray-400 mt-1">Jl. Meteorologi Raya, Komplek Jewel Garden, Medan</p>
            </div>
            <p className="text-xl font-black text-accentGold tracking-wide">Rp 2.450.000.000</p>
          </div>
          <div className="absolute right-6 bottom-0 top-0 w-1/3 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
            <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 21V5.25A2.25 2.25 0 0017.25 3h-10.5A2.25 2.25 0 005.25 5.25V21m16.5 0h-2.25m-14.25 0h2.25m-2.25 0h16.5M13.5 22.5a2.25 2.25 0 002.25-2.25V15a2.25 2.25 0 00-2.25-2.25h-3A2.25 2.25 0 008.25 15v5.25a2.25 2.25 0 002.25 2.25h3z" />
            </svg>
          </div>
        </motion.div>
        <div className="flex flex-col gap-4">
          <motion.div 
            variants={itemVariants as Variants}
            whileHover={{ y: -4, boxShadow: "0 4px 20px -2px rgba(26,26,26,0.05)" }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between cursor-pointer transition-all duration-200"
          >
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Properties</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight">348</p>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold bg-emerald-50/70 px-2 py-0.5 rounded-md mt-1">
                <svg className="w-3 h-3 animate-bounce" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                +12% <span className="text-gray-400 font-normal">vs last month</span>
              </span>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl text-gray-700 border border-gray-100">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v1.5H3V3z" />
              </svg>
            </div>
          </motion.div>
          <motion.div 
            variants={itemVariants as Variants}
            whileHover={{ y: -4, boxShadow: "0 4px 20px -2px rgba(26,26,26,0.05)" }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between cursor-pointer transition-all duration-200"
          >
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Revenue</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight">Rp 325M</p>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold bg-emerald-50/70 px-2 py-0.5 rounded-md mt-1">
                <svg className="w-3 h-3 animate-bounce" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                +8% <span className="text-gray-400 font-normal">vs last month</span>
              </span>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl text-gray-700 border border-gray-100">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.114-.041a3.34 3.34 0 002.247-2.114M18 10a3.34 3.34 0 00-2.247-2.114L12 7.5m0-1.5v1.5m0 0V18m0-12h-.008v.008H12V6z" />
              </svg>
            </div>
          </motion.div>
        </div>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants as Variants } className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900 tracking-tight">Recent Properties</h3>
            <button className="text-xs font-bold text-accentGold hover:underline transition-all duration-200">Lihat Semua</button>
          </div>
          <div className="space-y-3">
            {[
              { name: "Villa Permata 13", price: "Rp 5.474.206.402", status: "IN STOCK" },
              { name: "Aston Villas 11", price: "Rp 7.513.382.440", status: "SOLD OUT" },
              { name: "Pancing Hills 04", price: "Rp 2.823.307.590", status: "IN STOCK" },
            ].map((prop, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="w-11 h-11 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200/60">
                  <div className="w-full h-full bg-gray-200 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-bold text-gray-900 truncate group-hover:text-primaryBlack transition-colors">{prop.name}</p>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">{prop.price}</p>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${prop.status === 'IN STOCK' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                  {prop.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={itemVariants as Variants} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs flex flex-col justify-between min-h-[240px]">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900 tracking-tight">Revenue Overview</h3>
            <span className="text-[11px] font-medium text-gray-400">Jan - Jul</span>
          </div>
          <div className="flex items-end justify-between h-36 pt-6 px-1 gap-3">
            {[
              { month: "Jan", pxHeight: 55 },
              { month: "Feb", pxHeight: 110 },
              { month: "Mar", pxHeight: 130 },
              { month: "Apr", pxHeight: 80 },
              { month: "Jul", pxHeight: 100 },
            ].map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                <div className="w-full max-w-[28px] bg-gray-50 rounded-t-md h-full relative flex items-end border border-gray-100">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: bar.pxHeight }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.08 }}
                    className="w-full bg-primaryBlack group-hover:bg-accentGold transition-colors duration-300 rounded-t-[4px]" 
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-bold group-hover:text-gray-900 transition-colors">{bar.month}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={itemVariants as Variants} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs flex flex-col justify-between min-h-[240px]">
          <h3 className="font-bold text-gray-900 tracking-tight">Monthly Goals</h3>
          
          <div className="grid grid-cols-2 items-center gap-2 py-2 my-auto">
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Target</p>
                <p className="text-sm font-extrabold text-gray-800">Rp 10M</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Achieved</p>
                <p className="text-sm font-extrabold text-accentGold">Rp 6.5M</p>
              </div>
            </div>

            <div className="relative flex items-center justify-center aspect-square w-full max-w-[110px] mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                <motion.circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="currentColor" 
                  className="text-primaryBlack" 
                  strokeWidth="10" 
                  strokeDasharray="251.2" 
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * 65) / 100 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black text-gray-900 leading-none">65%</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
      <motion.div variants={itemVariants as Variants} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs max-w-full lg:max-w-3xl">
        <h3 className="font-bold text-gray-900 mb-4 tracking-tight">Pending Tasks</h3>
        <div className="divide-y divide-gray-100">
          {[
            { task: "Follow up with Michael regarding property inquiry", date: "May 20", done: true },
            { task: "Property Viewing with David at BSD City", date: "May 21", done: false },
            { task: "Document Review for Sunrise Villa deal", date: "May 22", done: false },
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ x: 3 }}
              className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <input 
                  type="checkbox" 
                  defaultChecked={item.done} 
                  className="rounded border-gray-300 text-primaryBlack focus:ring-primaryBlack h-4 w-4 accent-primaryBlack cursor-pointer transition-transform group-hover:scale-105 shrink-0"
                />
                <span className={`text-xs md:text-sm truncate pr-4 transition-colors ${item.done ? 'line-through text-gray-400' : 'text-gray-700 group-hover:text-black font-medium'}`}>
                  {item.task}
                </span>
              </div>
              <span className="text-[11px] text-gray-400 font-bold shrink-0">{item.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}