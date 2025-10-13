linganguli # 🌍 Civora

> **Important**: This project is a **Next.js 14 App Router application** with dual deployment strategy. The Next.js app under `app/` is the single source of truth for all active pages.

Civora is a research-based platform that compiles verified scholarships, visa pathways, and citizenship options for students from Nepal and other underrepresented countries.

**Built with Next.js 14** 🚀

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript (with TypeScript support)
- **Styling**: CSS (preserved from original site)
- **Deployment**: Dual Vercel deployment strategy (civora.me with AI disabled, preview with AI enabled) + GitHub Pages (static backup)
- **Domain**: civora.me
- **Quality Tools**: ESLint, Prettier, TypeScript type-checking
- **AI Features**: Conditional rendering based on environment variables

## AI Chat Feature

Civora includes an **optional AI-powered chat assistant** that can be enabled or disabled per deployment:

- **civora.me (Vercel Production)** - `NEXT_PUBLIC_CIVORA_AI_ENABLED=false`: AI chat is hidden from users
- **Vercel Preview/Testing** - `NEXT_PUBLIC_CIVORA_AI_ENABLED=true`: AI chat is accessible at `/ai-chat/`

The AI chat code is always preserved in the repository but conditionally rendered based on environment variables. See [AI-CHAT-CONDITIONAL-RENDERING.md](./AI-CHAT-CONDITIONAL-RENDERING.md) for full documentation.

## Deployment

Civora uses a **dual Vercel deployment strategy** with different environment configurations:

### Primary: civora.me (Vercel Production - AI Disabled)
- ✅ Full Next.js with server-side rendering
- ✅ Custom domain: civora.me
- ❌ AI chat hidden from users (`NEXT_PUBLIC_CIVORA_AI_ENABLED=false`)
- ✅ Automatic deployments from GitHub
- ✅ Edge network for global performance

### Testing: Vercel Preview (AI Enabled)
- ✅ Full Next.js with all features
- ✅ AI chat accessible for testing (`NEXT_PUBLIC_CIVORA_AI_ENABLED=true`)
- ✅ Preview deployments for pull requests
- ✅ Same codebase, different configuration

**See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for complete setup instructions**

### Backup: GitHub Pages
- ✅ Static HTML export at https://subammmm.github.io/civora/
- ✅ Free hosting backup
- ❌ No API routes (AI assistant not supported)
- ⚠️ NOT used for civora.me domain

## Local Development

### Prerequisites

- Node.js 18.17.0 or higher (Node 20 recommended - see `.nvmrc`)
- npm

### Development Server

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:3000/
```

### API Routes and Trailing Slashes

⚠️ **Important**: This project uses `trailingSlash: true` in Next.js config. All API routes MUST be accessed with a trailing slash to avoid 308 redirects.

**Example:**
```javascript
// ✅ Correct
fetch("/api/ai-assistant/", { method: "POST", ... })

// ❌ Wrong - causes 308 redirect, breaks POST
fetch("/api/ai-assistant", { method: "POST", ... })
```

**Why**: POST requests with 308 redirects lose their request body, causing API calls to fail silently.

See [VERCEL-DEPLOYMENT-NOTES.md](./VERCEL-DEPLOYMENT-NOTES.md) for more details.

### Quality Checks

```bash
# Run ESLint
npm run lint

# Type check
npm run type-check

# Format check
npm run format

# Auto-format code
npm run format:write
```

### Production Build

```bash
# Build for Vercel (with API routes)
npm run build
# Output: .next/ directory

# Build for GitHub Pages (static export)
npm run build:static
# Output: out/ directory

