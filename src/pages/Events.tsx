import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { flagshipEvents } from "@/data/events";

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
          Four flagship events. Thousands in prizes. Choose your challenge and make your mark at Kapricious 2026.
        </p>
      </motion.div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
        {flagshipEvents.map((event, i) => {
          const EventIcon = event.icon;
          return (
          <motion.div
            key={event.id}
            id={event.id}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group bg-card rounded-large border border-border p-8 md:p-10 flex flex-col justify-between hover:border-muted-foreground/30 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03]">
              <EventIcon className="w-full h-full" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full border border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {event.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {event.mode}
                </span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors">
                  <EventIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{event.description}</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-6 pt-6 border-t border-border">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Prize Pool</p>
                <p className="text-xl font-bold text-foreground">{event.prize}</p>
              </div>
              <Link
                to={`/event/${event.id}`}
                className="group/btn flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-2xl hover:opacity-90 transition-all text-xs font-bold tracking-wider uppercase"
              >
                View Details
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        variants={fadeUp}
        custom={5}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-xs text-muted-foreground mb-4">More events coming soon. Stay tuned.</p>
      </motion.div>
    </div>
  );
};

export default Events;
