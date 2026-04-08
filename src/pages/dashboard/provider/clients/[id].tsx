import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ClientDetailView } from "@/components/dashboard/provider/ClientDetailView";

export default function ProviderClientDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <SEO
        title="Client Detail - Provider Dashboard - Vetto"
        description="View complete client details, quotes, documents, and timeline"
      />
      <ProviderLayout>
        <ClientDetailView clientId={id as string} />
      </ProviderLayout>
    </>
  );
}