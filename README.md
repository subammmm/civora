# 🌍 Civora

Civora is a research-based platform that compiles verified scholarships, visa pathways, and citizenship options for students from Nepal and other underrepresented countries.

## Local Development

For local testing, use:

```bash
python3 -m http.server 8080
# open http://localhost:8080/
```

## Live Site

Visit: https://subammmm.github.io/civora

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

1. Edit `sitemap.xml`
2. Add new URL entries following the existing format:
   ```xml
   <url>
     <loc>https://civora.me/new-page.html</loc>
     <lastmod>YYYY-MM-DD</lastmod>
     <priority>0.8</priority>
   </url>
   ```
3. Update lastmod dates for changed pages

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
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
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
- No errors will appear in the console