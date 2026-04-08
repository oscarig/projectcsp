import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { authService, type AuthUser } from "@/services/authService";
import { profileService } from "@/services/profileService";
import type { Session } from "@supabase/supabase-js";
import type { UserProfile } from "@/types/profile";
import type { UserRole } from "@/types/user";

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  isAuthenticated: boolean;
  role: UserRole | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      const timeoutId = setTimeout(() => {
        if (loading) {
          console.warn("[AUTH PROVIDER] Initialization timed out after 10s. Forcing loading to false.");
          setLoading(false);
        }
      }, 10000);

      try {
        console.log("[AUTH PROVIDER] Initializing authentication...");
        
        const [currentUser, currentSession] = await Promise.all([
          authService.getCurrentUser(),
          authService.getCurrentSession()
        ]);
        
        console.log("[AUTH PROVIDER] Current user:", currentUser?.id);
        console.log("[AUTH PROVIDER] Current session:", currentSession ? "exists" : "none");
        
        setUser(currentUser);
        setSession(currentSession);

        // Fetch profile if user exists
        if (currentUser && currentSession) {
          console.log("[AUTH PROVIDER] Fetching profile for user:", currentUser.id);
          const { profile: userProfile, error } = await profileService.getCurrentProfile();
          
          if (error) {
            console.error("[AUTH PROVIDER] Error fetching profile:", error);
          } else if (userProfile) {
            console.log("[AUTH PROVIDER] Profile loaded:", { role: userProfile.role, email: userProfile.email });
            setProfile(userProfile);
          } else {
            console.error("[AUTH PROVIDER] Profile is null");
          }
        }
      } catch (error) {
        console.error("[AUTH PROVIDER] Error initializing auth:", error);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
        console.log("[AUTH PROVIDER] Initialization complete");
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, currentSession) => {
        console.log("[AUTH PROVIDER] Auth state changed:", event);
        setSession(currentSession);
        
        if (currentSession?.user) {
          console.log("[AUTH PROVIDER] Session user detected:", currentSession.user.id);
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);

          // Fetch profile
          console.log("[AUTH PROVIDER] Fetching profile after auth change...");
          const { profile: userProfile, error } = await profileService.getCurrentProfile();
          
          if (error) {
            console.error("[AUTH PROVIDER] Error fetching profile after auth change:", error);
          } else if (userProfile) {
            console.log("[AUTH PROVIDER] Profile loaded after auth change:", { role: userProfile.role });
            setProfile(userProfile);
          }
        } else {
          console.log("[AUTH PROVIDER] No session user, clearing state");
          setUser(null);
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      console.log("[AUTH PROVIDER] Starting logout process...");
      const { error } = await authService.signOut();
      
      if (error) {
        console.error("[AUTH PROVIDER] Logout error:", error);
        throw error;
      }
      
      setUser(null);
      setProfile(null);
      setSession(null);
      
      console.log("[AUTH PROVIDER] Logout successful, redirecting to login...");
      router.push("/auth/login");
    } catch (error) {
      console.error("[AUTH PROVIDER] Error during logout:", error);
      router.push("/auth/login");
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return profile?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return profile ? roles.includes(profile.role) : false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        signOut,
        hasRole,
        hasAnyRole,
        isAuthenticated: !!user,
        role: profile?.role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
