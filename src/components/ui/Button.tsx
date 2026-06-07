import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "danger" | "ghost" | "dark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accentGold text-primaryBlack border border-accentGold hover:bg-accentGold/90 shadow-sm active:scale-[0.98] transition-all duration-200 font-semibold tracking-wide",
  outline:
    "bg-transparent text-accentGold border border-accentGold hover:bg-accentGold/10 active:scale-[0.98] transition-all duration-200 font-semibold tracking-wide",
  danger:
    "bg-accentRed text-neutralWhite border border-accentRed hover:bg-accentRed/95 shadow-sm active:scale-[0.98] transition-all duration-200 font-semibold",
  ghost:
    "bg-transparent text-primaryBlack border border-transparent hover:bg-softGray active:scale-[0.98] transition-all duration-200",
  dark:
    "bg-primaryBlack text-neutralWhite border border-primaryBlack hover:bg-black shadow-sm active:scale-[0.98] transition-all duration-200 font-semibold tracking-wide",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Memproses...
        </>
      ) : (
        children
      )}
    </button>
  );
}
