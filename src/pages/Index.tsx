import { useEffect, useState } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedLetters } from "@/components/AnimatedText";
import { ServiceCard } from "@/components/ServiceCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { FAQ } from "@/components/FAQ";
import { MultiStepForm } from "@/components/ui/multistep-form";
import { FloatingConsultButton } from "@/components/ui/floating-consult-button";
import { Portfolio } from "@/components/Portfolio";
import { RatingSection } from "@/components/RatingSection";
import Testimonials from "@/components/Testimonials";
import ModulesChart from "@/components/ModulesChart";
import BusinessCycle from "@/components/BusinessCycle";
import { PricingSection } from "@/components/PricingSection";
import { ClientLogos } from "@/components/ClientLogos";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BlogPreview } from "@/components/BlogPreview";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ArrowRight, ChevronDown } from "lucide-react";
import consultantAvatar from "@/assets/consultant-avatar.jpg";

const Index = () => {
  const [lineVisible, setLineVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  
  const { text: typewriterText } = useTypewriter({
    words: ["cardápios digitais", "atendimento 24/7", "vendas online", "marketing inteligente"],
    typeSpeed: 80,
    deleteSpeed: 40,
    delayBetweenWords: 2500,
  });

  useEffect(() => {
    const lineTimer = setTimeout(() => setLineVisible(true), 1200);
    const ctaTimer = setTimeout(() => setCtaVisible(true), 1600);
    return () => {
      clearTimeout(lineTimer);
      clearTimeout(ctaTimer);
    };
  }, []);

  const services = [
    {
      number: "01",
      title: "Cardápio Digital",
      description: "Automatize seu cardápio com QR Code, atualizações em tempo real e integração com seu sistema de pedidos.",
    },
    {
      number: "02",
      title: "Atendimento Inteligente",
      description: "Chatbots e automações que respondem seus clientes 24/7, aumentando conversões e satisfação.",
    },
    {
      number: "03",
      title: "Websites & Lojas Online",
      description: "Sites modernos e lojas virtuais que convertem visitantes em clientes fiéis.",
    },
  ];

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 pt-20 sm:pt-24">
        <div className="container mx-auto max-w-5xl text-center">
          <div className={`mx-auto w-px h-16 sm:h-24 bg-border mb-8 sm:mb-12 transition-all duration-1000 origin-top ${lineVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`} />

          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            <AnimatedLetters text="Automatize." delay={200} />
            <br />
            <span className="text-muted-foreground">
              <AnimatedLetters text="Simplifique." delay={600} />
            </span>
            <br />
            <AnimatedLetters text="Escale." delay={1000} />
          </h1>

          <div className={`transition-all duration-700 delay-[1400ms] ${ctaVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2 leading-relaxed px-2">
              Transformamos a presença digital do seu negócio com
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-8 sm:mb-12 h-8">
              {typewriterText}<span className="animate-pulse">|</span>
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-700 delay-[1600ms] ${ctaVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <ShimmerButton 
              shimmerColor="#000000" 
              background="rgba(255, 255, 255, 1)" 
              className="text-black font-medium text-sm sm:text-base w-full sm:w-auto px-8 md:px-12 py-3 md:py-4"
              onClick={() => {
                const msg = encodeURIComponent("Olá! Quero começar a automatizar meu negócio.");
                window.open(`https://wa.me/5547984682257?text=${msg}`, "_blank");
              }}
            >
              <WhatsAppIcon className="h-5 w-5 mr-2" animate={false} />
              Começar agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </ShimmerButton>
            <button 
              onClick={scrollToPortfolio}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base py-3"
            >
              Ver portfólio
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className={`mx-auto w-px h-20 sm:h-32 bg-gradient-to-b from-border to-transparent mt-16 sm:mt-24 transition-all duration-1000 origin-top delay-[1800ms] ${ctaVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`} />
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* Services Section */}
      <section id="servicos" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 sm:mb-16 md:mb-24">
            <p className="font-display text-xs sm:text-sm tracking-widest text-muted-foreground uppercase mb-3 sm:mb-4">
              Nossos Serviços
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
              Soluções que <br />
              <span className="text-muted-foreground">impulsionam resultados</span>
            </h2>
          </div>

          <div className="space-y-0">
            {services.map((service, index) => (
              <ServiceCard key={service.number} number={service.number} title={service.title} description={service.description} delay={index * 200} />
            ))}
          </div>
        </div>
      </section>

      <Portfolio />
      <HowItWorks />
      <Stats />
      <ModulesChart />
      <BusinessCycle />
      <PricingSection />
      <FAQ />
      <Testimonials />
      <BlogPreview />

      {/* Contact Section */}
      <section id="contato" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-secondary">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <p className="font-display text-xs sm:text-sm tracking-widest text-muted-foreground uppercase mb-4 sm:mb-6">
              Pronto para começar?
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8 px-2">
              Vamos construir o futuro<br />
              <span className="text-muted-foreground">do seu negócio</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto px-2">
              Entre em contato e descubra como podemos transformar sua operação com automação inteligente.
            </p>
          </div>
          <MultiStepForm />
        </div>
      </section>

      <RatingSection />
      <Footer />
      <ScrollToTop />
      <FloatingConsultButton 
        buttonSize={100} 
        imageSize={60} 
        imageSrc={consultantAvatar} 
        imageAlt="Consultor SKALA" 
        revolvingText="FALE CONOSCO - CONSULTORIA - " 
        popupHeading="Consultoria Gratuita" 
        popupDescription="Uma conversa rápida e gratuita com nossa equipe para discutir seu projeto." 
        popupBadgeText="Grátis" 
        ctaButtonText="Agendar conversa" 
        ctaButtonAction={() => {
          const msg = encodeURIComponent("Olá! Gostaria de agendar uma consultoria gratuita.");
          window.open(`https://wa.me/5547984682257?text=${msg}`, "_blank");
        }} 
        position={{ bottom: "1.5rem", right: "1.5rem" }} 
      />
    </main>
  );
};

export default Index;
