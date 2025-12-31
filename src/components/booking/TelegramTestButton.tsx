import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TelegramErrorResponse {
  success: false;
  stage: "getMe" | "sendMessage";
  error: string;
  telegram_error_code?: number;
  telegram_description?: string;
}

export const TelegramTestButton: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleTest = async () => {
    setStatus("loading");
    
    try {
      const { data, error } = await supabase.functions.invoke("send-telegram", {
        body: {
          name: "Teste Lovable",
          email: "teste@lovable.dev",
          phone: "00000000000",
          date: new Date().toLocaleDateString("pt-BR"),
          time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          testMode: true,
        },
      });

      if (error) throw error;

      if (data?.success) {
        setStatus("success");
        toast.success("Telegram conectado com sucesso! Verifique seu chat.");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        // Handle structured error response
        const errorData = data as TelegramErrorResponse;
        const stageLabel = errorData.stage === "getMe" ? "Token" : "Envio";
        
        setStatus("error");
        toast.error(`${stageLabel}: ${errorData.error}`, {
          duration: 8000,
          description: errorData.telegram_description 
            ? `Código: ${errorData.telegram_error_code}` 
            : undefined,
        });
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error: any) {
      setStatus("error");
      console.error("Telegram test error:", error);
      toast.error(`Erro: ${error.message || "Falha ao conectar com Telegram"}`);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleTest}
      disabled={status === "loading"}
      className="gap-2"
    >
      {status === "idle" && (
        <>
          <Send className="h-4 w-4" />
          Testar Telegram
        </>
      )}
      {status === "loading" && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Testando...
        </>
      )}
      {status === "success" && (
        <>
          <CheckCircle className="h-4 w-4 text-green-500" />
          Conectado!
        </>
      )}
      {status === "error" && (
        <>
          <AlertCircle className="h-4 w-4 text-red-500" />
          Falhou
        </>
      )}
    </Button>
  );
};
