import { Link } from "react-router-dom";
import Section from "@/components/Section";
import { useSEO } from "@/utils/useSEO";

export default function NotFound() {
  useSEO({ title: "Page not found", description: "The page you are looking for does not exist." });
  return (
    <Section>
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-7xl font-bold text-primary-500">404</p>
        <h1 className="mt-4 text-2xl font-bold text-ink">Page not found</h1>
        <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600"
        >
          Back to home
        </Link>
      </div>
    </Section>
  );
}
