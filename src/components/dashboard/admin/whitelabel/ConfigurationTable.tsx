import { WhiteLabelConfig } from "@/types/whitelabel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Check, Eye, Edit } from "lucide-react";

interface ConfigurationTableProps {
  configs: WhiteLabelConfig[];
  onView: (config: WhiteLabelConfig) => void;
  onEdit: (config: WhiteLabelConfig) => void;
}

export function ConfigurationTable({ configs, onView, onEdit }: ConfigurationTableProps) {
  const getStatusBadge = (status: WhiteLabelConfig["status"]) => {
    const variants: Record<typeof status, string> = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800",
    };
    return (
      <Badge variant="secondary" className={variants[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Provider</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>SSL</TableHead>
          <TableHead>DNS</TableHead>
          <TableHead>Features</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {configs.map((config) => (
          <TableRow key={config.id}>
            <TableCell className="font-medium">{config.providerName}</TableCell>
            <TableCell>
              <code className="text-xs">{config.domain}</code>
            </TableCell>
            <TableCell>{getStatusBadge(config.status)}</TableCell>
            <TableCell>
              {config.sslCertificate === "active" ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Shield className="mr-1 h-3 w-3" />
                  Active
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Pending
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {config.dnsStatus === "configured" ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Check className="mr-1 h-3 w-3" />
                  OK
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Pending
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                {config.portalEnabled && (
                  <Badge variant="outline" className="text-xs">
                    Portal
                  </Badge>
                )}
                {config.documentUploadEnabled && (
                  <Badge variant="outline" className="text-xs">
                    Docs
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => onView(config)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEdit(config)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}