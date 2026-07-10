export const metadata = {
  title: 'About Civora',
  description: 'Civora helps Nepali students find verified international scholarships. Learn about our mission and values.',
};

export default function AboutPage() {
  return (
    <main>
      {/* Header */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <h1>About Civora</h1>
          <p className="subtext" style={{ fontSize: '1.125rem' }}>
            A scholarship resource platform built for Nepali students.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="card">
            <h2>Our Mission</h2>
            <p>
              Civora was founded to bridge the information gap for Nepali students seeking international scholarships. We compile verified scholarship opportunities from around the world and present them in a simple, accessible format.
            </p>
            <p>
              We believe that access to accurate, up-to-date scholarship information should not be a privilege. Every student deserves the opportunity to pursue higher education, regardless of their background or financial situation.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/scholarships/" className="linear-button">Browse Scholarships →</a>
              <a href="/contact/" className="linear-button secondary">Get in Touch</a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: '#fafafa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2>Our Values</h2>
            <p className="subtext">The principles that guide everything we do</p>
          </div>

          <div className="feature-grid">
            <div className="linear-card">
              <h3>Accuracy</h3>
              <p>Every scholarship is verified through official sources and updated regularly to ensure students receive accurate information.</p>
            </div>
            <div className="linear-card">
              <h3>Accessibility</h3>
              <p>We make scholarship information available in a clear, easy-to-navigate format, ensuring it reaches students who need it most.</p>
            </div>
            <div className="linear-card">
              <h3>Transparency</h3>
              <p>All our resources are open and free. We cite sources and provide direct links to official application portals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section">
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h2>Founder</h2>
            <div style={{ textAlign: 'left', marginTop: '1.5rem' }}>
              <p>
                Hi, I&apos;m <strong>Shubham Dhakal</strong>, a Nepali student passionate about making scholarship information more accessible to students from underrepresented communities.
              </p>
              <p>
                What started as personal research notes has evolved into a comprehensive database designed to help students find and apply to international scholarships with confidence.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/shubhamdhakal"
              target="_blank"
              rel="noopener noreferrer"
              className="linear-button secondary"
              style={{ marginTop: '1rem' }}
            >
              Connect on LinkedIn →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#000', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ color: '#fff' }}>Help Us Grow</h2>
          <p style={{ color: '#999' }}>
            Know about a scholarship we haven&apos;t listed? Have feedback or want to contribute? We&apos;d love to hear from you.
          </p>
          <a href="/contact/" className="linear-button" style={{ background: '#fff', color: '#000', borderColor: '#fff', marginTop: '0.5rem' }}>
            Contact Us →
          </a>
        </div>
      </section>
    </main>
  );
}
