// Role-based permissions system

export enum Role {
  ADMIN = "admin",
  PARTNER_MANAGER = "partner_manager",
  ENGAGEMENT_MANAGER = "engagement_manager",
  VIEWER = "viewer"
}

export enum Permission {
  // Client Management
  VIEW_CLIENTS = "view_clients",
  CREATE_CLIENTS = "create_clients",
  EDIT_CLIENTS = "edit_clients",
  DELETE_CLIENTS = "delete_clients",
  
  // Partner Management
  VIEW_PARTNERS = "view_partners",
  CREATE_PARTNERS = "create_partners",
  EDIT_PARTNERS = "edit_partners",
  DELETE_PARTNERS = "delete_partners",
  
  // Engagement Management
  VIEW_ENGAGEMENTS = "view_engagements",
  CREATE_ENGAGEMENTS = "create_engagements",
  EDIT_ENGAGEMENTS = "edit_engagements",
  DELETE_ENGAGEMENTS = "delete_engagements",
  ASSIGN_ENGAGEMENTS = "assign_engagements",
  
  // Document Management
  VIEW_DOCUMENTS = "view_documents",
  UPLOAD_DOCUMENTS = "upload_documents",
  DELETE_DOCUMENTS = "delete_documents",
  SHARE_DOCUMENTS = "share_documents",
  
  // Reports & Analytics
  VIEW_REPORTS = "view_reports",
  EXPORT_REPORTS = "export_reports",
  
  // Billing
  VIEW_BILLING = "view_billing",
  MANAGE_BILLING = "manage_billing",
  
  // White Label
  VIEW_WHITE_LABEL = "view_white_label",
  EDIT_WHITE_LABEL = "edit_white_label",
  
  // Settings
  VIEW_SETTINGS = "view_settings",
  EDIT_SETTINGS = "edit_settings",
  MANAGE_TEAM = "manage_team",
  MANAGE_ROLES = "manage_roles",
  
  // API Access
  VIEW_API_KEYS = "view_api_keys",
  MANAGE_API_KEYS = "manage_api_keys"
}

// Define permissions for each role
export const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    // Full access to everything
    Permission.VIEW_CLIENTS,
    Permission.CREATE_CLIENTS,
    Permission.EDIT_CLIENTS,
    Permission.DELETE_CLIENTS,
    Permission.VIEW_PARTNERS,
    Permission.CREATE_PARTNERS,
    Permission.EDIT_PARTNERS,
    Permission.DELETE_PARTNERS,
    Permission.VIEW_ENGAGEMENTS,
    Permission.CREATE_ENGAGEMENTS,
    Permission.EDIT_ENGAGEMENTS,
    Permission.DELETE_ENGAGEMENTS,
    Permission.ASSIGN_ENGAGEMENTS,
    Permission.VIEW_DOCUMENTS,
    Permission.UPLOAD_DOCUMENTS,
    Permission.DELETE_DOCUMENTS,
    Permission.SHARE_DOCUMENTS,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.VIEW_BILLING,
    Permission.MANAGE_BILLING,
    Permission.VIEW_WHITE_LABEL,
    Permission.EDIT_WHITE_LABEL,
    Permission.VIEW_SETTINGS,
    Permission.EDIT_SETTINGS,
    Permission.MANAGE_TEAM,
    Permission.MANAGE_ROLES,
    Permission.VIEW_API_KEYS,
    Permission.MANAGE_API_KEYS
  ],
  
  [Role.PARTNER_MANAGER]: [
    // Partner and engagement management focus
    Permission.VIEW_CLIENTS,
    Permission.VIEW_PARTNERS,
    Permission.CREATE_PARTNERS,
    Permission.EDIT_PARTNERS,
    Permission.VIEW_ENGAGEMENTS,
    Permission.CREATE_ENGAGEMENTS,
    Permission.EDIT_ENGAGEMENTS,
    Permission.ASSIGN_ENGAGEMENTS,
    Permission.VIEW_DOCUMENTS,
    Permission.UPLOAD_DOCUMENTS,
    Permission.SHARE_DOCUMENTS,
    Permission.VIEW_REPORTS,
    Permission.VIEW_SETTINGS
  ],
  
  [Role.ENGAGEMENT_MANAGER]: [
    // Engagement and document management focus
    Permission.VIEW_CLIENTS,
    Permission.VIEW_PARTNERS,
    Permission.VIEW_ENGAGEMENTS,
    Permission.CREATE_ENGAGEMENTS,
    Permission.EDIT_ENGAGEMENTS,
    Permission.VIEW_DOCUMENTS,
    Permission.UPLOAD_DOCUMENTS,
    Permission.SHARE_DOCUMENTS,
    Permission.VIEW_REPORTS,
    Permission.VIEW_SETTINGS
  ],
  
  [Role.VIEWER]: [
    // Read-only access
    Permission.VIEW_CLIENTS,
    Permission.VIEW_PARTNERS,
    Permission.VIEW_ENGAGEMENTS,
    Permission.VIEW_DOCUMENTS,
    Permission.VIEW_REPORTS,
    Permission.VIEW_SETTINGS
  ]
};

// Helper function to check if a role has a specific permission
export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

// Helper function to check multiple permissions
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

// Helper function to check all permissions
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

// Get all permissions for a role
export function getRolePermissions(role: Role): Permission[] {
  return rolePermissions[role] ?? [];
}

// Get human-readable role name
export function getRoleName(role: Role): string {
  const roleNames: Record<Role, string> = {
    [Role.ADMIN]: "Admin",
    [Role.PARTNER_MANAGER]: "Partner Manager",
    [Role.ENGAGEMENT_MANAGER]: "Engagement Manager",
    [Role.VIEWER]: "Viewer"
  };
  return roleNames[role] ?? role;
}

// Get human-readable permission name
export function getPermissionName(permission: Permission): string {
  return permission
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Get permission category
export function getPermissionCategory(permission: Permission): string {
  if (permission.includes("CLIENT")) return "Client Management";
  if (permission.includes("PARTNER")) return "Partner Management";
  if (permission.includes("ENGAGEMENT")) return "Engagement Management";
  if (permission.includes("DOCUMENT")) return "Document Management";
  if (permission.includes("REPORT")) return "Reports & Analytics";
  if (permission.includes("BILLING")) return "Billing";
  if (permission.includes("WHITE_LABEL")) return "White Label";
  if (permission.includes("SETTINGS") || permission.includes("TEAM") || permission.includes("ROLES")) {
    return "Settings & Team";
  }
  if (permission.includes("API")) return "API Access";
  return "Other";
}

// Group permissions by category
export function groupPermissionsByCategory(permissions: Permission[]): Record<string, Permission[]> {
  return permissions.reduce((acc, permission) => {
    const category = getPermissionCategory(permission);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);
}