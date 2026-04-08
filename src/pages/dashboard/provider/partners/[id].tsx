import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { PartnerDetailView } from "@/components/dashboard/provider/PartnerDetailView";

export default function PartnerDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <SEO title="Partner Details - CSP Dashboard" />
      <ProviderLayout>
        <PartnerDetailView partnerId={id as string} />
      </ProviderLayout>
    </>
  );
}