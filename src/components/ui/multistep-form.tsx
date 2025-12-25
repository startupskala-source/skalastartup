"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CheckIcon, ArrowRightIcon } from "lucide-react"

type Step = {
  id: number
  label: string
  field: string
  placeholder: string
}

const steps: Step[] = [
  { id: 1, label: "Nome", field: "name", placeholder: "Seu nome completo" },
  { id: 2, label: "Email", field: "email", placeholder: "seu@email.com" },
  { id: 3, label: "WhatsApp", field: "whatsapp", placeholder: "(11) 99999-9999" },
  { id: 4, label: "Mensagem", field: "message", placeholder: "Como podemos ajudar?" },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isComplete, setIsComplete] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  if (isComplete) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-500/0 blur-2xl" />
          <div className="relative flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckIcon className="h-10 w-10 text-emerald-500" />
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">Tudo certo!</p>
              <p className="text-muted-foreground">{formData.name}, entraremos em contato em breve.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => index < currentStep && setCurrentStep(index)}
              disabled={index > currentStep}
              className={cn(
                "group relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-700 ease-out",
                "disabled:cursor-not-allowed",
                index < currentStep && "bg-foreground/10 text-foreground/60",
                index === currentStep && "bg-foreground text-background shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)]",
                index > currentStep && "bg-muted/50 text-muted-foreground/40",
              )}
            >
              {index < currentStep ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
              {index === currentStep && (
                <span className="absolute -inset-1 rounded-full border border-foreground/20 animate-pulse" />
              )}
            </button>

            {index < steps.length - 1 && (
              <div className="mx-2 h-[2px] w-8 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-foreground/60 transition-all duration-700"
                  style={{ width: index < currentStep ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted/50">
        <div
          className="h-full bg-foreground transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Form content */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {currentStepData.label}
            </Label>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1}/{steps.length}
            </span>
          </div>

          <div className="relative">
            <Input
              type={currentStepData.field === "email" ? "email" : "text"}
              placeholder={currentStepData.placeholder}
              value={formData[currentStepData.field] || ""}
              onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
              autoFocus
              className="h-14 text-base transition-all duration-500 border-border/50 focus:border-foreground/20 bg-background/50 backdrop-blur"
            />
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={!formData[currentStepData.field]}
          className="w-full h-12 text-base"
        >
          <span>{currentStep === steps.length - 1 ? "Enviar" : "Continuar"}</span>
          <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>

        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full text-center text-sm text-muted-foreground/60 hover:text-foreground/80 transition-all duration-300"
          >
            Voltar
          </button>
        )}
      </div>
    </div>
  )
}
