# AI Chat Conditional Rendering Guide

## Overview

The Civora platform includes an AI-powered chat assistant that is **conditionally enabled** based on deployment environment. This allows:

- **Vercel deployment**: Full AI chat functionality enabled
- **civora.me deployment**: AI chat hidden/disabled from users

**Important**: The AI chat code is **never deleted** - it's always present in the codebase but conditionally rendered based on environment variables.

## How It Works

### Environment Variable Control

The `NEXT_PUBLIC_CIVORA_AI_ENABLED` environment variable controls AI chat visibility:

```bash
# Enable AI chat (Vercel)
NEXT_PUBLIC_CIVORA_AI_ENABLED=true

# Disable AI chat (civora.me)
NEXT_PUBLIC_CIVORA_AI_ENABLED=false
```

### What Gets Hidden/Shown

When AI chat is **disabled** (`false`):
- ❌ No "AI Assistant" link in navigation menu
- ❌ AI chat page shows "not available" message
- ❌ AI chat component not rendered
- ✅ API route still exists (but not linked to)
- ✅ All code remains in repository

When AI chat is **enabled** (`true`):
- ✅ "AI Assistant" link appears in navigation
- ✅ AI chat page fully functional
- ✅ Users can interact with AI assistant
- ✅ API route accessible and working

## Implementation Details

### 1. AI Chat Component

Location: `app/components/AIChatInterface.js`

Full-featured React component with:
- Message history
- File upload support (images, PDFs)
- Streaming responses
- Markdown rendering
- Error handling

### 2. AI Chat Page

Location: `app/ai-chat/page.js`

Checks `NEXT_PUBLIC_CIVORA_AI_ENABLED`:
- If `true`: Renders `AIChatInterface` component
- If `false`: Shows "AI Assistant Not Available" message with links to other resources

### 3. Navigation Link

Location: `app/layout.js` (Header component)

Conditional rendering in navigation:
```javascript
{aiEnabled && (
  <a href="/ai-chat/" className="nav-item">
    AI Assistant
  </a>
)}
```

### 4. API Route

Location: `app/api/ai-assistant/route.js`

- API always exists and is functional
- Frontend conditionally accesses it based on env variable
- Documented with comments explaining conditional usage

## Deployment Configuration

### For Vercel (AI Enabled)

1. Set environment variable in Vercel dashboard:
   ```
   NEXT_PUBLIC_CIVORA_AI_ENABLED=true
   ```

2. Ensure AI API keys are configured:
   ```
   GEMINI_API_KEY=your_key
   LANGSEARCH_API_KEY=your_key
   ```

3. Deploy - AI chat will be accessible

### For civora.me (AI Disabled)

1. Set environment variable:
   ```
   NEXT_PUBLIC_CIVORA_AI_ENABLED=false
   ```

2. AI API keys still needed for API route (even if unused):
   ```
   GEMINI_API_KEY=your_key
   LANGSEARCH_API_KEY=your_key
   ```

3. Deploy - AI chat will be hidden

## Testing

### Test with AI Disabled (Default)

```bash
# 1. Check .env file
cat .env | grep NEXT_PUBLIC_CIVORA_AI_ENABLED
# Should show: NEXT_PUBLIC_CIVORA_AI_ENABLED=false

# 2. Build and run
npm run build
npm run dev

# 3. Visit http://localhost:3000/
# - No "AI Assistant" in navigation
# - Visiting /ai-chat/ shows "not available" message
```

### Test with AI Enabled

```bash
# 1. Update .env file
echo "NEXT_PUBLIC_CIVORA_AI_ENABLED=true" >> .env

# 2. Build and run
npm run build
npm run dev

# 3. Visit http://localhost:3000/
# - "AI Assistant" appears in navigation
# - Visiting /ai-chat/ shows full AI interface
# - Can interact with AI assistant
```

## File Structure

```
app/
├── ai-chat/
│   └── page.js                    # AI chat page (conditional)
├── api/
│   └── ai-assistant/
│       └── route.js               # API route (always present)
├── components/
│   └── AIChatInterface.js         # AI chat UI component
├── layout.js                      # Header with conditional nav link
└── page.js                        # Homepage (static)
```

## Code Preservation

All AI chat code is preserved in the repository:

1. **Component code**: `app/components/AIChatInterface.js` ✅
2. **Page code**: `app/ai-chat/page.js` ✅
3. **API route**: `app/api/ai-assistant/route.js` ✅
4. **Dependencies**: `react-markdown`, `remark-gfm` in `package.json` ✅

Nothing is deleted - only conditionally rendered.

## Benefits of This Approach

1. ✅ **Single codebase**: No separate branches needed
2. ✅ **Code preservation**: AI features never deleted
3. ✅ **Easy toggle**: Change one environment variable
4. ✅ **Flexible deployment**: Same code, different configs
5. ✅ **Future-proof**: Easy to re-enable AI on any deployment
6. ✅ **Clean separation**: UI control separate from API code

## Troubleshooting

### AI chat not showing when enabled

1. Check environment variable is set correctly
2. Rebuild the app: `npm run build`
3. Restart dev server: `npm run dev`
4. Clear browser cache

### AI chat showing when it should be disabled

1. Check `.env` file has `NEXT_PUBLIC_CIVORA_AI_ENABLED=false`
2. Rebuild: `npm run build`
3. Restart: `npm run dev`
4. Environment variables starting with `NEXT_PUBLIC_` are baked into build

### API errors when AI enabled

1. Verify API keys are set:
   - `GEMINI_API_KEY`
   - `LANGSEARCH_API_KEY`
2. Check API route logs: `/api/ai-assistant/` should return version info
3. Test API health: `curl http://localhost:3000/api/ai-assistant/`

## Migration Notes

### From AI_CHAT_RESTORATION.md

The previous approach stored AI chat code as comments in `app/page.js`. This new approach:

- Moves AI chat to separate component (`AIChatInterface.js`)
- Creates dedicated page (`/ai-chat/`)
- Uses environment variables for control
- Provides better separation of concerns
- Easier to maintain and test

### Backwards Compatibility

Old AI chat code (commented in page.js) is no longer needed. The new system:
- Provides the same functionality
- Better organized
- Easier to enable/disable
- Properly documented

## Future Enhancements

Possible improvements:

1. **Feature flags service**: Use external service instead of env vars
2. **A/B testing**: Gradually roll out AI chat to users
3. **Regional control**: Enable AI chat by user location
4. **User preferences**: Let users enable/disable AI chat
5. **Analytics**: Track AI chat usage and satisfaction

## Support

For questions or issues:
- See `README.md` for general setup
- See `DEVELOPMENT-GUIDE.md` for development workflow
- See `DEPLOYMENT-GUIDE.md` for deployment instructions
- Check `.env.example` for environment variable reference

---

**Last Updated**: 2025-10-13  
**Version**: 1.0  
**Applies To**: Civora Next.js v14 App
