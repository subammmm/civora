export const metadata = {
  title: 'About Civora',
  description: 'Why Civora exists and how to build, document, and share the project.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="card reveal">
            <h1><i className="fas fa-info-circle icon-left" aria-hidden="true"></i>About Civora</h1>
            <p className="subtext">Opening doors for Nepali students to study, work, and belong anywhere in the world.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card reveal">
            <div className="flex align-center gap-2" style={{ flexDirection: 'row' }}>
              <div style={{ flex: 1 }}>
                <h2><i className="fas fa-bullseye icon-left" aria-hidden="true"></i>Our Mission</h2>
                <p>Civora was founded to bridge the information gap for Nepali and underprivileged students seeking global opportunities. By compiling verified scholarships, visa pathways, and citizenship options, Civora serves as a research hub to support students in building international futures.</p>
                
                <p>We believe that access to accurate, up-to-date information should not be a privilege. Every student deserves the opportunity to pursue their dreams, regardless of their background or financial situation.</p>

                <div className="margin-top-2">
                  <a href="/contact/" className="linear-button"><i className="fas fa-envelope icon-left" aria-hidden="true"></i>Get in Touch</a>
                  <a href="/scholarships/" className="linear-button secondary"><i className="fas fa-search icon-left" aria-hidden="true"></i>Browse Scholarships</a>
                </div>
              </div>
              <div style={{ flex: 1, background: 'var(--bg-secondary)', height: '300px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <i className="fas fa-graduation-cap" style={{ fontSize: '4rem', color: 'var(--accent)' }} aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card reveal">
            <div className="text-center margin-bottom-2">
              <h2><i className="fas fa-heart icon-left" aria-hidden="true"></i>Our Values</h2>
              <p className="subtext">The principles that guide everything we do</p>
            </div>
            
            <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div className="card reveal text-center">
                <i className="fas fa-check-circle" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} aria-hidden="true"></i>
                <h3>Accuracy</h3>
                <p>Every scholarship and pathway is verified through official sources and updated regularly to ensure students receive accurate information.</p>
              </div>
              <div className="card reveal text-center">
                <i className="fas fa-universal-access" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} aria-hidden="true"></i>
                <h3>Accessibility</h3>
                <p>We make information available in multiple languages and formats, ensuring it reaches students regardless of their technical expertise.</p>
              </div>
              <div className="card reveal text-center">
                <i className="fas fa-users-cog" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} aria-hidden="true"></i>
                <h3>Community</h3>
                <p>We connect students with each other and share success stories to build a supportive network of learners and achievers.</p>
              </div>
              <div className="card reveal text-center">
                <i className="fas fa-eye" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} aria-hidden="true"></i>
                <h3>Transparency</h3>
                <p>All our resources are open and free. We clearly cite sources and provide direct links to official application portals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card reveal">
            <div className="text-center margin-bottom-2">
              <h2><i className="fas fa-chart-line icon-left" aria-hidden="true"></i>Our Impact</h2>
              <p className="subtext">Helping students achieve their global education dreams</p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <i className="fas fa-users icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }} aria-hidden="true"></i>
                <span className="stat-number">1000+</span>
                <p>Students Reached</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-trophy icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }} aria-hidden="true"></i>
                <span className="stat-number">35+</span>
                <p>Scholarships Verified</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-globe icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }} aria-hidden="true"></i>
                <span className="stat-number">6+</span>
                <p>Countries Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card reveal" style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}><i className="fas fa-user icon-left" aria-hidden="true"></i>Founder&apos;s Story</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
              <p>Hi, I&apos;m <strong>Shubham Dhakal</strong>, a Nepali student passionate about making global education accessible to underrepresented communities. As someone who has navigated the complex world of international scholarships and visa applications, I understand firsthand the challenges that Nepali students face when seeking opportunities abroad.</p>
              
              <p>My journey began with countless hours researching scholarships, deciphering visa requirements, and trying to understand the pathways to study and work internationally. Through this process, I realized that most information was scattered, outdated, or simply inaccessible to students from developing countries like Nepal.</p>

              <p><strong>Civora</strong> is my solution to this problem. What started as personal research notes has evolved into a comprehensive platform designed to democratize access to global opportunities.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
              <a href="https://www.linkedin.com/in/shubhamdhakal" target="_blank" rel="noopener" className="linear-button">
                <i className="fab fa-linkedin icon-left" aria-hidden="true"></i>Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card reveal">
            <div className="text-center margin-bottom-2">
              <h2><i className="fas fa-hands-helping icon-left" aria-hidden="true"></i>Join Our Mission</h2>
              <p className="subtext">Help us expand our impact and reach more students</p>
            </div>
          
            <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div className="linear-card" style={{ textAlign: 'center' }}>
                <i className="fas fa-share icon" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} aria-hidden="true"></i>
                <h3>Share Information</h3>
                <p>Know about a scholarship or opportunity we haven&apos;t covered? Help us expand our database by sharing verified information.</p>
                <a href="/contact/?subject=Contribution" className="linear-button margin-top-1">Contribute</a>
              </div>
              <div className="linear-card" style={{ textAlign: 'center' }}>
                <i className="fas fa-language icon" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} aria-hidden="true"></i>
                <h3>Translate Content</h3>
                <p>Help us reach more students by translating our content into additional languages spoken by underrepresented communities.</p>
                <a href="/contact/?subject=Translation" className="linear-button margin-top-1">Help Translate</a>
              </div>
              <div className="linear-card" style={{ textAlign: 'center' }}>
                <i className="fas fa-pen icon" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} aria-hidden="true"></i>
                <h3>Share Your Story</h3>
                <p>Inspire others by sharing your success story and the resources that helped you achieve your goals.</p>
                <a href="/contact/?subject=Story" className="linear-button margin-top-1">Share Story</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
