import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
      >
        <span className="text-lg font-semibold text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 pt-2">
          <p className="text-base text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const faqs = [
    {
      question: "Is Vetto a marketplace?",
      answer: "Vetto is a workflow + partner network platform. The core use case is managing your existing cross-border partner network with a structured, auditable workflow. Private network first, discovery optional."
    },
    {
      question: "Do we need to change how we bill clients?",
      answer: "No. The Primary CSP remains the client-facing and billing party. Vetto supports the process around your existing commercial model."
    },
    {
      question: "Do you store our client documents?",
      answer: "By default, no persistent copy is stored in Vetto. Documents remain in your firm's storage, while Vetto stores references and audit logs."
    },
    {
      question: "Is Vetto legal or compliance advice?",
      answer: "No. Vetto provides workflow and governance tools. Firms remain responsible for their own policies and regulatory obligations."
    },
    {
      question: "What is a Partner Due Diligence Pack?",
      answer: "A Partner Due Diligence Pack contains all the essential documentation for partner verification: licences, insurance certificates, professional indemnity, registry checks, and attestations. Vetto helps you track these documents and their renewal dates."
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}