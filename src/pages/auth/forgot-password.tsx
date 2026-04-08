import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SEO } from "@/components/SEO";
import { VettoLogo } from "@/components/VettoLogo";
import { authService } from "@/services/authService";
import { checkRateLimit, formatRetryAfter } from "@/lib/security/rate-limit";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Verificar rate limiting ANTES de enviar email
      const rateLimitResult = await checkRateLimit("resetPassword", email.toLowerCase());

      if (!rateLimitResult.success) {
        const retryAfter = rateLimitResult.retryAfter || 3600;
        setError(
          `Demasiadas solicitudes de recuperación. Por favor, espera ${formatRetryAfter(retryAfter)} antes de intentar nuevamente.`
        );
        setLoading(false);
        return;
      }

      const { error: resetError } = await authService.resetPassword(email);

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error("Password reset error:", err);
      setError("Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <SEO
          title="Recuperación Enviada - Vetto"
          description="Instrucciones de recuperación enviadas"
        />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">¡Correo Enviado!</CardTitle>
                <CardDescription>
                  Hemos enviado instrucciones de recuperación a <strong>{email}</strong>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Revisa tu bandeja de entrada y haz clic en el enlace para restablecer tu contraseña. 
                  El enlace expirará en 24 horas.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">¿No recibiste el correo?</p>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Revisa tu carpeta de spam o correo no deseado</li>
                  <li>Verifica que ingresaste el correo correcto</li>
                  <li>Espera unos minutos, puede tardar en llegar</li>
                </ul>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSuccess(false)}
              >
                Intentar con otro correo
              </Button>

              <Link href="/auth/login">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a Iniciar Sesión
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Recuperar Contraseña - Vetto"
        description="Recupera el acceso a tu cuenta de Vetto"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <VettoLogo className="h-12 w-auto" />
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Recuperar Contraseña</CardTitle>
              <CardDescription>
                Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña
              </CardDescription>
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
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Instrucciones"}
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Link href="/auth/login" className="w-full">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a Iniciar Sesión
                </Button>
              </Link>
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