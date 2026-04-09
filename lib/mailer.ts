import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_SERVER || "smtp-relay.brevo.com",
  port: parseInt(process.env.BREVO_SMTP_PORT || "587"),
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"Praja Raksha Central" <${process.env.BREVO_SENDER_EMAIL || "noreply@prajaraksha.gov.in"}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`[MAILER] Message sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[MAILER] Transmission Failure:", error);
    // We don't throw here to prevent crashing the main grievance flow if email fails
    return { success: false, error };
  }
}

export const emailTemplates = {
  complaintAcknowledged: (name: string, trackingId: string, title: string) => ({
    subject: `Grievance Acknowledged: ${trackingId}`,
    html: `
      <div style="font-family: sans-serif; color: #0A1F17; max-width: 600px; padding: 20px; border: 1px solid #E2E8F0; border-radius: 16px;">
        <h2 style="color: #059669;">Praja Raksha Acknowledgment</h2>
        <p>Dear Citizen,</p>
        <p>Your grievance titled <strong>"${title}"</strong> has been successfully received and logged in the state system.</p>
        <div style="background: #F0FDF4; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px;">Tracking ID: <strong style="color: #059669;">${trackingId}</strong></p>
        </div>
        <p>Our intelligent routing engine is currently assigning this to the relevant department. You can track real-time status updates through your dashboard.</p>
        <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748B;">This is an automated notification from the Telangana State Grievance Portal. Please do not reply to this email.</p>
      </div>
    `,
  }),
};
