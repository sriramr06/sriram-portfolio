import type { ComponentProps } from "react";

/** Full-width content column: wide on desktop, with consistent side gutters. */
export default function Container({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-10 ${className}`}
      {...props}
    />
  );
}
