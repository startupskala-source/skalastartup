import { useParams, Link } from "react-router-dom";
import { getProjectById } from "@/data/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || "");

  if (!project) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto max-w-5xl px-6 md:px-12 py-32 text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Projeto não encontrado</h1>
          <p className="text-muted-foreground mb-8">O projeto que você está procurando não existe.</p>
          <Button variant="hero" asChild>
            <Link to="/#portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao portfólio
            </Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <HeroSection project={project} />

      {/* Challenge & Solution */}
      <ChallengeSection project={project} />

      {/* Screenshots */}
      <ScreenshotsSection project={project} />

      {/* Results */}
      <ResultsSection project={project} />

      {/* CTA */}
      <CTASection />

      <Footer />
    </main>
  );
};

const HeroSection = ({ project }: { project: ReturnType<typeof getProjectById> }) => {
  const { ref, isVisible } = useScrollAnimation();

  if (!project) return null;

  return (
    <section className="pt-32 pb-16 md:pb-24 px-6 md:px-12">
      <div
        ref={ref}
        className={`container mx-auto max-w-5xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Link
          to="/#portfolio"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao portfólio
        </Link>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-1 bg-secondary rounded-full">
            {project.category}
          </span>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          {project.title}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
          {project.longDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-12">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-3 py-1 border border-border rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-lg aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

const ChallengeSection = ({ project }: { project: ReturnType<typeof getProjectById> }) => {
  const { ref, isVisible } = useScrollAnimation();

  if (!project) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-secondary">
      <div
        ref={ref}
        className={`container mx-auto max-w-5xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4">
              O Desafio
            </p>
            <p className="text-lg leading-relaxed">{project.challenge}</p>
          </div>
          <div>
            <p className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4">
              A Solução
            </p>
            <p className="text-lg leading-relaxed">{project.solution}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ScreenshotsSection = ({ project }: { project: ReturnType<typeof getProjectById> }) => {
  const { ref, isVisible } = useScrollAnimation();

  if (!project) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-12">
      <div className="container mx-auto max-w-5xl">
        <div
          ref={ref}
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4">
            Screenshots
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Veja o projeto em ação
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {project.screenshots.map((screenshot, index) => (
            <ScreenshotCard key={index} src={screenshot} index={index} alt={`${project.title} screenshot ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ScreenshotCard = ({ src, index, alt }: { src: string; index: number; alt: string }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-lg transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover aspect-video hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};

const ResultsSection = ({ project }: { project: ReturnType<typeof getProjectById> }) => {
  const { ref, isVisible } = useScrollAnimation();

  if (!project) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-secondary">
      <div className="container mx-auto max-w-5xl">
        <div
          ref={ref}
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4">
            Resultados
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            O que conquistamos
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {project.results.map((result, index) => (
            <ResultItem key={index} result={result} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ResultItem = ({ result, index }: { result: string; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`flex items-start gap-4 p-6 bg-background rounded-lg transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
      <p className="text-lg font-medium">{result}</p>
    </div>
  );
};

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 px-6 md:px-12">
      <div
        ref={ref}
        className={`container mx-auto max-w-3xl text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Quer resultados assim<br />
          <span className="text-muted-foreground">para o seu negócio?</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Vamos conversar sobre como podemos transformar sua operação.
        </p>
        <Button variant="hero" size="xl" asChild>
          <Link to="/#contato">
            Fale conosco
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default ProjectDetail;
