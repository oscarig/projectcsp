import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { passwordSchema } from "@/lib/security/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle2, Lock, Eye, EyeOff } from "lucide-react";
import { VettoLogo } from "@/components/VettoLogo";
import { SEO } from "@/components/SEO";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Invalid or expired recovery link. Please request a new one.");
        setValidatingToken(false);
      } else {
        setValidatingToken(false);
      }
    };
    checkSession();
  }, []);

  const getPasswordStrength = (password: string) => {
    const validation = passwordSchema.safeParse(password);
    
    if (password.length === 0) return null;
    if (password.length < 6) return { strength: "very-weak", color: "text-red-600", label: "Very Weak", progress: 20 };
    if (password.length < 8) return { strength: "weak", color: "text-orange-600", label: "Weak", progress: 40 };
    
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    const criteriaCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    
    if (validation.success) {
      return { strength: "strong", color: "text-green-600", label: "Strong", progress: 100 };
    } else if (criteriaCount >= 3) {
      return { strength: "good", color: "text-blue-600", label: "Good", progress: 70 };
    } else {
      return { strength: "fair", color: "text-yellow-600", label: "Fair", progress: 50 };
    }
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const validation = passwordSchema.safeParse(password);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (validatingToken) {
    return (
      <>
        <SEO 
          title="Reset Password - Vetto"
          description="Set your new password"
        />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
          <Card className="w-full max-w-md border-0 shadow-xl">
            <CardContent className="pt-6 flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Validating recovery link...</p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Reset Password - Vetto"
        description="Set your new password"
      />
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10">
            <Link href="/">
              <VettoLogo className="h-10 w-auto text-white" />
            </Link>
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Create New Password
            </h2>
            <p className="text-lg text-blue-100 max-w-md">
              Choose a strong password to keep your account secure. We recommend using a combination of letters, numbers, and symbols.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-blue-100">
                <Lock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">At least 8 characters</p>
              </div>
              <div className="flex items-start space-x-3 text-blue-100">
                <Lock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Include uppercase and lowercase letters</p>
              </div>
              <div className="flex items-start space-x-3 text-blue-100">
                <Lock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Add numbers and special characters</p>
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-sm text-blue-200">
              © {new Date().getFullYear()} Vetto. All rights reserved.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
          <div className="w-full max-w-md space-y-6">
            <div className="lg:hidden flex justify-center mb-8">
              <Link href="/">
                <VettoLogo className="h-10 w-auto" />
              </Link>
            </div>

            <Card className="border-0 shadow-xl">
              <CardHeader className="space-y-3 text-center pb-6">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
                <CardDescription className="text-base">
                  Enter your new password
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {success && (
                    <Alert className="border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100 animate-in fade-in slide-in-from-top-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription className="space-y-2">
                        <p className="font-semibold">Password updated successfully!</p>
                        <p className="text-sm">Redirecting to sign in...</p>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading || success}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordStrength && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-medium ${passwordStrength.color}`}>
                            Strength: {passwordStrength.label}
                          </p>
                          <p className="text-xs text-muted-foreground">{passwordStrength.progress}%</p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              passwordStrength.strength === "very-weak" ? "bg-red-600" :
                              passwordStrength.strength === "weak" ? "bg-orange-600" :
                              passwordStrength.strength === "fair" ? "bg-yellow-600" :
                              passwordStrength.strength === "good" ? "bg-blue-600" :
                              "bg-green-600"
                            }`}
                            style={{ width: `${passwordStrength.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Password must contain:</p>
                      <ul className="list-disc list-inside space-y-0.5 ml-2">
                        <li className={password.length >= 8 ? "text-green-600" : ""}>At least 8 characters</li>
                        <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>At least one uppercase letter</li>
                        <li className={/[a-z]/.test(password) ? "text-green-600" : ""}>At least one lowercase letter</li>
                        <li className={/[0-9]/.test(password) ? "text-green-600" : ""}>At least one number</li>
                        <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-600" : ""}>At least one special character</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading || success}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-600 font-medium">
                        Passwords do not match
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pt-2">
                  <Button 
                    type="submit" 
                    className="w-full h-11 text-base font-semibold" 
                    disabled={loading || success || password !== confirmPassword}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Updating password...
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Password updated!
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-5 w-5" />
                        Update password
                      </>
                    )}
                  </Button>
                  
                  <div className="w-full border-t pt-4">
                    <Link 
                      href="/auth/login" 
                      className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Back to sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>

            <div className="lg:hidden text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Vetto. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}