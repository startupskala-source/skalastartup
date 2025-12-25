"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

const animatedButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xl: "h-14 px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface AnimatedBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof animatedButtonVariants> {
  asChild?: boolean;
  gradientColors?: string;
}

const AnimatedBorderButton = React.forwardRef<HTMLButtonElement, AnimatedBorderButtonProps>(
  ({ className, size, asChild = false, gradientColors, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <div className="relative group">
        {/* Animated gradient border */}
        <motion.div
          className={cn(
            "absolute -inset-[2px] rounded-lg opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300",
            gradientColors || "bg-gradient-to-r from-primary via-primary/50 to-primary"
          )}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
        
        {/* Button content */}
        <Comp
          className={cn(
            animatedButtonVariants({ size }),
            "relative bg-background text-foreground rounded-lg font-display font-medium tracking-wide hover:scale-[1.02] active:scale-[0.98] z-10",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      </div>
    );
  }
);
AnimatedBorderButton.displayName = "AnimatedBorderButton";

export { AnimatedBorderButton, animatedButtonVariants };
