import type { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[11.5px] leading-5 text-muted">
      {children}
    </span>
  );
}
