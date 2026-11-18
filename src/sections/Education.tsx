import type { ReactNode } from "react";
import { Award, GraduationCap } from "lucide-react";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import { certifications, education } from "../portfolio-details";

export default function Education() {
  return (
    <section id="education" aria-label="Education and certifications" className="pt-20 lg:pt-28">
      <Container>
        <SectionHeader index="05" label="Education" title="Education & certifications" />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="card p-6 sm:p-8 lg:col-span-7">
            <CardTitle icon={<GraduationCap size={17} />} title="Education" />
            <ol className="relative mt-6 ml-[7px] border-l border-line">
              {education.map((e, i) => (
                <li key={e.degree} className="relative pb-8 pl-7 last:pb-0">
                  <span
                    className={`absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-surface ${
                      i === 0 ? "bg-accent" : "bg-line-strong"
                    }`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div>
                      <h3 className="text-[16px] font-semibold">{e.degree}</h3>
                      <p className="mt-0.5 text-[14px] text-muted">{e.institution}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="font-mono text-[12.5px] text-muted tabular-nums">{e.period}</span>
                      <span className="rounded-md border border-line bg-subtle px-2 py-0.5 font-mono text-[12px]">
                        CGPA <strong className="font-semibold">{e.cgpa}</strong>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="card p-6 sm:p-8 lg:col-span-5">
            <CardTitle icon={<Award size={17} />} title="Certifications" />
            <ul className="mt-6 divide-y divide-line">
              {certifications.map((c) => (
                <li key={c.title} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                  <span className="text-[15px] font-medium">{c.title}</span>
                  <span className="text-right text-[13.5px] text-muted">{c.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CardTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent" aria-hidden="true">
        {icon}
      </span>
      <h3 className="text-[15px] font-semibold">{title}</h3>
    </div>
  );
}
