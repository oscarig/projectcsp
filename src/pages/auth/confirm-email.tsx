import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { authService } from "@/services/authService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle2, Mail, RefreshCcw } from "lucide-react";
import { VettoLogo } from "@/components/VettoLogo";
import { SEO } from "@/components/SEO";

type VerificationState = 'loading' | 'success' | 'error' | 'waiting';

export default function ConfirmEmailPage() {
  const router = useRouter();
  const [state, setState] = useState<VerificationState>('loading');
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      const { token, type } = router.query;

      // If no token, show waiting state
      if (!token) {
        setState('waiting');
        return;
      }

      try {
        const { user, error } = await authService.confirmEmail(
          token as string,
          (type as "signup" | "recovery" | "email_change") || "signup"
        );

        if (error) {
          setError(error.message);
          setState('error');
          return;
        }

        if (user) {
          setState('success');
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push("/dashboard/client");
          }, 3000);
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        setState('error');
      }
    };

    if (router.isReady) {
      confirmEmail();
    }
  }, [router]);

  const handleResendEmail = async () => {
    setResending(true);
    setResendSuccess(false);
    
    try {
      const { error } = await authService.resendVerificationEmail();
      
      if (error) {
        setError(error.message);
      } else {
        setResendSuccess(true);
      }
    } catch (err) {
      setError("Failed to resend verification email. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <SEO
        title="Email Confirmation - Vetto"
        description="Verify your email address to activate your account"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-3 text-center">
            <div className="flex justify-center mb-2">
              <VettoLogo className="h-12 w-auto" />
            </div>
            <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
            <CardDescription>
              {state === 'loading' && "Verifying your email address..."}
              {state === 'success' && "Email verified successfully!"}
              {state === 'error' && "Verification failed"}
              {state === 'waiting' && "Check your inbox"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Loading State */}
            {state === 'loading' && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="text-sm text-gray-600">
                  Please wait while we verify your email...
                </p>
              </div>
            )}

            {/* Success State */}
            {state === 'success' && (
              <>
                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                  <div className="rounded-full bg-green-100 p-4">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Your email has been verified successfully! Redirecting to your dashboard...
                  </AlertDescription>
                </Alert>
              </>
            )}

            {/* Error State */}
            {state === 'error' && (
              <>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleResendEmail}
                    disabled={resending}
                    className="w-full"
                    variant="outline"
                  >
                    {resending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Resend Verification Email
                      </>
                    )}
                  </Button>

                  {resendSuccess && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Verification email sent! Please check your inbox.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button asChild className="w-full">
                    <Link href="/auth/login">Return to Login</Link>
                  </Button>
                </div>
              </>
            )}

            {/* Waiting State (No Token) */}
            {state === 'waiting' && (
              <>
                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                  <div className="rounded-full bg-blue-100 p-4">
                    <Mail className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2 text-center text-sm text-gray-600">
                  <p>Didn't receive the email?</p>
                  <Button 
                    onClick={handleResendEmail}
                    disabled={resending}
                    variant="outline"
                    className="w-full"
                  >
                    {resending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Resend Verification Email
                      </>
                    )}
                  </Button>

                  {resendSuccess && (
                    <Alert className="border-green-200 bg-green-50 mt-3">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Verification email sent! Please check your inbox.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/auth/login">Back to Login</Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}