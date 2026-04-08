/**
 * Role-Based Access Control (RBAC)
 * Defines permissions for each user role
 */

import { UserRole } from "@/types";

export type Permission =
  // User management
  | "read:users"
  | "write:users"
  | "delete:users"
  // Provider management
  | "read:providers"
  | "write:providers"
  | "approve:providers"
  // Client management
  | "read:clients"
  | "write:clients"
  // Partner management
  | "read:partners"
  | "write:partners"
  | "approve:partners"
  // Engagement management
  | "read:engagements"
  | "write:engagements"
  | "delete:engagements"
  // Document management
  | "read:documents"
  | "write:documents"
  | "delete:documents"
  | "approve:documents"
  // Financial
  | "read:billing"
  | "write:billing"
  | "read:payments"
  | "write:payments"
  // Analytics
  | "read:analytics"
  | "read:reports"
  | "export:reports"
  // Admin
  | "read:audit_logs"
  | "write:settings"
  | "manage:permissions"
  // White label
  | "read:whitelabel"
  | "write:whitelabel";

export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    // Full access to everything
    "read:users",
    "write:users",
    "delete:users",
    "read:providers",
    "write:providers",
    "approve:providers",
    "read:clients",
    "write:clients",
    "read:partners",
    "write:partners",
    "approve:partners",
    "read:engagements",
    "write:engagements",
    "delete:engagements",
    "read:documents",
    "write:documents",
    "delete:documents",
    "approve:documents",
    "read:billing",
    "write:billing",
    "read:payments",
    "write:payments",
    "read:analytics",
    "read:reports",
    "export:reports",
    "read:audit_logs",
    "write:settings",
    "manage:permissions",
    "read:whitelabel",
    "write:whitelabel",
  ],
  provider: [
    // Provider can manage their own clients and engagements
    "read:clients",
    "write:clients",
    "read:partners",
    "write:partners",
    "read:engagements",
    "write:engagements",
    "read:documents",
    "write:documents",
    "delete:documents",
    "read:billing",
    "write:billing",
    "read:analytics",
    "read:reports",
    "export:reports",
  ],
  partner: [
    // Partner has limited access to assigned engagements
    "read:engagements",
    "write:engagements",
    "read:documents",
    "write:documents",
    "read:billing",
    "read:reports",
  ],
  client: [
    // Client has read access to their own engagements
    "read:engagements",
    "read:documents",
    "write:documents", // Can upload documents
    "read:billing",
  ],
};

export function getRolePermissions(role: UserRole): Permission[] {
  return rolePermissions[role] || [];
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) || false;
}

export function canAccessResource(
  role: UserRole,
  resource: string,
  action: "read" | "write" | "delete"
): boolean {
  const permission = `${action}:${resource}` as Permission;
  return hasPermission(role, permission);
}

// Check if user can perform bulk actions
export function canPerformBulkAction(role: UserRole): boolean {
  return role === "admin" || role === "provider";
}

// Check if user can export data
export function canExportData(role: UserRole): boolean {
  return hasPermission(role, "export:reports");
}

// Check if user can approve KYB/KYC
export function canApproveVerification(role: UserRole): boolean {
  return (
    hasPermission(role, "approve:providers") ||
    hasPermission(role, "approve:partners")
  );
}

// Check if user can manage subscriptions
export function canManageSubscriptions(role: UserRole): boolean {
  return role === "admin" || hasPermission(role, "write:billing");
}

// Check if user can access admin panel
export function canAccessAdminPanel(role: UserRole): boolean {
  return role === "admin";
}

// Check if user owns a resource (for row-level security)
export function ownsResource(
  userId: string,
  resourceOwnerId: string
): boolean {
  return userId === resourceOwnerId;
}

// Combined permission check with ownership
export function canAccessOwnedResource(
  role: UserRole,
  userId: string,
  resourceOwnerId: string,
  permission: Permission
): boolean {
  // Admins can access everything
  if (role === "admin") return true;

  // Check if user has permission and owns the resource
  return hasPermission(role, permission) && ownsResource(userId, resourceOwnerId);
}