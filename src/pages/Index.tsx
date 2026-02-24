import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, Shield, Paintbrush, Bot, Zap, Brain } from "lucide-react";
import heroGlobe from "@/assets/hero-globe.png";
import CountdownTimer from "@/components/CountdownTimer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const events = [
  { icon: Brain, title: "AI Hackathon", desc: "24-hour AI innovation challenge" },
  { icon: Cpu, title: "Code Debugging", desc: "Fix bugs across multiple languages" },
  { icon: Shield, title: "Capture The Flag", desc: "Cybersecurity puzzles & exploits" },
  { icon: Paintbrush, title: "UI/UX Sprint", desc: "Design beautiful interfaces" },
  { icon: Bot, title: "Robo Race", desc: "Build & race your robot" },
  { icon: Zap, title: "Tech Quiz", desc: "Test your tech knowledge" },
];

const departments = ["CSE", "ECE", "EEE", "ME", "CE"];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid floor */}
        <div className="absolute inset-0 grid-floor opacity-30" />
        {/* Globe image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.img
            src={heroGlobe}
            alt="Holographic globe"
            className="w-[600px] md:w-[800px] opacity-50 animate-float"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-accent text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4"
          >
            KMEA Engineering College Presents
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-foreground mb-4"
          >
            KAPRICIOUS <span className="text-primary glow-cyan">2026</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-accent text-lg md:text-2xl tracking-widest text-accent glow-magenta mb-8"
          >
            Where Innovation Meets Imagination
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register" className="neon-border rounded-lg px-8 py-3 font-accent text-sm tracking-widest uppercase text-primary hover:bg-primary/10 transition-colors">
              Register Now
            </Link>
            <Link to="/events" className="rounded-lg px-8 py-3 font-accent text-sm tracking-widest uppercase bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 transition-colors">
              Explore Events
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex justify-center">
            <CountdownTimer />
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 relative" id="about">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.h2 variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            About <span className="text-primary">Kapricious</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground leading-relaxed text-lg">
            Kapricious 2026 is the flagship annual tech fest of KMEA Engineering College, bringing together the brightest minds in technology for a celebration of innovation, creativity, and competition. From AI hackathons to robo races, from cybersecurity challenges to design sprints — experience the future of technology.
          </motion.p>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-24 relative" id="events">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold text-center mb-16">
            Featured <span className="text-primary">Events</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((evt, i) => (
              <motion.div
                key={evt.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group neon-border rounded-xl p-6 bg-card/50 backdrop-blur hover:bg-primary/5 transition-all duration-300"
              >
                <evt.icon className="w-10 h-10 text-primary mb-4 group-hover:drop-shadow-[0_0_8px_hsl(168,80%,50%)] transition-all" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{evt.title}</h3>
                <p className="text-sm text-muted-foreground">{evt.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/events" className="neon-border rounded-lg px-8 py-3 font-accent text-sm tracking-widest uppercase text-primary hover:bg-primary/10 transition-colors inline-block">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-24 relative" id="departments">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold mb-12">
            Participating <span className="text-accent">Departments</span>
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {departments.map((dept, i) => (
              <motion.div
                key={dept}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="neon-border rounded-lg px-8 py-4 font-display text-lg font-bold text-primary bg-card/30 backdrop-blur"
              >
                {dept}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 relative" id="contact">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.h2 variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold mb-6">
            Get In <span className="text-primary">Touch</span>
          </motion.h2>
          <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 text-muted-foreground">
            <p>KMEA Engineering College, Aluva, Ernakulam, Kerala</p>
            <p>Email: kapricious@kmea.edu.in</p>
            <p>Phone: +91 484 2628001</p>
          </motion.div>
          <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8">
            <Link to="/register" className="neon-border rounded-lg px-8 py-3 font-accent text-sm tracking-widest uppercase text-primary hover:bg-primary/10 transition-colors inline-block">
              Register Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
