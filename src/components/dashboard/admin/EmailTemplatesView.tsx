import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Edit, Eye } from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: "invitations" | "subscriptions" | "notifications";
}

const mockTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Primary CSP Invitation",
    subject: "Welcome to Vetto",
    body: "Hi {{name}},\n\nWelcome to Vetto!\n\nYour account has been created successfully...",
    category: "invitations",
  },
  {
    id: "2",
    name: "Partner Invitation",
    subject: "Join Our Partner Network",
    body: "Hi {{name}},\n\nYou've been invited to join our partner network...",
    category: "invitations",
  },
  {
    id: "3",
    name: "Client Invitation",
    subject: "Access Your Client Portal",
    body: "Hi {{name}},\n\nYour client portal is now ready...",
    category: "invitations",
  },
  {
    id: "4",
    name: "Subscription Confirmation",
    subject: "Subscription Confirmed",
    body: "Hi {{name}},\n\nYour subscription has been confirmed...",
    category: "subscriptions",
  },
  {
    id: "5",
    name: "Payment Received",
    subject: "Payment Received Successfully",
    body: "Hi {{name}},\n\nWe've received your payment...",
    category: "subscriptions",
  },
  {
    id: "6",
    name: "Payment Failed",
    subject: "Payment Failed - Action Required",
    body: "Hi {{name}},\n\nYour recent payment attempt failed...",
    category: "subscriptions",
  },
  {
    id: "7",
    name: "Subscription Canceled",
    subject: "Subscription Canceled",
    body: "Hi {{name}},\n\nYour subscription has been canceled...",
    category: "subscriptions",
  },
  {
    id: "8",
    name: "Engagement Status Update",
    subject: "Engagement Status Changed",
    body: "Hi {{name}},\n\nThe status of your engagement has been updated...",
    category: "notifications",
  },
  {
    id: "9",
    name: "Document Uploaded",
    subject: "New Document Uploaded",
    body: "Hi {{name}},\n\nA new document has been uploaded...",
    category: "notifications",
  },
  {
    id: "10",
    name: "Document Requested",
    subject: "Document Request",
    body: "Hi {{name}},\n\nA document has been requested...",
    category: "notifications",
  },
];

export function EmailTemplatesView() {
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setEditingTemplate(null);
  };

  const getCategoryTemplates = (category: EmailTemplate["category"]) =>
    mockTemplates.filter((t) => t.category === category);

  const categoryLabels = {
    invitations: "User Invitations",
    subscriptions: "Subscriptions",
    notifications: "Notifications",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Email Templates</h1>
        <p className="text-sm text-muted-foreground">
          Manage system email templates and notifications
        </p>
      </div>

      {/* Templates by Category */}
      <div className="space-y-6">
        {(["invitations", "subscriptions", "notifications"] as const).map((category) => (
          <Card key={category} className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              {categoryLabels[category]}
            </h2>
            <div className="space-y-3">
              {getCategoryTemplates(category).map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Subject: {template.subject}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingTemplate(template)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewTemplate(template)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingTemplate} onOpenChange={() => setEditingTemplate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Email Template</DialogTitle>
          </DialogHeader>
          {editingTemplate && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name</Label>
                <Input
                  id="templateName"
                  value={editingTemplate.name}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={editingTemplate.subject}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, subject: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  value={editingTemplate.body}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, body: e.target.value })
                  }
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>

              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Available variables:</p>
                <p className="font-mono text-xs">
                  {"{{name}}, {{email}}, {{company}}, {{custom_message}}, {{link}}"}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Template"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Preview Email Template</DialogTitle>
          </DialogHeader>
          {previewTemplate && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Subject:</Label>
                <p className="text-sm mt-1">{previewTemplate.subject}</p>
              </div>

              <div className="rounded-lg border bg-white dark:bg-muted p-6">
                <div className="space-y-4 text-sm text-foreground whitespace-pre-wrap">
                  {previewTemplate.body
                    .replace(/\{\{name\}\}/g, "John Smith")
                    .replace(/\{\{email\}\}/g, "john@example.com")
                    .replace(/\{\{company\}\}/g, "Acme Corp")
                    .replace(
                      /\{\{custom_message\}\}/g,
                      "We're excited to have you on board and look forward to helping you grow your business."
                    )
                    .replace(/\{\{link\}\}/g, "https://example.com/dashboard")}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setPreviewTemplate(null)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}