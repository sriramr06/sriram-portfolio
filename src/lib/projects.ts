import { projects } from "../portfolio-details";

export type StackGroup = "frontend" | "backend" | "testing" | "devops";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  period: string;
  status: string;
  featured: boolean;
  links: { live?: string; repo?: string; apiDocs?: string };
  demo?: { note: string; email: string; password: string };
  stack: Partial<Record<StackGroup, readonly string[]>>;
  features: readonly string[];
  highlights: readonly string[];
  images: {
    cover: string;
    gallery: readonly { src: string; alt: string }[];
  };
};

/** Projects widened to one shape so optional fields (demo, live…) are type-safe. */
export const allProjects: readonly Project[] = [...projects].sort(
  (a, b) => Number(b.featured) - Number(a.featured),
);

export const stackLabels: Record<StackGroup, string> = {
  frontend: "Frontend",
  backend: "Backend",
  testing: "Testing",
  devops: "DevOps & tooling",
};

export function getProject(slug: string | undefined) {
  return allProjects.find((p) => p.slug === slug);
}

/** Phone screenshots are named mobile-*. */
export function isMobileShot(src: string) {
  return /\/mobile-[^/]+$/.test(src);
}

export function mobileShot(project: Project) {
  return project.images.gallery.find((g) => isMobileShot(g.src));
}

export function stackSummary(project: Project, max = 6) {
  return [...(project.stack.frontend ?? []), ...(project.stack.backend ?? [])].slice(0, max);
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}
