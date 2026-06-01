interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function Container({ children, className = "", size = "lg" }: ContainerProps) {
  return (
    <div className={`${sizeClasses[size]} mx-auto px-5 ${className}`}>
      {children}
    </div>
  );
}
