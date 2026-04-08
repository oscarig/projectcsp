import { useRouter } from "next/router";
import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { ClientDetailView } from "@/components/dashboard/admin/ClientDetailView";

export default function ClientDetailPage() {
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
      <ClientDetailView clientId={id} />
    </AdminLayout>
  );
}