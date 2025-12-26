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

  // Shared path definitions
  const leftLoopPath = "M 200 150 C 200 70, 100 30, 55 80 C 10 130, 10 200, 55 245 C 100 290, 200 230, 200 150";
  const rightLoopPath = "M 200 150 C 200 70, 300 30, 345 80 C 390 130, 390 200, 345 245 C 300 290, 200 230, 200 150";

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

        {/* Unified Responsive Layout */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[700px] aspect-[4/3]">
            
            {/* SVG Infinity Path */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Gradient for the lines */}
                <linearGradient id="cycleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                </linearGradient>

                {/* Glow filter */}
                <filter id="cycleGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Left Loop */}
              <path
                d={leftLoopPath}
                stroke="url(#cycleGradient)"
                strokeWidth="2"
                fill="none"
                className={`transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '800',
                  strokeDashoffset: isVisible ? '0' : '800',
                  transition: 'stroke-dashoffset 1.8s ease-out, opacity 0.5s'
                }}
              />

              {/* Right Loop */}
              <path
                d={rightLoopPath}
                stroke="url(#cycleGradient)"
                strokeWidth="2"
                fill="none"
                className={`transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '800',
                  strokeDashoffset: isVisible ? '0' : '800',
                  transition: 'stroke-dashoffset 1.8s ease-out 0.2s, opacity 0.5s'
                }}
              />

              {/* Animated flowing dot - Left */}
              <circle r="4" fill="hsl(var(--primary))" filter="url(#cycleGlow)">
                <animateMotion
                  dur="3.5s"
                  repeatCount="indefinite"
                  path={leftLoopPath}
                />
              </circle>

              {/* Animated flowing dot - Right */}
              <circle r="4" fill="hsl(var(--primary))" filter="url(#cycleGlow)">
                <animateMotion
                  dur="3.5s"
                  repeatCount="indefinite"
                  begin="1.75s"
                  path={rightLoopPath}
                />
              </circle>

              {/* Direction arrows - positioned on paths */}
              {/* Top Left */}
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1s' }}>
                <polygon points="90,48 98,62 82,62" fill="hsl(var(--primary))" fillOpacity="0.8" />
              </g>
              {/* Bottom Left */}
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.2s' }}>
                <polygon points="130,268 118,255 118,280" fill="hsl(var(--primary))" fillOpacity="0.8" />
              </g>
              {/* Top Right */}
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.4s' }}>
                <polygon points="310,48 302,62 318,62" fill="hsl(var(--primary))" fillOpacity="0.8" />
              </g>
              {/* Bottom Right */}
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.6s' }}>
                <polygon points="270,268 282,255 282,280" fill="hsl(var(--primary))" fillOpacity="0.8" />
              </g>
            </svg>

            {/* Engajamento - Top Left */}
            <div
              className={`absolute top-[2%] left-[5%] sm:left-[8%] flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-primary/30 rounded-lg sm:rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-background border border-primary/40 flex items-center justify-center backdrop-blur-sm group-hover:border-primary/70 group-hover:scale-110 transition-all duration-300">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2">Engajamento</span>
            </div>

            {/* Monetização - Center */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 z-10 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-primary/40 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-primary/10 border-2 border-primary/60 flex items-center justify-center backdrop-blur-sm group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Monetização</span>
            </div>

            {/* Retenção - Top Right */}
            <div
              className={`absolute top-[2%] right-[5%] sm:right-[8%] flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-primary/30 rounded-lg sm:rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-background border border-primary/40 flex items-center justify-center backdrop-blur-sm group-hover:border-primary/70 group-hover:scale-110 transition-all duration-300">
                  <Magnet className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2">Retenção</span>
            </div>

            {/* Aquisição - Bottom Left */}
            <div
              className={`absolute bottom-[2%] left-[5%] sm:left-[8%] flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-primary/30 rounded-lg sm:rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-background border border-primary/40 flex items-center justify-center backdrop-blur-sm group-hover:border-primary/70 group-hover:scale-110 transition-all duration-300">
                  <Handshake className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2">Aquisição</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCycle;
