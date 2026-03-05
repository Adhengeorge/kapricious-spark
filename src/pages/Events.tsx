import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { cseEvents, ceEvents, meEvents, eeeEvents, raEvents, sfEvents, eceEvents, culturalEvents } from "@/data/events/index";

// Video/image backgrounds for each event (mapped by event ID)
const eventMedia: Record<string, { type: "video" | "image"; src: string }> = {
  // CSE
  "prompt-wars": { type: "video", src: "https://videos.pexels.com/video-files/6963744/6963744-uhd_2560_1440_25fps.mp4" },
  "bug-bounty": { type: "image", src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop" },
  "css-royale": { type: "video", src: "https://videos.pexels.com/video-files/5474455/5474455-uhd_2560_1440_30fps.mp4" },
  "no-run-ninja": { type: "image", src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=500&fit=crop" },
  "code-catastrophe": { type: "image", src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop" },
  "tech-escape-room": { type: "video", src: "https://videos.pexels.com/video-files/7562368/7562368-uhd_2560_1440_30fps.mp4" },
  "hackathon": { type: "video", src: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" },
  // CE
  "bridgit": { type: "image", src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=500&fit=crop" },
  "cad-illumina": { type: "image", src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop" },
  "movethon": { type: "image", src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop" },
  "quizzard": { type: "image", src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop" },
  "infrahunt": { type: "image", src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=500&fit=crop" },
  "structra": { type: "image", src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop" },
  // ME
  "assemble-x": { type: "video", src: "https://videos.pexels.com/video-files/8721926/8721926-uhd_2560_1440_24fps.mp4" },
  "rc-trails": { type: "image", src: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=500&fit=crop" },
  "cad-combat": { type: "image", src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop" },
  "technical-quiz": { type: "image", src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop" },
  "sustainable-innovation-pitching": { type: "image", src: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=500&fit=crop" },
  "lathe-master": { type: "image", src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=500&fit=crop" },
  // EEE
  "arduino-crafters": { type: "image", src: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&h=500&fit=crop" },
  "zap-free-zone": { type: "video", src: "https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4" },
  "defuse-x": { type: "image", src: "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=800&h=500&fit=crop" },
  "seated-scooter": { type: "image", src: "https://images.unsplash.com/photo-1461896836934-28e4189d2aee?w=800&h=500&fit=crop" },
  "stacker-blocks": { type: "image", src: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=500&fit=crop" },
  "power-play-arena": { type: "video", src: "https://videos.pexels.com/video-files/3190203/3190203-uhd_2560_1440_30fps.mp4" },
  "find-the-suspect": { type: "image", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop" },
  // ECE
  "laser-heist": { type: "video", src: "https://videos.pexels.com/video-files/6963744/6963744-uhd_2560_1440_25fps.mp4" },
  "electro-hunt": { type: "image", src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop" },
  "solder-master": { type: "image", src: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&h=500&fit=crop" },
  "code-red": { type: "image", src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop" },
  "electrodex": { type: "image", src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=500&fit=crop" },
  // RAE
  "robo-soccer": { type: "video", src: "https://videos.pexels.com/video-files/8721926/8721926-uhd_2560_1440_24fps.mp4" },
  "line-tracer": { type: "image", src: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&h=500&fit=crop" },
  "vibe-coding-ideathon": { type: "image", src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop" },
  "circuit-rush": { type: "image", src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop" },
  // SF
  "emergency-drill": { type: "image", src: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&h=500&fit=crop" },
  "hazard-hunt": { type: "image", src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop" },
  "ppe-race": { type: "image", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop" },
  "safety-quiz": { type: "image", src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop" },
  "poster-paper-presentation": { type: "image", src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=500&fit=crop" },
  "technical-debate": { type: "image", src: "https://images.unsplash.com/photo-1475721027785-f74ec9c0bc26?w=800&h=500&fit=crop" },
  // Cultural
  "fashion-show": { type: "video", src: "https://videos.pexels.com/video-files/3015510/3015510-uhd_2560_1440_24fps.mp4" },
  "group-dance": { type: "video", src: "https://videos.pexels.com/video-files/4549538/4549538-uhd_2560_1440_25fps.mp4" },
  "step-in-synchro": { type: "image", src: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&h=500&fit=crop" },
  "spot-photography": { type: "image", src: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&h=500&fit=crop" },
  "star-of-kapricious": { type: "video", src: "https://videos.pexels.com/video-files/3015510/3015510-uhd_2560_1440_24fps.mp4" },
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

const EventCard = ({ event, index }: { event: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const media = eventMedia[event.id];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      id={event.id}
      className="group relative bg-card rounded-large border border-border overflow-hidden hover:border-accent/40 transition-all duration-500 hover:shadow-[0_0_40px_-10px_hsl(var(--accent)/0.2)]"
    >
      {/* Media Background */}
      <div className="relative h-48 overflow-hidden">
        {media?.type === "video" ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
            >
              <source src={media.src} type="video/mp4" />
            </video>
            <div className="absolute top-3 right-3 z-10 bg-background/60 backdrop-blur-sm rounded-full p-1.5">
              <Play className="w-3 h-3 text-foreground fill-foreground" />
            </div>
          </>
        ) : (
          <img
            src={media?.src || event.image}
            alt={event.title}
            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        
        {/* Badge overlay */}
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
};

const DepartmentSection = ({ dept, deptIndex }: { dept: typeof departmentEvents[0]; deptIndex: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div key={dept.code} className="max-w-6xl mx-auto mb-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
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
          animate={isInView ? { scaleX: 1 } : {}}
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
};

const Events = () => {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -30]);

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
        className="text-center mb-20"
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

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-24 h-px bg-accent mx-auto mt-8 origin-center"
        />
      </motion.div>

      {/* Department Events */}
      {departmentEvents.map((dept, deptIndex) => (
        <DepartmentSection key={dept.code} dept={dept} deptIndex={deptIndex} />
      ))}
    </div>
  );
};

export default Events;
