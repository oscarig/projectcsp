import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";

interface Notification {
  id: string;
  type: "quote_request" | "response" | "action_required" | "document" | "engagement" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  csp?: string;
}

interface NotificationCenterProps {
  onClose?: () => void;
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "quote_request",
      title: "New Quote Request",
      message: "Singapore Formation",
      timestamp: "10:30 AM",
      read: false,
      csp: "Hong Kong Trust",
    },
    {
      id: "2",
      type: "response",
      title: "Response Received",
      message: "Name approved - proceed",
      timestamp: "10:15 AM",
      read: false,
      csp: "London CSP",
    },
    {
      id: "3",
      type: "action_required",
      title: "Action Required",
      message: "Financial statements needed",
      timestamp: "Yesterday",
      read: false,
      csp: "London CSP",
    },
    {
      id: "4",
      type: "document",
      title: "Document uploaded confirmation",
      message: "",
      timestamp: "12 Apr 2024",
      read: true,
    },
    {
      id: "5",
      type: "quote_request",
      title: "New request from Dubai Corp",
      message: "",
      timestamp: "11 Apr 2024",
      read: true,
    },
    {
      id: "6",
      type: "engagement",
      title: "Engagement completed: SP-2024-038",
      message: "",
      timestamp: "10 Apr 2024",
      read: true,
    },
    {
      id: "7",
      type: "system",
      title: "Profile updated successfully",
      message: "",
      timestamp: "09 Apr 2024",
      read: true,
    },
    {
      id: "8",
      type: "document",
      title: "Document shared by New York Law",
      message: "",
      timestamp: "08 Apr 2024",
      read: true,
    },
    {
      id: "9",
      type: "response",
      title: "Quote accepted by Hong Kong Trust",
      message: "",
      timestamp: "07 Apr 2024",
      read: true,
    },
    {
      id: "10",
      type: "system",
      title: "Payment processed",
      message: "",
      timestamp: "06 Apr 2024",
      read: true,
    },
    {
      id: "11",
      type: "engagement",
      title: "New engagement started",
      message: "",
      timestamp: "05 Apr 2024",
      read: true,
    },
  ]);

  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
  };

  const handleView = (notification: Notification) => {
    console.log("View notification:", notification);
    handleMarkRead(notification.id);
    // Navigate to relevant page based on notification type
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "quote_request":
        return <FileText className="h-4 w-4" />;
      case "response":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "action_required":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "document":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "engagement":
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      case "system":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-[400px] max-w-[calc(100vw-2rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Notifications</h3>
          {unreadNotifications.length > 0 && (
            <Badge variant="destructive" className="h-5">
              {unreadNotifications.length}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadNotifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              className="text-xs"
            >
              Mark All Read
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="h-[500px]">
        {/* Unread Notifications */}
        {unreadNotifications.length > 0 && (
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-muted-foreground">
                UNREAD ({unreadNotifications.length})
              </h4>
            </div>
            <div className="space-y-2">
              {unreadNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="rounded-lg border bg-muted/50 p-3 transition-colors hover:bg-muted"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {notification.title}
                            {notification.csp && (
                              <span className="ml-1 text-muted-foreground">
                                · {notification.csp}
                              </span>
                            )}
                          </p>
                          {notification.message && (
                            <p className="text-sm text-muted-foreground">
                              "{notification.message}"
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(notification)}
                          className="h-7 text-xs"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Read Notifications */}
        {readNotifications.length > 0 && (
          <div className="border-t p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-muted-foreground">
                READ ({readNotifications.length})
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearRead}
                className="text-xs"
              >
                Clear
              </Button>
            </div>
            <div className="space-y-2">
              {readNotifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center gap-2 rounded-lg border p-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  <span className="flex-1">
                    {notification.timestamp} - {notification.title}
                  </span>
                </div>
              ))}
              {readNotifications.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => console.log("View all notifications")}
                >
                  View All ({readNotifications.length})
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <CheckCircle2 className="mb-2 h-12 w-12 text-muted-foreground" />
            <p className="text-sm font-medium">No notifications</p>
            <p className="text-xs text-muted-foreground">
              You're all caught up!
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}