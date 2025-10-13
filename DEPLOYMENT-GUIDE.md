# Civora Deployment Guide

## Overview

Civora uses a **dual Vercel deployment strategy** to support different feature sets:

1. **civora.me (Vercel Production)** - Full Next.js app with AI chat DISABLED ✅ **PRIMARY**
2. **Vercel Preview/Separate Project** - Full Next.js app with AI chat ENABLED ✅ **FOR TESTING**

**Important**: GitHub Pages is available as a static backup but is NOT used for civora.me domain.

## Deployment Architecture

```
civora.me (DNS) 
    ↓
    → Vercel Production - Full Next.js, AI Chat DISABLED
    
vercel-preview.vercel.app
    ↓
    → Vercel Preview - Full Next.js, AI Chat ENABLED
    
github.io/civora (Backup Only) - Static HTML export (no API routes)
```

## 🚀 Primary Deployment: Vercel for civora.me (AI DISABLED)

### Why Vercel?

- ✅ Full Next.js support with server-side rendering
- ✅ API routes exist (but AI UI hidden from users)
- ✅ Automatic deployments from GitHub
- ✅ Edge network for global performance
- ✅ Zero-config Next.js support
- ✅ Environment-based feature control

### Setup Instructions

#### 1. Deploy to Vercel (civora.me - Production with AI Disabled)

1. **Import Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import `subammmm/civora` repository
   - Framework Preset: **Next.js** (auto-detected)
   - Project Name: `civora` (or your preferred name)

2. **Configure Build Settings** ✅ (These should be auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install`

3. **Set Environment Variables for civora.me** ⚠️ **REQUIRED**
   
   Navigate to **Project Settings** → **Environment Variables** and add:
   
   ```
   # CRITICAL: Disable AI chat for civora.me
   NEXT_PUBLIC_CIVORA_AI_ENABLED=false
   
   # API Keys (backend still needs these)
   GEMINI_API_KEY=<your-gemini-api-key>
   LANGSEARCH_API_KEY=<your-langsearch-api-key>
   
   # Environment
   NODE_ENV=production
   ```
   
   **Select Environments**: Production, Preview (optional), Development (optional)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be available at `https://civora.vercel.app` (or your project name)
   - **AI Assistant link will NOT appear in navigation** ✅

#### 2. Point civora.me Domain to Vercel

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains (in your civora project)
   - Click "Add Domain"
   - Enter: `civora.me`
   - Also add: `www.civora.me`

2. **Update DNS Settings**

   Go to your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare) and update DNS records:

   **For Root Domain (civora.me):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: Auto or 3600
   ```

   **For WWW subdomain (www.civora.me):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: Auto or 3600
   ```

   **Alternative (CNAME for root domain):**
   If your DNS provider supports CNAME flattening:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   TTL: Auto or 3600
   ```

3. **Verify Domain**
   - Vercel will automatically verify DNS configuration
   - Once verified, SSL certificate will be issued automatically
   - This may take a few minutes to 24 hours

4. **Remove GitHub Pages CNAME (IMPORTANT)**
   - Delete or rename the `CNAME` file in repository root (currently points to civora.me)
   - This prevents GitHub Pages from claiming the civora.me domain
   - GitHub Pages should only be backup at subammmm.github.io/civora/
   - **Do NOT disable GitHub Pages entirely** - keep it as static backup

#### 3. Verify civora.me Deployment (AI Disabled)

Once DNS propagates (5 minutes to 24 hours):

1. **Test Homepage**
   ```bash
   curl -I https://civora.me/
   # Should return: 200 OK
   ```

2. **Test AI Chat is Hidden**
   - Visit: https://civora.me/
   - Check navigation menu - **"AI Assistant" link should NOT be visible** ✅
   - Try accessing: https://civora.me/ai-chat/
   - Should show "AI Assistant Not Available" message ✅

3. **Test API Route (exists but not linked)**
   ```bash
   curl https://civora.me/api/ai-assistant/
   # Should return: {"status":"ok","version":"v53"}
   # API exists but UI doesn't link to it
   ```

4. **Test in Browser**
   - Visit: https://civora.me/
   - You should see the dark UI with navigation and cards
   - AI Assistant link should be ABSENT from navigation
   - All other pages should work normally

### Automatic Deployments

Once configured, Vercel will automatically:
- Deploy on every push to `main` branch (Production with AI disabled)
- Create preview deployments for pull requests
- Run builds and checks
- Update the live site

## 🤖 Secondary Deployment: Vercel with AI Enabled (Testing/Preview)

### Why a Separate AI-Enabled Deployment?

- ✅ Test AI features before enabling on civora.me
- ✅ Demonstrate full capabilities to stakeholders
- ✅ Same codebase, different environment configuration
- ✅ No code changes needed - just environment variables

### Option 1: Use Vercel Preview Deployments (Recommended)

Vercel automatically creates preview deployments for pull requests. You can configure these with AI enabled:

1. **Configure Preview Environment Variables**
   - Go to your Vercel project → Settings → Environment Variables
   - For each AI-related variable, select **Preview** environment:
   
   ```
   NEXT_PUBLIC_CIVORA_AI_ENABLED=true  (Preview only)
   GEMINI_API_KEY=<your-key>            (Preview + Production)
   LANGSEARCH_API_KEY=<your-key>        (Preview + Production)
   ```

2. **Create a Pull Request**
   - Make any change to test (even documentation)
   - Open a pull request
   - Vercel will create a preview deployment with AI enabled
   - Preview URL: `https://civora-<hash>-<team>.vercel.app`

