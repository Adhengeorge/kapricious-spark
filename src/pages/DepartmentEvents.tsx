import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowLeft, ChevronRight, ArrowRight } from "lucide-react";
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
      const { data, error } = await supabase.from("departments").select("*").eq("id", deptId!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!deptId,
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["dept-events", deptId],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").eq("department_id", deptId!).order("event_date");
      if (error) throw error;
      return data;
    },
    enabled: !!deptId,
  });

  const isLoading = deptLoading || eventsLoading;

  return (
    <div className="min-h-screen pt-24 pb-16 grid-bg px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <button onClick={() => navigate("/#departments")} className="flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Departments
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{department?.name || "Loading..."}</span>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
            {department?.name ? (
              <>
                <span className="text-accent">{department.code}</span>{" "}
                <span className="text-foreground">EVENTS</span>
              </>
            ) : (
              <span className="text-muted-foreground">Loading...</span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Explore and register for events under {department?.name || "this department"}.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-large border border-border animate-pulse h-64" />
            ))}
          </div>
        ) : events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group bg-card rounded-large border border-border p-8 hover:border-muted-foreground/30 transition-all"
              >
                {event.event_date && (
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-4 uppercase tracking-wider">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(event.event_date), "MMM d, yyyy • h:mm a")}
                  </div>
                )}
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors tracking-tight">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{event.description}</p>
                {event.venue && (
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-4 uppercase tracking-wider">
                    <MapPin className="w-3 h-3" /> {event.venue}
                  </div>
                )}
                <Link
                  to={`/register?department=${deptId}&event=${event.id}`}
                  className="group/btn inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-all"
                >
                  Register
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-large border border-border p-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">No events found for this department yet.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-all"
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
