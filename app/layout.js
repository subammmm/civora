import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import FormspreeForm from './components/FormspreeForm';
import { scholarships, countryCount } from './scholarships/scholarships-data';
import { SITE_URL } from '../lib/site';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Civora – Find Your Path to Studying Abroad',
    template: '%s | Civora',
  },
  description:
    `Discover verified international scholarships curated for Nepali students. Browse ${scholarships.length} scholarships from ${countryCount}+ countries with direct links to official application portals.`,
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
    url: './',
    siteName: 'Civora',
    title: 'Civora — Find Your Path to Studying Abroad',
    description: `Discover verified international scholarships curated for Nepali students. ${scholarships.length} scholarships from ${countryCount}+ countries.`,
    images: [{
      url: '/assets/og-image.jpg',
      width: 1200, height: 630,
      alt: 'Civora — Scholarships for Nepali Students',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@civora',
    title: 'Civora — Find Your Path to Studying Abroad',
    description: 'Discover verified international scholarships curated for Nepali students.',
    images: ['/assets/og-image.jpg'],
  },
  // './' resolves against each page's own path, so every page is its own canonical.
  alternates: { canonical: './', types: { 'application/atom+xml': '/feed.xml' } },
};

export const viewport = {
  themeColor: '#1B2A4A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Civora',
              description: 'A scholarship discovery platform for Nepali students',
              url: SITE_URL,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/scholarships?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Civora',
                url: SITE_URL,
              },
            }),
          }}
        />
      </head>
      <body>
        <div id="wrapper">
          <a href="#main-content" className="skip-to-content">Skip to content</a>
          <Header />
          <div className="main-content">
            {/* pages render their own <main>; a second one here nested landmarks */}
            <div id="main-content">{children}</div>
          </div>
          <Footer />
        </div>

        <Script id="mobile-nav" strategy="afterInteractive">
          {`
            {
              const toggle = document.querySelector('.nav-toggle');
              const nav = document.getElementById('site-nav');
              if (toggle && nav) {
                toggle.addEventListener('click', function() {
                  nav.classList.toggle('active');
                  const isOpen = nav.classList.contains('active');
                  toggle.setAttribute('aria-expanded', isOpen);
                });
                // Home is a client-side Link: close the menu when a nav item is followed.
                nav.addEventListener('click', function() {
                  nav.classList.remove('active');
                  toggle.setAttribute('aria-expanded', false);
                });
              }
            }
          `}
        </Script>

        {/* Production site only: no analytics from localhost or preview deployments. */}
        {process.env.NODE_ENV === 'production' && <Script id="google-analytics" strategy="afterInteractive">
          {`
            const GA_MEASUREMENT_ID = 'G-3FRBDLWLW0';
            if (/^(www\\.)?civora\\.me$/.test(location.hostname)) {
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
        </Script>}
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Civora Home">
          🎓 Civora
        </Link>

        <nav id="site-nav" className="site-nav" role="navigation" aria-label="Main navigation">
          <Link href="/" className="nav-item">Home</Link>
          <Link href="/scholarships" className="nav-item">Scholarships</Link>
          <a href="/resources" className="nav-item">Resources</a>
          <a href="/about" className="nav-item">About</a>
          <a href="/contact" className="nav-item">Contact</a>
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
  // Newest lastVerified in the data, e.g. "November 2026".
  const newest = scholarships.map((s) => s.lastVerified).filter(Boolean).sort().at(-1);
  const lastChecked = new Date(newest).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xldpregr';

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <span className="footer-brand">🎓 Civora</span>
            <p className="footer-desc">
              Helping Nepali students discover international scholarship opportunities. Entries are checked against, and link to, official sources.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="footer-heading">Quick Links</p>
            <ul className="footer-links">
              <li><Link href="/scholarships">Scholarships</Link></li>
              <li><a href="/resources">Resources</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="footer-heading">Legal</p>
            <ul className="footer-links">
              <li><a href="/legal/privacy">Privacy Policy</a></li>
              <li><a href="/legal/terms">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="footer-heading">Deadline Reminders</p>
            <p className="footer-desc" style={{ marginBottom: '0.75rem' }}>
              Get notified when scholarship deadlines are approaching.
            </p>
            <FormspreeForm className="footer-newsletter-input" formId={formspreeId} successMessage="Subscribed. Thank you!">
              <input type="email" name="email" placeholder="Your email" required aria-label="Email for newsletter" />
              <button type="submit">Subscribe</button>
            </FormspreeForm>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Civora. All rights reserved.</span>
          <span>Scholarship data last checked: {lastChecked}</span>
        </div>
      </div>
    </footer>
  );
}
