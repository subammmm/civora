# Civora Dual Deployment - Quick Reference

## Deployment URLs

| Purpose | URL | AI Chat |
|---------|-----|---------|
| **Production** | https://civora.me | ❌ Disabled |
| **Preview** | https://civora-*.vercel.app | ✅ Enabled |
| **Backup** | https://subammmm.github.io/civora/ | ❌ Not Available |

## Environment Variables Quick Reference

### Vercel Production (civora.me)
```bash
NEXT_PUBLIC_CIVORA_AI_ENABLED=false  # CRITICAL: Disables AI chat
GEMINI_API_KEY=<your-key>
LANGSEARCH_API_KEY=<your-key>
NODE_ENV=production
```

### Vercel Preview (Testing)
```bash
NEXT_PUBLIC_CIVORA_AI_ENABLED=true   # Enables AI chat for testing
GEMINI_API_KEY=<your-key>
LANGSEARCH_API_KEY=<your-key>
```

## Quick Deployment Commands

```bash
# Build for production (Vercel)
npm run build

# Build for static export (GitHub Pages backup)
npm run build:static

# Development with AI enabled
NEXT_PUBLIC_CIVORA_AI_ENABLED=true npm run dev

# Development with AI disabled
NEXT_PUBLIC_CIVORA_AI_ENABLED=false npm run dev
```

## DNS Configuration for civora.me → Vercel

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**WWW CNAME:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Verification Tests

### Test Production (AI Disabled)
```bash
# Homepage should load
curl -I https://civora.me/

# AI chat should show "not available" message
curl https://civora.me/ai-chat/ | grep "Not Available"

# API exists but not linked
curl https://civora.me/api/ai-assistant/
# Returns: {"status":"ok","version":"v53"}
```

### Test Preview (AI Enabled)
```bash
# Create PR to get preview URL
# Visit preview URL in browser
# AI Assistant link should be visible in nav
# /ai-chat/ should show full interface
```

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| AI showing on civora.me | Check Production env var is `false`, redeploy |
| AI not showing on preview | Check Preview env var is `true`, create new PR |
| Domain not working | Wait for DNS propagation (up to 24h), check dnschecker.org |
| Build errors | Check environment variables are set, verify Node 20 |
| CNAME conflict | Ensure CNAME files are renamed to .backup in repo |

## File Locations

| File | Purpose |
|------|---------|
| `app/layout.js` | Header with conditional AI nav link |
| `app/ai-chat/page.js` | AI chat page with conditional rendering |
| `app/api/ai-assistant/route.js` | AI API endpoint (always present) |
| `app/components/AIChatInterface.js` | AI chat UI component |
| `.env` | Local environment variables |
| `.env.example` | Environment variable template |

## Important Code Locations

**Conditional Nav Link** (`app/layout.js:189`):
```javascript
const aiEnabled = process.env.NEXT_PUBLIC_CIVORA_AI_ENABLED === 'true';
{aiEnabled && <a href="/ai-chat/">AI Assistant</a>}
```

**Conditional Page** (`app/ai-chat/page.js:20`):
```javascript
const aiEnabled = process.env.NEXT_PUBLIC_CIVORA_AI_ENABLED === 'true';
if (!aiEnabled) return <NotAvailableMessage />;
```

## Common Commands

```bash
# Start local dev server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Clean and rebuild
rm -rf .next out node_modules && npm install && npm run build

# Check environment variables in build
npm run build | grep "Environments:"
```

## Support Resources

- **Step-by-step guide**: [VERCEL-DEPLOYMENT-INSTRUCTIONS.md](./VERCEL-DEPLOYMENT-INSTRUCTIONS.md)
- **Full deployment guide**: [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
- **Environment config**: [DEPLOYMENT-CONFIGURATION.md](./DEPLOYMENT-CONFIGURATION.md)
- **AI chat docs**: [AI-CHAT-CONDITIONAL-RENDERING.md](./AI-CHAT-CONDITIONAL-RENDERING.md)

## Status Indicators

✅ **All systems operational** when:
- civora.me loads without AI chat link
- Preview deployments show AI chat link
- GitHub Pages backup accessible
- All environment variables set correctly
- DNS points to Vercel (76.76.21.21)

---

**Last Updated**: 2025-10-13  
**Next.js Version**: 14.2.33  
**Deployment Strategy**: Dual Vercel (Production + Preview)
