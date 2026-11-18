import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors duration-150 h-10 px-4 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-fg/85",
  secondary: "border border-line-strong bg-surface text-fg hover:border-fg/40",
  ghost: "text-muted hover:text-fg px-2",
};

type Common = { variant?: Variant; className?: string; children: ReactNode };

/** External link styled as a button; opens in a new tab. */
export function ButtonAnchor({
  variant = "secondary",
  className = "",
  children,
  ...props
}: Common & ComponentProps<"a">) {
  const external = props.href?.startsWith("http");
  return (
    <a
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

/** In-app route link styled as a button. */
export function ButtonLink({
  variant = "secondary",
  className = "",
  children,
  to,
}: Common & { to: string }) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
