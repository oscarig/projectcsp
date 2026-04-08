import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { VerificationQueueView } from "@/components/dashboard/admin/VerificationQueueView";

export default function VerificationQueuePage() {
  return (
    <AdminLayout>
      <VerificationQueueView />
    </AdminLayout>
  );
}