import { ThemeProvider } from "@/contexts/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import type { UserRole } from "@/types/user";

// Rutas públicas que NO requieren autenticación
const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/confirm-email",
  "/404",
  "/500",
];

// Mapeo de roles a sus dashboards permitidos
const ROLE_DASHBOARD_MAP: Record<UserRole, string> = {
  admin: "/dashboard/admin",
  provider: "/dashboard/provider",
  partner: "/dashboard/partner",
  client: "/dashboard/client"
};

function GlobalAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, loading, role } = useAuth();
  
  const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname);
  const currentPath = router.pathname;

  useEffect(() => {
    // CRITICAL: Check if this is a post-login redirect
    const loginRedirect = sessionStorage.getItem('login_redirect');
    if (loginRedirect) {
      // Clear the flag and let the navigation complete
      sessionStorage.removeItem('login_redirect');
      return;
    }

    if (loading) return;

    // Si no está autenticado y la ruta no es pública
    if (!isAuthenticated && !isPublicRoute) {
      router.push(`/auth/login?redirectTo=${encodeURIComponent(router.asPath)}`);
      return;
    }

    // Si está autenticado y va a una página de auth
    if (isAuthenticated && currentPath.startsWith("/auth/")) {
      if (role && ROLE_DASHBOARD_MAP[role]) {
        router.push(ROLE_DASHBOARD_MAP[role]);
      } else {
        router.push("/");
      }
      return;
    }

    // Si está autenticado y está en un dashboard
    if (isAuthenticated && currentPath.startsWith("/dashboard/")) {
      if (!role) {
        // Si no tiene rol, redirigir al login
        router.push("/auth/login");
        return;
      }

      const userDashboard = ROLE_DASHBOARD_MAP[role];
      
      // Verificar si está intentando acceder a un dashboard que no le corresponde
      if (!currentPath.startsWith(userDashboard)) {
        // Redirigir a su dashboard correcto
        router.push(userDashboard);
      }
    }
  }, [loading, isAuthenticated, isPublicRoute, currentPath, role, router]);

  // Mostrar loader mientras se verifica la sesión
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium animate-pulse">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Prevenir renderizado si no está autenticado y la ruta es privada
  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <GlobalAuthGuard>
          <Component {...pageProps} />
        </GlobalAuthGuard>
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
}