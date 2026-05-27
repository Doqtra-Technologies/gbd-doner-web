import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getCateringSettings } from "@/data/repositories/site-settings-repository";

/**
 * POST /api/catering-enquiry
 * 
 * Handles catering enquiry form submissions and sends email notifications.
 * 
 * Expected request body:
 * {
 *   name: string
 *   email: string
 *   company?: string
 *   headcount: number
 *   message: string
 * }
 * 
 * Environment variables required:
 * - SMTP_HOST: SMTP server address
 * - SMTP_PORT: SMTP server port
 * - SMTP_USER: SMTP authentication username
 * - SMTP_PASS: SMTP authentication password
 * - CATERING_EMAIL_TO: Recipient email address (default: info@gbddoner.com)
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const { name, email, company, headcount, message } = data;

    if (!name || !email || !headcount || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailContent = `
New Catering Enquiry Received

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Headcount: ${headcount}

Event Details:
${message}

---
This enquiry was submitted from the GBD Doner website.
    `.trim();

    // Recipient priority: WP "Site Settings -> Catering -> Recipient email"
    // -> env CATERING_EMAIL_TO -> hardcoded fallback. This lets the client
    // change where enquiries go from wp-admin without touching env vars.
    const settings = await getCateringSettings();
    const recipientEmail =
      settings.recipientEmail ||
      process.env.CATERING_EMAIL_TO ||
      "info@gbddoner.com";

    // Try to send email if SMTP is configured
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT),
          secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        // Send email to GBD
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: recipientEmail,
          replyTo: email,
          subject: `New Catering Enquiry from ${name}`,
          text: emailContent,
          html: `
            <h2>New Catering Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Headcount:</strong> ${headcount}</p>
            <h3>Event Details:</h3>
            <p>${message.replace(/\n/g, "<br>")}</p>
            <hr>
            <p><em>This enquiry was submitted from the GBD Doner website.</em></p>
          `,
        });

        console.log(`✅ Catering enquiry email sent to ${recipientEmail}`);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Continue anyway - the enquiry is still logged
      }
    } else {
      // Log to console for development
      console.log("📧 Catering Enquiry (SMTP not configured):");
      console.log("To: " + recipientEmail);
      console.log("From:", email);
      console.log("Subject: New Catering Enquiry from", name);
      console.log("Body:", emailContent);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Enquiry received. We'll get back to you shortly." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Catering enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
