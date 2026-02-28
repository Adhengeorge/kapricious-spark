import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowLeft, Users, Zap, Star, Trophy, Target } from "lucide-react";
import { format } from "date-fns";

const comicBurst = {
  hidden: { scale: 0, rotate: -15 },
  visible: { scale: 1, rotate: 0, transition: { type: "spring" as const, stiffness: 200, damping: 15 } },
};

const slideIn = {
  hidden: { opacity: 0, x: -60 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
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
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="neon-border rounded-xl p-12 bg-card/30 animate-pulse w-full max-w-2xl h-96" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <p className="text-muted-foreground">Event not found.</p>
      </div>
    );
  }

  const rules = event.rules
    ? event.rules.split("\n").filter((r: string) => r.trim())
    : [];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <button onClick={() => navigate("/events")} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Events
          </button>
          <span className="text-border">/</span>
          <span className="text-primary">{event.title}</span>
        </motion.div>

        {/* Comic Hero Banner */}
        <motion.div
          variants={comicBurst}
          initial="hidden"
          animate="visible"
          className="relative rounded-2xl overflow-hidden mb-10"
        >
          {/* Halftone comic background */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />
          <div className="relative neon-border rounded-2xl p-8 md:p-12 bg-card/60 backdrop-blur">
            {/* Department badge */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <span className="inline-block neon-border rounded-full px-4 py-1 text-xs font-accent tracking-widest uppercase text-primary mb-4">
                {(event.departments as any)?.code} — {(event.departments as any)?.name}
              </span>
            </motion.div>

            {/* Title with comic emphasis */}
            <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-4 leading-tight">
              {event.title}
              <span className="text-primary">.</span>
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 mb-6">
              {event.event_date && (
                <div className="flex items-center gap-2 neon-border rounded-lg px-3 py-1.5 bg-card/40">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground font-accent">
                    {format(new Date(event.event_date), "EEEE, MMMM d, yyyy • h:mm a")}
                  </span>
                </div>
              )}
              {event.venue && (
                <div className="flex items-center gap-2 neon-border rounded-lg px-3 py-1.5 bg-card/40">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground font-accent">{event.venue}</span>
                </div>
              )}
              {event.max_participants && (
                <div className="flex items-center gap-2 neon-border rounded-lg px-3 py-1.5 bg-card/40">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground font-accent">Max {event.max_participants} participants</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
              {event.description}
            </p>
          </div>
        </motion.div>

        {/* Comic panels grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Rules Panel */}
          {rules.length > 0 && (
            <motion.div
              variants={slideIn}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <div className="neon-border rounded-2xl p-6 md:p-8 bg-card/40 backdrop-blur relative overflow-hidden">
                {/* Comic corner decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Rules <span className="text-primary">&</span> Guidelines
                  </h2>
                </div>

                <div className="space-y-3">
                  {rules.map((rule: string, i: number) => (
                    <motion.div
                      key={i}
                      variants={slideIn}
                      custom={i + 1}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-start gap-3 group"
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-display font-bold text-primary group-hover:bg-primary/20 transition-colors">
                        {i + 1}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed pt-1">{rule}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Theme Panel */}
          <motion.div
            variants={slideIn}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="neon-border rounded-2xl p-6 bg-card/40 backdrop-blur h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground">Event Theme</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.description || "Innovation meets creativity in this exciting challenge. Push your limits and showcase your talent."}
              </p>
              <div className="mt-4 flex gap-2 flex-wrap">
                <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-accent text-primary">Innovation</span>
                <span className="rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-accent text-accent">Competition</span>
                <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-accent text-primary">Creativity</span>
              </div>
            </div>
          </motion.div>

          {/* Highlights Panel */}
          <motion.div
            variants={slideIn}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="neon-border rounded-2xl p-6 bg-card/40 backdrop-blur h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground">Why Participate?</h2>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Zap, text: "Hands-on experience with real challenges" },
                  { icon: Users, text: "Network with like-minded innovators" },
                  { icon: Trophy, text: "Win exciting prizes & certificates" },
                  { icon: Star, text: "Boost your portfolio & skills" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Event image if available */}
        {event.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="neon-border rounded-2xl overflow-hidden">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-auto object-cover max-h-96"
                loading="lazy"
              />
            </div>
          </motion.div>
        )}

        {/* Register CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="neon-border rounded-2xl p-8 md:p-12 bg-card/40 backdrop-blur relative overflow-hidden">
            {/* Comic action lines */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, hsl(var(--primary)) 20px, hsl(var(--primary)) 21px)`,
              }}
            />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-3">
                Ready to <span className="text-primary">Compete</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Secure your spot in {event.title}. Limited seats available!
              </p>
              <Link
                to={`/register?department=${event.department_id}&event=${event.id}`}
                className="inline-block rounded-xl bg-primary px-10 py-4 font-accent text-sm tracking-widest uppercase text-primary-foreground font-bold hover:opacity-90 transition-all hover:scale-105 transform"
              >
                Register Now
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;
