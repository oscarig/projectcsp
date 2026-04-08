import { useRouter } from "next/router";
import { ClientLayout } from "@/components/dashboard/client/Layout";
import { EngagementDetailView } from "@/components/dashboard/client/EngagementDetailView";

export default function ClientEngagementDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ClientLayout>
      <EngagementDetailView />
    </ClientLayout>
  );
}