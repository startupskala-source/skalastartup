import React, { useState, useEffect } from "react";
import { format, addDays, isSameDay, startOfDay, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

interface TimeSlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

interface Appointment {
  appointment_date: string;
  appointment_time: string;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfDay(new Date()));
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch available time slots
  useEffect(() => {
    const fetchTimeSlots = async () => {
      const { data, error } = await supabase
        .from("available_time_slots")
        .select("*")
        .eq("is_active", true);

      if (error) {
        console.error("Error fetching time slots:", error);
      } else {
        setTimeSlots(data || []);
      }
    };

    fetchTimeSlots();
  }, []);

  // Fetch existing appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("appointments")
        .select("appointment_date, appointment_time")
        .eq("status", "confirmed");

      if (error) {
        console.error("Error fetching appointments:", error);
      } else {
        setAppointments(data || []);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  // Get available times for a specific date
  const getAvailableTimesForDate = (date: Date): string[] => {
    const dayOfWeek = date.getDay();
    const dateStr = format(date, "yyyy-MM-dd");
    
    // Get slots for this day of week
    const daySlots = timeSlots.filter(slot => slot.day_of_week === dayOfWeek);
    
    // Get booked times for this date
    const bookedTimes = appointments
      .filter(apt => apt.appointment_date === dateStr)
      .map(apt => apt.appointment_time);
    
    // Filter out booked times
    return daySlots
      .map(slot => slot.start_time.substring(0, 5))
      .filter(time => !bookedTimes.includes(time + ":00"));
  };

  const handlePreviousWeek = () => {
    const newStart = addDays(currentWeekStart, -7);
    if (isAfter(newStart, addDays(new Date(), -1))) {
      setCurrentWeekStart(newStart);
    }
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const isDateAvailable = (date: Date) => {
    return isAfter(date, addDays(new Date(), -1)) && getAvailableTimesForDate(date).length > 0;
  };

  const availableTimes = selectedDate ? getAvailableTimesForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePreviousWeek}
          disabled={!isAfter(currentWeekStart, new Date())}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 text-lg font-medium">
          <CalendarIcon className="h-5 w-5 text-primary" />
          <span>
            {format(currentWeekStart, "MMMM yyyy", { locale: ptBR })}
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={handleNextWeek}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const isAvailable = isDateAvailable(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={day.toISOString()}
              onClick={() => isAvailable && onDateSelect(day)}
              disabled={!isAvailable}
              className={cn(
                "flex flex-col items-center p-3 rounded-xl transition-all duration-200",
                isAvailable
                  ? "hover:bg-primary/10 cursor-pointer"
                  : "opacity-40 cursor-not-allowed",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary",
                isToday && !isSelected && "ring-2 ring-primary/50"
              )}
            >
              <span className="text-xs uppercase font-medium">
                {format(day, "EEE", { locale: ptBR })}
              </span>
              <span className="text-2xl font-bold mt-1">
                {format(day, "d")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="space-y-3">
          <h4 className="font-medium text-muted-foreground">
            Horários disponíveis para {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
          </h4>
          
          {loading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            </div>
          ) : availableTimes.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => onTimeSelect(time)}
                  className={cn(
                    "py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200",
                    selectedTime === time
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-primary hover:bg-primary/5"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">
              Nenhum horário disponível para esta data
            </p>
          )}
        </div>
      )}
    </div>
  );
};
