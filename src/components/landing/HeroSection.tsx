import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollRobot from "@/components/ScrollRobot";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="hero-scroll-track relative w-full" style={{ height: "200vh" }}>
      <div ref={heroRef} className="sticky top-0 w-full h-screen">
      {/* White frame with dark inner canvas */}
      <div className="absolute inset-0 bg-background">
        <div className="app-frame-wrapper">

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
