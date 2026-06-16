import { useTranslation } from "react-i18next";
import PageStub from "@/components/PageStub";
import { useSEO } from "@/utils/useSEO";

export default function Jobs() {
  const { t } = useTranslation();
  useSEO({
    title: "Jobs & opportunities",
    description: "A job board and talent directory connecting refugees in Kakuma with global employers.",
  });
  return (
    <PageStub
      title={t("jobs.hero.title")}
      description={t("jobs.hero.subtitle")}
    />
  );
}