3. **Test AI Features**
   - Navigate to preview URL
   - "AI Assistant" link WILL appear in navigation ✅
   - AI chat fully functional at `/ai-chat/` ✅

### Option 2: Separate Vercel Project (Alternative)

For a permanent AI-enabled deployment:

1. **Create Second Vercel Project**
   - Go to Vercel Dashboard → Add New Project
   - Import same `subammmm/civora` repository
   - Project Name: `civora-ai-preview` (or similar)

2. **Set Environment Variables (AI Enabled)**
   ```
   # ENABLE AI chat for this deployment
   NEXT_PUBLIC_CIVORA_AI_ENABLED=true
   
   # API Keys
   GEMINI_API_KEY=<your-gemini-api-key>
   LANGSEARCH_API_KEY=<your-langsearch-api-key>
   
   # Environment
   NODE_ENV=production
   ```

3. **Deploy**
   - Click "Deploy"
   - Access at: `https://civora-ai-preview.vercel.app`
   - AI chat fully functional ✅

4. **Use Cases**
   - Share with team members to test AI features
   - Demonstrate capabilities to stakeholders
   - Test AI improvements before enabling on civora.me

## 📄 Backup Only: GitHub Pages (Static Export)

### Why GitHub Pages?

- ✅ Free static hosting
- ✅ Automatic fallback if Vercel has issues
- ✅ No server costs
- ❌ No API routes (AI assistant won't work)
- ❌ No server-side rendering
- ⚠️ **NOT used for civora.me domain** - Vercel handles civora.me

### Current Configuration

GitHub Pages is configured as a **static backup only**:

1. **Workflow**: `.github/workflows/deploy-pages.yml`
2. **Build Command**: `npm run build:static` (creates `out/` directory)
3. **Deployment**: Automatic on push to `main`
4. **URL**: https://subammmm.github.io/civora/ (backup access only)

### How It Works

The `build:static` script sets `EXPORT_MODE=true`, which:
- Enables `output: 'export'` in `next.config.js`
- Builds static HTML files to `out/` directory
- Disables API routes and server features
- AI chat is automatically disabled (no server support)

### Access GitHub Pages

- **URL**: https://subammmm.github.io/civora/
- **Purpose**: Static backup only
- **Domain**: Does NOT use civora.me (that points to Vercel)

### Important Notes

⚠️ **Limitations of GitHub Pages deployment:**
- AI assistant/chat feature will NOT work (API routes disabled)
- No server-side rendering
- Static content only
- **NOT used for civora.me domain** - only as backup at github.io URL
- CNAME file should be removed from repo to prevent domain conflicts

## 🔧 Local Development

### Standard Development (with API routes)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

This runs the full Next.js app with API routes enabled.

### Static Export Preview

```bash
# Build static export
npm run build:static

# Serve static files
cd out
python3 -m http.server 8080

# Open http://localhost:8080
```

This previews what GitHub Pages will serve (no API routes).

## 📝 Build Scripts Reference

| Script | Purpose | Output | API Routes |
|--------|---------|--------|------------|
| `npm run dev` | Development server | In-memory | ✅ Enabled |
| `npm run build` | Production build (Vercel) | `.next/` | ✅ Enabled |
| `npm run build:static` | Static export (GitHub Pages) | `out/` | ❌ Disabled |
| `npm start` | Production server (local) | Runs `.next/` | ✅ Enabled |

## 🔍 Troubleshooting

### Issue: civora.me shows old content

**Solution:**
1. Check DNS propagation: https://dnschecker.org (search: civora.me)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Wait up to 24 hours for global DNS propagation
4. Verify Vercel shows domain as verified

### Issue: AI assistant showing when it shouldn't (civora.me)

**Symptoms:**
- AI Assistant link appears in navigation on civora.me
- AI chat page is accessible

**Solution:**
1. Check Vercel environment variables for civora.me production:
   - Should be: `NEXT_PUBLIC_CIVORA_AI_ENABLED=false`
2. Redeploy after changing environment variable
3. Clear browser cache
4. Wait a few minutes for deployment to complete

### Issue: AI assistant not showing on preview deployment

**Symptoms:**
- AI Assistant link missing in preview deployment
- Should be visible for testing

**Solution:**
1. Check environment variables are set for **Preview** environment
2. Should be: `NEXT_PUBLIC_CIVORA_AI_ENABLED=true` (Preview only)
3. Create new PR to trigger new preview deployment
4. Check preview deployment URL (not production URL)

### Issue: civora.me domain conflict with GitHub Pages

**Symptoms:**
- Domain shows GitHub Pages instead of Vercel
- Certificate errors

**Solution:**
1. Remove `CNAME` file from repository root
2. Update DNS to point to Vercel (see setup instructions above)
3. Verify domain ownership in Vercel dashboard
4. Wait for DNS propagation (up to 24 hours)
5. GitHub Pages should only be at github.io URL

### Issue: Build fails on Vercel

**Common causes:**
1. Missing environment variables
2. Syntax errors in code
3. Dependencies not installed correctly

**Solution:**
1. Check Vercel build logs
2. Ensure all environment variables are set
3. Try building locally: `npm run build`
4. Check Node.js version matches (20.x)

### Issue: GitHub Pages deployment fails

**Common causes:**
1. `out/` directory not created
2. Build errors
3. Workflow permissions

**Solution:**
1. Check Actions tab for error logs
2. Verify `npm run build:static` works locally
3. Ensure repository has Pages enabled in Settings

## 🎯 Recommended Deployment Setup

For the best configuration:

1. ✅ **Vercel Production for civora.me** - `NEXT_PUBLIC_CIVORA_AI_ENABLED=false`
   - Full Next.js features
   - AI chat hidden from users
   - Production-ready
   - Custom domain: civora.me

2. ✅ **Vercel Preview with AI** - `NEXT_PUBLIC_CIVORA_AI_ENABLED=true`
   - Same codebase
   - AI chat enabled for testing
   - Access via preview URLs
   - No custom domain needed

3. ✅ **GitHub Pages as Backup** - Static export
   - Fallback at subammmm.github.io/civora/
   - No AI features
   - Automatic deployment
   - No custom domain

### Environment Variable Summary

| Deployment | URL | `NEXT_PUBLIC_CIVORA_AI_ENABLED` | AI Chat Visible? |
|------------|-----|----------------------------------|------------------|
| **Vercel Production** | civora.me | `false` | ❌ No |
| **Vercel Preview** | vercel.app | `true` | ✅ Yes |
| **GitHub Pages** | github.io | N/A (static) | ❌ No (not supported) |

### Why This Setup?

- **civora.me users** - Clean experience without AI chat distraction
- **Testing** - Full AI features available in preview deployments
- **Flexibility** - Can enable AI on civora.me anytime by changing env var
- **No code changes** - All controlled by environment variables
- **Preserved code** - AI chat always in codebase, never deleted

## 📚 Additional Resources

- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [DNS Configuration Guide](https://vercel.com/docs/concepts/projects/custom-domains)

## 🆘 Support

If you encounter issues:

1. Check this guide first
2. Review [VERCEL-DEPLOYMENT-NOTES.md](./VERCEL-DEPLOYMENT-NOTES.md)
3. Check Vercel build logs
4. Verify environment variables
5. Test locally with `npm run dev`

---

**Last Updated:** 2025-10-13  
**Next.js Version:** 14.2.33  
**Node Version:** 20.x
