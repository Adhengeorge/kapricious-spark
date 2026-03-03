import { useState, useEffect } from "react";

const EVENT_DATE = new Date("2026-03-27T09:00:00+05:30").getTime();

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
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3">
      {blocks.map((b) => (
        <div key={b.label} className="flex flex-col items-center">
          <div className="bg-card border border-border rounded-2xl px-4 py-3 min-w-[64px] text-center neo-bento">
            <span className="font-display text-xl md:text-2xl font-bold text-foreground">
              {String(b.value).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 text-[10px] tracking-widest uppercase text-muted-foreground font-medium">{b.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
