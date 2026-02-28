import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const DepartmentEvents = () => {
  const { deptId } = useParams<{ deptId: string }>();
  const navigate = useNavigate();

  const { data: department, isLoading: deptLoading } = useQuery({
    queryKey: ["department", deptId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("departments")
        .select("*")
        .eq("id", deptId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!deptId,
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["dept-events", deptId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("department_id", deptId!)
        .order("event_date");
      if (error) throw error;
      return data;
    },
    enabled: !!deptId,
  });

  const isLoading = deptLoading || eventsLoading;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <button
            onClick={() => navigate("/#departments")}
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Departments
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">{department?.name || "Loading..."}</span>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {department?.name ? (
              <>
                <span className="text-primary glow-cyan">{department.code}</span>{" "}
                <span className="text-foreground">Events</span>
              </>
            ) : (
              <span className="text-muted-foreground">Loading...</span>
            )}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore and register for events under {department?.name || "this department"}.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="neon-border rounded-xl p-6 bg-card/30 animate-pulse h-64" />
            ))}
          </div>
        ) : events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="neon-border rounded-xl p-6 bg-card/50 backdrop-blur hover:bg-primary/5 transition-all group"
              >
                {event.event_date && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(event.event_date), "MMM d, yyyy • h:mm a")}
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
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
                  to={`/register?department=${deptId}&event=${event.id}`}
                  className="inline-block neon-border rounded-lg px-6 py-2 font-accent text-xs tracking-widest uppercase text-primary hover:bg-primary/10 transition-colors"
                >
                  Register
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-muted-foreground text-lg">No events found for this department yet.</p>
            <Link
              to="/"
              className="inline-block mt-6 neon-border rounded-lg px-6 py-2 font-accent text-xs tracking-widest uppercase text-primary hover:bg-primary/10 transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DepartmentEvents;
