"use client";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow-glow-sm hover:shadow-glow active:scale-95",
  secondary:
    "bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold active:scale-95",
  outline:
    "border-2 border-ink/20 hover:border-brand-400 text-ink hover:text-brand-600 bg-transparent hover:bg-brand-50 font-semibold active:scale-95",
  ghost:
    "text-ink/60 hover:text-brand-600 hover:bg-brand-50 font-semibold active:scale-95",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
