import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";

interface FloatingConsultButtonProps {
  popupHeading?: string;
  popupDescription?: string;
  popupBadgeText?: string;
  ctaButtonText?: string;
  ctaButtonAction?: () => void;
}

export const FloatingConsultButton = ({
  popupHeading = "Chamada de 30 minutos",
  popupDescription = "Uma conversa rápida e gratuita com nossa equipe para entender seu projeto.",
  popupBadgeText = "Grátis",
  ctaButtonText = "Agendar chamada",
  ctaButtonAction = () => console.log("CTA clicked"),
}: FloatingConsultButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 bottom-24 right-4 md:right-6"
          >
            <div className="bg-background border border-border rounded-lg p-5 w-72 shadow-lg">
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-display text-sm font-semibold text-foreground">
                  {popupHeading}
                </h3>
                <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded">
                  {popupBadgeText}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
                {popupDescription}
              </p>

              {/* CTA Button */}
              <Button onClick={ctaButtonAction} className="w-full h-9 text-sm" variant="default">
                {ctaButtonText}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 bottom-4 right-4 md:right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        whileTap={{ scale: 0.95 }}
      >
        {/* Online Indicator */}
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};
