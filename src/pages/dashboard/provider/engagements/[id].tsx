import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { EngagementDetailView } from "@/components/dashboard/provider/EngagementDetailView";

export default function EngagementDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <SEO title={`Engagement ${id || ''} - CSP Dashboard`} />
      <ProviderLayout>
        <EngagementDetailView engagementId={id as string} />
      </ProviderLayout>
    </>
  );
}