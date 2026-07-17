"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  FileText,
  Check,
  X,
  ShieldCheck,
  Building,
  ExternalLink,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

interface KYCRequest {
  id: string;
  businessName: string;
  cacNumber: string;
  state: string;
  dateSubmitted: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function AdminKycPage() {
  const [selectedKyc, setSelectedKyc] = useState<KYCRequest | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Mock list of installers needing KYC review
  const [requests, setRequests] = useState<KYCRequest[]>([
    {
      id: "kyc-1",
      businessName: "Lagos Solar Solutions Ltd",
      cacNumber: "RC-894723",
      state: "Lagos State",
      dateSubmitted: "July 16, 2026",
      status: "PENDING",
    },
    {
      id: "kyc-2",
      businessName: "Ibadan Power Engineers",
      cacNumber: "RC-472094",
      state: "Oyo State",
      dateSubmitted: "July 15, 2026",
      status: "PENDING",
    },
    {
      id: "kyc-3",
      businessName: "Akobo Renewable Firm",
      cacNumber: "RC-920475",
      state: "Oyo State",
      dateSubmitted: "July 13, 2026",
      status: "PENDING",
    },
  ]);

  const handleAction = (id: string, action: "APPROVED" | "REJECTED") => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: action } : req)));
    setSuccessMsg(`KYC request was successfully ${action.toLowerCase()}!`);
    setSelectedKyc(null);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-foreground text-3xl font-extrabold tracking-tight">
          KYC Verification Command
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Review business registration CAC files and certify installers for geofenced lead bidding.
        </p>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="animate-in fade-in flex items-center space-x-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-600 duration-200">
          <ShieldCheck className="size-5 shrink-0" />
          <span className="text-sm font-bold">{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Table List of requests */}
        <div className={cn("space-y-4 lg:col-span-2", selectedKyc && "hidden lg:block")}>
          <Card className="border-border bg-card overflow-hidden border shadow-xs">
            <div className="border-border border-b p-5">
              <h3 className="text-foreground text-sm font-bold">Pending Applications</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead className="hidden sm:table-cell">CAC Number</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow
                    key={req.id}
                    onClick={() => setSelectedKyc(req)}
                    className={cn(
                      "hover:bg-muted/30 cursor-pointer transition-colors",
                      selectedKyc?.id === req.id && "bg-muted/40",
                    )}
                  >
                    <TableCell className="font-semibold">{req.businessName}</TableCell>
                    <TableCell className="text-muted-foreground hidden sm:table-cell">
                      {req.cacNumber}
                    </TableCell>
                    <TableCell>{req.state}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          req.status === "PENDING"
                            ? "outline"
                            : req.status === "APPROVED"
                              ? "default"
                              : "destructive"
                        }
                        className={cn(
                          req.status === "PENDING" &&
                            "border-amber-500/20 bg-amber-500/10 text-amber-500",
                          req.status === "APPROVED" &&
                            "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
                          req.status === "REJECTED" &&
                            "bg-destructive/10 text-destructive border-destructive/20",
                        )}
                      >
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <ChevronRight className="text-muted-foreground inline size-4" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* KYC Application details viewer panel */}
        <div className={cn("lg:col-span-1", !selectedKyc && "hidden lg:block")}>
          {selectedKyc ? (
            <Card className="border-border bg-card animate-in slide-in-from-bottom-2 space-y-6 border p-6 shadow-xs duration-150">
              <div className="border-border flex items-start justify-between border-b pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-foreground text-sm font-bold">Review Application</h3>
                  <span className="text-muted-foreground text-[10px] uppercase">
                    {selectedKyc.id}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedKyc(null)}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1.5 lg:hidden"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="text-muted-foreground space-y-4 text-xs">
                <div className="text-foreground flex items-center space-x-2 font-bold">
                  <Building className="text-primary size-4 shrink-0" />
                  <span>{selectedKyc.businessName}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>CAC Registration Number:</span>
                    <span className="text-foreground font-semibold">{selectedKyc.cacNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Registered Location:</span>
                    <span className="text-foreground font-semibold">{selectedKyc.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Application Date:</span>
                    <span className="text-foreground font-semibold">
                      {selectedKyc.dateSubmitted}
                    </span>
                  </div>
                </div>

                <hr className="border-border/60" />

                {/* Uploaded CAC Document File View panel */}
                <div className="space-y-2">
                  <span className="text-foreground font-bold">Uploaded Documents:</span>
                  <div className="border-border bg-muted/20 flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-2">
                      <FileText className="text-primary size-4" />
                      <div>
                        <span className="text-foreground block text-[10px] font-semibold">
                          CAC_Registration_Certificate.pdf
                        </span>
                        <span className="block text-[8px]">1.8 MB • PDF File</span>
                      </div>
                    </div>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-primary hover:text-primary/80"
                      aria-label="View Document"
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {selectedKyc.status === "PENDING" ? (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleAction(selectedKyc.id, "REJECTED")}
                    className={cn(
                      buttonVariants({
                        variant: "destructive",
                        size: "sm",
                        className: "flex-1 cursor-pointer",
                      }),
                      "gap-1",
                    )}
                  >
                    <X className="size-4" /> Reject
                  </button>
                  <button
                    onClick={() => handleAction(selectedKyc.id, "APPROVED")}
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        className: "flex-1 cursor-pointer bg-emerald-600 hover:bg-emerald-500",
                      }),
                      "gap-1",
                    )}
                  >
                    <Check className="size-4" /> Approve
                  </button>
                </div>
              ) : (
                <div className="pt-4 text-center">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                      selectedKyc.status === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-destructive/10 text-destructive",
                    )}
                  >
                    {selectedKyc.status === "APPROVED" ? (
                      <>
                        <Check className="size-3.5" /> Approved
                      </>
                    ) : (
                      <>
                        <X className="size-3.5" /> Rejected
                      </>
                    )}
                  </span>
                </div>
              )}
            </Card>
          ) : (
            <Card className="border-border bg-card flex h-full min-h-[300px] flex-col items-center justify-center border p-8 text-center shadow-xs">
              <AlertCircle className="text-muted-foreground mb-3 size-8" />
              <p className="text-muted-foreground max-w-xs text-xs">
                Select an application from the list to review CAC files and approve/reject
                credentials.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
