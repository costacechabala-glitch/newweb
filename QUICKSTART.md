# 🚀 Quick Start Guide - Style Advisor

## 5-Minute Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account
- OpenAI API key
- OpenWeatherMap API key

## Step 1: Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend (new terminal)
cd frontend
npm install
```

## Step 2: Configure Environment

### Backend (.env)
```bash
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your_secret_key_32_chars_or_more
OPENAI_API_KEY=sk-your-api-key
WEATHER_API_KEY=your_weather_key
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

## Step 3: Start Servers

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

✅ Backend: http://localhost:5000
✅ Frontend: http://localhost:3000

## Step 4: Test the App

1. **Sign Up**: Create new account
2. **Upload Photo**: Upload selfie for AI analysis
3. **Check Dashboard**: View daily recommendations
4. **Add Wardrobe**: Add clothing items
5. **Chat**: Ask fashion questions

## Common Issues & Solutions

### Port 5000 already in use
```bash
# Change port in backend .env or kill process
lsof -ti:5000 | xargs kill
```

### CORS Error
- Check REACT_APP_API_URL matches backend
- Verify CLIENT_URL in backend .env

### MongoDB Connection Failed
- Verify connection string
- Add IP to MongoDB whitelist
- Check credentials

### OpenAI API Error
- Verify API key
- Check API credits
- Review rate limits

## File Structure Quick Reference

```
Style Advisor/
├── backend/
│   ├── server.js          ← Main server file
│   ├── package.json       ← Dependencies
│   ├── .env               ← Configuration
│   ├── models/            ← Database models
│   ├── controllers/       ← Business logic
│   ├── routes/            ← API routes
│   └── services/          ← AI & Weather
│
└── frontend/
    ├── src/
    │   ├── App.js         ← Main component
    │   ├── index.js       ← Entry point
    │   ├── pages/         ← Page components
    │   ├── services/      ← API client
    │   ├── context/       ← State management
    │   └── styles/        ← CSS files
    ├── package.json
    └── .env
```

## API Testing

### Test Auth
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123","confirmPassword":"pass123"}'
```

### Test Chat
```bash
curl -X POST http://localhost:5000/api/chat/send-message \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"conversationId":"...","message":"What should I wear?"}'
```

## Key Features

✅ AI photo analysis
✅ Outfit recommendations
✅ Wardrobe management
✅ Weather-aware styling
✅ Fashion chatbot
✅ User authentication
✅ Mobile responsive

## Next Steps

1. **Customize**: Edit styles and colors
2. **Extend**: Add more features
3. **Deploy**: Push to production
4. **Scale**: Add more data
5. **Monetize**: Add subscriptions

## Documentation

- **README.md** - Project overview
- **SETUP.md** - Detailed setup
- **ARCHITECTURE.md** - System design
- **DEPLOYMENT.md** - Production guide
- **PROJECT_SUMMARY.md** - Complete features

## Getting Help

1. Check error logs
2. Review documentation
3. Test with sample data
4. Check API responses
5. Review console errors

## Demo Credentials

Use these to test:
```
Email: demo@styleadvisor.com
Password: Demo123!
```

## Tips & Tricks

- Upload clear, well-lit photos
- Provide detailed style preferences
- Explore different occasions
- Try various outfit combinations
- Use wardrobe for best results
- Ask specific questions to chatbot

## Performance Tips

- Clear browser cache
- Close unused tabs
- Check internet speed
- Update dependencies
- Monitor API usage

## Useful Commands

```bash
# Check logs
heroku logs -t

# View database
mongosh your_connection_string

# Test API
curl -X GET http://localhost:5000/api/health

# Build production
npm run build

# Deploy to Vercel
vercel
```

## Troubleshooting Checklist

- [ ] Node.js installed (node --version)
- [ ] MongoDB connection string correct
- [ ] OpenAI API key valid
- [ ] .env files configured
- [ ] Ports not in use
- [ ] Dependencies installed
- [ ] Backend running
- [ ] Frontend running
- [ ] No console errors
- [ ] API responding

## Ready? Let's Go! 🎉

Your AI Fashion Assistant is ready to transform the way people style themselves!

Questions? Check the documentation or review the code comments.

Happy coding! 👔👗👠
