import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle2, AlertCircle, X, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadDocumentDialogProps {
  engagementTitle?: string;
}

export function UploadDocumentDialog({ engagementTitle }: UploadDocumentDialogProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const { toast } = useToast();

  const handleUpload = () => {
    setIsUploading(true);
    setUploadStatus("uploading");
    setUploadProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("success");
          setIsUploading(false);
          toast({
            title: "Document Uploaded",
            description: "KYC_Identity_Verification.pdf has been successfully uploaded.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 1500);
  };

  const reset = () => {
    setUploadStatus("idle");
    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-1 text-blue-500" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <Upload className="h-5 w-5 text-blue-600" />
          </div>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            {engagementTitle 
              ? `Select a document to upload for ${engagementTitle}.`
              : "Select a document to upload to this engagement."
            }
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {uploadStatus === "idle" && (
            <div 
              className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group hover:border-blue-500/50"
              onClick={handleUpload}
            >
              <FileText className="h-10 w-10 text-muted-foreground group-hover:scale-110 group-hover:text-blue-500 transition-all duration-300" />
              <div className="text-center">
                <p className="font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">PDF, JPG, PNG (max. 5MB)</p>
              </div>
            </div>
          )}

          {uploadStatus === "uploading" && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-blue-50/30 border-blue-100">
                <div className="h-10 w-10 rounded bg-white flex items-center justify-center border shadow-sm grow-0 shrink-0">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-slate-800">KYC_Passport_Copy.pdf</p>
                  <p className="text-xs text-slate-500">2.4 MB</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={reset}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span>Uploading to Singapore CSP...</span>
                  <span className="text-blue-600">{uploadProgress}%</span>
                </div>
                <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-blue-500 transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="flex flex-col items-center justify-center py-6 gap-3 text-center animate-in zoom-in duration-300">
              <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center border-4 border-white shadow-sm">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-slate-800">Upload Complete</p>
                <p className="text-sm text-slate-500">
                  Your document has been securely shared<br />with the assigned partner.
                </p>
              </div>
              <Button variant="outline" size="sm" className="mt-2 text-xs border-slate-200" onClick={reset}>
                Upload Another
              </Button>
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
          <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance Note</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              All documents are encrypted end-to-end and stored in our secure Singapore-based data center.
            </p>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={reset}>Cancel</Button>
          {uploadStatus === "success" ? (
            <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 shadow-md">Done</Button>
          ) : (
            <Button 
              disabled={isUploading || uploadStatus === "idle"} 
              onClick={() => setUploadStatus("uploading")}
              className="bg-blue-600 hover:bg-blue-700 min-w-[124px] shadow-md shadow-blue-500/20"
            >
              Confirm Upload
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
