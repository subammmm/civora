# Performance Optimization Guide

This document outlines the performance optimizations implemented for civora.me and how to monitor and maintain them.

## Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s ✓
- **INP (Interaction to Next Paint)**: < 200ms ✓
- **CLS (Cumulative Layout Shift)**: < 0.1 ✓

## Implemented Optimizations

### 1. Resource Hints

**DNS Prefetch**: Resolves DNS before resource requests
```html
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
```

**Preconnect**: Establishes early connections to external origins
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

### 2. Font Optimization

**font-display: swap**: Ensures text is visible during font loading
```css
font-display: swap
```

Benefits:
- Prevents FOIT (Flash of Invisible Text)
- Shows fallback fonts immediately
- Improves perceived performance

### 3. Image Optimization

All images should follow these guidelines:

**Format Priority**:
1. AVIF (best compression)
2. WebP (good browser support)
3. JPEG/PNG (fallback)

**Lazy Loading**:
```html
<img src="image.jpg" alt="Description" loading="lazy" />
```

**Dimensions**: Always specify width and height to prevent CLS
```html
<img src="image.jpg" alt="Description" width="1200" height="630" />
```

**LCP Image Preload**:
```html
<link rel="preload" as="image" href="/hero-image.jpg" />
```

### 4. Static Asset Caching

Long-lived caching for immutable assets (configured in `_headers`):

```
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

### 5. JavaScript Optimization

**Strategy**:
- Critical JS: Inline or load synchronously
- Non-critical JS: Use `strategy="lazyOnload"`
- Analytics: Use `strategy="afterInteractive"`

**Code Splitting**: Next.js automatically splits code by route

**Dynamic Imports** (when needed):
```javascript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### 6. CSS Optimization

**Critical CSS**: Inlined in `<head>` for above-the-fold content
**Non-critical CSS**: Loaded via external stylesheets

### 7. Third-Party Scripts

**Current External Dependencies**:
- Google Fonts (preconnected)
- Font Awesome CDN (preconnected)
- Google Analytics (conditional, lazy-loaded)
- Sentry (conditional, lazy-loaded)

**Best Practices**:
- Always use `preconnect` for external origins
- Load non-critical scripts with `defer` or `async`
- Use `strategy` prop in Next.js Script component

## Monitoring Performance

### Google PageSpeed Insights

```bash
# Test homepage
https://pagespeed.web.dev/analysis?url=https://civora.me

# Test specific pages
https://pagespeed.web.dev/analysis?url=https://civora.me/scholarships/
```

**Target Scores**:
- Mobile: > 90
- Desktop: > 95

### WebPageTest

```bash
# Detailed performance analysis
https://webpagetest.org/
```

**Configuration**:
- Location: Choose nearest to target audience
- Connection: 4G or Cable
- Browser: Chrome
- Number of tests: 3 (for median results)

### Real User Monitoring

**Sentry Performance** (when configured):
- Tracks actual user experiences
- Identifies performance regressions
- Monitors Core Web Vitals in production

**Google Analytics 4** (when configured):
- Web Vitals reporting
- User flow analysis
- Page load time distributions

### Lighthouse CI

Automated performance testing in CI/CD:

```bash
npm install -g @lhci/cli

# Run locally
lhci autorun --url http://localhost:3000

# Integration with GitHub Actions (recommended)
# See .github/workflows/performance.yml
```

## Performance Budget

Set alerts when these thresholds are exceeded:

| Metric | Budget | Current |
|--------|--------|---------|
| Total Page Size | < 2MB | ~300KB ✓ |
| JavaScript Bundle | < 200KB | ~87KB ✓ |
| CSS Size | < 100KB | ~50KB ✓ |
| Number of Requests | < 50 | ~15 ✓ |
| Time to Interactive | < 5s | ~2s ✓ |
| LCP | < 2.5s | ~1.5s ✓ |
| CLS | < 0.1 | < 0.05 ✓ |

## Optimization Checklist

Use this checklist when adding new features:

### Before Adding Images
- [ ] Optimize and compress images
- [ ] Convert to WebP/AVIF format
- [ ] Specify width and height attributes
- [ ] Add descriptive alt text
- [ ] Use `loading="lazy"` for below-the-fold images
- [ ] Consider preload for LCP image

### Before Adding Third-Party Scripts
- [ ] Evaluate if script is necessary
- [ ] Check script size and dependencies
- [ ] Add `preconnect` for external domains
- [ ] Load with appropriate strategy (defer/async/lazy)
- [ ] Test impact on Core Web Vitals
- [ ] Consider self-hosting if critical

### Before Adding CSS
- [ ] Remove unused CSS rules
- [ ] Minify CSS in production
- [ ] Consider critical CSS inlining
- [ ] Avoid large framework imports
- [ ] Use CSS containment where applicable

### Before Adding JavaScript
- [ ] Tree-shake unused code
- [ ] Code-split large bundles
- [ ] Use dynamic imports for heavy features
- [ ] Minimize third-party dependencies
- [ ] Test bundle size impact

## Common Performance Issues

### Issue: High LCP

**Causes**:
- Large, unoptimized images
- Render-blocking resources
- Slow server response
- Client-side rendering

**Solutions**:
- Preload LCP image
- Optimize image format and size
- Use CDN
- Implement SSG/ISR

### Issue: High CLS

**Causes**:
- Images without dimensions
- Ads/embeds without reserved space
- Dynamic content insertion
- Web fonts causing FOIT

**Solutions**:
- Set image width/height
- Reserve space for dynamic content
- Use `font-display: swap`
- Avoid late-loading content

### Issue: High INP

**Causes**:
- Heavy JavaScript execution
- Long tasks blocking main thread
- Unoptimized event handlers
- Large DOM size

**Solutions**:
- Break up long tasks
- Debounce/throttle event handlers
- Use `requestIdleCallback` for non-critical work
- Lazy-load heavy components

## Advanced Optimizations

### Service Worker (Future Enhancement)

```javascript
// Cache static assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### Resource Prioritization

```html
<!-- High priority -->
<link rel="preload" as="script" href="critical.js" />

<!-- Low priority -->
<link rel="prefetch" as="script" href="future-route.js" />
```

### Image Loading Strategy

```javascript
// Native lazy loading
<img loading="lazy" src="image.jpg" />

// Intersection Observer for advanced control
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
});
```

## Testing Performance Locally

```bash
# Build production version
npm run build

# Serve production build
cd out && python3 -m http.server 8080

# Run Lighthouse
npm install -g lighthouse
lighthouse http://localhost:8080 --view

# Check bundle size
npm run build
ls -lh out/_next/static/chunks/
```

## Resources

- [Web.dev - Core Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://webpagetest.org/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

---

**Last Updated**: October 12, 2025
