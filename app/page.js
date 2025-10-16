import "./globals.css";

export default function Home() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="card reveal">
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                <i className="fas fa-globe icon-left" aria-hidden="true"></i>
                Welcome to Civora
              </h1>
              <p className="subtext" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                Opening doors for Nepali students to study, work, and belong anywhere in the world
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/scholarships/" className="linear-button">
                  <i className="fas fa-graduation-cap icon-left" aria-hidden="true"></i>
                  Browse Scholarships
                </a>
                <a href="/citizenship/" className="linear-button secondary">
                  <i className="fas fa-passport icon-left" aria-hidden="true"></i>
                  Citizenship Pathways
                </a>
                <a href="/about/" className="linear-button secondary">
                  <i className="fas fa-info-circle icon-left" aria-hidden="true"></i>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card reveal">
            <div className="text-center margin-bottom-2">
              <h2><i className="fas fa-rocket icon-left" aria-hidden="true"></i>What We Offer</h2>
              <p className="subtext">Comprehensive resources for your global education journey</p>
            </div>
            
            <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div className="linear-card">
                <i className="fas fa-search" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} aria-hidden="true"></i>
                <h3>Verified Scholarships</h3>
                <p>Access a curated database of 35+ scholarships from around the world, verified and updated regularly for accuracy.</p>
                <a href="/scholarships/" className="linear-button margin-top-1">
                  <i className="fas fa-arrow-right icon-left" aria-hidden="true"></i>
                  Explore Scholarships
                </a>
              </div>
              
              <div className="linear-card">
                <i className="fas fa-map-marked-alt" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} aria-hidden="true"></i>
                <h3>Citizenship & Visa Guides</h3>
                <p>Clear pathways to citizenship and residency in multiple countries, with step-by-step guidance.</p>
                <a href="/citizenship/" className="linear-button margin-top-1">
                  <i className="fas fa-arrow-right icon-left" aria-hidden="true"></i>
                  View Pathways
                </a>
              </div>
              
              <div className="linear-card">
                <i className="fas fa-file-alt" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} aria-hidden="true"></i>
                <h3>Application Templates</h3>
                <p>Downloadable templates for essays, financial documents, and letters to streamline your applications.</p>
                <a href="/about/" className="linear-button margin-top-1">
                  <i className="fas fa-arrow-right icon-left" aria-hidden="true"></i>
                  Get Resources
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card reveal">
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h2><i className="fas fa-bullseye icon-left" aria-hidden="true"></i>Our Mission</h2>
                <p>
                  Civora was founded to bridge the information gap for Nepali and underprivileged students 
                  seeking global opportunities. We believe that access to accurate, up-to-date information 
                  should not be a privilege.
                </p>
                <p>
                  By compiling verified scholarships, visa pathways, and citizenship options, Civora serves 
                  as a research hub to support students in building international futures.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <a href="/about/" className="linear-button">
                    <i className="fas fa-heart icon-left" aria-hidden="true"></i>
                    Learn About Our Values
                  </a>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: '300px', background: 'var(--bg-secondary)', height: '300px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-university" style={{ fontSize: '5rem', color: 'var(--accent)', opacity: 0.7 }} aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
