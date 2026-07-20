# Complete Project Architecture & Features

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                               │
│                   (React Frontend)                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Auth Pages   │  │ Dashboard    │  │ Analysis     │           │
│  │ - Login      │  │ - Home       │  │ - Upload     │           │
│  │ - SignUp     │  │ - Weather    │  │ - Results    │           │
│  │ - Profile    │  │ - Quick View │  │ - History    │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Wardrobe     │  │ Chat         │  │ Components   │           │
│  │ - Add Items  │  │ - Messages   │  │ - Header     │           │
│  │ - View Items │  │ - Bot        │  │ - Navigation │           │
│  │ - Filter     │  │ - History    │  │ - Cards      │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                            ↓
              ┌─────────────────────────────┐
              │   API Layer (Axios)         │
              │  - Authentication           │
              │  - Request Interceptors     │
              │  - Response Handling        │
              │  - Error Management         │
              └─────────────────────────────┘
                            ↓
        ┌─────────────────────────────────────────┐
        │    State Management (Zustand)           │
        │  ┌──────────────────────────────────┐   │
        │  │ Auth Store                       │   │
        │  │ - User info                      │   │
        │  │ - Token                          │   │
        │  │ - Login/Logout actions           │   │
        │  └──────────────────────────────────┘   │
        │  ┌──────────────────────────────────┐   │
        │  │ Profile Store                    │   │
        │  │ - User profile                   │   │
        │  │ - Analysis history               │   │
        │  │ - Preferences                    │   │
        │  └──────────────────────────────────┘   │
        └─────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY (Express)                       │
│                    (Backend Server)                              │
├─────────────────────────────────────────────────────────────────┤
│  Authentication  │  User Routes  │  Wardrobe Routes │  Chat    │
│  - signup        │  - updateProf │  - addItem       │ - create │
│  - login         │  - analyze    │  - getWardrobe   │ - send   │
│  - verify        │  - recommend  │  - deleteItem    │ - delete │
│  - reset         │  - hairstyle  │  - combine       │          │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │ AI Analysis    │  │ Weather      │  │ Outfit              │ │
│  │ Service        │  │ Service      │  │ Recommendation      │ │
│  │                │  │              │  │ Engine              │ │
│  │ - Face analysis│  │ - Get weather│  │                     │ │
│  │ - Body shape   │  │ - Recommend  │  │ - Generate outfits  │ │
│  │ - Skin tone    │  │ - Cache data │  │ - Score             │ │
│  │ - Outfit check │  │              │  │ - Filter            │ │
│  │ - Hairstyle    │  │              │  │                     │ │
│  └────────────────┘  └──────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ User Model   │  │ Analysis     │  │ Clothing     │           │
│  │              │  │ Model        │  │ Item Model   │           │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤           │
│  │ id, email    │  │ id, userId   │  │ id, userId   │           │
│  │ name, pass   │  │ image, type  │  │ name, categ  │           │
│  │ preferences  │  │ analysis     │  │ color, price │           │
│  │ physical     │  │ scores       │  │ occasion     │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│  ┌──────────────┐  ┌──────────────┐                             │
│  │ Outfit       │  │ Chat         │                             │
│  │ Recommend    │  │ Models       │                             │
│  │ Model        │  │              │                             │
│  ├──────────────┤  ├──────────────┤                             │
│  │ id, userId   │  │ conversationId                             │
│  │ items        │  │ messages     │                             │
│  │ occasion     │  │ sender       │                             │
│  │ feedback     │  │ timestamp    │                             │
│  └──────────────┘  └──────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │ OpenAI API     │  │ OpenWeather  │  │ MongoDB Atlas       │ │
│  │ - GPT-4 Vision │  │ - Real-time  │  │ - Data Storage      │ │
│  │ - Completion   │  │ - Forecast   │  │ - Queries           │ │
│  │ - Chat         │  │ - Location   │  │ - Backups           │ │
│  └────────────────┘  └──────────────┘  └─────────────────────┘ │
│  ┌────────────────────┐                                         │
│  │ Email Service      │                                         │
│  │ (Gmail SMTP)       │                                         │
│  │ - Verification     │                                         │
│  │ - Password Reset   │                                         │
│  │ - Notifications    │                                         │
│  └────────────────────┘                                         │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### User Registration & Login Flow
```
User Input → Form Validation → API Request 
    ↓
Backend Validation → Password Hashing → DB Save
    ↓
JWT Token Generation → Response to Frontend
    ↓
Token Storage → State Update → Redirect to Dashboard
```

