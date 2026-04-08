import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ServiceCategories } from "@/components/ServiceCategories";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyFirmsPay } from "@/components/WhyFirmsPay";
import { Security } from "@/components/Security";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SEO
        title="Vetto - Corporate Service Provider Platform | CSP Management Software"
        description="Complete platform for corporate service providers. Manage clients, partners, compliance, and due diligence workflows. Streamline KYC/KYB verification with audit-ready records. Free trial available."
        url="https://vetto.com"
        keywords="corporate service provider software, CSP platform, cross-border compliance, partner network management, client engagement software, due diligence automation, KYC KYB verification, audit-ready workflows, multi-jurisdiction compliance"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Hero />
          <Features />
          <ServiceCategories />
          <HowItWorks />
          <WhyFirmsPay />
          <Security />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}