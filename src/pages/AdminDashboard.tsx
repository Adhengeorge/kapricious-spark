import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Search, Trash2, Upload } from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Auth check
  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin"); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (!roles?.some((r) => r.role === "admin")) {
        await supabase.auth.signOut();
        navigate("/admin");
      }
    };
    check();
  }, [navigate]);

  const { data: events } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*, departments(name, code)").order("title");
      if (error) throw error;
      return data;
    },
  });

  const { data: registrations } = useQuery({
    queryKey: ["admin-registrations", selectedEvent],
    queryFn: async () => {
      let q = supabase.from("registrations").select("*, events(title), departments(code)").order("created_at", { ascending: false });
      if (selectedEvent) q = q.eq("event_id", selectedEvent);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });

  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success("Event deleted");
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const filteredRegistrations = registrations?.filter(
    (r) =>
      !searchTerm ||
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Certificate upload
  const [uploadEventId, setUploadEventId] = useState("");
  const [certFile, setCertFile] = useState<File | null>(null);
  const [certEmail, setCertEmail] = useState("");
  const [certName, setCertName] = useState("");

  const uploadCert = useMutation({
    mutationFn: async () => {
      if (!certFile || !uploadEventId || !certEmail || !certName) throw new Error("Fill all fields");
      const path = `${uploadEventId}/${Date.now()}_${certFile.name}`;
      const { error: uploadError } = await supabase.storage.from("certificates").upload(path, certFile);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("certificates").getPublicUrl(path);

      // Find registration
      const { data: reg } = await supabase.from("registrations").select("id").eq("email", certEmail).eq("event_id", uploadEventId).single();
      
      const { error } = await supabase.from("certificates").insert({
        event_id: uploadEventId,
        participant_email: certEmail,
        participant_name: certName,
        certificate_url: urlData.publicUrl,
        registration_id: reg?.id || null as any,
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

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Events list */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">Events</h2>
            {events?.map((ev) => (
              <div key={ev.id} className="neon-border rounded-lg p-4 bg-card/50 flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-bold text-foreground">{ev.title}</p>
                  <p className="text-xs text-muted-foreground">{(ev.departments as any)?.code}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedEvent(ev.id)}
                    className="text-xs text-primary hover:underline"
                  >
                    View
                  </button>
                  <button onClick={() => deleteEvent.mutate(ev.id)} className="text-destructive hover:opacity-70">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Registrations */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="font-display text-lg font-bold text-foreground">Participants</h2>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search participants..."
                  className="w-full rounded-lg bg-input border border-border pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="neon-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left px-4 py-3 font-accent text-xs tracking-widest uppercase text-muted-foreground">Name</th>
                      <th className="text-left px-4 py-3 font-accent text-xs tracking-widest uppercase text-muted-foreground">Email</th>
                      <th className="text-left px-4 py-3 font-accent text-xs tracking-widest uppercase text-muted-foreground">College</th>
                      <th className="text-left px-4 py-3 font-accent text-xs tracking-widest uppercase text-muted-foreground">Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations?.map((r) => (
                      <tr key={r.id} className="border-b border-border/30 hover:bg-primary/5">
                        <td className="px-4 py-3 text-foreground">{r.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.college}</td>
                        <td className="px-4 py-3 text-primary text-xs">{(r.events as any)?.title}</td>
                      </tr>
                    ))}
                    {filteredRegistrations?.length === 0 && (
                      <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No registrations found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Certificate Upload */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neon-border rounded-xl p-6 bg-card/50 space-y-4">
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
                  {events?.map((ev) => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
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
                  className="rounded-lg bg-input border border-border px-4 py-2 text-sm text-foreground file:bg-transparent file:border-0 file:text-primary file:font-accent file:text-xs"
                />
              </div>
              <button
                onClick={() => uploadCert.mutate()}
                disabled={uploadCert.isPending}
                className="rounded-lg bg-primary px-6 py-2 font-accent text-xs tracking-widest uppercase text-primary-foreground font-bold hover:opacity-90 disabled:opacity-50"
              >
                {uploadCert.isPending ? "Uploading..." : "Upload"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
