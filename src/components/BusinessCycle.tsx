import { useEffect, useRef, useState } from "react";
import { MessageCircle, DollarSign, Heart, Users, Target } from "lucide-react";

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
    { icon: MessageCircle, label: "Engajamento", delay: "0ms" },
    { icon: Users, label: "Aquisição", delay: "150ms" },
    { icon: DollarSign, label: "Monetização", delay: "300ms" },
    { icon: Heart, label: "Retenção", delay: "450ms" },
    { icon: Target, label: "Conversão", delay: "600ms" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Ciclo de <span className="text-primary">Crescimento</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
            Nossa estratégia integrada para impulsionar seu negócio
          </p>
        </div>

        {/* Desktop/Tablet Layout - SVG Infinity Loop */}
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
            <svg
              className="w-full h-auto"
              viewBox="0 0 400 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Left Loop */}
              <path
                d="M 200 120 C 200 50, 100 20, 55 65 C 10 110, 10 170, 55 210 C 100 250, 200 190, 200 120"
                stroke="hsl(var(--foreground))"
                strokeOpacity="0.15"
                strokeWidth="1.5"
                fill="none"
                className={`transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '600',
                  strokeDashoffset: isVisible ? '0' : '600',
                  transition: 'stroke-dashoffset 2s ease-out, opacity 0.5s'
                }}
              />

              {/* Right Loop */}
              <path
                d="M 200 120 C 200 50, 300 20, 345 65 C 390 110, 390 170, 345 210 C 300 250, 200 190, 200 120"
                stroke="hsl(var(--foreground))"
                strokeOpacity="0.15"
                strokeWidth="1.5"
                fill="none"
                className={`transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '600',
                  strokeDashoffset: isVisible ? '0' : '600',
                  transition: 'stroke-dashoffset 2s ease-out 0.3s, opacity 0.5s'
                }}
              />

              {/* Animated dot - Left */}
              <circle r="3" fill="hsl(var(--foreground))" fillOpacity="0.6" filter="url(#softGlow)">
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path="M 200 120 C 200 50, 100 20, 55 65 C 10 110, 10 170, 55 210 C 100 250, 200 190, 200 120"
                />
              </circle>

              {/* Animated dot - Right */}
              <circle r="3" fill="hsl(var(--foreground))" fillOpacity="0.6" filter="url(#softGlow)">
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  begin="3s"
                  path="M 200 120 C 200 50, 300 20, 345 65 C 390 110, 390 170, 345 210 C 300 250, 200 190, 200 120"
                />
              </circle>

              {/* Engajamento - Top Left */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: '400ms' }}
              >
                <rect x="30" y="25" width="44" height="44" rx="12" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeOpacity="0.2" strokeWidth="1" />
                <foreignObject x="32" y="27" width="40" height="40">
                  <div className="w-full h-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                </foreignObject>
                <text x="52" y="86" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="500">Engajamento</text>
              </g>

              {/* Aquisição - Bottom Left */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: '600ms' }}
              >
                <rect x="30" y="185" width="44" height="44" rx="12" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeOpacity="0.2" strokeWidth="1" />
                <foreignObject x="32" y="187" width="40" height="40">
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                </foreignObject>
                <text x="52" y="248" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="500">Aquisição</text>
              </g>

              {/* Monetização - Center */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: '800ms' }}
              >
                <rect x="175" y="95" width="50" height="50" rx="14" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeOpacity="0.25" strokeWidth="1.5" />
                <foreignObject x="177" y="97" width="46" height="46">
                  <div className="w-full h-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                  </div>
                </foreignObject>
                <text x="200" y="162" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">Monetização</text>
              </g>

              {/* Retenção - Top Right */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: '1000ms' }}
              >
                <rect x="326" y="25" width="44" height="44" rx="12" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeOpacity="0.2" strokeWidth="1" />
                <foreignObject x="328" y="27" width="40" height="40">
                  <div className="w-full h-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                </foreignObject>
                <text x="348" y="86" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="500">Retenção</text>
              </g>

              {/* Conversão - Bottom Right */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: '1200ms' }}
              >
                <rect x="326" y="185" width="44" height="44" rx="12" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeOpacity="0.2" strokeWidth="1" />
                <foreignObject x="328" y="187" width="40" height="40">
                  <div className="w-full h-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                </foreignObject>
                <text x="348" y="248" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="500">Conversão</text>
              </g>

            </svg>
          </div>
        </div>

        {/* Mobile Layout - Vertical Flow */}
        <div className="md:hidden flex flex-col items-center gap-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isCenter = index === 2;
            return (
              <div
                key={item.label}
                className={`relative flex flex-col items-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: item.delay }}
              >
                {/* Connecting line (except for last item) */}
                {index < items.length - 1 && (
                  <div 
                    className={`absolute top-full left-1/2 -translate-x-1/2 w-px bg-foreground/15 transition-all duration-500 ${
                      isVisible ? 'h-4 opacity-100' : 'h-0 opacity-0'
                    }`}
                    style={{ transitionDelay: `${parseInt(item.delay) + 200}ms` }}
                  />
                )}
                
                <div 
                  className={`flex items-center justify-center border border-foreground/20 bg-background rounded-xl transition-all duration-300 ${
                    isCenter ? 'w-16 h-16' : 'w-14 h-14'
                  }`}
                >
                  <Icon 
                    className={`text-foreground ${isCenter ? 'w-7 h-7' : 'w-5 h-5'}`} 
                    strokeWidth={1.5} 
                  />
                </div>
                <span className={`mt-2 text-foreground ${isCenter ? 'text-sm font-semibold' : 'text-xs font-medium'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessCycle;
