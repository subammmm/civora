# Deployment Checklist for Civora AI Assistant

## ✅ Pre-Deployment Checklist

### Environment Variables Setup

#### Required for AI Chat (Vercel with AI Enabled)
- [ ] `GEMINI_API_KEY` - Get from https://ai.google.dev/
- [ ] `LANGSEARCH_API_KEY` - Get from https://langsearch.com/
- [ ] `NEXT_PUBLIC_CIVORA_AI_ENABLED=true` - Enables AI chat UI
- [ ] `NODE_ENV=production` - Sets production mode

#### Required for civora.me (Vercel Production)
- [ ] `GEMINI_API_KEY` - Required even if AI disabled (API still exists)
- [ ] `LANGSEARCH_API_KEY` - Required even if AI disabled (API still exists)
- [ ] `NEXT_PUBLIC_CIVORA_AI_ENABLED=false` - Hides AI chat UI from users
- [ ] `NODE_ENV=production` - Sets production mode

#### ❌ DO NOT USE
- [ ] Verify `OPENAI_API_KEY` is NOT set (removed as of v53)
- [ ] Verify `FALLBACK_PROVIDER` is NOT set (removed as of v52)

### Code Verification
- [ ] All API calls use `/api/ai-assistant/` (with trailing slash)
- [ ] Frontend sends JSON with `input` field (not FormData with `message`)
- [ ] API route validates `GEMINI_API_KEY` and `LANGSEARCH_API_KEY` at startup
- [ ] Error messages are user-friendly and don't expose sensitive info
- [ ] CORS headers configured correctly for production

### Testing Before Deploy
- [ ] Run `npm run lint` - No errors
- [ ] Run `npm run type-check` - No errors
- [ ] Run `npm run build` - Successful build
- [ ] Test API health check: `GET /api/ai-assistant/`
- [ ] Test API with valid request: `POST /api/ai-assistant/` with `{"input":"hello"}`
- [ ] Verify streaming responses work
- [ ] Verify error responses return proper status codes (400, 429, 500, 502, 504)

---

## 🚀 Vercel Deployment Steps

### 1. Create/Update Vercel Project

#### For civora.me (Production - AI Disabled)
```bash
# In Vercel Dashboard:
1. Create new project or use existing
2. Connect to GitHub repository: subammmm/civora
3. Set custom domain: civora.me
4. Framework Preset: Next.js (auto-detected)
5. Build Command: npm run build
6. Output Directory: .next (auto-detected)
7. Install Command: npm install (auto-detected)
```

#### Environment Variables for civora.me
```env
GEMINI_API_KEY=your_gemini_api_key
LANGSEARCH_API_KEY=your_langsearch_api_key
NEXT_PUBLIC_CIVORA_AI_ENABLED=false
NODE_ENV=production
```

#### For Vercel Preview (Testing - AI Enabled)
Same as above, but in Preview Environment Variables:
```env
NEXT_PUBLIC_CIVORA_AI_ENABLED=true
```

### 2. Deploy and Verify

- [ ] Push to GitHub main branch
- [ ] Vercel auto-deploys
- [ ] Wait 2-3 minutes for build
- [ ] Check deployment logs for errors
- [ ] Verify build succeeded

### 3. DNS Configuration (civora.me only)

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

Alternative (if CNAME @ not supported):
```
Type: A
Name: @
Value: 76.76.21.21
```

- [ ] DNS configured
- [ ] Wait for DNS propagation (up to 24 hours, usually 5-10 minutes)
- [ ] Verify domain works: https://civora.me

---

## 🧪 Post-Deployment Testing

### For civora.me (AI Disabled)
- [ ] Visit https://civora.me
- [ ] Verify homepage loads
- [ ] Verify navigation works
- [ ] Check `/ai-chat/` shows "AI Assistant Not Available" message
- [ ] Verify no console errors in browser DevTools
- [ ] Test on mobile device
- [ ] Check all internal links work
- [ ] Verify API health check: https://civora.me/api/ai-assistant/

### For Vercel Preview (AI Enabled)
- [ ] Visit preview URL
- [ ] Verify homepage loads
- [ ] Go to `/ai-chat/`
- [ ] Verify chat interface shows
- [ ] Test sending a message: "Hello"
- [ ] Verify streaming response works
- [ ] Test error handling: Send empty message
- [ ] Verify rate limiting: Send rapid messages
- [ ] Check browser console for errors
- [ ] Test file upload (should show unsupported message)
- [ ] Verify clear history button works

### API Testing (Both Deployments)

