import { Check, X, Star } from "lucide-react";
import { motion } from "framer-motion";

interface Package {
  name: string;
  price: string;
  featured?: boolean;
  target: string;
  includes: string[];
  excludes: string[];
}

const packages: Package[] = [
  {
    name: "START",
    price: "R$ 1.500",
    target: "Negócios que precisam começar do jeito certo, com presença profissional e anúncios organizados.",
    includes: [
      "Tráfego pago (Meta ou Google)",
      "Criação de 2 criativos simples por mês",
      "Branding básico",
      "Ajuste de identidade visual (cores, fontes, padrão visual)",
      "Análise de Social Media (perfil, posicionamento e estética)",
      "Criação de funil simples",
      "Captação via WhatsApp ou formulário",
      "Relatórios semanais",
      "Encontro mensal para análise da estratégia",
    ],
    excludes: [
      "Branding completo / rebranding",
      "Site institucional completo",
      "Gestão de redes sociais recorrente",
      "Ajustes ilimitados",
    ],
  },
  {
    name: "PERFORMANCE",
    price: "R$ 2.200",
    featured: true,
    target: "Negócios que já querem crescer com imagem forte e marketing organizado.",
    includes: [
      "Tráfego pago (Meta e/ou Google)",
      "Criação de 4 criativos por mês",
      "Branding estratégico leve",
      "Padronização visual para anúncios e funis",
      "Análise e orientação de Social Media",
      "Criação e otimização de funil",
      "Captação via WhatsApp e formulário",
      "Organização básica dos leads",
      "Relatórios semanais",
      "Encontro mensal estratégico",
    ],
    excludes: [
      "Branding completo (logo do zero, brandbook)",
      "Site institucional grande",
      "Gestão completa de redes sociais",
      "Sistemas sob medida",
    ],
  },
  {
    name: "GROWTH",
    price: "R$ 3.000",
    target: "Empresas que querem escala, autoridade e previsibilidade.",
    includes: [
      "Tráfego pago multicanal",
      "Criação de 6 criativos por mês",
      "Branding contínuo",
      "Consistência visual",
      "Direção criativa",
      "Funil estruturado",
      "Análise estratégica de Social Media",
      "Organização avançada dos leads",
      "Relatórios semanais + visão mensal",
      "Encontro mensal estratégico",
      "Otimização contínua",
    ],
    excludes: [
      "Branding completo avançado (rebranding total)",
      "SaaS custom ou sistemas grandes",
      "IA explícita",
      "Gestão total de redes sociais (posts diários etc.)",
    ],
  },
];

export const PricingSection = () => {
  return (
    <section id="pacotes" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Nossos Pacotes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha o plano ideal para o momento do seu negócio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl ${
                pkg.featured
                  ? "bg-primary text-primary-foreground shadow-lg scale-[1.02] lg:scale-105"
                  : "bg-card border border-border"
              }`}
            >
              {pkg.featured && (
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-semibold"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(var(--accent), 0)",
                      "0 0 0 8px rgba(var(--accent), 0.3)",
                      "0 0 0 0 rgba(var(--accent), 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Star className="w-4 h-4 fill-current" />
                  Mais Popular
                </motion.div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
                  PACOTE {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-bold">{pkg.price}</span>
                  <span className={`text-sm ${pkg.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    / mês
                  </span>
                </div>
              </div>

              <div className={`mb-6 p-4 rounded-lg ${pkg.featured ? "bg-primary-foreground/10" : "bg-muted/50"}`}>
                <p className={`text-sm ${pkg.featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                  <strong>Para quem é:</strong> {pkg.target}
                </p>
              </div>

              <div className="mb-6">
                <h4 className={`font-semibold mb-3 ${pkg.featured ? "text-primary-foreground" : "text-foreground"}`}>
                  Inclui:
                </h4>
                <ul className="space-y-2">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                      <span className={`text-sm ${pkg.featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`pt-6 border-t ${pkg.featured ? "border-primary-foreground/20" : "border-border"}`}>
                <h4 className={`font-semibold mb-3 ${pkg.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  Não inclui:
                </h4>
                <ul className="space-y-2">
                  {pkg.excludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                      <span className={`text-sm ${pkg.featured ? "text-primary-foreground/60" : "text-muted-foreground/70"}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contato"
                className={`mt-8 block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 ${
                  pkg.featured
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Quero esse pacote
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
