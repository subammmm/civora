# Civora Deployment Flow Diagram

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                            │
│                    github.com/subammmm/civora                       │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐    │
│  │  Code Features:                                            │    │
│  │  • Next.js 14 App Router                                   │    │
│  │  • AI Chat Component (always present)                      │    │
│  │  • Conditional Rendering Logic                             │    │
│  │  • Environment Variable Support                            │    │
│  └───────────────────────────────────────────────────────────┘    │
└─────────────┬───────────────────────────────┬─────────────────────┘
              │                               │
              │ Push to main                  │ Push to main
              ▼                               ▼
┌──────────────────────────────────┐  ┌────────────────────────────┐
│    Vercel Deployment             │  │  GitHub Pages Deployment   │
│                                  │  │                            │
│  Production:                     │  │  Static Export:            │
│  • NEXT_PUBLIC_CIVORA_AI_        │  │  • npm run build:static    │
│    ENABLED=false                 │  │  • Output: /out            │
│  • Build: npm run build          │  │  • No API routes           │
│  • Domain: civora.me             │  │  • No server features      │
│                                  │  │                            │
│  Preview (from PRs):             │  │  URL:                      │
│  • NEXT_PUBLIC_CIVORA_AI_        │  │  subammmm.github.io/       │
│    ENABLED=true                  │  │  civora/                   │
│  • Build: npm run build          │  │                            │
│  • URL: civora-*.vercel.app      │  │  Purpose: Backup only      │
└──────────────┬───────────────────┘  └────────────────────────────┘
               │
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      User Access Flow                           │
└─────────────────────────────────────────────────────────────────┘

Production (civora.me):
┌────────────┐     ┌──────────────────────────────────────────┐
│   User     │────▶│  https://civora.me/                      │
│  Browser   │     │                                          │
└────────────┘     │  Features Available:                     │
                   │  ✅ Homepage with cards                   │
                   │  ✅ Scholarships database                 │
                   │  ✅ Citizenship pathways                  │
                   │  ✅ All navigation pages                  │
                   │  ❌ NO "AI Assistant" link               │
                   │  ❌ /ai-chat/ shows "Not Available"      │
                   └──────────────────────────────────────────┘

Preview (Testing):
┌────────────┐     ┌──────────────────────────────────────────┐
│ Developer  │────▶│  https://civora-abc123.vercel.app/       │
│  Browser   │     │                                          │
└────────────┘     │  Features Available:                     │
                   │  ✅ Homepage with cards                   │
                   │  ✅ Scholarships database                 │
                   │  ✅ Citizenship pathways                  │
                   │  ✅ All navigation pages                  │
                   │  ✅ "AI Assistant" link visible          │
                   │  ✅ /ai-chat/ fully functional           │
                   └──────────────────────────────────────────┘
```

## Environment Variable Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              Vercel Environment Variables                       │
└─────────────────────────────────────────────────────────────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
┌──────────────────────────┐      ┌─────────────────────────────┐
│  Production Environment  │      │   Preview Environment       │
│                          │      │                             │
│  NEXT_PUBLIC_CIVORA_     │      │  NEXT_PUBLIC_CIVORA_        │
│  AI_ENABLED = false      │      │  AI_ENABLED = true          │
│                          │      │                             │
│  GEMINI_API_KEY = xxx    │      │  GEMINI_API_KEY = xxx       │
│  LANGSEARCH_API_KEY = yyy│      │  LANGSEARCH_API_KEY = yyy   │
└──────────┬───────────────┘      └─────────────┬───────────────┘
           │                                    │
           │ At build time                      │ At build time
           ▼                                    ▼
┌──────────────────────────┐      ┌─────────────────────────────┐
│  Conditional Rendering   │      │  Conditional Rendering      │
│                          │      │                             │
│  app/layout.js:          │      │  app/layout.js:             │
│  const aiEnabled = false │      │  const aiEnabled = true     │
│                          │      │                             │
│  Result:                 │      │  Result:                    │
│  {aiEnabled && (...)}    │      │  {aiEnabled && (...)}       │
│  = {false && (...)}      │      │  = {true && (...)}          │
│  = nothing rendered      │      │  = <a>AI Assistant</a>      │
└──────────────────────────┘      └─────────────────────────────┘
```

## DNS and Domain Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Domain: civora.me                           │
│                  (Managed at domain registrar)                  │
└─────────────────────────────────────────────────────────────────┘
                               │
                    DNS Records configured:
                    A Record: @ → 76.76.21.21
                    CNAME: www → cname.vercel-dns.com
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Vercel Edge Network                        │
│                                                                 │
│  1. Receives request for civora.me                              │
│  2. Routes to correct deployment (Production)                   │
│  3. Serves Next.js app with AI disabled                         │
│  4. SSL/TLS termination                                         │
│  5. CDN caching                                                 │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    User sees civora.me
                    without AI chat link
