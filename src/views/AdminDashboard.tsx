"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  ArrowUpDown,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  LogOut,
  Upload,
  XCircle,
} from "lucide-react";

const PAYMENT_STATUSES = ["pending", "verified", "rejected"] as const;

const statusConfig = {
  pending: { icon: Clock, color: "text-yellow-500", label: "Pending" },
  verified: { icon: CheckCircle, color: "text-green-500", label: "Verified" },
  rejected: { icon: XCircle, color: "text-destructive", label: "Rejected" },
};

type SortKey = "name" | "email" | "created_at" | "payment_status";
type SortDir = "asc" | "desc";

const formatTeamMembers = (value: unknown) => {
  if (!Array.isArray(value)) return "";
  return value.map((member) => String(member)).join(", ");
};

const csvEscape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;

const AdminDashboard = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});
  const [sortConfig, setSortConfig] = useState<Record<string, { key: SortKey; dir: SortDir }>>({});

  const [uploadEventId, setUploadEventId] = useState("");
  const [certFile, setCertFile] = useState<File | null>(null);
  const [certEmail, setCertEmail] = useState("");
  const [certName, setCertName] = useState("");

  useEffect(() => {
    const check = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin");
        return;
      }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (!roles?.some((r) => r.role === "admin")) {
        await supabase.auth.signOut();
        router.push("/admin");
      }
    };
    check();
  }, [router]);

  const { data: events } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*, departments(name, code)").order("title");
      if (error) throw error;
      return data;
    },
  });

  const { data: registrations } = useQuery({
    queryKey: ["admin-registrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("registrations")
        .select("*, events(title), departments(code, name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updatePaymentStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("registrations").update({ payment_status: status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-registrations"] });
      toast.success("Payment status updated");
    },
  });

  const updateRegistrationMeta = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Record<string, unknown> }) => {
      const { error } = await supabase.from("registrations").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-registrations"] });
      toast.success("Registration updated");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const uploadCert = useMutation({
    mutationFn: async () => {
      if (!certFile || !uploadEventId || !certEmail || !certName) throw new Error("Fill all fields");
      const path = `${uploadEventId}/${Date.now()}_${certFile.name}`;
      const { error: uploadError } = await supabase.storage.from("certificates").upload(path, certFile);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("certificates").getPublicUrl(path);
      const { data: reg } = await supabase
        .from("registrations")
        .select("id")
        .eq("email", certEmail)
        .eq("event_id", uploadEventId)
        .single();
      const { error } = await supabase.from("certificates").insert({
        event_id: uploadEventId,
        participant_email: certEmail,
        participant_name: certName,
        certificate_url: urlData.publicUrl,
        registration_id: (reg?.id || null) as any,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Certificate uploaded!");
      setCertFile(null);
      setCertEmail("");
      setCertName("");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const groupedByEvent = useMemo(() => {
    if (!registrations || !events) return [];
    const map = new Map<string, { event: any; registrations: any[] }>();
    events.forEach((ev) => map.set(ev.id, { event: ev, registrations: [] }));
    registrations.forEach((r) => {
      const group = map.get(r.event_id);
      if (group) group.registrations.push(r);
    });
    return Array.from(map.values()).filter((g) => g.registrations.length > 0);
  }, [registrations, events]);

  const toggleEvent = (eventId: string) => {
    setExpandedEvents((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  const toggleSort = (eventId: string, key: SortKey) => {
    setSortConfig((prev) => {
      const current = prev[eventId];
      if (current?.key === key) {
        return { ...prev, [eventId]: { key, dir: current.dir === "asc" ? "desc" : "asc" } };
      }
      return { ...prev, [eventId]: { key, dir: "asc" } };
    });
  };

  const getSorted = (eventId: string, rows: any[]) => {
    const config = sortConfig[eventId];
    if (!config) return rows;
    return [...rows].sort((a, b) => {
      let aVal = a[config.key] ?? "";
      let bVal = b[config.key] ?? "";
      if (config.key === "created_at") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }
      if (aVal < bVal) return config.dir === "asc" ? -1 : 1;
      if (aVal > bVal) return config.dir === "asc" ? 1 : -1;
      return 0;
    });
  };

  const downloadCSV = (eventTitle: string, rows: any[]) => {
    const headers = [
      "Name",
      "Event",
      "Email",
      "Phone",
      "College",
      "Team Size",
      "Team Members",
      "Coupon Code",
      "Amount Paid",
      "Transaction ID",
      "Payment Status",
      "Checked In",
      "Registration Time",
    ];

    const csvRows = rows.map((r) => [
      r.name,
      (r.events as any)?.title || eventTitle,
      r.email,
      r.phone,
      r.college,
      r.team_size ?? 1,
      formatTeamMembers(r.team_members),
      r.entry_code || "",
      r.amount_paid ?? "",
      r.transaction_id || "",
      r.payment_status || "pending",
      r.checked_in ? "Yes" : "No",
      new Date(r.created_at).toLocaleString(),
    ]);

    const csv = [headers, ...csvRows].map((row) => row.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventTitle.toLowerCase().replace(/\s+/g, "_")}_registrations.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded!");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  const SortHeader = ({
    eventId,
    sortKey,
    children,
  }: {
    eventId: string;
    sortKey: SortKey;
    children: React.ReactNode;
  }) => {
    const active = sortConfig[eventId]?.key === sortKey;
    return (
      <th
        onClick={() => toggleSort(eventId, sortKey)}
        className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground select-none whitespace-nowrap"
      >
        <span className="inline-flex items-center gap-1">
          {children}
          <ArrowUpDown className={`w-3 h-3 ${active ? "text-primary" : "opacity-40"}`} />
        </span>
      </th>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Events</p>
            <p className="text-2xl font-bold text-foreground mt-1">{events?.length || 0}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Registrations</p>
            <p className="text-2xl font-bold text-foreground mt-1">{registrations?.length || 0}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Verified Payments</p>
            <p className="text-2xl font-bold text-green-500 mt-1">
              {registrations?.filter((r) => r.payment_status === "verified").length || 0}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Pending Payments</p>
            <p className="text-2xl font-bold text-yellow-500 mt-1">
              {registrations?.filter((r) => r.payment_status === "pending").length || 0}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {groupedByEvent.map(({ event, registrations: eventRegs }) => {
            const isExpanded = expandedEvents[event.id] !== false;
            const sorted = getSorted(event.id, eventRegs);

            return (
              <div key={event.id} className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-lg font-bold text-foreground">{event.title}</h2>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {(event.departments as any)?.code}
                    </span>
                    <span className="text-xs text-primary font-medium">
                      {eventRegs.length} registration{eventRegs.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => downloadCSV(event.title, eventRegs)}
                      className="flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/30 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Download className="w-3 h-3" /> Download CSV
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleEvent(event.id)}
                      className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                      aria-label={isExpanded ? `Collapse ${event.title}` : `Expand ${event.title}`}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/20">
                          <SortHeader eventId={event.id} sortKey="name">Name</SortHeader>
                          <SortHeader eventId={event.id} sortKey="email">Email</SortHeader>
                          <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Coupon Code</th>
                          <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Phone</th>
                          <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">College</th>
                          <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Team Size</th>
                          <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Team Members</th>
                          <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Amount</th>
                          <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Txn ID</th>
                          <SortHeader eventId={event.id} sortKey="created_at">Registered</SortHeader>
                          <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Check-In</th>
                          <SortHeader eventId={event.id} sortKey="payment_status">Payment</SortHeader>
                        </tr>
                      </thead>
                      <tbody>
                        {sorted.map((r) => {
                          const status = (r.payment_status as keyof typeof statusConfig) || "pending";
                          return (
                            <tr key={r.id} className="border-t border-border/30 hover:bg-muted/10">
                              <td className="px-4 py-3 text-foreground whitespace-nowrap">{r.name}</td>
                              <td className="px-4 py-3 text-muted-foreground text-xs">{r.email}</td>
                              <td className="px-4 py-3 text-foreground text-xs font-mono whitespace-nowrap">{r.entry_code || "-"}</td>
                              <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{r.phone}</td>
                              <td className="px-4 py-3 text-muted-foreground text-xs">{r.college}</td>
                              <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{r.team_size ?? 1}</td>
                              <td className="px-4 py-3 text-muted-foreground text-xs min-w-[220px]">{formatTeamMembers(r.team_members) || "-"}</td>
                              <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                                {r.amount_paid != null ? `INR ${Number(r.amount_paid).toLocaleString("en-IN")}` : "-"}
                              </td>
                              <td className="px-4 py-3 text-foreground text-xs font-mono">{r.transaction_id || "-"}</td>
                              <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                                {new Date(r.created_at).toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-xs whitespace-nowrap">
                                <label className="inline-flex items-center gap-2 text-foreground">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(r.checked_in)}
                                    onChange={(e) =>
                                      updateRegistrationMeta.mutate({
                                        id: r.id,
                                        patch: {
                                          checked_in: e.target.checked,
                                          checked_in_at: e.target.checked ? new Date().toISOString() : null,
                                        },
                                      })
                                    }
                                  />
                                  {r.checked_in ? "Done" : "Pending"}
                                </label>
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  value={status}
                                  onChange={(e) => updatePaymentStatus.mutate({ id: r.id, status: e.target.value })}
                                  className={`rounded bg-input border border-border px-2 py-1 text-xs ${statusConfig[status]?.color || ""}`}
                                >
                                  {PAYMENT_STATUSES.map((s) => (
                                    <option key={s} value={s}>
                                      {statusConfig[s].label}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                          );
                        })}
                        {eventRegs.length === 0 && (
                          <tr>
                            <td colSpan={12} className="px-4 py-8 text-center text-muted-foreground">
                              No registrations
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}

          {groupedByEvent.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">
              No events with registrations found.
            </div>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" /> Upload Certificate
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={uploadEventId}
              onChange={(e) => setUploadEventId(e.target.value)}
              className="rounded-lg bg-input border border-border px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select Event</option>
              {events?.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              placeholder="Participant name"
              className="rounded-lg bg-input border border-border px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="email"
              value={certEmail}
              onChange={(e) => setCertEmail(e.target.value)}
              placeholder="Participant email"
              className="rounded-lg bg-input border border-border px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setCertFile(e.target.files?.[0] || null)}
              className="rounded-lg bg-input border border-border px-4 py-2 text-sm text-foreground file:bg-transparent file:border-0 file:text-primary file:font-medium file:text-xs"
            />
          </div>
          <button
            onClick={() => uploadCert.mutate()}
            disabled={uploadCert.isPending}
            className="rounded-lg bg-primary px-6 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {uploadCert.isPending ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
