import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { User, Mail, Phone, GraduationCap, Calendar, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

const culturalEvents = [
  { id: "fashion-show", title: "Fashion Show" },
  { id: "group-dance", title: "Group Dance" },
  { id: "step-in-synchro", title: "Step in Synchro" },
  { id: "spot-photography", title: "Spot Photography" },
  { id: "star-of-kapricious", title: "Star of Kapricious" },
];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Invalid phone number").max(15),
  college: z.string().trim().min(1, "College is required").max(200),
});

const CulturalRegister = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registered, setRegistered] = useState(false);

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
    if (!selectedEvent) {
      toast.error("Please select a cultural event.");
      return;
    }
    // Simulate registration success
    setRegistered(true);
    setForm({ name: "", email: "", phone: "", college: "" });
    setSelectedEvent("");
    toast.success("Registration successful! Check your email for the event pass 🎫");
  };

  const inputClass =
    "w-full rounded-2xl bg-secondary/50 border border-border pl-11 pr-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all placeholder:text-muted-foreground/40";
  const selectClass =
    "w-full rounded-2xl bg-secondary/50 border border-border pl-11 pr-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all appearance-none cursor-pointer";
  const labelClass = "block text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2";

  if (registered) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center grid-bg px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-large border border-border p-12 text-center max-w-md w-full"
        >
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground mb-3">YOU'RE IN</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Your registration was successful. We've sent your event pass with a QR code to your email.
          </p>
          <button
            onClick={() => setRegistered(false)}
            className="w-full bg-foreground text-background rounded-2xl px-6 py-3.5 text-sm font-bold hover:opacity-90 transition-all"
          >
            Register for Another Event
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 grid-bg px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">Cultural Extravaganza</span>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">
            <span className="text-accent">REGISTER</span> FOR CULTURAL EVENTS
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Choose your favorite cultural event, fill in your details, and join the celebration!
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-large border border-border overflow-hidden"
        >
          {/* Event Selection */}
          <div className="p-6 md:p-8 space-y-4 border-b border-border">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Cultural Event Selection</span>
            </div>
            <div>
              <label className={labelClass}>Event</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select</option>
                  {culturalEvents.map((ev) => (
                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="p-6 md:p-8 space-y-4 border-b border-border">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Personal Details</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="John Doe" />
                </div>
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@example.com" />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+91 XXXXX XXXXX" />
                </div>
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>College</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input type="text" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} className={inputClass} placeholder="Your college name" />
                </div>
                {errors.college && <p className="text-xs text-destructive mt-1">{errors.college}</p>}
              </div>
            </div>
          </div>

          {/* Payment Placeholder */}
          <div className="p-6 md:p-8 border-b border-border">
            <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xs font-bold text-foreground mb-1">PAYMENT GATEWAY</h3>
              <p className="text-[10px] text-muted-foreground mb-3 uppercase tracking-wider">Coming Soon</p>
              <div className="flex justify-center gap-2">
                {["Razorpay", "Stripe", "Cashfree"].map((g) => (
                  <span key={g} className="rounded-full bg-card border border-border px-2.5 py-0.5 text-[9px] tracking-wider text-muted-foreground">{g}</span>
                ))}
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-muted-foreground/50">
                <ShieldCheck className="w-3 h-3" />
                <span>256-bit SSL Encrypted</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="p-6 md:p-8">
            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-3 bg-foreground text-background rounded-2xl py-4 font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-all"
            >
              Register Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CulturalRegister;
