import Section from "@/components/Section";

interface StubProps {
  title: string;
  description?: string;
}

export default function PageStub({ title, description }: StubProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 text-lg text-muted">{description}</p>}
        <p className="mt-8 inline-block rounded-md bg-primary-50 px-4 py-2 text-sm font-medium text-primary-600">
          This page is part of the foundation scaffold &mdash; full content coming soon.
        </p>
      </div>
    </Section>
  );
}
