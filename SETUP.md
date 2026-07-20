# Installation & Setup Guide

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# MONGODB_URI=your_mongodb_connection_string
# OPENAI_API_KEY=your_openai_api_key
# WEATHER_API_KEY=your_openweathermap_api_key
# JWT_SECRET=your_secret_key

# Start server
npm start
```

Server will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

App will open at `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fashion_assistant
JWT_SECRET=your_secure_secret_key_min_32_chars
OPENAI_API_KEY=sk-your-openai-api-key
WEATHER_API_KEY=your_openweathermap_key
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```
> Note: If MONGODB_URI is not set or MongoDB is unavailable, the backend will start in development mode using in-memory storage for auth and basic app flows. This is useful for local testing, but data will not persist between restarts.


### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Getting API Keys

### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up or login
3. Create new API key
4. Copy and paste in `.env`

### OpenWeatherMap API Key
1. Go to https://openweathermap.org/api
2. Sign up for free tier
3. Generate API key
4. Copy and paste in `.env`

### MongoDB Connection String
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Replace username and password
5. Paste in `.env`

### Gmail SMTP Setup
1. Enable 2-factor authentication on Gmail
2. Generate app password at https://myaccount.google.com/apppasswords
3. Use app password in SMTP_PASS

## Testing the App

### Test Credentials
```
Email: test@example.com
Password: Test123!
```

### Test Photo Analysis
1. Upload any clear face photo
2. App will analyze and provide recommendations
3. Results stored in analysis history

### Test Wardrobe
1. Add sample clothing items
2. System will generate outfit combinations
3. Filter by category

### Test Chat
1. Ask "What should I wear today?"
2. Ask "What hairstyle suits me?"
3. Get personalized fashion advice

## Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env
# Or kill process using port
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -ti:5000 | xargs kill
```

### MongoDB Connection Failed
- Check internet connection
- Verify connection string
- Add your IP to MongoDB whitelist

### CORS Errors
- Ensure CLIENT_URL is correct
- Backend and frontend URLs match

### Photo Upload Issues
- Check file size (max 5MB)
- Ensure JPG, PNG, or GIF format
- Check uploads folder permissions

## Development

### File Structure
- `backend/` - Express server
- `frontend/` - React app
- `uploads/` - User uploaded files

### Database Models
- User
- Analysis
- ClothingItem
- OutfitRecommendation
- ChatConversation
- ChatMessage

### API Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // response data
  }
}
```

### Error Handling
```json
{
  "success": false,
  "message": "Error description"
}
```

## Performance Tips

1. Use MongoDB indexes for faster queries
2. Implement pagination for large datasets
3. Cache weather data (1 hour TTL)
4. Optimize images before upload
5. Use CDN for static assets

## Security Best Practices

1. Never commit `.env` files
2. Use strong JWT secret (32+ characters)
3. Validate all user inputs
4. Use HTTPS in production
5. Implement rate limiting
6. Regular security audits

## Next Steps

1. Customize branding and colors
2. Add additional analysis features
3. Implement advanced filtering
4. Add social sharing
5. Create mobile app version
6. Deploy to production

## Support

For detailed documentation, see:
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
