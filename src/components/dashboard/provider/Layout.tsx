import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { VettoLogo } from "@/components/VettoLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmailVerificationBanner } from "@/components/EmailVerificationBanner";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Users,
  Handshake,
  Briefcase,
  FileText,
  BarChart3,
  CreditCard,
  Settings,
  Palette,
  Globe,
  Monitor,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Link2,
  Mail,
} from "lucide-react";
import { UserMenu } from "@/components/dashboard/UserMenu";

interface ProviderLayoutProps {
  children: ReactNode;
}

export function ProviderLayout({ children }: ProviderLayoutProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whiteLabelExpanded, setWhiteLabelExpanded] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard/provider", icon: LayoutDashboard },
    { name: "Clients", href: "/dashboard/provider/clients", icon: Users },
    { name: "Engagements", href: "/dashboard/provider/engagements", icon: Briefcase },
    { name: "Partners", href: "/dashboard/provider/partners", icon: Handshake },
    { name: "Invitations", href: "/dashboard/provider/invitations", icon: Mail },
    { name: "Documents", href: "/dashboard/provider/documents", icon: FileText },
    { name: "Notifications", href: "/dashboard/provider/notifications", icon: Bell, badge: 3 },
    { name: "Reports", href: "/dashboard/provider/reports", icon: BarChart3 },
    { name: "Billing", href: "/dashboard/provider/billing", icon: CreditCard },
    { name: "Team", href: "/dashboard/provider/team", icon: Users },
    { name: "Settings", href: "/dashboard/provider/settings", icon: Settings },
  ];




  const whiteLabelItems = [
    { name: "Portal Status", href: "/dashboard/provider/whitelabel/portal", icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:bg-muted/10">
          <div className="flex items-center gap-2 h-16 px-6 border-b">
            <VettoLogo />
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = router.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-[10px] font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
              
              {/* White Label Section */}
              <li className="pt-4">
                <button
                  onClick={() => setWhiteLabelExpanded(!whiteLabelExpanded)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="uppercase tracking-wider text-xs font-semibold">White Label</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${whiteLabelExpanded ? "rotate-180" : ""}`} />
                </button>
                {whiteLabelExpanded && (
                  <ul className="mt-1 space-y-1">
                    {whiteLabelItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = router.pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 pl-6 rounded-lg text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="h-16 border-b bg-background flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4 flex-1">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              {/* Mobile Logo */}
              <div className="lg:hidden">
                <VettoLogo />
              </div>

              {/* Search */}
              <div className="hidden md:flex flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search clients, partners, engagements..."
                    className="pl-10 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:block h-8 w-px bg-muted mx-2" />

              {/* User Menu - Now always visible */}
              <UserMenu />
            </div>
          </header>

          {/* Enhanced Mobile Menu with Overlay and Animation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden fixed inset-0 bg-black/60 z-40"
                  onClick={() => setMobileMenuOpen(false)}
                />

                {/* Sliding Menu */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="lg:hidden fixed inset-y-0 left-0 w-[280px] bg-background border-r z-50 shadow-xl"
                >
                  {/* Menu Header */}
                  <div className="flex items-center justify-between h-16 px-4 border-b">
                    <VettoLogo />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Menu Content with Scroll */}
                  <nav className="overflow-y-auto h-[calc(100vh-4rem)] p-4">
                    <ul className="space-y-1">
                      {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = router.pathname === item.href;
                        return (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                            >
                              <Icon className="h-5 w-5 flex-shrink-0" />
                              <span className="flex-1">{item.name}</span>
                              {item.badge && (
                                <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-[10px] font-bold">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}

                      {/* White Label Section in Mobile */}
                      <li className="pt-4">
                        <button
                          onClick={() => setWhiteLabelExpanded(!whiteLabelExpanded)}
                          className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <span className="uppercase tracking-wider text-xs font-semibold">White Label</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${whiteLabelExpanded ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {whiteLabelExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-1 space-y-1 overflow-hidden"
                            >
                              {whiteLabelItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = router.pathname === item.href;
                                return (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={`flex items-center gap-3 px-3 py-2 pl-6 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                          ? "bg-primary text-primary-foreground"
                                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                      }`}
                                    >
                                      <Icon className="h-4 w-4 flex-shrink-0" />
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    </ul>
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <EmailVerificationBanner />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Named export for convenience
export { ProviderLayout as Layout };