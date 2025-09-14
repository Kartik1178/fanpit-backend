# Render Deployment Guide

## Quick Deployment Steps

### 1. Environment Variables to Set in Render Dashboard

Go to your Render service dashboard and add these environment variables:

```
NODE_ENV=production
PORT=10000
MONGO_URI=<will be auto-provided by Render MongoDB>
JWT_SECRET=<generate a strong secret>
RAZOR_PAY_ID=rzp_test_RH4FRwCMZt7jUJ
RAZOR_PAY_PASS=f22GuE0IQ0KmRat4lKte9M1L
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 2. Deployment Configuration

The `render.yaml` file is already configured with:
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Free tier MongoDB database
- All necessary environment variables

### 3. Manual Deployment Steps

1. **Push to GitHub**: Make sure your code is pushed to GitHub
2. **Connect to Render**: 
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as root directory
3. **Configure Service**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: `Node`
4. **Add Environment Variables**: Use the list above
5. **Deploy**: Click "Create Web Service"

### 4. Database Setup

After deployment, you'll need to:
1. Run the seed scripts to populate your database
2. Connect to your Render MongoDB instance
3. Run: `npm run seed:users` and `npm run seed:brands`

### 5. Update Frontend

Update your frontend's API URL to point to your Render backend URL:
```
NEXT_PUBLIC_API_URL=https://your-app-name.onrender.com
```

## Troubleshooting

- If build fails, check the build logs in Render dashboard
- Ensure all environment variables are set correctly
- MongoDB connection string will be automatically provided by Render
- Port should be set to 10000 for Render's free tier
