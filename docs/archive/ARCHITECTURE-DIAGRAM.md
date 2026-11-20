# Visual Architecture Diagram - Civora AI Assistant

```
┌────────────────────────────────────────────────────────────────────────────┐
│                         CIVORA AI ASSISTANT ARCHITECTURE                    │
│                    (OpenAI REMOVED - Gemini + LangSearch Only)             │
└────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER REQUEST FLOW                              │
└─────────────────────────────────────────────────────────────────────────────┘

    User Types Query
         ↓
    ┌─────────────────────────────────────┐
    │  Frontend: AIChatInterface.js       │
    │  ─────────────────────────────────  │
    │  • Validates input locally          │
    │  • Creates JSON payload:            │
    │    {                                │
    │      "input": "user query",         │
    │      "history": [...]               │
    │    }                                │
    │  • Sends to API with trailing /    │
    └─────────────────────────────────────┘
              ↓
    POST /api/ai-assistant/
    Content-Type: application/json
              ↓
    ┌─────────────────────────────────────┐
    │  API Route: route.js (v53)          │
    │  ─────────────────────────────────  │
    │  FIX #1: Environment Validation     │
    │  • Check GEMINI_API_KEY exists     │
    │  • Check LANGSEARCH_API_KEY exists │
    │  • Return 500 if missing           │
    └─────────────────────────────────────┘
              ↓
    ┌─────────────────────────────────────┐
    │  FIX #5: Early Environment Check    │
    │  ─────────────────────────────────  │
    │  • If envValidationError != null   │
    │    → Return 500 immediately        │
    └─────────────────────────────────────┘
              ↓
    ┌─────────────────────────────────────┐
    │  Rate Limiting                      │
    │  ─────────────────────────────────  │
    │  • Max 1 request per second per IP │
    │  • Return 429 if exceeded          │
    └─────────────────────────────────────┘
              ↓
    ┌─────────────────────────────────────┐
    │  FIX #6: Input Validation           │
    │  ─────────────────────────────────  │
    │  • Parse JSON body                  │
    │  • Validate 'input' field exists   │
    │  • Validate 'input' is non-empty   │
    │  • Return 400 if invalid           │
    └─────────────────────────────────────┘
              ↓
    ┌─────────────────────────────────────┐
    │  Pre-checks (Fast Responses)        │
    │  ─────────────────────────────────  │
    │  • Casual greetings → Instant      │
    │  • Date/time queries → Instant     │
    │  • Math calculations → Instant     │
    │  • Platform info → Instant         │
    └─────────────────────────────────────┘
              ↓
         Query Needs AI?
              ↓
         ┌─────┴──────┐
         │            │
    Need Search?   No Search
         │            │
         ↓            │
    ┌─────────────────────────────────┐  │
    │  FIX #7: LangSearch API         │  │
    │  ───────────────────────────── │  │
    │  • 10 second timeout            │  │
    │  • Return 504 if timeout        │  │
    │  • Log errors                   │  │
    │  • Continue without if fails    │  │
    └─────────────────────────────────┘  │
         │                               │
         └───────────────┬───────────────┘
                         ↓
    ┌─────────────────────────────────────┐
    │  FIX #8: Gemini API                 │
    │  ─────────────────────────────────  │
    │  • 15 second timeout                │
    │  • Streaming response (SSE)         │
    │  • Return 502 if fails              │
    │  • Return 504 if timeout            │
    └─────────────────────────────────────┘
              ↓
    ┌─────────────────────────────────────┐
    │  Response Format                    │
    │  ─────────────────────────────────  │
    │  Streaming (text/event-stream):     │
    │    Raw text chunks                  │
    │                                     │
    │  JSON (errors/pre-checks):          │
    │    {"reply": "...", "error": null}  │
    │    {"reply": null, "error": "..."}  │
    └─────────────────────────────────────┘
              ↓
    ┌─────────────────────────────────────┐
    │  Frontend: Handle Response          │
    │  ─────────────────────────────────  │
    │  • If streaming: Read chunks        │
    │  • Update UI in real-time           │
    │  • If JSON: Show reply/error        │
    └─────────────────────────────────────┘
              ↓
         Display to User

┌─────────────────────────────────────────────────────────────────────────────┐
│                            ERROR HANDLING FLOW                              │
└─────────────────────────────────────────────────────────────────────────────┘

    Error Occurs
         ↓
    ┌─────────────────────────────────────┐
    │  Determine Error Type               │
    └─────────────────────────────────────┘
         ↓
    ┌────┴────┬──────┬──────┬──────┬─────┐
    │         │      │      │      │     │
   400       429    500    502    504   Other
    │         │      │      │      │     │
    ↓         ↓      ↓      ↓      ↓     ↓
Invalid   Rate   Env    API   Timeout  500
Request   Limit  Error  Down  Error    Generic
    │         │      │      │      │     │
    ↓         ↓      ↓      ↓      ↓     ↓
"Check    "Wait" "Contact "Try  "Try   "Try
 input"           support" again" again" again
                                         or contact"

All errors logged with [REQUEST #X] prefix for debugging

┌─────────────────────────────────────────────────────────────────────────────┐
│                         ENVIRONMENT CONFIGURATION                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│  civora.me (Production)         │  │  Vercel Preview (Testing)       │
│  ─────────────────────────────  │  │  ─────────────────────────────  │
│  NEXT_PUBLIC_CIVORA_AI_ENABLED │  │  NEXT_PUBLIC_CIVORA_AI_ENABLED │
│    = false                      │  │    = true                       │
│                                 │  │                                 │
│  Result:                        │  │  Result:                        │
│  • /ai-chat/ shows "Not        │  │  • /ai-chat/ shows chat UI     │
│    Available" message           │  │  • API is accessible            │
│  • API exists but unused        │  │  • Full functionality           │
│  • Reduces costs                │  │                                 │
└─────────────────────────────────┘  └─────────────────────────────────┘

Both deployments require:
• GEMINI_API_KEY
• LANGSEARCH_API_KEY
• NODE_ENV=production

┌─────────────────────────────────────────────────────────────────────────────┐
│                          API PROVIDER CHANGES                               │
└─────────────────────────────────────────────────────────────────────────────┘

BEFORE (v51 and earlier):
┌──────────┐  ┌──────────┐  ┌─────────────┐
│ LangSearch│  │  Gemini  │  │  OpenAI ❌  │
└──────────┘  └──────────┘  └─────────────┘
    ↓              ↓              ↓
Search         Primary        Fallback
Context        Response       (if Gemini fails)

AFTER (v53):
┌──────────┐  ┌──────────┐
│ LangSearch│  │  Gemini  │
└──────────┘  └──────────┘
    ↓              ↓
Search         Response
Context        (no fallback)

Why OpenAI Removed:
• High costs for production
• Rate limiting on free tier
• Simpler architecture (2 vs 3 APIs)
• Better response control
• No silent fallbacks (fail clearly)

┌─────────────────────────────────────────────────────────────────────────────┐
│                       REQUEST/RESPONSE EXAMPLES                             │
└─────────────────────────────────────────────────────────────────────────────┘

✅ VALID REQUEST (Fixed in this PR):
POST /api/ai-assistant/
Content-Type: application/json
{
  "input": "Tell me about scholarships",
  "history": [
    {"user": "Hello", "assistant": "Hi! How can I help?"}
  ]
}

→ 200 OK
Content-Type: text/event-stream
[streaming text chunks...]

───────────────────────────────────────────────────────────────────────────────

❌ INVALID REQUEST (Old Format - Returns Clear Error):
POST /api/ai-assistant/
Content-Type: application/json
{
  "message": "Tell me about scholarships",  ❌ Wrong field name
  "history": []
}

→ 400 Bad Request
{
  "reply": null,
  "error": "Invalid request format. Please check your input."
}

Server Log:
[REQUEST #1] Validation error: Invalid input: expected string, received undefined

───────────────────────────────────────────────────────────────────────────────

❌ ENVIRONMENT ERROR:
POST /api/ai-assistant/
(missing GEMINI_API_KEY)

→ 500 Internal Server Error
{
  "reply": null,
  "error": "Service configuration error. Please contact support."
}

Server Log:
[STARTUP ERROR] Missing required environment variables: GEMINI_API_KEY
[REQUEST ERROR] Environment not configured

┌─────────────────────────────────────────────────────────────────────────────┐
│                         MONITORING & LOGGING                                │
└─────────────────────────────────────────────────────────────────────────────┘

All logs include request numbers for correlation:

[STARTUP ERROR] Missing required environment variables: ...
[REQUEST #1] from 192.168.1.1: Input "hello"
[REQUEST #1] Validation error: Too small: expected string...
[REQUEST #2] LangSearch error: timeout
[REQUEST #3] Gemini error: API key invalid
[REQUEST #4] UNCAUGHT ERROR: Unexpected error
[REQUEST #5] latency: 1234ms

Monitor:
• Response times (should be <3s for stream start)
• Error rates by status code
• API key usage/quotas
• Vercel function invocations

┌─────────────────────────────────────────────────────────────────────────────┐
│                              KEY FEATURES                                   │
└─────────────────────────────────────────────────────────────────────────────┘

✅ OpenAI Removed (v53)
✅ Only Gemini + LangSearch (v53)
✅ Environment Validation (v53)
✅ Comprehensive Error Handling (v53)
✅ Rate Limiting (v53)
✅ Request Logging (v53)
✅ Frontend-Backend Fix (THIS PR)
✅ Streaming Responses (THIS PR)
✅ Complete Documentation (THIS PR)

Status: ✅ PRODUCTION READY
Version: v53 with frontend fix
Last Updated: 2025-10-13
```
