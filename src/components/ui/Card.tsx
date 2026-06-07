import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-primaryBlack/8 bg-neutralWhite shadow-card ${
        hover
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-primaryBlack/15"
          : ""
      } ${paddingMap[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
