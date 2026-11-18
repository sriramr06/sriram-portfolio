import type { ReactNode } from "react";

type Props = {
  index: string;
  label: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

/** Left-aligned section header used by every section, so they all line up. */
export default function SectionHeader({ index, label, title, description, action }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between lg:mb-10">
      <div className="max-w-2xl">
        <p className="flex items-center gap-2.5 font-mono text-[11.5px] tracking-[0.08em] text-accent uppercase">
          <span>{index}</span>
          <span className="h-px w-5 bg-accent/50" aria-hidden="true" />
          <span>{label}</span>
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem] sm:leading-tight">
          {title}
        </h2>
        {description && <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
