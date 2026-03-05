import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { User, Mail, Phone, GraduationCap, Layers, Calendar, CheckCircle2, CreditCard, ShieldCheck, ArrowRight, Trophy, Sparkles, Zap } from "lucide-react";
import { flagshipEvents, getEventById, culturalEvents, cseEvents, ceEvents, meEvents, eeeEvents, raEvents, sfEvents, eceEvents } from "@/data/events/index";

const FLAGSHIP_DEPT_ID = "flagship";
const CULTURAL_DEPT_ID = "cultural";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Invalid phone number").max(15),
  college: z.string().trim().min(1, "College is required").max(200),
});

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/20"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

// Animated grid background
const AnimatedGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03]">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
};

const Register = () => {
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event") || "";

  const preselectedFlagship = getEventById(preselectedEvent);
  const preselectedCultural = culturalEvents.find(ev => ev.id === preselectedEvent);
  const initialDept = preselectedFlagship ? FLAGSHIP_DEPT_ID : preselectedCultural ? CULTURAL_DEPT_ID : "";

  const [selectedDept, setSelectedDept] = useState(initialDept);
  const [selectedEvent, setSelectedEvent] = useState(preselectedFlagship || preselectedCultural ? preselectedEvent : "");
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registered, setRegistered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    if (preselectedFlagship) {
      setSelectedDept(FLAGSHIP_DEPT_ID);
      setSelectedEvent(preselectedEvent);
    }
  }, [preselectedEvent, preselectedFlagship]);

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("departments").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  // Fetch ALL database events to map titles to IDs
  const { data: allDbEvents } = useQuery({
    queryKey: ["all-db-events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("id, title, department_id").order("title");
      if (error) throw error;
      return data;
    },
  });

  // Get events list based on selected department
  const getEventsForDept = () => {
    if (selectedDept === FLAGSHIP_DEPT_ID) {
      return flagshipEvents.map(e => ({ id: e.id, title: e.title, type: "flagship" }));
    }
    if (selectedDept === CULTURAL_DEPT_ID) {
      return culturalEvents.map(e => ({ id: e.id, title: e.title, type: "cultural" }));
    }
    if (selectedDept && departments) {
      const dept = departments.find(d => d.id === selectedDept);
      if (dept?.code === "CSE") return cseEvents.map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "CE") return ceEvents.map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "ME") return meEvents.map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "EEE") return eeeEvents.map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "RAE") return raEvents.map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "SF") return sfEvents.map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "ECE") return eceEvents.map(e => ({ id: e.id, title: e.title }));
    }
    return [];
  };

  const events = getEventsForDept();

  // Get selected event details for display
  const getSelectedEventDetails = () => {
    if (selectedDept === FLAGSHIP_DEPT_ID) return getEventById(selectedEvent);
    if (selectedDept === CULTURAL_DEPT_ID) return culturalEvents.find(ev => ev.id === selectedEvent);
    if (selectedDept && departments) {
      const dept = departments.find(d => d.id === selectedDept);
      const allEvents = [...cseEvents, ...ceEvents, ...meEvents, ...eeeEvents, ...raEvents, ...sfEvents, ...eceEvents];
      return allEvents.find(ev => ev.id === selectedEvent);
    }
    return undefined;
  };

  const selectedEventDetails = getSelectedEventDetails();

  // Helper: find DB event UUID by matching title
  const findDbEventId = (eventTitle: string): string | null => {
    if (!allDbEvents) return null;
    const match = allDbEvents.find(e => e.title === eventTitle);
    return match?.id || null;
  };

  // Helper: find DB department ID by event
  const findDbDeptId = (eventTitle: string): string | null => {
    if (!allDbEvents) return null;
    const match = allDbEvents.find(e => e.title === eventTitle);
    return match?.department_id || null;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const validated = schema.parse(form);
      const isFlagship = selectedDept === FLAGSHIP_DEPT_ID;
      const isCultural = selectedDept === CULTURAL_DEPT_ID;

      // Get the event title from hardcoded data
      let eventTitle = "";
      if (isFlagship) {
        eventTitle = getEventById(selectedEvent)?.title || "";
      } else if (isCultural) {
        eventTitle = culturalEvents.find(ev => ev.id === selectedEvent)?.title || "";
      } else {
        const allHardcoded = [...cseEvents, ...ceEvents, ...meEvents, ...eeeEvents, ...raEvents, ...sfEvents, ...eceEvents];
        eventTitle = allHardcoded.find(ev => ev.id === selectedEvent)?.title || "";
      }

      // Look up the DB UUID for this event
      const dbEventId = findDbEventId(eventTitle);
      const dbDeptId = findDbDeptId(eventTitle);

      if (!dbEventId || !dbDeptId) {
        throw new Error("Event not found in database. Please try again later.");
      }

      const { data: regData, error } = await supabase.from("registrations").insert([{
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        college: validated.college,
        event_id: dbEventId,
        department_id: dbDeptId,
      }]).select("id").single();
      
      if (error) {
        if (error.code === "23505") throw new Error("You have already registered for this event.");
        throw error;
      }

      // Get event details for email
      let eventName = eventTitle;
      let eventDate = "";
      let venue = "";

      if (isFlagship) {
        const fe = getEventById(selectedEvent);
        if (fe) { eventDate = fe.date; venue = fe.venue; }
      } else if (isCultural) {
        const ce = culturalEvents.find(ev => ev.id === selectedEvent);
        if (ce) { eventDate = ce.date || ""; venue = ce.venue || ""; }
      } else {
        const { data: eventData } = await supabase
          .from("events")
          .select("title, event_date, venue")
          .eq("id", dbEventId)
          .single();
        eventName = eventData?.title || eventTitle;
        eventDate = eventData?.event_date || "";
        venue = eventData?.venue || "";
      }

      const emailRes = await supabase.functions.invoke("send-registration-email", {
        body: {
          participantName: validated.name,
          participantEmail: validated.email,
          eventName,
          registrationId: regData.id,
          eventDate,
          venue,
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
      toast.error("Please select a category and event.");
      return;
    }
    mutation.mutate();
  };

  const inputClass =
    "w-full rounded-2xl bg-secondary/50 border border-border pl-11 pr-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all placeholder:text-muted-foreground/40";
  const selectClass =
    "w-full rounded-2xl bg-secondary/50 border border-border pl-11 pr-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all appearance-none cursor-pointer";
  const labelClass = "block text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2";

  if (registered) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center grid-bg px-4">
        <FloatingParticles />
        <AnimatedGrid />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="bg-card rounded-large border border-border p-12 text-center max-w-md w-full relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-display text-2xl font-bold text-foreground mb-3"
          >
            YOU'RE IN
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-muted-foreground mb-8"
          >
            Your registration was successful. We've sent your event pass with a QR code to your email.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setRegistered(false)}
            className="w-full bg-foreground text-background rounded-2xl px-6 py-3.5 text-sm font-bold hover:opacity-90 transition-all"
          >
            Register for Another Event
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-16 grid-bg px-4 relative">
      <FloatingParticles />
      <AnimatedGrid />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-6"
          >
            <Zap className="w-3 h-3 text-accent" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">Join the Movement</span>
          </motion.div>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">
            <span className="text-accent">REGISTER</span> NOW
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Choose from flagship events or department events, fill in your details, and you're good to go.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Decorative */}
          <motion.div
            style={{ y: parallaxY }}
            className="hidden lg:flex lg:col-span-2 flex-col gap-6"
          >
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-card rounded-large border border-border p-8"
            >
              <h3 className="font-display text-sm tracking-tight mb-6 text-muted-foreground">WHY JOIN?</h3>
              <div className="space-y-4">
                {[
                  { icon: Trophy, label: "₹2L+ in Prizes", desc: "Across all events" },
                  { icon: Sparkles, label: "40+ Events", desc: "8 departments" },
                  { icon: Calendar, label: "March 27-28", desc: "Two day festival" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Decorative animation card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-foreground text-background rounded-large p-8 relative overflow-hidden flex-1"
            >
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="15s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-lg font-bold mb-2">KAPRICIOUS '26</h3>
                <p className="text-sm opacity-60 leading-relaxed">
                  The flagship annual tech fest of KMEA Engineering College. Be part of the future.
                </p>
                <div className="mt-6 pt-4 border-t border-background/20">
                  <p className="text-[10px] uppercase tracking-widest opacity-40">KMEA Engineering College</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mt-1">Aluva, Kerala</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-card rounded-large border border-border overflow-hidden"
          >
            {/* Event Selection */}
            <div className="p-6 md:p-8 space-y-4 border-b border-border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Event Selection</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Category</label>
                  <div className="relative">
                    {selectedDept === FLAGSHIP_DEPT_ID ? (
                      <Trophy className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                    ) : (
                      <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    )}
                    <select
                      value={selectedDept}
                      onChange={(e) => { setSelectedDept(e.target.value); setSelectedEvent(""); }}
                      className={selectClass}
                    >
                      <option value="">Select</option>
                      <option value={FLAGSHIP_DEPT_ID}>⭐ Flagship Events</option>
                      <optgroup label="Department Events">
                        {departments?.filter(d => !['CULTURAL', 'FLAGSHIP'].includes(d.code)).map((d) => (
                          <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                        ))}
                      </optgroup>
                      <option value={CULTURAL_DEPT_ID}>🎭 Cultural Events</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Event</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <select
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                      disabled={!selectedDept}
                      className={`${selectClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      <option value="">Select</option>
                      {events?.map((ev) => (
                        <option key={ev.id} value={ev.id}>{ev.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Event Details Banner */}
              {(selectedDept === FLAGSHIP_DEPT_ID || selectedDept === CULTURAL_DEPT_ID) && selectedEvent && selectedEventDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl bg-secondary/50 border border-border p-4"
                >
                  <div className="flex items-start gap-4">
                    {selectedDept === FLAGSHIP_DEPT_ID && ('image' in selectedEventDetails) && (
                      <img
                        src={(selectedEventDetails as any).image}
                        alt={selectedEventDetails.title}
                        className="w-20 h-20 rounded-xl object-cover hidden sm:block"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-accent">
                          {selectedDept === FLAGSHIP_DEPT_ID ? "Flagship Event" : "Cultural Event"}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-foreground truncate">{selectedEventDetails.title}</h4>
                      {selectedDept === FLAGSHIP_DEPT_ID && ('category' in selectedEventDetails) && (
                        <p className="text-xs text-muted-foreground">{(selectedEventDetails as any).category}</p>
                      )}
                      <div className="flex flex-wrap gap-3 mt-2">
                        {selectedDept === FLAGSHIP_DEPT_ID && ('prize' in selectedEventDetails) && (
                          <span className="text-[10px] bg-card rounded-full px-2 py-1 border border-border text-muted-foreground">
                            Prize: <span className="text-foreground font-bold">{(selectedEventDetails as any).prize}</span>
                          </span>
                        )}
                        {('date' in selectedEventDetails) && (
                          <span className="text-[10px] bg-card rounded-full px-2 py-1 border border-border text-muted-foreground">
                            {(selectedEventDetails as any).date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
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
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
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
              <motion.button
                type="submit"
                disabled={mutation.isPending}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group w-full flex items-center justify-center gap-3 bg-foreground text-background rounded-2xl py-4 font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Registering...
                  </span>
                ) : (
                  <>
                    Register Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Register;
