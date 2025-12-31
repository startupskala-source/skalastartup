import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingCalendar } from "./BookingCalendar";
import { BookingForm } from "./BookingForm";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "calendar" | "form" | "success";

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleClose = () => {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setStep("calendar");
      setSelectedDate(null);
      setSelectedTime(null);
    }, 300);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setStep("form");
    }
  };

  const handleBack = () => {
    setStep("calendar");
  };

  const handleSuccess = () => {
    setStep("success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-2 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 bg-card rounded-xl sm:rounded-2xl shadow-2xl sm:max-w-lg sm:w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="p-1.5 sm:p-2 rounded-full bg-primary/10 shrink-0">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold truncate">Agendar Reunião</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {step === "calendar" && "Escolha data e horário"}
                    {step === "form" && "Preencha seus dados"}
                    {step === "success" && "Confirmado!"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 sm:p-2 hover:bg-muted rounded-full transition-colors shrink-0"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              <AnimatePresence mode="wait">
                {step === "calendar" && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <BookingCalendar
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      onDateSelect={handleDateSelect}
                      onTimeSelect={handleTimeSelect}
                    />

                    {selectedDate && selectedTime && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                      >
                        <Button onClick={handleContinue} className="w-full">
                          Continuar
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {step === "form" && selectedDate && selectedTime && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <BookingForm
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      onSuccess={handleSuccess}
                      onBack={handleBack}
                    />
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Agendamento Confirmado!</h3>
                    <p className="text-muted-foreground mb-8">
                      Você receberá uma confirmação em breve. Estamos ansiosos para conversar com você!
                    </p>
                    <Button onClick={handleClose}>Fechar</Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
