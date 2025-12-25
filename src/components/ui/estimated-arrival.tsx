import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown, Truck, Clock, Wrench, Phone } from "lucide-react";

export interface EstimatedDateBadgeProps {
  estimatedDate?: string;
  dayOfWeek?: string;
  deliveryType?: string;
  className?: string;
}

const EstimatedDateBadge: React.FC<EstimatedDateBadgeProps> = ({
  estimatedDate = "Em 7 dias úteis",
  dayOfWeek = "Entrega expressa",
  deliveryType = "Grátis",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        {/* Main Card */}
        <div
          className="cursor-pointer p-5 transition-all duration-300 hover:bg-muted/50"
          onClick={toggleDetails}
        >
          <div className="flex items-center gap-4">
            {/* Truck Icon with Pulse */}
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Truck className="h-7 w-7 text-primary animate-bounce-gentle" />
              </div>
              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-500 animate-pulse-soft" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Prazo Estimado
              </p>
              <p className="text-xl font-bold text-foreground">{estimatedDate}</p>
              <p className="text-sm text-muted-foreground">{dayOfWeek}</p>
            </div>

            {/* Badge & Arrow */}
            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {deliveryType}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </div>
          </div>

          {/* Progress Line */}
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r from-primary to-emerald-500",
                isOpen ? "animate-slide-right" : "w-2/3"
              )}
            />
          </div>
        </div>

        {/* Expandable Details */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border bg-muted/30 p-5">
              <div className="space-y-4">
                {/* Step 1 */}
                <div
                  className={cn(
                    "flex gap-4",
                    isOpen && "animate-slide-in"
                  )}
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        1
                      </span>
                      <span className="font-semibold text-foreground">Tempo de Entrega</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Os pedidos são entregues em até 7 dias úteis após a confirmação.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  className={cn(
                    "flex gap-4",
                    isOpen && "animate-slide-in"
                  )}
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        2
                      </span>
                      <span className="font-semibold text-foreground">Implementação</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Nosso time cuida de toda a implementação e configuração do seu projeto.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  className={cn(
                    "flex gap-4",
                    isOpen && "animate-slide-in"
                  )}
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        3
                      </span>
                      <span className="font-semibold text-foreground">Suporte Técnico</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Suporte dedicado disponível para qualquer dúvida ou ajuste necessário.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatedDateBadge;
