import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { cseEvents, ceEvents, meEvents, eeeEvents, raEvents, sfEvents, eceEvents, culturalEvents } from "@/data/events/index";

const departmentEvents = [
  { code: "CULTURAL", name: "Cultural Events", events: culturalEvents },
  { code: "CSE", name: "Computer Science & Engineering", events: cseEvents },
  { code: "CE", name: "Civil Engineering", events: ceEvents },
  { code: "ME", name: "Mechanical Engineering", events: meEvents },
  { code: "EEE", name: "Electrical & Electronics Engineering", events: eeeEvents },
  { code: "ECE", name: "Electronics & Communication Engineering", events: eceEvents },
  { code: "RAE", name: "Robotics & Automation Engineering", events: raEvents },
  { code: "SF", name: "Fire & Safety", events: sfEvents },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Events = () => {
  const location = useLocation();

  // Scroll to element if hash is present in URL
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("ring-2", "ring-accent");
          setTimeout(() => element.classList.remove("ring-2", "ring-accent"), 2000);
        }, 300);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen grid-bg pt-24 pb-16 px-4 md:px-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">Compete & Create</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          OUR <span className="text-accent">EVENTS</span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Explore events across all departments. Thousands in prizes. Choose your challenge and make your mark at Kapricious 2026.
        </p>
      </motion.div>

      {/* Department Events */}
      {departmentEvents.map((dept, deptIndex) => (
        <div key={dept.code} className="max-w-5xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2 block">{dept.name}</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              <span className="text-accent">{dept.code}</span> EVENTS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dept.events.map((event, i) => (
              <motion.div
                key={event.id}
                id={event.id}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group bg-card rounded-large border border-border p-6 hover:border-muted-foreground/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full border border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {event.type === "team" ? `Team (${event.teamSize} max)` : "Individual"}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{event.details}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Prize Pool</p>
                    <p className="text-lg font-bold text-foreground">{event.prizePool}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Entry Fee</p>
                    <p className="text-sm font-medium text-foreground">{event.registrationFee}</p>
                  </div>
                </div>

                <Link
                  to={`/events/${event.id}`}
                  className="mt-4 group/btn flex items-center justify-center gap-2 w-full bg-foreground text-background px-5 py-3 rounded-2xl hover:opacity-90 transition-all text-xs font-bold tracking-wider uppercase"
                >
                  View Details
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;
