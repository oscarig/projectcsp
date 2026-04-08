import { useRouter } from "next/router";
import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { PartnerDetailView } from "@/components/dashboard/admin/PartnerDetailView";

export default function PartnerDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") {
    return (
      <AdminLayout>
        <div className="flex h-96 items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PartnerDetailView partnerId={id} />
    </AdminLayout>
  );
}