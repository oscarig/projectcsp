import { useState } from "react";
import { X, Mail, MapPin, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { partnerInvitationService } from "@/services/partnerInvitationService";
import { useAuth } from "@/hooks/useAuth";

interface InvitePartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function InvitePartnerModal({ isOpen, onClose, onSuccess }: InvitePartnerModalProps) {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    jurisdiction: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    jurisdiction: "",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      email: "",
      jurisdiction: "",
    };

    if (!formData.email.trim()) {
      newErrors.email = "Partner email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.jurisdiction.trim()) {
      newErrors.jurisdiction = "Jurisdiction is required";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.jurisdiction;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to send invitations",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create invitation
      const { invitation, error: inviteError } = await partnerInvitationService.createInvitation(
        formData.email,
        user.id,
        formData.jurisdiction,
        formData.message || undefined
      );

      if (inviteError || !invitation) {
        toast({
          title: "Error",
          description: inviteError || "Failed to create invitation",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Show success immediately after creating invitation
      toast({
        title: "Invitation Created",
        description: "Sending invitation email...",
      });

      // Send email asynchronously - don't wait for it
      partnerInvitationService.sendInvitationEmail(
        formData.email,
        invitation.token,
        profile?.full_name || "A provider",
        formData.jurisdiction,
        formData.message || undefined
      ).then(({ error: emailError }) => {
        if (emailError) {
          toast({
            title: "Email Warning",
            description: "Invitation created but email may not have been sent. You can share the link manually.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Partner invitation sent successfully",
          });
        }
      });

      // Reset form and close modal immediately
      setFormData({
        email: "",
        jurisdiction: "",
        message: "",
      });

      setLoading(false);
      onClose();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("[INVITE PARTNER] Error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        email: "",
        jurisdiction: "",
        message: "",
      });
      setErrors({
        email: "",
        jurisdiction: "",
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-semibold">Invite Partner</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="rounded-full p-1 hover:bg-gray-100 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <p className="mb-6 text-sm text-gray-600">
            Send an invitation to connect with a partner
          </p>

          {/* Partner Email */}
          <div className="mb-4 space-y-2">
            <Label htmlFor="email">
              Partner Email <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="partner@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={loading}
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Jurisdiction */}
          <div className="mb-4 space-y-2">
            <Label htmlFor="jurisdiction">
              Jurisdiction <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="jurisdiction"
                type="text"
                placeholder="e.g., Singapore, BVI, Cayman"
                value={formData.jurisdiction}
                onChange={(e) => handleInputChange("jurisdiction", e.target.value)}
                disabled={loading}
                className={`pl-10 ${errors.jurisdiction ? "border-red-500" : ""}`}
              />
            </div>
            {errors.jurisdiction && (
              <p className="text-sm text-red-500">{errors.jurisdiction}</p>
            )}
          </div>

          {/* Message (Optional) */}
          <div className="mb-6 space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                id="message"
                placeholder="Brief introduction"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                disabled={loading}
                className="min-h-[80px] pl-10"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Invitation...
              </>
            ) : (
              "Send Invitation"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}