import { Link } from "react-router-dom";
import skalaLogo from "@/assets/skala-logo.svg";

export const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={skalaLogo} alt="SKALA" className="h-10 w-auto" />
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link 
              to="/privacidade" 
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              Política de Privacidade
            </Link>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} SKALA. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
