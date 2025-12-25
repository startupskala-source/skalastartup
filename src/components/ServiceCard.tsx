import { useEffect, useState } from "react";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  delay?: number;
}

export const ServiceCard = ({ number, title, description, delay = 0 }: ServiceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`group relative transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <div className="relative border-t border-border py-8 md:py-12">
        <div className="flex items-start gap-6 md:gap-12">
          <span className="font-display text-sm text-muted-foreground">{number}</span>
          <div className="flex-1">
            <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 group-hover:translate-x-2 transition-transform duration-300">
              {title}
            </h3>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
