import "./globals.css";
import { scholarships } from "./scholarships/scholarships-data";

export default function Home() {
  // Pick 4 featured scholarships (fully funded ones with good recognition)
  const featured = scholarships.filter(s => 
    ['fulbright-nepal', 'chevening', 'erasmus-mundus', 'daad', 'gates-cambridge', 'kgsp'].includes(s.id)
  ).slice(0, 4);

  // Count unique countries
  const countries = new Set(scholarships.map(s => s.countryCode)).size;

  return (
    <main>
      {/* Hero */}
      <section className="section" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Scholarships for<br />Nepali Students
          </h1>
          <p className="subtext" style={{ fontSize: '1.125rem', maxWidth: '560px', margin: '0 auto 2rem' }}>
            A curated database of verified international scholarships with direct links to official application portals.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/scholarships/" className="linear-button">
              Browse All Scholarships →
            </a>
            <a href="/about/" className="linear-button secondary">
              About Civora
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '2.5rem 0' }}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">{scholarships.length}+</span>
              <p style={{ color: '#666', marginBottom: 0 }}>Verified Scholarships</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">{countries}+</span>
              <p style={{ color: '#666', marginBottom: 0 }}>Countries</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <p style={{ color: '#666', marginBottom: 0 }}>Free to Use</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2>Featured Scholarships</h2>
            <p className="subtext">Highlighted opportunities for Nepali students</p>
          </div>

          <div className="feature-grid">
            {featured.map(s => (
              <div className="linear-card" key={s.id}>
                <p style={{ fontSize: '0.8125rem', color: '#999', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {s.country}
                </p>
                <h3 style={{ marginBottom: '0.5rem' }}>{s.name}</h3>
                <p style={{ fontSize: '0.9375rem', marginBottom: '0.75rem' }}>{s.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#666' }}>{s.deadline}</span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linear-button"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
                  >
                    Apply →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="/scholarships/" className="linear-button secondary">
              View All {scholarships.length} Scholarships →
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ background: '#fafafa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2>How It Works</h2>
            <p className="subtext">Three simple steps to find your scholarship</p>
          </div>

          <div className="stats-grid">
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 800, color: '#000', marginBottom: '0.75rem' }}>01</span>
              <h3>Browse</h3>
              <p style={{ fontSize: '0.9375rem' }}>Explore our database of verified scholarships from {countries}+ countries.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 800, color: '#000', marginBottom: '0.75rem' }}>02</span>
              <h3>Filter</h3>
              <p style={{ fontSize: '0.9375rem' }}>Narrow results by country, degree level, field, or deadline.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 800, color: '#000', marginBottom: '0.75rem' }}>03</span>
              <h3>Apply</h3>
              <p style={{ fontSize: '0.9375rem' }}>Click through to the official application portal and submit your application.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Teaser */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <h2>Built for Nepali Students</h2>
          <p>
            Civora was created to bridge the information gap for Nepali students seeking international scholarships. Every scholarship in our database is verified and linked to its official source.
          </p>
          <a href="/about/" className="linear-button secondary" style={{ marginTop: '0.5rem' }}>
            Learn More About Civora →
          </a>
        </div>
      </section>
    </main>
  );
}
