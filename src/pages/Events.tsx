import { memo, useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { cseEvents, ceEvents, meEvents, eeeEvents, raEvents, sfEvents, eceEvents, culturalEvents } from "@/data/events/index";

// Video backgrounds for specific events
const eventMedia: Record<string, { type: "video"; src: string }> = {
  "hackathon": { type: "video", src: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" },
  "zap-free-zone": { type: "video", src: "https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4" },
};

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

const EventCard = memo(({ event, index }: { event: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const media = eventMedia[event.id];
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop";
  const eventImage = event.image || fallbackImage;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      id={event.id}
      className="group relative bg-card rounded-large border border-border overflow-hidden hover:border-accent/40 transition-all duration-500 hover:shadow-[0_0_40px_-10px_hsl(var(--accent)/0.2)]"
    >
      {/* Media Background */}
      <div className="relative h-48 overflow-hidden bg-muted">
        {media?.type === "video" && !videoError ? (
          <>
            {!videoLoaded && (
              <div className="absolute inset-0 w-full h-full bg-muted animate-pulse" />
            )}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              src={media.src}
              onError={() => setVideoError(true)}
              onLoadedData={() => setVideoLoaded(true)}
              className={`w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute top-3 right-3 z-10 bg-background/60 backdrop-blur-sm rounded-full p-1.5">
              <Play className="w-3 h-3 text-foreground fill-foreground" />
            </div>
          </>
        ) : (
          <img
            src={eventImage}
            alt=""
            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 text-[10px] font-bold uppercase tracking-widest text-foreground">
            {event.type === "team" ? `Team (${event.teamSize} max)` : "Individual"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
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
      </div>
    </motion.div>
  );
});

EventCard.displayName = "EventCard";

const DepartmentSection = memo(({ dept, deptIndex }: { dept: typeof departmentEvents[0]; deptIndex: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div key={dept.code} className="max-w-6xl mx-auto mb-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex items-end justify-between"
      >
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2 block">{dept.name}</span>
          <h2 className="font-display text-2xl md:text-4xl font-bold">
            <span className="text-accent">{dept.code}</span> EVENTS
          </h2>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:block h-px bg-gradient-to-r from-accent/50 to-transparent flex-1 ml-8 origin-left"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dept.events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </div>
  );
});

DepartmentSection.displayName = "DepartmentSection";

const Events = () => {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -30]);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filteredDepartments = activeFilter === "ALL"
    ? departmentEvents
    : departmentEvents.filter(dept => dept.code === activeFilter);

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
      {/* Animated Header */}
      <motion.div
        style={{ y: headerY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-6"
        >
          <Sparkles className="w-3 h-3 text-accent" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">Compete & Create</span>
        </motion.div>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
          OUR <span className="text-accent">EVENTS</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-sm max-w-lg mx-auto"
        >
          Explore events across all departments. Thousands in prizes. Choose your challenge and make your mark at Kapricious 2026.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-24 h-px bg-accent mx-auto mt-8 origin-center"
        />
      </motion.div>

      {/* Department Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="max-w-6xl mx-auto mb-14"
      >
        <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
          <button
            onClick={() => setActiveFilter("ALL")}
            className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 ${
              activeFilter === "ALL"
                ? "bg-foreground text-background border-foreground"
                : "bg-card border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            All
          </button>
          {departmentEvents.map((dept) => (
            <button
              key={dept.code}
              onClick={() => setActiveFilter(dept.code)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                activeFilter === dept.code
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {dept.code}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Department Events */}
      {filteredDepartments.map((dept, deptIndex) => (
        <DepartmentSection key={dept.code} dept={dept} deptIndex={deptIndex} />
      ))}
    </div>
  );
};

export default Events;
