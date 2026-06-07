import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-primaryBlack/80">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`min-h-28 w-full rounded-xl border bg-neutralWhite px-4 py-3 text-sm text-primaryBlack outline-none transition-all placeholder:text-primaryBlack/35 focus:border-accentGold focus:ring-4 focus:ring-accentGold/10 ${
          error ? "border-accentRed focus:border-accentRed focus:ring-accentRed/10" : "border-primaryBlack/12"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs font-medium text-accentRed">{error}</p>}
    </div>
  );
}
