import { useEffect, useRef, useState } from "react";
import { MessageCircle, TrendingUp, Magnet, Handshake } from "lucide-react";

const BusinessCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const items = [
    { 
      id: "engajamento", 
      label: "Engajamento", 
      Icon: MessageCircle,
      position: "top-left"
    },
    { 
      id: "monetizacao", 
      label: "Monetização", 
      Icon: TrendingUp,
      position: "center"
    },
    { 
      id: "retencao", 
      label: "Retenção", 
      Icon: Magnet,
      position: "top-right"
    },
    { 
      id: "aquisicao", 
      label: "Aquisição", 
      Icon: Handshake,
      position: "bottom-left"
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ciclo de <span className="text-primary">Crescimento</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nossa estratégia integrada para impulsionar seu negócio
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-[700px] h-[400px]">
            {/* Infinity SVG Path */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 700 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left loop */}
              <path
                d={`M 350 200 
                   C 350 100, 200 50, 120 120
                   C 40 190, 40 280, 120 320
                   C 200 360, 350 300, 350 200`}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="2"
                strokeOpacity="0.3"
                fill="none"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                strokeDasharray="8 4"
              />
              {/* Right loop */}
              <path
                d={`M 350 200 
                   C 350 100, 500 50, 580 120
                   C 660 190, 660 280, 580 320
                   C 500 360, 350 300, 350 200`}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="2"
                strokeOpacity="0.3"
                fill="none"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                strokeDasharray="8 4"
              />
              
              {/* Arrows */}
              {/* Top left arrow (going up) */}
              <polygon
                points="155,85 165,100 145,100"
                fill="hsl(var(--muted-foreground))"
                fillOpacity="0.5"
                className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Bottom left arrow (going right) */}
              <polygon
                points="260,330 245,320 245,340"
                fill="hsl(var(--muted-foreground))"
                fillOpacity="0.5"
                className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Top right arrow (going right) */}
              <polygon
                points="545,85 535,100 555,100"
                fill="hsl(var(--muted-foreground))"
                fillOpacity="0.5"
                className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Bottom right arrow (going left) */}
              <polygon
                points="440,330 455,320 455,340"
                fill="hsl(var(--muted-foreground))"
                fillOpacity="0.5"
                className={`transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              />
            </svg>

            {/* Engajamento - Top Left */}
            <div
              className={`absolute top-4 left-16 flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <MessageCircle className="w-7 h-7 text-primary" />
              </div>
              <span className="text-foreground font-semibold text-sm">Engajamento</span>
            </div>

            {/* Monetização - Center */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <span className="text-foreground font-semibold">Monetização</span>
            </div>

            {/* Retenção - Top Right */}
            <div
              className={`absolute top-4 right-16 flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Magnet className="w-7 h-7 text-primary" />
              </div>
              <span className="text-foreground font-semibold text-sm">Retenção</span>
            </div>

            {/* Aquisição - Bottom Left */}
            <div
              className={`absolute bottom-8 left-16 flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Handshake className="w-7 h-7 text-primary" />
              </div>
              <span className="text-foreground font-semibold text-sm">Aquisição</span>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Grid */}
        <div className="md:hidden">
          <div className="relative">
            {/* Center SVG for mobile */}
            <svg
              className="w-full h-64 mx-auto"
              viewBox="0 0 300 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified infinity shape for mobile */}
              <path
                d="M 150 100 C 150 60, 80 40, 50 70 C 20 100, 20 140, 50 160 C 80 180, 150 140, 150 100"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="1.5"
                strokeOpacity="0.3"
                fill="none"
                strokeDasharray="6 3"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              />
              <path
                d="M 150 100 C 150 60, 220 40, 250 70 C 280 100, 280 140, 250 160 C 220 180, 150 140, 150 100"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="1.5"
                strokeOpacity="0.3"
                fill="none"
                strokeDasharray="6 3"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              />
            </svg>

            {/* Mobile items positioned over SVG */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Engajamento - Top Left */}
              <div
                className={`absolute top-2 left-4 flex flex-col items-center transition-all duration-700 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-1">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-semibold text-xs">Engajamento</span>
              </div>

              {/* Monetização - Center */}
              <div
                className={`flex flex-col items-center transition-all duration-700 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-1">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <span className="text-foreground font-semibold text-xs">Monetização</span>
              </div>

              {/* Retenção - Top Right */}
              <div
                className={`absolute top-2 right-4 flex flex-col items-center transition-all duration-700 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-1">
                  <Magnet className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-semibold text-xs">Retenção</span>
              </div>

              {/* Aquisição - Bottom Left */}
              <div
                className={`absolute bottom-2 left-4 flex flex-col items-center transition-all duration-700 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-1">
                  <Handshake className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-semibold text-xs">Aquisição</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCycle;
