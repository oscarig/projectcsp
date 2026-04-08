import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NotificationPreference } from "./types";

const initialPreferences: NotificationPreference[] = [
  {
    id: "1",
    label: "New Client Requests",
    description: "Get notified when a new client submits a request",
    email: true,
    sms: false,
    push: true,
  },
  {
    id: "2",
    label: "Engagement Updates",
    description: "Receive updates on your active engagements",
    email: true,
    sms: true,
    push: true,
  },
  {
    id: "3",
    label: "Payment Notifications",
    description: "Get notified about payments and invoices",
    email: true,
    sms: false,
    push: false,
  },
  {
    id: "4",
    label: "Document Uploads",
    description: "Know when clients upload new documents",
    email: false,
    sms: false,
    push: true,
  },
  {
    id: "5",
    label: "Marketing Updates",
    description: "Receive news and product updates",
    email: false,
    sms: false,
    push: false,
  },
];

export function NotificationPreferencesCard() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>(initialPreferences);

  const handleToggle = (id: string, channel: "email" | "sms" | "push") => {
    setPreferences(
      preferences.map((pref) =>
        pref.id === id ? { ...pref, [channel]: !pref[channel] } : pref
      )
    );
  };

  const handleSave = () => {
    console.log("Saving notification preferences:", preferences);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose how you want to receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4 pb-4 border-b">
          <div className="col-span-1"></div>
          <div className="text-center text-sm font-medium">Email</div>
          <div className="text-center text-sm font-medium">SMS</div>
          <div className="text-center text-sm font-medium">Push</div>
        </div>

        {preferences.map((pref) => (
          <div key={pref.id} className="grid grid-cols-4 gap-4 items-center">
            <div className="col-span-1">
              <Label className="font-medium">{pref.label}</Label>
              <p className="text-sm text-muted-foreground">{pref.description}</p>
            </div>
            <div className="flex justify-center">
              <Switch
                checked={pref.email}
                onCheckedChange={() => handleToggle(pref.id, "email")}
              />
            </div>
            <div className="flex justify-center">
              <Switch
                checked={pref.sms}
                onCheckedChange={() => handleToggle(pref.id, "sms")}
              />
            </div>
            <div className="flex justify-center">
              <Switch
                checked={pref.push}
                onCheckedChange={() => handleToggle(pref.id, "push")}
              />
            </div>
          </div>
        ))}

        <div className="pt-4 flex justify-end">
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
}