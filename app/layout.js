import './globals.css';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://civora.me'),
  title: {
    default: 'Civora – Scholarships and Pathways for Students',
    template: '%s | Civora',
  },
  description:
    'Civora is a purpose-built tool for Nepali students. Streamline scholarships, guides, and citizenship pathways.',
  keywords: [
    'nepal scholarships',
    'nepali students abroad',
    'international scholarships',
    'study abroad nepal',
    'student visa nepal',
    'citizenship pathways',
    'university scholarships',
    'graduate scholarships',
    'undergraduate scholarships',
    'scholarship database',
  ],
  authors: [{ name: 'Civora' }],
  creator: 'Civora',
  publisher: 'Civora',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/assets/favicon.svg',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://civora.me/',
    siteName: 'Civora',
    title: 'Civora — Opening doors for Nepali students',
    description:
      'Civora is a research-driven hub for Nepali students: verified scholarships, clear visa and residency pathways, and practical templates.',
    images: [
      {
        url: 'https://civora.me/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Civora',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@civora',
    title: 'Civora — Opening doors for Nepali students',
    description:
      'Civora is a research-driven hub for Nepali students: verified scholarships, clear visa and residency pathways, and practical templates.',
    images: ['https://civora.me/assets/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://civora.me/',
    languages: {
      en: 'https://civora.me/',
      ne: 'https://civora.me/?lang=ne',
    },
  },
};

export const viewport = {
  themeColor: '#0C0D0F',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Performance: Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        
        {/* Fonts with font-display: swap for better performance */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Civora',
              description:
                'Opening doors for Nepali students to study, work, and belong anywhere in the world',
              url: 'https://civora.me',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://civora.me/scholarships/?q={search_term_string}',
                '@query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Civora',
                url: 'https://civora.me',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://civora.me/assets/logo.svg',
                },
              },
            }),
          }}
        />
      </head>
      <body>
        <div id="wrapper">
          <Header />
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <div className="main-content">
            <main id="main-content">{children}</main>
          </div>
          <Footer />
        </div>

        {/* Client-side scripts */}
        <Script src="/assets/script.js" strategy="lazyOnload" />
        <Script src="/assets/reveal.js" strategy="lazyOnload" />
        <Script src="/assets/command-palette.js" strategy="lazyOnload" />
        <Script src="/assets/scale-fix.js" strategy="lazyOnload" />

        {/* Monitoring - Sentry initialization */}
        <Script id="sentry-init" strategy="afterInteractive">
          {`
            // Initialize Sentry if DSN is configured
            if (typeof window !== 'undefined') {
              import('/lib/monitoring/sentry.js')
                .then(module => module.initSentry())
                .catch(err => console.warn('Failed to load Sentry:', err));
            }
          `}
        </Script>

        {/* Google Analytics */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            const GA_MEASUREMENT_ID = null;
            
            if (GA_MEASUREMENT_ID) {
              const script = document.createElement('script');
              script.async = true;
              script.src = \`https://www.googletagmanager.com/gtag/js?id=\${GA_MEASUREMENT_ID}\`;
              document.head.appendChild(script);
              
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              gtag('config', GA_MEASUREMENT_ID, {
                'anonymize_ip': true,
                'allow_google_signals': false,
                'allow_ad_personalization_signals': false
              });
              
              gtag('event', 'page_view', {
                'page_title': document.title,
                'page_location': window.location.href
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}

function Header() {
  // Conditionally show AI chat link based on environment variable
  // When NEXT_PUBLIC_CIVORA_AI_ENABLED=true (Vercel): Show AI chat link
  // When NEXT_PUBLIC_CIVORA_AI_ENABLED=false (civora.me): Hide AI chat link
  const aiEnabled = process.env.NEXT_PUBLIC_CIVORA_AI_ENABLED === 'true';

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/">
          <img src="/assets/logo.svg" alt="Civora Logo" className="brand-logo" />
          Civora
        </a>

        <nav id="site-nav" className="site-nav">
          <a href="/scholarships/" className="nav-item">
            Scholarships
          </a>
          <a href="/citizenship/" className="nav-item">
            Citizenship
          </a>
          <a href="/student-stories/" className="nav-item">
            Students & Stories
          </a>
          <a href="/ielts-prep/" className="nav-item">
            IELTS & Prep
          </a>
          {/* Conditional AI Chat link - only shown when NEXT_PUBLIC_CIVORA_AI_ENABLED=true */}
          {aiEnabled && (
            <a href="/ai-chat/" className="nav-item">
              AI Assistant
            </a>
          )}
          <a href="/about/" className="nav-item">
            About
          </a>
          <a href="/contact/" className="nav-item">
            Contact
          </a>
        </nav>

        <div className="header-controls">
          <button className="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <i className="fas fa-copyright icon-left" aria-hidden="true"></i>
          <span id="year"></span> Civora
        </div>
        <div className="footer-right">
          <a href="/about/">About</a>
          <a href="/scholarships/">Scholarships</a>
          <a href="/citizenship/">Citizenship</a>
          <a href="/student-stories/">Students & Stories</a>
          <a href="/ielts-prep/">IELTS & Prep</a>
          <a href="/contact/">Contact</a>
          <a href="/legal/privacy/">Privacy Policy</a>
          <a href="/legal/terms/">Terms of Service</a>
          <a
            href="https://linkedin.com/in/shubhamdhakal"
            className="social-icon"
            target="_blank"
            rel="noopener"
            aria-label="Connect with Shubham Dhakal on LinkedIn"
            title="Connect with Shubham Dhakal on LinkedIn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
