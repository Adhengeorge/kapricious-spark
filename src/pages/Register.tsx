import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { User, Mail, Phone, GraduationCap, Layers, Calendar, CheckCircle2, CreditCard, ShieldCheck, ArrowRight, Trophy, Sparkles, Zap, Users, AlertTriangle, Loader2 } from "lucide-react";
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

type Step = "details" | "payment";

const Register = () => {
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event") || "";
  const preselectedDeptParam = searchParams.get("dept") || searchParams.get("department") || "";

  const preselectedFlagship = getEventById(preselectedEvent);
  const preselectedCultural = culturalEvents.find(ev => ev.id === preselectedEvent);
  
  const allDeptEvents = [...cseEvents, ...ceEvents, ...meEvents, ...eeeEvents, ...raEvents, ...sfEvents, ...eceEvents];
  const preselectedDeptEvent = allDeptEvents.find(ev => ev.id === preselectedEvent);
  
  const getInitialDept = () => {
    if (preselectedFlagship) return FLAGSHIP_DEPT_ID;
    if (preselectedCultural) return CULTURAL_DEPT_ID;
    if (preselectedDeptParam) return preselectedDeptParam;
    if (preselectedDeptEvent && preselectedDeptEvent.department) {
      return preselectedDeptEvent.department;
    }
    return "";
  };

  const [selectedDept, setSelectedDept] = useState(getInitialDept());
  const [selectedEvent, setSelectedEvent] = useState(preselectedFlagship || preselectedCultural || preselectedDeptEvent ? preselectedEvent : "");
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registered, setRegistered] = useState(false);
  const [selectedTeamSize, setSelectedTeamSize] = useState(1);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [slotCheckLoading, setSlotCheckLoading] = useState(false);
  const [slotsAvailable, setSlotsAvailable] = useState<number | null>(null);
  const [maxSlots, setMaxSlots] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    if (preselectedFlagship) {
      setSelectedDept(FLAGSHIP_DEPT_ID);
      setSelectedEvent(preselectedEvent);
    } else if (preselectedCultural) {
      setSelectedDept(CULTURAL_DEPT_ID);
      setSelectedEvent(preselectedEvent);
    }
  }, [preselectedEvent, preselectedFlagship, preselectedCultural]);

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("departments").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const visibleDepartments = departments?.filter((d) => {
    const normalizedCode = (d.code || "").toUpperCase();
    const normalizedName = (d.name || "").toLowerCase();
    if (["CULTURAL", "FLAGSHIP", "AI"].includes(normalizedCode)) return false;
    if (normalizedName.includes("artificial intelligence")) return false;
    return true;
  });

  useEffect(() => {
    if (!departments || !preselectedEvent) return;
    if (selectedDept === FLAGSHIP_DEPT_ID || selectedDept === CULTURAL_DEPT_ID) return;
    if (preselectedDeptEvent && preselectedDeptEvent.department) {
      const deptByCode = departments.find(d => d.code === preselectedDeptEvent.department);
      if (deptByCode && selectedDept !== deptByCode.id) {
        setSelectedDept(deptByCode.id);
        setSelectedEvent(preselectedEvent);
      }
    }
    if (preselectedDeptParam) {
      const isValidUUID = departments.some(d => d.id === selectedDept);
      if (!isValidUUID) {
        const deptByCode = departments.find(d => d.code === preselectedDeptParam || d.code === selectedDept);
        if (deptByCode) {
          setSelectedDept(deptByCode.id);
          setSelectedEvent(preselectedEvent);
        }
      }
    }
  }, [departments, preselectedEvent, preselectedDeptEvent, preselectedDeptParam, selectedDept]);

  const { data: allDbEvents } = useQuery({
    queryKey: ["all-db-events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("id, title, department_id").order("title");
      if (error) throw error;
      return data;
    },
  });

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

  const getSelectedEventDetails = () => {
    if (selectedDept === FLAGSHIP_DEPT_ID) return getEventById(selectedEvent);
    if (selectedDept === CULTURAL_DEPT_ID) return culturalEvents.find(ev => ev.id === selectedEvent);
    if (selectedDept && departments) {
      const allEvents = [...cseEvents, ...ceEvents, ...meEvents, ...eeeEvents, ...raEvents, ...sfEvents, ...eceEvents];
      return allEvents.find(ev => ev.id === selectedEvent);
    }
    return undefined;
  };

  const selectedEventDetails = getSelectedEventDetails();

  const isTeamEvent = selectedEventDetails && 'teamSize' in selectedEventDetails && (selectedEventDetails as any).teamSize > 1;
  const maxTeamSize = isTeamEvent ? (selectedEventDetails as any).teamSize : 1;

  useEffect(() => {
    if (selectedTeamSize > 1) {
      setTeamMembers(prev => {
        const needed = selectedTeamSize - 1;
        if (prev.length < needed) return [...prev, ...Array(needed - prev.length).fill("")];
        return prev.slice(0, needed);
      });
    } else {
      setTeamMembers([]);
    }
  }, [selectedTeamSize]);

  useEffect(() => {
    setSelectedTeamSize(1);
    setTeamMembers([]);
    // Reset to details step when event changes
    setCurrentStep("details");
    setSlotsAvailable(null);
    setMaxSlots(null);
  }, [selectedEvent]);

  const findDbEventId = (eventTitle: string): string | null => {
    if (!allDbEvents) return null;
    const match = allDbEvents.find(e => e.title === eventTitle);
    return match?.id || null;
  };

  const findDbDeptId = (eventTitle: string): string | null => {
    if (!allDbEvents) return null;
    const match = allDbEvents.find(e => e.title === eventTitle);
    return match?.department_id || null;
  };

  // Get event title from selected event
  const getEventTitle = () => {
    if (selectedDept === FLAGSHIP_DEPT_ID) return getEventById(selectedEvent)?.title || "";
    if (selectedDept === CULTURAL_DEPT_ID) return culturalEvents.find(ev => ev.id === selectedEvent)?.title || "";
    const allHardcoded = [...cseEvents, ...ceEvents, ...meEvents, ...eeeEvents, ...raEvents, ...sfEvents, ...eceEvents];
    return allHardcoded.find(ev => ev.id === selectedEvent)?.title || "";
  };

  // Step 1: Validate details and check slot availability
  const handleProceedToPayment = async () => {
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

    setSlotCheckLoading(true);
    try {
      const eventTitle = getEventTitle();
      const dbEventId = findDbEventId(eventTitle);
      if (!dbEventId) {
        toast.error("Event not found in database. Please try again later.");
        return;
      }

      const [countResult, eventResult] = await Promise.all([
        supabase.from("registrations").select("*", { count: "exact", head: true }).eq("event_id", dbEventId),
        supabase.from("events").select("max_participants").eq("id", dbEventId).single(),
      ]);

      if (countResult.error) throw countResult.error;

      const max = eventResult.data?.max_participants ?? 10;
      const current = countResult.count ?? 0;
      const remaining = max - current;

      setMaxSlots(max);
      setSlotsAvailable(remaining);

      if (remaining <= 0) {
        toast.error(`Registrations for this event are full (${max}/${max}). Please try another event.`);
        return;
      }

      setCurrentStep("payment");
      toast.success(`${remaining} slot${remaining > 1 ? 's' : ''} available! Proceed to payment.`);
    } catch (err: any) {
      toast.error(err.message || "Failed to check availability.");
    } finally {
      setSlotCheckLoading(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const validated = schema.parse(form);
      const isFlagship = selectedDept === FLAGSHIP_DEPT_ID;
      const isCultural = selectedDept === CULTURAL_DEPT_ID;

      const eventTitle = getEventTitle();
      const dbEventId = findDbEventId(eventTitle);
      const dbDeptId = findDbDeptId(eventTitle);

      if (!dbEventId || !dbDeptId) {
        throw new Error("Event not found in database. Please try again later.");
      }

      // Double-check slot availability before inserting
      const { count: regCount, error: countError } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })
        .eq("event_id", dbEventId);

      if (countError) throw countError;

      const { data: eventInfo } = await supabase
        .from("events")
        .select("max_participants")
        .eq("id", dbEventId)
        .single();

      const maxParticipants = eventInfo?.max_participants ?? 10;

      if (regCount !== null && regCount >= maxParticipants) {
        throw new Error(`Registrations for this event are full (${maxParticipants}/${maxParticipants}). Please try another event.`);
      }

      const { data: regData, error } = await supabase.from("registrations").insert([{
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        college: validated.college,
        event_id: dbEventId,
        department_id: dbDeptId,
        team_size: isTeamEvent ? selectedTeamSize : 1,
        team_members: selectedTeamSize > 1 ? teamMembers.filter(m => m.trim()) : null,
      }]).select("id").single();
      
      if (error) {
        if (error.code === "23505") throw new Error("You have already registered for this event.");
        throw error;
      }

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
          teamCount: isTeamEvent ? selectedTeamSize : 1,
          eventImage: selectedEventDetails && "image" in selectedEventDetails ? (selectedEventDetails as any).image ?? "" : "",
          eventCategory:
            selectedDept === FLAGSHIP_DEPT_ID
              ? "Flagship Event"
              : selectedDept === CULTURAL_DEPT_ID
                ? "Cultural Event"
                : "Department Event",
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
      setCurrentStep("details");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-lg mx-auto mb-10"
        >
          <div className="flex items-center gap-3">
            <div className={`flex-1 flex items-center gap-3 p-3 rounded-2xl border transition-all ${
              currentStep === "details" ? "bg-accent/10 border-accent/30" : "bg-card border-border"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep === "details" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {currentStep === "payment" ? <CheckCircle2 className="w-4 h-4" /> : "1"}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                currentStep === "details" ? "text-foreground" : "text-muted-foreground"
              }`}>Fill Details</span>
            </div>

            <div className={`w-8 h-px ${currentStep === "payment" ? "bg-accent" : "bg-border"}`} />

            <div className={`flex-1 flex items-center gap-3 p-3 rounded-2xl border transition-all ${
              currentStep === "payment" ? "bg-accent/10 border-accent/30" : "bg-card border-border opacity-60"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep === "payment" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
              }`}>2</div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                currentStep === "payment" ? "text-foreground" : "text-muted-foreground"
              }`}>Payment</span>
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Decorative */}
          <motion.div
            style={{ y: parallaxY }}
            className="hidden lg:flex lg:col-span-2 flex-col gap-6"
          >
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
                  { icon: Sparkles, label: "40+ Events", desc: "7 departments" },
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
          <div className="lg:col-span-3 bg-card rounded-large border border-border overflow-hidden">
            {/* ===== STEP 1: FILL DETAILS ===== */}
            {currentStep === "details" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
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
                        <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <select
                          value={selectedDept}
                          onChange={(e) => { setSelectedDept(e.target.value); setSelectedEvent(""); }}
                          className={selectClass}
                        >
                          <option value="">Select</option>
                          <optgroup label="Department Events">
                            {visibleDepartments?.map((d) => (
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
                  {selectedEvent && selectedEventDetails && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-2xl bg-secondary/50 border border-border p-4"
                    >
                      <div className="flex items-start gap-4">
                        {('image' in selectedEventDetails) && (selectedEventDetails as any).image && (
                          <img
                            src={(selectedEventDetails as any).image}
                            alt={selectedEventDetails.title}
                            className="w-20 h-20 rounded-xl object-cover hidden sm:block"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold tracking-wider uppercase text-accent">
                              {selectedDept === FLAGSHIP_DEPT_ID ? "Flagship Event" : selectedDept === CULTURAL_DEPT_ID ? "Cultural Event" : "Department Event"}
                            </span>
                          </div>
                          <h4 className="font-display font-bold text-foreground truncate">{selectedEventDetails.title}</h4>
                          {('category' in selectedEventDetails) && (
                            <p className="text-xs text-muted-foreground">{(selectedEventDetails as any).category}</p>
                          )}
                          {('departmentName' in selectedEventDetails) && (
                            <p className="text-xs text-muted-foreground">{(selectedEventDetails as any).departmentName}</p>
                          )}
                          <div className="flex flex-wrap gap-3 mt-2">
                            {('prize' in selectedEventDetails) && (
                              <span className="text-[10px] bg-card rounded-full px-2 py-1 border border-border text-muted-foreground">
                                Prize: <span className="text-foreground font-bold">{(selectedEventDetails as any).prize}</span>
                              </span>
                            )}
                            {('prizePool' in selectedEventDetails) && (
                              <span className="text-[10px] bg-card rounded-full px-2 py-1 border border-border text-muted-foreground">
                                Prize Pool: <span className="text-foreground font-bold">{(selectedEventDetails as any).prizePool}</span>
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

                  {/* Team Size Selection */}
                  {isTeamEvent && selectedEvent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-accent" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Team Size</span>
                      </div>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <select
                          value={selectedTeamSize}
                          onChange={(e) => setSelectedTeamSize(Number(e.target.value))}
                          className={selectClass}
                        >
                          {Array.from({ length: maxTeamSize }, (_, i) => i + 1).map((size) => (
                            <option key={size} value={size}>
                              {size} {size === 1 ? "Member (Individual)" : "Members"}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Maximum team size: {maxTeamSize} members
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Personal Info */}
                <div className="p-6 md:p-8 space-y-4 border-b border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-accent" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                      {isTeamEvent && selectedTeamSize > 1 ? "Team Leader Details" : "Personal Details"}
                    </span>
                    {isTeamEvent && selectedTeamSize > 1 && (
                      <span className="text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                        Coupon will be sent to leader
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className={labelClass}>{isTeamEvent && selectedTeamSize > 1 ? "Leader's Full Name" : "Full Name"}</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="John Doe" />
                      </div>
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>{isTeamEvent && selectedTeamSize > 1 ? "Leader's Email" : "Email"}</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@example.com" />
                      </div>
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>{isTeamEvent && selectedTeamSize > 1 ? "Leader's Phone" : "Phone"}</label>
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

                {/* Team Members Section */}
                {isTeamEvent && selectedTeamSize > 1 && (
                  <div className="p-6 md:p-8 space-y-4 border-b border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Team Members</span>
                    </div>
                    <div className="space-y-3">
                      {teamMembers.map((member, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <label className={labelClass}>Member {index + 2} Name</label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                            <input
                              type="text"
                              value={member}
                              onChange={(e) => {
                                const newMembers = [...teamMembers];
                                newMembers[index] = e.target.value;
                                setTeamMembers(newMembers);
                              }}
                              className={inputClass}
                              placeholder={`Team member ${index + 2} name`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Proceed to Payment Button */}
                <div className="p-6 md:p-8">
                  <motion.button
                    type="button"
                    disabled={slotCheckLoading}
                    onClick={handleProceedToPayment}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="group w-full flex items-center justify-center gap-3 bg-foreground text-background rounded-2xl py-4 font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {slotCheckLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Checking availability...
                      </span>
                    ) : (
                      <>
                        Check Availability & Proceed
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 2: PAYMENT GATEWAY ===== */}
            {currentStep === "payment" && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
              >
                {/* Slot availability info */}
                <div className="p-6 md:p-8 border-b border-border">
                  <div className="rounded-2xl bg-accent/5 border border-accent/20 p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-foreground">Slots Available!</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {slotsAvailable} of {maxSlots} slots remaining for <span className="font-bold text-foreground">{selectedEventDetails?.title}</span>.
                        Complete payment to confirm your registration.
                      </p>
                    </div>
                  </div>

                  {/* Summary of filled details */}
                  <div className="mt-4 rounded-2xl bg-secondary/30 border border-border p-4 space-y-2">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">Registration Summary</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{form.name}</span></div>
                      <div><span className="text-muted-foreground">Email:</span> <span className="font-medium text-foreground">{form.email}</span></div>
                      <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{form.phone}</span></div>
                      <div><span className="text-muted-foreground">College:</span> <span className="font-medium text-foreground">{form.college}</span></div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep("details")}
                      className="text-[10px] text-accent hover:underline mt-2 uppercase tracking-wider font-bold"
                    >
                      ← Edit Details
                    </button>
                  </div>
                </div>

                {/* Payment Gateway Section */}
                <div className="p-6 md:p-8 border-b border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-4 h-4 text-accent" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Payment Gateway</span>
                  </div>
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
                        Confirm Registration
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
