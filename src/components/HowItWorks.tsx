import { Upload, FolderPlus, Send, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: Upload,
      title: "Import your existing partners",
      description: "Upload your spreadsheet and create a clean partner register with Partner Due Diligence Packs and renewal reminders.",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      number: "2",
      icon: FolderPlus,
      title: "Open a client engagement",
      description: "Create an engagement, define the scope, and select the service template.",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      number: "3",
      icon: Send,
      title: "Send a partner assignment",
      description: "Your local partner receives a structured request, updates milestones, and delivers against agreed outputs.",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      number: "4",
      icon: CheckCircle2,
      title: "Accept and export the record",
      description: "Capture deliverable acceptance, approvals, and an audit-ready timeline in one place.",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            How Vetto works
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple workflow for firms that already collaborate across borders
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border p-6 sm:p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center flex-shrink-0`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-2xl font-bold ${step.color}`}>
                      {step.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}