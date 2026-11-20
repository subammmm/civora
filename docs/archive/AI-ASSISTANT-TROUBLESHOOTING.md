# AI Assistant Troubleshooting Guide

## Quick Reference

### API Endpoint
- **URL**: `/api/ai-assistant/`
- **Method**: POST
- **Content-Type**: application/json
- **Version**: v53

### Expected Request Format
```json
{
  "input": "Your question here",
  "history": [
    {"user": "Previous question", "assistant": "Previous answer"}
  ],
  "file": {
    "name": "filename.pdf",
    "content": "File content (optional)"
  }
}
```

### Expected Response Format
**Streaming (default for valid queries):**
```
Content-Type: text/event-stream
Body: Raw text chunks (no JSON wrapping)
```

**JSON (for errors or pre-checks):**
```json
{
  "reply": "Response text or null",
  "error": "Error message or null"
}
```

---

## Common Errors and Solutions

### ❌ Error: "Invalid request format. Please check your input."

**Status Code:** 400 Bad Request

**Causes:**
1. Using FormData instead of JSON
2. Field name is `message` instead of `input`
3. Empty `input` string
4. Invalid JSON structure
5. `input` field missing

**How to Fix:**

```javascript
// ❌ WRONG - Don't do this
const formData = new FormData();
formData.append("message", text);
fetch("/api/ai-assistant/", { method: "POST", body: formData });

// ✅ CORRECT - Do this
const body = {
  input: text,
  history: []
};
fetch("/api/ai-assistant/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
});
```

**Testing:**
```bash
# ❌ This will fail
curl -X POST http://localhost:3000/api/ai-assistant/ \
  -H "Content-Type: application/json" \
  -d '{"message":"hello"}'

# ✅ This will work
curl -X POST http://localhost:3000/api/ai-assistant/ \
  -H "Content-Type: application/json" \
  -d '{"input":"hello"}'
```

---

### ❌ Error: "Service configuration error. Please contact support."

**Status Code:** 500 Internal Server Error

**Causes:**
1. `GEMINI_API_KEY` is missing or empty
2. `LANGSEARCH_API_KEY` is missing or empty
3. Environment variables not loaded

**How to Fix:**

1. **Check .env file:**
```bash
cat .env | grep -E "(GEMINI|LANGSEARCH)"
```

Should show:
```
GEMINI_API_KEY=AIzaSy...
LANGSEARCH_API_KEY=sk-...
```

2. **For local development:**
```bash
# Create .env from example
cp .env.example .env

# Edit and add real keys
nano .env
```

3. **For Vercel deployment:**
- Go to Vercel Dashboard
- Select your project
- Go to Settings > Environment Variables
- Add both `GEMINI_API_KEY` and `LANGSEARCH_API_KEY`
- Redeploy

4. **Restart server after adding keys:**
```bash
# Stop current server (Ctrl+C)
# Start again
npm run dev
```

**API Startup Logs:**
Look for these in server console:
```
[STARTUP ERROR] Missing required environment variables: GEMINI_API_KEY, LANGSEARCH_API_KEY
[STARTUP ERROR] Invalid env/config: ...
```

If you see these, environment variables are not properly configured.

---

### ❌ Error: "Too many requests. Please wait a moment."

**Status Code:** 429 Too Many Requests

**Causes:**
Rate limiting is working correctly - you're sending requests too fast.

**How to Fix:**

This is **expected behavior** to prevent abuse.

**Rate Limit:** 1 request per second per IP address

**Solution:**
```javascript
// Add delay between requests
async function sendMessage(text) {
  await fetch("/api/ai-assistant/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: text })
  });
  
  // Wait 1 second before next request
  await new Promise(resolve => setTimeout(resolve, 1000));
}
```

**For testing:** Wait 1+ second between curl commands

---

### ❌ Error: "AI service is temporarily unavailable. Please try again."

**Status Code:** 502 Bad Gateway

**Causes:**
1. Gemini API is down or rate limited
2. Invalid Gemini API key
3. Gemini API returned an error
4. Network connectivity issues

**How to Fix:**

1. **Check Gemini API status:**
   - Visit: https://status.cloud.google.com/

2. **Verify API key:**
```bash
# Test Gemini API directly
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"test"}]}]}'
```

3. **Check server logs:**
```
[REQUEST #X] Gemini API returned status 403
[REQUEST #X] Gemini error: API key not valid
```

4. **Retry after a moment:**
- May be temporary network issue
- API may recover

5. **Regenerate API key if needed:**
   - Go to https://ai.google.dev/
   - Generate new key
   - Update environment variable
   - Redeploy

---

### ❌ Error: "Search service timed out. Please try again."

**Status Code:** 504 Gateway Timeout

**Causes:**
LangSearch API took longer than 10 seconds to respond

**How to Fix:**

1. **Retry the request:** Often temporary network issue

2. **Check LangSearch API status:**
   - Visit: https://langsearch.com/status (if available)

3. **Simplify query:**
   - Shorter queries may respond faster
   - Avoid very specific or complex queries

4. **Check server logs:**
```
[REQUEST #X] LangSearch timeout after 10s
```

This is expected if LangSearch is slow. The API continues without search context.

---

### ❌ Error: "AI service timed out. Please try again."

**Status Code:** 504 Gateway Timeout

**Causes:**
Gemini API took longer than 15 seconds to respond

**How to Fix:**

Similar to "Search service timed out":
1. Retry the request
2. Simplify your query
3. Check Gemini API status

