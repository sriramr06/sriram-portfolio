import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import Container from "../ui/Container";
import { personalDetails } from "../../portfolio-details";
import { useTheme } from "../../lib/theme";
import { useActiveSection } from "../../lib/useActiveSection";

const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
] as const;
const navIds = [...nav.map((n) => n.id), "contact"];

export default function SiteHeader() {
  const { pathname } = useLocation();
  const active = useActiveSection(navIds, pathname === "/");
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3" aria-label="Home">
          <span className="grid size-9 place-items-center rounded-lg bg-fg font-mono text-[13px] font-semibold text-bg">
            SR
          </span>
          <span className="leading-tight">
            <span className="block text-[14px] font-semibold">{personalDetails.name}</span>
            <span className="block text-[12px] text-faint">{personalDetails.title}</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-xl border border-line bg-surface p-1 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.id}
              to={{ pathname: "/", hash: `#${item.id}` }}
              aria-current={active === item.id ? "true" : undefined}
              className={`rounded-lg px-3.5 py-1.5 text-[13.5px] transition-colors ${
                active === item.id ? "bg-subtle text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeButton theme={theme} onToggle={toggle} />
          <Link
            to={{ pathname: "/", hash: "#contact" }}
            className="hidden h-9 items-center rounded-lg bg-fg px-4 text-[13.5px] font-medium text-bg transition-colors hover:bg-fg/85 sm:inline-flex"
          >
            Get in touch
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-muted hover:text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" className="border-t border-line lg:hidden" aria-label="Mobile">
          <Container className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3">
            {[...nav, { id: "contact", label: "Contact" } as const].map((item) => (
              <Link
                key={item.id}
                to={{ pathname: "/", hash: `#${item.id}` }}
                onClick={() => setOpen(false)}
                className="rounded-lg border border-line bg-surface px-4 py-3 text-[14px]"
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}

function ThemeButton({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-fg"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
