import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/franchise-enquiry
 * 
 * Handles franchise enquiry form submissions and sends email notifications.
 * 
 * Expected request body:
 * {
 *   firstName: string
 *   lastName: string
 *   phone: string
 *   email: string
 *   location: string
 *   investmentAmount: string
 *   message?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const { firstName, lastName, phone, email, location, investmentAmount, message } = data;

    if (!firstName || !lastName || !phone || !email || !location || !investmentAmount) {
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
New Franchise Enquiry Received

Name: ${firstName} ${lastName}
Phone: ${phone}
Email: ${email}
Location: ${location}
Available Investment: ${investmentAmount}

Additional Info / Message:
${message || "Not provided"}

---
This enquiry was submitted from the GBD Doner website Franchise page.
    `.trim();

    const recipientEmail =
      process.env.FRANCHISE_EMAIL_TO ||
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
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        // Send email
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: recipientEmail,
          replyTo: email,
          subject: `New Franchise Enquiry from ${firstName} ${lastName}`,
          text: emailContent,
          html: `
            <h2>New Franchise Enquiry</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Available Investment Amount:</strong> ${investmentAmount}</p>
            <h3>Additional Info / Message:</h3>
            <p>${(message || "Not provided").replace(/\n/g, "<br>")}</p>
            <hr>
            <p><em>This enquiry was submitted from the GBD Doner website Franchise page.</em></p>
          `,
        });

        console.log(`✅ Franchise enquiry email sent to ${recipientEmail}`);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    } else {
      // Log to console for development
      console.log("📧 Franchise Enquiry (SMTP not configured):");
      console.log("To: " + recipientEmail);
      console.log("From:", email);
      console.log("Subject: New Franchise Enquiry from", `${firstName} ${lastName}`);
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
    console.error("Franchise enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
