# Deployment Configuration Guide

## Overview

Civora uses environment variables to control feature availability across different Vercel deployments. This allows the same codebase to serve different configurations without code changes.

**Deployment Strategy:**
- **civora.me (Vercel Production)**: AI chat disabled for public users
- **Vercel Preview/Testing**: AI chat enabled for testing and demonstration
- **GitHub Pages**: Static backup only (no API routes)

## Environment Variable Configuration

### Vercel Production for civora.me (AI Chat Disabled)

**Purpose**: Public-facing deployment at civora.me with clean UI, no AI chat

**Environment Variables to Set in Vercel Dashboard:**

```bash
# Disable AI Chat Feature for civora.me
NEXT_PUBLIC_CIVORA_AI_ENABLED=false

# API Keys (backend needs these even if UI hidden)
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
- ❌ No AI chat UI (hidden from users)
- ❌ No "AI Assistant" link in navigation
- ✅ API route exists but not accessible via UI
- ✅ Server-side rendering
- ✅ Edge network deployment
- ✅ Custom domain: civora.me

### Vercel Preview/Testing (AI Chat Enabled)

**Purpose**: Testing and demonstration deployment with full AI capabilities

**Environment Variables to Set for Preview Environment:**

```bash
# Enable AI Chat Feature for testing
NEXT_PUBLIC_CIVORA_AI_ENABLED=true

# API Keys
GEMINI_API_KEY=your_gemini_api_key_here
LANGSEARCH_API_KEY=your_langsearch_api_key_here

# Environment
NODE_ENV=production
```

**Features Enabled:**
- ✅ Full Next.js app with all pages
- ✅ AI chat assistant accessible at `/ai-chat/`
- ✅ "AI Assistant" link in navigation menu
- ✅ API routes functional at `/api/ai-assistant/`
- ✅ Server-side rendering
- ✅ Preview URL for testing

**How to Access:**
1. Create a pull request in GitHub
2. Vercel automatically creates preview deployment
3. Access preview URL provided by Vercel bot in PR comments
4. AI chat will be visible and functional

## Setting Environment Variables

### Vercel Dashboard

**For Production (civora.me) - AI Disabled:**

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add variable:
   - Variable name: `NEXT_PUBLIC_CIVORA_AI_ENABLED`
   - Value: `false`
   - Environments: Select **Production** only
4. Add API keys (for all environments):
   - Variable name: `GEMINI_API_KEY`
   - Value: your key
   - Environments: Select **Production**, **Preview**, **Development**
5. Click **Save**
6. Redeploy for changes to take effect

**For Preview Deployments - AI Enabled:**

1. Add the same variable again (or edit existing):
   - Variable name: `NEXT_PUBLIC_CIVORA_AI_ENABLED`
   - Value: `true`
   - Environments: Select **Preview** only
2. This enables AI chat in PR preview deployments
3. Create a PR to test - Vercel will deploy with AI enabled

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

### Strategy 1: Production + Preview (Recommended)

- **Production** (civora.me): `NEXT_PUBLIC_CIVORA_AI_ENABLED=false`
- **Preview** (PR deployments): `NEXT_PUBLIC_CIVORA_AI_ENABLED=true`
- Same codebase, different environment variables per deployment type
- Set variables in Vercel dashboard for each environment

### Strategy 2: Separate Vercel Projects

- **Project A** (civora-production): `NEXT_PUBLIC_CIVORA_AI_ENABLED=false` → civora.me
- **Project B** (civora-ai-demo): `NEXT_PUBLIC_CIVORA_AI_ENABLED=true` → separate URL
- Same repository, different Vercel projects
- Full control over each deployment

### Strategy 3: Branch-Based (Not Recommended)

- **main branch** → civora.me (AI disabled)
- **ai-enabled branch** → Vercel preview (AI enabled)
- Requires maintaining two branches
- More complex to maintain

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
