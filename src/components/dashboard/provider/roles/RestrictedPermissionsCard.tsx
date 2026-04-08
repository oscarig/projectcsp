import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, X } from "lucide-react";
import { Permission, getPermissionName } from "@/lib/permissions";

interface RestrictedPermissionsCardProps {
  permissions: Permission[];
}

export function RestrictedPermissionsCard({ permissions }: RestrictedPermissionsCardProps) {
  if (permissions.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5 text-muted-foreground" />
          Restricted Permissions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {permissions.slice(0, 5).map((permission) => (
            <div
              key={permission}
              className="flex items-center justify-between p-3 rounded-lg border border-dashed"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-500/10 flex items-center justify-center">
                  <X className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">
                    {getPermissionName(permission)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Not available for this role
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