# Test static build locally
cd out
python3 -m http.server 8080
# Open http://localhost:8080/
```

**Build Scripts**:
- `npm run build` - Full Next.js build with API routes (for Vercel)
- `npm run build:static` - Static export without API routes (for GitHub Pages)

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for complete deployment instructions.

## CI/CD

The project uses GitHub Actions for continuous integration and deployment:

- **CI Workflow** (`.github/workflows/ci.yml`): Runs lint and type-check on all pushes and PRs to main
- **Deploy Workflow** (`.github/workflows/deploy-pages.yml`): Automatically builds static export and deploys to GitHub Pages on push to main
- **Dependabot**: Automatically opens PRs for dependency updates weekly

**Note**: GitHub Pages deployment creates a static backup. For full features (including AI assistant), use Vercel deployment.

## Live Sites

- **Primary (Recommended)**: https://civora.me (point to Vercel for full features)
- **Backup**: https://subammmm.github.io/civora (static version, no API routes)

## Project Structure

```
civora/
├── app/                    # Next.js App Router pages
│   ├── layout.js          # Root layout (Header/Footer)
│   ├── page.js            # Homepage
│   ├── globals.css        # Global styles
│   ├── scholarships/      # Scholarships page
│   ├── citizenship/       # Citizenship page
│   ├── about/             # About page
│   └── ...                # Other pages
├── public/                # Static assets
│   ├── assets/           # Images, CSS, JS
│   ├── CNAME             # Custom domain config
│   ├── .nojekyll         # GitHub Pages config
│   ├── manifest.webmanifest
│   ├── robots.txt
│   ├── sitemap.xml       # SEO sitemap (deployed to root)
│   └── psychometric-quiz.html  # Standalone quiz page
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .nvmrc                # Node version (20)
├── package.json          # Dependencies
└── .github/
    ├── workflows/        # GitHub Actions
    │   ├── ci.yml        # CI checks (lint, type-check)
    │   └── deploy-pages.yml  # Deployment
    └── dependabot.yml    # Automated dependency updates
