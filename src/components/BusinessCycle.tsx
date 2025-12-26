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

        {/* Unified Responsive Layout */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[500px] lg:max-w-[600px]">
            
            {/* SVG with everything inside */}
            <svg
              className="w-full h-auto"
              viewBox="0 0 400 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left Loop Path */}
              <path
                d="M 200 160 C 200 85, 95 45, 50 95 C 5 145, 5 215, 50 255 C 95 295, 200 235, 200 160"
                stroke="hsl(var(--foreground))"
                strokeWidth="2"
                strokeOpacity="0.3"
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
                d="M 200 160 C 200 85, 305 45, 350 95 C 395 145, 395 215, 350 255 C 305 295, 200 235, 200 160"
                stroke="hsl(var(--foreground))"
                strokeWidth="2"
                strokeOpacity="0.3"
                fill="none"
                className={`transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '700',
                  strokeDashoffset: isVisible ? '0' : '700',
                  transition: 'stroke-dashoffset 1.8s ease-out 0.2s, opacity 0.5s'
                }}
              />

              {/* Animated dot - Left Loop */}
              <circle r="4" fill="hsl(var(--primary))">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M 200 160 C 200 85, 95 45, 50 95 C 5 145, 5 215, 50 255 C 95 295, 200 235, 200 160"
                />
              </circle>

              {/* Animated dot - Right Loop */}
              <circle r="4" fill="hsl(var(--primary))">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  begin="2s"
                  path="M 200 160 C 200 85, 305 45, 350 95 C 395 145, 395 215, 350 255 C 305 295, 200 235, 200 160"
                />
              </circle>

              {/* Direction arrows */}
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1s' }}>
                <polygon points="82,62 90,76 74,76" fill="hsl(var(--foreground))" fillOpacity="0.5" />
              </g>
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.2s' }}>
                <polygon points="115,275 103,263 103,287" fill="hsl(var(--foreground))" fillOpacity="0.5" />
              </g>
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.4s' }}>
                <polygon points="318,62 310,76 326,76" fill="hsl(var(--foreground))" fillOpacity="0.5" />
              </g>
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.6s' }}>
                <polygon points="285,275 297,263 297,287" fill="hsl(var(--foreground))" fillOpacity="0.5" />
              </g>

              {/* Engajamento - Top Left */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '400ms' }}
              >
                <rect x="26" y="51" width="48" height="48" rx="12" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeOpacity="0.3" />
                
                {/* Icon - Chat bubble */}
                <g transform="translate(50, 75)">
                  <path 
                    d="M-10 -4 C-10 -9, -6 -12, 0 -12 C6 -12, 10 -9, 10 -4 C10 1, 6 4, 0 4 L-4 10 L-4 4 C-8 3, -10 0, -10 -4" 
                    fill="hsl(var(--foreground))" 
                  />
                </g>
                
                <text x="50" y="118" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">Engajamento</text>
              </g>

              {/* Monetização - Center */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0'}`}
                style={{ transitionDelay: '600ms', transformOrigin: '200px 145px' }}
              >
                <rect x="168" y="113" width="64" height="64" rx="16" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
                
                {/* Icon - Trending up */}
                <g transform="translate(200, 145)">
                  <path 
                    d="M-14 10 L-6 0 L2 6 L14 -10" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M8 -10 L14 -10 L14 -4" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </g>
                
                <text x="200" y="198" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="bold">Monetização</text>
              </g>

              {/* Retenção - Top Right */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '800ms' }}
              >
                <rect x="326" y="51" width="48" height="48" rx="12" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeOpacity="0.3" />
                
                {/* Icon - Magnet */}
                <g transform="translate(350, 75)">
                  <path 
                    d="M-8 -8 L-8 4 C-8 10, 0 14, 0 14 C0 14, 8 10, 8 4 L8 -8" 
                    fill="none" 
                    stroke="hsl(var(--foreground))" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                  <rect x="-10" y="-12" width="6" height="6" rx="1" fill="hsl(var(--foreground))" />
                  <rect x="4" y="-12" width="6" height="6" rx="1" fill="hsl(var(--foreground))" />
                </g>
                
                <text x="350" y="118" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">Retenção</text>
              </g>

              {/* Aquisição - Bottom Left */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '1000ms' }}
              >
                <rect x="26" y="221" width="48" height="48" rx="12" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeOpacity="0.3" />
                
                {/* Icon - Handshake / Users */}
                <g transform="translate(50, 245)">
                  <circle cx="-6" cy="-6" r="4" fill="hsl(var(--foreground))" />
                  <circle cx="6" cy="-6" r="4" fill="hsl(var(--foreground))" />
                  <path 
                    d="M-12 6 C-12 2, -9 -1, -6 -1 C-3 -1, 0 0, 0 0 C0 0, 3 -1, 6 -1 C9 -1, 12 2, 12 6" 
                    fill="hsl(var(--foreground))"
                  />
                </g>
                
                <text x="50" y="288" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">Aquisição</text>
              </g>

              {/* Conversão - Bottom Right (5th element) */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '1200ms' }}
              >
                <rect x="326" y="221" width="48" height="48" rx="12" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeOpacity="0.3" />
                
                {/* Icon - Target/Bullseye */}
                <g transform="translate(350, 245)">
                  <circle cx="0" cy="0" r="10" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
                  <circle cx="0" cy="0" r="6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
                  <circle cx="0" cy="0" r="2" fill="hsl(var(--foreground))" />
                </g>
                
                <text x="350" y="288" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">Conversão</text>
              </g>

            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCycle;
