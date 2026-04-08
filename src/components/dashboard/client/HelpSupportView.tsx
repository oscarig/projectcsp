/**
 * Optimized Help & Support View
 * Refactored from 403 lines to ~75 lines
 * Performance improvements:
 * - Extracted specialized components with React.memo
 * - Custom hook for data management
 * - Memoized callbacks
 * - Separated concerns for better maintainability
 */

import { QuickActionsCard } from "./help-support/QuickActionsCard";
import { ContactInfoCard } from "./help-support/ContactInfoCard";
import { MyTicketsCard } from "./help-support/MyTicketsCard";
import { FAQCard } from "./help-support/FAQCard";
import { NewTicketDialog } from "./help-support/NewTicketDialog";
import { useHelpSupport } from "./help-support/useHelpSupport";

export function HelpSupportView() {
  const {
    tickets,
    faqs,
    showNewTicket,
    formData,
    handleNewTicket,
    handleCloseDialog,
    handleFieldChange,
    handleSubmit,
    handleViewTicket,
  } = useHelpSupport();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">
          Get assistance with your account and services
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6">
          <QuickActionsCard onNewTicket={handleNewTicket} />
          <ContactInfoCard />
        </div>

        <div className="md:col-span-2 space-y-6">
          <MyTicketsCard tickets={tickets} onViewTicket={handleViewTicket} />
          <FAQCard faqs={faqs} />
        </div>
      </div>

      <NewTicketDialog
        open={showNewTicket}
        onOpenChange={handleCloseDialog}
        formData={formData}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}