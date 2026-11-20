# Quick Deployment Guide - v55 Fix

## What Was Fixed
- **502 Bad Gateway errors** caused by 308 redirects on API routes
- **Root cause**: `trailingSlash: true` config was applying to API routes
- **Solution**: Made trailing slash conditional (only for static exports)

## Deploy to Vercel

### 1. Push Code to GitHub
```bash
git push origin main
```

### 2. Configure Environment Variables in Vercel
Go to your Vercel project → Settings → Environment Variables

Add these variables:
```
GEMINI_API_KEY=<your_gemini_api_key>
LANGSEARCH_API_KEY=<your_langsearch_api_key>
NODE_ENV=production
NEXT_PUBLIC_CIVORA_AI_ENABLED=true
```

### 3. Deploy
Vercel will automatically deploy when you push to main (if auto-deploy is enabled)

Or manually trigger deployment:
```bash
vercel --prod
```

### 4. Verify Deployment
Run the verification script:
```bash
./verify-vercel-api.sh https://civoraaa.vercel.app
```

Expected output:
```
✓ PASS - Health Check (v55)
✓ PASS - Simple POST Request
✓ PASS - No 308 Redirects
✓ PASS - Date Query
✓ PASS - Invalid Request Validation
✓ PASS - Rate Limiting
```

## Quick Test Commands

### Health Check
```bash
curl https://civoraaa.vercel.app/api/ai-assistant
```
Expected: `{"status":"ok","version":"v55",...}`

### Test POST Request
```bash
curl -X POST https://civoraaa.vercel.app/api/ai-assistant \
  -H "Content-Type: application/json" \
  -d '{"input":"hello"}'
```
Expected: `{"reply":"Hey! All good here...","error":null}`

### Check for Redirects
```bash
curl -X POST https://civoraaa.vercel.app/api/ai-assistant -v \
  -H "Content-Type: application/json" \
  -d '{"input":"test"}' 2>&1 | grep "< HTTP"
```
Expected: `< HTTP/2 200` (NOT 308)

## Troubleshooting

### Still Getting 502 Errors?
1. **Check environment variables** in Vercel dashboard
2. **Check Vercel function logs** for startup errors
3. **Verify latest code is deployed** (check commit hash)
4. **Test health check endpoint** first

### Getting 308 Redirects?
1. Make sure latest code is deployed
2. Check that `next.config.js` doesn't have `trailingSlash: true` globally
3. Verify frontend uses `/api/ai-assistant` (no trailing slash)

### Environment Not Configured?
1. Go to Vercel → Settings → Environment Variables
2. Add `GEMINI_API_KEY` and `LANGSEARCH_API_KEY`
3. Redeploy (Vercel → Deployments → ... → Redeploy)

## What Changed in v55

| File | Change |
|------|--------|
| `next.config.js` | Made `trailingSlash: true` conditional |
| `app/components/AIChatInterface.js` | Removed trailing slash from fetch URL |
| `app/api/ai-assistant/route.js` | Updated version to v55 |

## Documentation
- **Comprehensive Guide**: `V55-502-FIX-SUMMARY.md`
- **API Documentation**: `API-ROUTING-FIX-SUMMARY.md`
- **Testing Guide**: `verify-vercel-api.sh`

## Support
If issues persist:
1. Check Vercel function logs
2. Review `V55-502-FIX-SUMMARY.md` troubleshooting section
3. Verify all environment variables are set correctly
