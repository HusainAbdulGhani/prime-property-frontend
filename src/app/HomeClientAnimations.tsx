"use client";

import { Easing, EasingFunction, motion, useInView } from "framer-motion";
import { useRef } from "react";

const ultraSmoothEase = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "scaleUp";
  delay?: number;
  className?: string;
}

export function RevealOnScroll({ children, variant = "fadeUp", delay = 0, className }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.95, filter: "blur(6px)" },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)" }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ duration: 0.9, ease: ultraSmoothEase as unknown as Easing[], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerHeader({ badge, title, description }: { badge: string; title: string; description: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-primaryBlack/5 pb-4"
    >
      <div>
        <motion.p 
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: ultraSmoothEase as unknown as Easing[] } }
          }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-accentRed"
        >
          {badge}
        </motion.p>
        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(2px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: ultraSmoothEase as unknown as Easing[] } }
          }}
          className="mt-1 text-3xl font-extrabold tracking-tight text-primaryBlack md:text-4xl"
        >
          {title}
        </motion.h2>
      </div>
      <motion.p 
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ultraSmoothEase as unknown as Easing[] } }
        }}
        className="text-sm font-normal text-primaryBlack/60"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}