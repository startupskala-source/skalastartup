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
  testMode?: boolean;
}

interface TelegramErrorResponse {
  success: false;
  stage: "getMe" | "sendMessage";
  error: string;
  telegram_error_code?: number;
  telegram_description?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const rawChatId = Deno.env.get("TELEGRAM_CHAT_ID");

    // Strong normalization: remove ALL whitespace (including newlines), quotes, and "bot" prefix
    const TELEGRAM_BOT_TOKEN = rawToken
      ?.replace(/\s+/g, "") // Remove all whitespace including newlines
      .replace(/^["']+|["']+$/g, "") // Remove surrounding quotes
      .replace(/^bot/i, ""); // Remove "bot" prefix if present

    const TELEGRAM_CHAT_ID = rawChatId
      ?.replace(/\s+/g, "") // Remove all whitespace
      .replace(/^["']+|["']+$/g, ""); // Remove surrounding quotes

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram credentials", {
        hasToken: Boolean(TELEGRAM_BOT_TOKEN),
        hasChatId: Boolean(TELEGRAM_CHAT_ID),
      });
      return new Response(
        JSON.stringify({
          success: false,
          stage: "getMe",
          error: "Credenciais do Telegram não configuradas. Configure TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID.",
        } as TelegramErrorResponse),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Telegram credentials loaded", {
      tokenLength: TELEGRAM_BOT_TOKEN.length,
      tokenPrefix: TELEGRAM_BOT_TOKEN.slice(0, 8) + "...",
      chatId: TELEGRAM_CHAT_ID,
    });

    // Step 1: Validate token with getMe
    console.log("Validating token with getMe...");
    const getMeUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`;
    const getMeResponse = await fetch(getMeUrl);
    const getMeResult = await getMeResponse.json();
    
    console.log("getMe response:", getMeResult);

    if (!getMeResult.ok) {
      const errorResponse: TelegramErrorResponse = {
        success: false,
        stage: "getMe",
        error: getMeResult.error_code === 404 
          ? "Token inválido ou revogado. Gere um novo token com @BotFather e atualize nas configurações."
          : `Erro ao validar token: ${getMeResult.description}`,
        telegram_error_code: getMeResult.error_code,
        telegram_description: getMeResult.description,
      };
      console.error("Token validation failed:", errorResponse);
      return new Response(
        JSON.stringify(errorResponse),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Token válido! Bot: @${getMeResult.result.username}`);

    const { name, email, phone, date, time, customAnswers, testMode }: TelegramMessageRequest = await req.json();

    console.log("Received booking request:", { name, email, phone, date, time, testMode });

    // Format custom answers for the message
    let customAnswersText = "";
    if (customAnswers && Object.keys(customAnswers).length > 0) {
      customAnswersText = "\n\n📋 *Informações Adicionais:*\n";
      for (const [question, answer] of Object.entries(customAnswers)) {
        customAnswersText += `• ${question}: ${answer}\n`;
      }
    }

    // Create the Telegram message
    let message: string;
    if (testMode) {
      message = `
🧪 *Teste de Conexão Telegram*

✅ A integração está funcionando corretamente!
🤖 Bot: @${getMeResult.result.username}
📅 Data do teste: ${date}
⏰ Horário: ${time}

---
_Mensagem de teste via Skala_
      `.trim();
    } else {
      message = `
🗓️ *Nova Reserva de Reunião!*

👤 *Nome:* ${name}
📧 *Email:* ${email}
📱 *Telefone:* ${phone || "Não informado"}
📅 *Data:* ${date}
⏰ *Horário:* ${time}${customAnswersText}

---
_Agendamento realizado via Skala_
      `.trim();
    }

    // Step 2: Send message to Telegram
    console.log("Sending message to chat:", TELEGRAM_CHAT_ID);
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
    console.log("sendMessage response:", telegramResult);

    if (!telegramResult.ok) {
      let errorMessage = telegramResult.description || "Erro desconhecido";
      
      // Friendly error messages for common issues
      if (telegramResult.error_code === 400 && errorMessage.includes("chat not found")) {
        errorMessage = "Chat não encontrado. Verifique se o TELEGRAM_CHAT_ID está correto e se você enviou /start para o bot.";
      } else if (telegramResult.error_code === 403) {
        errorMessage = "Bot bloqueado ou sem permissão. Desbloqueie o bot ou verifique as permissões do grupo/canal.";
      }

      const errorResponse: TelegramErrorResponse = {
        success: false,
        stage: "sendMessage",
        error: errorMessage,
        telegram_error_code: telegramResult.error_code,
        telegram_description: telegramResult.description,
      };
      console.error("sendMessage failed:", errorResponse);
      return new Response(
        JSON.stringify(errorResponse),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Message sent successfully!");
    return new Response(
      JSON.stringify({ success: true, message: "Notificação enviada com sucesso!" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Unexpected error in send-telegram function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        stage: "sendMessage",
        error: `Erro inesperado: ${error.message}` 
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
