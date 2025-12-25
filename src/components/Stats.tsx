import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import DotCard from "@/components/ui/moving-dot-card";
import { motion } from "framer-motion";

const stats = [
  { value: 200, suffix: "+", label: "Clientes atendidos" },
  { value: 500, suffix: "+", label: "Projetos entregues" },
  { value: 24, suffix: "/7", label: "Suporte disponível" },
  { value: 98, suffix: "%", label: "Satisfação" },
];

export const Stats = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 border-y border-border relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-dot-glow/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-dot-glow/5 rounded-full blur-3xl" />
      </div>

      <div
        ref={ref}
        className={`container mx-auto max-w-4xl transition-all duration-700 relative z-10 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex flex-wrap justify-center gap-5 md:gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label}>
              {isVisible && (
                <DotCard
                  target={stat.value}
                  duration={2000}
                  suffix={stat.suffix}
                  label={stat.label}
                  index={index}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
