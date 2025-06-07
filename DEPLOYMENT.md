# 🚀 Deployment Guide

This guide covers deploying the Light Switch Puzzle to various hosting platforms.

## 📋 Pre-deployment Checklist

- [ ] Run `npm run build` locally to ensure no build errors
- [ ] Run `npm run lint` to check for code quality issues
- [ ] Run `npm run type-check` to verify TypeScript types
- [ ] Test the production build with `npm run preview`
- [ ] Verify all game features work correctly
- [ ] Check responsive design on different screen sizes

## 🌐 Platform Deployment

### Vercel (Recommended)

Vercel is the easiest platform for Next.js deployment:

1. **Install Vercel CLI** (optional):

   ```bash
   npm i -g vercel
   ```

2. **Deploy via Git**:

   - Push your code to GitHub/GitLab/Bitbucket
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel auto-detects Next.js and deploys

3. **Deploy via CLI**:
   ```bash
   vercel
   ```

**Configuration:**

- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Framework Preset: Next.js

### Netlify

1. **Build Settings**:

   - Build command: `npm run build`
   - Publish directory: `out`
   - Functions directory: (leave empty)

2. **Add Static Export** (if needed):
   Add to `next.config.mjs`:
   ```javascript
   const nextConfig = {
     output: "export",
     // ... rest of config
   };
   ```

### Railway

1. **Connect Repository**:

   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway auto-detects Next.js

2. **Environment Variables**:
   ```
   PORT=3000
   NODE_ENV=production
   ```

### Docker Deployment

1. **Create Dockerfile**:

   ```dockerfile
   FROM node:18-alpine AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci --only=production

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Run**:
   ```bash
   docker build -t light-switch-puzzle .
   docker run -p 3000:3000 light-switch-puzzle
   ```

## ⚙️ Environment Variables

The application doesn't require environment variables for basic functionality. However, you can add these for enhanced features:

```env
# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Optional: Error Reporting
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Optional: Performance Monitoring
NEXT_PUBLIC_PERFORMANCE_URL=your_monitoring_url
```

## 🔧 Production Optimizations

### Performance

1. **Bundle Analysis**:

   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```

   Add to `next.config.mjs`:

   ```javascript
   const withBundleAnalyzer = require("@next/bundle-analyzer")({
     enabled: process.env.ANALYZE === "true",
   });

   module.exports = withBundleAnalyzer(nextConfig);
   ```

2. **Run Analysis**:
   ```bash
   ANALYZE=true npm run build
   ```

### SEO

1. **Add Sitemap** (create `public/sitemap.xml`):

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://your-domain.com</loc>
       <lastmod>2024-01-01</lastmod>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

2. **Add robots.txt** (create `public/robots.txt`):

   ```
   User-agent: *
   Allow: /

   Sitemap: https://your-domain.com/sitemap.xml
   ```

### Security

1. **Content Security Policy**:
   Add to `next.config.mjs` headers:
   ```javascript
   {
     key: 'Content-Security-Policy',
     value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
   }
   ```

## 📊 Monitoring

### Error Tracking

1. **Sentry Integration**:

   ```bash
   npm install @sentry/nextjs
   ```

2. **Add sentry.client.config.ts**:

   ```typescript
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     tracesSampleRate: 1.0,
   });
   ```

### Analytics

1. **Google Analytics**:
   Add to `app/layout.tsx`:

   ```typescript
   import Script from "next/script";

   // Add to layout component
   <Script
     src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
     strategy="afterInteractive"
   />;
   ```

## 🧪 Testing Production Build

### Local Testing

```bash
# Build and test locally
npm run build
npm run start

# Open http://localhost:3000
```

### Performance Testing

1. **Lighthouse**:

   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit on production URL

2. **Core Web Vitals**:
   - Monitor LCP (Largest Contentful Paint)
   - Monitor FID (First Input Delay)
   - Monitor CLS (Cumulative Layout Shift)

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run type check
        run: npm run type-check

      - name: Run linter
        run: npm run lint

      - name: Build application
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Fails**:

   - Check TypeScript errors: `npm run type-check`
   - Check ESLint errors: `npm run lint`
   - Clear cache: `npm run clean && npm install`

2. **Audio Not Working**:

   - Ensure HTTPS in production (required for Web Audio API)
   - Check browser audio permissions

3. **Performance Issues**:
   - Enable compression in hosting platform
   - Optimize images and assets
   - Check bundle size with analyzer

### Debug Mode

Add to environment variables:

```env
NODE_ENV=development
DEBUG=true
```

## 📱 Mobile Considerations

- Test touch interactions on mobile devices
- Verify audio works on iOS (may require user interaction first)
- Check responsive layout on various screen sizes
- Test performance on slower devices

## 🔐 Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No sensitive data in client-side code
- [ ] Dependencies updated to latest versions
- [ ] CSP (Content Security Policy) configured
- [ ] No console.log statements in production

## 📈 Post-Deployment

1. **Monitor Performance**:

   - Set up uptime monitoring
   - Monitor Core Web Vitals
   - Track user engagement

2. **Backup Strategy**:

   - Repository is backed up on Git hosting
   - Database backups (if applicable)
   - Regular dependency updates

3. **Documentation**:
   - Update README with live URL
   - Document any production-specific configurations
   - Maintain deployment logs

---

🎉 **Your Light Switch Puzzle is now ready for production!**
