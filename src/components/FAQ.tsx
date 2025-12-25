import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "Quanto tempo leva para desenvolver um projeto?",
    answer:
      "O tempo varia de acordo com a complexidade. Um cardápio digital simples pode ficar pronto em 3-5 dias, enquanto um e-commerce completo pode levar de 2-4 semanas. Sempre alinhamos prazos realistas antes de iniciar.",
  },
  {
    question: "Vocês oferecem suporte após a entrega?",
    answer:
      "Sim! Oferecemos suporte contínuo 24/7 para todos os nossos clientes. Isso inclui atualizações, correções e orientações sobre como usar as ferramentas.",
  },
  {
    question: "Posso atualizar o cardápio digital sozinho?",
    answer:
      "Com certeza! Nosso sistema de cardápio digital vem com um painel administrativo intuitivo onde você pode adicionar, remover ou editar itens, preços e fotos em tempo real.",
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer:
      "Aceitamos Pix, cartão de crédito (parcelamos em até 12x), boleto e transferência bancária. Para projetos maiores, oferecemos condições especiais de pagamento.",
  },
  {
    question: "Vocês atendem empresas de qualquer tamanho?",
    answer:
      "Sim! Atendemos desde pequenos negócios locais até grandes empresas. Nossas soluções são escaláveis e se adaptam ao tamanho e necessidade do seu negócio.",
  },
];

export const FAQ = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-12">
      <div className="container mx-auto max-w-3xl">
        <div
          ref={ref}
          className={`mb-12 md:mb-16 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-display text-sm tracking-widest text-muted-foreground uppercase mb-4">
            Perguntas Frequentes
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Tire suas dúvidas
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} value={`item-${index}`} />
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const FAQItem = ({
  faq,
  index,
  value,
}: {
  faq: (typeof faqs)[0];
  index: number;
  value: string;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <AccordionItem value={value} className="border-border">
        <AccordionTrigger className="text-left font-display text-lg font-medium hover:no-underline py-6">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground pb-6">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};
