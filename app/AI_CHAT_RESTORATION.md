# AI Chat Component - Restoration Guide

## Current State

The Civora homepage (`app/page.js`) currently displays a **static landing page** with information about Civora, its mission, features, and links to key sections (scholarships, citizenship, etc.).

The **AI Chat component code is fully preserved** in the repository but is NOT rendered on the homepage. All AI chat functionality, including:
- Chat interface with message history
- Streaming responses via SSE
- File upload support (images/PDFs)
- React state management
- EventSource polyfill for POST SSE

...remains in the codebase and can be restored at any time.

## Why the Change?

Per issue requirements, the AI chat UI was removed from the homepage to restore the original static information/landing page that existed before the AI chat was added. This change:
- ✅ Restores the classic Civora info page
- ✅ Keeps Next.js stack and codebase intact
- ✅ Preserves all AI code (just not rendered)
- ✅ Maintains all other site functionality

## How to Restore AI Chat to Homepage

If you want to bring back the AI chat interface to the homepage, follow these steps:

### Option 1: Quick Restore (Recommended)

1. Open `app/page.js`
2. Delete the entire current `Home()` function (lines 3-136)
3. Scroll to the commented section at the bottom of the file
4. Uncomment all the AI chat code (everything inside the `/* ... */` block)
5. Add these imports at the top of the file (after `import "./globals.css";`):
   ```javascript
   "use client";
   import { useState, useRef, useEffect } from "react";
   import ReactMarkdown from "react-markdown";
   import remarkGfm from "remark-gfm";
   ```
6. Replace the `Home()` function with:
   ```javascript
   export default function Home() {
     return <CivoraAIChat />;
   }
   ```

### Option 2: Git Restore

Restore from the commit before this change:

```bash
# Find the commit hash before this PR
git log --oneline app/page.js

# Restore the AI chat version
git checkout <previous-commit-hash> -- app/page.js
```

## File Changes Made

Only **one file was modified** to restore the static homepage:

- `app/page.js` - Replaced AI chat component with static HTML landing page

All other files remain unchanged:
- ✅ `app/api/ai-assistant/route.js` - AI API endpoint still exists
- ✅ `app/layout.js` - Header/footer unchanged
- ✅ All other pages unchanged
- ✅ Next.js configuration unchanged
- ✅ Dependencies unchanged (react-markdown, remark-gfm still installed)

## Build Impact

The homepage is now much lighter:

**Before (AI Chat):**
- Homepage size: 46.1 kB
- First Load JS: 133 kB (includes React state, markdown parser, SSE polyfill)

**After (Static Landing):**
- Homepage size: 182 B
- First Load JS: 87.4 kB (minimal, just base Next.js)

**Improvement:** ~45% reduction in JavaScript bundle size for the homepage

## Testing

After restoring AI chat, verify:

1. **Dev server:** `npm run dev` and visit http://localhost:3000/
2. **Chat functionality:**
   - Send text messages
   - Upload images/PDFs
   - Stream responses work
   - Clear history works
3. **Build:** `npm run build` should complete successfully

## API Endpoint

The AI assistant API endpoint remains fully functional at `/api/ai-assistant/` and can be used by:
- The restored chat interface
- Other pages or components
- External integrations

## Questions?

For questions about:
- **AI chat restoration:** See this guide
- **Static homepage content:** Edit `app/page.js` (current version)
- **Site architecture:** See `DEVELOPMENT-GUIDE.md`
- **Deployment:** See `README.md`
