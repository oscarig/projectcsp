import { Shield, Lock, FileCheck, Bell, Database, Scale } from "lucide-react";

export function Security() {
  const features = [
    {
      icon: Lock,
      title: "Firm-level access controls and role-based permissions",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: FileCheck,
      title: "Audit logs for key actions, approvals, and changes",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: Shield,
      title: "Partner Due Diligence Pack records and renewal tracking",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      icon: Bell,
      title: "Notification workflows for expiry flags and reviews (no messaging)",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      icon: Database,
      title: "Documents remain in your storage by default (platform stores references + logs)",
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-900/20"
    },
    {
      icon: Scale,
      title: "Firm-owned policy controls (Vetto provides tools, not legal advice)",
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/20"
    }
  ];

  return (
    <section id="security" className="py-16 sm:py-20 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Security and governance by design
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <p className="text-base text-foreground leading-relaxed">
                {feature.title}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-lg font-medium text-foreground max-w-2xl mx-auto">
          Built for accountability, not just coordination.
        </p>
      </div>
    </section>
  );
}