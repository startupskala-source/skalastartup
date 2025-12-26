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
    },
    { 
      id: "monetizacao", 
      label: "Monetização", 
      Icon: TrendingUp,
    },
    { 
      id: "retencao", 
      label: "Retenção", 
      Icon: Magnet,
    },
    { 
      id: "aquisicao", 
      label: "Aquisição", 
      Icon: Handshake,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ciclo de <span className="text-primary">Crescimento</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nossa estratégia integrada para impulsionar seu negócio
          </p>
        </div>

        {/* Desktop Layout - Infinity Loop */}
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-[800px] h-[450px]">
            {/* Animated SVG Paths */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 450"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gradient for the lines */}
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                </linearGradient>
                
                {/* Glow filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Animated dash */}
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Left Loop - Base */}
              <path
                d={`M 400 225 
                   C 400 100, 220 30, 120 120
                   C 20 210, 20 320, 120 380
                   C 220 440, 400 350, 400 225`}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                className={`transition-all duration-1500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '1200',
                  strokeDashoffset: isVisible ? '0' : '1200',
                  transition: 'stroke-dashoffset 2s ease-out, opacity 0.5s'
                }}
              />

              {/* Right Loop - Base */}
              <path
                d={`M 400 225 
                   C 400 100, 580 30, 680 120
                   C 780 210, 780 320, 680 380
                   C 580 440, 400 350, 400 225`}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                className={`transition-all duration-1500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '1200',
                  strokeDashoffset: isVisible ? '0' : '1200',
                  transition: 'stroke-dashoffset 2s ease-out 0.3s, opacity 0.5s'
                }}
              />

              {/* Animated flowing dots - Left Loop */}
              <circle r="4" fill="hsl(var(--primary))" filter="url(#glow)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path={`M 400 225 
                   C 400 100, 220 30, 120 120
                   C 20 210, 20 320, 120 380
                   C 220 440, 400 350, 400 225`}
                />
              </circle>

              {/* Animated flowing dots - Right Loop */}
              <circle r="4" fill="hsl(var(--primary))" filter="url(#glow)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  begin="2s"
                  path={`M 400 225 
                   C 400 100, 580 30, 680 120
                   C 780 210, 780 320, 680 380
                   C 580 440, 400 350, 400 225`}
                />
              </circle>

              {/* Direction arrows on paths */}
              {/* Top Left Arrow */}
              <g className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1s' }}>
                <polygon
                  points="175,70 185,85 165,85"
                  fill="hsl(var(--primary))"
                  fillOpacity="0.8"
                />
              </g>
              
              {/* Bottom Left Arrow */}
              <g className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.2s' }}>
                <polygon
                  points="280,400 265,390 265,410"
                  fill="hsl(var(--primary))"
                  fillOpacity="0.8"
                />
              </g>

              {/* Top Right Arrow */}
              <g className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.4s' }}>
                <polygon
                  points="625,70 615,85 635,85"
                  fill="hsl(var(--primary))"
                  fillOpacity="0.8"
                />
              </g>

              {/* Bottom Right Arrow */}
              <g className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1.6s' }}>
                <polygon
                  points="520,400 535,390 535,410"
                  fill="hsl(var(--primary))"
                  fillOpacity="0.8"
                />
              </g>
            </svg>

            {/* Engajamento - Top Left */}
            <div
              className={`absolute top-6 left-8 flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative w-16 h-16 rounded-xl bg-background border border-primary/30 flex items-center justify-center mb-3 backdrop-blur-sm group-hover:border-primary/60 transition-all duration-300 group-hover:scale-110">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold text-sm tracking-wide">Engajamento</span>
              <span className="text-muted-foreground text-xs mt-1">Conecte-se</span>
            </div>

            {/* Monetização - Center */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 z-10 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/40 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
                <div className="relative w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/50 flex items-center justify-center mb-3 backdrop-blur-sm group-hover:border-primary transition-all duration-300 group-hover:scale-110">
                  <TrendingUp className="w-10 h-10 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold tracking-wide">Monetização</span>
              <span className="text-muted-foreground text-xs mt-1">Resultados</span>
            </div>

            {/* Retenção - Top Right */}
            <div
              className={`absolute top-6 right-8 flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative w-16 h-16 rounded-xl bg-background border border-primary/30 flex items-center justify-center mb-3 backdrop-blur-sm group-hover:border-primary/60 transition-all duration-300 group-hover:scale-110">
                  <Magnet className="w-8 h-8 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold text-sm tracking-wide">Retenção</span>
              <span className="text-muted-foreground text-xs mt-1">Fidelize</span>
            </div>

            {/* Aquisição - Bottom Left */}
            <div
              className={`absolute bottom-10 left-8 flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative w-16 h-16 rounded-xl bg-background border border-primary/30 flex items-center justify-center mb-3 backdrop-blur-sm group-hover:border-primary/60 transition-all duration-300 group-hover:scale-110">
                  <Handshake className="w-8 h-8 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold text-sm tracking-wide">Aquisição</span>
              <span className="text-muted-foreground text-xs mt-1">Conquiste</span>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Infinity Loop like Desktop */}
        <div className="md:hidden">
          <div className="relative w-full h-[320px]">
            {/* SVG Infinity Path */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 320 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mobileLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                </linearGradient>
                <filter id="mobileGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Left Loop */}
              <path
                d={`M 160 140 
                   C 160 70, 80 30, 50 70
                   C 20 110, 20 190, 50 220
                   C 80 250, 160 210, 160 140`}
                stroke="url(#mobileLineGradient)"
                strokeWidth="1.5"
                fill="none"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '600',
                  strokeDashoffset: isVisible ? '0' : '600',
                  transition: 'stroke-dashoffset 1.5s ease-out, opacity 0.5s'
                }}
              />

              {/* Right Loop */}
              <path
                d={`M 160 140 
                   C 160 70, 240 30, 270 70
                   C 300 110, 300 190, 270 220
                   C 240 250, 160 210, 160 140`}
                stroke="url(#mobileLineGradient)"
                strokeWidth="1.5"
                fill="none"
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '600',
                  strokeDashoffset: isVisible ? '0' : '600',
                  transition: 'stroke-dashoffset 1.5s ease-out 0.2s, opacity 0.5s'
                }}
              />

              {/* Animated flowing dot - Left */}
              <circle r="3" fill="hsl(var(--primary))" filter="url(#mobileGlow)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path={`M 160 140 
                   C 160 70, 80 30, 50 70
                   C 20 110, 20 190, 50 220
                   C 80 250, 160 210, 160 140`}
                />
              </circle>

              {/* Animated flowing dot - Right */}
              <circle r="3" fill="hsl(var(--primary))" filter="url(#mobileGlow)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  begin="1.5s"
                  path={`M 160 140 
                   C 160 70, 240 30, 270 70
                   C 300 110, 300 190, 270 220
                   C 240 250, 160 210, 160 140`}
                />
              </circle>

              {/* Direction arrows */}
              <polygon
                points="75,45 82,55 68,55"
                fill="hsl(var(--primary))"
                fillOpacity="0.7"
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '0.8s' }}
              />
              <polygon
                points="110,245 100,235 100,255"
                fill="hsl(var(--primary))"
                fillOpacity="0.7"
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '1s' }}
              />
              <polygon
                points="245,45 238,55 252,55"
                fill="hsl(var(--primary))"
                fillOpacity="0.7"
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '1.2s' }}
              />
              <polygon
                points="210,245 220,235 220,255"
                fill="hsl(var(--primary))"
                fillOpacity="0.7"
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '1.4s' }}
              />
            </svg>

            {/* Engajamento - Top Left */}
            <div
              className={`absolute top-0 left-2 flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-lg blur-lg" />
                <div className="relative w-10 h-10 rounded-lg bg-background border border-primary/30 flex items-center justify-center mb-1">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold text-[10px]">Engajamento</span>
            </div>

            {/* Monetização - Center */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 z-10 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/40 rounded-xl blur-xl" />
                <div className="relative w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary/50 flex items-center justify-center mb-1">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold text-xs">Monetização</span>
            </div>

            {/* Retenção - Top Right */}
            <div
              className={`absolute top-0 right-2 flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-lg blur-lg" />
                <div className="relative w-10 h-10 rounded-lg bg-background border border-primary/30 flex items-center justify-center mb-1">
                  <Magnet className="w-5 h-5 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold text-[10px]">Retenção</span>
            </div>

            {/* Aquisição - Bottom Left */}
            <div
              className={`absolute bottom-2 left-2 flex flex-col items-center transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-lg blur-lg" />
                <div className="relative w-10 h-10 rounded-lg bg-background border border-primary/30 flex items-center justify-center mb-1">
                  <Handshake className="w-5 h-5 text-primary" />
                </div>
              </div>
              <span className="text-foreground font-bold text-[10px]">Aquisição</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCycle;
