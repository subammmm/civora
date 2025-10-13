# Civora Vercel Deployment - Master Checklist

## 📋 Complete Deployment Checklist

Use this checklist to deploy Civora to Vercel with the dual deployment strategy.

---

## Phase 1: Pre-Deployment Review

### Documentation Review
- [ ] Read: `DUAL-DEPLOYMENT-IMPLEMENTATION-SUMMARY.md` (overview)
- [ ] Read: `VERCEL-DEPLOYMENT-INSTRUCTIONS.md` (step-by-step)
- [ ] Review: `DEPLOYMENT-FLOW-DIAGRAM.md` (architecture)
- [ ] Bookmark: `DEPLOYMENT-QUICK-REFERENCE.md` (quick help)

### Prerequisites Check
- [ ] Vercel account created (free tier works)
- [ ] GEMINI_API_KEY available
- [ ] LANGSEARCH_API_KEY available
- [ ] Access to civora.me domain DNS settings
- [ ] GitHub repository access confirmed

---

## Phase 2: Vercel Project Setup

### Import Repository
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New Project"
- [ ] Import: `github.com/subammmm/civora`
- [ ] Framework: Next.js (auto-detected)
- [ ] Verify build command: `npm run build`
- [ ] Verify output directory: `.next` (or leave empty)

### Environment Variables - Production
- [ ] Add variable: `NEXT_PUBLIC_CIVORA_AI_ENABLED` = `false`
- [ ] Select environment: **Production only**
- [ ] Add variable: `GEMINI_API_KEY` = `<your-key>`
- [ ] Select environment: **All** (Production, Preview, Development)
- [ ] Add variable: `LANGSEARCH_API_KEY` = `<your-key>`
- [ ] Select environment: **All** (Production, Preview, Development)
- [ ] Add variable: `NODE_ENV` = `production`
- [ ] Select environment: **Production only**

### Environment Variables - Preview
- [ ] Add variable: `NEXT_PUBLIC_CIVORA_AI_ENABLED` = `true`
- [ ] Select environment: **Preview only**
- [ ] Verify: Same variable has different values for Production vs Preview

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete (2-5 minutes)
- [ ] Note the deployment URL (e.g., `civora-xxxxx.vercel.app`)
- [ ] Click "Visit" to view deployment

---

## Phase 3: Initial Verification

### Test Deployment URL
- [ ] Visit deployment URL in browser
- [ ] Verify homepage loads correctly
- [ ] Check navigation menu
- [ ] **CRITICAL**: Confirm "AI Assistant" link is NOT visible
- [ ] Try accessing `/ai-chat/` directly
- [ ] Verify shows "AI Assistant Not Available" message
- [ ] Test other pages: /scholarships/, /citizenship/, etc.

### Check Build Logs
- [ ] Go to Vercel dashboard → Deployments
- [ ] Click on latest deployment
- [ ] Review build logs for any errors
- [ ] Verify: "Build completed successfully"

---

## Phase 4: Domain Configuration

### Add Domain in Vercel
- [ ] Go to Project → Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter: `civora.me`
- [ ] Click "Add"
- [ ] Repeat for: `www.civora.me`
- [ ] Note DNS configuration instructions from Vercel

### Update DNS Records
- [ ] Log into domain registrar (Namecheap, GoDaddy, etc.)
- [ ] Navigate to DNS settings for civora.me
- [ ] Add/Update A record:
  - Type: `A`
  - Name: `@`
  - Value: `76.76.21.21`
  - TTL: `3600` (or Auto)
- [ ] Add/Update CNAME record:
  - Type: `CNAME`
  - Name: `www`
  - Value: `cname.vercel-dns.com`
  - TTL: `3600` (or Auto)
- [ ] Save DNS changes

### Wait for DNS Propagation
- [ ] Check DNS propagation: https://dnschecker.org (search: civora.me)
- [ ] Wait for global propagation (5 min to 24 hours)
- [ ] Return to Vercel dashboard
- [ ] Wait for domain verification checkmark ✓
- [ ] Wait for SSL certificate issuance

---

## Phase 5: Production Verification

### Test civora.me Domain
- [ ] Visit: https://civora.me/
- [ ] Verify homepage loads with HTTPS
- [ ] Check SSL certificate is valid (padlock icon)
- [ ] Check navigation menu
- [ ] **CRITICAL**: "AI Assistant" link should NOT appear
- [ ] Test all navigation links work
- [ ] Visit: https://civora.me/ai-chat/
- [ ] Verify shows "AI Assistant Not Available" message

### Test www Subdomain
- [ ] Visit: https://www.civora.me/
- [ ] Verify redirects to https://civora.me/ or loads correctly
- [ ] Check SSL certificate valid

### Test API Endpoint (Optional)
```bash
curl https://civora.me/api/ai-assistant/
# Expected: {"status":"ok","version":"v53"}
```
- [ ] API returns success response
- [ ] No errors in curl output

---

## Phase 6: Preview Deployment Setup

### Create Test Pull Request
- [ ] Create new branch: `git checkout -b test-preview`
- [ ] Make small change (e.g., add comment to README)
- [ ] Commit: `git commit -am "Test preview deployment"`
- [ ] Push: `git push origin test-preview`
- [ ] Open pull request on GitHub

### Verify Preview Deployment
- [ ] Wait for Vercel bot comment on PR
- [ ] Note preview URL (e.g., `civora-git-test-preview.vercel.app`)
- [ ] Click preview URL
- [ ] Verify homepage loads
- [ ] Check navigation menu
- [ ] **CRITICAL**: "AI Assistant" link SHOULD appear
- [ ] Click "AI Assistant" link
- [ ] Verify `/ai-chat/` page shows full interface
- [ ] Test AI chat functionality (optional, requires API keys)

