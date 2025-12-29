import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadData {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, whatsapp, message }: LeadData = await req.json();
    
    // Validate input
    if (!name || !email || !whatsapp) {
      console.error("Missing required fields:", { name, email, whatsapp });
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios faltando" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("CALLMEBOT_APIKEY");
    const closerPhone = "5547984682257";
    
    if (!apiKey) {
      console.error("CALLMEBOT_APIKEY not configured");
      return new Response(
        JSON.stringify({ error: "API Key não configurada" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format the notification message
    const notificationMessage = `🔔 *Novo Lead SKALA*

👤 *Nome:* ${name}
📧 *Email:* ${email}
📱 *WhatsApp:* ${whatsapp}
💬 *Mensagem:* ${message || "Não informada"}

_Responda este lead o mais rápido possível!_`;

    const encodedMessage = encodeURIComponent(notificationMessage);
    const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${closerPhone}&text=${encodedMessage}&apikey=${apiKey}`;

    console.log("Sending WhatsApp notification to closer...");
    
    const response = await fetch(callMeBotUrl);
    const responseText = await response.text();
    
    console.log("CallMeBot response:", responseText);

    if (!response.ok) {
      console.error("CallMeBot error:", responseText);
      return new Response(
        JSON.stringify({ error: "Erro ao enviar notificação", details: responseText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notificação enviada com sucesso" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-whatsapp function:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
