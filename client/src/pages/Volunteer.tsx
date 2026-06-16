import { useTranslation } from "react-i18next";
import PageStub from "@/components/PageStub";
import { useSEO } from "@/utils/useSEO";

export default function Volunteer() {
  const { t } = useTranslation();
  useSEO({
    title: "Volunteer",
    description: "Lend your skills and time to Generation Aid — remote and in-person opportunities available.",
  });
  return <PageStub title={t("volunteer.hero.title")} description={t("volunteer.hero.subtitle")} />;
}
