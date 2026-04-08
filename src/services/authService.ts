import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: any;
  created_at?: string;
  email_confirmed_at?: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

// Dynamic URL Helper
const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 
           process?.env?.NEXT_PUBLIC_SITE_URL ?? 
           'http://localhost:3000'
  
  // Handle undefined or null url
  if (!url) {
    url = 'http://localhost:3000';
  }
  
  // Ensure url has protocol
  url = url.startsWith('http') ? url : `https://${url}`
  
  // Ensure url ends with slash
  url = url.endsWith('/') ? url : `${url}/`
  
  return url
}

export const authService = {
  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user ? {
      id: user.id,
      email: user.email || "",
      user_metadata: user.user_metadata,
      created_at: user.created_at,
      email_confirmed_at: user.email_confirmed_at
    } : null;
  },

  // Get current session
  async getCurrentSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Check if user's email is verified
  async isEmailVerified(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      // Check both Supabase auth confirmation and profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('email_verified')
        .eq('id', user.id)
        .single();

      return !!(user.email_confirmed_at && profile?.email_verified);
    } catch (error) {
      console.error('Error checking email verification:', error);
      return false;
    }
  },

  // Sign up with email and password
  async signUp(
    email: string, 
    password: string,
    metadata?: { full_name?: string; role?: string }
  ): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          // CRITICAL: No emailRedirectTo to prevent external redirects
        }
      });

      if (error) {
        // Check for specific error codes
        let errorMessage = error.message;
        
        // Detect already registered email
        if (error.message.toLowerCase().includes('already registered') || 
            error.message.toLowerCase().includes('user already exists') ||
            error.status === 422) {
          errorMessage = 'This email address is already registered. Please use a different email or try logging in.';
        }
        
        return { user: null, error: { message: errorMessage, code: error.status?.toString() } };
      }

      // Additional check: if user exists but email not confirmed
      if (data.user && !data.user.email_confirmed_at) {
        // Check if user already exists in database
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id, email_verified')
          .eq('email', email.toLowerCase())
          .maybeSingle();

        if (existingProfile && existingProfile.email_verified) {
          return { 
            user: null, 
            error: { 
              message: 'This email address is already registered and verified. Please login instead.',
              code: '23505'
            } 
          };
        }
      }

      const authUser = data.user ? {
        id: data.user.id,
        email: data.user.email || "",
        user_metadata: data.user.user_metadata,
        created_at: data.user.created_at,
        email_confirmed_at: data.user.email_confirmed_at
      } : null;

      // Send verification email via Edge Function
      if (authUser) {
        try {
          await supabase.functions.invoke('email-verification', {
            body: { 
              email: authUser.email,
              userId: authUser.id,
              fullName: metadata?.full_name || 'User'
            }
          });
        } catch (emailError) {
          console.error('Error sending verification email:', emailError);
          // Don't fail signup if email sending fails
        }
      }

      return { user: authUser, error: null };
    } catch (error) {
      return { 
        user: null, 
        error: { message: "An unexpected error occurred during sign up" } 
      };
    }
  },

  // Resend verification email
  async resendVerificationEmail(): Promise<{ error: AuthError | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || !user.email) {
        return { error: { message: "No user found" } };
      }

      // Check if already verified
      const isVerified = await this.isEmailVerified();
      if (isVerified) {
        return { error: { message: "Email already verified" } };
      }

      // Send verification email via Edge Function
      const { error } = await supabase.functions.invoke('email-verification', {
        body: { 
          email: user.email,
          userId: user.id,
          fullName: user.user_metadata?.full_name || 'User'
        }
      });

      if (error) {
        return { error: { message: error.message || "Failed to send verification email" } };
      }

      return { error: null };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred while sending verification email" } 
      };
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      // CRITICAL: Sign in WITHOUT any redirectTo option
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        // ABSOLUTELY NO redirectTo - we handle navigation manually
      });

      if (error) {
        return { user: null, error: { message: error.message, code: error.status?.toString() } };
      }

      const authUser = data.user ? {
        id: data.user.id,
        email: data.user.email || "",
        user_metadata: data.user.user_metadata,
        created_at: data.user.created_at,
        email_confirmed_at: data.user.email_confirmed_at
      } : null;

      return { user: authUser, error: null };
    } catch (error) {
      return { 
        user: null, 
        error: { message: "An unexpected error occurred during sign in" } 
      };
    }
  },

  // Sign out
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { error: { message: error.message } };
      }

      return { error: null };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred during sign out" } 
      };
    }
  },

  // Reset password
  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getURL()}auth/reset-password`,
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return { error: null };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred during password reset" } 
      };
    }
  },

  // Confirm email (REQUIRED)
  async confirmEmail(token: string, type: 'signup' | 'recovery' | 'email_change' = 'signup'): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: type
      });

      if (error) {
        return { user: null, error: { message: error.message, code: error.status?.toString() } };
      }

      // Update profile email_verified status
      if (data.user) {
        await supabase
          .from('profiles')
          .update({ 
            email_verified: true,
            email_verified_at: new Date().toISOString()
          })
          .eq('id', data.user.id);
      }

      const authUser = data.user ? {
        id: data.user.id,
        email: data.user.email || "",
        user_metadata: data.user.user_metadata,
        created_at: data.user.created_at,
        email_confirmed_at: data.user.email_confirmed_at
      } : null;

      return { user: authUser, error: null };
    } catch (error) {
      return { 
        user: null, 
        error: { message: "An unexpected error occurred during email confirmation" } 
      };
    }
  },

  // Verify invitation token
  async verifyInvitation(token: string, role: 'client' | 'partner'): Promise<{ data: any; error: AuthError | null }> {
    try {
      const table = role === 'client' ? 'client_invitations' : 'partner_invitations';
      const { data, error } = await (supabase as any)
        .from(table)
        .select('*')
        .eq('token', token)
        .eq('status', 'pending')
        .maybeSingle();


      if (error) throw error;
      if (!data) return { data: null, error: { message: "Invitation not found or already used." } };

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};