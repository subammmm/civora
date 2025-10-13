# Civora Deployment Guide

## Overview

Civora uses a **dual-deployment strategy** to ensure maximum availability and feature support:

1. **Primary Deployment (Vercel)** - Full Next.js app with API routes ✅ **RECOMMENDED**
2. **Backup Deployment (GitHub Pages)** - Static HTML version (no API routes)

## Deployment Architecture

```
civora.me (DNS) 
    ↓
    → Vercel (Primary) - Full Next.js with AI Assistant API
    
github.io/civora (Backup) - Static HTML only
```

## 🚀 Primary Deployment: Vercel (RECOMMENDED)

### Why Vercel?

- ✅ Full Next.js support with server-side rendering
- ✅ API routes work (AI assistant chat feature)
- ✅ Automatic deployments from GitHub
- ✅ Edge network for global performance
- ✅ Zero-config Next.js support

### Setup Instructions

#### 1. Deploy to Vercel

1. **Import Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import `subammmm/civora` repository
   - Framework Preset: **Next.js** (auto-detected)

2. **Configure Build Settings** ✅ (These should be auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install`

3. **Set Environment Variables** ⚠️ **REQUIRED**
   ```
   GEMINI_API_KEY=<your-gemini-api-key>
   LANGSEARCH_API_KEY=<your-langsearch-api-key>
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be available at `https://your-project.vercel.app`

#### 2. Point civora.me Domain to Vercel

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
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

4. **Remove GitHub Pages Deployment (Optional)**
   - In repository Settings → Pages
   - Set Source to "None" to disable GitHub Pages
   - Or keep it as a backup (civora.me will override it)

#### 3. Verify Deployment

Once DNS propagates (5 minutes to 24 hours):

1. **Test Homepage**
   ```bash
   curl -I https://civora.me/
   # Should return: 200 OK
   ```

2. **Test API Route**
   ```bash
   curl https://civora.me/api/ai-assistant/
   # Should return: {"status":"ok","version":"v53","envConfigured":true}
   ```

3. **Test in Browser**
   - Visit: https://civora.me/
   - You should see the dark UI with navigation and cards
   - Test the AI assistant chat feature

### Automatic Deployments

Once configured, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run builds and checks
- Update the live site

## 📄 Backup Deployment: GitHub Pages

### Why GitHub Pages?

- ✅ Free hosting
- ✅ Static HTML fallback
- ✅ No server costs
- ❌ No API routes (AI assistant won't work)
- ❌ No server-side rendering

### Current Configuration

GitHub Pages is configured with a **static export build**:

1. **Workflow**: `.github/workflows/deploy-pages.yml`
2. **Build Command**: `npm run build:static` (creates `out/` directory)
3. **Deployment**: Automatic on push to `main`

### How It Works

The `build:static` script sets `EXPORT_MODE=true`, which:
- Enables `output: 'export'` in `next.config.js`
- Builds static HTML files to `out/` directory
- Disables API routes and server features

### Access GitHub Pages

- **URL**: https://subammmm.github.io/civora/
- **Custom Domain**: Not recommended (use Vercel for civora.me)

### Important Notes

⚠️ **Limitations of GitHub Pages deployment:**
- AI assistant/chat feature will NOT work (API routes disabled)
- No server-side rendering
- Static content only
- Should be used as backup only

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

### Issue: AI assistant doesn't work

**Symptoms:**
- Chat input doesn't respond
- 404 error on `/api/ai-assistant/`
- Console shows API errors

**Solution for Vercel:**
1. Check environment variables are set (GEMINI_API_KEY, LANGSEARCH_API_KEY)
2. Verify API route exists: https://civora.me/api/ai-assistant/
3. Check Vercel build logs for errors
4. Ensure you're using trailing slash: `/api/ai-assistant/` (not `/api/ai-assistant`)

**Solution for GitHub Pages:**
- ⚠️ API routes are NOT supported on GitHub Pages
- Point civora.me to Vercel for AI assistant to work

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

## 🎯 Recommended Setup

For the best user experience:

1. ✅ **Use Vercel for civora.me** - Full features, working AI assistant
2. ✅ **Keep GitHub Pages as backup** - Static fallback if Vercel has issues
3. ✅ **Set environment variables in Vercel** - Required for API routes
4. ✅ **Monitor Vercel deployments** - Automatic from GitHub pushes

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
