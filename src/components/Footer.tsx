import { Link } from "react-router-dom";
import skalaLogo from "@/assets/skala-logo.svg";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

const quickLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#pacotes", label: "Pacotes" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

const socialLinks = [
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://wa.me/5547984682257", icon: WhatsAppIcon, label: "WhatsApp", isCustom: true },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={skalaLogo} alt="SKALA" className="h-10 w-auto mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Transformamos negócios com automação inteligente. Cardápios digitais, atendimento 24/7 e websites que convertem.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  {social.isCustom ? (
                    <WhatsAppIcon className="h-4 w-4" animate={false} />
                  ) : (
                    <social.icon className="h-4 w-4" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contato@skala.com.br"
                  className="flex items-center gap-3 text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  contato@skala.com.br
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5547984682257"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  (47) 98468-2257
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Balneário Camboriú, SC<br />Brasil</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Receba dicas e novidades sobre automação digital.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Seu e-mail"
                className="px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-muted-foreground text-xs sm:text-sm">
            © {new Date().getFullYear()} SKALA. Todos os direitos reservados.
          </p>
          <Link 
            to="/privacidade" 
            className="text-muted-foreground text-xs sm:text-sm hover:text-foreground transition-colors"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
};
