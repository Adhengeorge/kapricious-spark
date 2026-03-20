"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Users,
  Zap,
  Star,
  Trophy,
  Target,
  ArrowRight,
  Clock,
  CreditCard,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { getDepartmentEventById } from "@/data/events/index";
import type { CoordinatorContact, DepartmentEvent } from "@/data/events/types";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const getCoordinatorContacts = (event: DepartmentEvent): CoordinatorContact[] => {
  if (event.coordinators?.length) {
    return event.coordinators;
  }

  if (!event.contact) {
    return [];
  }

  const coordinatorNames = event.contact.name
    .split("/")
    .map((value) => value.trim())
    .filter(Boolean);
  const coordinatorPhones = event.contact.phone
    .split("/")
    .map((value) => value.trim())
    .filter(Boolean);

  if (coordinatorNames.length > 1 && coordinatorNames.length === coordinatorPhones.length) {
    return coordinatorNames.map((name, index) => ({
      name,
      phone: coordinatorPhones[index],
    }));
  }

  return [event.contact];
};

const EventDetail = () => {
  const params = useParams<{ eventId: string }>();
  const searchParams = useSearchParams();
  const eventId = Array.isArray(params?.eventId) ? params.eventId[0] : params?.eventId;
  const event = eventId ? getDepartmentEventById(eventId) : null;
  const activeDepartment = searchParams.get("department")?.toUpperCase();
  const backHref =
    activeDepartment && event
      ? `/events?department=${activeDepartment}#${event.id}`
      : event
        ? `/events#${event.id}`
        : "/events";

  if (!event) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center grid-bg">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Event Not Found</h2>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
          <Link href="/events" className="text-accent hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const coordinators = getCoordinatorContacts(event);

  return (
    <div className="min-h-screen pt-24 pb-16 grid-bg px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <button
            onClick={() => window.location.assign(backHref)}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Events
          </button>
          <span className="text-border">/</span>
          <span className="text-foreground">{event.title}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-large border border-border overflow-hidden mb-6"
        >
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block rounded-full border border-border bg-card/80 backdrop-blur-sm px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                {event.department} - {event.departmentName}
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-tighter">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="p-8 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 bg-secondary/50 rounded-2xl p-4">
                <Calendar className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Date</p>
                  <p className="text-sm font-bold text-foreground">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-secondary/50 rounded-2xl p-4">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Time</p>
                  <p className="text-sm font-bold text-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-secondary/50 rounded-2xl p-4">
                <Users className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Team Size</p>
                  <p className="text-sm font-bold text-foreground">
                    {event.type === "individual" ? "Individual" : `Up to ${event.teamSize}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-secondary/50 rounded-2xl p-4">
                <Trophy className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Prize Pool</p>
                  <p className="text-sm font-bold text-foreground">{event.prizePool}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
              className="bg-card rounded-large border border-border p-8"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                About This Event
              </h2>
              <p className="text-muted-foreground leading-relaxed">{event.details}</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              className="bg-card rounded-large border border-border p-8"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Event Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {event.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3 bg-secondary/30 rounded-xl p-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="bg-card rounded-large border border-border p-8"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Rules & Guidelines
              </h2>
              <ol className="space-y-3">
                {event.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{rule}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {coordinators.length > 0 ? (
              <motion.div
                variants={fadeUp}
                custom={3}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-large border border-border p-8"
              >
                <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-accent" />
                  {coordinators.length > 1 ? "Coordinators" : "Coordinator"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {coordinators.map((coordinator) => (
                    <div
                      key={`${coordinator.name}-${coordinator.phone}`}
                      className="flex items-start gap-3 bg-secondary/30 rounded-xl p-4"
                    >
                      <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-foreground">{coordinator.name}</p>
                        <p className="text-sm text-muted-foreground">{coordinator.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}

            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="visible"
              className="bg-card rounded-large border border-border p-8"
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                Prizes
              </h2>
              <div className="flex flex-wrap gap-3">
                {event.prizes.map((prize, i) => (
                  <div key={i} className="bg-secondary/50 rounded-xl px-4 py-3">
                    <span className="text-foreground font-bold">{prize}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
              className="bg-foreground text-background rounded-large p-8 sticky top-28"
            >
              <h3 className="font-display text-lg font-bold mb-6">Register Now</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between pb-4 border-b border-background/20">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 opacity-60" />
                    <span className="text-sm opacity-80">Registration Fee</span>
                  </div>
                  <span className="font-bold">{event.registrationFee}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-background/20">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 opacity-60" />
                    <span className="text-sm opacity-80">Venue</span>
                  </div>
                  <span className="text-sm font-medium text-right max-w-[150px]">{event.venue}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-background/20">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 opacity-60" />
                    <span className="text-sm opacity-80">Type</span>
                  </div>
                  <span className="font-medium capitalize">{event.type}</span>
                </div>
              </div>

              <Link
                href={`/register?department=${event.department}&event=${event.id}`}
                className="w-full flex items-center justify-center gap-2 bg-background text-foreground px-6 py-4 rounded-2xl font-bold hover:opacity-90 transition-all group"
              >
                Register for this Event
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
