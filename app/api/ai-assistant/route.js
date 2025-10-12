// v51 - Final production version for Vercel: streaming, context-first, transcript fix, typo dict, safe math, consistent error shape, OpenAI fallback, strict CORS, health check
// Native modules removed for serverless compatibility

import { z } from 'zod';
import { create, all } from 'mathjs';
const OpenAI = process.env.FALLBACK_PROVIDER === 'openai' ? require('openai') : null;

// Env validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  GEMINI_API_KEY: z.string().min(1),
  LANGSEARCH_API_KEY: z.string().min(1),
  FALLBACK_PROVIDER: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
});
try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Invalid env/config:', error.issues.map(i => i.message).join('; '));
  }
}

if (!process.env.GEMINI_API_KEY || !process.env.LANGSEARCH_API_KEY) {
  console.error('Missing API keys! Set GEMINI_API_KEY and LANGSEARCH_API_KEY in .env');
}

let requestCount = 0;
const math = create(all, { number: 'BigNumber' });

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' ? 'https://civora.me' : '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  return new Response(JSON.stringify({ status: 'ok', version: 'v51' }), { status: 200, headers: CORS_HEADERS });
}

export async function POST(req) {
  if (!global.rateLimits) global.rateLimits = {};
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  if (global.rateLimits[ip] && now - global.rateLimits[ip] < 1000) {
    return new Response(JSON.stringify({ reply: null, error: "Too many requests. Please wait a moment." }), { status: 429, headers: CORS_HEADERS });
  }
  global.rateLimits[ip] = now;

  requestCount++;
  try {
    // Input Validation
    const body = await req.json();
    const schema = z.object({
      input: z.string().min(1).max(2000).trim(),
      history: z.array(z.object({
        user: z.string().optional(),
        assistant: z.string().optional(),
      })).max(10).default([]),
      file: z.object({ name: z.string(), content: z.string().optional() }).optional(),
    });
    const { input: rawInput, history, file } = schema.parse(body);

    console.log(`Request #${requestCount} from ${ip}: Input "${rawInput}"`);

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
        }
        if (!searchContext) searchContext = 'No live web context found.';
      } catch (err) {
        if (err.name === 'AbortError') {
          console.error('LangSearch timeout');
          return new Response(JSON.stringify({ reply: null, error: 'LangSearch API request timed out' }), { status: 504, headers: CORS_HEADERS });
        }
        console.error('LangSearch error:', err.message);
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
    let answer = '';
    let geminiFailed = false;
    const start = Date.now();
    try {
      const gemController = new AbortController();
      const gemTimeout = setTimeout(() => gemController.abort(), 15000);
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${process.env.GEMINI_API_KEY}&alt=sse`,
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
        const stream = new ReadableStream({
          async start(controller) {
            const reader = geminiRes.body.getReader();
            let buffer = '';
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
                  } catch (e) { console.error('Parse error:', e); }
                }
              });
            }
            controller.close();
          }
        });
        const latency = Date.now() - start;
        console.log(`Request #${requestCount} latency: ${latency}ms (streamed)`);
        return new Response(stream, { headers: { ...CORS_HEADERS, 'Content-Type': 'text/event-stream' } });
      }

      // Fallback: non-stream (should not happen but for completeness)
      if (!geminiRes.ok) {
        console.error("Gemini status:", geminiRes.status);
        geminiFailed = true;
      } else {
        const geminiData = await geminiRes.json();
        if (geminiData.error) {
          console.error("Gemini error:", geminiData.error.message);
          geminiFailed = true;
        } else {
          answer = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '_No answer_';
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.error('Gemini timeout');
        return new Response(JSON.stringify({ reply: null, error: 'Gemini API request timed out' }), { status: 504, headers: CORS_HEADERS });
      }
      console.error('Gemini error:', err.message);
      geminiFailed = true;
    }

    // OpenAI fallback
    if (geminiFailed && process.env.FALLBACK_PROVIDER === 'openai' && process.env.OPENAI_API_KEY && OpenAI) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const fallbackRes = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: mentorPrompt },
          { role: 'user', content: correctedInput },
        ],
        max_tokens: 1200,
        temperature: 0.3,
        stop: ['User:'],
      });
      answer = fallbackRes.choices[0].message.content.trim() || "_No answer_";
      answer = `---\n${answer}\n--- (via fallback)`;
    }

    if (geminiFailed && !answer) {
      return new Response(
        JSON.stringify({ reply: null, error: 'Gemini failed to generate a response' }),
        { status: 502, headers: CORS_HEADERS }
      );
    }

    answer = `---\n${answer}\n---`;
    const latency = Date.now() - start;
    console.log(`Request #${requestCount} latency: ${latency}ms`);

    return new Response(
      JSON.stringify({ reply: answer, error: null }),
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    const msg = error?.message || 'API failed';
    console.error('Error:', msg);
    return new Response(JSON.stringify({ reply: null, error: msg }), { status: 502, headers: CORS_HEADERS });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 210380c04b8db625929fd439612f68690ed23ff5
