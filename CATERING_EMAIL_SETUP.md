# Catering Enquiry Email Setup

The catering form now submits enquiries to an API endpoint that handles email sending.

## How It Works

1. **Form Submission** → User fills out the catering form
2. **API Submission** → Form data is sent to `/api/catering-enquiry`
3. **Email Sending** → The API sends an email to `amanrao099@gmail.com` (configurable)
4. **User Feedback** → User sees success/error message

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```env
# SMTP Configuration (Optional)
SMTP_HOST=smtp.gmail.com          # Your SMTP server
SMTP_PORT=587                     # SMTP port (25, 465, 587, 993, etc.)
SMTP_USER=your-email@gmail.com    # SMTP username
SMTP_PASS=your-app-password       # SMTP password or app-specific password
SMTP_SECURE=true                  # Use TLS encryption
SMTP_FROM=noreply@gbddoner.com    # From address for emails

# Recipient email for catering enquiries
CATERING_EMAIL_TO=amanrao099@gmail.com
```

### Modes

**1. Development (No SMTP configured)**
- Enquiries are logged to the server console
- Form still shows success message to user
- Good for testing without email setup

**2. Production (SMTP configured)**
- Emails are sent to the configured recipient
- User email address is set as reply-to
- Professional email delivery

## Email Providers

### Gmail (Recommended for testing)
1. Enable 2-factor authentication on your Google account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the app password as `SMTP_PASS`
4. Set `SMTP_USER` to your Gmail address
5. Set `SMTP_HOST=smtp.gmail.com` and `SMTP_PORT=587`

### SendGrid
1. Create a SendGrid account and API key
2. Set `SMTP_HOST=smtp.sendgrid.net`
3. Set `SMTP_PORT=587`
4. Set `SMTP_USER=apikey`
5. Set `SMTP_PASS` to your API key

### Other Providers
- **Mailgun**: Use their SMTP credentials
- **AWS SES**: Configure with your credentials
- **Postmark**: Use their SMTP endpoint

## WordPress Headless Compatibility

✅ This implementation is fully compatible with WordPress headless CMS because:

- **No direct WordPress dependency** - The API route handles everything independently
- **Decoupled architecture** - Form submission doesn't require WordPress to be running
- **REST API ready** - Can be easily integrated with WordPress later
- **Future-proof** - Can switch to WordPress REST endpoint or keep this approach

## Future Changes

To change the recipient email later:
1. Update the `.env.local` file with the new `CATERING_EMAIL_TO` value
2. Restart the development server or redeploy production
3. No code changes needed!

## Testing

1. Fill out the catering form
2. Submit the form
3. Check:
   - Server console for logs (development mode)
   - Email inbox (if SMTP is configured)
   - Browser message for success/error feedback
