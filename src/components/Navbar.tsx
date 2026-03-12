import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Calendar, ClipboardList, Award, Sun, Moon, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { allDepartmentEvents } from "@/data/events/index";

const navLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "Events", path: "/events", icon: Calendar },
  { label: "Register", path: "/register", icon: ClipboardList },
  { label: "Certificate", path: "/certificate", icon: Award },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredEvents = searchQuery.trim()
    ? allDepartmentEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.departmentName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
      {/* Desktop Vertical Left Navbar - expands on hover */}
      <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-start gap-6 py-8 px-3 bg-card/80 neo-bento border border-border rounded-3xl group/nav w-[60px] hover:w-[200px] transition-all duration-300 overflow-hidden">
        <div className="flex items-center gap-3 px-1 mb-2 min-w-0">
          <div className="w-8 h-8 shrink-0">
            <img src="/logo.png" alt="Kapricious Logo" className="w-full h-full object-contain dark:invert-0 invert" />
          </div>
          <span className="font-display font-bold tracking-tighter text-xs text-foreground whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300">
            KAPRICIOUS'26
          </span>
        </div>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-2 py-2 rounded-xl transition-colors w-full min-w-0 ${
                isActive ? "bg-secondary" : "hover:bg-secondary"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? "opacity-100" : "opacity-60 group-hover/nav:opacity-100"}`} />
              <span className={`text-sm font-medium whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {link.label}
              </span>
            </Link>
          );
        })}
        <div className="mt-auto w-full">
          <button onClick={toggleTheme} className="flex items-center gap-3 px-2 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors w-full">
            {theme === "dark" ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
            <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300">
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="mx-3 mt-3">
          <div className="bg-card/90 neo-bento border border-border rounded-full px-4 py-2.5 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7">
                <img src="/logo.png" alt="Kapricious Logo" className="w-full h-full object-contain dark:invert-0 invert" />
              </div>
              <span className="font-display font-bold tracking-tighter text-xs text-foreground">KAPRICIOUS'26</span>
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => { setIsSearchOpen(!isSearchOpen); setOpen(false); }}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 active:bg-secondary/60 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 active:bg-secondary/60 transition-colors"
              >
                {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => { setOpen(!open); setIsSearchOpen(false); }} className="text-foreground p-1">
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-3 mt-2"
            >
              <div className="bg-card/95 neo-bento border border-border rounded-2xl p-3">
                <div className="flex items-center gap-2 bg-secondary rounded-full px-3 py-2">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full placeholder:text-muted-foreground/50 text-foreground"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground p-1">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {filteredEvents.length > 0 && (
                  <div className="mt-2 max-h-60 overflow-y-auto overscroll-contain">
                    {filteredEvents.slice(0, 6).map((event) => (
                      <button
                        key={event.id}
                        onClick={() => { navigate(`/events/${event.id}`); setSearchQuery(""); setIsSearchOpen(false); }}
                        className="w-full px-3 py-2.5 text-left hover:bg-secondary active:bg-secondary/80 transition-colors rounded-xl flex items-center justify-between gap-2"
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
                )}
                {searchQuery.trim() && filteredEvents.length === 0 && (
                  <div className="mt-2 px-3 py-2 text-sm text-muted-foreground text-center">No events found</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-3 mt-2"
            >
              <div className="bg-card/95 neo-bento border border-border rounded-3xl p-3 flex flex-col gap-0.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-sm font-medium uppercase tracking-wider transition-colors flex items-center gap-3 active:scale-[0.98] ${
                        location.pathname === link.path
                          ? "bg-foreground text-background"
                          : "text-muted-foreground active:bg-secondary"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
