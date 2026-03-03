import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const categories = ["Robotics", "AI/ML", "Cybersecurity", "Design", "FinTech", "BioTech"];

const Index = () => {
  return (
    <div className="min-h-screen grid-bg">
      {/* Main Bento Grid */}
      <main className="px-4 md:px-8 pt-24 pb-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6">

          {/* Hero Card - Large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="col-span-12 lg:col-span-8 bg-card rounded-large border border-border relative overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col justify-between"
          >
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

            <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                  KMEA Engineering College Presents
                </span>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-foreground">
                  BEYOND<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">LIMITS</span>
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
                    <span className="font-bold tracking-tight text-sm">REGISTER NOW</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-4xl font-display opacity-10">2026</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground">EDITION TWO</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Categories Card */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="col-span-12 lg:col-span-4 bg-card rounded-large border border-border p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-sm tracking-tight">CATEGORIES</h3>
                <span className="text-muted-foreground text-xs">6 tracks</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-4 py-2 rounded-full border border-border text-xs font-medium uppercase tracking-wider text-muted-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm"><span className="font-bold text-foreground">2.4k+</span> <span className="text-muted-foreground">Registrations</span></span>
              </div>
              <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-foreground w-[65%] rounded-full" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">65% of slots filled</p>
            </div>
          </motion.div>

          {/* Featured Event Card */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-foreground text-background rounded-large p-8 md:p-10 flex flex-col justify-between relative overflow-hidden min-h-[250px]"
          >
            <div className="absolute inset-0 z-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="font-display text-lg mb-1">FEATURED</h3>
              <p className="text-sm opacity-60">Mega Hackathon '26</p>
            </div>
            <div className="relative z-10 flex items-center justify-between mt-auto pt-6">
              <div>
                <div className="text-3xl font-bold">₹1L</div>
                <div className="text-[10px] uppercase tracking-widest opacity-50">Prize Pool</div>
              </div>
              <Link
                to="/events"
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
