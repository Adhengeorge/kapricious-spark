import { useState, useEffect } from "react";

const EVENT_DATE = new Date("2026-03-15T09:00:00+05:30").getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, EVENT_DATE - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4">
      {blocks.map((b) => (
        <div key={b.label} className="flex flex-col items-center">
          <div className="neon-border rounded-lg px-4 py-3 min-w-[70px] text-center bg-secondary/50 backdrop-blur">
            <span className="font-display text-2xl md:text-3xl font-bold text-primary glow-cyan">
              {String(b.value).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 font-accent text-xs tracking-widest uppercase text-muted-foreground">{b.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
