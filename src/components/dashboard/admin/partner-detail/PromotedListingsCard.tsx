import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Plus, X } from "lucide-react";

interface PromotedListing {
  id: string;
  jurisdiction: string;
  status: "active" | "paused";
  price: number;
}

interface PromotedListingsCardProps {
  listings: PromotedListing[];
  onAdd: (jurisdiction: string) => void;
  onRemove: (id: string) => void;
}

export function PromotedListingsCard({ listings, onAdd, onRemove }: PromotedListingsCardProps) {
  const [newJurisdiction, setNewJurisdiction] = useState("");

  const handleAdd = () => {
    if (!newJurisdiction) return;
    onAdd(newJurisdiction);
    setNewJurisdiction("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          Promoted Listings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Active Listings */}
        <div className="space-y-2">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="border-green-600 text-green-600 dark:border-green-400 dark:text-green-400"
                >
                  Active
                </Badge>
                <span className="font-medium">{listing.jurisdiction}</span>
                <span className="text-sm text-muted-foreground">
                  ${listing.price}/month
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-600 hover:text-red-700 dark:text-red-400"
                onClick={() => onRemove(listing.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add New Listing */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={newJurisdiction} onValueChange={setNewJurisdiction}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select jurisdiction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hong Kong">Hong Kong</SelectItem>
              <SelectItem value="British Virgin Islands">British Virgin Islands</SelectItem>
              <SelectItem value="Cayman Islands">Cayman Islands</SelectItem>
              <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
              <SelectItem value="Malta">Malta</SelectItem>
              <SelectItem value="Cyprus">Cyprus</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleAdd}
            disabled={!newJurisdiction}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}