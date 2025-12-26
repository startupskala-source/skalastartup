import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

import avatar1 from "@/assets/testimonials/avatar-1.jpg";
import avatar2 from "@/assets/testimonials/avatar-2.jpg";
import avatar3 from "@/assets/testimonials/avatar-3.jpg";
import avatar4 from "@/assets/testimonials/avatar-4.jpg";
import avatar5 from "@/assets/testimonials/avatar-5.jpg";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Eduardo",
    role: "CEO",
    company: "TechSolutions BR",
    avatar: avatar1,
    content: "A Skala transformou completamente nossa presença digital. O ROI do nosso e-commerce aumentou 300% em apenas 6 meses. Profissionais excepcionais!",
    rating: 5,
  },
  {
    id: 2,
    name: "Mariana Santos",
    role: "Diretora de Marketing",
    company: "Grupo Inovação",
    avatar: avatar2,
    content: "Trabalhar com a Skala foi uma experiência incrível. Eles entenderam nossa visão e entregaram um site que superou todas as expectativas.",
    rating: 5,
  },
  {
    id: 3,
    name: "Roberto Almeida",
    role: "Fundador",
    company: "StartupX",
    avatar: avatar3,
    content: "Desde que lançamos nosso novo site com a Skala, nossas conversões aumentaram significativamente. O suporte pós-lançamento é impecável.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ana Carolina",
    role: "Gerente Comercial",
    company: "Bella Moda",
    avatar: avatar4,
    content: "Nossa loja virtual ficou linda e funcional. Os clientes elogiam a facilidade de navegação e as vendas online cresceram 150%.",
    rating: 5,
  },
  {
    id: 5,
    name: "Felipe Martins",
    role: "Diretor",
    company: "Construtora Horizonte",
    avatar: avatar5,
    content: "A equipe da Skala é extremamente profissional e dedicada. Nosso site institucional transmite exatamente a credibilidade que precisávamos.",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
      <CardContent className="p-6 md:p-8 flex flex-col h-full">
        <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/30 mb-4" />
        
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed flex-grow mb-6">
          "{testimonial.content}"
        </p>
        
        <div className="flex items-center gap-3 md:gap-4">
          <Avatar className="w-10 h-10 md:w-12 md:h-12 border-2 border-primary/20">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-grow">
            <h4 className="font-semibold text-foreground text-sm md:text-base">
              {testimonial.name}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground">
              {testimonial.role} • {testimonial.company}
            </p>
          </div>
          
          <div className="flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="depoimentos"
      ref={ref}
      className={`py-16 md:py-24 bg-background transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Histórias reais de empresas que transformaram sua presença digital com a Skala
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-card border-border hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="static translate-y-0 bg-card border-border hover:bg-primary hover:text-primary-foreground" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
