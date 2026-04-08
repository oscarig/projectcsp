import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save } from "lucide-react";
import { ConnectionStatusCard } from "./stripe/ConnectionStatusCard";
import { ApiKeysCard } from "./stripe/ApiKeysCard";
import { WebhookConfigCard } from "./stripe/WebhookConfigCard";
import { ProductSyncCard } from "./stripe/ProductSyncCard";
import { PaymentMethodsCard } from "./stripe/PaymentMethodsCard";
import { SecurityBestPracticesCard } from "./stripe/SecurityBestPracticesCard";

export function StripeConfigurationView() {
  const [testMode, setTestMode] = useState(false);
  const [showPublishableKey, setShowPublishableKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Mock connection status
  const connectionStatus = {
    connected: true,
    mode: testMode ? "test" : "live",
    accountId: "acct_1234567890ABCDEF",
    connectedSince: "15 Jan 2024",
  };

  // Mock webhook events
  const [webhookEvents, setWebhookEvents] = useState({
    "customer.subscription.created": true,
    "customer.subscription.updated": true,
    "customer.subscription.deleted": true,
    "invoice.payment_succeeded": true,
    "invoice.payment_failed": true,
    "checkout.session.completed": true,
    "payment_intent.succeeded": true,
  });

  // Mock payment methods
  const [paymentMethods, setPaymentMethods] = useState({
    cards: true,
    sepa: false,
    bankTransfer: false,
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log("Saving Stripe configuration...");
      setIsSaving(false);
    }, 1500);
  };

  const handleSyncProducts = () => {
    setIsSyncing(true);
    setTimeout(() => {
      console.log("Syncing products with Stripe...");
      setIsSyncing(false);
    }, 2000);
  };

  const handleTestWebhook = () => {
    setIsTesting(true);
    setTimeout(() => {
      console.log("Testing webhook connection...");
      setIsTesting(false);
    }, 1500);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    console.log(`Copied ${label} to clipboard`);
  };

  const toggleWebhookEvent = (event: string) => {
    setWebhookEvents({
      ...webhookEvents,
      [event]: !webhookEvents[event],
    });
  };

  const togglePaymentMethod = (method: keyof typeof paymentMethods) => {
    setPaymentMethods({
      ...paymentMethods,
      [method]: !paymentMethods[method],
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Stripe Configuration</h1>
          <p className="text-muted-foreground mt-2">
            Manage your Stripe integration settings and payment processing
          </p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isSaving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </>
          )}
        </Button>
      </div>

      {/* Connection Status */}
      <ConnectionStatusCard
        status={connectionStatus}
        testMode={testMode}
        onModeToggle={() => setTestMode(!testMode)}
        onCopy={handleCopy}
      />

      {/* API Keys */}
      <ApiKeysCard
        testMode={testMode}
        showPublishableKey={showPublishableKey}
        showSecretKey={showSecretKey}
        showWebhookSecret={showWebhookSecret}
        onTogglePublishable={() => setShowPublishableKey(!showPublishableKey)}
        onToggleSecret={() => setShowSecretKey(!showSecretKey)}
        onToggleWebhook={() => setShowWebhookSecret(!showWebhookSecret)}
        onCopy={handleCopy}
      />

      {/* Webhook Configuration */}
      <WebhookConfigCard
        webhookEvents={webhookEvents}
        isTesting={isTesting}
        onToggleEvent={toggleWebhookEvent}
        onTestWebhook={handleTestWebhook}
        onCopy={handleCopy}
      />

      {/* Product Sync */}
      <ProductSyncCard
        isSyncing={isSyncing}
        onSync={handleSyncProducts}
      />

      {/* Payment Methods */}
      <PaymentMethodsCard
        paymentMethods={paymentMethods}
        onToggleMethod={togglePaymentMethod}
      />

      {/* Security Best Practices */}
      <SecurityBestPracticesCard />
    </div>
  );
}