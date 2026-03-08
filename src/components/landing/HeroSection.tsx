import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import ScrollRobot from "@/components/ScrollRobot";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
            <div className="flex gap-3">
              <button className="w-11 h-11 rounded-full bg-[#020513] text-white flex items-center justify-center hover:bg-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M16 8V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V8" />
                  <path d="M5 8H19L20 21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21L5 8Z" />
                </svg>
              </button>
              <button className="w-11 h-11 rounded-full bg-[#020513] text-white flex items-center justify-center hover:bg-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" />
                </svg>
              </button>
              <Link
                to="/events"
                className="h-11 rounded-full bg-[#020513] text-white flex items-center justify-center gap-2 px-5 hover:bg-accent transition-colors font-medium text-sm"
              >
                <Play className="w-4 h-4" />
                <span>Start</span>
              </Link>
            </div>
            {/* Inverse corners */}
            <div className="cutout-corner cutout-tr-left" />
            <div className="cutout-corner cutout-tr-bottom" />
          </motion.div>

          {/* BOTTOM-RIGHT CUTOUT - Info card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="cutout-br hidden md:block"
          >
            <div className="w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground">Artificial intelligence</h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-foreground hover:text-background transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-foreground hover:text-background transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                is your reliable assistant in task automation, data analysis, and decision-making.
              </p>
            </div>
            {/* Inverse corners */}
            <div className="cutout-corner cutout-br-left" />
            <div className="cutout-corner cutout-br-top" />
          </motion.div>

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
