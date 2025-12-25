import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedText, AnimatedLetters } from "@/components/AnimatedText";
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
import { AreaChart } from "@/components/AreaChart";
import { ArrowRight } from "lucide-react";
import consultantAvatar from "@/assets/consultant-avatar.jpg";

const Index = () => {
  const [lineVisible, setLineVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

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

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-24">
        <div className="container mx-auto max-w-5xl text-center">
          {/* Decorative line */}
          <div
            className={`mx-auto w-px h-24 bg-border mb-12 transition-all duration-1000 origin-top ${
              lineVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
          />

          {/* Main headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            <AnimatedLetters text="Automatize." delay={200} />
            <br />
            <span className="text-muted-foreground">
              <AnimatedLetters text="Simplifique." delay={600} />
            </span>
            <br />
            <AnimatedLetters text="Escale." delay={1000} />
          </h1>

          {/* Subheadline */}
          <div
            className={`transition-all duration-700 delay-[1400ms] ${
              ctaVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Transformamos a presença digital do seu negócio com automações inteligentes para cardápios, atendimento e vendas online.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-[1600ms] ${
              ctaVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#contato">
                Começar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="minimal" size="xl" asChild>
              <a href="#servicos">Ver serviços</a>
            </Button>
          </div>

          {/* Bottom decorative line */}
          <div
            className={`mx-auto w-px h-32 bg-gradient-to-b from-border to-transparent mt-24 transition-all duration-1000 origin-top delay-[1800ms] ${
              ctaVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 md:py-32 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 md:mb-24">
            <p className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4">
              Nossos Serviços
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Soluções que <br />
              <span className="text-muted-foreground">impulsionam resultados</span>
            </h2>
          </div>

          <div className="space-y-0">
            {services.map((service, index) => (
              <ServiceCard
                key={service.number}
                number={service.number}
                title={service.title}
                description={service.description}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <Portfolio />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Stats Section */}
      <Stats />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <section id="contato" className="py-24 md:py-32 px-6 md:px-12 bg-secondary">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-6">
              Pronto para começar?
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              Vamos construir o futuro<br />
              <span className="text-muted-foreground">do seu negócio</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Entre em contato e descubra como podemos transformar sua operação com automação inteligente.
            </p>
          </div>

          <MultiStepForm />
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12">
            <p className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4">
              Resultados
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Crescimento dos nossos<br />
              <span className="text-muted-foreground">clientes</span>
            </h2>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <AreaChart 
              title="Crescimento"
              height={400}
            />
          </div>
        </div>
      </section>

      {/* Rating Section */}
      <RatingSection />

      <Footer />
      <FloatingConsultButton
        buttonSize={100}
        imageSize={60}
        imageSrc={consultantAvatar}
        imageAlt="Consultor SKALA"
        revolvingText="FALE CONOSCO - CONSULTORIA - "
        popupHeading="Consultoria Gratuita"
        popupDescription="Uma conversa rápida e gratuita com nossa equipe para discutir seu projeto e entender como podemos ajudar."
        popupBadgeText="Grátis"
        ctaButtonText="Agendar conversa"
        ctaButtonAction={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
        position={{ bottom: "1.5rem", right: "1.5rem" }}
      />
    </main>
  );
};

export default Index;
