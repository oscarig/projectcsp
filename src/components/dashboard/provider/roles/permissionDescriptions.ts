import { Permission } from "@/lib/permissions";

export function getPermissionDescription(permission: Permission): string {
  const descriptions: Record<Permission, string> = {
    [Permission.VIEW_CLIENTS]: "View client list and details",
    [Permission.CREATE_CLIENTS]: "Add new clients to the platform",
    [Permission.EDIT_CLIENTS]: "Modify client information",
    [Permission.DELETE_CLIENTS]: "Remove clients from the platform",
    [Permission.VIEW_PARTNERS]: "View partner directory",
    [Permission.CREATE_PARTNERS]: "Add new partners",
    [Permission.EDIT_PARTNERS]: "Modify partner information",
    [Permission.DELETE_PARTNERS]: "Remove partners",
    [Permission.VIEW_ENGAGEMENTS]: "View all engagements",
    [Permission.CREATE_ENGAGEMENTS]: "Create new engagements",
    [Permission.EDIT_ENGAGEMENTS]: "Modify engagement details",
    [Permission.DELETE_ENGAGEMENTS]: "Remove engagements",
    [Permission.ASSIGN_ENGAGEMENTS]: "Assign engagements to partners",
    [Permission.VIEW_DOCUMENTS]: "View all documents",
    [Permission.UPLOAD_DOCUMENTS]: "Upload new documents",
    [Permission.DELETE_DOCUMENTS]: "Remove documents",
    [Permission.SHARE_DOCUMENTS]: "Share documents with clients",
    [Permission.VIEW_REPORTS]: "View analytics and reports",
    [Permission.EXPORT_REPORTS]: "Export report data",
    [Permission.VIEW_BILLING]: "View billing information",
    [Permission.MANAGE_BILLING]: "Manage subscriptions and payments",
    [Permission.VIEW_WHITE_LABEL]: "View white label settings",
    [Permission.EDIT_WHITE_LABEL]: "Customize white label portal",
    [Permission.VIEW_SETTINGS]: "View platform settings",
    [Permission.EDIT_SETTINGS]: "Modify platform settings",
    [Permission.MANAGE_TEAM]: "Invite and manage team members",
    [Permission.MANAGE_ROLES]: "Configure role permissions",
    [Permission.VIEW_API_KEYS]: "View API credentials",
    [Permission.MANAGE_API_KEYS]: "Generate and revoke API keys"
  };
  return descriptions[permission] ?? "No description available";
}