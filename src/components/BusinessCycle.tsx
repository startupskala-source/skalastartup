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
              viewBox="0 0 400 320"
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
                d="M 200 130 C 200 60, 100 25, 55 70 C 10 115, 10 175, 55 215 C 100 255, 200 200, 200 130"
                stroke="hsl(var(--foreground))"
                strokeOpacity="0.3"
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
                stroke="hsl(var(--foreground))"
                strokeOpacity="0.3"
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
              <circle r="3" fill="hsl(var(--foreground))" filter="url(#softGlow)">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M 200 130 C 200 60, 100 25, 55 70 C 10 115, 10 175, 55 215 C 100 255, 200 200, 200 130"
                />
              </circle>

              {/* Animated dot - Right */}
              <circle r="3" fill="hsl(var(--foreground))" filter="url(#softGlow)">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  begin="2.5s"
                  path="M 200 130 C 200 60, 300 25, 345 70 C 390 115, 390 175, 345 215 C 300 255, 200 200, 200 130"
                />
              </circle>

              {/* Engajamento - Top Left (MessageCircle icon) */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '400ms' }}
              >
                <rect x="30" y="28" width="40" height="40" rx="10" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeOpacity="0.3" strokeWidth="1.5" />
                <g transform="translate(50, 48)">
                  {/* MessageCircle */}
                  <path d="M-8 -2 C-8 -6, -5 -8, 0 -8 C5 -8, 8 -6, 8 -2 C8 2, 5 4, 0 4 C-1 4, -2 4, -3 3.5 L-6 6 L-5 3 C-7 2, -8 0, -8 -2 Z" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <text x="50" y="85" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="600">Engajamento</text>
              </g>

              {/* Monetização - Center (TrendingUp icon) */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '600ms' }}
              >
                <rect x="175" y="100" width="50" height="50" rx="12" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeOpacity="0.4" strokeWidth="2" />
                <g transform="translate(200, 125)">
                  {/* DollarSign */}
                  <line x1="0" y1="-10" x2="0" y2="10" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M-5 -4 C-5 -6, -2 -7, 0 -7 C2 -7, 5 -6, 5 -4 C5 -2, 2 -1, 0 0 C-2 1, -5 2, -5 4 C-5 6, -2 7, 0 7 C2 7, 5 6, 5 4" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" />
                </g>
                <text x="200" y="168" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">Monetização</text>
              </g>

              {/* Retenção - Top Right (Heart icon) */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '800ms' }}
              >
                <rect x="330" y="28" width="40" height="40" rx="10" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeOpacity="0.3" strokeWidth="1.5" />
                <g transform="translate(350, 48)">
                  {/* Heart */}
                  <path d="M0 -2 C-2 -6, -8 -6, -8 -1 C-8 3, 0 8, 0 8 C0 8, 8 3, 8 -1 C8 -6, 2 -6, 0 -2 Z" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <text x="350" y="85" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="600">Retenção</text>
              </g>

              {/* Aquisição - Bottom Left (Users icon) */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '1000ms' }}
              >
                <rect x="30" y="193" width="40" height="40" rx="10" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeOpacity="0.3" strokeWidth="1.5" />
                <g transform="translate(50, 213)">
                  {/* Users */}
                  <circle cx="-3" cy="-4" r="3" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                  <path d="M-9 6 C-9 2, -6 0, -3 0 C0 0, 3 2, 3 6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="5" cy="-3" r="2.5" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                  <path d="M3 6 C3 3, 5 1, 7 1" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" />
                </g>
                <text x="50" y="250" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="600">Aquisição</text>
              </g>

              {/* Conversão - Bottom Right (Target icon) */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '1200ms' }}
              >
                <rect x="330" y="193" width="40" height="40" rx="10" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeOpacity="0.3" strokeWidth="1.5" />
                <g transform="translate(350, 213)">
                  {/* Target */}
                  <circle cx="0" cy="0" r="7" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="4" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="1.5" fill="hsl(var(--foreground))" />
                </g>
                <text x="350" y="250" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="600">Conversão</text>
              </g>

            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCycle;
