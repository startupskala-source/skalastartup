import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TelegramMessageRequest {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  customAnswers?: Record<string, string>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const rawChatId = Deno.env.get("TELEGRAM_CHAT_ID");

    // Normalize secrets (common mistakes: saving token with "bot" prefix or with quotes)
    const TELEGRAM_BOT_TOKEN = rawToken
      ?.trim()
      .replace(/^bot/i, "")
      .trim()
      .replace(/^["']+|["']+$/g, "");

    const TELEGRAM_CHAT_ID = rawChatId?.trim().replace(/^["']+|["']+$/g, "");

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram credentials", {
        hasToken: Boolean(TELEGRAM_BOT_TOKEN),
        hasChatId: Boolean(TELEGRAM_CHAT_ID),
      });
      throw new Error("Telegram credentials not configured");
    }

    console.log("Telegram credentials loaded", {
      tokenPrefix: TELEGRAM_BOT_TOKEN.slice(0, 6) + "...",
      chatId: TELEGRAM_CHAT_ID,
    });

    const { name, email, phone, date, time, customAnswers }: TelegramMessageRequest = await req.json();

    console.log("Received booking request:", { name, email, phone, date, time });

    // Format custom answers for the message
    let customAnswersText = "";
    if (customAnswers && Object.keys(customAnswers).length > 0) {
      customAnswersText = "\n\n📋 *Informações Adicionais:*\n";
      for (const [question, answer] of Object.entries(customAnswers)) {
        customAnswersText += `• ${question}: ${answer}\n`;
      }
    }

    // Create the Telegram message
    const message = `
🗓️ *Nova Reserva de Reunião!*

👤 *Nome:* ${name}
📧 *Email:* ${email}
📱 *Telefone:* ${phone || "Não informado"}
📅 *Data:* ${date}
⏰ *Horário:* ${time}${customAnswersText}

---
_Agendamento realizado via Skala_
    `.trim();

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const telegramResult = await telegramResponse.json();
    console.log("Telegram API response:", telegramResult);

    if (!telegramResponse.ok) {
      throw new Error(`Telegram API error: ${JSON.stringify(telegramResult)}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notificação enviada com sucesso!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-telegram function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
