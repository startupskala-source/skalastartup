import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailNotificationRequest {
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
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY");
      return new Response(
        JSON.stringify({
          success: false,
          error: "RESEND_API_KEY não configurada. Configure a chave da API do Resend.",
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, phone, date, time, customAnswers }: EmailNotificationRequest = await req.json();

    console.log("Received booking notification request:", { name, email, phone, date, time });

    // Format custom answers for the email
    let customAnswersHtml = "";
    if (customAnswers && Object.keys(customAnswers).length > 0) {
      customAnswersHtml = `
        <h3 style="color: #374151; margin-top: 20px;">Informações Adicionais:</h3>
        <ul style="list-style: none; padding: 0;">
          ${Object.entries(customAnswers)
            .map(([question, answer]) => `<li style="margin-bottom: 8px;"><strong>${question}:</strong> ${answer}</li>`)
            .join("")}
        </ul>
      `;
    }

    // Send notification email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nova Reserva de Reunião</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🗓️ Nova Reserva de Reunião</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; margin-top: 0;">Detalhes do Agendamento</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>👤 Nome:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>📧 Email:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>📱 Telefone:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${phone || "Não informado"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>📅 Data:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;"><strong>⏰ Horário:</strong></td>
                  <td style="padding: 10px 0;">${time}</td>
                </tr>
              </table>
              
              ${customAnswersHtml}
            </div>
            
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
              Agendamento realizado via Skala
            </p>
          </div>
        </body>
      </html>
    `;

    // Send confirmation email to customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmação de Agendamento</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">✅ Agendamento Confirmado!</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="font-size: 16px;">Olá <strong>${name}</strong>,</p>
            
            <p>Seu agendamento foi confirmado com sucesso!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
              <p style="margin: 0 0 10px 0;"><strong>📅 Data:</strong> ${date}</p>
              <p style="margin: 0;"><strong>⏰ Horário:</strong> ${time}</p>
            </div>
            
            <p>Entraremos em contato em breve para mais detalhes.</p>
            
            <p style="margin-top: 30px;">Atenciosamente,<br><strong>Equipe Skala</strong></p>
          </div>
        </body>
      </html>
    `;

    // Send emails using Resend API directly via fetch
    const sendEmail = async (to: string[], subject: string, html: string) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Skala <onboarding@resend.dev>",
          to,
          subject,
          html,
        }),
      });
      return response.json();
    };

    // Send both emails
    console.log("Sending customer confirmation email...");
    const customerEmailResponse = await sendEmail(
      [email],
      "✅ Seu agendamento foi confirmado!",
      customerEmailHtml
    );
    console.log("Customer email response:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notificação por email enviada com sucesso!",
        customerEmail: customerEmailResponse,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Unexpected error in send-email-notification function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Erro ao enviar email: ${error.message}` 
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
