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
}

const AnimatedBorderButton = React.forwardRef<HTMLButtonElement, AnimatedBorderButtonProps>(
  ({ className, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <div className="relative group">
        {/* Outer glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-lg bg-[conic-gradient(from_0deg,hsl(var(--primary)),hsl(var(--primary)/0.3),hsl(var(--primary)))] opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Spinning border */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-[conic-gradient(from_0deg,hsl(var(--primary)),transparent_40%,transparent_60%,hsl(var(--primary)))]"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Button content */}
        <Comp
          className={cn(
            animatedButtonVariants({ size }),
            "relative m-[2px] bg-background text-foreground rounded-lg font-display font-medium tracking-wide hover:scale-[1.02] active:scale-[0.98] z-10",
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
