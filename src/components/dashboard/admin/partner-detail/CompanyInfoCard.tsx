import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CompanyInfoCardProps {
  formData: {
    legalName: string;
    tradingName: string;
    registrationNumber: string;
    jurisdiction: string;
    address: string;
    phone: string;
    website: string;
  };
  isEditing: boolean;
  onChange: (field: string, value: string) => void;
}

export function CompanyInfoCard({ formData, isEditing, onChange }: CompanyInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Company Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="legalName">Legal Name</Label>
            <Input
              id="legalName"
              value={formData.legalName}
              onChange={(e) => onChange("legalName", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tradingName">Trading Name</Label>
            <Input
              id="tradingName"
              value={formData.tradingName}
              onChange={(e) => onChange("tradingName", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              id="registrationNumber"
              value={formData.registrationNumber}
              onChange={(e) => onChange("registrationNumber", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jurisdiction">Jurisdiction</Label>
            {isEditing ? (
              <Select
                value={formData.jurisdiction}
                onValueChange={(value) => onChange("jurisdiction", value)}
              >
                <SelectTrigger id="jurisdiction">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Singapore">Singapore</SelectItem>
                  <SelectItem value="Hong Kong">Hong Kong</SelectItem>
                  <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                  <SelectItem value="British Virgin Islands">British Virgin Islands</SelectItem>
                  <SelectItem value="Cayman Islands">Cayman Islands</SelectItem>
                  <SelectItem value="Malta">Malta</SelectItem>
                  <SelectItem value="Cyprus">Cyprus</SelectItem>
                  <SelectItem value="Seychelles">Seychelles</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input id="jurisdiction" value={formData.jurisdiction} disabled />
            )}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => onChange("address", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => onChange("website", e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}