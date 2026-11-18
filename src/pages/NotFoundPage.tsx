import { ArrowLeft } from "lucide-react";
import Container from "../components/ui/Container";
import { ButtonLink } from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <Container className="py-24 lg:py-32">
      <p className="font-mono text-xs tracking-wide text-faint uppercase">
        <span className="text-accent">404</span>
        <span className="mx-2">/</span>Not found
      </p>
      <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
        This page doesn't exist.
      </h1>
      <p className="mt-3 max-w-xl text-base text-muted">
        The link may be broken or the page may have moved.
      </p>
      <ButtonLink to="/" variant="primary" className="mt-10">
        <ArrowLeft size={16} /> Back to home
      </ButtonLink>
    </Container>
  );
}
