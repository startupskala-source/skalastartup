import { RatingInteraction } from "@/components/ui/emoji-rating"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export const RatingSection = () => {
  const { ref, isVisible } = useScrollAnimation()

  const handleRatingChange = (rating: number) => {
    console.log("Avaliação:", rating)
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 border-t border-border">
      <div
        ref={ref}
        className={`container mx-auto max-w-xl text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-display text-xs sm:text-sm tracking-widest text-muted-foreground uppercase mb-3 sm:mb-4">
          Feedback
        </p>
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-6 sm:mb-8">
          Como foi sua experiência?
        </h2>

        <RatingInteraction onChange={handleRatingChange} />
      </div>
    </section>
  )
}
