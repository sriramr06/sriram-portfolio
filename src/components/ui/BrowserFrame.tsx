type Props = {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  eager?: boolean;
};

/** A quiet, neutral browser chrome around a 1440×900 screenshot. */
export default function BrowserFrame({ src, alt, url, className = "", eager }: Props) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line bg-frame shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.18)] ${className}`}
    >
      <div className="flex h-9 items-center gap-3 border-b border-line px-3.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        {url && (
          <div className="mx-auto hidden max-w-[60%] truncate rounded-md bg-bg/70 px-3 py-0.5 font-mono text-[11px] text-faint sm:block">
            {url.replace(/^https?:\/\//, "")}
          </div>
        )}
      </div>
      <img
        src={src}
        alt={alt}
        width={1440}
        height={900}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    </figure>
  );
}
