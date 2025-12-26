import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { Bot, Brain, Globe, ShoppingCart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ModuleItem {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  tooltipName: string;
  level: "basic" | "pro" | "advanced";
  height: number; // percentage
}

const modules: ModuleItem[] = [
  {
    icon: <Brain className="w-4 h-4 md:w-5 md:h-5" />,
    label: "IA",
    tooltipName: "Inteligência Artificial",
    level: "basic",
    height: 25,
  },
  {
    icon: <Bot className="w-4 h-4 md:w-5 md:h-5" />,
    label: "AGENTE",
    sublabel: "IA",
    tooltipName: "Agente de IA Automatizado",
    level: "advanced",
    height: 100,
  },
  {
    icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />,
    label: "WEB",
    sublabel: "SITE",
    tooltipName: "Website Profissional",
    level: "pro",
    height: 75,
  },
  {
    icon: <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />,
    label: "LOJA",
    sublabel: "ONLINE",
    tooltipName: "E-commerce Completo",
    level: "pro",
    height: 60,
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
          {/* Chart container */}
          <div className="relative">
            {/* Labels and bars wrapper */}
            <div className="flex">
              {/* Level labels on left */}
              <div className="flex flex-col justify-between h-[200px] sm:h-[250px] md:h-[300px] pr-2 sm:pr-4">
                {levelLabels.map((level) => (
                  <span
                    key={level.label}
                    className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium"
                  >
                    {level.label}
                  </span>
                ))}
              </div>

              {/* Bars area */}
              <div className="flex-1 relative">
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {levelLabels.map((level) => (
                    <div key={level.label} className="w-full h-px bg-border/40" />
                  ))}
                  <div className="w-full h-px bg-border/40" />
                </div>

                {/* Bars */}
                <TooltipProvider>
                  <div className="relative h-[200px] sm:h-[250px] md:h-[300px] flex items-end justify-around px-2 sm:px-4 md:px-8">
                    {modules.map((module, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <div
                            className="w-10 sm:w-14 md:w-16 bg-primary rounded-t-sm cursor-pointer hover:bg-primary/80 transition-all duration-1000 ease-out"
                            style={{
                              height: `${animatedHeights[index]}%`,
                              transitionDelay: `${index * 150}ms`,
                              minHeight: animatedHeights[index] > 0 ? "8px" : "0",
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-medium">{module.tooltipName}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              </div>
            </div>

            {/* Icons and labels row */}
            <div className="flex mt-4">
              {/* Spacer for label column */}
              <div className="w-12 sm:w-16 md:w-20 shrink-0" />
              
              {/* Labels */}
              <div className="flex-1 flex items-start justify-around px-2 sm:px-4 md:px-8 pt-3 border-t border-border/40">
                {modules.map((module, index) => (
                  <div key={index} className="flex flex-col items-center text-center w-10 sm:w-14 md:w-16">
                    <div className="text-primary mb-1">
                      {module.icon}
                    </div>
                    <span className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground font-medium leading-tight">
                      {module.label}
                    </span>
                    {module.sublabel && (
                      <span className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground font-medium leading-tight">
                        {module.sublabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesChart;
