import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
  { value: 200, suffix: "+", label: "Clientes atendidos" },
  { value: 500, suffix: "+", label: "Projetos entregues" },
  { value: 24, suffix: "/7", label: "Suporte disponível" },
  { value: 98, suffix: "%", label: "Satisfação" },
];

export const Stats = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 border-y border-border">
      <div
        ref={ref}
        className={`container mx-auto max-w-5xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatItem = ({
  stat,
  index,
  isVisible,
}: {
  stat: (typeof stats)[0];
  index: number;
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  return (
    <div
      className="text-center"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">
        {count}
        <span className="text-muted-foreground">{stat.suffix}</span>
      </p>
      <p className="text-muted-foreground text-xs sm:text-sm">{stat.label}</p>
    </div>
  );
};
