import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import { ceEvents } from "@/data/events/ce";
import { cseEvents } from "@/data/events/cse";
import { eceEvents } from "@/data/events/ece";
import { eeeEvents } from "@/data/events/eee";
import { mainEvents } from "@/data/events/main";
import { managerialEvents } from "@/data/events/managerial";
import { meEvents } from "@/data/events/me";
import { raEvents } from "@/data/events/rae";
import { sfEvents } from "@/data/events/sf";
import { sportsEvents } from "@/data/events/sports";
import type { DepartmentEvent } from "@/data/events/types";

const TECHFEST_BROCHURE_PATH = "/kapricious-2026-brochure.pdf";
const CATEGORY_AUTOPLAY_MS = 3500;

const departmentSections: Array<{
  code: string;
  label: string;
  events: DepartmentEvent[];
}> = [
  { code: "SPORTS", label: "Sports Fiesta", events: sportsEvents },
  { code: "MANAGERIAL", label: "Managerial Events", events: managerialEvents },
  { code: "CSE", label: "Computer Science", events: cseEvents },
  { code: "CE", label: "Civil", events: ceEvents },
  { code: "ECE", label: "Electronics & Communication", events: eceEvents },
  { code: "EEE", label: "Electrical & Electronics", events: eeeEvents },
  { code: "SAFETY & FIRE", label: "Safety & Fire", events: sfEvents },
  { code: "ME", label: "Mechanical", events: meEvents },
  { code: "ROBOTICS & AUTOMATION", label: "Robotics & Automation", events: raEvents },
  { code: "CULTURAL", label: "Cultural Events", events: mainEvents },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const ScrollCards = () => {
  const [selectedDepartmentCode, setSelectedDepartmentCode] = useState("CULTURAL");
  const selectedDepartment =
    useMemo(
      () => departmentSections.find((section) => section.code === selectedDepartmentCode) ?? departmentSections[departmentSections.length - 1],
      [selectedDepartmentCode],
    );

  useEffect(() => {
    const currentIndex = departmentSections.findIndex((section) => section.code === selectedDepartmentCode);
    const timer = window.setTimeout(() => {
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % departmentSections.length : 0;
      setSelectedDepartmentCode(departmentSections[nextIndex].code);
    }, CATEGORY_AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [selectedDepartmentCode]);

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
              <h3 className="font-display text-xs md:text-sm tracking-tight">EVENT CATEGORIES</h3>
              <span className="text-muted-foreground text-[10px] md:text-xs">{departmentSections.length} categories</span>
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {departmentSections.map((section) => (
                <button
                  key={section.code}
                  type="button"
                  onClick={() => setSelectedDepartmentCode(section.code)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-[10px] md:text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedDepartment.code === section.code
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:bg-foreground hover:text-background active:bg-foreground active:text-background"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
            <div className="mt-6 md:mt-8">
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <h3 className="font-display text-xs md:text-sm tracking-tight">{selectedDepartment.label.toUpperCase()}</h3>
                <span className="text-muted-foreground text-[10px] md:text-xs">{selectedDepartment.events.length} events</span>
              </div>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {selectedDepartment.events.map((ev) => (
                  <Link
                    key={ev.id}
                    href={`/events?department=${encodeURIComponent(selectedDepartment.code)}#${ev.id}`}
                    className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-border text-[10px] md:text-xs font-medium uppercase tracking-wider text-muted-foreground hover:bg-accent hover:text-background active:bg-accent active:text-background transition-colors cursor-pointer"
                  >
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
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-8 mx-auto max-w-xl rounded-[24px] border border-accent/25 bg-gradient-to-br from-accent/10 via-card to-card p-5 md:p-6"
          >
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-muted-foreground">Festival Guide</p>
            <h3 className="mt-3 font-display text-lg md:text-xl font-bold text-foreground">Get the full Kapricious brochure</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Download the complete techfest brochure for schedule, events, highlights, and key festival information.
            </p>
            <a
              href={TECHFEST_BROCHURE_PATH}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-background hover:opacity-90 transition-opacity"
            >
              Download Brochure
              <Download className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ScrollCards;
