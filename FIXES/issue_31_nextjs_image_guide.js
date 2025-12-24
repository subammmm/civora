// Issue #31 Fix: Next.js Image Component Migration Guide

// BEFORE (unoptimized):
<img src="/assets/hero.jpg" alt="Hero" />

// AFTER (optimized):
import Image from 'next/image';

<Image
    src="/assets/hero.jpg"
    alt="Hero image"
    width={1200}
    height={600}
    priority={true} // for above-fold images
    placeholder="blur" // optional: add blurDataURL
/>

// For external images, add to next.config.js:
module.exports = {
    images: {
        domains: ['example.com'], // allowed domains
        unoptimized: false, // enable optimization
    },
};

// Benefits:
// - Automatic WebP/AVIF conversion
// - Lazy loading by default
// - Responsive images
// - ~70% smaller file sizes
