import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountdownTimer from "@/components/CountdownTimer";

const departments = ["CSE", "Civil", "ECE", "EEE", "Fire & Safety", "Mechanical", "AI", "Robotics & Automation"];
const culturalEvents = [
  { id: "fashion-show", title: "Fashion Show" },
  { id: "group-dance", title: "Group Dance" },
  { id: "step-in-synchro", title: "Step in Synchro" },
  { id: "spot-photography", title: "Spot Photography" },
  { id: "star-of-kapricious", title: "Star of Kapricious" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const ScrollCards = () => {
  return (
    <div className="grid-bg">
      {/* Departments & Events */}
      <section className="px-4 md:px-8 py-8 md:pb-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Departments */}
          <motion.div
            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="bg-card rounded-[20px] border border-border p-5 md:p-8"
          >
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="font-display text-xs md:text-sm tracking-tight">DEPARTMENTS</h3>
              <span className="text-muted-foreground text-[10px] md:text-xs">8 departments</span>
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {departments.map((dept) => (
                <span key={dept} className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-border text-[10px] md:text-xs font-medium uppercase tracking-wider text-muted-foreground hover:bg-foreground hover:text-background active:bg-foreground active:text-background transition-colors cursor-pointer">
                  {dept}
                </span>
              ))}
            </div>
            <div className="mt-6 md:mt-8">
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <h3 className="font-display text-xs md:text-sm tracking-tight">CULTURAL EVENTS</h3>
                <span className="text-muted-foreground text-[10px] md:text-xs">5 events</span>
              </div>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {culturalEvents.map((ev) => (
                  <Link key={ev.id} to="/cultural-register" className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-border text-[10px] md:text-xs font-medium uppercase tracking-wider text-muted-foreground hover:bg-accent hover:text-background active:bg-accent active:text-background transition-colors cursor-pointer">
                    {ev.title}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Countdown + Info */}
          <div className="space-y-4 md:space-y-6">
            <motion.div
              variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              className="bg-card rounded-[20px] border border-border p-6 md:p-8 flex flex-col justify-center items-center"
            >
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3 md:mb-4">Countdown</span>
              <CountdownTimer />
              <span className="text-[10px] tracking-widest text-muted-foreground mt-3 md:mt-4 uppercase">March 27, 2026</span>
            </motion.div>

            <motion.div
              variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              className="bg-card rounded-[20px] border border-border p-5 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6"
            >
              <div className="flex items-center gap-6 md:gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Location</p>
                  <p className="text-sm font-bold text-foreground">KMEA, ALUVA</p>
                </div>
                <div className="w-px h-8 bg-border" />
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
        </div>
      </section>

      {/* About */}
      <section className="px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="font-display text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
            ABOUT <span className="text-accent">KAPRICIOUS</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-muted-foreground leading-relaxed text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Kapricious 2026 is the flagship annual tech fest of KMEA Engineering College, bringing together the brightest minds in technology for a celebration of innovation, creativity, and competition.
          </motion.p>
        </div>
      </section>

    </div>
  );
};

export default ScrollCards;
