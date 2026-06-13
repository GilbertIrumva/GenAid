import { useParams } from "react-router-dom";
import PageStub from "@/components/PageStub";
export default function ProgramDetail() {
  const { id } = useParams();
  return <PageStub title="Program detail" description={`Program id: ${id}`} />;
}
