import { Check, Sparkles, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const tiers = [
    {
      name: "Founding Firm",
      price: "£800",
      period: "per month",
      description: "For firms already managing cross-border partner work",
      icon: Sparkles,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      features: [
        "Partner CRM",
        "Clients / Engagements / Partner Assignments",
        "Partner Due Diligence Pack tracking + renewals",
        "Deliverable acceptance logs",
        "Compliance export packs",
        "White-glove onboarding"
      ],
      cta: "Apply for Founding Cohort",
      popular: true
    },
    {
      name: "Growth Firm",
      price: "£1,500",
      period: "per month",
      description: "For firms running higher cross-border volume",
      icon: Crown,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      features: [
        "Everything in Founding, plus:",
        "More team users",
        "Advanced templates",
        "SLA dashboards",
        "Priority onboarding support"
      ],
      cta: "Talk to Sales",
      popular: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For larger firms and networks",
      icon: Zap,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      features: [
        "Private instance options",
        "API access",
        "Enhanced controls",
        "Optional hosted repository (future)",
        "Dedicated support"
      ],
      cta: "Contact Us",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple pricing for professional firms
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start with the workflow and governance layer your firm is missing. Private network first, discovery optional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 sm:p-8 border-2 ${
                tier.popular
                  ? "border-purple-500 dark:border-purple-400 bg-purple-50/50 dark:bg-purple-900/10 relative"
                  : "border-border bg-card"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                    Recommended
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${tier.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <tier.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${tier.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">{tier.name}</h3>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-sm sm:text-base text-muted-foreground">/ {tier.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full text-sm sm:text-base ${
                  tier.popular
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-primary hover:bg-primary/90"
                }`}
                size="lg"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}