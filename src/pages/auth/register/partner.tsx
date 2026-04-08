import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Eye, EyeOff, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import { partnerInvitationService } from "@/services/partnerInvitationService";
import { VettoLogo } from "@/components/VettoLogo";

export default function PartnerRegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { token } = router.query;

  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [invitationEmail, setInvitationEmail] = useState("");
  const [tokenError, setTokenError] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
    color: "bg-gray-200",
  });

  // Validate invitation token on mount
  useEffect(() => {
    if (token && typeof token === "string") {
      validateInvitationToken(token);
    } else {
      setValidatingToken(false);
      setTokenError("No invitation token provided");
    }
  }, [token]);

  const validateInvitationToken = async (invitationToken: string) => {
    setValidatingToken(true);
    setTokenError("");

    const { valid, invitation, error } = await partnerInvitationService.validateToken(
      invitationToken
    );

    setValidatingToken(false);

    if (!valid || !invitation) {
      setTokenValid(false);
      setTokenError(error || "Invalid invitation token");
      return;
    }

    setTokenValid(true);
    setInvitationEmail(invitation.partner_email);
  };

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    let feedback = "";
    let color = "bg-gray-200";

    if (!password) {
      setPasswordStrength({ score: 0, feedback: "", color: "bg-gray-200" });
      return;
    }

    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character variety checks
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    // Determine feedback and color
    if (score <= 2) {
      feedback = "Weak";
      color = "bg-red-500";
    } else if (score <= 4) {
      feedback = "Fair";
      color = "bg-yellow-500";
    } else if (score <= 5) {
      feedback = "Good";
      color = "bg-blue-500";
    } else {
      feedback = "Very Strong";
      color = "bg-green-500";
    }

    setPasswordStrength({
      score: Math.min((score / 6) * 100, 100),
      feedback,
      color,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "password") {
      calculatePasswordStrength(value);
    }

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      fullName: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !newErrors.fullName && !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !token || typeof token !== "string") {
      return;
    }

    setLoading(true);

    try {
      console.log("[PARTNER REGISTER] Starting registration for:", invitationEmail);

      // Register user with partner role (role is fixed, cannot be changed)
      const { user, error: authError } = await authService.signUp(
        invitationEmail,
        formData.password,
        {
          full_name: formData.fullName,
          role: "partner", // Fixed role for partner invitations
        }
      );

      if (authError || !user) {
        toast({
          title: "Registration Failed",
          description: typeof authError === "string" ? authError : (authError as any)?.message || "Failed to create account",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      console.log("[PARTNER REGISTER] User created, marking invitation as used");

      // Mark invitation as used
      const { error: markError } = await partnerInvitationService.markAsUsed(token, user.id);

      if (markError) {
        console.error("[PARTNER REGISTER] Failed to mark invitation as used:", markError);
        // Don't fail the registration, just log the error
      }

      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account",
      });

      // Redirect to login after short delay
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      console.error("[PARTNER REGISTER] Error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Loading state while validating token
  if (validatingToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-emerald-600" />
          <p className="mt-4 text-gray-600">Validating invitation...</p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!tokenValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <XCircle className="mx-auto h-16 w-16 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Invalid Invitation</h1>
          <p className="mt-2 text-gray-600">{tokenError}</p>
          <div className="mt-6">
            <Link href="/auth/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/">
            <VettoLogo className="mx-auto h-12" />
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Partner Registration</h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete your registration to join as a partner
          </p>
        </div>

        {/* Info Banner */}
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-start">
            <CheckCircle2 className="mr-3 h-5 w-5 flex-shrink-0 text-emerald-600" />
            <div>
              <p className="text-sm font-medium text-emerald-900">Invitation Accepted</p>
              <p className="mt-1 text-sm text-emerald-700">
                You&apos;ve been invited to register as a partner with the email:{" "}
                <strong>{invitationEmail}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                disabled={loading}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={invitationEmail}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500">
                This email is linked to your invitation and cannot be changed
              </p>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  disabled={loading}
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Strength: {passwordStrength.feedback}</span>
                    <span className="text-gray-600">{Math.round(passwordStrength.score)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  disabled={loading}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Role Info */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start">
                <AlertCircle className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Partner Account</p>
                  <p className="mt-1 text-sm text-blue-700">
                    You will be registered as a <strong>Partner</strong> with access to
                    partnership features and tools.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Partner Account"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-emerald-600 hover:text-emerald-700">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}