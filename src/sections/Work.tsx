import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import PhoneFrame from "../components/ui/PhoneFrame";
import Tag from "../components/ui/Tag";
import StatusBadge from "../components/ui/StatusBadge";
import { ButtonAnchor, ButtonLink } from "../components/ui/Button";
import { GithubIcon } from "../components/ui/BrandIcons";
import { allProjects, mobileShot, pad, stackSummary, type Project } from "../lib/projects";

export default function Work() {
  return (
    <section id="work" aria-label="Selected work" className="pt-20 lg:pt-28">
      <Container>
        <SectionHeader
          index="02"
          label="Selected work"
          title="Projects I've designed, built and shipped solo"
          description="From requirements and database design to tests and deployment. Open a project for the full case study."
        />
        <div className="flex flex-col gap-4">
          {allProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const phone = mobileShot(project);
  const caseStudy = `/work/${project.slug}`;

  return (
    <article className="card grid grid-cols-1 overflow-hidden lg:grid-cols-12" aria-labelledby={`p-${project.slug}`}>
      <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 xl:p-10">
        <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-faint">
          <span className="font-mono text-accent">{pad(index)}</span>
          <span aria-hidden="true">·</span>
          <span>{project.period}</span>
          <StatusBadge status={project.status} />
        </div>

        <h3 id={`p-${project.slug}`} className="mt-4 text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
          <Link to={caseStudy} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.tagline}</p>

        <ul className="mt-6 space-y-3">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-3 text-[14px] leading-relaxed">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                <Check size={12} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {stackSummary(project).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-6 lg:mt-auto">
          <ButtonLink to={caseStudy} variant="primary">
            Case study <ArrowRight size={16} />
          </ButtonLink>
          {project.links.live && (
            <ButtonAnchor href={project.links.live}>
              Live site <ArrowUpRight size={15} />
            </ButtonAnchor>
          )}
          {project.links.repo && (
            <ButtonAnchor href={project.links.repo} aria-label={`${project.title} source code on GitHub`}>
              <GithubIcon size={16} /> Code
            </ButtonAnchor>
          )}
        </div>
      </div>

      <Link
        to={caseStudy}
        aria-label={`${project.title} case study`}
        className="group relative block min-h-64 overflow-hidden border-t border-line bg-subtle bg-grid sm:min-h-96 lg:col-span-7 lg:min-h-[30rem] lg:border-t-0 lg:border-l"
      >
        <div className="absolute top-8 left-8 w-[150%] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 sm:top-10 sm:left-10 sm:w-[118%] lg:top-12 lg:left-12">
          <div className="overflow-hidden rounded-xl border border-line-strong bg-frame shadow-[0_16px_40px_-16px_rgba(0,0,0,0.3)]">
            <div className="flex h-7 items-center gap-1.5 border-b border-line px-3" aria-hidden="true">
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
            </div>
            <img
              src={project.images.cover}
              alt={`${project.title} screenshot`}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              className="block w-full"
            />
          </div>
        </div>
        {phone && (
          <PhoneFrame
            src={phone.src}
            alt={phone.alt}
            className="absolute right-6 bottom-6 hidden w-36 transition-transform duration-500 ease-out group-hover:-translate-y-2.5 sm:block xl:w-40"
          />
        )}
      </Link>
    </article>
  );
}
