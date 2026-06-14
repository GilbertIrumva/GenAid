import PageStub from "@/components/PageStub";
import { useSEO } from "@/utils/useSEO";

export default function Volunteer() {
  useSEO({
    title: "Volunteer",
    description: "Lend your skills and time to Generation Aid — remote and in-person opportunities available.",
  });
  return <PageStub title="Volunteer" description="Lend your time and skills to our mission." />;
}
