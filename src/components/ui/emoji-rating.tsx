"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface RatingInteractionProps {
  onChange?: (rating: number) => void
  className?: string
}

const ratingData = [
  { emoji: "😔", label: "Péssimo", color: "from-red-400 to-red-500", shadowColor: "shadow-red-500/30" },
  { emoji: "😕", label: "Ruim", color: "from-orange-400 to-orange-500", shadowColor: "shadow-orange-500/30" },
  { emoji: "😐", label: "Regular", color: "from-yellow-400 to-yellow-500", shadowColor: "shadow-yellow-500/30" },
  { emoji: "🙂", label: "Bom", color: "from-lime-400 to-lime-500", shadowColor: "shadow-lime-500/30" },
  { emoji: "😍", label: "Incrível", color: "from-emerald-400 to-emerald-500", shadowColor: "shadow-emerald-500/30" },
]

export function RatingInteraction({ onChange, className }: RatingInteractionProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = (value: number) => {
    setRating(value)
    onChange?.(value)
  }

  const displayRating = hoverRating || rating
  const activeData = displayRating > 0 ? ratingData[displayRating - 1] : null

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* Emoji rating buttons */}
      <div className="flex gap-1">
        {ratingData.map((item, i) => {
          const value = i + 1
          const isActive = value <= displayRating
          const isExact = value === displayRating

          return (
            <button
              key={value}
              type="button"
              onClick={() => handleClick(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              className="group relative focus:outline-none"
              aria-label={`Avaliar ${value}: ${item.label}`}
            >
              <div
                className={cn(
                  "relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
                  isExact && activeData
                    ? `bg-gradient-to-br ${activeData.color} shadow-lg ${activeData.shadowColor}`
                    : "bg-secondary hover:bg-muted"
                )}
              >
                {/* Emoji with smooth grayscale transition */}
                <span
                  className={cn(
                    "text-2xl transition-all duration-300",
                    isActive ? "grayscale-0 scale-110" : "grayscale opacity-50 scale-100"
                  )}
                >
                  {item.emoji}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="relative h-6 w-full">
        {/* Default "Avalie-nos" text */}
        <p
          className={cn(
            "absolute inset-0 text-center text-sm font-medium text-muted-foreground transition-all duration-300",
            displayRating > 0 ? "opacity-0 blur-md scale-95" : "opacity-100 blur-0 scale-100"
          )}
        >
          Avalie-nos
        </p>

        {/* Rating labels with blur in/out effect */}
        {ratingData.map((item, i) => (
          <p
            key={i}
            className={cn(
              "absolute inset-0 text-center text-sm font-medium transition-all duration-300",
              displayRating === i + 1
                ? "opacity-100 blur-0 scale-100"
                : "opacity-0 blur-md scale-105",
              displayRating === i + 1 && `bg-gradient-to-r ${item.color} bg-clip-text text-transparent`
            )}
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  )
}
