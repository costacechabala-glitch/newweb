# Style Advisor - AI-Powered Fashion Assistant

A modern, AI-powered fashion assistant application that helps users choose the best outfits, hairstyles, and style combinations based on their unique characteristics and preferences.

## 🎯 Features

### ✅ Core Features Implemented

1. **User Authentication**
   - Sign up and login
   - Email verification
   - Password reset functionality
   - JWT token-based security
   - Protected routes

2. **AI Photo Analysis**
   - Upload and analyze selfies and full-body photos
   - Determine face shape, skin tone, and body shape
   - Outfit analysis and feedback
   - AI-powered style recommendations
   - Analysis history tracking

3. **Outfit Recommendation Engine**
   - Personalized outfit suggestions
   - Consider body shape, skin tone, and preferences
   - Weather-aware recommendations
   - Occasion-based styling
   - Color palette suggestions

4. **Hairstyle Recommendations**
   - AI-generated hairstyle suggestions
   - Based on face shape and personal style
   - Hair color recommendations
   - Celebrity style examples

5. **Wardrobe Management**
   - Upload and organize clothing items
   - Categorize by type (shirts, pants, shoes, etc.)
   - Track brand, color, size, and price
   - Generate outfit combinations from existing wardrobe
   - Delete and update items

6. **Weather-Aware Fashion Intelligence**
   - Integration with OpenWeatherMap API
   - Temperature-based recommendations
   - Weather condition-specific suggestions
   - Humidity and wind considerations

7. **Fashion Chatbot**
   - AI-powered fashion advice
   - Natural language conversations
   - Answer questions about styling
   - Context-aware recommendations
   - Conversation history

8. **Occasion-Based Styling**
   - Wedding, Interview, Party, Office, etc.
   - Formal and casual recommendations
   - Dress code considerations
   - Style-appropriate suggestions

### 🎨 UI/UX

- Modern, minimalist design with luxury aesthetic
- Gold, white, and black color scheme
- Smooth animations and transitions
- Mobile-first responsive design
- Intuitive navigation
- Real-time feedback

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **AI**: OpenAI API (GPT-4 Vision)
- **Weather API**: OpenWeatherMap
- **Email**: Nodemailer

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: CSS3 with gradients and animations
- **File Upload**: React Dropzone
- **Motion**: Framer Motion

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB account (Atlas recommended)
- OpenAI API key
- OpenWeatherMap API key
- Gmail account for email notifications

## 🔧 Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with required variables:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fashion_assistant
JWT_SECRET=your_secret_key_here
OPENAI_API_KEY=your_openai_key_here
WEATHER_API_KEY=your_weather_api_key_here
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CLIENT_URL=http://localhost:3000
```

5. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
style-advisor/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── constants.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── wardrobeController.js
│   │   └── chatController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Analysis.js
│   │   ├── ClothingItem.js
│   │   ├── OutfitRecommendation.js
│   │   └── Chat.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── wardrobeRoutes.js
│   │   └── chatRoutes.js
│   ├── services/
│   │   ├── aiAnalysisService.js
│   │   ├── weatherService.js
│   │   └── outfitRecommendationEngine.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── SignUp.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── PhotoUpload.jsx
    │   │   ├── Wardrobe.jsx
    │   │   ├── Chat.jsx
    │   │   └── Profile.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── context/
    │   │   ├── authStore.js
    │   │   └── profileStore.js
    │   ├── styles/
    │   │   └── global.css
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    ├── package.json
    ├── .env
    └── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/current-user` - Get current user (protected)

### User Profile
- `PUT /api/user/profile` - Update user profile (protected)
- `POST /api/user/analyze-photo` - Upload and analyze photo (protected)
- `GET /api/user/analysis-history` - Get analysis history (protected)
- `POST /api/user/outfit-recommendations` - Get recommendations (protected)
- `GET /api/user/hairstyle-recommendations` - Get hairstyle suggestions (protected)

### Wardrobe
- `POST /api/wardrobe/add-item` - Add clothing item (protected)
- `GET /api/wardrobe` - Get all items (protected)
- `PUT /api/wardrobe/item/:id` - Update item (protected)
- `DELETE /api/wardrobe/item/:id` - Delete item (protected)
- `GET /api/wardrobe/combinations` - Generate combinations (protected)

### Chat
- `POST /api/chat/conversation` - Create conversation (protected)
- `GET /api/chat/conversations` - Get all conversations (protected)
- `POST /api/chat/send-message` - Send message (protected)
- `GET /api/chat/:conversationId` - Get messages (protected)
- `DELETE /api/chat/:conversationId` - Delete conversation (protected)

## 🎨 Frontend Pages

1. **Login & Sign Up** - Authentication pages
2. **Dashboard** - Home page with daily recommendations and weather
3. **Photo Upload** - AI analysis of photos
4. **Wardrobe** - Manage and organize clothing items
5. **Chat** - Fashion chatbot for style advice
6. **Profile** - User settings and preferences

## 🔐 Security Features

- JWT authentication for API endpoints
- Password hashing with bcryptjs
- Email verification
- Password reset with expiring tokens
- Protected routes on frontend
- CORS configuration
- Input validation

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Create account on Heroku or Railway
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Create account on Vercel or Netlify
2. Connect GitHub repository
3. Set REACT_APP_API_URL to backend URL
4. Deploy

## 📊 Future Enhancements

1. **Virtual Try-On** - AR filters for trying outfits
2. **Shopping Integration** - Direct purchase links
3. **Social Features** - Share outfits with friends
4. **Trend Analytics** - Track fashion trends
5. **Video Tutorials** - Styling tips and tutorials
6. **Mobile App** - Native React Native app
7. **Advanced Analytics** - Fashion preferences analysis
8. **Subscription Plans** - Premium features

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check connection string in `.env`
- Ensure IP whitelist includes your IP
- Verify credentials

### OpenAI API Errors
- Check API key validity
- Ensure sufficient API credits
- Check rate limits

### Photo Analysis Fails
- Use clear, well-lit photos
- Ensure image is in supported format (JPG, PNG)
- File size under 5MB

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for fashion enthusiasts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@styleadvisor.com or open an issue in the repository.
