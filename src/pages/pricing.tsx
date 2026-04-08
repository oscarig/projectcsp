import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Pricing as PricingSection } from "@/components/Pricing";

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Vetto Pricing - CSP Software Plans | Free Trial Available"
        description="Compare Vetto pricing plans for corporate service providers. Transparent pricing, flexible subscriptions, enterprise solutions. Free trial, no credit card. Cancel anytime."
        url="https://vetto.com/pricing"
        keywords="CSP software pricing, corporate service provider cost, compliance platform pricing, partner network pricing, CSP subscription plans, enterprise CSP software"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the plan that fits your needs. All plans include our core features with flexible options to scale as you grow.
              </p>
            </div>
            <PricingSection />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}