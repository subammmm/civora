import './globals.css';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://civora.me'),
  title: {
    default: 'Civora – Find Your Path to Studying Abroad',
    template: '%s | Civora',
  },
  description:
    'Discover verified international scholarships curated for Nepali students. Browse 22+ scholarships from 15+ countries with direct links to official application portals. Updated July 2026.',
  keywords: [
    'nepal scholarships',
    'nepali students abroad',
    'international scholarships nepal',
    'fully funded scholarships',
    'study abroad nepal',
    'scholarship database nepal',
    'graduate scholarships',
    'undergraduate scholarships',
    'scholarship deadlines 2026',
    'scholarship deadlines 2027',
  ],
  authors: [{ name: 'Civora' }],
  creator: 'Civora',
  publisher: 'Civora',
  robots: { index: true, follow: true },
  icons: { icon: '/assets/favicon.svg' },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://civora.me/',
    siteName: 'Civora',
    title: 'Civora — Find Your Path to Studying Abroad',
    description: 'Discover verified international scholarships curated for Nepali students. 22+ scholarships from 15+ countries.',
    images: [{
      url: 'https://civora.me/assets/og-image.jpg',
      width: 1200, height: 630,
      alt: 'Civora — Scholarships for Nepali Students',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@civora',
    title: 'Civora — Find Your Path to Studying Abroad',
    description: 'Discover verified international scholarships curated for Nepali students.',
    images: ['https://civora.me/assets/og-image.jpg'],
  },
  alternates: { canonical: 'https://civora.me/' },
};

export const viewport = {
  themeColor: '#1B2A4A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Civora',
              description: 'A scholarship discovery platform for Nepali students',
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
              },
            }),
          }}
        />
      </head>
      <body>
        <div id="wrapper">
          <Header />
          <a href="#main-content" className="skip-to-content">Skip to content</a>
          <div className="main-content">
            <main id="main-content">{children}</main>
          </div>
          <Footer />
        </div>

        <Script id="mobile-nav" strategy="lazyOnload">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              const toggle = document.querySelector('.nav-toggle');
              const nav = document.getElementById('site-nav');
              if (toggle && nav) {
                toggle.addEventListener('click', function() {
                  nav.classList.toggle('active');
                  const isOpen = nav.classList.contains('active');
                  toggle.setAttribute('aria-expanded', isOpen);
                });
              }
            });
          `}
        </Script>

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            const GA_MEASUREMENT_ID = 'G-3FRBDLWLW0';
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
            }
          `}
        </Script>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <a className="brand" href="/" aria-label="Civora Home">
          🎓 Civora
        </a>

        <nav id="site-nav" className="site-nav" role="navigation" aria-label="Main navigation">
          <a href="/" className="nav-item">Home</a>
          <a href="/scholarships/" className="nav-item">Scholarships</a>
          <a href="/resources/" className="nav-item">Resources</a>
          <a href="/about/" className="nav-item">About</a>
          <a href="/contact/" className="nav-item">Contact</a>
        </nav>

        <div className="header-controls">
          <button
            className="nav-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded="false"
            aria-controls="site-nav"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xldpregr';

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <span className="footer-brand">🎓 Civora</span>
            <p className="footer-desc">
              Helping Nepali students discover international scholarship opportunities. All scholarships are verified and linked to official sources.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="footer-heading">Quick Links</p>
            <ul className="footer-links">
              <li><a href="/scholarships/">Scholarships</a></li>
              <li><a href="/resources/">Resources</a></li>
              <li><a href="/about/">About</a></li>
              <li><a href="/contact/">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="footer-heading">Legal</p>
            <ul className="footer-links">
              <li><a href="/legal/privacy/">Privacy Policy</a></li>
              <li><a href="/legal/terms/">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="footer-heading">Deadline Reminders</p>
            <p className="footer-desc" style={{ marginBottom: '0.75rem' }}>
              Get notified when scholarship deadlines are approaching.
            </p>
            <form className="footer-newsletter-input" action={`https://formspree.io/f/${formspreeId}`} method="POST">
              <input type="email" name="email" placeholder="Your email" required aria-label="Email for newsletter" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Civora. All rights reserved.</span>
          <span>Last updated: July 2026</span>
        </div>
      </div>
    </footer>
  );
}
