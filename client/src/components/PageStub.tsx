import { useTranslation } from "react-i18next";
import Section from "@/components/Section";

interface StubProps {
  title: string;
  description?: string;
}

export default function PageStub({ title, description }: StubProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      <Section pattern="canvas">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-neutral-heading dark:text-slate-50 sm:text-5xl">{title}</h1>
          {description && <p className="mt-4 text-lg text-neutral-body dark:text-slate-300">{description}</p>}
          <p className="mt-8 inline-block rounded-lg bg-brand-50 dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700">
            {t("pageStub.comingSoon")}
          </p>
        </div>
      </Section>
    </div>
  );
}
