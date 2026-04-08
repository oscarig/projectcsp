import { ReactNode, useState } from "react";
import { Sidebar } from "./layout/Sidebar";
import { Header } from "./layout/Header";
import { MobileMenu } from "./layout/MobileMenu";
import { EmailVerificationBanner } from "@/components/EmailVerificationBanner";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden">
          <Header
            mobileMenuOpen={mobileMenuOpen}
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <EmailVerificationBanner />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}