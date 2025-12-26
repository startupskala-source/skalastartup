import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { DollarSign, FileText, Rocket, Lightbulb, BarChart3 } from "lucide-react";

interface ModuleItem {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  level: "basic" | "pro" | "advanced";
  height: number; // percentage
}

const modules: ModuleItem[] = [
  {
    icon: <DollarSign className="w-5 h-5" />,
    label: "TIME DE",
    sublabel: "VENDAS",
    level: "basic",
    height: 15,
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "PÁGINAS",
    level: "basic",
    height: 25,
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    label: "TRÁFEGO",
    sublabel: "PAGO",
    level: "advanced",
    height: 100,
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    label: "CRIATIVOS",
    level: "pro",
    height: 75,
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    label: "DASHBOARDS",
    level: "basic",
    height: 20,
  },
];

const levelLabels = [
  { label: "ADVANCED", position: 100 },
  { label: "PRO", position: 66 },
  { label: "BASIC", position: 33 },
];

const ModulesChart = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [animatedHeights, setAnimatedHeights] = useState<number[]>(
    modules.map(() => 0)
  );

  useEffect(() => {
    if (isVisible) {
      modules.forEach((module, index) => {
        setTimeout(() => {
          setAnimatedHeights((prev) => {
            const newHeights = [...prev];
            newHeights[index] = module.height;
            return newHeights;
          });
        }, index * 150);
      });
    }
  }, [isVisible]);

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 bg-background transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-widest">
            MÓDULOS & PLANOS
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end justify-center gap-4 md:gap-8 h-[300px] md:h-[400px]">
            {/* Level labels on the left */}
            <div className="absolute left-0 top-0 bottom-16 flex flex-col justify-between text-xs md:text-sm text-muted-foreground font-medium">
              {levelLabels.map((level) => (
                <div key={level.label} className="flex items-center">
                  <span className="mr-2 md:mr-4">{level.label}</span>
                  <div className="w-[calc(100vw-150px)] md:w-[600px] lg:w-[700px] h-px bg-border/50 absolute left-16 md:left-24" />
                </div>
              ))}
            </div>

            {/* Bars container */}
            <div className="flex items-end justify-center gap-6 md:gap-12 ml-20 md:ml-28 h-full pb-16">
              {modules.map((module, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Bar */}
                  <div className="relative h-[220px] md:h-[320px] w-8 md:w-12 flex items-end">
                    <div
                      className="w-full bg-primary rounded-t-sm transition-all duration-1000 ease-out"
                      style={{
                        height: `${animatedHeights[index]}%`,
                        transitionDelay: `${index * 150}ms`,
                      }}
                    />
                  </div>

                  {/* Icon and label */}
                  <div className="mt-3 flex flex-col items-center text-center">
                    <div className="text-primary mb-1">{module.icon}</div>
                    <span className="text-[10px] md:text-xs text-muted-foreground font-medium leading-tight">
                      {module.label}
                    </span>
                    {module.sublabel && (
                      <span className="text-[10px] md:text-xs text-muted-foreground font-medium leading-tight">
                        {module.sublabel}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesChart;
