import React, { useState, useEffect } from 'react';

interface DotCardProps {
  target?: number;
  duration?: number;
  suffix?: string;
  label?: string;
}

export default function DotCard({ 
  target = 777000, 
  duration = 2000,
  suffix = '',
  label = 'Views'
}: DotCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const range = end - start;
    if (range <= 0) return;
    const increment = Math.ceil(end / (duration / 50));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 50);
    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <div className="relative w-full min-w-[140px] max-w-[200px] p-[2px] md:p-[3px] rounded-xl overflow-hidden group">
      <div className="absolute w-4 h-4 md:w-6 md:h-6 bg-primary rounded-full blur-sm animate-move-dot" />

      <div className="relative flex flex-col items-center justify-center gap-1 bg-background rounded-xl px-4 py-6 md:px-8 md:py-8 z-10 border border-border/50">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
          {count}
          <span className="text-muted-foreground">{suffix}</span>
        </p>
        <p className="text-muted-foreground text-xs md:text-sm text-center">{label}</p>
        <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </div>
  );
}
