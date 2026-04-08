import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Mail, X, RefreshCcw, CheckCircle2, AlertCircle } from "lucide-react";
import { authService } from "@/services/authService";

export function EmailVerificationBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState("");

  useEffect(() => {
    checkVerificationStatus();
  }, []);

  const checkVerificationStatus = async () => {
    const verified = await authService.isEmailVerified();
    setIsVerified(verified);
    setIsVisible(!verified);
  };

  const handleResend = async () => {
    setResending(true);
    setResendSuccess(false);
    setResendError("");

    const { error } = await authService.resendVerificationEmail();

    if (error) {
      setResendError(error.message);
    } else {
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);
    }

    setResending(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("emailVerificationDismissed", "true");
  };

  if (!isVisible || isVerified) {
    return null;
  }

  return (
    <Alert className="mb-6 border-orange-200 bg-orange-50 relative">
      <div className="flex items-start gap-3">
        <Mail className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <AlertDescription className="text-orange-800 font-medium">
              Please verify your email address to unlock all features
            </AlertDescription>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-orange-600 hover:text-orange-800 hover:bg-orange-100 -mt-1 -mr-2"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-orange-700">
            We've sent a verification link to your email. Please check your inbox and click the link to verify your account.
          </p>

          {resendSuccess && (
            <Alert className="border-green-200 bg-green-50 py-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 text-sm">
                Verification email sent! Please check your inbox.
              </AlertDescription>
            </Alert>
          )}

          {resendError && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{resendError}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleResend}
              disabled={resending || resendSuccess}
              size="sm"
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              {resending ? (
                <>
                  <RefreshCcw className="mr-2 h-3 w-3 animate-spin" />
                  Sending...
                </>
              ) : resendSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-3 w-3" />
                  Email Sent
                </>
              ) : (
                <>
                  <RefreshCcw className="mr-2 h-3 w-3" />
                  Resend Verification Email
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Alert>
  );
}