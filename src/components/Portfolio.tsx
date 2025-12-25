import { useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

export const Portfolio = () => {
  const { ref, isVisible } = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto max-w-5xl px-6 md:px-12">
        <div
          ref={ref}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4">
              Portfólio
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Projetos que <br />
              <span className="text-muted-foreground">transformam negócios</span>
            </h2>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="w-[calc((100vw-1280px)/2)] flex-shrink-0 hidden 2xl:block" />
        
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
        
        <div className="w-6 flex-shrink-0" />
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLAnchorElement>(0.1);

  return (
    <Link
      to={`/projeto/${project.id}`}
      ref={ref}
      className={`group relative flex-shrink-0 w-[320px] md:w-[400px] snap-start transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-lg bg-secondary aspect-[3/2]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-2 text-background">
            <span className="text-sm font-medium">Ver projeto</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="font-display text-lg font-bold mt-1">{project.title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
      </div>
    </Link>
  );
};
