import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { KYBVerificationView } from "@/components/dashboard/admin/KYBVerificationView";

export default function KYBQueuePage() {
  return (
    <AdminLayout>
      <KYBVerificationView />
    </AdminLayout>
  );
}