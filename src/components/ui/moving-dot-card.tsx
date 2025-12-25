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
    <div className="relative w-[160px] h-[120px] p-[2px] rounded-xl overflow-hidden group">
      <div className="absolute w-5 h-5 bg-dot-glow rounded-full blur-sm animate-move-dot" />

      <div className="relative flex flex-col items-center justify-center h-full bg-background rounded-xl z-10 border border-border/50">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <p className="font-display text-3xl font-bold text-foreground leading-none">
          {count}
          <span className="text-muted-foreground">{suffix}</span>
        </p>
        <p className="text-muted-foreground text-xs text-center mt-2">{label}</p>
      </div>
    </div>
  );
}
