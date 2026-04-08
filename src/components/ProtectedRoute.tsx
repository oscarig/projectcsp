import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import type { UserRole } from "@/types/user";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true,
  allowedRoles,
  redirectTo = "/auth/login"
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, loading, role } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Check authentication
      if (requireAuth && !isAuthenticated) {
        router.push(`${redirectTo}?redirectTo=${router.asPath}`);
        return;
      }

      // Check role permissions
      if (isAuthenticated && allowedRoles && role && !allowedRoles.includes(role)) {
        // Redirect to appropriate dashboard based on role
        const dashboardRoutes: Record<UserRole, string> = {
          admin: "/dashboard/admin",
          provider: "/dashboard/provider",
          partner: "/dashboard/partner",
          client: "/dashboard/client"
        };
        router.push(dashboardRoutes[role] || "/");
      }
    }
  }, [isAuthenticated, loading, requireAuth, allowedRoles, role, redirectTo, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (isAuthenticated && allowedRoles && role && !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
}