import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, FileText, Maximize2 } from "lucide-react";
import Container from "../components/ui/Container";
import BrowserFrame from "../components/ui/BrowserFrame";
import Tag from "../components/ui/Tag";
import StatusBadge from "../components/ui/StatusBadge";
import Lightbox from "../components/ui/Lightbox";
import { ButtonAnchor } from "../components/ui/Button";
import { GithubIcon } from "../components/ui/BrandIcons";
import { personalDetails } from "../portfolio-details";
import {
  allProjects,
  getProject,
  isMobileShot,
  pad,
  stackLabels,
  type Project,
  type StackGroup,
} from "../lib/projects";
import NotFoundPage from "./NotFoundPage";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (project) document.title = `${project.title} — ${personalDetails.name}`;
  }, [project]);

  if (!project) return <NotFoundPage />;

  const index = allProjects.indexOf(project);
  const next = allProjects[(index + 1) % allProjects.length];
  const coverAlt = project.images.gallery.find((g) => g.src === project.images.cover)?.alt ?? "screenshot";

  return (
    <article className="pt-6 pb-16 sm:pt-8 lg:pb-24">
      <Container className="flex flex-col gap-4">
        <Link
          to={{ pathname: "/", hash: "#work" }}
          className="mb-2 inline-flex w-fit items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={15} /> Back to all work
        </Link>

        {/* Header */}
        <header className="card grid grid-cols-1 overflow-hidden lg:grid-cols-12">
          <div className="p-6 sm:p-10 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-faint">
              <span className="font-mono text-accent">{pad(index + 1)}</span>
              <span aria-hidden="true">·</span>
              <span>Case study</span>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="mt-4 text-[2rem] leading-tight font-semibold tracking-[-0.03em] sm:text-[2.5rem]">
              {project.title}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-[17px]">{project.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.links.live && (
                <ButtonAnchor href={project.links.live} variant="primary">
                  Visit live site <ArrowUpRight size={15} />
                </ButtonAnchor>
              )}
              {project.links.repo && (
                <ButtonAnchor href={project.links.repo}>
                  <GithubIcon size={16} /> Source code
                </ButtonAnchor>
              )}
              {project.links.apiDocs && (
                <ButtonAnchor href={project.links.apiDocs}>
                  <FileText size={16} /> API docs
                </ButtonAnchor>
              )}
            </div>
          </div>

          <dl className="divide-y divide-line border-t border-line bg-subtle/60 lg:col-span-5 lg:border-t-0 lg:border-l">
            <MetaRow label="Role">{project.role}</MetaRow>
            <MetaRow label="Timeline">{project.period}</MetaRow>
            <MetaRow label="Status">{project.status}</MetaRow>
            <MetaRow label="Built with">
              {[...(project.stack.frontend ?? []).slice(0, 2), ...(project.stack.backend ?? []).slice(0, 3)].join(
                " · ",
              )}
            </MetaRow>
          </dl>
        </header>

        {/* Cover */}
        <div className="card overflow-hidden bg-subtle bg-grid p-4 sm:p-8 lg:p-12">
          <BrowserFrame
            src={project.images.cover}
            alt={`${project.title} — ${coverAlt}`}
            url={project.links.live ?? `${project.slug}.app`}
            eager
            className="mx-auto max-w-5xl"
          />
        </div>

        {/* Overview + demo */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Panel title="Overview" className={project.demo ? "lg:col-span-7" : "lg:col-span-12"}>
            <p className="max-w-3xl text-[15.5px] leading-relaxed">{project.description}</p>
          </Panel>
          {project.demo && project.links.live && (
            <Panel title="Try the demo" className="lg:col-span-5">
              <DemoCard demo={project.demo} live={project.links.live} />
            </Panel>
          )}
        </div>

        {/* Highlights */}
        <Panel title="Engineering highlights">
          <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {project.highlights.map((h, i) => (
              <li key={h} className="flex gap-4 rounded-xl border border-line bg-subtle/60 p-5">
                <span className="font-mono text-[12px] text-accent">{pad(i + 1)}</span>
                <p className="text-[14.5px] leading-relaxed">{h}</p>
              </li>
            ))}
          </ol>
        </Panel>

        {/* Features + stack */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Panel title="Features" className="lg:col-span-7">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-[14.5px] leading-relaxed">
                  <Check size={15} className="mt-[3px] shrink-0 text-accent" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Tech stack" className="lg:col-span-5">
            <dl className="flex flex-col gap-5">
              {(Object.keys(project.stack) as StackGroup[]).map((group) => (
                <div key={group}>
                  <dt className="font-mono text-[11px] tracking-[0.06em] text-faint uppercase">{stackLabels[group]}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack[group]?.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>
        </div>

        {/* Gallery */}
        <Panel title="Gallery" aside={`${project.images.gallery.length} screenshots`}>
          <Gallery project={project} />
        </Panel>

        {next && next.slug !== project.slug && <NextProject project={next} index={allProjects.indexOf(next) + 1} />}
      </Container>
    </article>
  );
}

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 px-6 py-4 sm:px-8">
      <dt className="pt-0.5 font-mono text-[11px] tracking-[0.06em] text-faint uppercase">{label}</dt>
      <dd className="text-[14px] leading-relaxed">{children}</dd>
    </div>
  );
}

function Panel({
  title,
  aside,
  className = "",
  children,
}: {
  title: string;
  aside?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`card p-6 sm:p-8 ${className}`} aria-label={title}>
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {aside && <span className="font-mono text-[11.5px] text-faint">{aside}</span>}
      </div>
      {children}
    </section>
  );
}

