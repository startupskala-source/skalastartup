export interface Project {
  id: string;
  category: string;
  title: string;
  client: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  screenshots: string[];
  technologies: string[];
  year: string;
}

export const projects: Project[] = [
  {
    id: "restaurante-sabor-arte",
    category: "Cardápio Digital",
    title: "Restaurante Sabor & Arte",
    client: "Restaurante Sabor & Arte",
    description: "Cardápio interativo com QR Code e pedidos online integrados.",
    longDescription: "Desenvolvemos um cardápio digital completo para o Restaurante Sabor & Arte, permitindo que os clientes visualizem pratos com fotos de alta qualidade, façam pedidos diretamente da mesa e paguem sem esperar.",
    challenge: "O restaurante enfrentava longas filas de espera para atendimento e erros frequentes nos pedidos anotados manualmente.",
    solution: "Implementamos um sistema de cardápio digital com QR Code em cada mesa, integrado diretamente com a cozinha e o sistema de pagamento.",
    results: [
      "Redução de 40% no tempo de atendimento",
      "Aumento de 25% no ticket médio",
      "Zero erros de pedido",
      "Satisfação do cliente aumentou para 98%",
    ],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop",
    ],
    technologies: ["React", "Node.js", "QR Code API", "Stripe"],
    year: "2024",
  },
  {
    id: "studio-bella-hair",
    category: "Website",
    title: "Studio Bella Hair",
    client: "Studio Bella Hair",
    description: "Site institucional com agendamento online integrado.",
    longDescription: "Criamos um site elegante e moderno para o Studio Bella Hair, com sistema de agendamento online que permite aos clientes marcar horários 24/7 sem precisar ligar.",
    challenge: "O salão perdia muitos clientes por não conseguir atender ligações durante os horários de pico.",
    solution: "Desenvolvemos um site responsivo com sistema de agendamento integrado ao calendário da equipe, confirmações automáticas por WhatsApp e lembretes.",
    results: [
      "Aumento de 60% nos agendamentos",
      "Redução de 80% nas faltas",
      "Economia de 4h/dia em atendimento telefônico",
      "Expansão da base de clientes em 35%",
    ],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=500&fit=crop",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Google Calendar API", "WhatsApp API"],
    year: "2024",
  },
  {
    id: "clinica-vida-saudavel",
    category: "Automação",
    title: "Clínica Vida Saudável",
    client: "Clínica Vida Saudável",
    description: "Chatbot para agendamento e lembretes automáticos.",
    longDescription: "Implementamos um sistema completo de automação para a Clínica Vida Saudável, incluindo chatbot inteligente para agendamentos e lembretes automáticos para pacientes.",
    challenge: "A clínica tinha alta taxa de faltas em consultas e a equipe gastava muito tempo com ligações de confirmação.",
    solution: "Criamos um chatbot para WhatsApp que agenda consultas, envia lembretes automáticos e permite remarcar com facilidade.",
    results: [
      "Redução de 70% nas faltas",
      "Economia de 6h/dia da equipe",
      "Atendimento 24/7 automatizado",
      "NPS aumentou de 7.2 para 9.1",
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=500&fit=crop",
    ],
    technologies: ["Dialogflow", "WhatsApp Business API", "Node.js", "MongoDB"],
    year: "2023",
  },
  {
    id: "loja-natural-fit",
    category: "E-commerce",
    title: "Loja Natural Fit",
    client: "Natural Fit Suplementos",
    description: "Loja virtual completa com gestão de estoque.",
    longDescription: "Desenvolvemos uma loja virtual completa para a Natural Fit, com gestão de estoque automatizada, integração com marketplaces e sistema de fidelidade.",
    challenge: "A loja física queria expandir para o digital mas não tinha experiência com e-commerce e gestão de estoque online.",
    solution: "Criamos um e-commerce completo com painel administrativo intuitivo, gestão de estoque automatizada e integração com Mercado Livre e Shopee.",
    results: [
      "Faturamento online representa 45% do total",
      "Gestão de estoque automatizada",
      "Integração com 3 marketplaces",
      "Taxa de recompra de 40%",
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
    ],
    technologies: ["Shopify", "React", "Node.js", "PostgreSQL"],
    year: "2024",
  },
  {
    id: "pizzaria-don-mario",
    category: "Cardápio Digital",
    title: "Pizzaria Don Mario",
    client: "Pizzaria Don Mario",
    description: "Menu digital com personalização de pedidos em tempo real.",
    longDescription: "Criamos um cardápio digital interativo para a Pizzaria Don Mario, permitindo que clientes montem suas pizzas personalizadas e acompanhem o preparo em tempo real.",
    challenge: "Pedidos por telefone eram confusos, especialmente para pizzas personalizadas, gerando muitos erros e reclamações.",
    solution: "Desenvolvemos um sistema de cardápio digital com montagem visual de pizzas, rastreamento de pedido e integração com delivery.",
    results: [
      "Pedidos online representam 65% do faturamento",
      "Redução de 95% em erros de pedido",
      "Ticket médio aumentou 30%",
      "Tempo de atendimento reduzido em 50%",
    ],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&h=500&fit=crop",
    ],
    technologies: ["React", "Firebase", "Stripe", "Google Maps API"],
    year: "2023",
  },
  {
    id: "auto-center-premium",
    category: "Automação",
    title: "Auto Center Premium",
    client: "Auto Center Premium",
    description: "Sistema de atendimento automatizado via WhatsApp.",
    longDescription: "Implementamos um sistema completo de atendimento automatizado para o Auto Center Premium, incluindo agendamento de serviços, orçamentos automáticos e acompanhamento de reparos.",
    challenge: "A oficina recebia centenas de mensagens por dia e não conseguia responder a todas, perdendo muitos clientes.",
    solution: "Criamos um chatbot inteligente que responde dúvidas frequentes, agenda serviços, envia orçamentos e notifica sobre o status do veículo.",
    results: [
      "100% das mensagens respondidas em até 1 min",
      "Aumento de 45% nos agendamentos",
      "Economia de R$8.000/mês com atendentes",
      "Satisfação do cliente em 96%",
    ],
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop",
    ],
    technologies: ["WhatsApp Business API", "OpenAI", "Node.js", "MySQL"],
    year: "2024",
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
