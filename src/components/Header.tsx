import { useState, useEffect } from "react";
import skalaLogo from "@/assets/skala-logo.svg";

export const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 py-4">
        <nav className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={skalaLogo} alt="SKALA" className="h-10 w-auto" />
          </a>
          
          <a
            href="#contato"
            className="font-display text-sm tracking-wide text-foreground hover:text-muted-foreground transition-colors duration-300"
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
};
