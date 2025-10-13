# Civora Vercel Deployment - Step-by-Step Instructions

## Overview

This guide provides step-by-step instructions to deploy Civora with the dual Vercel deployment strategy:
- **civora.me (Production)**: Full Next.js app with AI chat DISABLED
- **Vercel Preview**: Full Next.js app with AI chat ENABLED for testing

## Prerequisites

- Vercel account (free tier works)
- Access to civora.me domain DNS settings
- API keys: GEMINI_API_KEY and LANGSEARCH_API_KEY

## Part 1: Deploy to Vercel (Production - civora.me)

### Step 1: Import Repository to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Select **"Import Third-Party Git Repository"** or connect GitHub
4. Import: `https://github.com/subammmm/civora`
5. Click **"Import"**

### Step 2: Configure Build Settings

Vercel should auto-detect Next.js settings. Verify:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (leave empty, auto-detected)
- **Install Command**: `npm install`

Click **"Continue"** if settings are correct.

### Step 3: Set Environment Variables (CRITICAL)

Before deploying, click **"Environment Variables"** and add:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NEXT_PUBLIC_CIVORA_AI_ENABLED` | `false` | Production |
| `GEMINI_API_KEY` | your_gemini_api_key | All (Production, Preview, Development) |
| `LANGSEARCH_API_KEY` | your_langsearch_api_key | All (Production, Preview, Development) |
| `NODE_ENV` | `production` | Production |

**IMPORTANT**: For `NEXT_PUBLIC_CIVORA_AI_ENABLED`:
- Value must be exactly `false` (lowercase, no quotes in Vercel UI)
- Select **Production** environment only (uncheck Preview and Development)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (2-5 minutes)
3. You'll get a URL like: `https://civora-xxxxx.vercel.app`
4. Click "Visit" to test deployment
5. **Verify**: AI Assistant link should NOT appear in navigation ✅

## Part 2: Configure Preview Deployments with AI Enabled

### Step 5: Add Environment Variable for Preview

1. Go to Project → **Settings** → **Environment Variables**
2. Find `NEXT_PUBLIC_CIVORA_AI_ENABLED` variable
3. Click **"Add Another"** or **"Edit"**
4. Add same variable with different environment:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NEXT_PUBLIC_CIVORA_AI_ENABLED` | `true` | Preview |

**This enables AI chat in PR preview deployments only**

### Step 6: Test Preview Deployment

1. Create a test branch: `git checkout -b test-ai-preview`
2. Make a small change (e.g., add comment to README)
3. Commit and push: `git push origin test-ai-preview`
4. Open a pull request on GitHub
5. Vercel bot will comment with preview URL
6. Visit preview URL
7. **Verify**: AI Assistant link SHOULD appear in navigation ✅
8. Test AI chat functionality at `/ai-chat/`

## Part 3: Point civora.me Domain to Vercel

### Step 7: Add Domain in Vercel

1. In Vercel project, go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `civora.me`
4. Click **"Add"**
5. Repeat for `www.civora.me`

Vercel will show DNS configuration instructions.

### Step 8: Update DNS Records

Go to your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.) and update DNS:

**Option A: A Record (Recommended)**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

**Option B: CNAME (if supported by DNS provider)**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | cname.vercel-dns.com | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

### Step 9: Wait for DNS Propagation

- DNS changes can take 5 minutes to 24 hours
- Check status: https://dnschecker.org (search: civora.me)
- Vercel will auto-issue SSL certificate once DNS is verified

### Step 10: Verify civora.me Deployment

Once DNS propagates:

1. **Visit https://civora.me/**
   - Should show Civora homepage ✅
   - Dark UI with navigation ✅
   - AI Assistant link should NOT be visible ✅

2. **Try to access AI chat directly:**
   - Visit: https://civora.me/ai-chat/
   - Should show "AI Assistant Not Available" message ✅

3. **Test API endpoint (optional):**
   ```bash
   curl https://civora.me/api/ai-assistant/
   ```
   Should return: `{"status":"ok","version":"v53"}`

## Part 4: Verify GitHub Pages is Backup Only

### Step 11: Confirm GitHub Pages URL

1. Visit: https://subammmm.github.io/civora/
2. Should show static version (no AI features)
3. This is backup only - civora.me goes to Vercel

## Troubleshooting

### Issue: AI chat showing on civora.me

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Check `NEXT_PUBLIC_CIVORA_AI_ENABLED` for **Production** environment
3. Must be exactly `false` (lowercase)
4. Click "Redeploy" from Deployments tab
5. Clear browser cache

### Issue: AI chat not showing on preview

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Check `NEXT_PUBLIC_CIVORA_AI_ENABLED` for **Preview** environment
3. Must be exactly `true` (lowercase)
4. Create new PR to trigger new preview deployment

### Issue: civora.me shows old content or errors

**Fix:**
1. Check DNS propagation: https://dnschecker.org
2. Clear browser cache (Ctrl+Shift+Delete)
3. Wait up to 24 hours for global DNS propagation
4. Verify domain is verified in Vercel dashboard

### Issue: "Domain is already in use"

**Fix:**
1. This means GitHub Pages is still claiming civora.me
2. Verify CNAME files are removed from repository (should be .backup)
3. Go to GitHub repo → Settings → Pages
4. Source should show "Deploy from a branch" with gh-pages or main
5. Custom domain should be EMPTY (not civora.me)
6. Save and retry adding domain in Vercel

## Environment Variable Summary

| Deployment | URL | `NEXT_PUBLIC_CIVORA_AI_ENABLED` | AI Visible? |
|------------|-----|----------------------------------|-------------|
| **Production** | civora.me | `false` | ❌ No |
| **Preview** | vercel.app/preview | `true` | ✅ Yes |
| **GitHub Pages** | github.io/civora | N/A (static) | ❌ No |

## Success Checklist

- [ ] Vercel project created and deployed
- [ ] Environment variables set correctly (Production: false, Preview: true)
- [ ] Domain civora.me added to Vercel project
- [ ] DNS records updated to point to Vercel
- [ ] civora.me shows site without AI chat link
- [ ] Preview deployments show AI chat link and work correctly
- [ ] GitHub Pages serves backup at github.io URL only
- [ ] CNAME files removed from repository (renamed to .backup)

## Next Steps After Deployment

1. **Monitor deployments**: Check Vercel dashboard for build status
2. **Test features**: Verify all pages load correctly
3. **Enable AI later**: Change Production env var to `true` if needed
4. **Share preview URLs**: Use preview deployments to demo AI features

## Additional Resources

- Full deployment guide: [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
- Environment configuration: [DEPLOYMENT-CONFIGURATION.md](./DEPLOYMENT-CONFIGURATION.md)
- AI chat documentation: [AI-CHAT-CONDITIONAL-RENDERING.md](./AI-CHAT-CONDITIONAL-RENDERING.md)
- Vercel docs: https://vercel.com/docs

---

**Questions or Issues?**

Check the troubleshooting section above or review the detailed deployment guide in DEPLOYMENT-GUIDE.md.
