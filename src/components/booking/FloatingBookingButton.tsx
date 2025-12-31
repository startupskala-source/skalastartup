import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookingModal } from "./BookingModal";
import consultantAvatar from "@/assets/consultant-avatar.jpg";

interface FloatingBookingButtonProps {
  buttonSize?: number;
  imageSize?: number;
  imageSrc?: string;
  imageAlt?: string;
  revolvingText?: string;
  revolvingSpeed?: number;
  position?: {
    bottom?: string;
    right?: string;
    left?: string;
    top?: string;
  };
}

export const FloatingBookingButton: React.FC<FloatingBookingButtonProps> = ({
  buttonSize,
  imageSize,
  imageSrc = consultantAvatar,
  imageAlt = "Agendar",
  revolvingText = "AGENDAR REUNIÃO • GRÁTIS • ",
  revolvingSpeed = 10,
  position = { bottom: "2rem", right: "2rem" },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lgButtonSize = buttonSize || 160;
  const smButtonSize = buttonSize ? buttonSize * 0.8 : 128;
  const lgImageSize = imageSize || 96;
  const smImageSize = imageSize ? imageSize * 0.833 : 80;

  return (
    <>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Floating Button */}
      <div
        className="fixed z-40"
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
          onClick={() => setIsModalOpen(true)}
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
                  id="bookingCirclePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="text-[10px] fill-foreground font-medium uppercase tracking-widest">
                <textPath href="#bookingCirclePath">
                  {revolvingText}
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Center Image/Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full overflow-hidden border-2 border-border shadow-lg group-hover:scale-110 transition-transform duration-300 bg-primary"
              style={{ width: smImageSize, height: smImageSize }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML =
                      '<div class="w-full h-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">📅</div>';
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
