import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { UserActivityReportView } from "@/components/dashboard/admin/UserActivityReportView";

export default function UserActivityReportPage() {
  return (
    <AdminLayout>
      <UserActivityReportView />
    </AdminLayout>
  );
}