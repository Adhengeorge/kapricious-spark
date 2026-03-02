import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { ShieldCheck, CreditCard, User, Mail, Phone, GraduationCap, Layers, Calendar, CheckCircle2, Sparkles } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Invalid phone number").max(15),
  college: z.string().trim().min(1, "College is required").max(200),
});

const Register = () => {
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event") || "";
  const preselectedDept = searchParams.get("department") || "";

  const [selectedDept, setSelectedDept] = useState(preselectedDept);
  const [selectedEvent, setSelectedEvent] = useState(preselectedEvent);
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registered, setRegistered] = useState(false);

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

  useQuery({
    queryKey: ["event-detail-reg", preselectedEvent],
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
    enabled: !!preselectedEvent && !preselectedDept,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const validated = schema.parse(form);

      const { data: regData, error } = await supabase.from("registrations").insert([{
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        college: validated.college,
        event_id: selectedEvent,
        department_id: selectedDept,
      }]).select("id").single();
      if (error) {
        if (error.code === "23505") throw new Error("You have already registered for this event.");
        throw error;
      }

      const { data: eventData } = await supabase
        .from("events")
        .select("title, event_date, venue")
        .eq("id", selectedEvent)
        .single();

      const emailRes = await supabase.functions.invoke("send-registration-email", {
        body: {
          participantName: validated.name,
          participantEmail: validated.email,
          eventName: eventData?.title || "Event",
          registrationId: regData.id,
          eventDate: eventData?.event_date,
          venue: eventData?.venue,
        },
      }).catch((err) => { console.error("Email send failed:", err); return null; });

      const emailRateLimited = emailRes?.data?.rateLimited === true;

      return { regData, emailRateLimited };
    },
    onSuccess: ({ emailRateLimited }) => {
      setRegistered(true);
      if (emailRateLimited) {
        toast.info("Registration successful! However, we couldn't send your event pass right now due to high demand. Please check your email tomorrow or contact the admin for your pass.");
      } else {
        toast.success("Registration successful! Check your email for the event pass 🎫");
      }
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

  const inputClass =
    "w-full rounded-xl bg-background/50 border border-border/60 pl-11 pr-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50";
  const selectClass =
    "w-full rounded-xl bg-background/50 border border-border/60 pl-11 pr-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all appearance-none cursor-pointer";
  const labelClass = "block font-accent text-[10px] tracking-[0.2em] uppercase text-primary/80 mb-1.5 font-semibold";

  if (registered) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">You're In! 🎉</h2>
          <p className="text-muted-foreground mb-6">
            Your registration was successful. We've sent your event pass with a QR code to your email.
          </p>
          <button
            onClick={() => setRegistered(false)}
            className="rounded-xl bg-primary/10 border border-primary/30 px-6 py-2.5 text-sm font-accent tracking-wider uppercase text-primary hover:bg-primary/20 transition-colors"
          >
            Register for Another Event
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-accent tracking-widest uppercase text-primary">Kapricious 2026</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            <span className="text-primary glow-cyan">Register</span> Now
          </h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Secure your spot. Select your department and event, fill in your details, and you're good to go.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden"
        >
          {/* Event Selection Section */}
          <div className="p-6 md:p-8 space-y-4 border-b border-border/40">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-accent text-xs tracking-widest uppercase text-muted-foreground font-semibold">Event Selection</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Department</label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <select
                    value={selectedDept}
                    onChange={(e) => { setSelectedDept(e.target.value); setSelectedEvent(""); }}
                    className={selectClass}
                  >
                    <option value="">Select Department</option>
                    {departments?.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Event</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    disabled={!selectedDept}
                    className={`${selectClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    <option value="">Select Event</option>
                    {events?.map((ev) => (
                      <option key={ev.id} value={ev.id}>{ev.title}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="p-6 md:p-8 space-y-4 border-b border-border/40">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-primary" />
              <span className="font-accent text-xs tracking-widest uppercase text-muted-foreground font-semibold">Personal Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className={labelClass}>Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>College</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input
                    type="text"
                    value={form.college}
                    onChange={(e) => setForm({ ...form, college: e.target.value })}
                    className={inputClass}
                    placeholder="Your college name"
                  />
                </div>
                {errors.college && <p className="text-xs text-destructive mt-1">{errors.college}</p>}
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="p-6 md:p-8 space-y-4 border-b border-border/40">
            <div className="rounded-xl border border-dashed border-primary/25 bg-primary/[0.03] p-5 text-center">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-sm font-bold text-foreground mb-1">Payment Gateway</h3>
              <p className="text-xs text-muted-foreground mb-3">Secure payment integration coming soon</p>
              <div className="flex justify-center gap-2">
                {["Razorpay", "Stripe", "Cashfree"].map((g) => (
                  <span key={g} className="rounded-full bg-background/80 border border-border/50 px-2.5 py-0.5 text-[9px] font-accent tracking-wider text-muted-foreground">{g}</span>
                ))}
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-muted-foreground/70">
                <ShieldCheck className="w-3 h-3 text-primary/60" />
                <span>256-bit SSL Encrypted</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="p-6 md:p-8">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full rounded-xl bg-primary py-3.5 font-accent text-sm tracking-widest uppercase text-primary-foreground font-bold hover:brightness-110 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Registering...
                </span>
              ) : (
                "Register Now"
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Register;