```

## Next.js Configuration

The site uses static export for GitHub Pages compatibility:

```javascript
// next.config.js
{
  output: 'export',           // Static site generation
  trailingSlash: true,        // Directory-style URLs
  images: { unoptimized: true } // GitHub Pages compatibility
}
```

## Deployment

Deployment is automated via GitHub Actions:

1. Push to `main` branch
2. GitHub Actions builds the Next.js site
3. Deploys to GitHub Pages
4. Available at civora.me within 1-2 minutes

Manual deployment:

```bash
npm run build
# The `out/` directory contains the static site
# Deploy contents of `out/` to any static hosting
```

## Performance & SEO Features

### Implemented Optimizations

1. **SEO & Meta Tags** ✅
   - Complete Open Graph and Twitter Card meta tags
   - Structured data (JSON-LD) for search engines
   - Canonical URLs and meta descriptions
   - Keywords and author meta tags

2. **Accessibility** ✅
   - All images have descriptive alt text
   - Lazy loading on non-hero images
   - Width/height attributes to prevent layout shift
   - Skip-to-content link for keyboard navigation
   - Proper ARIA labels

3. **Performance** ✅
   - Critical CSS inlined in `<head>` for fast initial render
   - Deferred JavaScript loading
   - Smooth scroll behavior
   - Image optimization (WebP format for og-image)
   - Proper 1200x630 social sharing image

4. **Internationalization** ✅
   - hreflang tags for English and Nepali
   - Multi-language support via script.js
   - Proper lang attribute on HTML tag

5. **Sitemap & Robots** ✅
   - sitemap.xml with all pages
   - robots.txt allowing all crawlers
   - Updated lastmod dates

6. **Contact Form** ✅
   - Full contact form with validation
   - Honeypot field for spam prevention
   - Mailto fallback
   - Consistent styling with site theme

7. **UI Polish** ✅
   - Smooth hover transitions (0.3s) on buttons and links
   - Consistent spacing using CSS variables
   - Card hover effects with lift animation
   - Mobile-responsive navigation

### Performance Testing

To test site performance, run these checks:

1. **Google PageSpeed Insights**

   ```
   https://pagespeed.web.dev/
   Test URL: https://civora.me/
   Target: Performance ≥90, Accessibility ≥90
   ```

2. **Lighthouse (Chrome DevTools)**

   ```bash
   # Open Chrome DevTools (F12)
   # Navigate to Lighthouse tab
   # Run audit for Desktop and Mobile
   # Check: Performance, Accessibility, Best Practices, SEO
   ```

3. **Manual Testing Checklist**
   - [ ] All pages load within 2 seconds
   - [ ] Images lazy-load properly
   - [ ] Smooth scrolling works on anchor links
   - [ ] Navigation menu works on mobile
   - [ ] Contact form submits correctly
   - [ ] All links are functional
   - [ ] Hover effects are smooth
   - [ ] No layout shift on page load

### Page Scaling Testing (75% Scale)

The site uses a 75% scale transform for better content density on desktop devices. To test:

1. **Browser DevTools Testing**

   ```bash
   # Open Chrome DevTools (F12)
   # Console tab - check for viewport logging:
   #   "Viewport Before Scaling"
   #   "Viewport After Scaling"
   #   "Scaling Applied: Yes"
   ```

2. **Visual Testing Checklist**
   - [ ] Desktop: Page appears 75% of original size
   - [ ] Desktop: No extra black space at bottom
   - [ ] Desktop: No horizontal scrollbar
   - [ ] Desktop: All content visible and accessible
   - [ ] Mobile (≤768px): Scaling disabled (full size)
   - [ ] Mobile: No zoom issues
   - [ ] Mobile: No overflow or clipping
   - [ ] Tablet: Test at 768px breakpoint

3. **Performance Validation**

   ```bash
   # Check for transform performance
   # DevTools → Performance tab → Record page load
   # Look for smooth rendering without lag
   ```

4. **Cross-browser Testing**
   - [ ] Chrome/Edge (Chromium)
   - [ ] Firefox
   - [ ] Safari (if available)
   - [ ] Mobile browsers (Chrome Mobile, Safari iOS)

**Note:** The wrapper scaling uses `will-change: transform` for optimized performance and is disabled on mobile devices (max-width: 768px) to prevent zoom issues.

### Scholarship Filtering System

The scholarships page includes a dynamic filtering system that allows users to filter scholarships by country, level, field, and deadline.

**Testing the Filter System:**

1. **Basic Filtering**

   ```bash
   # Start local server
   python3 -m http.server 8080
   # Navigate to http://localhost:8080/scholarships.html
   ```

2. **Test Individual Filters**
   - Open browser console (F12) to see filter debug logs
   - Select "United States" from country filter → should show 9 USA scholarships
   - Select "United Kingdom" from country filter → should show 5 UK scholarships
   - Select "Undergraduate" from level filter → filters by bachelor's programs
   - Select "Graduate" from level filter → filters by master's/professional programs
   - Select "PhD" from level filter → filters by doctoral programs

3. **Test Combined Filters (AND Logic)**
   - Select "United States" + "Undergraduate" → should show 3 results
   - Select "Canada" + "PhD" → should show 1 result
   - Select "Nepal" + "PhD" → should show "No scholarships match your criteria" message

4. **Test Reset Functionality**
   - Apply any combination of filters
   - Click "Reset All Filters" button
   - All filters should clear and all 24 scholarships should be visible

5. **Console Debugging**

   ```javascript
   // Open browser console to see:
   // - "Filters populated: X countries, Y levels..." on page load
   // - "Applying filters: {selectedCountry: usa, ...}" when filters change
   // - "X scholarships visible" after each filter application
   ```

6. **Edge Cases to Test**
   - Select filters with no matching scholarships (e.g., Nepal + PhD)
   - Verify "no results" message displays correctly
   - Verify reset button appears in no-results message
   - Apply multiple filters in different orders
   - Verify dynamic country options are populated from actual scholarship data

**Expected Behavior:**

- ✅ All 24 scholarships visible on page load
- ✅ Filters use AND logic (must match ALL selected criteria)
- ✅ No results message appears when no scholarships match
- ✅ Reset button clears all filters and shows all scholarships
- ✅ Country dropdown dynamically populated with 11 unique countries
- ✅ Console logs show filter state for debugging

### Regenerating Sitemap

To update the sitemap with new pages:

1. Edit `public/sitemap.xml` (deployed to root via Next.js build)
2. Add new URL entries following the Next.js route format with trailing slashes:
   ```xml
   <url>
     <loc>https://civora.me/new-page/</loc>
     <lastmod>YYYY-MM-DD</lastmod>
     <priority>0.8</priority>
   </url>
   ```
3. Update lastmod dates for changed pages
4. Rebuild the site with `npm run build` to deploy the updated sitemap

### Image Guidelines

- **Social sharing image**: 1200x630px, optimized to <100KB
- **Feature images**: Use WebP format when possible
- **Alt text**: Always descriptive, never empty
- **Lazy loading**: Add `loading="lazy"` to images below the fold
- **Dimensions**: Always include width/height attributes

## Firebase Analytics Setup (Optional)

The site includes optional Firebase integration for anonymous page view tracking. To enable:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Realtime Database in the Firebase Console
4. Set database rules to allow writes but restrict reads (for security)

### 2. Get Firebase Configuration

1. In Firebase Console, go to Project Settings
2. Scroll down to "Your apps" and select "Web app"
3. Copy the Firebase configuration object

### 3. Update Configuration Files

**For index.html:**
Replace the placeholder config in the Firebase script section (around line 230):

```javascript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