### Photo Analysis Flow
```
User Selects Photo → Preview → Submit
    ↓
Multer Upload → Save to Uploads Folder
    ↓
OpenAI Vision API → Image Analysis
    ↓
Face Shape + Skin Tone + Body Shape Detection
    ↓
Save Analysis to DB → Generate Recommendations
    ↓
Return Results → Display to User → Save in History
```

### Outfit Recommendation Flow
```
User Requests Outfit → Get User Profile
    ↓
Fetch Weather Data → Get Current Weather
    ↓
Outfit Engine Processing:
  - Consider body shape
  - Check skin tone
  - Apply weather rules
  - Filter by preferences
    ↓
Generate Outfit Options → Score by compatibility
    ↓
Return Best Matches → Display with Styling Tips
```

## Feature Specifications

### 1. Authentication Module

**Sign Up**
- Email validation (RFC compliant)
- Password strength check (min 6 chars)
- Confirmation password match
- Auto email verification link send
- JWT token generation
- Token stored in localStorage

**Login**
- Email/password validation
- Password comparison with bcrypt
- Session creation
- Token refresh logic
- Auto redirect on successful login

**Password Reset**
- Email verification
- Reset token generation (32 bytes)
- Token expiration (30 minutes)
- Password update via token
- Email notification

### 2. Photo Analysis Module

**Upload Interface**
- Drag-and-drop upload
- File type validation (JPG, PNG, GIF)
- File size limit (5MB)
- Image preview before upload
- Progress indication

**Analysis Types**
- Full Body: Complete assessment
- Face Only: Facial features focus
- Outfit: Current outfit analysis

**AI Analysis Output**
- Face shape detection with confidence
- Skin tone classification
- Body shape identification
- Height proportions
- Outfit compatibility score
- Personalized recommendations
- Avoidance suggestions

### 3. Recommendation Engine

**Algorithm Factors**
```javascript
score = (
  bodyShapeMatch * 0.3 +
  colorMatch * 0.25 +
  weatherSuitability * 0.2 +
  occasionMatch * 0.15 +
  userPreferences * 0.1
)
```

**Recommendation Types**
- Top recommendations (shirts, blouses, t-shirts)
- Bottom recommendations (pants, skirts, shorts)
- Footwear (formal, casual, sporty)
- Outerwear (jackets, cardigans, sweaters)
- Accessories (jewelry, bags, scarves)
- Complete outfits (coordinated combinations)

### 4. Wardrobe Management

**Item Properties**
```javascript
{
  name: "Navy Blue Blazer",
  category: "jackets",
  color: "Navy",
  brand: "Hugo Boss",
  size: "M",
  price: 150,
  occasions: ["office", "formal"],
  styles: ["business", "classic"],
  condition: "good",
  image: "path/to/image",
  tags: ["work", "versatile"],
  dateAdded: new Date()
}
```

**Features**
- Bulk import from closet photos
- Duplicate detection
- Auto-tagging system
- Conditional cleaning reminders
- Depreciation tracking
- Trending item alerts

### 5. Weather Integration

**Data Points**
- Current temperature
- Feels-like temperature
- Humidity percentage
- Wind speed
- Weather conditions
- UV index
- Pressure
- Visibility

**Recommendation Rules**

Temperature-based:
```
< 0°C   → Heavy winter wear
0-10°C  → Winter jacket + layers
10-20°C → Light jacket + layers
20-25°C → Light clothing
> 25°C  → Minimal, breathable wear
```

