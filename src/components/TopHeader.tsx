import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { flagshipEvents } from "@/data/events";

const TopHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter events based on search query
  const filteredEvents = searchQuery.trim()
    ? flagshipEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
    setSearchQuery("");
    setIsOpen(false);
  };
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 px-4 md:px-8 pt-4">
      {/* Logo/Brand */}
      <div className="bg-card/90 neo-bento px-8 py-3 rounded-full border border-border flex items-center gap-4">
        <span className="font-display font-bold tracking-tighter text-lg text-foreground">KAPRICIOUS'26</span>
        <span className="h-4 w-[1px] bg-border"></span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Techfest</span>
      </div>

      {/* Right Side - Search & CTA */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div ref={searchRef} className="relative">
          <div className="bg-card/90 neo-bento px-4 py-3 rounded-full border border-border flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-32 md:w-48 placeholder:text-muted-foreground/50 text-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIsOpen(false);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isOpen && filteredEvents.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50 min-w-[280px]">
              <div className="max-h-64 overflow-y-auto">
                {filteredEvents.slice(0, 8).map((event) => (
                  <button
                    key={event.id}
                    onClick={() => handleEventClick(event.id)}
                    className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center justify-between gap-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{event.category}</p>
                    </div>
                    <span className="text-[9px] px-2 py-1 rounded-full bg-secondary text-muted-foreground uppercase tracking-wider">
                      {event.prize}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {isOpen && searchQuery.trim() && filteredEvents.length === 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50 min-w-[280px]">
              <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                No events found for "{searchQuery}"
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
