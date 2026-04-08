import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Vetto - Get Support | CSP Platform Assistance"
        description="Contact Vetto support team for help with client management, compliance workflows, or platform questions. Email, live chat, phone support available 24/7."
        url="https://vetto.com/contact"
        keywords="vetto support, CSP platform help, contact corporate service provider software, compliance platform support, vetto customer service"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Get in Touch
                </h1>
                <p className="text-xl text-gray-600">
                  Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-center">Email Support</CardTitle>
                    <CardDescription className="text-center">
                      Get help via email
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <a href="mailto:support@vetto.com" className="text-blue-600 hover:underline">
                      support@vetto.com
                    </a>
                    <p className="text-sm text-gray-500 mt-2">
                      Response within 24 hours
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-center">Live Chat</CardTitle>
                    <CardDescription className="text-center">
                      Chat with our team
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button className="w-full">
                      Start Chat
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      Available Mon-Fri 9AM-6PM EST
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <Phone className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-center">Phone Support</CardTitle>
                    <CardDescription className="text-center">
                      Speak with an expert
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                      +1 (234) 567-890
                    </a>
                    <p className="text-sm text-gray-500 mt-2">
                      Enterprise customers only
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Sales Inquiries</CardTitle>
                  <CardDescription>
                    Interested in Vetto for your organization? Contact our sales team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Email: <a href="mailto:sales@vetto.com" className="text-blue-600 hover:underline">sales@vetto.com</a>
                  </p>
                  <p className="text-gray-700">
                    Our sales team will help you understand how Vetto can streamline your operations, provide custom demos, and discuss enterprise pricing options.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}