# Issue #40: Bundle Analyzer Setup

## Installation
```bash
npm install -D @next/bundle-analyzer
```

## Configuration (next.config.js)
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... existing config
});
```

## Usage
```bash
ANALYZE=true npm run build
```

## Expected Findings
- Font Awesome CDN: ~900KB (Issue #33)
- Unused CSS: ~150KB (Issue #39)
- AI Chat bundle: ~200KB (candidate for code split Issue #34)

## Action Items After Analysis
1. Replace Font Awesome with SVG subset
2. Purge unused CSS with PurgeCSS
3. Code split large components
4. Consider lazy loading routes
