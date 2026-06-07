import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "default" | "inverted" | "clean-dark";
  size?: "sm" | "md" | "lg" | "xl" | "xl2";
  className?: string;
  href?: string;
}

const sizeMap = {
  sm: { height: 40, className: "h-10 w-auto" },
  md: { height: 56, className: "h-12 w-auto md:h-14" },
  lg: { height: 80, className: "h-20 w-auto md:h-24" },
  xl: { height: 140, className: "h-32 w-auto md:h-40" },
  xl2: { height: 200, className: "h-44 w-auto md:h-56" },
} as const;

export function Logo({
  variant = "default",
  size = "md",
  className = "",
  href = "/",
}: LogoProps) {
  const dimensions = sizeMap[size];

  const getVariantClass = () => {
    switch (variant) {
      case "inverted":
        return "mix-blend-multiply contrast-125 hover:brightness-95";
      case "clean-dark":
        return "invert brightness-200 hover:opacity-90";
      case "default":
      default:
        return "hover:opacity-90";
    }
  };

  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center transition-all duration-300 hover:scale-[1.02] ${className}`}
      aria-label="Prime Property — Beranda"
    >
      <Image
        src="/logo-property.png"
        alt="Prime Property"
        width={500}
        height={dimensions.height}
        priority={size === "lg" || size === "xl" || size === "xl2"}
        className={`${dimensions.className} object-contain object-left transition-all duration-300 ${getVariantClass()}`}
      />
    </Link>
  );
}