```

## Build Process Comparison

```
┌─────────────────────────────────────────────────────────────────┐
│                 Standard Build (Vercel)                         │
│                    npm run build                                │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                 ┌──────────────────────────┐
                 │  1. Reads .env variables │
                 │  2. Builds Next.js app   │
                 │  3. Creates .next/ dir   │
                 │  4. Includes API routes  │
                 │  5. Server-side ready    │
                 └──────────────────────────┘
                               │
                               ▼
                    Output: .next/ directory
                    - Server components
                    - API routes (/api/ai-assistant/)
                    - Static pages
                    - Client bundles

┌─────────────────────────────────────────────────────────────────┐
│              Static Export Build (GitHub Pages)                 │
│                  npm run build:static                           │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                 ┌──────────────────────────┐
                 │  1. EXPORT_MODE=true     │
                 │  2. Builds Next.js app   │
                 │  3. Exports to out/ dir  │
                 │  4. NO API routes        │
                 │  5. Pure static HTML     │
                 └──────────────────────────┘
                               │
                               ▼
                    Output: out/ directory
                    - Static HTML files
                    - CSS/JS bundles
                    - Images/assets
                    - No server code
```

## Pull Request Flow

```
Developer creates PR
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  GitHub detects PR → Triggers Vercel webhook                   │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  Vercel starts Preview deployment                              │
│  • Uses Preview environment variables                           │
│  • NEXT_PUBLIC_CIVORA_AI_ENABLED=true                          │
│  • Builds with AI chat enabled                                  │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  Vercel bot comments on PR with preview URL                    │
│  "Preview: https://civora-git-feature-abc123.vercel.app"      │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
Developer/reviewer clicks preview URL
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  Preview shows full app with AI Assistant link                 │
│  • Can test AI chat functionality                               │
│  • Verify changes work correctly                               │
│  • Same codebase as production                                  │
│  • Different environment variables                              │
└─────────────────────────────────────────────────────────────────┘
```

## Conditional Rendering Decision Tree

```
                    User visits page
                           │
                           ▼
              Is NEXT_PUBLIC_CIVORA_AI_ENABLED
              set to 'true'?
                           │
                ┌──────────┴──────────┐
                │                     │
               Yes                   No
                │                     │
                ▼                     ▼
    ┌─────────────────────┐  ┌─────────────────────┐
    │ AI Chat Enabled     │  │ AI Chat Disabled    │
    │                     │  │                     │
    │ Navigation:         │  │ Navigation:         │
    │ ✅ AI Assistant     │  │ ❌ No AI link       │
    │                     │  │                     │
    │ /ai-chat/:          │  │ /ai-chat/:          │
    │ ✅ Full interface   │  │ ❌ Not Available    │
    │                     │  │    message          │
    │ API:                │  │ API:                │
    │ ✅ Accessible       │  │ ⚠️ Exists but not   │
    │                     │  │    linked           │
    └─────────────────────┘  └─────────────────────┘
            │                         │
            │                         │
            └────────────┬────────────┘
                         │
                         ▼
              Same codebase, different
              user experience based on
              environment variable
```

## Feature Availability Matrix

```
┌─────────────────┬───────────────┬───────────────┬───────────────┐
│   Feature       │  civora.me    │ Vercel Preview│ GitHub Pages  │
│                 │  (Production) │   (Testing)   │   (Backup)    │
├─────────────────┼───────────────┼───────────────┼───────────────┤
│ Homepage        │      ✅       │      ✅       │      ✅       │
│ Scholarships    │      ✅       │      ✅       │      ✅       │
│ Citizenship     │      ✅       │      ✅       │      ✅       │
│ All Pages       │      ✅       │      ✅       │      ✅       │
│ Dark UI         │      ✅       │      ✅       │      ✅       │
│ Navigation      │      ✅       │      ✅       │      ✅       │
│ AI Chat Link    │      ❌       │      ✅       │      ❌       │
│ AI Chat Page    │   ❌ Hidden   │  ✅ Working   │ ❌ Not Avail  │
│ API Routes      │  ✅ Exist but │  ✅ Linked    │      ❌       │
│                 │    not linked │               │               │
│ SSR             │      ✅       │      ✅       │      ❌       │
│ Custom Domain   │      ✅       │      ❌       │      ❌       │
└─────────────────┴───────────────┴───────────────┴───────────────┘
```

## Summary

This dual deployment strategy provides:
- **Production (civora.me)**: Clean experience without AI chat
- **Preview (testing)**: Full features including AI chat
- **Backup (GitHub Pages)**: Static fallback
- **Flexibility**: Can enable AI on production anytime
- **Safety**: All code preserved, nothing deleted
- **Simplicity**: Single environment variable controls everything

For deployment instructions, see: VERCEL-DEPLOYMENT-INSTRUCTIONS.md
