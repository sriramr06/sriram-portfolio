import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import Container from "../components/ui/Container";
import { GithubIcon, LinkedinIcon } from "../components/ui/BrandIcons";
import { personalDetails } from "../portfolio-details";

const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export default function Contact() {
  const links = [
    { label: "Email", value: personalDetails.email, href: `mailto:${personalDetails.email}`, icon: <Mail size={16} /> },
    {
      label: "Phone",
      value: personalDetails.mobile,
      href: `tel:${personalDetails.mobile.replace(/\s/g, "")}`,
      icon: <Phone size={16} />,
    },
    { label: "GitHub", value: strip(personalDetails.github), href: personalDetails.github, icon: <GithubIcon size={16} /> },
    {
      label: "LinkedIn",
      value: strip(personalDetails.linkedin),
      href: personalDetails.linkedin,
      icon: <LinkedinIcon size={16} />,
    },
  ];

  return (
    <section id="contact" aria-label="Contact" className="pt-20 pb-16 lg:pt-28 lg:pb-24">
      <Container>
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-fg text-bg lg:grid-cols-12">
          <div className="flex flex-col p-6 sm:p-10 lg:col-span-7">
            <p className="flex items-center gap-2.5 font-mono text-[11.5px] tracking-[0.08em] text-bg/60 uppercase">
              <span>06</span>
              <span className="h-px w-5 bg-bg/40" aria-hidden="true" />
              <span>Contact</span>
            </p>
            <h2 className="mt-4 max-w-lg text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] sm:text-4xl">
              Have a role or a project in mind? Let's talk.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-bg/70">
              I'm happy to talk about full-stack or backend roles, or about anything I've built here.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5 lg:mt-auto lg:pt-10">
              <a
                href={`mailto:${personalDetails.email}`}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-bg px-4 text-sm font-medium text-fg transition-opacity hover:opacity-90"
              >
                <Mail size={16} /> Send an email
              </a>
              <CopyEmail email={personalDetails.email} />
            </div>
          </div>

          <div className="border-t border-bg/15 p-3 sm:p-4 lg:col-span-5 lg:border-t-0 lg:border-l">
            <ul className="flex h-full flex-col">
              {links.map((l) => (
                <ContactRow key={l.label} {...l} />
              ))}
              <li className="flex items-center gap-4 rounded-xl px-4 py-4 text-bg/70">
                <span className="grid size-9 place-items-center rounded-lg border border-bg/15">
                  <MapPin size={16} />
                </span>
                <span className="text-[14px]">{personalDetails.location}, India</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({ label, value, href, icon }: { label: string; value: string; href: string; icon: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-colors hover:bg-bg/10"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-bg/15">{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[11px] tracking-[0.06em] text-bg/55 uppercase">{label}</span>
          <span className="block truncate text-[14.5px]">{value}</span>
        </span>
        <ArrowUpRight size={16} className="shrink-0 text-bg/40 transition-colors group-hover:text-bg" aria-hidden="true" />
      </a>
    </li>
  );
}

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
        } catch {
          /* clipboard blocked */
        }
      }}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-bg/25 px-4 text-sm font-medium transition-colors hover:bg-bg/10"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
