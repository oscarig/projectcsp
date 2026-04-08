import { Building2, FileText, Calendar, UserCheck, Handshake, FolderSearch } from "lucide-react";

export function ServiceCategories() {
  const services = [
    {
      icon: Building2,
      name: "Company Formation",
      jurisdictions: "BVI, Cayman, Singapore, Delaware, UK",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: FileText,
      name: "Registered Agent / Office",
      jurisdictions: "Ongoing administration with renewal tracking",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      icon: Calendar,
      name: "Annual Filings & Compliance",
      jurisdictions: "Jurisdiction-specific checklists and due dates",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: UserCheck,
      name: "Director / Shareholder Changes",
      jurisdictions: "Structured deliverables and acceptance records",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      icon: Handshake,
      name: "Bank Introduction Support",
      jurisdictions: "Managed referrals with controlled disclosure",
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-900/20"
    },
    {
      icon: FolderSearch,
      name: "Document / Registry Requests",
      jurisdictions: "Track requests, delivery, and evidence logs",
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/20"
    }
  ];

  return (
    <section id="workflows" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for recurring cross-border firm work
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start with standardised service templates for the work firms already outsource across jurisdictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-5`}>
                <service.icon className={`w-6 h-6 ${service.color}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.jurisdictions}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          Start with your existing partner network. Discovery can be added later.
        </p>
      </div>
    </section>
  );
}