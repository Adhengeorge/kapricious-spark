import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Events = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*, departments(name, code)")
        .order("event_date");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary glow-cyan">Events</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Compete, collaborate, and create at Kapricious 2026. Choose your challenge and register today.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="neon-border rounded-xl p-6 bg-card/30 animate-pulse h-64" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events?.map((event, i) => (
              <motion.div
                key={event.id}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="neon-border rounded-xl p-6 bg-card/50 backdrop-blur hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="neon-border rounded px-3 py-1 text-xs font-accent tracking-widest uppercase text-primary">
                    {(event.departments as any)?.code}
                  </span>
                  {event.event_date && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(event.event_date), "MMM d, yyyy • h:mm a")}
                    </div>
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{event.description}</p>
                {event.venue && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                    <MapPin className="w-3 h-3" /> {event.venue}
                  </div>
                )}
                {event.rules && (
                  <details className="mb-4">
                    <summary className="text-xs font-accent tracking-widest uppercase text-primary cursor-pointer">Rules</summary>
                    <pre className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap font-body">{event.rules}</pre>
                  </details>
                )}
                <Link
                  to={`/events/${event.id}`}
                  className="inline-block neon-border rounded-lg px-6 py-2 font-accent text-xs tracking-widest uppercase text-primary hover:bg-primary/10 transition-colors"
                >
                  Explore & Register
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
