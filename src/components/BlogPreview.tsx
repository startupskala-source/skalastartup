import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const articles = [
  {
    id: 1,
    title: "Como um Cardápio Digital pode aumentar suas vendas em 40%",
    excerpt: "Descubra como a automação de pedidos transforma a experiência do cliente e impulsiona o faturamento.",
    date: "15 Dez 2024",
    category: "Automação",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "O poder do atendimento 24/7 com chatbots inteligentes",
    excerpt: "Saiba como empresas estão usando IA para nunca perder uma venda, mesmo fora do horário comercial.",
    date: "10 Dez 2024",
    category: "Atendimento",
    readTime: "4 min",
  },
  {
    id: 3,
    title: "5 tendências de marketing digital para 2025",
    excerpt: "Prepare seu negócio para o futuro com as estratégias que vão dominar o mercado no próximo ano.",
    date: "05 Dez 2024",
    category: "Marketing",
    readTime: "6 min",
  },
];

export const BlogPreview = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-secondary/50">
      <div className="container mx-auto max-w-5xl">
        <div
          ref={ref}
          className={`mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-display text-xs sm:text-sm tracking-widest text-muted-foreground uppercase mb-3 sm:mb-4">
            Blog
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
              Insights e <br />
              <span className="text-muted-foreground">tendências</span>
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              Ver todos os artigos
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
              </div>

              <h3 className="font-display text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {article.date}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
