import { Database, FlaskConical, Layers, Monitor, Server, Wrench, type LucideIcon } from "lucide-react";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import { skills } from "../portfolio-details";

const icons: Record<string, LucideIcon> = {
  Frontend: Monitor,
  Backend: Server,
  "Data & State Management": Layers,
  "Database & Cloud": Database,
  "Testing & DevOps": FlaskConical,
  "Languages & Tools": Wrench,
};

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="pt-20 lg:pt-28">
      <Container>
        <SectionHeader
          index="04"
          label="Skills"
          title="Tools I use across the stack"
          description="What I reach for when building, testing and shipping an application."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const Icon = icons[group.title] ?? Wrench;
            return (
              <div key={group.title} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <h3 className="flex-1 text-[15px] font-semibold">{group.title}</h3>
                  <span className="font-mono text-[11.5px] text-faint">{group.items.length}</span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-subtle px-2.5 py-1 text-[13px] leading-5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
