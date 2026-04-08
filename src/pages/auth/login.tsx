import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SEO } from "@/components/SEO";
import { VettoLogo } from "@/components/VettoLogo";
import { authService } from "@/services/authService";
import { profileService } from "@/services/profileService";
import { checkRateLimit, formatRetryAfter } from "@/lib/security/rate-limit";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    remaining: number;
    limit: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('[LOGIN] Step 1: Starting login for:', email);
      
      // Rate limit check
      const rateLimitResult = await checkRateLimit("login", email.toLowerCase());
      
      setRateLimitInfo({
        remaining: rateLimitResult.remaining,
        limit: rateLimitResult.limit,
      });

      if (!rateLimitResult.success) {
        const retryAfter = rateLimitResult.retryAfter || 900;
        setError(
          `Too many login attempts. Please wait ${formatRetryAfter(retryAfter)} before trying again.`
        );
        setLoading(false);
        return;
      }

      console.log('[LOGIN] Step 2: Rate limit passed');

      // Attempt sign in
      const { user, error: authError } = await authService.signIn(email, password);

      if (authError) {
        console.error('[LOGIN] Step 3: Authentication error:', authError);
        
        let errorMessage = "Invalid credentials. Please check your email and password.";
        
        if (authError.message?.includes("Invalid login credentials")) {
          errorMessage = "Incorrect email or password. Please try again.";
        } else if (authError.message?.includes("Email not confirmed")) {
          errorMessage = "Please verify your email before logging in.";
        } else if (authError.message) {
          errorMessage = authError.message;
        }
        
        const remainingAttempts = rateLimitResult.remaining - 1;
        if (remainingAttempts > 0) {
          setError(`${errorMessage} Remaining attempts: ${remainingAttempts}`);
        } else {
          setError(errorMessage);
        }
        setLoading(false);
        return;
      }

      if (!user) {
        console.error('[LOGIN] Step 3: No user returned');
        setError("Error during login. Please try again.");
        setLoading(false);
        return;
      }

      console.log('[LOGIN] Step 3: User authenticated:', user.id);
      console.log('[LOGIN] Step 4: Fetching user profile...');
      
      // Get user profile to determine role
      const { profile, error: profileError } = await profileService.getProfileById(user.id);
      
      if (profileError) {
        console.error('[LOGIN] Step 4: Error fetching profile:', profileError);
        setError("Error loading user profile. Please try again.");
        setLoading(false);
        return;
      }

      if (!profile) {
        console.error('[LOGIN] Step 4: No profile found');
        setError("User profile not found.");
        setLoading(false);
        return;
      }

      console.log('[LOGIN] Step 5: Profile loaded successfully');
      console.log('[LOGIN] - User ID:', profile.id);
      console.log('[LOGIN] - Email:', profile.email);
      console.log('[LOGIN] - Role:', profile.role);
      console.log('[LOGIN] - Full Name:', profile.full_name);

      // Determine redirect based on role
      const dashboardRoutes: Record<string, string> = {
        provider: "/dashboard/provider",
        partner: "/dashboard/partner",
        client: "/dashboard/client",
        admin: "/dashboard/admin",
      };
      
      const targetRoute = dashboardRoutes[profile.role] || "/dashboard/client";
      
      console.log('[LOGIN] Step 6: Target route determined:', targetRoute);
      console.log('[LOGIN] Step 7: Navigating to dashboard...');
      
      // Use Next.js router for client-side navigation
      await router.push(targetRoute);
      
      console.log('[LOGIN] Step 8: Navigation completed');
      
    } catch (err) {
      console.error("[LOGIN] Unexpected error:", err);
      setError("An error occurred during login. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Sign In to Vetto - Corporate Service Provider Platform"
        description="Access your Vetto account to manage clients, partners, and compliance workflows. Secure login for corporate service providers, law firms, and accounting practices."
        url="https://vetto.com/auth/login"
        keywords="CSP login, corporate service provider login, compliance platform signin, partner network access"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors w-fit"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex justify-center">
              <VettoLogo className="h-12 w-auto" />
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {rateLimitInfo && rateLimitInfo.remaining < rateLimitInfo.limit && rateLimitInfo.remaining > 0 && !error && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Attempts remaining: {rateLimitInfo.remaining} of {rateLimitInfo.limit}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link href="/auth/forgot-password" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Forgot your password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/register" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  Sign up here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="fixed bottom-4 left-0 right-0 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Vetto. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}