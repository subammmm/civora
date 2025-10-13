# Deployment Configuration Guide

## Overview

Civora uses environment variables to control feature availability across different deployments. This allows the same codebase to serve different configurations without code changes.

## Environment Variable Configuration

### Vercel Deployment (Full Features with AI Chat)

**Environment Variables to Set in Vercel Dashboard:**

```bash
# Enable AI Chat Feature
NEXT_PUBLIC_CIVORA_AI_ENABLED=true

# Required API Keys
GEMINI_API_KEY=your_gemini_api_key_here
LANGSEARCH_API_KEY=your_langsearch_api_key_here

# Environment
NODE_ENV=production

# Optional: Sentry for error tracking
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here

# Optional: Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id_here
```

**Features Enabled:**
- ✅ Full Next.js app with all pages
- ✅ AI chat assistant accessible at `/ai-chat/`
- ✅ "AI Assistant" link in navigation menu
- ✅ API routes functional at `/api/ai-assistant/`
- ✅ Server-side rendering
- ✅ Edge network deployment

### civora.me Deployment (Without AI Chat)

**Environment Variables to Set:**

```bash
# Disable AI Chat Feature
NEXT_PUBLIC_CIVORA_AI_ENABLED=false

# API Keys (still needed for build, but AI UI hidden)
GEMINI_API_KEY=your_gemini_api_key_here
LANGSEARCH_API_KEY=your_langsearch_api_key_here

# Environment
NODE_ENV=production
```

**Features Enabled:**
- ✅ Full Next.js app with all pages
- ❌ No AI chat UI (hidden from users)
- ❌ No "AI Assistant" link in navigation
- ✅ API route exists but not linked to
- ✅ All other features functional

## Setting Environment Variables

### Vercel Dashboard

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - Variable name: `NEXT_PUBLIC_CIVORA_AI_ENABLED`
   - Value: `true` (for Vercel) or `false` (for civora.me)
   - Environments: Select Production, Preview, and Development as needed
4. Click **Save**
5. Redeploy for changes to take effect

### Local Development (.env file)

Create or update `.env` file in project root:

```bash
# Copy from .env.example
cp .env.example .env

# Edit .env and set variables
nano .env
```

### GitHub Actions / CI/CD

Set environment variables as repository secrets:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add new repository secret for each variable
3. Reference in workflow file:

```yaml
env:
  NEXT_PUBLIC_CIVORA_AI_ENABLED: ${{ secrets.CIVORA_AI_ENABLED }}
  GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
  LANGSEARCH_API_KEY: ${{ secrets.LANGSEARCH_API_KEY }}
```

## Deployment Workflows

### Deploying to Vercel with AI Chat

```bash
# 1. Set environment variables in Vercel dashboard
NEXT_PUBLIC_CIVORA_AI_ENABLED=true
GEMINI_API_KEY=your_key
LANGSEARCH_API_KEY=your_key

# 2. Push to GitHub (auto-deploys if connected)
git push origin main

# Or deploy manually with Vercel CLI
vercel --prod
```

### Deploying to civora.me without AI Chat

```bash
# 1. Set environment variables
NEXT_PUBLIC_CIVORA_AI_ENABLED=false
GEMINI_API_KEY=your_key
LANGSEARCH_API_KEY=your_key

# 2. Build the app
npm run build

# 3. Deploy to your hosting provider
# (specific steps depend on hosting provider)
```

## Testing Configurations Locally

### Test with AI Disabled (civora.me mode)

```bash
# 1. Update .env
echo "NEXT_PUBLIC_CIVORA_AI_ENABLED=false" >> .env

# 2. Clean and rebuild
rm -rf .next
npm run build

# 3. Start server
npm run dev

# 4. Verify:
# - No "AI Assistant" in navigation at http://localhost:3000/
# - Visiting /ai-chat/ shows "not available" message
```

### Test with AI Enabled (Vercel mode)

