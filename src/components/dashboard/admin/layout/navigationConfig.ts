import {
  LayoutDashboard,
  Building,
  Handshake,
  UserCircle,
  FileText,
  TrendingUp,
  Tag,
  UserCheck,
  Shield,
  BarChart3,
  DollarSign,
  Users,
  Settings,
  CreditCard,
  Mail,
  Globe,
  User,
} from "lucide-react";

export const navigationConfig = {
  mainItems: [
    { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  ],
  sections: [
    {
      title: "Users",
      items: [
        { name: "Primary CSPs", href: "/dashboard/admin/users/primary-csps", icon: Building },
        { name: "Partners", href: "/dashboard/admin/users/partners", icon: Handshake },
        { name: "Clients", href: "/dashboard/admin/users/clients", icon: UserCircle },
      ],
    },
    {
      title: "Subscriptions",
      items: [
        { name: "Primary CSP Plans", href: "/dashboard/admin/primary-csp-subscriptions", icon: Building },
        { name: "Partner Plans", href: "/dashboard/admin/partner-subscriptions", icon: Handshake },
        { name: "Promoted Listings", href: "/dashboard/admin/promoted-listings", icon: TrendingUp },
        { name: "Invoices", href: "/dashboard/admin/invoices", icon: FileText },
      ],
    },
    {
      title: "Pricing",
      items: [
        { name: "Primary CSP Plans", href: "/dashboard/admin/pricing/primary-csp-plans", icon: Building },
        { name: "Partner Plans", href: "/dashboard/admin/pricing/partner-plans", icon: Handshake },
        { name: "Promoted Listings", href: "/dashboard/admin/pricing/promoted-listings-pricing", icon: TrendingUp },
        { name: "Promotions", href: "/dashboard/admin/pricing/promotions", icon: Tag },
      ],
    },
    {
      title: "Compliance",
      items: [
        { name: "KYC Management", href: "/dashboard/admin/compliance/kyc", icon: UserCheck },
        { name: "Verification Queue", href: "/dashboard/admin/compliance/verification", icon: Shield },
        { name: "Audit Logs", href: "/dashboard/admin/compliance/audit-logs", icon: FileText },
        { name: "Reports", href: "/dashboard/admin/compliance/reports", icon: BarChart3 },
      ],
    },
    {
      title: "Reports",
      items: [
        { name: "Financial", href: "/dashboard/admin/reports/financial", icon: DollarSign },
        { name: "Growth", href: "/dashboard/admin/reports/growth", icon: TrendingUp },
        { name: "User Activity", href: "/dashboard/admin/reports/activity", icon: Users },
        { name: "Export Center", href: "/dashboard/admin/reports/exports", icon: FileText },
      ],
    },
    {
      title: "Settings",
      items: [
        { name: "Platform", href: "/dashboard/admin/settings/platform", icon: Settings },
        { name: "Stripe", href: "/dashboard/admin/stripe", icon: CreditCard },
        { name: "Email Templates", href: "/dashboard/admin/settings/email-templates", icon: Mail },
        { name: "Jurisdictions", href: "/dashboard/admin/settings/jurisdictions", icon: Globe },
        { name: "Admin Users", href: "/dashboard/admin/settings/admin-users", icon: User },
      ],
    },
  ],
};