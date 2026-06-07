import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/subscribe
 * 
 * Handles newsletter subscription / club signups and sends email notifications.
 * 
 * Expected request body:
 * {
 *   email: string
 * }
 * 
 * Environment variables:
 * - SMTP_HOST: SMTP server address
 * - SMTP_PORT: SMTP server port
 * - SMTP_USER: SMTP authentication username
 * - SMTP_PASS: SMTP authentication password
 * - CATERING_EMAIL_TO: Recipient email address for notifications (default: info@gbddoner.com)
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email } = data;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
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

    const recipientEmail = process.env.CATERING_EMAIL_TO || "info@gbddoner.com";

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

        // Send notification email to admin/owner
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: recipientEmail,
          replyTo: email,
          subject: `New Newsletter Subscription: ${email}`,
          text: `A new user has signed up for the GBD Club on the Our Story page.\n\nSubscriber Email: ${email}`,
          html: `
            <h2>New Newsletter Subscription</h2>
            <p>A new user has signed up for the GBD Club on the Our Story page.</p>
            <p><strong>Subscriber Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr>
            <p><em>This subscription was submitted from the Our Story page on the GBD Doner website.</em></p>
          `,
        });

        // Send welcome email to the subscriber
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: email,
          subject: "Welcome to the GBD Club!",
          text: "Thank you for joining the Great British Doner Club! You're now on the list for exclusive drops and secret menu items.",
          html: `
            <h2>Welcome to the GBD Club!</h2>
            <p>Thank you for joining the Great British Doner Club.</p>
            <p>You're now on the list for exclusive access to seasonal drops, secret menu items, and fuel-focused content delivered weekly.</p>
            <p><strong>Stay tuned!</strong></p>
          `,
        });

        console.log(`✅ Newsletter subscription email sent to ${recipientEmail} and welcome email sent to ${email}`);
      } catch (emailError) {
        console.error("Email sending failed for subscription:", emailError);
        // Continue anyway - client gets success response
      }
    } else {
      // Log to console for development
      console.log("📧 Newsletter Subscription (SMTP not configured):");
      console.log("To:", recipientEmail);
      console.log("Subscriber:", email);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you for joining the club! You've been successfully subscribed." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again later." },
      { status: 500 }
    );
  }
}
