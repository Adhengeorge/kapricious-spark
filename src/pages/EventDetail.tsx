import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowLeft, Users, Zap, Star, Trophy, Target, ArrowRight } from "lucide-react";
import { format } from "date-fns";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const { data: event, isLoading } = useQuery({
    queryKey: ["event-detail", eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*, departments(name, code)")
        .eq("id", eventId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!eventId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center grid-bg">
        <div className="bg-card rounded-large border border-border animate-pulse w-full max-w-2xl h-96" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center grid-bg">
        <p className="text-muted-foreground">Event not found.</p>
      </div>
    );
  }

  const rules = event.rules ? event.rules.split("\n").filter((r: string) => r.trim()) : [];

  return (
    <div className="min-h-screen pt-24 pb-16 grid-bg px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button onClick={() => navigate("/events")} className="flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Events
          </button>
          <span className="text-border">/</span>
          <span className="text-foreground">{event.title}</span>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-large border border-border p-8 md:p-12 mb-6"
        >
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className="inline-block rounded-full border border-border px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              {(event.departments as any)?.code} — {(event.departments as any)?.name}
            </span>
          </motion.span>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight tracking-tighter">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
            {event.event_date && (
              <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-xs text-foreground font-medium">
                  {format(new Date(event.event_date), "EEEE, MMMM d, yyyy • h:mm a")}
                </span>
              </div>
            )}
            {event.venue && (
              <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-xs text-foreground font-medium">{event.venue}</span>
              </div>
            )}
            {event.max_participants && (
              <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-2">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-xs text-foreground font-medium">Max {event.max_participants} participants</span>
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
            {event.description}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          {rules.length > 0 && (
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2">
              <div className="bg-card rounded-large border border-border p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-display text-sm font-bold tracking-tight">RULES & GUIDELINES</h2>
                </div>
                <div className="space-y-3">
                  {rules.map((rule: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                        {i + 1}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed pt-1">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="bg-card rounded-large border border-border p-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent" />
                </div>
                <h2 className="font-display text-sm font-bold tracking-tight">EVENT THEME</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.description || "Innovation meets creativity in this exciting challenge."}
              </p>
              <div className="mt-4 flex gap-2 flex-wrap">
                {["Innovation", "Competition", "Creativity"].map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary border border-border px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="bg-card rounded-large border border-border p-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-accent" />
                </div>
                <h2 className="font-display text-sm font-bold tracking-tight">WHY PARTICIPATE?</h2>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Zap, text: "Hands-on experience with real challenges" },
                  { icon: Users, text: "Network with like-minded innovators" },
                  { icon: Trophy, text: "Win exciting prizes & certificates" },
                  { icon: Star, text: "Boost your portfolio & skills" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="bg-foreground text-background rounded-large p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            <div className="relative z-10">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-3 tracking-tight">READY TO COMPETE?</h2>
              <p className="text-sm opacity-60 mb-8 max-w-md mx-auto">
                Secure your spot in {event.title}. Limited seats available!
              </p>
              <Link
                to={`/register?department=${event.department_id}&event=${event.id}`}
                className="group inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 rounded-2xl font-bold text-sm hover:opacity-90 transition-all"
              >
                REGISTER NOW
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;
