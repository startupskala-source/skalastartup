import { useEffect, useRef, useState } from "react";

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

        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[460px] lg:max-w-[540px]">
            
            <svg
              className="w-full h-auto"
              viewBox="0 0 400 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#ef4444" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6" />
                </linearGradient>

                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Left Loop */}
              <path
                d="M 200 130 C 200 60, 100 25, 55 70 C 10 115, 10 175, 55 215 C 100 255, 200 200, 200 130"
                stroke="url(#loopGradient)"
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
                d="M 200 130 C 200 60, 300 25, 345 70 C 390 115, 390 175, 345 215 C 300 255, 200 200, 200 130"
                stroke="url(#loopGradient)"
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
              <circle r="4" fill="#ef4444" filter="url(#softGlow)">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M 200 130 C 200 60, 100 25, 55 70 C 10 115, 10 175, 55 215 C 100 255, 200 200, 200 130"
                />
              </circle>

              {/* Animated dot - Right */}
              <circle r="4" fill="#ef4444" filter="url(#softGlow)">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  begin="2.5s"
                  path="M 200 130 C 200 60, 300 25, 345 70 C 390 115, 390 175, 345 215 C 300 255, 200 200, 200 130"
                />
              </circle>

              {/* Arrows */}
              <g className={`transition-opacity duration-700 ${isVisible ? 'opacity-50' : 'opacity-0'}`} style={{ transitionDelay: '1.2s' }}>
                <polygon points="85,40 92,52 78,52" fill="#ef4444" />
                <polygon points="115,235 105,223 105,247" fill="#ef4444" />
                <polygon points="315,40 308,52 322,52" fill="#ef4444" />
                <polygon points="285,235 295,223 295,247" fill="#ef4444" />
              </g>

              {/* Engajamento - Top Left */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '400ms' }}
              >
                <rect x="30" y="28" width="40" height="40" rx="10" fill="hsl(var(--background))" stroke="#ef4444" strokeOpacity="0.4" strokeWidth="1.5" />
                <g transform="translate(50, 48)">
                  <path d="M-8 -3 C-8 -7, -5 -9, 0 -9 C5 -9, 8 -7, 8 -3 C8 1, 5 3, 0 3 L-3 7 L-3 3 C-6 2, -8 0, -8 -3" fill="#ef4444" />
                </g>
                <text x="50" y="85" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="600">Engajamento</text>
              </g>

              {/* Monetização - Center */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '600ms' }}
              >
                <rect x="175" y="100" width="50" height="50" rx="12" fill="hsl(var(--background))" stroke="#ef4444" strokeOpacity="0.6" strokeWidth="2" />
                <g transform="translate(200, 125)">
                  <path d="M-10 8 L-4 0 L2 5 L10 -8" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 -8 L10 -8 L10 -3" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <text x="200" y="168" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">Monetização</text>
              </g>

              {/* Retenção - Top Right */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '800ms' }}
              >
                <rect x="330" y="28" width="40" height="40" rx="10" fill="hsl(var(--background))" stroke="#ef4444" strokeOpacity="0.4" strokeWidth="1.5" />
                <g transform="translate(350, 48)">
                  <path d="M-6 -6 L-6 2 C-6 7, 0 10, 0 10 C0 10, 6 7, 6 2 L6 -6" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                  <rect x="-8" y="-9" width="5" height="5" rx="1" fill="#ef4444" />
                  <rect x="3" y="-9" width="5" height="5" rx="1" fill="#ef4444" />
                </g>
                <text x="350" y="85" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="600">Retenção</text>
              </g>

              {/* Aquisição - Bottom Left */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '1000ms' }}
              >
                <rect x="30" y="193" width="40" height="40" rx="10" fill="hsl(var(--background))" stroke="#ef4444" strokeOpacity="0.4" strokeWidth="1.5" />
                <g transform="translate(50, 213)">
                  <path d="M-9 0 L-4 -5 L0 0 L4 -5 L9 0" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M-4 -5 C-4 -5, -1 -8, 0 -8 C1 -8, 4 -5, 4 -5" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                </g>
                <text x="50" y="250" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="600">Aquisição</text>
              </g>

            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCycle;
