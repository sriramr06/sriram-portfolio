import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Image = { src: string; alt: string };
type Props = {
  images: readonly Image[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

/** Full-screen image viewer: Esc closes, arrow keys navigate. Tall screenshots scroll. */
export default function Lightbox({ images, index, onChange, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const image = images[index];
  const count = images.length;

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % count);
      if (e.key === "ArrowLeft") onChange((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onChange, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [index]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-50 flex flex-col bg-[#0e0e0e]/95 text-[#ecebe6]"
    >
      <div className="flex h-14 shrink-0 items-center justify-between gap-4 px-4 sm:px-6">
        <p className="truncate text-sm">
          <span className="mr-3 font-mono text-xs text-[#8a877f] tabular-nums">
            {index + 1} / {count}
          </span>
          {image.alt}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-9 shrink-0 place-items-center rounded-md hover:bg-white/10"
        >
          <X size={20} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="relative flex-1 overflow-auto px-4 pb-6 sm:px-20"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="mx-auto h-auto max-w-full rounded-lg md:max-w-[min(100%,1440px)]"
        />
      </div>

      {count > 1 && (
        <>
          <NavButton side="left" onClick={() => onChange((index - 1 + count) % count)} />
          <NavButton side="right" onClick={() => onChange((index + 1) % count)} />
        </>
      )}
    </div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#1a1a19] hover:bg-[#262624] sm:grid ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <Icon size={20} />
    </button>
  );
}
