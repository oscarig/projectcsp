import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { SEO } from "@/components/SEO";
import { VettoLogo } from "@/components/VettoLogo";
import { authService } from "@/services/authService";
import { passwordSchema } from "@/lib/security/validation";
import { checkRateLimit, formatRetryAfter } from "@/lib/security/rate-limit";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invitationToken, setInvitationToken] = useState<string | null>(null);
  const [assignedRole, setAssignedRole] = useState<string>("provider");
  const [isInviteVerified, setIsInviteVerified] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    
    const { token, role } = router.query;
    if (token && (role === "client" || role === "partner")) {
      setInvitationToken(token as string);
      setAssignedRole(role as string);
      
      const verifyInvite = async () => {
        setLoading(true);
        try {
          const { data, error: verifyError } = await authService.verifyInvitation(
            token as string, 
            role as "client" | "partner"
          );
          
          if (verifyError) {
            setError(verifyError.message);
            setIsInviteVerified(false);
          } else if (data) {
            setEmail(data.client_email || data.partner_email || "");
            setFullName(data.client_name || data.partner_name || "");
            setIsInviteVerified(true);
          }
        } catch (err) {
          console.error("Verification error:", err);
          setError("Failed to verify invitation. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      
      verifyInvite();
    } else {
      setError("Registration is by invitation only. Please use the link provided in your invitation email.");
    }
  }, [router.isReady, router.query]);


  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 20;
    if (pwd.length >= 12) strength += 20;
    if (/[a-z]/.test(pwd)) strength += 20;
    if (/[A-Z]/.test(pwd)) strength += 20;
    if (/[0-9]/.test(pwd)) strength += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 10;
    return Math.min(strength, 100);
  };

  const passwordStrength = getPasswordStrength(password);
  const getStrengthLabel = () => {
    if (passwordStrength < 40) return { text: "Very Weak", color: "bg-red-500" };
    if (passwordStrength < 60) return { text: "Weak", color: "bg-orange-500" };
    if (passwordStrength < 80) return { text: "Fair", color: "bg-yellow-500" };
    if (passwordStrength < 100) return { text: "Strong", color: "bg-blue-500" };
    return { text: "Very Strong", color: "bg-green-500" };
  };

  const requirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
    { label: "One special character", met: /[^a-zA-Z0-9]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const clientIdentifier = email.toLowerCase();

      const rateLimitResult = await checkRateLimit("register", clientIdentifier);

      if (!rateLimitResult.success) {
        const retryAfter = rateLimitResult.retryAfter || 3600;
        setError(
          `Too many registration attempts. Please wait ${formatRetryAfter(retryAfter)} before trying again.`
        );
        setLoading(false);
        return;
      }

      const validation = passwordSchema.safeParse(password);
      if (!validation.success) {
        setError(validation.error.errors[0].message);
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (!invitationToken || !isInviteVerified) {
        setError("A valid invitation token is required to register.");
        setLoading(false);
        return;
      }

      const { user, error: authError } = await authService.signUp(
        email, 
        password, 
        invitationToken,
        { full_name: fullName }
      );


      if (authError) {
        // Display the improved error message from authService
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (user) {
        setSuccess(true);
        // Redirect to confirm-email page after 2 seconds
        setTimeout(() => {
          router.push("/auth/confirm-email");
        }, 2000);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <SEO
          title="Registration Successful - Vetto"
          description="Your Vetto account has been created successfully. Verify your email to start managing clients, partners, and compliance workflows."
          url="https://vetto.com/auth/register"
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
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">Registration Successful!</CardTitle>
                <CardDescription>
                  We've sent a verification email to <strong>{email}</strong>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please check your inbox and click the verification link to activate your account. Redirecting you...
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  const strengthLabel = getStrengthLabel();

  return (
    <>
      <SEO
        title="Create Account - Vetto CSP Platform | Free Trial"
        description="Join Vetto's corporate service provider platform. Start managing clients, partners, and compliance workflows today. Free trial, no credit card required. Sign up in 60 seconds."
        url="https://vetto.com/auth/register"
        keywords="CSP platform signup, corporate service provider registration, compliance software trial, partner network registration, free CSP tools"
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
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription>Fill in the form to get started</CardDescription>
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

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    required
                    disabled={loading || isInviteVerified}
                  />
                </div>
              </div>

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
                    disabled={loading || isInviteVerified}
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

                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Strength: {strengthLabel.text}</span>
                      <span className="text-gray-500">{passwordStrength}%</span>
                    </div>
                    <Progress value={passwordStrength} className="h-2" />
                    
                    <div className="space-y-1 text-xs">
                      {requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2
                            className={`h-3 w-3 ${req.met ? "text-green-500" : "text-gray-300"}`}
                          />
                          <span className={req.met ? "text-green-700" : "text-gray-500"}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading || !isInviteVerified}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <p className="text-center text-xs text-gray-500">
                By registering, you agree to our Terms of Service and Privacy Policy
              </p>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  Sign in here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}