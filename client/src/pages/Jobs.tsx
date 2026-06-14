import PageStub from "@/components/PageStub";
import { useSEO } from "@/utils/useSEO";

export default function Jobs() {
  useSEO({
    title: "Jobs & opportunities",
    description: "A job board and talent directory connecting refugees in Kakuma with global employers.",
  });
  return (
    <PageStub
      title="Jobs & opportunities"
      description="Coming soon: job board and talent directory connecting refugees with employers."
    />
  );
}
