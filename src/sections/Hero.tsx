import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import Container from "../components/ui/Container";
import StatusBadge from "../components/ui/StatusBadge";
import { ButtonAnchor } from "../components/ui/Button";
import { GithubIcon, LinkedinIcon } from "../components/ui/BrandIcons";
import { personalDetails } from "../portfolio-details";
import { allProjects } from "../lib/projects";

// Figures from the Nexora highlights in portfolio-details.ts.
const stats = [
  { value: "444", label: "Automated tests in CI" },
  { value: "74", label: "Documented API operations" },
  { value: "46", label: "Endpoints isolation-tested" },
];

export default function Hero() {
  const featured = allProjects[0];

  return (
    <section aria-labelledby="hero-title" className="pt-6 sm:pt-10">
      <Container>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Intro */}
          <div className="card flex flex-col p-6 sm:p-10 lg:col-span-7 lg:row-span-2">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {personalDetails.title}
              </Chip>
              <Chip>
                <MapPin size={13} aria-hidden="true" />
                {personalDetails.location}
              </Chip>
            </div>

            <h1
              id="hero-title"
              className="mt-8 max-w-[18ch] text-[2.1rem] leading-[1.1] font-semibold tracking-[-0.035em] sm:text-[2.75rem] xl:text-5xl"
            >
              Full-stack developer focused on reliable, well-tested backends.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-[17px]">
              I build web applications with React and TypeScript on the frontend and Node.js, Express and
              MongoDB on the backend, with a focus on data integrity, security and automated testing.
            </p>

            <div className="mt-8 mb-10 flex flex-wrap items-center gap-2.5">
              <ButtonAnchor href="#work" variant="primary">
                View my work <ArrowRight size={16} />
              </ButtonAnchor>
              <ButtonAnchor href={`mailto:${personalDetails.email}`}>
                <Mail size={16} /> Email me
              </ButtonAnchor>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-[13.5px] text-muted">
              <SocialLink href={personalDetails.github} icon={<GithubIcon size={16} />}>
                GitHub
              </SocialLink>
              <SocialLink href={personalDetails.linkedin} icon={<LinkedinIcon size={16} />}>
                LinkedIn
              </SocialLink>
              <a href={`mailto:${personalDetails.email}`} className="hover:text-fg">
                {personalDetails.email}
              </a>
            </div>
          </div>

          {/* Featured project preview */}
          <Link
            to={`/work/${featured.slug}`}
            className="card group flex flex-col overflow-hidden lg:col-span-5"
            aria-label={`Featured project: ${featured.title}`}
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <span className="font-mono text-[11.5px] tracking-[0.08em] text-faint uppercase">
                Featured project
              </span>
              <StatusBadge status={featured.status} />
            </div>
            <div className="relative h-52 overflow-hidden border-y border-line bg-subtle bg-grid sm:h-60 lg:h-auto lg:flex-1 lg:min-h-52">
              <img
                src={featured.images.cover}
                alt=""
                width={1440}
                height={900}
                className="absolute top-6 left-6 w-[150%] max-w-none rounded-lg border border-line-strong shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:w-[125%]"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="font-semibold">{featured.title}</p>
                <p className="truncate text-[13.5px] text-muted">{featured.tagline}</p>
              </div>
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors group-hover:bg-fg group-hover:text-bg">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>

          {/* Stats */}
          <dl className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-5">
            {stats.map((s) => (
              <div key={s.label} className="card flex flex-col justify-between gap-3 p-4 sm:p-5">
                <dt className="order-2 text-[13px] leading-snug text-muted">{s.label}</dt>
                <dd className="order-1 text-2xl leading-none sm:text-[1.75rem] font-semibold tracking-[-0.03em] tabular-nums">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-subtle px-3 py-1 text-[12.5px] text-muted">
      {children}
    </span>
  );
}

function SocialLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-fg">
      {icon}
      {children}
    </a>
  );
}