**For private.html:**
Update the same configuration in private.html (around line 157)

### 4. Set Database Rules

In Firebase Console, go to Realtime Database → Rules:

```json
{
  "rules": {
    "pageViews": {
      ".read": false,
      ".write": true
    }
  }
}
```

**Note:** This allows anonymous writes for page tracking but prevents public reads for privacy.

### 5. Access Analytics Dashboard

1. Visit `https://yourdomain.com/private.html` (keep this URL private)
2. Login credentials (default):
   - Username: `admin`
   - Password: `civora2025`
3. **IMPORTANT:** Change the password in `private.html` before deployment!

### Security Considerations

⚠️ **The authentication in private.html is for demonstration only!**

For production use:

- Implement proper server-side authentication
- Use Firebase Authentication or OAuth
- Never hardcode credentials in client-side code
- Consider using Firebase Security Rules for row-level access control
- Use environment variables for sensitive configuration

### Disabling Firebase

If you don't want to use Firebase analytics:

- The site will work normally without configuration
- Page views simply won't be tracked

---

## Migration from Static HTML to Next.js - COMPLETED ✅

This site was successfully migrated from static HTML/CSS/JS to Next.js 14 in October 2024. **The migration is complete and the site is fully operational.**

✅ **Preserved**:

- All original content and design
- URL structure (with trailing slashes)
- Custom domain (civora.me)
- All assets and functionality
- SEO metadata and structured data

✅ **Improved**:

- Modern React-based architecture
- Better build tooling and development experience
- Optimized performance with Next.js
- Automated deployment via GitHub Actions
- Type-safe routing with App Router
- CI/CD with automated quality checks
- TypeScript support and type checking
- Code formatting with Prettier
- Linting with ESLint

The Next.js app under `app/` is the single source of truth for all active pages.

## Contributing

### For New Contributors

This project uses **Next.js 14** with the App Router. Here's what you need to know:

#### Setup

1. Clone the repository
2. Install Node.js 20 (see `.nvmrc`)
3. Run `npm install`
4. Start development server: `npm run dev`
5. Visit http://localhost:3000/

#### Making Changes

- **Pages**: Edit React components in `app/` directory (e.g., `app/page.js`, `app/scholarships/page.js`)
- **Shared layout**: Edit `app/layout.js` for header/footer changes
- **Styles**: Edit CSS files in `app/` directory
- **Assets**: Place images, fonts, etc. in `public/assets/`

#### Testing Your Changes

```bash
# Lint your code
npm run lint

# Type check
npm run type-check

# Format code
npm run format:write

# Build for production
npm run build

# Test the production build locally
cd out && python3 -m http.server 8080
```

#### Submitting Changes

1. Create a new branch
2. Make your changes
3. Test locally with `npm run dev` and `npm run build`
4. Run `npm run lint` and `npm run type-check`
5. Commit and push to your branch
6. Open a Pull Request

The CI/CD pipeline will automatically:
- Run linting and type checks
- Build the Next.js site
- Deploy to GitHub Pages on merge to `main`

### Quick Reference

- **Development**: `npm run dev` → http://localhost:3000/
- **Production build**: `npm run build` → outputs to `out/`
- **Test production**: `cd out && python3 -m http.server 8080`
- **Deployed site**: https://civora.me
- **Deploy time**: 1-2 minutes after push to `main`

