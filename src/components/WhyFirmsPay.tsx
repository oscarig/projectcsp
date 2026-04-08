import { Clock, Shield, Users } from "lucide-react";

export function WhyFirmsPay() {
  const values = [
    {
      icon: Clock,
      title: "Save senior time",
      description: "Reduce partner chasing, email back-and-forth, and manual status tracking.",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Shield,
      title: "Reduce operational risk",
      description: "Track Partner Due Diligence Packs, renewals, approvals, and delivery records in one governed workflow.",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      icon: Users,
      title: "Retain client confidence",
      description: "Deliver cross-border work more consistently without losing control of the client relationship.",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why firms pay for Vetto
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Because cross-border work already exists in your firm. Vetto makes it faster to run and easier to defend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className={`w-14 h-14 mx-auto rounded-2xl ${value.bg} flex items-center justify-center mb-5`}>
                <value.icon className={`w-7 h-7 ${value.color}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          If Vetto saves just 5 hours of senior time per month, it typically pays for itself.
        </p>
      </div>
    </section>
  );
}