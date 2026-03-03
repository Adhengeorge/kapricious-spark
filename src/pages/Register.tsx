import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { User, Mail, Phone, GraduationCap, Layers, Calendar, CheckCircle2, CreditCard, ShieldCheck, ArrowRight, Trophy } from "lucide-react";
import { flagshipEvents, getEventById, culturalEvents } from "@/data/events";
import { cseEvents, ceEvents, meEvents } from "@/data/events";

const FLAGSHIP_DEPT_ID = "flagship";
const CULTURAL_DEPT_ID = "cultural";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Invalid phone number").max(15),
  college: z.string().trim().min(1, "College is required").max(200),
});

const Register = () => {
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event") || "";

  // Check if preselected event is a flagship or cultural event
  const preselectedFlagship = getEventById(preselectedEvent);
  const preselectedCultural = culturalEvents.find(ev => ev.id === preselectedEvent);
  const initialDept = preselectedFlagship ? FLAGSHIP_DEPT_ID : preselectedCultural ? CULTURAL_DEPT_ID : "";

  const [selectedDept, setSelectedDept] = useState(initialDept);
  const [selectedEvent, setSelectedEvent] = useState(preselectedFlagship || preselectedCultural ? preselectedEvent : "");
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registered, setRegistered] = useState(false);

  // Set initial values when URL params change
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

  // Fetch database events only when a non-flagship department is selected
  const { data: dbEvents } = useQuery({
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
    enabled: !!selectedDept && selectedDept !== FLAGSHIP_DEPT_ID,
  });

  // Get events list based on selected department
  let events = [];
  if (selectedDept === FLAGSHIP_DEPT_ID) {
    events = flagshipEvents.map(e => ({ id: e.id, title: e.title, type: "flagship" }));
  } else if (selectedDept === CULTURAL_DEPT_ID) {
    events = culturalEvents.map(e => ({ id: e.id, title: e.title, type: "cultural" }));
  } else if (selectedDept && departments) {
    // Map department code to event array
    const dept = departments.find(d => d.id === selectedDept);
    if (dept?.code === "CSE") events = cseEvents;
    else if (dept?.code === "CE") events = ceEvents;
    else if (dept?.code === "ME") events = meEvents;
    else events = dbEvents || [];
  }

  // Get selected event details for display
  let selectedEventDetails;
  if (selectedDept === FLAGSHIP_DEPT_ID) {
    selectedEventDetails = getEventById(selectedEvent);
  } else if (selectedDept === CULTURAL_DEPT_ID) {
    selectedEventDetails = culturalEvents.find(ev => ev.id === selectedEvent);
  } else if (selectedDept && departments) {
    const dept = departments.find(d => d.id === selectedDept);
    if (dept?.code === "CSE") selectedEventDetails = cseEvents.find(ev => ev.id === selectedEvent);
    else if (dept?.code === "CE") selectedEventDetails = ceEvents.find(ev => ev.id === selectedEvent);
    else if (dept?.code === "ME") selectedEventDetails = meEvents.find(ev => ev.id === selectedEvent);
    else selectedEventDetails = dbEvents?.find(e => e.id === selectedEvent);
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const validated = schema.parse(form);
      const isFlagship = selectedDept === FLAGSHIP_DEPT_ID;
      const isCultural = selectedDept === CULTURAL_DEPT_ID;
      const flagshipEvent = isFlagship ? getEventById(selectedEvent) : null;
      const culturalEvent = isCultural ? culturalEvents.find(ev => ev.id === selectedEvent) : null;

      // For flagship/cultural events, store with null event_id/department_id but include event name in a comment or separate field
      const { data: regData, error } = await supabase.from("registrations").insert([{
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        college: validated.college,
        event_id: isFlagship || isCultural ? null : selectedEvent,
        department_id: isFlagship || isCultural ? null : selectedDept,
        event_name: isFlagship ? flagshipEvent?.title : isCultural ? culturalEvent?.title : undefined,
        event_type: isFlagship ? "flagship" : isCultural ? "cultural" : "department"
      }]).select("id").single();
      if (error) {
        if (error.code === "23505") throw new Error("You have already registered for this event.");
        throw error;
      }

      // Get event details - from flagship/cultural data or database
      let eventName = "Event";
      let eventDate = "";
      let venue = "";

      if (isFlagship && flagshipEvent) {
        eventName = flagshipEvent.title;
        eventDate = flagshipEvent.date;
        venue = flagshipEvent.venue;
      } else if (isCultural && culturalEvent) {
        eventName = culturalEvent.title;
        eventDate = culturalEvent.date || "";
        venue = culturalEvent.venue || "";
      } else {
        const { data: eventData } = await supabase
          .from("events")
          .select("title, event_date, venue")
          .eq("id", selectedEvent)
          .single();
        eventName = eventData?.title || "Event";
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
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">Join the Movement</span>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">
            <span className="text-accent">REGISTER</span> NOW
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Choose from flagship events or department events, fill in your details, and you're good to go.
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
                      {departments?.map((d) => (
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

            {/* Flagship/Cultural Event Details Banner */}
            {(selectedDept === FLAGSHIP_DEPT_ID || selectedDept === CULTURAL_DEPT_ID) && selectedEvent && selectedEventDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl bg-secondary/50 border border-border p-4"
              >
                <div className="flex items-start gap-4">
                  {selectedDept === FLAGSHIP_DEPT_ID && ('image' in selectedEventDetails) && (
                    <img 
                      src={selectedEventDetails.image} 
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
                      <p className="text-xs text-muted-foreground">{selectedEventDetails.category}</p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-2">
                      {selectedDept === FLAGSHIP_DEPT_ID && ('prize' in selectedEventDetails) && (
                        <span className="text-[10px] bg-card rounded-full px-2 py-1 border border-border text-muted-foreground">
                          Prize: <span className="text-foreground font-bold">{selectedEventDetails.prize}</span>
                        </span>
                      )}
                      {('date' in selectedEventDetails) && (
                        <span className="text-[10px] bg-card rounded-full px-2 py-1 border border-border text-muted-foreground">
                          {selectedEventDetails.date}
                        </span>
                      )}
                      {selectedDept === FLAGSHIP_DEPT_ID && ('registrationFee' in selectedEventDetails) && (
                        <span className="text-[10px] bg-card rounded-full px-2 py-1 border border-border text-muted-foreground">
                          Fee: {selectedEventDetails.registrationFee}
                        </span>
                      )}
                      {selectedDept === CULTURAL_DEPT_ID && ('venue' in selectedEventDetails) && (
                        <span className="text-[10px] bg-card rounded-full px-2 py-1 border border-border text-muted-foreground">
                          Venue: {selectedEventDetails.venue}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Personal Info & Team Info */}
          <div className="p-6 md:p-8 space-y-4 border-b border-border">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Personal Details</span>
            </div>

            {/* Team fields for team events */}
            {selectedEventDetails?.type === "team" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Team Name</label>
                  <input type="text" className={inputClass} placeholder="Team Name" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Team Leader</label>
                  <input type="text" className={inputClass} placeholder="Team Leader Name" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Number of Participants</label>
                  <input type="number" min={1} max={selectedEventDetails.teamSize} className={inputClass} placeholder={`Up to ${selectedEventDetails.teamSize}`} />
                </div>
                {[...Array(selectedEventDetails.teamSize)].map((_, idx) => (
                  <div key={idx} className="sm:col-span-2">
                    <label className={labelClass}>{`Participant ${idx + 1} Name`}</label>
                    <input type="text" className={inputClass} placeholder={`Participant ${idx + 1} Name`} />
                  </div>
                ))}
              </div>
            )}

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
            <button
              type="submit"
              disabled={mutation.isPending}
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
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Register;
