import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Cpu, Shield, Paintbrush, Bot, Zap, Brain, Monitor, Flame, CircuitBoard, Cog, HardHat, ShieldCheck, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Globe3D from "@/components/Globe3D";
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

const deptIcons: Record<string, any> = {
  CSE: Monitor, ECE: CircuitBoard, EEE: Zap, CE: HardHat, ME: Cog,
  SF: Flame, AI: Sparkles, RAE: Bot,
};
const deptIconFallback = ShieldCheck;

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("departments").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid floor */}
        <div className="absolute inset-0 grid-floor opacity-30" />
        {/* 3D Globe */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div
            className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-60"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5 }}
          >
            <Globe3D scrollY={scrollY} />
          </motion.div>
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
            Explore <span className="text-accent">Departments</span>
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {departments?.map((dept, i) => {
              const Icon = deptIcons[dept.code] || deptIconFallback;
              return (
                <motion.div
                  key={dept.id}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/departments/${dept.id}`}
                    className="group neon-border rounded-xl p-5 md:p-6 bg-card/40 backdrop-blur flex flex-col items-center gap-3 hover:bg-primary/10 hover:border-primary/70 transition-all duration-300 block"
                  >
                    <Icon className="w-10 h-10 text-primary group-hover:drop-shadow-[0_0_12px_hsl(168,80%,50%)] transition-all" />
                    <span className="font-display text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors text-center leading-tight">
                      {dept.name}
                    </span>
                    <span className="font-accent text-[10px] tracking-widest uppercase text-muted-foreground">{dept.code}</span>
                  </Link>
                </motion.div>
              );
            })}
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
