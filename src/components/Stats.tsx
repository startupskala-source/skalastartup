import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const stats = [
  { value: 200, suffix: "+", label: "Clientes" },
  { value: 500, suffix: "+", label: "Projetos" },
  { value: 24, suffix: "/7", label: "Suporte" },
  { value: 98, suffix: "%", label: "Satisfação" },
];

const CountUp = ({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(target / (duration / 30));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="tabular-nums">
      {count}
      <span className="text-dot-glow">{suffix}</span>
    </span>
  );
};

export const Stats = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-dot-glow/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`container mx-auto max-w-5xl transition-all duration-1000 relative z-10 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-border/40 rounded-2xl overflow-hidden bg-background/50 backdrop-blur-sm shadow-2xl shadow-black/5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className={`relative group p-8 md:p-10 flex flex-col items-center justify-center text-center
                ${index < 2 ? 'border-b border-border/40' : ''} 
                ${index % 2 === 0 ? 'border-r border-border/40' : ''}
                ${index === 2 ? 'md:border-b-0 md:border-r' : ''}
                ${index === 1 ? 'md:border-r' : ''}
                hover:bg-muted/50 transition-colors duration-500
              `}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-dot-glow/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Moving dot border effect */}
              <div className="absolute w-3 h-3 bg-dot-glow rounded-full blur-sm animate-move-dot opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Number */}
              <motion.h3 
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-none relative z-10 tracking-tight"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </motion.h3>
              
              {/* Label */}
              <p className="text-muted-foreground text-sm md:text-base mt-3 relative z-10 font-medium">
                {stat.label}
              </p>

              {/* Corner accent */}
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-dot-glow/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
