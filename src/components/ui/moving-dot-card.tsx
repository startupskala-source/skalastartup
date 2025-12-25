import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DotCardProps {
  target?: number;
  duration?: number;
  suffix?: string;
  label?: string;
  index?: number;
}

export default function DotCard({ 
  target = 777000, 
  duration = 2000,
  suffix = '',
  label = 'Views',
  index = 0
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
    <motion.div 
      className="relative w-[160px] h-[130px] p-[2px] rounded-2xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {/* Animated border dot */}
      <div className="absolute w-6 h-6 bg-dot-glow rounded-full blur-md animate-move-dot opacity-80" />
      
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute inset-0 rounded-2xl bg-dot-glow/20 blur-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card content */}
      <div className="relative flex flex-col items-center justify-center h-full bg-background/95 backdrop-blur-sm rounded-2xl z-10 border border-border/30 shadow-lg group-hover:shadow-xl group-hover:shadow-dot-glow/10 transition-all duration-300">
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-dot-glow/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-[shimmer_1.5s_ease-in-out] opacity-0 group-hover:opacity-100" />
        </div>

        {/* Number */}
        <motion.p 
          className="font-display text-4xl font-bold text-foreground leading-none relative z-10"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        >
          {count}
          <span className="text-dot-glow">{suffix}</span>
        </motion.p>
        
        {/* Label */}
        <p className="text-muted-foreground text-xs text-center mt-3 relative z-10 font-medium tracking-wide uppercase">
          {label}
        </p>

        {/* Bottom accent line */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-dot-glow/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}