**Note:** 15-second timeout is generous. If hitting this often, may indicate:
- API is overloaded
- Network issues
- Very complex prompts

---

### ❌ Error: "Invalid JSON in request body"

**Status Code:** 400 Bad Request

**Causes:**
Request body is not valid JSON

**How to Fix:**

```javascript
// ❌ WRONG - Malformed JSON
fetch("/api/ai-assistant/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: '{"input":"test"'  // Missing closing brace
});

// ✅ CORRECT - Use JSON.stringify
fetch("/api/ai-assistant/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ input: "test" })
});
```

**Testing:**
```bash
# ❌ This will fail (invalid JSON)
curl -X POST http://localhost:3000/api/ai-assistant/ \
  -H "Content-Type: application/json" \
  -d '{"input":"test"'

# ✅ This will work
curl -X POST http://localhost:3000/api/ai-assistant/ \
  -H "Content-Type: application/json" \
  -d '{"input":"test"}'
```

---

### ❌ CORS Error in Browser Console

**Symptoms:**
```
Access to fetch at 'http://localhost:3000/api/ai-assistant/' from origin 'http://localhost:3001' has been blocked by CORS policy
```

**Causes:**
1. Making request from different origin in production
2. NODE_ENV=production and origin is not https://civora.me

**How to Fix:**

**For local development:**
```env
# In .env file
NODE_ENV=development
CORS_ORIGIN=*
```

**For production:**
- API only accepts requests from `https://civora.me` when `NODE_ENV=production`
- This is intentional security measure
- Cannot be bypassed (by design)

**If testing production build locally:**
```bash
# Set development mode
NODE_ENV=development npm run build
NODE_ENV=development npm start
```

---

### ❌ Streaming Response Not Working

**Symptoms:**
- Response arrives all at once instead of streaming
- Frontend doesn't show real-time updates

**Causes:**
1. Frontend not handling `text/event-stream` content type
2. Response buffering by proxy/CDN
3. Browser not supporting streaming

**How to Fix:**

```javascript
// ✅ Proper streaming handling
const response = await fetch("/api/ai-assistant/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ input: "test" })
});

if (response.headers.get("content-type")?.includes("text/event-stream")) {
  // Handle streaming
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value);
    console.log("Received chunk:", chunk);
    // Update UI with chunk
  }
} else {
  // Handle JSON
  const data = await response.json();
  console.log("Received JSON:", data);
}
```

---

## Debugging Steps

### 1. Verify API is Running

```bash
# Health check
curl http://localhost:3000/api/ai-assistant/
```

Expected output:
```json
{"status":"ok","version":"v53","envConfigured":true}
```

If `envConfigured: false`, check environment variables.

### 2. Check Environment Variables

```bash
# Local development
cat .env

# Should show (with real values):
GEMINI_API_KEY=AIzaSy...
LANGSEARCH_API_KEY=sk-...
```

### 3. Test with Minimal Request

```bash
curl -X POST http://localhost:3000/api/ai-assistant/ \
  -H "Content-Type: application/json" \
  -d '{"input":"hello"}' \
  --max-time 5
```

If this works, your API is functional.

### 4. Check Server Logs

Look for these patterns:
```
[STARTUP ERROR] ...           # Environment issues
[REQUEST #X] from IP: ...     # Request received
[REQUEST #X] Validation error: ... # Input validation failed
[REQUEST #X] LangSearch error: ... # Search API issue
[REQUEST #X] Gemini error: ...     # AI API issue
[REQUEST #X] UNCAUGHT ERROR: ...   # Unexpected error
[REQUEST #X] latency: XXXms        # Request completed
```

### 5. Test Individual Components

**Test Gemini API directly:**
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_GEMINI_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Say hello"}]}]}'
```

**Test LangSearch API directly:**
```bash
curl -X POST "https://api.langsearch.com/v1/web-search" \
  -H "Authorization: Bearer YOUR_LANGSEARCH_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query":"test","count":5}'
```

---

## Still Having Issues?

### Collect This Information:

1. **Request details:**
   - Full request payload (sanitize sensitive data)
   - Request headers
   - Response status code
   - Response body

2. **Environment:**
   - `npm list next` output
   - `node --version` output
   - Operating system
   - Browser (if frontend issue)

3. **Server logs:**
   - Last 50 lines including the error
   - Startup logs
   - Any STARTUP ERROR messages

4. **Steps to reproduce:**
   - Exact steps that cause the error
   - Expected vs actual behavior

### Where to Get Help:

1. Check existing documentation:
   - `DEPLOYMENT-CHECKLIST.md`
   - `OPENAI-REMOVAL-SUMMARY.md`
   - `TESTING-VALIDATION-SUMMARY.md`

2. Search for similar issues:
   - Check GitHub Issues
   - Review recent PRs

3. Create an issue with collected information

---

## Quick Fixes Checklist

- [ ] API is running (`npm run dev`)
- [ ] `.env` file exists with both API keys
- [ ] Request uses `input` field, not `message`
- [ ] Request is JSON, not FormData
- [ ] Content-Type header is `application/json`
- [ ] URL has trailing slash: `/api/ai-assistant/`
- [ ] Waited 1+ second between requests (avoid 429)
- [ ] Both API keys are valid and not expired
- [ ] Server restarted after changing environment variables

---

**Last Updated:** 2025-10-13  
**API Version:** v53  
**OpenAI Status:** ❌ REMOVED (no longer supported)
