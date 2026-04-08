import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { authService, type AuthUser } from "@/services/authService";
import { profileService } from "@/services/profileService";
import type { Session } from "@supabase/supabase-js";
import type { UserProfile } from "@/types/profile";
import type { UserRole } from "@/types/user";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        console.log("[USE AUTH] Initializing authentication...");
        
        const [currentUser, currentSession] = await Promise.all([
          authService.getCurrentUser(),
          authService.getCurrentSession()
        ]);
        
        console.log("[USE AUTH] Current user:", currentUser?.id);
        console.log("[USE AUTH] Current session:", currentSession ? "exists" : "none");
        
        setUser(currentUser);
        setSession(currentSession);

        // Fetch profile if user exists
        if (currentUser && currentSession) {
          console.log("[USE AUTH] Fetching profile for user:", currentUser.id);
          const { profile: userProfile, error } = await profileService.getCurrentProfile();
          
          if (error) {
            console.error("[USE AUTH] Error fetching profile:", error);
          } else if (userProfile) {
            console.log("[USE AUTH] Profile loaded:", { role: userProfile.role, email: userProfile.email });
            setProfile(userProfile);
          } else {
            console.error("[USE AUTH] Profile is null");
          }
        } else {
          console.log("[USE AUTH] No user or session, skipping profile fetch");
        }
      } catch (error) {
        console.error("[USE AUTH] Error initializing auth:", error);
      } finally {
        setLoading(false);
        console.log("[USE AUTH] Initialization complete");
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log("[USE AUTH] Auth state changed:", event);
        setSession(session);
        
        if (session?.user) {
          console.log("[USE AUTH] Session user detected:", session.user.id);
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);

          // Fetch profile
          console.log("[USE AUTH] Fetching profile after auth change...");
          const { profile: userProfile, error } = await profileService.getCurrentProfile();
          
          if (error) {
            console.error("[USE AUTH] Error fetching profile after auth change:", error);
          } else if (userProfile) {
            console.log("[USE AUTH] Profile loaded after auth change:", { role: userProfile.role });
            setProfile(userProfile);
          }
        } else {
          console.log("[USE AUTH] No session user, clearing state");
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
      console.log("[USE AUTH] Starting logout process...");
      
      // Call Supabase signOut
      const { error } = await authService.signOut();
      
      if (error) {
        console.error("[USE AUTH] Logout error:", error);
        throw error;
      }
      
      // Clear local state
      setUser(null);
      setProfile(null);
      setSession(null);
      
      console.log("[USE AUTH] Logout successful, redirecting to login...");
      
      // Redirect to login
      router.push("/auth/login");
    } catch (error) {
      console.error("[USE AUTH] Error during logout:", error);
      // Even if there's an error, try to redirect
      router.push("/auth/login");
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return profile?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return profile ? roles.includes(profile.role) : false;
  };

  return {
    user,
    profile,
    session,
    loading,
    signOut,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!user,
    role: profile?.role
  };
}