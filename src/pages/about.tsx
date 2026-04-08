import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Building2, Users, Globe, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Vetto - Empowering Corporate Service Providers"
        description="Learn about Vetto's mission to streamline cross-border compliance for corporate service providers. Built by CSPs, for CSPs. Trusted by firms in 50+ jurisdictions."
        url="https://vetto.com/about"
        keywords="vetto company, CSP software company, cross-border compliance platform, corporate service provider technology, about vetto"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Building the Future of Corporate Services
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Vetto empowers corporate service providers, law firms, and accounting practices to operate seamlessly across borders with complete compliance and efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We're on a mission to revolutionize how corporate service providers manage their global operations. By combining cutting-edge technology with deep industry expertise, we're creating a platform that makes cross-border compliance simple, efficient, and secure.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Built by professionals who understand the challenges of managing clients, partners, and compliance across multiple jurisdictions, Vetto is designed to eliminate the complexity and manual work that holds CSPs back from scaling their businesses.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Building2 className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
                  <div className="text-gray-600">Active Firms</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Globe className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
                  <div className="text-gray-600">Jurisdictions</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Users className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
                  <div className="text-gray-600">Clients Managed</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Award className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime SLA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Compliance First</h3>
                    <p className="text-gray-700">
                      We prioritize regulatory compliance and data security in everything we build, ensuring your business meets the highest standards.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Global Perspective</h3>
                    <p className="text-gray-700">
                      Built for international operations, our platform seamlessly handles multi-jurisdiction workflows and partner networks.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Customer Success</h3>
                    <p className="text-gray-700">
                      Your success is our success. We provide dedicated support and continuously improve our platform based on your feedback.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                    <p className="text-gray-700">
                      We constantly evolve our technology to stay ahead of industry changes and provide you with cutting-edge tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}