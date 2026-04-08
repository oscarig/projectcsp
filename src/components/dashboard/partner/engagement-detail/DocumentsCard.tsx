import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Eye, Share2, FileText } from "lucide-react";
import type { Document } from "./types";

interface DocumentsCardProps {
  clientDocuments: Document[];
  yourDocuments: Document[];
  onUpload?: () => void;
  onViewDocument?: (docId: number) => void;
  onShareDocument?: (docId: number) => void;
}

export const DocumentsCard = memo(function DocumentsCard({
  clientDocuments,
  yourDocuments,
  onUpload,
  onViewDocument,
  onShareDocument,
}: DocumentsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Documents</CardTitle>
          <Button variant="outline" size="sm" className="gap-2" onClick={onUpload}>
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Client Documents */}
        <div>
          <h4 className="font-semibold mb-3">CLIENT DOCUMENTS (watermarked):</h4>
          <div className="space-y-2">
            {clientDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.date}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => onViewDocument?.(doc.id)}
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Your Documents */}
        <div>
          <h4 className="font-semibold mb-3">YOUR DOCUMENTS:</h4>
          <div className="space-y-2">
            {yourDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={() => onViewDocument?.(doc.id)}
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={() => onShareDocument?.(doc.id)}
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});