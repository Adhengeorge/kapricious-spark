import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import { allDepartmentEvents } from "@/data/events";

const departments = ["CSE", "Civil", "ECE", "EEE", "Fire & Safety", "Mechanical", "AI", "Robotics & Automation"];
const culturalEvents = [
  { id: "fashion-show", title: "Fashion Show" },
  { id: "group-dance", title: "Group Dance" },
  { id: "step-in-synchro", title: "Step in Synchro" },
  { id: "spot-photography", title: "Spot Photography" },
  { id: "star-of-kapricious", title: "Star of Kapricious" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const ScrollCards = () => {
  return (
    <div className="grid-bg">
      {/* Scroll reveal cards */}
      <section className="px-4 md:px-8 py-16 max-w-[1200px] mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card/60 backdrop-blur-xl border border-border rounded-[20px] p-8 md:p-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground">Unleash Your Potential</h2>
          <p className="text-muted-foreground leading-relaxed">Experience ground-breaking AI challenges and code sprints.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-card/60 backdrop-blur-xl border border-border rounded-[20px] p-8 md:p-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground">Network with the Best</h2>
          <p className="text-muted-foreground leading-relaxed">Connect with peers, mentors, and industry icons.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card/60 backdrop-blur-xl border border-border rounded-[20px] p-8 md:p-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground">Innovate the Future</h2>
          <p className="text-muted-foreground leading-relaxed">Build the next generation of tech solutions.</p>
        </motion.div>
      </section>

      {/* Departments & Events */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Departments */}
          <motion.div
            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-card rounded-[20px] border border-border p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-sm tracking-tight">DEPARTMENTS</h3>
              <span className="text-muted-foreground text-xs">8 departments</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <span key={dept} className="px-4 py-2 rounded-full border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer">
                  {dept}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-sm tracking-tight">CULTURAL EVENTS</h3>
                <span className="text-muted-foreground text-xs">5 events</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {culturalEvents.map((ev) => (
                  <Link key={ev.id} to="/cultural-register" className="px-4 py-2 rounded-full border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:bg-accent hover:text-background transition-colors cursor-pointer">
                    {ev.title}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Countdown + Info */}
          <div className="space-y-6">
            <motion.div
              variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-card rounded-[20px] border border-border p-8 flex flex-col justify-center items-center"
            >
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4">Countdown</span>
              <CountdownTimer />
              <span className="text-[10px] tracking-widest text-muted-foreground mt-4 uppercase">March 27, 2026</span>
            </motion.div>

            <motion.div
              variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-card rounded-[20px] border border-border p-8 flex flex-col md:flex-row items-center justify-between gap-6"
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
        </div>
      </section>

      {/* About */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display text-2xl md:text-3xl font-bold mb-6">
            ABOUT <span className="text-accent">KAPRICIOUS</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            Kapricious 2026 is the flagship annual tech fest of KMEA Engineering College, bringing together the brightest minds in technology for a celebration of innovation, creativity, and competition.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 pb-20">
        <motion.div
          variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-card rounded-[20px] border border-border p-12 md:p-16 text-center max-w-[1200px] mx-auto"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">READY TO BEGIN?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join thousands of innovators. Register now and be part of the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="group flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-2xl hover:opacity-90 transition-all">
              <span className="font-bold tracking-tight text-sm">REGISTER NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/events" className="flex items-center justify-center gap-3 border border-border px-8 py-4 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
              <span className="font-bold tracking-tight text-sm">EXPLORE EVENTS</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ScrollCards;
