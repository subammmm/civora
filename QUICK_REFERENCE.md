# Quick Reference Guide

## What Changed

### For Developers

1. **I18N is now external**: Load translations from `assets/data/i18n.json`
2. **Script.js is cleaner**: 43% smaller, no debug logs
3. **Safe GA config**: Analytics disabled by default, easy to enable

### For Content Editors

1. **Update translations**: Edit `assets/data/i18n.json` instead of `script.js`
2. **Enable analytics**: Set `GA_MEASUREMENT_ID` in HTML files
3. **All pages have proper SEO**: Meta tags already configured

### For Users

1. **Faster loading**: Optimized fonts and lazy images
2. **Better privacy**: No tracking by default
3. **Same experience**: 75% scaling and all features work as before

## Quick Commands

### Local Development

```bash
# Start local server
python3 -m http.server 8080

# Test the site
open http://localhost:8080
```

### Validation

```bash
# Check all assets load
curl -I http://localhost:8080/assets/data/i18n.json

# Verify 75% scaling
grep "scale(0.75)" assets/style.css
```

### Enable Google Analytics

Edit any HTML file:

```javascript
// From:
const GA_MEASUREMENT_ID = null;

// To:
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
```

## File Structure

```
/
├── index.html (updated: GA config)
├── assets/
│   ├── data/
│   │   └── i18n.json (NEW: translations)
│   ├── script.js (updated: loads i18n.json)
│   ├── style.css (unchanged: 75% scaling)
│   └── scale-fix.js (unchanged)
├── students-supported.html (updated: Twitter tags)
├── ielts-prep.html (updated: Twitter tags)
├── contact.html (updated: Twitter tags)
├── privacy.html (updated: Twitter tags)
└── IMPLEMENTATION_NOTES.md (NEW: details)
```

## Common Tasks

### Add a new translation

1. Edit `assets/data/i18n.json`
2. Add key to both `en` and `ne` sections
3. No need to touch `script.js`

### Update SEO tags

1. Edit meta tags in HTML `<head>`
2. Update: title, description, og:title, og:description, twitter:title, twitter:description

### Verify scaling works

1. Open browser DevTools
2. Check `#wrapper` element
3. Should have `transform: scale(0.75)`
