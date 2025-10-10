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