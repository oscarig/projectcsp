import { Role, Permission, rolePermissions } from "@/lib/permissions";

export function getMissingPermissions(role: Role): Permission[] {
  const allPermissions = Object.values(Permission);
  const rolePerms = rolePermissions[role];
  return allPermissions.filter(p => !rolePerms.includes(p));
}