import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageSquare, Search, Code, Rocket } from "lucide-react";
import EstimatedDateBadge from "@/components/ui/estimated-arrival";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Contato",
    description: "Você entra em contato e conta sobre seu negócio e necessidades.",
  },
  {
    number: "02",
    icon: Search,
    title: "Análise",
    description: "Analisamos seu projeto e identificamos as melhores soluções.",
  },
  {
    number: "03",
    icon: Code,
    title: "Desenvolvimento",
    description: "Desenvolvemos sua solução com acompanhamento em tempo real.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Entrega",
    description: "Entregamos e garantimos suporte contínuo para seu sucesso.",
  },
];

export const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="como-funciona" className="py-24 md:py-32 px-6 md:px-12 bg-secondary">
      <div className="container mx-auto max-w-5xl">
        <div
          ref={ref}
          className={`mb-16 md:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4">
            Como Funciona
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Do contato à entrega <br />
            <span className="text-muted-foreground">em 4 passos simples</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Estimated Arrival Badge */}
        <div className="mt-16 flex justify-center">
          <EstimatedDateBadge />
        </div>
      </div>
    </section>
  );
};

const StepCard = ({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-display text-5xl font-bold text-border">
            {step.number}
          </span>
          <div className="p-3 rounded-full bg-background border border-border">
            <Icon className="h-5 w-5 text-foreground" />
          </div>
        </div>
        <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {step.description}
        </p>
      </div>

      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-8" />
      )}
    </div>
  );
};
