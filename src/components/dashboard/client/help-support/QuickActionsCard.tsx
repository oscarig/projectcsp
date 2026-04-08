import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircle, Mail, Phone } from "lucide-react";

interface QuickActionsCardProps {
  onNewTicket: () => void;
}

export const QuickActionsCard = memo(function QuickActionsCard({
  onNewTicket,
}: QuickActionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full" onClick={onNewTicket}>
          <Plus className="mr-2 h-4 w-4" />
          New Support Ticket
        </Button>
        <Button variant="outline" className="w-full">
          <MessageCircle className="mr-2 h-4 w-4" />
          Live Chat
        </Button>
        <Button variant="outline" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Email Support
        </Button>
        <Button variant="outline" className="w-full">
          <Phone className="mr-2 h-4 w-4" />
          Request Callback
        </Button>
      </CardContent>
    </Card>
  );
});