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
  popupDescription = "This will be a brief, free call with one of Bricks Studio's design and development producers to discuss your project and determine if we're a good fit.",
  popupBadgeText = "Free",
  ctaButtonText = "Book a call",
  ctaButtonAction = () => console.log("CTA clicked"),
  position = { bottom: "2rem", right: "2rem" },
}: FloatingConsultButtonProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const lgButtonSize = buttonSize || 160;
  const smButtonSize = buttonSize ? buttonSize * 0.8 : 128;
  const lgImageSize = imageSize || 96;
  const smImageSize = imageSize ? imageSize * 0.833 : 80;

  return (
    <>
      {/* Backdrop with Blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed z-50 bottom-48 right-6 lg:bottom-52 lg:right-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 -right-2 text-white hover:text-gray-300 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-2xl max-w-sm">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  {popupHeading}
                </h3>
                <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
                  {popupBadgeText}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                {popupDescription}
              </p>

              {/* CTA Button */}
              <Button onClick={ctaButtonAction} className="w-full">
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
          bottom: position.bottom,
          right: position.right,
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
              <text className="text-[10px] fill-foreground font-medium uppercase tracking-widest">
                <textPath href="#circlePath">
                  {revolvingText}
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Center Image/Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full overflow-hidden border-2 border-border shadow-lg group-hover:scale-110 transition-transform duration-300"
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
                    parent.innerHTML = '<div class="w-full h-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">?</div>';
                  }
                }}
              />
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
