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
          <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[500px] lg:max-w-[600px]">
            
            {/* SVG with everything inside */}
            <svg
              className="w-full h-auto"
              viewBox="0 0 400 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gradient for the lines */}
                <linearGradient id="cycleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
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

                {/* Icon background filter */}
                <filter id="iconGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Left Loop Path */}
              <path
                d="M 200 140 C 200 65, 95 25, 50 75 C 5 125, 5 195, 50 235 C 95 275, 200 215, 200 140"
                stroke="url(#cycleGradient)"
                strokeWidth="2"
                fill="none"
                className={`transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '700',
                  strokeDashoffset: isVisible ? '0' : '700',
                  transition: 'stroke-dashoffset 1.8s ease-out, opacity 0.5s'
                }}
              />

              {/* Right Loop Path */}
              <path
                d="M 200 140 C 200 65, 305 25, 350 75 C 395 125, 395 195, 350 235 C 305 275, 200 215, 200 140"
                stroke="url(#cycleGradient)"
                strokeWidth="2"
                fill="none"
                className={`transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '700',
                  strokeDashoffset: isVisible ? '0' : '700',
                  transition: 'stroke-dashoffset 1.8s ease-out 0.2s, opacity 0.5s'
                }}
              />

              {/* Animated dot - Left Loop */}
              <circle r="5" fill="hsl(var(--primary))" filter="url(#cycleGlow)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M 200 140 C 200 65, 95 25, 50 75 C 5 125, 5 195, 50 235 C 95 275, 200 215, 200 140"
                />
              </circle>

              {/* Animated dot - Right Loop */}
              <circle r="5" fill="hsl(var(--primary))" filter="url(#cycleGlow)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  begin="2s"
                  path="M 200 140 C 200 65, 305 25, 350 75 C 395 125, 395 195, 350 235 C 305 275, 200 215, 200 140"
                />
              </circle>

              {/* Direction arrows */}
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1s' }}>
                <polygon points="82,42 90,56 74,56" fill="hsl(var(--primary))" fillOpacity="0.7" />
              </g>
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.2s' }}>
                <polygon points="115,255 103,243 103,267" fill="hsl(var(--primary))" fillOpacity="0.7" />
              </g>
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.4s' }}>
                <polygon points="318,42 310,56 326,56" fill="hsl(var(--primary))" fillOpacity="0.7" />
              </g>
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.6s' }}>
                <polygon points="285,255 297,243 297,267" fill="hsl(var(--primary))" fillOpacity="0.7" />
              </g>

              {/* Engajamento - Top Left */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '400ms' }}
              >
                <circle cx="50" cy="55" r="25" fill="hsl(var(--primary))" fillOpacity="0.15" filter="url(#iconGlow)" />
                <rect x="28" y="33" width="44" height="44" rx="10" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="1.5" />
                <g transform="translate(50, 55)">
                  <path d="M-10 -6 C-10 -10, -6 -12, 0 -12 C6 -12, 10 -10, 10 -6 C10 -2, 6 2, 0 6 C-6 2, -10 -2, -10 -6" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="-4" cy="-5" r="1" fill="hsl(var(--primary))" />
                  <circle cx="4" cy="-5" r="1" fill="hsl(var(--primary))" />
                  <path d="M-3 0 Q0 3, 3 0" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" />
                </g>
                <text x="50" y="95" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">Engajamento</text>
              </g>

              {/* Monetização - Center */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0'}`}
                style={{ transitionDelay: '600ms', transformOrigin: '200px 140px' }}
              >
                <circle cx="200" cy="125" r="32" fill="hsl(var(--primary))" fillOpacity="0.2" filter="url(#iconGlow)" />
                <rect x="172" y="97" width="56" height="56" rx="14" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeOpacity="0.7" strokeWidth="2" />
                <g transform="translate(200, 125)">
                  <path d="M-12 8 L0 -12 L12 8" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 -12 L0 8" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="0" cy="-16" r="4" fill="hsl(var(--primary))" fillOpacity="0.5" />
                </g>
                <text x="200" y="175" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="13" fontWeight="bold">Monetização</text>
              </g>

              {/* Retenção - Top Right */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '800ms' }}
              >
                <circle cx="350" cy="55" r="25" fill="hsl(var(--primary))" fillOpacity="0.15" filter="url(#iconGlow)" />
                <rect x="328" y="33" width="44" height="44" rx="10" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="1.5" />
                <g transform="translate(350, 55)">
                  <path d="M-8 0 C-8 -8, 0 -12, 0 -12 C0 -12, 8 -8, 8 0 C8 8, 0 10, 0 10 C0 10, -8 8, -8 0" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M0 -12 L0 -6" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M-6 -8 L0 -6 L6 -8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <text x="350" y="95" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">Retenção</text>
              </g>

              {/* Aquisição - Bottom Left */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '1000ms' }}
              >
                <circle cx="50" cy="225" r="25" fill="hsl(var(--primary))" fillOpacity="0.15" filter="url(#iconGlow)" />
                <rect x="28" y="203" width="44" height="44" rx="10" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="1.5" />
                <g transform="translate(50, 225)">
                  <path d="M-10 0 C-10 -3, -7 -5, -4 -5 L-2 -5 C0 -5, 0 -3, 0 0 C0 -3, 0 -5, 2 -5 L4 -5 C7 -5, 10 -3, 10 0 C10 5, 0 10, 0 10 C0 10, -10 5, -10 0" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
                </g>
                <text x="50" y="265" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">Aquisição</text>
              </g>

            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCycle;
