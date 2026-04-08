import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Permission, getPermissionName } from "@/lib/permissions";

interface PermissionCategoryCardProps {
  category: string;
  permissions: Permission[];
  getDescription: (permission: Permission) => string;
}

export function PermissionCategoryCard({
  category,
  permissions,
  getDescription,
}: PermissionCategoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {permissions.map((permission) => (
            <div
              key={permission}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">{getPermissionName(permission)}</p>
                  <p className="text-sm text-muted-foreground">
                    {getDescription(permission)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}