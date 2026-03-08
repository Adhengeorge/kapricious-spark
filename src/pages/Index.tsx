import { useState, useEffect, useRef, type MouseEvent, type TouchEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import { allDepartmentEvents } from "@/data/events";
import InteractiveRobot from "@/components/InteractiveRobot";

// Helper to parse prize pool string to number (e.g., "₹10,000" → 10000)
const parsePrizePool = (prizePool: string): number => {
  return parseInt(prizePool.replace(/[₹,]/g, ""), 10) || 0;
};

// Get top 3 events by prize pool
const getTop3Events = () => {
  return [...allDepartmentEvents]
    .sort((a, b) => parsePrizePool(b.prizePool) - parsePrizePool(a.prizePool))
    .slice(0, 3);
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const departments = ["CSE", "Civil", "ECE", "EEE", "Fire & Safety", "Mechanical", "AI", "Robotics & Automation"];
const culturalEvents = [
  { id: "fashion-show", title: "Fashion Show" },
  { id: "group-dance", title: "Group Dance" },
  { id: "step-in-synchro", title: "Step in Synchro" },
  { id: "spot-photography", title: "Spot Photography" },
  { id: "star-of-kapricious", title: "Star of Kapricious" },
];

const backgroundImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuB3GLb6Dg6WLWyzbK5JJgUAryWdiX4Ei0b4_NzeFMzoqgJCBJiJ8Vpna_X2sU_rZOeSt81qJc1zdtyUIxJClxohi0T7mF2xlkbK9Cg9QgGy8QVKIlRHP3LxMC_SC4CApzkvpCOrI2U6se4o0kabiJbFaREIElMBVE9ZYNUz11Vk_IYgIvNpEyNxlFubu8Wiq0Q91qoe-7IMwVXZIBzfZ0wWTGsnSufx2Psz_aWjCqLfP62IBPu0sMMix5Aif87U7Yrn9VyvM6Dh_-4";

const Index = () => {
  const featuredEvents = getTop3Events();
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 14, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 14, mass: 0.4 });
  
  // Scroll-based animation for robot
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const robotY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const robotScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  const robotRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const robotMouseRotate = useTransform(springX, [-60, 60], [-4, 4]);
  const robotMouseLift = useTransform(springY, [-40, 40], [-10, 10]);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  useEffect(() => {
    if (!isRobotVideoActive) return;

    const video = robotVideoRef.current;
    const canvas = robotCanvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      setRobotVideoFailed(true);
      return;
    }

    let active = true;

    const render = () => {
      if (!active) return;

      if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
        const maxProcessWidth = 720;
        const scale = Math.min(1, maxProcessWidth / video.videoWidth);
        const targetWidth = Math.max(1, Math.floor(video.videoWidth * scale));
        const targetHeight = Math.max(1, Math.floor(video.videoHeight * scale));

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }

        ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
        const frame = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const data = frame.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Remove near-black background and keep subject edges soft.
          const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          const maxChannel = Math.max(r, g, b);

          if (luma < 60 && maxChannel < 100) {
            data[i + 3] = 0;
          } else if (luma < 95 && maxChannel < 135) {
            const alpha = (luma - 60) / 35;
            data[i + 3] = Math.max(0, Math.min(255, Math.round(data[i + 3] * alpha)));
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      robotRafRef.current = requestAnimationFrame(render);
    };

    const handleCanPlay = () => {
      video.play().catch(() => {
        setRobotVideoFailed(true);
        setIsRobotVideoActive(false);
      });

      if (robotRafRef.current !== null) {
        cancelAnimationFrame(robotRafRef.current);
      }
      robotRafRef.current = requestAnimationFrame(render);
    };

    const handleError = () => {
      setRobotVideoFailed(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    video.load();

    return () => {
      active = false;
      video.pause();
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      if (robotRafRef.current !== null) {
        cancelAnimationFrame(robotRafRef.current);
      }
      robotRafRef.current = null;
    };
  }, [isRobotVideoActive]);

  const currentEvent = featuredEvents[currentIndex];

  const goToNextEvent = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const goToPreviousEvent = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  const handleHeroMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mouseX.set((x - rect.width / 2) * 0.12);
    mouseY.set((y - rect.height / 2) * 0.1);

    const robotCenterX = rect.width * 0.78;
    const robotCenterY = rect.height * 0.72;
    const dx = x - robotCenterX;
    const dy = y - robotCenterY;
    const distance = Math.hypot(dx, dy);
    const activationRadius = Math.min(rect.width, rect.height) * 0.32;
    const shouldActivate = distance <= activationRadius;

    setIsRobotVideoActive((prev) => (prev === shouldActivate ? prev : shouldActivate));
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsRobotVideoActive(false);
  };

  const handleFeaturedTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    swipeStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleFeaturedTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return;

    const endX = event.changedTouches[0]?.clientX;
    if (typeof endX !== "number") {
      swipeStartX.current = null;
      return;
    }

    const swipeDistance = endX - swipeStartX.current;
    const swipeThreshold = 45;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance < 0) {
        goToNextEvent();
      } else {
        goToPreviousEvent();
      }
    }

    swipeStartX.current = null;
  };

  return (
    <div className="min-h-screen grid-bg">
      {/* Main Bento Grid */}
      <main className="px-4 md:px-8 pb-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6">

          {/* Hero Card - Large */}
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            className="col-span-12 lg:col-span-8 bg-card rounded-large border border-border relative overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col justify-between group"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={backgroundImageUrl}
                alt="Cybernetic Interface Background"
                className="w-full h-full object-cover opacity-20 grayscale scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Interactive Robot */}
            <motion.div
              className="absolute right-0 bottom-0 w-1/2 md:w-2/3 h-3/4 md:h-full z-10 pointer-events-none"
              style={{
                y: robotY,
                scale: robotScale,
                rotate: robotRotate,
              }}
              animate={{
                y: [0, -10, 0, 8, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                style={{
                  x: springX,
                  y: robotMouseLift,
                  rotate: robotMouseRotate,
                }}
                className="w-full h-full origin-bottom"
              >
                <InteractiveRobot containerRef={heroRef} />
              </motion.div>
            </motion.div>

            {/* Decorative circles */}
            <div className="absolute inset-0 z-0 opacity-[0.03]">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="70" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.3" />
                <circle cx="70" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.3" />
                <circle cx="70" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.3" />
              </svg>
            </div>
            <div className="absolute left-8 bottom-8 font-display text-[10rem] md:text-[15rem] leading-none opacity-[0.03] select-none pointer-events-none">
              KPRC
            </div>

            <div className="relative z-20 p-8 md:p-12 flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                  KMEA Engineering College Presents
                </span>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-foreground">
                  KAPRICIOUS<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">2026</span>
                </h1>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mt-8">
                <div className="max-w-xs">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Experience the intersection of human creativity and synthetic intelligence. Join the most awaited technical festival of 2026.
                  </p>
                  <Link
                    to="/register"
                    className="group flex items-center gap-3 bg-foreground text-background px-6 py-4 rounded-2xl hover:opacity-90 transition-all"
                  >
                    <span className="font-bold tracking-tight text-sm">BE A PART OF THE EVENT </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-4xl font-display opacity-10">2026</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Departments Card */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="col-span-12 lg:col-span-4 bg-card rounded-large border border-border p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-sm tracking-tight">DEPARTMENTS</h3>
                <span className="text-muted-foreground text-xs">8 departments</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <span
                    key={dept}
                    className="px-4 py-2 rounded-full border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
                    data-robot-interact
                  >
                    {dept}
                  </span>
                ))}
              </div>
                {/* Cultural Events Section */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-display text-sm tracking-tight">CULTURAL EVENTS</h3>
                    <span className="text-muted-foreground text-xs">5 events</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {culturalEvents.map((ev) => (
                      <Link
                        key={ev.id}
                        to={`/cultural-register`}
                      className="px-4 py-2 rounded-full border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:bg-accent hover:text-background transition-colors cursor-pointer"
                      data-robot-interact
                      >
                        {ev.title}
                      </Link>
                    ))}
                  </div>
                </div>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex -space-x-3">
                  {["🏆", "🎯", "🚀"].map((emoji, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-sm">
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="text-sm"><span className="font-bold text-foreground">₹2L+</span> <span className="text-muted-foreground">in Total Prizes</span></span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 rounded-full border border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">40+ Events</span>
                <span className="px-3 py-1 rounded-full border border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">2 Days</span>
                <span className="px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-[10px] font-bold uppercase tracking-wider text-accent">Open for All</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Event Card - Auto-scrolling Carousel */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            onTouchStart={handleFeaturedTouchStart}
            onTouchEnd={handleFeaturedTouchEnd}
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-foreground text-background rounded-large p-8 md:p-10 flex flex-col justify-between relative overflow-hidden min-h-[250px] touch-pan-y"
          >
            {/* Background with event image */}
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentEvent.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-foreground/80" />
            </div>
            
            {/* Decorative circles */}
            <div className="absolute inset-0 z-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-lg">FEATURED</h3>
                {/* Carousel indicators */}
                <div className="flex gap-1.5">
                  {featuredEvents.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-background w-4' : 'bg-background/40'}`}
                    />
                  ))}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentEvent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm opacity-60"
                >
                  {currentEvent.title}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-auto pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentEvent.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold">{currentEvent.prizePool}</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-50">Prize Pool</div>
                </motion.div>
              </AnimatePresence>
              <Link
                to={`/events/${currentEvent.id}`}
                className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Countdown Card */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-card rounded-large border border-border p-8 md:p-10 flex flex-col justify-center items-center"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Countdown</span>
            <CountdownTimer />
            <span className="text-[10px] tracking-widest text-muted-foreground mt-4 uppercase">March 27, 2026</span>
          </motion.div>

          {/* Info Bar */}
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="visible"
            className="col-span-12 lg:col-span-4 bg-card rounded-large border border-border p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Location</p>
                <p className="text-sm font-bold text-foreground">KMEA, ALUVA</p>
              </div>
              <div className="w-px h-8 bg-border hidden md:block" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Dates</p>
                <p className="text-sm font-bold text-foreground">MAR 27 - 28, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Live Portal</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* About Section */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display text-2xl md:text-3xl font-bold mb-6">
            ABOUT <span className="text-accent">KAPRICIOUS</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            Kapricious 2026 is the flagship annual tech fest of KMEA Engineering College, bringing together the brightest minds in technology for a celebration of innovation, creativity, and competition. From AI hackathons to robo races, from cybersecurity challenges to design sprints — experience the future of technology.
          </motion.p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 pb-20">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-card rounded-large border border-border p-12 md:p-16 text-center"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">READY TO BEGIN?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join thousands of innovators. Register now and be part of the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="group flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-2xl hover:opacity-90 transition-all"
            >
              <span className="font-bold tracking-tight text-sm">REGISTER NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/events"
              className="flex items-center justify-center gap-3 border border-border px-8 py-4 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
            >
              <span className="font-bold tracking-tight text-sm">EXPLORE EVENTS</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