Humidity-based:
```
> 70%   → Breathable fabrics (cotton, linen)
          Avoid heavy wool
          Light colors
< 30%   → Normal recommendations
```

Weather condition-based:
```
Rainy   → Waterproof jacket
          Dark colors
          Closed shoes
Sunny   → Hat, sunglasses
          Light colors
          Sunscreen reminder
Snowy   → Heavy insulation
          Boots
          Multiple layers
```

### 6. Fashion Chatbot

**Capabilities**
- Answer fashion questions
- Provide styling advice
- Suggest outfit combinations
- Recommend stores/brands
- Explain color theory
- Hair/makeup tips
- Current trend discussions

**Example Interactions**
```
Q: What should I wear today?
A: [Based on weather, body type, preferences]

Q: What matches these shoes?
A: [Suggests complementary outfits]

Q: What hairstyle suits me?
A: [Based on face shape, hair type]

Q: Is this color good for me?
A: [Based on skin tone analysis]
```

**Context Awareness**
- Remembers user preferences
- References profile data
- Considers previous recommendations
- Learns from feedback

## API Endpoints Reference

### Authentication (11 endpoints)
```
POST   /api/auth/signup              - Create account
POST   /api/auth/login               - Login user
GET    /api/auth/verify-email/:token - Verify email
POST   /api/auth/forgot-password     - Request reset
POST   /api/auth/reset-password/:t   - Reset password
GET    /api/auth/current-user        - Get profile
```

### User Management (6 endpoints)
```
PUT    /api/user/profile             - Update profile
POST   /api/user/analyze-photo       - Analyze photo
GET    /api/user/analysis-history    - Get history
POST   /api/user/outfit-recs         - Get outfits
GET    /api/user/hairstyle-recs      - Get hairstyles
```

### Wardrobe (5 endpoints)
```
POST   /api/wardrobe/add-item        - Add item
GET    /api/wardrobe                 - Get items
PUT    /api/wardrobe/item/:id        - Update item
DELETE /api/wardrobe/item/:id        - Delete item
GET    /api/wardrobe/combinations    - Get combos
```

### Chat (5 endpoints)
```
POST   /api/chat/conversation        - Create chat
GET    /api/chat/conversations       - Get chats
POST   /api/chat/send-message        - Send message
GET    /api/chat/:id                 - Get messages
DELETE /api/chat/:id                 - Delete chat
```

## Performance Metrics

### Frontend
- Initial Load: < 3 seconds
- Time to Interactive: < 5 seconds
- Lighthouse Score: 80+
- Bundle Size: < 500KB gzipped

### Backend
- Response Time: < 200ms average
- Database Query Time: < 100ms
- API Rate Limit: 100 requests/minute
- Uptime: 99.9%

## Security Measures

1. **Authentication**
   - bcryptjs password hashing
   - JWT token-based auth
   - Token expiration (30 days)
   - Refresh token mechanism

2. **Data Protection**
   - HTTPS/TLS encryption
   - Database encryption at rest
   - Secure password reset tokens
   - Email verification

3. **Access Control**
   - Role-based access control
   - Protected API endpoints
   - User data isolation
   - Admin-only endpoints

4. **Input Validation**
   - Server-side validation
   - Sanitization of user inputs
   - File type verification
   - Size limits

## Error Handling

### Frontend
- User-friendly error messages
- Automatic retry logic
- Fallback UI states
- Loading skeletons
- Toast notifications

### Backend
- Centralized error handler
- Detailed error logging
- Meaningful HTTP status codes
- Error recovery strategies
- Database connection retry

## Monitoring & Analytics

### Metrics Tracked
- User engagement
- Feature usage
- Error rates
- Response times
- API call volumes
- User retention
- Feature adoption

### Tools Used
- Server logs
- Error tracking
- Performance monitoring
- Analytics dashboard

---

This comprehensive architecture ensures scalability, maintainability, and optimal user experience across all aspects of the Style Advisor application.
