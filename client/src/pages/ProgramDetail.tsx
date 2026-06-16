import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageStub from "@/components/PageStub";
export default function ProgramDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  return <PageStub title={t("common.comingSoon")} description={`${t("programs.programLabel", { n: id })}`} />;
}
