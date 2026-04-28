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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  DollarSign,
  User,
  Globe,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  HelpCircle,
  BookOpen,
  ArrowUpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NotificationCenter } from "./NotificationCenter";
import { UserMenu } from "@/components/dashboard/UserMenu";

interface PartnerLayoutProps {
  children: ReactNode;
}

export function PartnerLayout({ children }: PartnerLayoutProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications] = useState(3);
  const [notificationOpen, setNotificationOpen] = useState(false);

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
    { name: "Dashboard", href: "/dashboard/partner", icon: LayoutDashboard },
    { name: "Engagements", href: "/dashboard/partner/engagements", icon: Briefcase, badge: 4 },
    { name: "Documents", href: "/dashboard/partner/documents", icon: FileText, badge: 2 },
    { name: "Earnings", href: "/dashboard/partner/earnings", icon: DollarSign },
    { name: "Profile", href: "/dashboard/partner/profile", icon: User },
    { name: "Directory", href: "/dashboard/partner/directory", icon: Globe },
    { name: "Mejorar a Provider", href: "/dashboard/partner/upgrade", icon: ArrowUpCircle },
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
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </li>
                );
              })}
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
                    placeholder="Search engagements, documents..."
                    className="pl-10 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Notification Bell with Popover */}
              <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                        {notifications}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto p-0">
                  <NotificationCenter onClose={() => setNotificationOpen(false)} />
                </PopoverContent>
              </Popover>

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
                                <Badge variant="secondary" className="ml-auto">
                                  {item.badge}
                                </Badge>
                              )}
                            </Link>
                          </li>
                        );
                      })}
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