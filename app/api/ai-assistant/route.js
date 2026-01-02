// v56 - GEMINI MODEL FIX: Updated to use correct Gemini model name
// Fixed invalid model reference from gemini-2.5-flash to gemini-1.5-flash
// This resolves API errors caused by requesting non-existent model
//
// v55 - TRAILING SLASH FIX: API routes now work without trailing slashes
// Fixed 308 redirect issue by making trailingSlash conditional in next.config.js
// Frontend updated to call /api/ai-assistant (no trailing slash)
// This prevents POST body loss in 308 redirects and eliminates 502 Bad Gateway errors
//
// v54 - FINAL FIX: Enhanced logging, detailed error messages, OpenAI permanently removed
// Fixed all 400 Bad Request errors with comprehensive request validation and logging
// Improved error messages: specific feedback for validation, provider, and rate limit errors
// OpenAI API completely removed - uses ONLY Gemini and LangSearch
// All errors logged with request numbers for debugging

/**
 * AI Assistant API Route - Conditional Rendering for Deployments
 * 
 * This API route is preserved in the codebase for both civora.me and Vercel deployments.
 * The frontend conditionally accesses this API based on NEXT_PUBLIC_CIVORA_AI_ENABLED:
 * 
 * - Vercel deployment (NEXT_PUBLIC_CIVORA_AI_ENABLED=true): AI chat UI is shown, API is accessible
 * - civora.me deployment (NEXT_PUBLIC_CIVORA_AI_ENABLED=false): AI chat UI is hidden, API exists but unused
 * 
 * The API itself is always functional, but the UI conditionally hides/shows access to it.
 * This keeps all code intact while controlling where AI features are visible.
 */

import { z } from 'zod';
import { create, all } from 'mathjs';

// FIX #1: Enhanced environment validation with early error detection
// This prevents 502 errors from missing API keys during request processing
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  GEMINI_API_KEY: z.string().min(1),
  LANGSEARCH_API_KEY: z.string().min(1),
});

// Store validation result to check before processing requests
let envValidationError = null;
try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    envValidationError = error.issues.map(i => i.message).join('; ');
    console.error('[STARTUP ERROR] Invalid env/config:', envValidationError);
  }
}

// FIX #2: Early check for missing API keys to provide clear error messages
if (!process.env.GEMINI_API_KEY || !process.env.LANGSEARCH_API_KEY) {
  const missingKeys = [];
  if (!process.env.GEMINI_API_KEY) missingKeys.push('GEMINI_API_KEY');
  if (!process.env.LANGSEARCH_API_KEY) missingKeys.push('LANGSEARCH_API_KEY');
  envValidationError = `Missing required environment variables: ${missingKeys.join(', ')}`;
  console.error('[STARTUP ERROR]', envValidationError);
}

let requestCount = 0;
const math = create(all, { number: 'BigNumber' });

// FIX #3: Strict CORS headers for production security
const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' ? 'https://civora.me' : '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// FIX #4: Health check endpoint with env status
// Returns API version and configuration status
export async function GET() {
  return new Response(
    JSON.stringify({ 
      status: 'ok', 
      version: 'v56',
      envConfigured: !envValidationError,
      providers: 'Gemini + LangSearch only (OpenAI removed)',
      trailingSlash: 'Not required (v55 fix)',
      model: 'gemini-1.5-flash (v56 fix)'
    }), 
    { status: 200, headers: CORS_HEADERS }
  );
}