```bash
# 1. Update .env
echo "NEXT_PUBLIC_CIVORA_AI_ENABLED=true" >> .env

# 2. Clean and rebuild
rm -rf .next
npm run build

# 3. Start server
npm run dev

# 4. Verify:
# - "AI Assistant" appears in navigation at http://localhost:3000/
# - Visiting /ai-chat/ shows full AI interface
# - Can interact with AI assistant
```

## Important Notes

### Environment Variable Prefix

Variables starting with `NEXT_PUBLIC_` are:
- ✅ Exposed to browser/client-side code
- ✅ Baked into the build at build time
- ⚠️ Require rebuild to change values
- ⚠️ Not secret (visible in browser)

Variables without `NEXT_PUBLIC_` prefix are:
- ✅ Server-side only (secure)
- ✅ Can change without rebuild (if using server-side)
- ❌ Not accessible in client components

### Rebuild Required

When changing `NEXT_PUBLIC_*` variables:
1. Must rebuild the application: `npm run build`
2. Restart dev server: `npm run dev`
3. Redeploy to production

### API Keys Security

- `GEMINI_API_KEY` and `LANGSEARCH_API_KEY` are server-side only
- Never expose these in client-side code
- Always use environment variables, never hardcode
- Rotate keys regularly

## Troubleshooting

### AI chat not showing after enabling

**Problem:** Set `NEXT_PUBLIC_CIVORA_AI_ENABLED=true` but AI chat still hidden

**Solution:**
```bash
# 1. Clean build artifacts
rm -rf .next

# 2. Rebuild
npm run build

# 3. Restart
npm run dev

# 4. Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

### AI chat showing when it should be hidden

**Problem:** Set `NEXT_PUBLIC_CIVORA_AI_ENABLED=false` but AI chat still visible

**Solution:**
```bash
# 1. Check .env file
cat .env | grep NEXT_PUBLIC_CIVORA_AI_ENABLED
# Should output: NEXT_PUBLIC_CIVORA_AI_ENABLED=false

# 2. Clean and rebuild
rm -rf .next
npm run build

# 3. Check build output
# Should not show AI chat in navigation

# 4. Restart server
npm run dev
```

### Environment variables not working in production

**Problem:** Local works but production deployment doesn't respect env vars

**Solution:**
1. Verify variables are set in hosting provider dashboard (Vercel, etc.)
2. Check spelling and case sensitivity (exact match required)
3. Ensure variables are set for correct environment (production vs preview)
4. Redeploy after setting variables
5. Check deployment logs for environment variable values (non-secret ones)

## Multiple Deployment Strategies

### Strategy 1: Separate Vercel Projects

- **Project A** (civora-me): `NEXT_PUBLIC_CIVORA_AI_ENABLED=false`
- **Project B** (civora-vercel): `NEXT_PUBLIC_CIVORA_AI_ENABLED=true`
- Same codebase, different env vars
- Deploy to both from same repository

### Strategy 2: Branch-Based Deployment

- **main branch** → civora.me (AI disabled)
- **vercel branch** → Vercel preview (AI enabled)
- Set different env vars per branch in Vercel

### Strategy 3: Environment-Based

- **Production**: AI disabled
- **Preview**: AI enabled
- Different env vars per deployment environment

## Monitoring and Validation

### Verify Deployment Configuration

Check which configuration is active:

```bash
# Visit in browser:
https://your-domain.com/api/ai-assistant/

# Should return JSON:
{
  "status": "ok",
  "version": "v53",
  "envConfigured": true
}
```

### Check AI Chat Availability

```javascript
// In browser console:
console.log('AI Enabled:', process.env.NEXT_PUBLIC_CIVORA_AI_ENABLED === 'true');

// Or check navigation:
document.querySelector('a[href="/ai-chat/"]') ? 'AI chat enabled' : 'AI chat disabled'
```

## Support Resources

- **Main Documentation**: `README.md`
- **AI Chat Guide**: `AI-CHAT-CONDITIONAL-RENDERING.md`
- **Development Guide**: `DEVELOPMENT-GUIDE.md`
- **Environment Variables**: `.env.example`

---

**Last Updated**: 2025-10-13  
**Version**: 1.0  
**Applies To**: Civora Next.js v14 with conditional AI chat