function DemoCard({ demo, live }: { demo: NonNullable<Project["demo"]>; live: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[14.5px] text-muted">{demo.note}.</p>
      <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <CopyField label="Email" value={demo.email} />
        <CopyField label="Password" value={demo.password} />
      </dl>
      <ButtonAnchor href={live} variant="primary" className="mt-1 w-full sm:w-fit">
        Open the live app <ArrowUpRight size={15} />
      </ButtonAnchor>
    </div>
  );
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      /* clipboard blocked — the value is still selectable */
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-subtle/60 px-4 py-2.5">
      <div className="min-w-0">
        <dt className="font-mono text-[10.5px] tracking-[0.06em] text-faint uppercase">{label}</dt>
        <dd className="truncate font-mono text-[13.5px] select-all">{value}</dd>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
        className="grid size-8 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-fg"
      >
        {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
      </button>
    </div>
  );
}

function Gallery({ project }: { project: Project }) {
  const [open, setOpen] = useState<number | null>(null);
  const images = project.images.gallery;

  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => {
          const mobile = isMobileShot(img.src);
          return (
            <button key={img.src} type="button" onClick={() => setOpen(i)} className="group text-left">
              <div
                className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-line ${
                  mobile ? "bg-subtle bg-grid" : "bg-frame"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className={
                    mobile
                      ? "absolute top-4 left-1/2 w-[34%] -translate-x-1/2 rounded-xl border border-line-strong shadow-md transition-transform duration-500 group-hover:-translate-y-1"
                      : "size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  }
                />
                <span className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-md border border-line bg-surface text-fg opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 size={14} aria-hidden="true" />
                </span>
              </div>
              <p className="mt-2.5 text-[13.5px] text-muted transition-colors group-hover:text-fg">{img.alt}</p>
            </button>
          );
        })}
      </div>
      {open !== null && (
        <Lightbox images={images} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  );
}

function NextProject({ project, index }: { project: Project; index: number }) {
  return (
    <Link to={`/work/${project.slug}`} className="card group grid grid-cols-1 overflow-hidden sm:grid-cols-12">
      <div className="flex flex-col justify-center p-6 sm:col-span-7 sm:p-8">
        <p className="font-mono text-[11.5px] tracking-[0.08em] text-faint uppercase">
          <span className="text-accent">{pad(index)}</span> · Next project
        </p>
        <p className="mt-3 flex items-center gap-3 text-2xl font-semibold tracking-[-0.02em]">
          {project.title}
          <ArrowRight
            size={20}
            className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-fg"
            aria-hidden="true"
          />
        </p>
        <p className="mt-1.5 text-[14.5px] text-muted">{project.tagline}</p>
      </div>
      <div className="relative hidden min-h-44 overflow-hidden border-l border-line bg-subtle bg-grid sm:col-span-5 sm:block">
        <img
          src={project.images.cover}
          alt=""
          loading="lazy"
          className="absolute top-6 left-6 w-[140%] max-w-none rounded-lg border border-line-strong shadow-md transition-transform duration-500 group-hover:-translate-y-1"
        />
      </div>
    </Link>
  );
}
