import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, CheckCircle } from "lucide-react";

export const ContactForm = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation<HTMLFormElement>();
  const { ref: successRef, isVisible: successVisible } = useScrollAnimation<HTMLDivElement>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Nome deve ter no máximo 100 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (!/^[\d\s()+-]+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Número inválido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória";
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Mensagem deve ter no máximo 1000 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <div
        ref={successRef}
        className={`flex flex-col items-center justify-center py-16 transition-all duration-700 ${
          successVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <CheckCircle className="h-16 w-16 text-primary mb-6" />
        <h3 className="font-display text-2xl font-bold mb-2">Obrigado!</h3>
        <p className="text-muted-foreground text-center">
          Recebemos sua mensagem e entraremos em contato em breve.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className={`space-y-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          name="whatsapp"
          placeholder="(11) 99999-9999"
          value={formData.whatsapp}
          onChange={handleChange}
          className={errors.whatsapp ? "border-destructive" : ""}
        />
        {errors.whatsapp && (
          <p className="text-sm text-destructive">{errors.whatsapp}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Como podemos ajudar?"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="hero"
        size="xl"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
        {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  );
};
