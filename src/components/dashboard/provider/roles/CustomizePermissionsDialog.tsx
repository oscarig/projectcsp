import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Permission,
  getRoleName,
  getPermissionName,
  groupPermissionsByCategory,
} from "@/lib/permissions";

interface CustomizePermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRole: string;
  customPermissions: Permission[];
  onTogglePermission: (permission: Permission) => void;
  onSave: () => void;
  getDescription: (permission: Permission) => string;
}

export function CustomizePermissionsDialog({
  open,
  onOpenChange,
  selectedRole,
  customPermissions,
  onTogglePermission,
  onSave,
  getDescription,
}: CustomizePermissionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize {getRoleName(selectedRole as any)} Permissions</DialogTitle>
          <DialogDescription>
            Select which permissions this role should have. Changes will affect all users with this role.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {Object.entries(groupPermissionsByCategory(Object.values(Permission))).map(
            ([category, perms]) => (
              <div key={category} className="space-y-3">
                <h3 className="font-medium text-sm">{category}</h3>
                <div className="space-y-2">
                  {perms.map((permission) => (
                    <div
                      key={permission}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={customPermissions.includes(permission)}
                          onCheckedChange={() => onTogglePermission(permission)}
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {getPermissionName(permission)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {getDescription(permission)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}