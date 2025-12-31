import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { User, Mail, Phone, Loader2, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  onSuccess: () => void;
  onBack: () => void;
}

interface FormField {
  id: string;
  field_label: string;
  field_type: string;
  is_required: boolean;
  field_order: number;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedDate,
  selectedTime,
  onSuccess,
  onBack,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [customFields, setCustomFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});

  // Fetch custom form fields
  useEffect(() => {
    const fetchCustomFields = async () => {
      const { data, error } = await supabase
        .from("booking_form_fields")
        .select("*")
        .order("field_order");

      if (error) {
        console.error("Error fetching custom fields:", error);
      } else {
        setCustomFields(data || []);
      }
    };

    fetchCustomFields();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomFieldChange = (fieldLabel: string, value: string) => {
    setCustomAnswers((prev) => ({ ...prev, [fieldLabel]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const timeStr = selectedTime + ":00";

      // Save to database
      const { error: dbError } = await supabase.from("appointments").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        appointment_date: dateStr,
        appointment_time: timeStr,
        custom_answers: customAnswers,
        status: "confirmed",
      });

      if (dbError) {
        console.error("Error saving appointment:", dbError);
        throw new Error("Erro ao salvar agendamento");
      }

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke("send-email-notification", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: format(selectedDate, "dd/MM/yyyy"),
          time: selectedTime,
          customAnswers,
        },
      });

      if (emailError) {
        console.error("Error sending email notification:", emailError);
        // Don't throw - appointment was saved successfully
        toast({
          title: "Agendamento confirmado!",
          description: "Porém houve um erro ao enviar a notificação por email. Entraremos em contato.",
          variant: "default",
        });
      } else {
        toast({
          title: "Agendamento confirmado!",
          description: `Sua reunião foi agendada para ${format(selectedDate, "dd 'de' MMMM", { locale: ptBR })} às ${selectedTime}. Você receberá um email de confirmação.`,
        });
      }

      onSuccess();
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao agendar. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Selected Date/Time Summary */}
      <div className="bg-primary/5 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-1.5 sm:space-y-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
          <span className="font-medium capitalize">
            {format(selectedDate, "EEE, d 'de' MMM 'de' yyyy", { locale: ptBR })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
          <span className="font-medium">{selectedTime}</span>
        </div>
      </div>

      {/* Basic Fields */}
      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-xs sm:text-sm">
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Nome completo *
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Seu nome"
            required
            className="text-sm sm:text-base h-9 sm:h-10"
          />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-xs sm:text-sm">
            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="seu@email.com"
            required
            className="text-sm sm:text-base h-9 sm:h-10"
          />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-xs sm:text-sm">
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Telefone
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(11) 99999-9999"
            className="text-sm sm:text-base h-9 sm:h-10"
          />
        </div>
      </div>

      {/* Custom Fields */}
      {customFields.length > 0 && (
        <div className="space-y-3 sm:space-y-4 pt-2">
          <h4 className="font-medium text-muted-foreground text-xs sm:text-sm">
            Informações adicionais
          </h4>
          {customFields.map((field) => (
            <div key={field.id} className="space-y-1.5 sm:space-y-2">
              <Label htmlFor={field.id} className="text-xs sm:text-sm">
                {field.field_label} {field.is_required && "*"}
              </Label>
              <Input
                id={field.id}
                type={field.field_type}
                value={customAnswers[field.field_label] || ""}
                onChange={(e) => handleCustomFieldChange(field.field_label, e.target.value)}
                required={field.is_required}
                className="text-sm sm:text-base h-9 sm:h-10"
              />
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 text-sm h-9 sm:h-10"
          disabled={loading}
        >
          Voltar
        </Button>
        <Button type="submit" className="flex-1 text-sm h-9 sm:h-10" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Agendando...
            </>
          ) : (
            "Confirmar"
          )}
        </Button>
      </div>
    </form>
  );
};
