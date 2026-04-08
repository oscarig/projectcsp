/**
 * Optimized Engagement Detail View
 * Refactored from 479 lines to ~60 lines
 * Performance improvements:
 * - Extracted specialized components with React.memo
 * - Custom hook for data management and business logic
 * - Reduced re-renders through proper memoization
 * - Separated concerns for better maintainability
 */

import { EngagementHeader } from "./engagement-detail/EngagementHeader";
import { ClientInfoCard } from "./engagement-detail/ClientInfoCard";
import { PrimaryCSPCard } from "./engagement-detail/PrimaryCSPCard";
import { EngagementDetailsCard } from "./engagement-detail/EngagementDetailsCard";
import { ProgressTrackerCard } from "./engagement-detail/ProgressTrackerCard";
import { DocumentsCard } from "./engagement-detail/DocumentsCard";
import { SendUpdateCard } from "./engagement-detail/SendUpdateCard";
import { ActivityTimelineCard } from "./engagement-detail/ActivityTimelineCard";
import { useEngagementData } from "./engagement-detail/useEngagementData";

export function EngagementDetailView() {
  const {
    engagement,
    steps,
    clientDocuments,
    yourDocuments,
    message,
    requestType,
    setMessage,
    setRequestType,
    handleAction,
    handleEmailContact,
    handleUpload,
    handleViewDocument,
    handleShareDocument,
    handleSendUpdate,
    handleAttachFiles,
    handleAddRecipients,
  } = useEngagementData();

  return (
    <div className="space-y-6">
      <EngagementHeader engagement={engagement} onAction={handleAction} />

      <div className="grid gap-6 md:grid-cols-2">
        <ClientInfoCard client={engagement.client} />
        <PrimaryCSPCard
          primaryCSP={engagement.primaryCSP}
          onEmailContact={handleEmailContact}
        />
      </div>

      <EngagementDetailsCard details={engagement.details} />

      <ProgressTrackerCard engagement={engagement} steps={steps} />

      <DocumentsCard
        clientDocuments={clientDocuments}
        yourDocuments={yourDocuments}
        onUpload={handleUpload}
        onViewDocument={handleViewDocument}
        onShareDocument={handleShareDocument}
      />

      <SendUpdateCard
        message={message}
        requestType={requestType}
        onMessageChange={setMessage}
        onRequestTypeChange={setRequestType}
        onSend={handleSendUpdate}
        onAttachFiles={handleAttachFiles}
        onAddRecipients={handleAddRecipients}
      />

      <ActivityTimelineCard engagementId={engagement.id} />
    </div>
  );
}