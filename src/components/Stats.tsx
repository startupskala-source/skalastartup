import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import DotCard from "@/components/ui/moving-dot-card";

const stats = [
  { value: 200, suffix: "+", label: "Clientes atendidos" },
  { value: 500, suffix: "+", label: "Projetos entregues" },
  { value: 24, suffix: "/7", label: "Suporte disponível" },
  { value: 98, suffix: "%", label: "Satisfação" },
];

export const Stats = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-y border-border">
      <div
        ref={ref}
        className={`container mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 place-items-center">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {isVisible && (
                <DotCard
                  target={stat.value}
                  duration={2000}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
