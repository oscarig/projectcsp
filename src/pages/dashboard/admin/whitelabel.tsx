import { SEO } from "@/components/SEO";
import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { WhiteLabelView } from "@/components/dashboard/admin/WhiteLabelView";

export default function AdminWhiteLabelPage() {
  return (
    <>
      <SEO
        title="White-Label Management - Admin Dashboard - Vetto"
        description="Configure white-label portals for Primary CSPs"
      />
      <AdminLayout>
        <WhiteLabelView />
      </AdminLayout>
    </>
  );
}