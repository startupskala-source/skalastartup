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
              viewBox="0 0 400 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Animated gradient for left loop */}
                <linearGradient id="leftLoopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9">
                    <animate attributeName="stopColor" values="#ef4444;#f97316;#ef4444" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.4">
                    <animate attributeName="stopColor" values="#f97316;#ef4444;#f97316" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9">
                    <animate attributeName="stopColor" values="#ef4444;#f97316;#ef4444" dur="3s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>

                {/* Animated gradient for right loop */}
                <linearGradient id="rightLoopGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.9">
                    <animate attributeName="stopColor" values="#f97316;#ef4444;#f97316" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="50%" stopColor="#ef4444" stopOpacity="0.4">
                    <animate attributeName="stopColor" values="#ef4444;#f97316;#ef4444" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.9">
                    <animate attributeName="stopColor" values="#f97316;#ef4444;#f97316" dur="3s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>

                {/* Center icon gradient */}
                <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>

                {/* Radial glow for center */}
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#ef4444" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>

                {/* Glow filter */}
                <filter id="cycleGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Strong glow filter */}
                <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Icon glow filter */}
                <filter id="iconGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ef4444" floodOpacity="0.5"/>
                </filter>

                {/* Pulse animation filter */}
                <filter id="pulseFilter" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Background glow effect */}
              <ellipse 
                cx="200" cy="140" rx="180" ry="120" 
                fill="url(#centerGlow)" 
                className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Left Loop Path - with gradient */}
              <path
                d="M 200 140 C 200 65, 95 25, 50 75 C 5 125, 5 195, 50 235 C 95 275, 200 215, 200 140"
                stroke="url(#leftLoopGradient)"
                strokeWidth="2.5"
                fill="none"
                className={`transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '700',
                  strokeDashoffset: isVisible ? '0' : '700',
                  transition: 'stroke-dashoffset 1.8s ease-out, opacity 0.5s'
                }}
              />

              {/* Right Loop Path - with gradient */}
              <path
                d="M 200 140 C 200 65, 305 25, 350 75 C 395 125, 395 195, 350 235 C 305 275, 200 215, 200 140"
                stroke="url(#rightLoopGradient)"
                strokeWidth="2.5"
                fill="none"
                className={`transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '700',
                  strokeDashoffset: isVisible ? '0' : '700',
                  transition: 'stroke-dashoffset 1.8s ease-out 0.2s, opacity 0.5s'
                }}
              />

              {/* Animated dot - Left Loop */}
              <circle r="6" fill="#ef4444" filter="url(#strongGlow)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M 200 140 C 200 65, 95 25, 50 75 C 5 125, 5 195, 50 235 C 95 275, 200 215, 200 140"
                />
                <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite" />
              </circle>

              {/* Animated dot - Right Loop */}
              <circle r="6" fill="#f97316" filter="url(#strongGlow)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  begin="2s"
                  path="M 200 140 C 200 65, 305 25, 350 75 C 395 125, 395 195, 350 235 C 305 275, 200 215, 200 140"
                />
                <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite" />
              </circle>

              {/* Direction arrows with colors */}
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1s' }}>
                <polygon points="82,42 90,56 74,56" fill="#ef4444" fillOpacity="0.9" />
              </g>
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.2s' }}>
                <polygon points="115,255 103,243 103,267" fill="#f97316" fillOpacity="0.9" />
              </g>
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.4s' }}>
                <polygon points="318,42 310,56 326,56" fill="#f97316" fillOpacity="0.9" />
              </g>
              <g className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.6s' }}>
                <polygon points="285,255 297,243 297,267" fill="#ef4444" fillOpacity="0.9" />
              </g>

              {/* Engajamento - Top Left */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '400ms' }}
              >
                {/* Glow circle */}
                <circle cx="50" cy="55" r="30" fill="#ef4444" fillOpacity="0.15" filter="url(#cycleGlow)" />
                
                {/* Icon box with gradient border */}
                <rect x="26" y="31" width="48" height="48" rx="12" fill="hsl(var(--background))" />
                <rect x="26" y="31" width="48" height="48" rx="12" fill="none" stroke="url(#centerGradient)" strokeWidth="2" />
                
                {/* Icon - Chat bubble */}
                <g transform="translate(50, 55)" filter="url(#iconGlow)">
                  <path 
                    d="M-10 -4 C-10 -9, -6 -12, 0 -12 C6 -12, 10 -9, 10 -4 C10 1, 6 4, 0 4 L-4 10 L-4 4 C-8 3, -10 0, -10 -4" 
                    fill="#ef4444" 
                  />
                </g>
                
                <text x="50" y="98" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">Engajamento</text>
              </g>

              {/* Monetização - Center */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0'}`}
                style={{ transitionDelay: '600ms', transformOrigin: '200px 125px' }}
              >
                {/* Large glow */}
                <circle cx="200" cy="125" r="45" fill="url(#centerGlow)" />
                
                {/* Icon box with gradient */}
                <rect x="168" y="93" width="64" height="64" rx="16" fill="hsl(var(--background))" />
                <rect x="168" y="93" width="64" height="64" rx="16" fill="url(#centerGradient)" fillOpacity="0.15" />
                <rect x="168" y="93" width="64" height="64" rx="16" fill="none" stroke="url(#centerGradient)" strokeWidth="2.5" />
                
                {/* Icon - Trending up with dollar */}
                <g transform="translate(200, 125)" filter="url(#iconGlow)">
                  <path 
                    d="M-14 10 L-6 0 L2 6 L14 -10" 
                    fill="none" 
                    stroke="url(#centerGradient)" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M8 -10 L14 -10 L14 -4" 
                    fill="none" 
                    stroke="url(#centerGradient)" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <circle cx="14" cy="-10" r="5" fill="#ef4444" fillOpacity="0.3" />
                </g>
                
                <text x="200" y="178" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="bold">Monetização</text>
              </g>

              {/* Retenção - Top Right */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '800ms' }}
              >
                {/* Glow circle */}
                <circle cx="350" cy="55" r="30" fill="#f97316" fillOpacity="0.15" filter="url(#cycleGlow)" />
                
                {/* Icon box */}
                <rect x="326" y="31" width="48" height="48" rx="12" fill="hsl(var(--background))" />
                <rect x="326" y="31" width="48" height="48" rx="12" fill="none" stroke="url(#centerGradient)" strokeWidth="2" />
                
                {/* Icon - Magnet */}
                <g transform="translate(350, 55)" filter="url(#iconGlow)">
                  <path 
                    d="M-8 -8 L-8 4 C-8 10, 0 14, 0 14 C0 14, 8 10, 8 4 L8 -8" 
                    fill="none" 
                    stroke="#f97316" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                  <rect x="-10" y="-12" width="6" height="6" rx="1" fill="#f97316" />
                  <rect x="4" y="-12" width="6" height="6" rx="1" fill="#f97316" />
                </g>
                
                <text x="350" y="98" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">Retenção</text>
              </g>

              {/* Aquisição - Bottom Left */}
              <g 
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '1000ms' }}
              >
                {/* Glow circle */}
                <circle cx="50" cy="225" r="30" fill="#f97316" fillOpacity="0.15" filter="url(#cycleGlow)" />
                
                {/* Icon box */}
                <rect x="26" y="201" width="48" height="48" rx="12" fill="hsl(var(--background))" />
                <rect x="26" y="201" width="48" height="48" rx="12" fill="none" stroke="url(#centerGradient)" strokeWidth="2" />
                
                {/* Icon - Handshake */}
                <g transform="translate(50, 225)" filter="url(#iconGlow)">
                  <path 
                    d="M-12 0 L-6 -6 L0 0 L6 -6 L12 0" 
                    fill="none" 
                    stroke="#f97316" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M-6 -6 C-6 -6, -2 -10, 0 -10 C2 -10, 6 -6, 6 -6" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                  <circle cx="-8" cy="4" r="3" fill="#f97316" fillOpacity="0.5" />
                  <circle cx="8" cy="4" r="3" fill="#ef4444" fillOpacity="0.5" />
                </g>
                
                <text x="50" y="268" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="bold">Aquisição</text>
              </g>

              {/* Decorative particles */}
              <g className={`transition-opacity duration-1000 ${isVisible ? 'opacity-60' : 'opacity-0'}`}>
                <circle cx="120" cy="60" r="2" fill="#ef4444">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="280" cy="60" r="2" fill="#f97316">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="100" cy="200" r="1.5" fill="#f97316">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="300" cy="200" r="1.5" fill="#ef4444">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="60" r="2" fill="#ef4444">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="220" r="2" fill="#f97316">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2.8s" repeatCount="indefinite" />
                </circle>
              </g>

            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCycle;
