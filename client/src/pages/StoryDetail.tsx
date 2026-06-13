import { useParams } from "react-router-dom";
import PageStub from "@/components/PageStub";
export default function StoryDetail() {
  const { id } = useParams();
  return <PageStub title="Story detail" description={`Story id: ${id}`} />;
}
