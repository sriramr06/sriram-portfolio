import { Briefcase, Check } from "lucide-react";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import Tag from "../components/ui/Tag";
import { experience } from "../portfolio-details";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="pt-20 lg:pt-28">
      <Container>
        <SectionHeader
          index="03"
          label="Experience"
          title="Where I've worked"
          description="Hands-on work on a production multi-tenant SaaS."
        />

        <div className="flex flex-col gap-4">
          {experience.map((job) => (
            <article key={job.company} className="card grid grid-cols-1 overflow-hidden lg:grid-cols-12">
              <div className="flex flex-col gap-6 border-b border-line bg-subtle/60 p-6 sm:p-8 lg:col-span-4 lg:border-r lg:border-b-0">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-surface font-mono text-sm font-semibold text-accent">
                    {initials(job.company)}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.01em]">{job.role}</h3>
                    <p className="text-[15px] text-muted">{job.company}</p>
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-3 text-[13.5px]">
                  <div className="rounded-lg border border-line bg-surface px-3.5 py-2.5">
                    <dt className="font-mono text-[11px] tracking-[0.06em] text-faint uppercase">Period</dt>
                    <dd className="mt-0.5 font-medium">{job.period}</dd>
                  </div>
                  <div className="rounded-lg border border-line bg-surface px-3.5 py-2.5">
                    <dt className="font-mono text-[11px] tracking-[0.06em] text-faint uppercase">Type</dt>
                    <dd className="mt-0.5 flex items-center gap-1.5 font-medium">
                      <Briefcase size={13} className="text-faint" aria-hidden="true" />
                      {job.type}
                    </dd>
                  </div>
                </dl>

                <div>
                  <p className="font-mono text-[11px] tracking-[0.06em] text-faint uppercase">Tools</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {job.tools.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:col-span-8">
                <p className="text-[15.5px] leading-relaxed">{job.description}</p>
                <h4 className="mt-7 font-mono text-[11.5px] tracking-[0.08em] text-faint uppercase">
                  What I worked on
                </h4>
                <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3.5 md:grid-cols-2">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                      <Check size={15} className="mt-[3px] shrink-0 text-accent" aria-hidden="true" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
