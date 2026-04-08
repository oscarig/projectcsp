import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Features as FeaturesSection } from "@/components/Features";
import { ServiceCategories } from "@/components/ServiceCategories";
import { HowItWorks } from "@/components/HowItWorks";
import { Security } from "@/components/Security";

export default function FeaturesPage() {
  return (
    <>
      <SEO
        title="Vetto Features - Complete CSP Management Platform Tools"
        description="Discover Vetto's features: client management, partner verification, document tracking, compliance automation, audit-ready workflows. Built for CSPs, law firms, accounting practices."
        url="https://vetto.com/features"
        keywords="CSP platform features, corporate service provider tools, client management features, compliance automation, due diligence tools, partner verification software, document management"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need to Manage Your CSP Business
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful features designed specifically for corporate service providers, law firms, and accounting practices operating across borders.
              </p>
            </div>
            <FeaturesSection />
            <ServiceCategories />
            <HowItWorks />
            <Security />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}