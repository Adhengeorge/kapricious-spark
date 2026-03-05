import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Calendar, ClipboardList, Award, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

const navLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "Events", path: "/events", icon: Calendar },
  { label: "Register", path: "/register", icon: ClipboardList },
  { label: "Certificate", path: "/certificate", icon: Award },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <>
      {/* Desktop Vertical Left Navbar */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-8 py-10 px-4 bg-card/80 neo-bento border border-border rounded-full">
        {/* Logo */}
        <div className="w-10 h-10 rounded-full overflow-hidden mb-4">
          <img src="/logo.png" alt="Kapricious Logo" className="w-full h-full object-cover" />
        </div>

        {/* Nav Links */}
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`group relative flex items-center justify-center p-2 rounded-full transition-colors ${
                isActive
                  ? "bg-secondary"
                  : "hover:bg-secondary"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`} />
              <span className="absolute left-16 bg-foreground text-background px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {link.label}
              </span>
            </Link>
          );
        })}

        {/* Theme Toggle */}
        <div className="mt-auto">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div className="mx-4 mt-4">
          <div className="bg-card/90 neo-bento border border-border rounded-full px-6 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src="/logo.png" alt="Kapricious Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold tracking-tighter text-sm text-foreground">KAPRICIOUS'26</span>
            </Link>

            {/* Mobile toggle */}
            <button onClick={() => setOpen(!open)} className="text-foreground">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-4 mt-2"
            >
              <div className="bg-card/95 neo-bento border border-border rounded-3xl p-4 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-sm font-medium uppercase tracking-wider transition-colors flex items-center gap-3 ${
                        location.pathname === link.path
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-secondary"
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
