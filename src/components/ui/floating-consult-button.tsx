import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FloatingConsultButtonProps {
  buttonSize?: number;
  imageSize?: number;
  imageSrc?: string;
  imageAlt?: string;
  revolvingText?: string;
  revolvingSpeed?: number;
  popupHeading?: string;
  popupDescription?: string;
  popupBadgeText?: string;
  ctaButtonText?: string;
  ctaButtonAction?: () => void;
  position?: {
    bottom?: string;
    right?: string;
    left?: string;
    top?: string;
  };
}

export const FloatingConsultButton = ({
  buttonSize,
  imageSize,
  imageSrc = "/consultant-avatar.jpg",
  imageAlt = "Consultant",
  revolvingText = "FREE 30 MINUTES - CONSULT - ",
  revolvingSpeed = 10,
  popupHeading = "30-minutes call",
  popupDescription = "This will be a brief, free call with one of our team to discuss your project and determine if we're a good fit.",
  popupBadgeText = "Grátis",
  ctaButtonText = "Agendar chamada",
  ctaButtonAction = () => console.log("CTA clicked"),
  position = { bottom: "1rem", right: "1rem" },
}: FloatingConsultButtonProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  
  const lgButtonSize = buttonSize || 100;
  const smButtonSize = buttonSize ? buttonSize * 0.7 : 80;
  const lgImageSize = imageSize || 56;
  const smImageSize = imageSize ? imageSize * 0.7 : 48;

  return (
    <>
      {/* Backdrop with Blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed z-50 bottom-48 right-4 lg:right-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-card border border-border rounded-2xl p-6 w-80 shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-semibold text-foreground">
                  {popupHeading}
                </h3>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {popupBadgeText}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {popupDescription}
              </p>

              {/* CTA Button */}
              <Button onClick={ctaButtonAction} className="w-full" variant="hero">
                {ctaButtonText}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div
        className="fixed z-50"
        style={{
          bottom: position.bottom || "1rem",
          right: position.right || "1rem",
          left: position.left,
          top: position.top,
        }}
      >
        <div
          className="relative cursor-pointer group"
          style={{ width: smButtonSize, height: smButtonSize }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Rotating Text */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: revolvingSpeed, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="fill-foreground text-[10px] font-medium tracking-widest uppercase">
                <textPath href="#circlePath">
                  {revolvingText}
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Center Image/Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full overflow-hidden bg-muted border-2 border-border group-hover:border-primary transition-colors relative"
              style={{ width: smImageSize, height: smImageSize }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">?</div>';
                  }
                }}
              />
              
              {/* Online Indicator */}
              <div className="absolute -top-0.5 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background animate-pulse z-10" />
            </div>
          </div>
        </div>
        
        <style>{`
          @media (min-width: 1024px) {
            .relative.cursor-pointer.group {
              width: ${lgButtonSize}px !important;
              height: ${lgButtonSize}px !important;
            }
            .relative.cursor-pointer.group .rounded-full.overflow-hidden {
              width: ${lgImageSize}px !important;
              height: ${lgImageSize}px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};