### Environment Variable Check
- [ ] Go to Vercel → Settings → Environment Variables
- [ ] Verify `NEXT_PUBLIC_CIVORA_AI_ENABLED`:
  - Production: `false` ✓
  - Preview: `true` ✓
- [ ] If incorrect, update and redeploy

---

## Phase 7: GitHub Pages Verification

### Check GitHub Pages Backup
- [ ] Visit: https://subammmm.github.io/civora/
- [ ] Verify static site loads
- [ ] Check pages work (scholarships, citizenship, etc.)
- [ ] Verify AI chat NOT available (expected)

### Verify CNAME Removed
- [ ] Check repository root: CNAME file should be CNAME.backup
- [ ] Check public/ directory: CNAME should be CNAME.backup
- [ ] GitHub Pages should NOT use civora.me domain
- [ ] Only Vercel should serve civora.me

---

## Phase 8: Final Verification

### Feature Matrix Check
| Feature | civora.me | Preview | GitHub Pages |
|---------|-----------|---------|--------------|
| Homepage | ✓ | ✓ | ✓ |
| Scholarships | ✓ | ✓ | ✓ |
| Citizenship | ✓ | ✓ | ✓ |
| All pages | ✓ | ✓ | ✓ |
| AI Assistant link | ✗ | ✓ | ✗ |
| AI chat works | ✗ | ✓ | ✗ |
| Custom domain | ✓ | ✗ | ✗ |

- [ ] All checkmarks match above table

### Deployment URLs
- [ ] Production: https://civora.me/ (AI disabled)
- [ ] Preview: https://civora-*.vercel.app (AI enabled)
- [ ] Backup: https://subammmm.github.io/civora/ (static)

---

## Phase 9: Documentation & Cleanup

### Update Internal Documentation
- [ ] Document Vercel project name
- [ ] Document deployment URLs
- [ ] Save API keys securely (not in repository)
- [ ] Document DNS configuration used

### Clean Up
- [ ] Close/merge test pull request (if created)
- [ ] Delete test branch (if created)
- [ ] Review Vercel deployment settings
- [ ] Verify automatic deployments enabled for main branch

---

## Phase 10: Monitoring & Maintenance

### Set Up Monitoring
- [ ] Add team members to Vercel project (if applicable)
- [ ] Configure deployment notifications
- [ ] Set up error tracking (Sentry, if using)
- [ ] Add to uptime monitoring (if applicable)

### Regular Checks
- [ ] Test civora.me weekly
- [ ] Verify environment variables unchanged
- [ ] Monitor Vercel deployment logs
- [ ] Check GitHub Actions for Pages backup

---

## Troubleshooting Reference

### Common Issues

| Problem | Solution File |
|---------|--------------|
| AI showing on civora.me | DEPLOYMENT-GUIDE.md → Troubleshooting |
| Domain not working | VERCEL-DEPLOYMENT-INSTRUCTIONS.md → Troubleshooting |
| Build errors | DEPLOYMENT-QUICK-REFERENCE.md |
| Environment variables | DEPLOYMENT-CONFIGURATION.md |
| DNS issues | VERCEL-DEPLOYMENT-INSTRUCTIONS.md → Step 8 |

---

## Quick Help

### Get Environment Variable Status
```bash
# In Vercel dashboard
Settings → Environment Variables → View all

# Should see:
# Production: NEXT_PUBLIC_CIVORA_AI_ENABLED = false
# Preview: NEXT_PUBLIC_CIVORA_AI_ENABLED = true
```

### Test Local Build
```bash
# Test production build
NEXT_PUBLIC_CIVORA_AI_ENABLED=false npm run build
npm start
# Visit http://localhost:3000 - AI should be hidden

# Test preview build
NEXT_PUBLIC_CIVORA_AI_ENABLED=true npm run build
npm start
# Visit http://localhost:3000 - AI should be visible
```

### Check DNS Propagation
```bash
# Command line
dig civora.me
nslookup civora.me

# Or use: https://dnschecker.org
```

---

## Success Criteria

### ✅ Deployment is successful when:
- [ ] civora.me loads without errors
- [ ] civora.me does NOT show AI Assistant link
- [ ] Preview deployments DO show AI Assistant link
- [ ] AI chat works on preview deployments
- [ ] All pages accessible and functional
- [ ] HTTPS/SSL working correctly
- [ ] DNS propagated globally
- [ ] GitHub Pages backup accessible
- [ ] Automatic deployments working

---

## Additional Resources

| Resource | Purpose |
|----------|---------|
| VERCEL-DEPLOYMENT-INSTRUCTIONS.md | Detailed step-by-step guide |
| DEPLOYMENT-QUICK-REFERENCE.md | Quick commands and fixes |
| DEPLOYMENT-FLOW-DIAGRAM.md | Visual architecture |
| DEPLOYMENT-GUIDE.md | Complete deployment guide |
| DEPLOYMENT-CONFIGURATION.md | Environment config details |
| DUAL-DEPLOYMENT-IMPLEMENTATION-SUMMARY.md | Complete overview |

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the appropriate documentation file
3. Verify all environment variables are set correctly
4. Check Vercel deployment logs
5. Verify DNS configuration

---

**Last Updated**: 2025-10-13  
**Status**: Ready for deployment  
**Estimated Time**: 30-60 minutes (plus DNS propagation)

---

## Quick Start (TL;DR)

1. Import repo to Vercel
2. Set env vars (Production: false, Preview: true)
3. Deploy
4. Point DNS to Vercel (A: 76.76.21.21)
5. Wait for DNS propagation
6. Verify civora.me (no AI link)
7. Test preview via PR (AI link visible)
8. ✅ Done!

**For detailed steps, see: VERCEL-DEPLOYMENT-INSTRUCTIONS.md**
