import './globals.css';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://civora.me'),
  title: {
    default: 'Civora – Scholarships for Nepali Students',
    template: '%s | Civora',
  },
  description:
    'Civora helps Nepali students find verified international scholarships. Browse 35+ scholarships with direct links to official application portals.',
  keywords: [
    'nepal scholarships',
    'nepali students',
    'international scholarships',
    'study abroad scholarships',
    'university scholarships',
    'graduate scholarships',
    'undergraduate scholarships',
    'scholarship database',
    'fully funded scholarships',
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
    title: 'Civora — Scholarships for Nepali Students',
    description:
      'Browse 35+ verified international scholarships for Nepali students. All links go to official application portals.',
    images: [
      {
        url: 'https://civora.me/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Civora — Scholarships for Nepali Students',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@civora',
    title: 'Civora — Scholarships for Nepali Students',
    description:
      'Browse 35+ verified international scholarships for Nepali students. All links go to official application portals.',
    images: ['https://civora.me/assets/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://civora.me/',
  },
};

export const viewport = {
  themeColor: '#000000',
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
              description:
                'A scholarship resource platform for Nepali students',
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
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <div className="main-content">
            <main id="main-content">{children}</main>
          </div>
          <Footer />
        </div>

        {/* Google Analytics */}
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
          Civora
        </a>

        <nav id="site-nav" className="site-nav" role="navigation" aria-label="Main navigation">
          <a href="/scholarships/" className="nav-item">
            Scholarships
          </a>
          <a href="/about/" className="nav-item">
            About
          </a>
          <a href="/contact/" className="nav-item">
            Contact
          </a>
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
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-left">
          © {new Date().getFullYear()} Civora
        </div>
        <nav className="footer-right" aria-label="Footer navigation">
          <a href="/scholarships/">Scholarships</a>
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
          <a href="/legal/privacy/">Privacy</a>
          <a href="/legal/terms/">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
