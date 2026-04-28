import { useState } from "react";
import { Check, Star, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

// Define some mock plans
const PLANS = [
  {
    id: "pro",
    name: "Provider Pro",
    description: "Para pequeños proveedores que quieren empezar a recibir clientes.",
    price: "49€",
    interval: "/mes",
    icon: <Star className="w-6 h-6 text-blue-500" />,
    features: [
      "Perfil de Proveedor destacado",
      "Hasta 10 contactos al mes",
      "Soporte por email",
      "Métricas básicas",
    ],
    // Replace this with your actual Stripe Price ID
    stripePriceId: "price_pro_placeholder", 
    popular: false,
  },
  {
    id: "premium",
    name: "Provider Premium",
    description: "Para negocios establecidos que buscan máximo volumen.",
    price: "99€",
    interval: "/mes",
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    features: [
      "Todo lo del plan Pro",
      "Contactos ilimitados",
      "Soporte prioritario",
      "Acceso a la API",
      "Insignia de Proveedor Verificado",
    ],
    // Replace this with your actual Stripe Price ID
    stripePriceId: "price_premium_placeholder",
    popular: true,
  },
];

export function PartnerUpgradeView() {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async (priceId: string) => {
    try {
      setLoadingPriceId(priceId);
      setError(null);

      // 1. Get the current user session to send the userId to our backend
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.user) {
        throw new Error("No has iniciado sesión o tu sesión ha expirado.");
      }

      // 2. Call our API route to create the checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: priceId,
          userId: session.user.id,
          email: session.user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error al intentar iniciar el pago.");
      }

      if (data.url) {
        // 3. Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("Stripe no devolvió una URL válida.");
      }

    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message);
    } finally {
      setLoadingPriceId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Da el salto a Provider</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Desbloquea todas las herramientas que necesitas para conectar con más clientes, 
          gestionar tu equipo y escalar tu negocio dentro de la plataforma Vetto.
        </p>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-md text-sm text-center font-medium">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 pt-4">
        {PLANS.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-[1.02]' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Shield className="w-4 h-4" />
                Recomendado
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {plan.icon}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 space-y-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.interval}</span>
              </div>
              
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-1 flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
                disabled={loadingPriceId === plan.stripePriceId}
                onClick={() => handleUpgrade(plan.stripePriceId)}
              >
                {loadingPriceId === plan.stripePriceId ? "Redirigiendo a Stripe..." : "Mejorar a " + plan.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
