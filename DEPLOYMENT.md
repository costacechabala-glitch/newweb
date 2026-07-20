# Deployment Guide

## Backend Deployment (Heroku/Railway)

### Option 1: Heroku

1. **Install Heroku CLI**
```bash
# Windows: Download from https://devcenter.heroku.com/articles/heroku-cli
# Mac: brew tap heroku/brew && brew install heroku
# Linux: curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
cd backend
heroku create style-advisor-api
```

4. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret_key
heroku config:set OPENAI_API_KEY=your_openai_key
heroku config:set WEATHER_API_KEY=your_weather_key
heroku config:set SMTP_USER=your_email
heroku config:set SMTP_PASS=your_app_password
heroku config:set CLIENT_URL=https://your-frontend-url
```

5. **Deploy**
```bash
git push heroku main
```

6. **View Logs**
```bash
heroku logs --tail
```

### Option 2: Railway

1. **Sign Up** at https://railway.app
2. **Connect GitHub** repository
3. **Create New Project**
4. **Select Backend Folder**
5. **Add Environment Variables** in dashboard
6. **Deploy** - automatic on push to main

## Frontend Deployment

### Option 1: Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Go to https://vercel.com**
3. **Import Project** from GitHub
4. **Select Frontend Folder**
5. **Set Environment Variables**
   - REACT_APP_API_URL = https://your-backend-url/api
6. **Deploy**

### Option 2: Netlify

1. **Build Frontend**
```bash
cd frontend
npm run build
```

2. **Drag & Drop Build Folder** to https://app.netlify.com
3. **Or Connect GitHub** for automatic deployments
4. **Set Build Command**: npm run build
5. **Set Publish Directory**: build

## Database Setup (MongoDB Atlas)

1. **Create Account** at https://www.mongodb.com/cloud/atlas
2. **Create Cluster** (Free tier available)
3. **Create Database User**
4. **Add IP Whitelist**
5. **Get Connection String**
6. **Add to Backend .env**

## Email Configuration (Gmail)

For production email notifications:

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password
3. Use in SMTP_PASS
4. Configure SMTP settings in backend

## Domain Setup

### Custom Domain for Backend
1. Get domain from GoDaddy, Namecheap, etc.
2. Point to Heroku/Railway
3. Update `CLIENT_URL` in backend env

### Custom Domain for Frontend
1. Add domain to Vercel/Netlify settings
2. Update DNS records
3. Enable SSL/TLS

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install --prefix backend
      - run: npm run build --prefix frontend
      - run: git push heroku main
```

## SSL Certificate

- Heroku: Automatic
- Railway: Automatic
- Vercel: Automatic
- Netlify: Automatic
- Self-hosted: Use Let's Encrypt

## Monitoring & Analytics

### Backend Monitoring
- Use Sentry for error tracking
- Set up LogRocket for session replay
- Monitor API performance

### Frontend Analytics
- Add Google Analytics
- Use Mixpanel for user tracking
- Monitor user behavior

## Performance Optimization

### Backend
1. Enable GZIP compression
2. Add caching headers
3. Implement rate limiting
4. Use database indexes
5. Optimize queries

### Frontend
1. Code splitting
2. Image optimization
3. Lazy loading
4. Minification
5. CDN for assets

## Scaling Strategy

### Database
- Use MongoDB Atlas auto-scaling
- Implement sharding for large data
- Regular backups

### Backend
- Horizontal scaling with load balancer
- Use queue for async tasks
- Cache frequently accessed data

### Frontend
- CDN distribution
- Cloudflare integration
- Service workers

## Security Checklist

- [ ] Enable HTTPS everywhere
- [ ] Set strong passwords
- [ ] Enable two-factor authentication
- [ ] Regular security audits
- [ ] Update dependencies
- [ ] Use environment variables
- [ ] Implement rate limiting
- [ ] Set CORS properly
- [ ] Use secure headers
- [ ] Regular backups

## Troubleshooting Deployment

### Build Fails on Heroku
```bash
heroku logs --tail
# Check logs and fix errors
```

### Environment Variables Not Set
```bash
heroku config
# List all variables
```

### Cold Start Issues
- Use hobby tier or higher
- Optimize code loading
- Use connection pooling

### Memory Issues
```bash
heroku ps:type standard-1x
# Upgrade dyno type
```

## Rollback

### Heroku
```bash
heroku releases
heroku rollback
```

### Vercel
- Use Deployment History tab
- Click Redeploy on previous version

## Maintenance

### Regular Updates
- Update dependencies monthly
- Security patches immediately
- Monitor for vulnerabilities

### Backups
- MongoDB Atlas auto-backup
- Regular database exports
- Version control with Git

### Monitoring
- Check server status
- Review error logs
- Monitor performance metrics

## Cost Estimation

### Development
- Free tier: $0/month
- MongoDB Atlas: $0
- OpenAI: Pay per use (~$5-50)
- Weather API: Free tier

### Production
- Heroku: $7-50+/month
- MongoDB Atlas: $57+/month
- Vercel: Free or $20+
- OpenAI: $10-100+/month
- **Total**: ~$100-200/month

## Useful Commands

```bash
# Check deployment status
git log --oneline | head -5

# View live logs
heroku logs -t

# SSH into dyno
heroku ps:exec -d web

# Database backup
mongobackup --uri="your_uri"

# Environment check
heroku config
```

## Support & Documentation

- Heroku: https://devcenter.heroku.com
- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs
- MongoDB: https://docs.mongodb.com
- Express: https://expressjs.com
- React: https://react.dev

---

**Note**: Always test deployments in staging environment first!
