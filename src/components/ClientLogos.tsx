import { motion } from "framer-motion";

const logos = [
  { name: "TechFlow", letters: "TF" },
  { name: "Innovate", letters: "IN" },
  { name: "CloudSync", letters: "CS" },
  { name: "DataPrime", letters: "DP" },
  { name: "NextGen", letters: "NG" },
  { name: "CoreBiz", letters: "CB" },
  { name: "ScaleUp", letters: "SU" },
  { name: "ProServe", letters: "PS" },
];

export const ClientLogos = () => {
  return (
    <section className="py-12 sm:py-16 border-b border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 mb-8">
        <p className="font-display text-xs sm:text-sm tracking-widest text-muted-foreground uppercase text-center">
          Empresas que confiam em nós
        </p>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Marquee container */}
        <div className="flex">
          <motion.div
            className="flex gap-12 sm:gap-16 md:gap-24"
            animate={{ x: [0, "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Double the logos for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex items-center gap-3 flex-shrink-0"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-muted flex items-center justify-center">
                  <span className="font-display font-bold text-foreground text-sm sm:text-base">
                    {logo.letters}
                  </span>
                </div>
                <span className="font-display text-lg sm:text-xl font-semibold text-muted-foreground">
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
