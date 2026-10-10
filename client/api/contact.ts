export default async function handler(req: any, res: any) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // keep as is
      }
    }

    const { name, email, subject, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Email service is not configured (RESEND_API_KEY is missing)." });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Generation Aid Contact Form <onboarding@resend.dev>",
        to: ["info@generationaid.org"],
        reply_to: email,
        subject: `[Website Inquiry] ${subject || `New message from ${name}`}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #1e293b; margin: 0 0 4px 0; font-size: 20px;">New Message from Website</h2>
              <p style="color: #64748b; margin: 0; font-size: 13px;">Received via Generation Aid Contact Form</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 120px;"><strong>Sender:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Subject:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${subject || "General Inquiry"}</td>
              </tr>
            </table>

            <div style="margin-top: 16px; padding: 18px; background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 6px;">
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="border-top: 1px solid #e2e8f0; margin-top: 28px; padding-top: 14px; font-size: 12px; color: #94a3b8; text-align: center;">
              Hit <strong>Reply</strong> in your email client to directly email ${name} (${email}).
            </div>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", data);
      return res.status(response.status).json({ error: data.message || "Failed to send email." });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error: unknown) {
    console.error("Contact handler error:", error);
    const message = error instanceof Error ? error.message : "Internal server error.";
    return res.status(500).json({ error: message });
  }
}
