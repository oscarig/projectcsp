import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Eye } from "lucide-react";
import { EmailTemplate } from "./types";

export function EmailTemplatesCard() {
  const [searchQuery, setSearchQuery] = useState("");

  const templates: EmailTemplate[] = [
    { id: "1", name: "Welcome Email", subject: "Welcome to Vetto", category: "Onboarding", lastModified: "2024-01-15" },
    { id: "2", name: "KYB Approved", subject: "Your verification is complete", category: "Verification", lastModified: "2024-01-14" },
    { id: "3", name: "Payment Receipt", subject: "Payment confirmation", category: "Billing", lastModified: "2024-01-13" },
    { id: "4", name: "Engagement Invitation", subject: "New engagement request", category: "Engagements", lastModified: "2024-01-12" },
  ];

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>Manage automated email templates sent to users</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="space-y-2">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{template.name}</h4>
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{template.subject}</p>
                  <p className="text-xs text-muted-foreground">Last modified: {template.lastModified}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}