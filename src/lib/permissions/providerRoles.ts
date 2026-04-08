export type ProviderTeamRole = "admin" | "partner_manager" | "engagement_manager" | "viewer";

export interface RolePermissions {
  // Dashboard access
  viewDashboard: boolean;
  
  // Client management
  viewClients: boolean;
  createClients: boolean;
  editClients: boolean;
  deleteClients: boolean;
  
  // Partner management
  viewPartners: boolean;
  invitePartners: boolean;
  editPartners: boolean;
  deletePartners: boolean;
  
  // Engagement management
  viewEngagements: boolean;
  createEngagements: boolean;
  editEngagements: boolean;
  deleteEngagements: boolean;
  
  // Document management
  viewDocuments: boolean;
  uploadDocuments: boolean;
  deleteDocuments: boolean;
  
  // Reports
  viewReports: boolean;
  exportReports: boolean;
  
  // Billing
  viewBilling: boolean;
  manageBilling: boolean;
  
  // Team management
  viewTeam: boolean;
  inviteTeamMembers: boolean;
  editTeamMembers: boolean;
  removeTeamMembers: boolean;
  
  // Settings
  viewSettings: boolean;
  editSettings: boolean;
  
  // White label
  viewWhiteLabel: boolean;
  editWhiteLabel: boolean;
}

export const ROLE_PERMISSIONS: Record<ProviderTeamRole, RolePermissions> = {
  admin: {
    viewDashboard: true,
    viewClients: true,
    createClients: true,
    editClients: true,
    deleteClients: true,
    viewPartners: true,
    invitePartners: true,
    editPartners: true,
    deletePartners: true,
    viewEngagements: true,
    createEngagements: true,
    editEngagements: true,
    deleteEngagements: true,
    viewDocuments: true,
    uploadDocuments: true,
    deleteDocuments: true,
    viewReports: true,
    exportReports: true,
    viewBilling: true,
    manageBilling: true,
    viewTeam: true,
    inviteTeamMembers: true,
    editTeamMembers: true,
    removeTeamMembers: true,
    viewSettings: true,
    editSettings: true,
    viewWhiteLabel: true,
    editWhiteLabel: true,
  },
  partner_manager: {
    viewDashboard: true,
    viewClients: false,
    createClients: false,
    editClients: false,
    deleteClients: false,
    viewPartners: true,
    invitePartners: true,
    editPartners: true,
    deletePartners: false,
    viewEngagements: false,
    createEngagements: false,
    editEngagements: false,
    deleteEngagements: false,
    viewDocuments: true,
    uploadDocuments: true,
    deleteDocuments: false,
    viewReports: true,
    exportReports: false,
    viewBilling: false,
    manageBilling: false,
    viewTeam: true,
    inviteTeamMembers: false,
    editTeamMembers: false,
    removeTeamMembers: false,
    viewSettings: false,
    editSettings: false,
    viewWhiteLabel: false,
    editWhiteLabel: false,
  },
  engagement_manager: {
    viewDashboard: true,
    viewClients: true,
    createClients: true,
    editClients: true,
    deleteClients: false,
    viewPartners: true,
    invitePartners: false,
    editPartners: false,
    deletePartners: false,
    viewEngagements: true,
    createEngagements: true,
    editEngagements: true,
    deleteEngagements: false,
    viewDocuments: true,
    uploadDocuments: true,
    deleteDocuments: false,
    viewReports: true,
    exportReports: false,
    viewBilling: false,
    manageBilling: false,
    viewTeam: true,
    inviteTeamMembers: false,
    editTeamMembers: false,
    removeTeamMembers: false,
    viewSettings: false,
    editSettings: false,
    viewWhiteLabel: false,
    editWhiteLabel: false,
  },
  viewer: {
    viewDashboard: true,
    viewClients: true,
    createClients: false,
    editClients: false,
    deleteClients: false,
    viewPartners: true,
    invitePartners: false,
    editPartners: false,
    deletePartners: false,
    viewEngagements: true,
    createEngagements: false,
    editEngagements: false,
    deleteEngagements: false,
    viewDocuments: true,
    uploadDocuments: false,
    deleteDocuments: false,
    viewReports: true,
    exportReports: false,
    viewBilling: true,
    manageBilling: false,
    viewTeam: true,
    inviteTeamMembers: false,
    editTeamMembers: false,
    removeTeamMembers: false,
    viewSettings: true,
    editSettings: false,
    viewWhiteLabel: true,
    editWhiteLabel: false,
  },
};

export const ROLE_LABELS: Record<ProviderTeamRole, string> = {
  admin: "Admin",
  partner_manager: "Partner Manager",
  engagement_manager: "Engagement Manager",
  viewer: "Viewer",
};

export const ROLE_DESCRIPTIONS: Record<ProviderTeamRole, string> = {
  admin: "Full access to all features and settings. Can manage team members and billing.",
  partner_manager: "Manage partners, invitations, and partner-related documents.",
  engagement_manager: "Manage clients, engagements, and related documents.",
  viewer: "Read-only access to all information. Cannot make changes.",
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: ProviderTeamRole | null, permission: keyof RolePermissions): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.[permission] || false;
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: ProviderTeamRole): RolePermissions {
  return ROLE_PERMISSIONS[role];
}