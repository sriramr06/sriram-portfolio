export default function StatusBadge({ status }: { status: string }) {
  const live = status.toLowerCase() === "live";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-[11px] text-muted">
      <span className={`size-1.5 rounded-full ${live ? "bg-accent" : "bg-faint"}`} aria-hidden="true" />
      {status}
    </span>
  );
}
