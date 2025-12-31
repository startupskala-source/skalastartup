import { useEffect, useState } from "react";
import { QrCode, MessageSquare, Globe, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  delay?: number;
}

const iconMap: Record<string, React.ElementType> = {
  "01": QrCode,
  "02": MessageSquare,
  "03": Globe,
};

export const ServiceCard = ({ number, title, description, delay = 0 }: ServiceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = iconMap[number] || QrCode;

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
      <div className="relative border-t border-border py-6 sm:py-8 md:py-12 hover:bg-muted/30 transition-colors duration-300 rounded-lg px-2 sm:px-4 -mx-2 sm:-mx-4">
        <div className="flex items-start gap-4 sm:gap-6 md:gap-12">
          <div className="flex flex-col items-center gap-3">
            <span className="font-display text-xs sm:text-sm text-muted-foreground">{number}</span>
            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold group-hover:translate-x-2 transition-transform duration-300">
                {title}
              </h3>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
