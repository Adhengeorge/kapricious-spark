import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Invalid phone number").max(15),
  college: z.string().trim().min(1, "College is required").max(200),
});

const Register = () => {
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event") || "";

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(preselectedEvent);
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("departments").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: events } = useQuery({
    queryKey: ["events-by-dept", selectedDept],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("department_id", selectedDept)
        .order("title");
      if (error) throw error;
      return data;
    },
    enabled: !!selectedDept,
  });

  // If preselected event, fetch its department
  useQuery({
    queryKey: ["event-detail", preselectedEvent],
    queryFn: async () => {
      if (!preselectedEvent) return null;
      const { data, error } = await supabase.from("events").select("department_id").eq("id", preselectedEvent).single();
      if (error) throw error;
      if (data) {
        setSelectedDept(data.department_id);
        setSelectedEvent(preselectedEvent);
      }
      return data;
    },
    enabled: !!preselectedEvent,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const validated = schema.parse(form);
      const { error } = await supabase.from("registrations").insert([{
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        college: validated.college,
        event_id: selectedEvent,
        department_id: selectedDept,
      }]);
      if (error) {
        if (error.code === "23505") throw new Error("You have already registered for this event.");
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Registration successful! 🎉");
      setForm({ name: "", email: "", phone: "", college: "" });
      setSelectedEvent("");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    if (!selectedDept || !selectedEvent) {
      toast.error("Please select a department and event.");
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold mb-2">
            <span className="text-primary glow-cyan">Register</span>
          </h1>
          <p className="text-muted-foreground">Join the competition. Select your department and event below.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="neon-border rounded-xl p-6 md:p-8 bg-card/50 backdrop-blur space-y-5"
        >
          {/* Department */}
          <div>
            <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">Department</label>
            <select
              value={selectedDept}
              onChange={(e) => { setSelectedDept(e.target.value); setSelectedEvent(""); }}
              className="w-full rounded-lg bg-input border border-border px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select Department</option>
              {departments?.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
              ))}
            </select>
          </div>

          {/* Event */}
          <div>
            <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">Event</label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              disabled={!selectedDept}
              className="w-full rounded-lg bg-input border border-border px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            >
              <option value="">Select Event</option>
              {events?.map((ev) => (
                <option key={ev.id} value={ev.id}>{ev.title}</option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg bg-input border border-border px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg bg-input border border-border px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg bg-input border border-border px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="+91 XXXXX XXXXX"
            />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>

          {/* College */}
          <div>
            <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">College</label>
            <input
              type="text"
              value={form.college}
              onChange={(e) => setForm({ ...form, college: e.target.value })}
              className="w-full rounded-lg bg-input border border-border px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Your college name"
            />
            {errors.college && <p className="text-xs text-destructive mt-1">{errors.college}</p>}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-lg bg-primary py-3 font-accent text-sm tracking-widest uppercase text-primary-foreground font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Register;
