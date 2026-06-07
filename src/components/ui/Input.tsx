import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

export function Input({
  label,
  error,
  hint,
  icon,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-primaryBlack/80"
        >
          {label}
        </label>
      )}
      <div className="relative w-full">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-primaryBlack/35">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full rounded-xl border bg-neutralWhite px-4 py-3 text-sm text-primaryBlack outline-none transition-all placeholder:text-primaryBlack/35 focus:border-accentGold focus:ring-4 focus:ring-accentGold/10 ${
            icon ? "pl-11" : ""
          } ${
            error
              ? "border-accentRed focus:border-accentRed focus:ring-accentRed/10"
              : "border-primaryBlack/12"
          } ${className}`}
          {...props}
        />
      </div>
      {hint && !error && (
        <p className="text-xs text-primaryBlack/45">{hint}</p>
      )}
      {error && <p className="text-xs font-medium text-accentRed">{error}</p>}
    </div>
  );
}
