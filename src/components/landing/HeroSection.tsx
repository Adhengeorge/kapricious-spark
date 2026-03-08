import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import ScrollRobot from "@/components/ScrollRobot";
import { allDepartmentEvents } from "@/data/events/index";
import { flagshipEvents } from "@/data/events/flagship";

// Parse prize string like "₹40,000" to number
const parsePrize = (prize: string): number => {
  return parseInt(prize.replace(/[₹,]/g, ''), 10) || 0;
};

// Combine all events into a unified format sorted by prize
const getTopEvents = () => {
  const deptMapped = allDepartmentEvents.map(e => ({
    id: e.id, title: e.title, prize: e.prizePool, description: e.details,
    date: e.date, link: `/events/${e.id}`, department: e.departmentName,
  }));
  const flagMapped = flagshipEvents.map(e => ({
    id: e.id, title: e.title, prize: e.prize, description: e.description,
    date: e.date, link: `/event/${e.id}`, department: e.category,
  }));
  return [...deptMapped, ...flagMapped]
    .sort((a, b) => parsePrize(b.prize) - parsePrize(a.prize))
    .slice(0, 3);
};

const topEvents = getTopEvents();

const HeroSection = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-scroll-track relative w-full" style={{ height: "200vh" }}>
      <div ref={heroRef} className="sticky top-0 w-full h-screen">
      {/* White frame with dark inner canvas */}
      <div className="absolute inset-0 bg-background">
        <div className="app-frame-wrapper">
          {/* TOP-LEFT CUTOUT - Brand */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="cutout-tl"
          >
            <div className="brand-pill-inner">
              <h1 className="text-lg font-bold tracking-wide text-white font-display">
                KAPRICIOUS'26
              </h1>
            </div>
            {/* Inverse corners */}
            <div className="cutout-corner cutout-tl-right" />
            <div className="cutout-corner cutout-tl-bottom" />
          </motion.div>

          {/* TOP-RIGHT CUTOUT - Actions */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="cutout-tr"
          >
            <div ref={searchRef} className="relative">
              <div className="bg-card/90 neo-bento px-4 py-3 rounded-full border border-border flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-32 md:w-48 placeholder:text-muted-foreground/50 text-foreground"
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(""); setIsSearchOpen(false); }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isSearchOpen && filteredEvents.length > 0 && (
                <div className="absolute top-full mt-2 right-0 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50 min-w-[280px]">
                  <div className="max-h-64 overflow-y-auto">
                    {filteredEvents.slice(0, 8).map((event) => (
                      <button
                        key={event.id}
                        onClick={() => { navigate(`/events/${event.id}`); setSearchQuery(""); setIsSearchOpen(false); }}
                        className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center justify-between gap-2"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{event.title}</p>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{event.department} — {event.departmentName}</p>
                        </div>
                        <span className="text-[9px] px-2 py-1 rounded-full bg-secondary text-muted-foreground uppercase tracking-wider">
                          {event.prizePool}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isSearchOpen && searchQuery.trim() && filteredEvents.length === 0 && (
                <div className="absolute top-full mt-2 right-0 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50 min-w-[280px]">
                  <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                    No events found for "{searchQuery}"
                  </div>
                </div>
              )}
            </div>
            {/* Inverse corners */}
            <div className="cutout-corner cutout-tr-left" />
            <div className="cutout-corner cutout-tr-bottom" />
          </motion.div>

          {/* BOTTOM-RIGHT CUTOUT - Featured Events (desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="cutout-br hidden md:block"
          >
            <div className="w-[280px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Top Prize Events</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFeaturedIndex((prev) => (prev - 1 + topEvents.length) % topEvents.length)}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setFeaturedIndex((prev) => (prev + 1) % topEvents.length)}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <Link to={topEvents[featuredIndex].link} className="block group">
                <h4 className="text-base font-bold text-foreground font-display tracking-tight group-hover:text-primary transition-colors">
                  {topEvents[featuredIndex].title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                  {topEvents[featuredIndex].description}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">{topEvents[featuredIndex].prize}</span>
                  <span className="text-xs text-muted-foreground">{topEvents[featuredIndex].date}</span>
                </div>
              </Link>
              {/* Dots indicator */}
              <div className="flex gap-1.5 mt-3">
                {topEvents.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeaturedIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i === featuredIndex ? 'bg-foreground' : 'bg-muted-foreground/30'}`}
                  />
                ))}
              </div>
            </div>
            {/* Inverse corners */}
            <div className="cutout-corner cutout-br-left" />
            <div className="cutout-corner cutout-br-top" />
          </motion.div>

          {/* MOBILE - Featured Events horizontal scroll */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 z-10 px-4 pb-4">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
              {topEvents.map((event, i) => (
                <Link
                  key={event.id}
                  to={event.link}
                  className="snap-start shrink-0 w-[75vw] bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4"
                >
                  <h4 className="text-sm font-bold text-foreground font-display tracking-tight">{event.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{event.prize}</span>
                    <span className="text-[10px] text-muted-foreground">{event.department}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* DARK INNER CANVAS */}
          <div ref={canvasRef} className="main-inner-canvas">
            {/* Register pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                to="/register"
                className="absolute top-[120px] right-[35px] z-10 bg-white text-black rounded-full px-8 py-3 font-semibold text-sm tracking-wider hover:scale-105 transition-transform shadow-lg"
              >
                REGISTER NOW
              </Link>
            </motion.div>

            {/* Robot in center */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <ScrollRobot className="w-full h-full" />
            </div>


            {/* Bottom-left headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-10 left-10 z-10"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] hero-gradient-text">
                KAPRICIOUS'26
              </h2>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
