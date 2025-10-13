# CNAME File Information

## Current Status

The `CNAME` files have been renamed to `CNAME.backup` in both locations because:

1. **civora.me is now deployed via Vercel** - not GitHub Pages
2. Having `CNAME` files would cause GitHub Pages to claim the civora.me domain
3. This would create a conflict with Vercel's domain configuration

**Files renamed:**
- `/CNAME` → `/CNAME.backup` (root directory)
- `/public/CNAME` → `/public/CNAME.backup` (public directory, copied to build output)

## Deployment Architecture

- **civora.me** → Vercel (Production with AI disabled)
- **github.io/civora** → GitHub Pages (Static backup only, no custom domain)

## If You Need to Re-enable GitHub Pages for civora.me

**Not recommended**, but if needed:

1. Rename `CNAME.backup` files back to `CNAME` in both root and public directories
2. Remove civora.me from Vercel project settings
3. Update DNS to point to GitHub Pages:
   - Delete A record: 76.76.21.21 (Vercel)
   - Add CNAME record: `@` → `subammmm.github.io`

## Current Setup (Recommended)

Keep CNAME removed and use:
- Vercel for civora.me (full Next.js features, conditional AI)
- GitHub Pages for backup at subammmm.github.io/civora/ (static export)

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for complete instructions.

