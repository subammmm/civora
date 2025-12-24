// Issue #32 Fix: next/font Migration

// Add to app/layout.js:
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    display: 'swap',
    variable: '--font-poppins',
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
            <head>
                {/* Remove Google Fonts CDN link */}
            </head>
            <body>{children}</body>
        </html>
    );
}

// Update globals.css:
body {
    font - family: var(--font - inter), sans - serif;
}

h1, h2, h3 {
    font - family: var(--font - poppins), sans - serif;
}

// Benefits:
// - Self-hosted fonts (no external requests)
// - Automatic font optimization
// - Zero layout shift
// - Better performance