```bash
# Health check (should return envConfigured: true)
curl https://civora.me/api/ai-assistant/

# Valid request (if AI enabled)
curl -X POST https://civora.me/api/ai-assistant/ \
  -H "Content-Type: application/json" \
  -d '{"input":"Hello"}'

# Invalid request (should return 400)
curl -X POST https://civora.me/api/ai-assistant/ \
  -H "Content-Type: application/json" \
  -d '{"input":""}'

# Missing field (should return 400)
curl -X POST https://civora.me/api/ai-assistant/ \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

Expected responses:
- [ ] Health check returns `{"status":"ok","version":"v53","envConfigured":true}`
- [ ] Valid request returns streaming text or JSON with reply
- [ ] Empty input returns 400 with validation error
- [ ] Missing/wrong field returns 400 with validation error
- [ ] Rate limit triggers 429 after rapid requests

---

## 🔧 Troubleshooting

### Issue: 400 Bad Request
**Symptoms:** API returns "Invalid request format"
**Causes:**
- Frontend sending FormData instead of JSON
- Field name mismatch (`message` vs `input`)
- Empty input string
- Invalid JSON

**Solution:**
1. Check frontend sends: `{"input":"text","history":[]}`
2. Verify Content-Type: `application/json`
3. Ensure `input` field is non-empty string

### Issue: 500 Service Configuration Error
**Symptoms:** API returns "Service configuration error. Please contact support."
**Causes:**
- Missing `GEMINI_API_KEY`
- Missing `LANGSEARCH_API_KEY`
- Invalid API keys

**Solution:**
1. Check Vercel environment variables
2. Verify keys are correct (not expired/revoked)
3. Redeploy after adding keys

### Issue: 502 Bad Gateway
**Symptoms:** API returns after long delay with "AI service is temporarily unavailable"
**Causes:**
- Gemini API is down or rate limited
- Invalid Gemini API key
- Network timeout

**Solution:**
1. Check Gemini API status
2. Verify API key is valid
3. Check Vercel function logs
4. Try again (may be temporary)

### Issue: 504 Gateway Timeout
**Symptoms:** API returns "Search service timed out" or "AI service timed out"
**Causes:**
- LangSearch took >10s
- Gemini took >15s
- Network issues

**Solution:**
1. Retry the request
2. Check API service status
3. May need to increase timeout limits

### Issue: 429 Too Many Requests
**Symptoms:** API returns "Too many requests. Please wait a moment."
**Causes:**
- Rate limiting (1 request per second per IP)

**Solution:**
1. Wait 1 second between requests
2. This is expected behavior to prevent abuse

### Issue: AI Chat Not Showing
**Symptoms:** `/ai-chat/` shows "AI Assistant Not Available"
**Causes:**
- `NEXT_PUBLIC_CIVORA_AI_ENABLED=false` (intentional for civora.me)
- Environment variable not set

**Solution:**
1. If on civora.me: This is correct behavior (AI disabled)
2. If on preview: Check environment variables
3. Verify variable name exactly: `NEXT_PUBLIC_CIVORA_AI_ENABLED`
4. Redeploy after changing

### Issue: CORS Errors
**Symptoms:** Browser console shows CORS errors
**Causes:**
- Production CORS limited to https://civora.me
- Request from different domain

**Solution:**
1. In production: Only civora.me can access API
2. For testing: Set `NODE_ENV=development` to allow all origins
3. API automatically sets CORS based on NODE_ENV

---

## 📊 Monitoring

### Things to Monitor
- [ ] API response times (should be <3s for streaming start)
- [ ] Error rates (400, 500, 502, 504)
- [ ] Rate limit hits (429)
- [ ] API key usage/quotas (Gemini, LangSearch)
- [ ] Vercel function invocations
- [ ] Vercel function duration

### Logs to Check
- [ ] Vercel deployment logs
- [ ] Vercel function logs (for API errors)
- [ ] Browser console (for frontend errors)
- [ ] API startup logs (for environment validation)

### API Logging Format
All logs include request numbers for correlation:
```
[STARTUP ERROR] Missing required environment variables: ...
[REQUEST #1] from IP: Input "query text"
[REQUEST #1] Validation error: ...
[REQUEST #1] LangSearch error: ...
[REQUEST #1] Gemini error: ...
[REQUEST #1] UNCAUGHT ERROR: ...
[REQUEST #1] latency: 1234ms
```

---

## 📝 Notes

### Why OpenAI Was Removed
- **Cost constraints**: OpenAI API is expensive for production use
- **Rate limiting**: Strict limits on free tier
- **Simplified architecture**: Reduced from 3 APIs to 2
- **Better control**: Direct management of Gemini responses
- **Real-time context**: LangSearch provides live web data

### Dual Deployment Strategy
- **civora.me**: AI disabled for public (reduces costs, API complexity)
- **Vercel Preview**: AI enabled for testing and demonstration
- **Same codebase**: Single source of truth, different configs
- **Conditional rendering**: UI shows/hides based on environment variable

### API Architecture
- **Version**: v53 (production repairs)
- **Providers**: Gemini (reasoning) + LangSearch (web context)
- **Fallback**: No fallback - fails with clear error if provider unavailable
- **Streaming**: Supports both streaming and JSON responses
- **Rate limiting**: 1 req/sec per IP
- **Timeouts**: LangSearch 10s, Gemini 15s

---

## 🎉 Success Criteria

Deployment is successful when:
- [ ] civora.me loads without errors
- [ ] All navigation links work
- [ ] AI chat is hidden on civora.me (shows disabled message)
- [ ] AI chat works on preview deployment
- [ ] API health check returns envConfigured: true
- [ ] Test query returns proper response
- [ ] Error handling works (400, 429, 500, etc.)
- [ ] No console errors in browser
- [ ] Mobile responsive design works
- [ ] DNS resolves to Vercel (for civora.me)

---

**Last Updated:** 2025-10-13  
**API Version:** v53  
**Frontend Version:** Updated with streaming support  
**OpenAI Status:** ❌ REMOVED (do not use)
