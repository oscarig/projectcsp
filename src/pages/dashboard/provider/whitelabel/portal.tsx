import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { WhiteLabelPortalView } from "@/components/dashboard/provider/WhiteLabelPortalView";
import { SEO } from "@/components/SEO";

export default function WhiteLabelPortalPage() {
  return (
    <>
      <SEO title="Client Portal - CSP Dashboard" description="Configure your white-label client portal" />
      <ProviderLayout>
        <WhiteLabelPortalView />
      </ProviderLayout>
    </>
  );
}