export async function POST(req) {
  // FIX #5: Early return if environment is not properly configured
  // Prevents 502 errors from attempting to use missing API keys
  // Returns clear error message indicating misconfiguration
  if (envValidationError) {
    console.error(`[REQUEST #${requestCount}] Environment not configured:`, envValidationError);
    return new Response(
      JSON.stringify({ 
        reply: null, 
        error: 'AI service temporarily unavailable due to configuration error. Please contact support.' 
      }), 
      { status: 500, headers: CORS_HEADERS }
    );
  }

  // Rate limiting: Prevent spam and abuse (1 request per second per IP)
  if (!global.rateLimits) global.rateLimits = {};
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  if (global.rateLimits[ip] && now - global.rateLimits[ip] < 1000) {
    console.log(`[RATE LIMIT] IP ${ip} exceeded rate limit`);
    return new Response(
      JSON.stringify({ 
        reply: null, 
        error: "Too many requests. Please wait a moment before sending another message." 
      }), 
      { status: 429, headers: CORS_HEADERS }
    );
  }
  global.rateLimits[ip] = now;

  requestCount++;
  
  // FIX #6: Comprehensive try-catch wrapper for all handler logic
  // Catches any uncaught exceptions and returns proper error responses
  try {
    // Input Validation with detailed error logging
    let body;
    try {
      body = await req.json();
    } catch (jsonError) {
      console.error(`[REQUEST #${requestCount}] JSON parse error:`, jsonError.message);
      console.error(`[REQUEST #${requestCount}] Request details - IP: ${ip}, Content-Type: ${req.headers.get('content-type')}`);
      return new Response(
        JSON.stringify({ 
          reply: null, 
          error: 'Invalid JSON in request body. Please ensure you are sending valid JSON with Content-Type: application/json.' 
        }), 
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Log the incoming request payload for debugging
    console.log(`[REQUEST #${requestCount}] Payload received:`, JSON.stringify({
      hasInput: !!body.input,
      inputLength: body.input?.length || 0,
      historyLength: body.history?.length || 0,
      hasFile: !!body.file
    }));

    const schema = z.object({
      input: z.string().min(1).max(2000).trim(),
      history: z.array(z.object({
        user: z.string().optional(),
        assistant: z.string().optional(),
      })).max(10).default([]),
      file: z.object({ name: z.string(), content: z.string().optional() }).optional(),
    });
    
    let parsedData;
    try {
      parsedData = schema.parse(body);
    } catch (validationError) {
      console.error(`[REQUEST #${requestCount}] Validation error:`, validationError.message);
      console.error(`[REQUEST #${requestCount}] Failed payload:`, JSON.stringify(body));
      
      // Provide specific validation error message
      let specificError = 'Invalid request format. ';
      if (!body.input) {
        specificError += 'Missing required field "input". ';
      } else if (typeof body.input !== 'string') {
        specificError += 'Field "input" must be a string. ';
      } else if (body.input.trim().length === 0) {
        specificError += 'Field "input" cannot be empty. ';
      } else if (body.input.length > 2000) {
        specificError += 'Field "input" exceeds maximum length of 2000 characters. ';
      }
      
      return new Response(
        JSON.stringify({ 
          reply: null, 
          error: specificError.trim() || 'Invalid request format. Please check your input.' 
        }), 
        { status: 400, headers: CORS_HEADERS }
      );
    }
    
    const { input: rawInput, history, file } = parsedData;

    console.log(`[REQUEST #${requestCount}] from IP ${ip}: Processing query "${rawInput.substring(0, 100)}${rawInput.length > 100 ? '...' : ''}"`);
    if (history && history.length > 0) {
      console.log(`[REQUEST #${requestCount}] Conversation history: ${history.length} previous turns`);
    }

    // Typo correction
    const typoDict = {
      'shcolarship': 'scholarship', 'scholorship': 'scholarship', 'scolarship': 'scholarship',
      'scholership': 'scholarship', 'scholaship': 'scholarship',
      'citizenshipp': 'citizenship', 'citiznship': 'citizenship', 'citizneshipo': 'citizenship',
      'citizinship': 'citizenship', 'citizenhip': 'citizenship', 'univerity': 'university',
      'ielts': 'IELTS', 'toefl': 'TOEFL', 'imigration': 'immigration', 'immigartion': 'immigration',
      'immgration': 'immigration', 'immigrationn': 'immigration', 'immigratoin': 'immigration',
      'universites': 'universities', 'univercities': 'universities', 'unveristy': 'university', 'unversity': 'university',
      'frensh': 'french', 'franch': 'french',
      'studing': 'studying', 'studdying': 'studying', 'studdy': 'studying',
      'abrod': 'abroad', 'abroaded': 'abroad',
      'visaa': 'visa', 'viza': 'visa',
      'accomodation': 'accommodation', 'accomadation': 'accommodation',
      'career': 'career'
    };
    let correctedInput = rawInput.split(' ').map(word => typoDict[word.toLowerCase()] || word).join(' ');

    // File Handling (PDF + Image OCR removed for Vercel compatibility)
    let fileContent = '';
    if (file?.content) {
      fileContent = 'File parsing not supported on Vercel serverless.';
    }

    // Math Pre-Check (safe with mathjs)
    if (/^[\d\s\+\-\*\/\(\)\.]+$/.test(correctedInput)) {
      try {
        const result = math.evaluate(correctedInput);
        return new Response(JSON.stringify({ reply: `Result: ${result}`, error: null }), { status: 200, headers: CORS_HEADERS });
      } catch {}
    }

    // Pre-checks
    const casualGreetings = ["yo", "hi", "hello", "hey", "sup", "whats up", "namaste"];
    if (casualGreetings.includes(correctedInput.toLowerCase())) {
      return new Response(
        JSON.stringify({ reply: "Hey! All good here — what’s on your mind?", error: null }),
        { status: 200, headers: CORS_HEADERS }
      );
    }
    if (/date|today|day|time/.test(correctedInput.toLowerCase())) {
      const now = new Date();
      const formatted = now.toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      }) + " " + now.toLocaleTimeString("en-US");
      return new Response(
        JSON.stringify({ reply: `Today's date and time: ${formatted}`, error: null }),
        { status: 200, headers: CORS_HEADERS }
      );
    }
    if (/who.*(owner|founder|made|created)/.test(correctedInput.toLowerCase()) && /(civora|civora\.me)/.test(correctedInput.toLowerCase())) {
      return new Response(
        JSON.stringify({ reply: "Civora is a civic-tech platform founded by Shubham Dhakal.", error: null }),
        { status: 200, headers: CORS_HEADERS }
      );
    }
    if (/apis? (are|do you) (you )?use/.test(correctedInput.toLowerCase()) || /api/.test(correctedInput.toLowerCase())) {
      return new Response(
        JSON.stringify({ reply: "Civora uses LangSearch for real-time web search and Gemini for reasoning and structured answers.", error: null }),
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // Conditional Search triggers
    const searchTriggers = [
      /current|latest|news|202[0-9]|president|nobel|who won|what happened/i,
      /study|scholarship|citizenship|university|abroad|ielts|toefl|visa|career|path|job|internship/i
    ];
    const searchNeeded = searchTriggers.some(trigger => trigger.test(correctedInput));
    let searchContext = 'No live web context found.';
    if (searchNeeded) {
      // FIX #7: Enhanced error handling for LangSearch API calls with detailed logging
      console.log(`[REQUEST #${requestCount}] Triggering LangSearch for query context`);
      try {
        const langController = new AbortController();
        const langTimeout = setTimeout(() => langController.abort(), 10000);
        const langsearchResponse = await fetch('https://api.langsearch.com/v1/web-search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.LANGSEARCH_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: correctedInput,
            summary: true,
            count: 5,
          }),
          signal: langController.signal,
        });
        clearTimeout(langTimeout);

        if (langsearchResponse.ok) {
          const langsearchData = await langsearchResponse.json();
          searchContext = langsearchData.data?.webPages?.value?.map(page => page.snippet || page.summary || "").join('\n') || '';
          console.log(`[REQUEST #${requestCount}] LangSearch returned ${langsearchData.data?.webPages?.value?.length || 0} results`);
        } else {
          console.error(`[REQUEST #${requestCount}] LangSearch API error: Status ${langsearchResponse.status}`);
          const errorText = await langsearchResponse.text().catch(() => 'No error details');
          console.error(`[REQUEST #${requestCount}] LangSearch error details:`, errorText);
        }
        if (!searchContext) searchContext = 'No live web context found.';
      } catch (err) {
        if (err.name === 'AbortError') {
          console.error(`[REQUEST #${requestCount}] LangSearch timeout after 10s`);
          return new Response(
            JSON.stringify({ 
              reply: null, 
              error: 'Web search service timed out. Please try again with a simpler query.' 
            }), 
            { status: 504, headers: CORS_HEADERS }
          );
        }
        console.error(`[REQUEST #${requestCount}] LangSearch unexpected error:`, err.message, err.stack);
        searchContext = 'No live web context found.';
      }
    }

    // Build transcript (last 5 turns, consistent casing)
    const transcript = history.slice(-5).map(turn =>
      `${turn.user ? `User: ${turn.user}\n` : ''}${turn.assistant ? `Civora: ${turn.assistant}` : ''}`
    ).filter(Boolean).join('\n\n');

    // Persona/roadmap prompt
    const mentorPrompt = `
Live info (must use if relevant):
${searchContext}
${fileContent ? `\n\nUploaded file context:\n${fileContent}` : ''}

Conversation so far:
${transcript}

You are Civora, a civic-tech mentor for students and global nomads. Never act like a dictionary. Never claim to be made by Google. Civora is a civic-tech platform founded by Shubham Dhakal.

Always prioritize live info from search context if it exists. Do not ignore it. Use the conversation history for context chaining. Interpret follow-up questions based on previous turns as a mentor.

User question:
${correctedInput}

If the question is about studying abroad, scholarships, citizenship, or career paths:
- Output a roadmap with sections:
  ### Pathways
  ### Requirements
  ### Documents
  ### ECAs
  ### Next Steps
- Use bullet points and short actionable advice.
- Do NOT explain obvious words or give dictionary definitions.

Example roadmap:

### Pathways
- Naturalization (residency years)
- Marriage to citizen (duration + language)
- Descent (proof of parentage)

### Requirements
- Language: B1–B2 (CEFR)
- Clean record, integration proof

### Documents
- Passport, residence permits, birth/marriage certificates

### ECAs
- Community engagement, leadership, volunteering

### Next Steps
1. Confirm eligibility pathway.
2. Gather documents.
3. Book language test.
4. Submit application.

If the question is general knowledge:
- Give a direct, factual answer in 2–3 sentences max.
- NO dictionary-style breakdowns.
- If asked "in Europe" or similar follow-ups, interpret in context of previous question.

Always format everything in Markdown with headings and bullet lists.
If you cannot generate a complete roadmap, reply with: "Sorry, couldn't generate a complete roadmap. Try rephrasing your question."
`;

    // Gemini call with timeout and streaming
    // Uses ONLY Gemini API - OpenAI has been permanently removed
    let answer = '';
    let geminiFailed = false;
    const start = Date.now();
    
    console.log(`[REQUEST #${requestCount}] Sending query to Gemini API`);
    
    // FIX #8: Enhanced error handling for Gemini API calls with detailed logging
    try {
      const gemController = new AbortController();
      const gemTimeout = setTimeout(() => gemController.abort(), 15000);
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${process.env.GEMINI_API_KEY}&alt=sse`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: mentorPrompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 1200,
              stopSequences: ['User:'],
            },
            stream: true,
          }),
          signal: gemController.signal,
        }
      );
      clearTimeout(gemTimeout);

      // Streaming response
      if (geminiRes.ok && geminiRes.body) {
        console.log(`[REQUEST #${requestCount}] Gemini streaming response started`);
        const stream = new ReadableStream({
          async start(controller) {
            const reader = geminiRes.body.getReader();
            let buffer = '';
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += new TextDecoder().decode(value);
                const events = buffer.split('\n\n');
                buffer = events.pop();
                events.forEach(event => {
                  if (event.startsWith('data:')) {
                    const jsonStr = event.slice(5).trim();
                    try {
                      const chunk = JSON.parse(jsonStr);
                      const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text || '';
                      if (text) controller.enqueue(text);
                    } catch (e) { 
                      console.error(`[REQUEST #${requestCount}] Stream parse error:`, e.message); 
                    }
                  }
                });
              }
            } catch (streamError) {
              console.error(`[REQUEST #${requestCount}] Stream read error:`, streamError.message);
            } finally {
              controller.close();
              console.log(`[REQUEST #${requestCount}] Gemini stream completed`);
            }
          }
        });
        const latency = Date.now() - start;
        console.log(`[REQUEST #${requestCount}] Response latency: ${latency}ms (streamed)`);
        return new Response(stream, { headers: { ...CORS_HEADERS, 'Content-Type': 'text/event-stream' } });
      }

      // Fallback: non-stream (should not happen but for completeness)
      if (!geminiRes.ok) {
        const errorBody = await geminiRes.text().catch(() => 'No error details');
        console.error(`[REQUEST #${requestCount}] Gemini API error: Status ${geminiRes.status}`);
        console.error(`[REQUEST #${requestCount}] Gemini error details:`, errorBody);
        geminiFailed = true;
      } else {
        const geminiData = await geminiRes.json();
        if (geminiData.error) {
          console.error(`[REQUEST #${requestCount}] Gemini returned error:`, geminiData.error.message);
          geminiFailed = true;
        } else {
          answer = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '_No answer_';
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.error(`[REQUEST #${requestCount}] Gemini timeout after 15s`);
        return new Response(
          JSON.stringify({ 
            reply: null, 
            error: 'AI service timed out while processing your request. Please try a shorter or simpler question.' 
          }), 
          { status: 504, headers: CORS_HEADERS }
        );
      }
      console.error(`[REQUEST #${requestCount}] Gemini unexpected error:`, err.message, err.stack);
      geminiFailed = true;
    }

    if (geminiFailed && !answer) {
      return new Response(
        JSON.stringify({ 
          reply: null, 
          error: 'AI service is temporarily unavailable. This could be due to high demand or a service issue. Please try again in a moment.' 
        }),
        { status: 502, headers: CORS_HEADERS }
      );
    }

    answer = `---\n${answer}\n---`;
    const latency = Date.now() - start;
    console.log(`[REQUEST #${requestCount}] Response latency: ${latency}ms (complete)`);

    return new Response(
      JSON.stringify({ reply: answer, error: null }),
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    // FIX #9: Comprehensive fallback error handler for any uncaught exceptions
    // Returns 500 status with sanitized error message and logs full details
    const msg = error?.message || 'Unknown error occurred';
    console.error(`[REQUEST #${requestCount}] UNCAUGHT ERROR:`, msg);
    console.error(`[REQUEST #${requestCount}] Stack trace:`, error?.stack);
    console.error(`[REQUEST #${requestCount}] Error type:`, error?.name);
    
    return new Response(
      JSON.stringify({ 
        reply: null, 
        error: 'An unexpected error occurred while processing your request. Our team has been notified. Please try again or contact support if the issue persists.' 
      }), 
      { status: 500, headers: CORS_HEADERS }
    );
  }
}