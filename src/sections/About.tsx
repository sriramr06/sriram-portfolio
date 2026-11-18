import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import { education, experience, personalDetails } from "../portfolio-details";

const exploring = ["Backend architecture", "System design", "Data modelling", "Application security"];

/** Splits the about text into a lead sentence and two body paragraphs. */
function splitAbout(text: string) {
  const sentences = text.trim().split(/(?<=[.!?])\s+/);
  const lead = sentences[0] ?? "";
  const rest = sentences.slice(1);
  const mid = Math.ceil(rest.length / 2);
  return { lead, paragraphs: [rest.slice(0, mid).join(" "), rest.slice(mid).join(" ")].filter(Boolean) };
}

export default function About() {
  const { lead, paragraphs } = splitAbout(personalDetails.aboutme);
  const job = experience[0];
  const degree = education[0];

  const facts = [
    { k: "Location", v: `${personalDetails.location}, India` },
    { k: "Education", v: `MCA, ${degree.institution}`, sub: `CGPA ${degree.cgpa} · ${degree.period}` },
    { k: "Experience", v: `${job.role}`, sub: `${job.company} · ${job.period}` },
    { k: "Core stack", v: "React · Node.js · MongoDB", sub: "TypeScript end to end" },
  ];

  return (
    <section id="about" aria-label="About" className="pt-20 lg:pt-28">
      <Container>
        <SectionHeader index="01" label="About" title="A developer who likes knowing how things work underneath." />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="card p-6 sm:p-8 lg:col-span-7">
            <p className="text-lg leading-snug font-medium tracking-[-0.01em] sm:text-xl">{lead}</p>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-[11.5px] tracking-[0.08em] text-faint uppercase">Currently exploring</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {exploring.map((e) => (
                  <li
                    key={e}
                    className="rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-[13px] text-accent"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl className="card divide-y divide-line lg:col-span-5">
            {facts.map((f) => (
              <div key={f.k} className="grid grid-cols-[7rem_1fr] gap-4 px-6 py-5 sm:px-8">
                <dt className="pt-0.5 font-mono text-[11.5px] tracking-[0.06em] text-faint uppercase">{f.k}</dt>
                <dd>
                  <span className="block text-[15px] font-medium">{f.v}</span>
                  {f.sub && <span className="mt-0.5 block text-[13.5px] text-muted">{f.sub}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
