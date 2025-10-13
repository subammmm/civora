# Vercel Deployment Configuration

## Overview

This document explains the configuration changes made to enable API routes on Vercel deployment.

## The Problem

The `/api/ai-assistant` route was returning a 404 error after Vercel deployment because the Next.js application was configured for **static export**, which does not support API routes.

### Root Cause

1. `next.config.js` had `output: 'export'` - this creates a static site without server features
2. `package.json` had an unused `"export"` script that could cause confusion
3. Static exports build to the `out/` directory as HTML files only
4. API routes require Next.js server runtime, which is incompatible with static export

## The Solution

### Changes Made

#### 1. next.config.js
**Removed:**
```javascript
output: 'export',  // ← This line was removed
```

**Result:** Next.js now builds with full server capabilities, including API routes.

#### 2. package.json
**Removed:**
```json
"export": "next export",  // ← This script was removed
```

**Result:** Prevents accidental static export that would break API routes.

### What Changed

| Aspect | Before (Static Export) | After (Full Next.js) |
|--------|------------------------|----------------------|
| Build Output | `out/` directory | `.next/` directory |
| API Routes | ❌ Not supported | ✅ Fully supported |
| Build Type | Static HTML files | Dynamic with SSR |
| Vercel Detection | Static site | Full Next.js app |
| Route Indicator | `○` (Static) | `ƒ` (Dynamic) |

## Verification

### Build Output Verification

```bash
npm run build
```

Expected output should show:
```
Route (app)                              Size     First Load JS
...
├ ƒ /api/ai-assistant                    0 B                0 B
...
```

The `ƒ` symbol indicates a **dynamic route** (server-rendered on demand).

### Local Testing

```bash
# Start development server
npm run dev

# Test GET endpoint
curl http://localhost:3000/api/ai-assistant/
# Expected: {"status":"ok","version":"v51"}

# Test POST endpoint
curl -X POST http://localhost:3000/api/ai-assistant/ \
  -H "Content-Type: application/json" \
  -d '{"input":"hello"}'
# Expected: {"reply":"Hey! All good here — what's on your mind?","error":null}
```

## Vercel Deployment Settings

### Required Settings

1. **Build Command**: `npm run build` ✅
   - This is correct and should not be changed

2. **Output Directory**: `.next` ✅
   - Vercel auto-detects this
   - Do NOT set it to `out`

3. **Framework Preset**: Next.js ✅
   - Should be auto-detected

### Environment Variables

Ensure these are set in Vercel dashboard:
- `GEMINI_API_KEY` - Required for AI assistant
- `LANGSEARCH_API_KEY` - Required for web search
- `FALLBACK_PROVIDER` - Optional (set to "openai" if using OpenAI fallback)
- `OPENAI_API_KEY` - Optional (only if FALLBACK_PROVIDER is "openai")

### Testing Deployed API

After deployment, test at:
```bash
# Health check
curl https://civoraaa.vercel.app/api/ai-assistant/

# Should return: {"status":"ok","version":"v51"}
```

## Important Notes

### Trailing Slashes

⚠️ **CRITICAL FOR API ROUTES**: The config includes `trailingSlash: true`, which means:
- **All API routes MUST be accessed with a trailing slash**
- API route is at `/api/ai-assistant/` (not `/api/ai-assistant`)
- **Accessing without trailing slash will cause a 308 redirect**, breaking POST requests
- Next.js will redirect without trailing slash to with trailing slash, but this breaks POST body

### Why This Matters

When you make a POST request to `/api/ai-assistant` (without trailing slash):
1. Next.js returns a 308 Permanent Redirect to `/api/ai-assistant/`
2. Browsers follow the redirect with a GET request (losing the POST body)
3. Your API call fails silently or returns unexpected results

**Solution**: Always use `/api/ai-assistant/` with the trailing slash in all fetch calls.

### Frontend Code Requirements

**Correct API calls:**
```javascript
// ✅ Correct - with trailing slash
fetch("/api/ai-assistant/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ input: "hello" })
})

// ❌ Wrong - without trailing slash (causes 308 redirect)
fetch("/api/ai-assistant", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ input: "hello" })
})
```

**Files checked and verified:**
- ✅ `app/page.js` - Uses `/api/ai-assistant/` correctly
- ✅ `public/assets/ai-global-ambassador.js` - No API calls (client-side only)
- ✅ All other public assets - No API calls found

### Dual Deployment Consideration

This repository was previously configured for **GitHub Pages** (static export). If you need to maintain GitHub Pages deployment alongside Vercel:

**Option 1: Separate Branches**
- Keep `main` branch with this configuration (for Vercel)
- Create a `gh-pages-static` branch with static export config (for GitHub Pages)
- Note: GitHub Pages branch won't have API routes

**Option 2: Choose One Deployment Target**
- **Vercel** (current): Full Next.js with API routes ✅
- **GitHub Pages**: Static export only, no API routes ❌

### Reverting to Static Export (Not Recommended)

If you need to revert to static export (will break API routes):

```javascript
// next.config.js
const nextConfig = {
  output: 'export',  // Add this back
  // ...rest of config
};
```

And in package.json:
```json
"scripts": {
  "export": "next export",  // Add this back
  // ...rest of scripts
}
```

⚠️ **Warning**: This will make API routes return 404 on all deployments.

## Troubleshooting

### Issue: POST requests return 308 redirects

**Symptoms:**
- POST requests to `/api/ai-assistant` fail
- Browser console shows 308 Permanent Redirect
- Chat UI doesn't display responses or shows errors
- Network tab shows redirect from `/api/ai-assistant` to `/api/ai-assistant/`

**Root Cause:**
- The API endpoint is being called WITHOUT a trailing slash
- Next.js config has `trailingSlash: true`
- POST requests cannot be automatically redirected (body is lost)

**Solution:**
1. Check all `fetch()` calls to API routes
2. Ensure they use `/api/ai-assistant/` with trailing slash
3. Search codebase: `grep -r "api/ai-assistant[^/]" --include="*.js" --include="*.jsx"`
4. Update any matches to include trailing slash

**Verification:**
```bash
# Check browser Network tab for 308 redirects
# Should see 200 OK for POST to /api/ai-assistant/
# Should NOT see 308 redirects
```

### Issue: API still returns 404 on Vercel

**Check:**
1. Ensure you've deployed the latest commit with these changes
2. Verify Vercel build logs show `.next` directory, not `out/`
3. Check that build command is `npm run build`
4. Ensure output directory is NOT set to `out` in Vercel settings

### Issue: Build fails on Vercel

**Check:**
1. Environment variables are set correctly
2. Node.js version matches (18.17.0 or higher)
3. No syntax errors in code
4. Check Vercel build logs for specific error messages

### Issue: API works locally but not on Vercel

**Check:**
1. Environment variables are set in Vercel dashboard
2. API route file exists: `app/api/ai-assistant/route.js`
3. No CORS issues (check browser console)
4. Verify the correct URL with trailing slash: `/api/ai-assistant/`

## References

- [Next.js API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js Static Export Limitations](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Vercel Next.js Deployment](https://vercel.com/docs/frameworks/nextjs)

## Summary

✅ API routes are now enabled and working  
✅ Build creates `.next` directory with server capabilities  
✅ Vercel will automatically deploy with full Next.js features  
✅ Test API at `https://civoraaa.vercel.app/api/ai-assistant/` after deployment

---

**Last Updated:** 2025-10-13  
**Next.js Version:** 14.2.33  
**Node Version:** 20.x (see .nvmrc)
