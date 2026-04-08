import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail } from "lucide-react";
import type { Engagement } from "./types";

interface PrimaryCSPCardProps {
  primaryCSP: Engagement["primaryCSP"];
  onEmailContact?: () => void;
}

export const PrimaryCSPCard = memo(function PrimaryCSPCard({
  primaryCSP,
  onEmailContact,
}: PrimaryCSPCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Primary CSP
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-semibold">{primaryCSP.name}</p>
          <p className="text-sm text-muted-foreground">
            Contact: {primaryCSP.contact}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onEmailContact}
        >
          <Mail className="h-4 w-4" />
          Email Contact
        </Button>
      </CardContent>
    </Card>
  );
});