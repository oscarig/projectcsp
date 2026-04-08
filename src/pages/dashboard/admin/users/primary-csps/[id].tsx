import { useRouter } from "next/router";
import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { PrimaryCSPDetailView } from "@/components/dashboard/admin/PrimaryCSPDetailView";

export default function PrimaryCSPDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PrimaryCSPDetailView cspId={id} />
    </AdminLayout>
  );
}