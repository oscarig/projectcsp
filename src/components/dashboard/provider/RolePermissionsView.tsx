import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Edit } from "lucide-react";
import {
  Role,
  Permission,
  getRoleName,
  groupPermissionsByCategory,
  rolePermissions
} from "@/lib/permissions";
import { RoleCard } from "./roles/RoleCard";
import { PermissionCategoryCard } from "./roles/PermissionCategoryCard";
import { RestrictedPermissionsCard } from "./roles/RestrictedPermissionsCard";
import { CustomizePermissionsDialog } from "./roles/CustomizePermissionsDialog";
import { getPermissionDescription } from "./roles/permissionDescriptions";
import { getMissingPermissions } from "./roles/utils";

interface RoleConfig {
  role: Role;
  description: string;
  userCount: number;
  color: string;
}

export function RolePermissionsView() {
  const [selectedRole, setSelectedRole] = useState<Role>(Role.ADMIN);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [customPermissions, setCustomPermissions] = useState<Permission[]>([]);

  const roles: RoleConfig[] = [
    {
      role: Role.ADMIN,
      description: "Full access to all platform features and settings",
      userCount: 2,
      color: "bg-red-500"
    },
    {
      role: Role.PARTNER_MANAGER,
      description: "Manage partners and assign engagements",
      userCount: 3,
      color: "bg-blue-500"
    },
    {
      role: Role.ENGAGEMENT_MANAGER,
      description: "Manage client engagements and documents",
      userCount: 5,
      color: "bg-green-500"
    },
    {
      role: Role.VIEWER,
      description: "Read-only access to all data",
      userCount: 2,
      color: "bg-gray-500"
    }
  ];

  const selectedRoleConfig = roles.find(r => r.role === selectedRole);
  const permissions = rolePermissions[selectedRole];
  const groupedPermissions = groupPermissionsByCategory(permissions);

  const handleCustomizeRole = () => {
    setCustomPermissions([...permissions]);
    setEditDialogOpen(true);
  };

  const toggleCustomPermission = (permission: Permission) => {
    setCustomPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const saveCustomPermissions = () => {
    console.log("Saving custom permissions:", customPermissions);
    setEditDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Role & Permissions</h1>
        <p className="text-muted-foreground mt-1">
          Manage user roles and configure granular permissions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Role List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Roles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {roles.map((roleConfig) => (
              <RoleCard
                key={roleConfig.role}
                role={roleConfig.role}
                roleName={getRoleName(roleConfig.role)}
                description={roleConfig.description}
                userCount={roleConfig.userCount}
                color={roleConfig.color}
                isSelected={selectedRole === roleConfig.role}
                onClick={() => setSelectedRole(roleConfig.role)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Right Column - Permissions Detail */}
        <div className="md:col-span-2 space-y-6">
          {/* Role Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${selectedRoleConfig?.color}`} />
                  <div>
                    <CardTitle>{getRoleName(selectedRole)}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedRoleConfig?.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleCustomizeRole}>
                  <Edit className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{selectedRoleConfig?.userCount} users have this role</span>
              </div>
            </CardContent>
          </Card>

          {/* Permissions by Category */}
          {Object.entries(groupedPermissions).map(([category, perms]) => (
            <PermissionCategoryCard
              key={category}
              category={category}
              permissions={perms}
              getDescription={getPermissionDescription}
            />
          ))}

          {/* Restricted Permissions */}
          <RestrictedPermissionsCard permissions={getMissingPermissions(selectedRole)} />
        </div>
      </div>

      {/* Customize Permissions Dialog */}
      <CustomizePermissionsDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        selectedRole={selectedRole}
        customPermissions={customPermissions}
        onTogglePermission={toggleCustomPermission}
        onSave={saveCustomPermissions}
        getDescription={getPermissionDescription}
      />
    </div>
  );
}