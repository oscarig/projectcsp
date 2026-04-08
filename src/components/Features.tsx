import { Database, FileText, Shield, CheckCircle2, AlertTriangle, Download } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Database,
      title: "Partner CRM",
      description: "Track existing partners, Partner Due Diligence Packs, renewals, and relationship history",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: FileText,
      title: "Engagement & Partner Assignment Workflow",
      description: "Structure cross-border delivery from instruction to completion",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: Shield,
      title: "Partner Due Diligence Tracking",
      description: "Keep licence, insurance, attestations, and registry checks organised",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      icon: CheckCircle2,
      title: "Deliverable Acceptance",
      description: "Capture milestones, deliverables, and formal acceptance logs",
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-900/20"
    },
    {
      icon: AlertTriangle,
      title: "Conflict & Disclosure Controls",
      description: "Alias-first workflows and firm-owned policy controls",
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      icon: Download,
      title: "Audit-Ready Records",
      description: "Export clean engagement records when clients, auditors, or regulators ask",
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/20"
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            You already do cross-border work.{" "}
            <span className="text-muted-foreground">The problem is how it's managed.</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Most firms already rely on introducer and subcontractor relationships across jurisdictions. Vetto doesn't change your commercial model — it makes it governable.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 sm:p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}