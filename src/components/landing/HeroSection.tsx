import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import ScrollRobot from "@/components/ScrollRobot";
import { allDepartmentEvents } from "@/data/events/index";

// Parse prize string like "₹40,000" to number
const parsePrize = (prize: string): number => {
  return parseInt(prize.replace(/[₹,]/g, ''), 10) || 0;
};

// Top 3 department events by prize pool
const topEvents = [...allDepartmentEvents]
  .sort((a, b) => parsePrize(b.prizePool) - parsePrize(a.prizePool))
  .slice(0, 3)
  .map(e => ({
    id: e.id, title: e.title, prize: e.prizePool, description: e.details,
    date: e.date, link: `/events/${e.id}`, department: e.departmentName,
  }));

const HeroSection = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const filteredEvents = searchQuery.trim()
    ? allDepartmentEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.departmentName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Auto-rotate featured events
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % topEvents.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <div className="hero-scroll-track relative w-full" style={{ height: "300vh" }}>
      <div ref={heroRef} className="sticky top-0 w-full h-screen">
        <div className="absolute inset-0 bg-[#01040f] md:bg-background">
          <div className="app-frame-wrapper">
            {/* TOP-LEFT CUTOUT - Brand */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="cutout-tl hidden md:block"
            >
              <div className="brand-pill-inner">
                <h1 className="text-base md:text-lg font-bold tracking-wide text-white font-display">
                  KAPRICIOUS'26
                </h1>
              </div>
              <div className="cutout-corner cutout-tl-right" />
              <div className="cutout-corner cutout-tl-bottom" />
            </motion.div>

            {/* TOP-RIGHT CUTOUT - Search (desktop only) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="cutout-tr hidden md:block"
            >
              <div ref={searchRef} className="relative">
                <div className="bg-card/90 neo-bento px-4 py-3 rounded-full border border-border flex items-center gap-2">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-48 placeholder:text-muted-foreground/50 text-foreground"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => { setSearchQuery(""); setIsSearchOpen(false); }}
                      className="text-muted-foreground hover:text-foreground p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {isSearchOpen && filteredEvents.length > 0 && (
                  <div className="absolute top-full mt-2 right-0 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50 min-w-[280px]">
                    <div className="max-h-60 overflow-y-auto overscroll-contain">
                      {filteredEvents.slice(0, 6).map((event) => (
                        <button
                          key={event.id}
                          onClick={() => { navigate(`/events/${event.id}`); setSearchQuery(""); setIsSearchOpen(false); }}
                          className="w-full px-4 py-3 text-left hover:bg-secondary active:bg-secondary/80 transition-colors flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">{event.department}</p>
                          </div>
                          <span className="text-[9px] px-2 py-1 rounded-full bg-secondary text-muted-foreground uppercase tracking-wider shrink-0">
                            {event.prizePool}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isSearchOpen && searchQuery.trim() && filteredEvents.length === 0 && (
                  <div className="absolute top-full mt-2 right-0 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50 min-w-[260px]">
                    <div className="px-4 py-3 text-sm text-muted-foreground text-center">No events found</div>
                  </div>
                )}
              </div>
              <div className="cutout-corner cutout-tr-left" />
              <div className="cutout-corner cutout-tr-bottom" />
            </motion.div>

            {/* BOTTOM-RIGHT CUTOUT - Featured Events (desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="cutout-br hidden md:block"
            >
              <div className="w-[520px]">
                <h3 className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Featured Events</h3>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                  {topEvents.map((event) => (
                    <Link
                      key={event.id}
                      to={event.link}
                      className="featured-event-card min-w-[220px] max-w-[220px] rounded-2xl p-4 border block group transition-all duration-300 hover:scale-[1.02]"
                    >
                      <h4 className="text-sm font-bold text-foreground font-display tracking-tight group-hover:text-accent transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-bold">
                          {event.prize}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{event.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="cutout-corner cutout-br-left" />
              <div className="cutout-corner cutout-br-top" />
            </motion.div>

            {/* DARK INNER CANVAS */}
            <div ref={canvasRef} className="main-inner-canvas">
              <div className="absolute inset-0 pointer-events-none z-0">
                <ScrollRobot className="w-full h-full" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-6 left-0 right-0 md:bottom-10 md:left-10 md:right-auto z-10 text-center md:text-left"
              >
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] hero-gradient-text">
                  KAPRICIOUS'26
                </h2>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile Featured Events - horizontally scrollable */}
      <div className="md:hidden relative z-10 -mt-4 pb-6">
        <div className="flex items-center justify-between mb-3 px-5">
          <h3 className="text-xs font-semibold text-accent uppercase tracking-widest">Featured Events</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-2 snap-x snap-mandatory scrollbar-hide">
          {topEvents.map((event, i) => (
            <Link
              key={event.id}
              to={event.link}
              className="featured-event-card min-w-[75vw] snap-start block rounded-2xl p-4 active:scale-[0.98] transition-all duration-300 border"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold uppercase tracking-wider">
                  {event.department}
                </span>
              </div>
              <h4 className="text-sm font-bold font-display tracking-tight text-accent-foreground">
                {event.title}
              </h4>
              <p className="text-xs mt-1 line-clamp-2 leading-relaxed opacity-70">
                {event.description}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent text-accent-foreground font-bold">
                  {event.prize}
                </span>
                <span className="text-[10px] opacity-60">{event.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
