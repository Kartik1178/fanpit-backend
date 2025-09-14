# OTP Setup Guide

This guide explains how to set up email and SMS OTP verification for the Fanpit Spaces application.

## Email Configuration

### Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update Environment Variables**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### Alternative Email Services

For production, consider using:
- **SendGrid**: Professional email service
- **AWS SES**: Amazon's email service
- **Mailgun**: Developer-friendly email API

Update the `initializeEmailTransporter()` method in `otp.service.ts` accordingly.

## SMS Configuration (Optional)

### Twilio Setup

1. **Create a Twilio Account** at [twilio.com](https://twilio.com)
2. **Get your credentials**:
   - Account SID
   - Auth Token
   - Phone Number

3. **Update Environment Variables**:
   ```env
   TWILIO_ACCOUNT_SID=your-account-sid
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

## Installation

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Start the Backend**:
   ```bash
   npm run start:dev
   ```

## Testing

### Test Email OTP

1. **Start the application**
2. **Go to signup page**
3. **Fill in registration form**
4. **Check your email** for the 6-digit OTP
5. **Enter the OTP** to complete registration

### Test SMS OTP (if configured)

The SMS OTP functionality is available but requires Twilio configuration. The frontend can be extended to support SMS verification.

## API Endpoints

### OTP Endpoints

- `POST /otp/send-email` - Send OTP to email
- `POST /otp/send-sms` - Send OTP to phone
- `POST /otp/verify` - Verify OTP
- `POST /otp/resend` - Resend OTP

### Registration Endpoints

- `POST /users/register/initiate` - Start registration with OTP
- `POST /users/register/complete` - Complete registration with OTP verification
- `POST /users/register` - Legacy registration (without OTP)

## Security Features

- **OTP Expiry**: 10 minutes
- **Rate Limiting**: Built-in protection against spam
- **Secure Storage**: OTPs are hashed and stored securely
- **Cleanup**: Expired OTPs are automatically removed

## Troubleshooting

### Email Not Sending

1. **Check Gmail App Password**: Ensure you're using the correct 16-character app password
2. **Check 2FA**: Make sure 2-factor authentication is enabled
3. **Check Environment Variables**: Verify EMAIL_USER and EMAIL_PASS are set correctly

### OTP Not Working

1. **Check OTP Expiry**: OTPs expire after 10 minutes
2. **Check Database**: Ensure MongoDB is running and accessible
3. **Check Logs**: Look for error messages in the console

### SMS Issues

1. **Check Twilio Configuration**: Verify all Twilio credentials
2. **Check Phone Format**: Use international format (+1234567890)
3. **Check Twilio Balance**: Ensure your Twilio account has sufficient balance

## Production Considerations

1. **Use Professional Email Service**: Don't use Gmail for production
2. **Implement Rate Limiting**: Add additional rate limiting for OTP endpoints
3. **Monitor Usage**: Track OTP usage and costs
4. **Backup Strategy**: Implement backup verification methods
5. **Security Audit**: Regular security reviews of OTP implementation

