import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { Copy, Check, Upload } from "lucide-react";

const UPI_ID = "kapricious@upi";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Invalid phone number").max(15),
  college: z.string().trim().min(1, "College is required").max(200),
  transactionId: z.string().trim().min(1, "Transaction ID is required").max(100),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const Register = () => {
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event") || "";

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(preselectedEvent);
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "", transactionId: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotError, setScreenshotError] = useState("");
  const [copied, setCopied] = useState(false);

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

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setScreenshotError("");
    if (!file) { setScreenshot(null); return; }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setScreenshotError("Only JPG, JPEG, PNG files are allowed");
      setScreenshot(null); return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setScreenshotError("File size must be under 5MB");
      setScreenshot(null); return;
    }
    setScreenshot(file);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const validated = schema.parse(form);
      if (!screenshot) throw new Error("Payment screenshot is required");

      // Upload screenshot
      const path = `${selectedEvent}/${Date.now()}_${screenshot.name}`;
      const { error: uploadError } = await supabase.storage.from("payment-screenshots").upload(path, screenshot);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("payment-screenshots").getPublicUrl(path);

      const { error } = await supabase.from("registrations").insert([{
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        college: validated.college,
        event_id: selectedEvent,
        department_id: selectedDept,
        transaction_id: validated.transactionId,
        screenshot_url: urlData.publicUrl,
      }]);
      if (error) {
        if (error.code === "23505") throw new Error("You have already registered for this event.");
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Registration successful! 🎉");
      setForm({ name: "", email: "", phone: "", college: "", transactionId: "" });
      setSelectedEvent("");
      setScreenshot(null);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setScreenshotError("");
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
    if (!screenshot) {
      setScreenshotError("Payment screenshot is required");
      return;
    }
    mutation.mutate();
  };

  const inputClass = "w-full rounded-lg bg-input border border-border px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

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
            <select value={selectedDept} onChange={(e) => { setSelectedDept(e.target.value); setSelectedEvent(""); }} className={inputClass}>
              <option value="">Select Department</option>
              {departments?.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
              ))}
            </select>
          </div>

          {/* Event */}
          <div>
            <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">Event</label>
            <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} disabled={!selectedDept} className={`${inputClass} disabled:opacity-50`}>
              <option value="">Select Event</option>
              {events?.map((ev) => (
                <option key={ev.id} value={ev.id}>{ev.title}</option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">Full Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Enter your full name" />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@example.com" />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+91 XXXXX XXXXX" />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>

          {/* College */}
          <div>
            <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">College</label>
            <input type="text" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} className={inputClass} placeholder="Your college name" />
            {errors.college && <p className="text-xs text-destructive mt-1">{errors.college}</p>}
          </div>

          {/* Payment Section */}
          <div className="border-t border-border pt-5 space-y-4">
            <h3 className="font-display text-base font-bold text-foreground">💰 Payment Details</h3>

            {/* UPI ID */}
            <div className="rounded-lg bg-secondary/30 border border-border p-4">
              <p className="text-xs text-muted-foreground mb-1 font-accent tracking-widest uppercase">Pay via UPI</p>
              <div className="flex items-center gap-2">
                <code className="text-primary font-mono text-sm font-bold">{UPI_ID}</code>
                <button type="button" onClick={copyUPI} className="text-muted-foreground hover:text-primary transition-colors">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">Transaction ID</label>
              <input type="text" value={form.transactionId} onChange={(e) => setForm({ ...form, transactionId: e.target.value })} className={inputClass} placeholder="Enter UPI transaction ID" />
              {errors.transactionId && <p className="text-xs text-destructive mt-1">{errors.transactionId}</p>}
            </div>

            {/* Screenshot Upload */}
            <div>
              <label className="block font-accent text-xs tracking-widest uppercase text-muted-foreground mb-2">Payment Screenshot</label>
              <label className="flex items-center gap-3 cursor-pointer rounded-lg bg-input border border-border px-4 py-3 hover:border-primary/50 transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {screenshot ? screenshot.name : "Upload screenshot (JPG, PNG, max 5MB)"}
                </span>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleScreenshotChange} className="hidden" />
              </label>
              {screenshotError && <p className="text-xs text-destructive mt-1">{screenshotError}</p>}
            </div>
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
