import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { CategoriesView } from "@/components/dashboard/admin/CategoriesView";

export default function AdminCategoriesPage() {
  return (
    <AdminLayout>
      <CategoriesView />
    </AdminLayout>
  );
}