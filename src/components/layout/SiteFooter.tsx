import Container from "../ui/Container";
import { personalDetails } from "../../portfolio-details";

const year = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-3 py-8 font-mono text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {personalDetails.name}. Built with React, TypeScript & Tailwind CSS.
        </p>
        <p>{personalDetails.location}, India</p>
      </Container>
    </footer>
  );
}
