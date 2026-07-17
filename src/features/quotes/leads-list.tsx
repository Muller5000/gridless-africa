"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Plus, Trash2, CheckCircle, ArrowLeft } from "lucide-react";

interface Lead {
  id: string;
  location: string;
  inverterKva: number;
  batteryKwh: number;
  panelCount: number;
  date: string;
  status: "OPEN" | "QUOTED";
}

interface QuoteItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export default function LeadsList() {
  const [view, setView] = useState<"list" | "quote">("list");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [success, setSuccess] = useState(false);

  // Mock geofenced leads
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "lead-1",
      location: "Akobo, Ibadan (Oyo State)",
      inverterKva: 5.0,
      batteryKwh: 10.0,
      panelCount: 10,
      date: "July 16, 2026",
      status: "OPEN",
    },
    {
      id: "lead-2",
      location: "Lekki Phase 1, Lagos (Lagos State)",
      inverterKva: 8.0,
      batteryKwh: 15.0,
      panelCount: 16,
      date: "July 15, 2026",
      status: "OPEN",
    },
    {
      id: "lead-3",
      location: "Bodija, Ibadan (Oyo State)",
      inverterKva: 3.0,
      batteryKwh: 5.0,
      panelCount: 6,
      date: "July 14, 2026",
      status: "OPEN",
    },
  ]);

  // Quoting form state
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    { id: "1", name: "Tier-1 450W Solar Panels", qty: 10, price: 110000 },
    { id: "2", name: "5kVa Hybrid Smart Inverter", qty: 1, price: 950000 },
    { id: "3", name: "10kWh Lithium LiFePO4 Battery", qty: 1, price: 2100000 },
  ]);
  const [laborCost, setLaborCost] = useState(250000);
  const [warrantyMonths, setWarrantyMonths] = useState(12);

  const addLineItem = () => {
    setQuoteItems((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "Custom Hardware / Cables", qty: 1, price: 50000 },
    ]);
  };

  const removeLineItem = (id: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItemField = (id: string, field: keyof QuoteItem, value: string | number) => {
    setQuoteItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  // Cost calculation
  const hardwareSubtotal = quoteItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  const platformFee = 50000; // Static Gridless Africa platform fee
  const totalQuote = hardwareSubtotal + laborCost + platformFee;

  const handleStartQuote = (lead: Lead) => {
    setSelectedLead(lead);
    // Pre-populate fields based on lead specifications
    setQuoteItems([
      { id: "1", name: `Tier-1 450W Solar Panels`, qty: lead.panelCount, price: 110000 },
      { id: "2", name: `${lead.inverterKva}kVa Hybrid Smart Inverter`, qty: 1, price: 950000 },
      { id: "3", name: `${lead.batteryKwh}kWh Lithium Battery`, qty: 1, price: 2100000 },
    ]);
    setView("quote");
  };

  const handleSubmitQuote = () => {
    setSuccess(true);
    setTimeout(() => {
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead?.id ? { ...l, status: "QUOTED" } : l)),
      );
      setView("list");
      setSuccess(false);
      setSelectedLead(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* SUCCESS CONFIRMATION MODAL OVERLAY */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
          <Card className="animate-in zoom-in max-w-sm space-y-4 p-8 text-center duration-200">
            <CheckCircle className="mx-auto size-16 text-emerald-600" />
            <h3 className="text-foreground text-xl font-bold">Bid Submitted Successfully</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Your quote has been encrypted and broadcasted to the customer dashboard. We will
              notify you if your bid is accepted.
            </p>
          </Card>
        </div>
      )}

      {/* VIEW 1: ACTIVE LEADS LIST */}
      {view === "list" && (
        <div className="space-y-6">
          <div className="border-border flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-bold tracking-tight">Geofenced Customer Leads</h2>
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
              {leads.filter((l) => l.status === "OPEN").length} Leads Available
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {leads.map((lead) => (
              <Card
                key={lead.id}
                className="border-border bg-card flex flex-col justify-between border p-6 shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                      Active Lead
                    </span>
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <Calendar className="size-3.5" /> {lead.date}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-foreground flex items-center gap-2 text-sm font-bold">
                      <MapPin className="text-primary size-4 shrink-0" />
                      <span>{lead.location}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                      <div className="bg-muted/40 rounded-lg p-2 text-center">
                        <span className="text-muted-foreground block text-[9px] tracking-wider uppercase">
                          Inverter
                        </span>
                        <span className="text-foreground mt-0.5 block font-bold">
                          {lead.inverterKva} kVa
                        </span>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-2 text-center">
                        <span className="text-muted-foreground block text-[9px] tracking-wider uppercase">
                          Battery
                        </span>
                        <span className="text-foreground mt-0.5 block font-bold">
                          {lead.batteryKwh} kWh
                        </span>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-2 text-center">
                        <span className="text-muted-foreground block text-[9px] tracking-wider uppercase">
                          Panels
                        </span>
                        <span className="text-foreground mt-0.5 block font-bold">
                          {lead.panelCount} Pcs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-border/60 mt-4 flex items-center justify-between border-t pt-6">
                  <span className="text-muted-foreground text-[10px] font-semibold uppercase">
                    Max 3 Bids
                  </span>
                  {lead.status === "OPEN" ? (
                    <button
                      onClick={() => handleStartQuote(lead)}
                      className={cn(buttonVariants({ size: "sm" }), "cursor-pointer")}
                    >
                      Quote Lead
                    </button>
                  ) : (
                    <span className="rounded-lg border border-emerald-500/10 bg-emerald-500/5 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                      Bid Submitted
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: QUOTING BID ENGINE FORM */}
      {view === "quote" && selectedLead && (
        <div className="animate-in slide-in-from-right space-y-6 duration-150">
          <div className="border-border flex items-center justify-between border-b pb-4">
            <button
              onClick={() => setView("list")}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-semibold"
            >
              <ArrowLeft className="size-4" /> Back to Leads
            </button>
            <h2 className="text-foreground text-lg font-bold">Create Bidding Invoice</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Lead specification details */}
            <div className="space-y-6 lg:col-span-1">
              <Card className="border-border bg-card space-y-4 border p-6 shadow-xs">
                <h3 className="text-foreground text-sm font-bold">Lead Requirements</h3>
                <div className="text-muted-foreground space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="text-foreground font-semibold">{selectedLead.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inverter requested:</span>
                    <span className="text-foreground font-semibold">
                      {selectedLead.inverterKva} kVa
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage requested:</span>
                    <span className="text-foreground font-semibold">
                      {selectedLead.batteryKwh} kWh
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Solar panels count:</span>
                    <span className="text-foreground font-semibold">
                      {selectedLead.panelCount} × 450W
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quoting items form */}
            <div className="space-y-6 lg:col-span-2">
              <Card className="border-border bg-card space-y-6 border p-6 shadow-xs">
                <div className="border-border flex items-center justify-between border-b pb-3">
                  <h3 className="text-foreground text-sm font-bold">
                    Line Items (Standard Equipment)
                  </h3>
                  <button
                    type="button"
                    onClick={addLineItem}
                    className="text-primary flex items-center gap-1 text-xs font-semibold hover:underline"
                  >
                    <Plus className="size-3.5" /> Add custom item
                  </button>
                </div>

                <div className="space-y-4">
                  {quoteItems.map((item) => (
                    <div key={item.id} className="flex items-end gap-3">
                      <div className="flex-1 space-y-1">
                        <Label className="text-[10px]">Item Description</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => updateItemField(item.id, "name", e.target.value)}
                        />
                      </div>
                      <div className="w-16 space-y-1">
                        <Label className="text-[10px]">Qty</Label>
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItemField(item.id, "qty", Number(e.target.value))}
                        />
                      </div>
                      <div className="w-32 space-y-1">
                        <Label className="text-[10px]">Unit Price (₦)</Label>
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateItemField(item.id, "price", Number(e.target.value))
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLineItem(item.id)}
                        className="border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 flex size-9 cursor-pointer items-center justify-center rounded-lg border"
                        disabled={quoteItems.length <= 1}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-border grid grid-cols-2 gap-4 border-t pt-4">
                  <div className="space-y-1">
                    <Label htmlFor="laborCost">Labor & Logistics Cost (₦)</Label>
                    <Input
                      id="laborCost"
                      type="number"
                      value={laborCost}
                      onChange={(e) => setLaborCost(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="warranty">Hardware Warranty (Months)</Label>
                    <Input
                      id="warranty"
                      type="number"
                      value={warrantyMonths}
                      onChange={(e) => setWarrantyMonths(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Costs Summary Banner */}
                <div className="bg-muted/40 border-border space-y-2 rounded-xl border p-4 text-xs">
                  <div className="flex justify-between">
                    <span>Hardware Subtotal:</span>
                    <span className="font-semibold">₦{hardwareSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labor & Logistics:</span>
                    <span className="font-semibold">₦{laborCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gridless Platform Fee:</span>
                    <span className="font-semibold">₦{platformFee.toLocaleString()}</span>
                  </div>
                  <hr className="border-border/60" />
                  <div className="text-foreground flex justify-between text-sm font-bold">
                    <span>Total Bid Invoice:</span>
                    <span className="text-primary">₦{totalQuote.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setView("list")}
                    className={cn(buttonVariants({ variant: "ghost" }), "cursor-pointer")}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitQuote}
                    className={cn(buttonVariants(), "cursor-pointer gap-1.5")}
                  >
                    Submit Bid Quote
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
