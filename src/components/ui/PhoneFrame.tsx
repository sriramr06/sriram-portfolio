type Props = { src: string; alt: string; className?: string };

/** Minimal phone bezel around a 390×844 screenshot. */
export default function PhoneFrame({ src, alt, className = "" }: Props) {
  return (
    <figure
      className={`overflow-hidden rounded-[1.75rem] border-[5px] border-fg/90 bg-fg shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)] dark:border-[#3a3936] dark:bg-[#3a3936] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={390}
        height={844}
        loading="lazy"
        decoding="async"
        className="block aspect-[390/844] w-full rounded-[1.4rem] object-cover object-top"
      />
    </figure>
  );
}
