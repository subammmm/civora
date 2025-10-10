export const metadata = {
  title: 'Civora – Scholarships and Pathways for Students',
  description: 'Civora is a purpose-built tool for Nepali students. Streamline scholarships, guides, and citizenship pathways.',
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero halo">
        <div className="container">
          <div className="card reveal">
            <h1>
              <i className="fas fa-graduation-cap icon-left" aria-hidden="true"></i>
              <span data-i18n="index.hero_title">Civora – Plan and Build Your Future</span>
            </h1>
            <p className="subtext" data-i18n="index.intro">
              Purpose-built for Nepali students. Streamline scholarships, guides, and pathways.
            </p>
            <div className="hero-actions" style={{ marginTop: '2rem' }}>
              <a href="/scholarships/" className="linear-button">
                <i className="fas fa-search icon-left" aria-hidden="true"></i>
                <span data-i18n="index.cta_primary">Explore Scholarships</span>
              </a>
              <a href="/ielts-prep/" className="linear-button secondary">
                <i className="fas fa-book icon-left" aria-hidden="true"></i>
                <span data-i18n="index.cta_secondary">Learn More</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container text-center">
          <div className="card reveal">
            <h2 data-i18n="impact.title">Supporting Students Worldwide</h2>
            <div className="stats-grid">
              <div className="stat-card fade-in">
                <i className="fas fa-users icon" style={{ fontSize: '2rem', marginBottom: '1rem' }} aria-hidden="true"></i>
                <span className="stat-number" data-count="1000">0</span>
                <p>Students Reached</p>
              </div>
              <div className="stat-card fade-in">
                <i className="fas fa-trophy icon" style={{ fontSize: '2rem', marginBottom: '1rem' }} aria-hidden="true"></i>
                <span className="stat-number" data-count="35">0</span>
                <p>Verified Scholarships</p>
              </div>
              <div className="stat-card fade-in">
                <i className="fas fa-globe icon" style={{ fontSize: '2rem', marginBottom: '1rem' }} aria-hidden="true"></i>
                <span className="stat-number" data-count="18">0</span>
                <p>Countries Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card hover-lift card reveal">
              <h3>
                <i className="fas fa-database icon-left" aria-hidden="true"></i>
                <span data-i18n="index.card_sch_title">Scholarship Database</span>
              </h3>
              <p data-i18n="index.card_sch_desc">
                Discover and compare scholarships tailored for Nepali students. Access up-to-date information, eligibility criteria, and application deadlines in one place.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop" 
                alt="Student searching scholarship database on laptop with notebooks and coffee" 
                className="feature-image" 
                width="800" 
                height="450" 
                loading="lazy"
              />
            </div>
            <div className="feature-card hover-lift card reveal">
              <h3>
                <i className="fas fa-file-alt icon-left" aria-hidden="true"></i>
                <span data-i18n="index.card_guides_title">Application Guides</span>
              </h3>
              <p data-i18n="index.card_guides_desc">
                Step-by-step guides to help you complete scholarship and university applications with confidence. Get tips, document checklists, and expert advice tailored for Nepali students.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop" 
                alt="Student writing application documents with guide checklist and laptop" 
                className="feature-image" 
                width="800" 
                height="450" 
                loading="lazy"
              />
            </div>
            <div className="feature-card hover-lift card reveal">
              <h3>
                <i className="fas fa-passport icon-left" aria-hidden="true"></i>
                <span data-i18n="index.card_cit_title">Citizenship Pathways</span>
              </h3>
              <p data-i18n="index.card_cit_desc">
                Explore citizenship and visa options for Nepali students. Get guidance on legal pathways, documentation, and opportunities for studying and living abroad.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=450&fit=crop" 
                alt="International passport with visa stamps and travel documents" 
                className="feature-image" 
                width="800" 
                height="450" 
                loading="lazy"
              />
            </div>
            <div className="feature-card hover-lift card reveal">
              <h3>
                <i className="fas fa-star icon-left" aria-hidden="true"></i>
                <span data-i18n="index.card_stories_title">Success Stories</span>
              </h3>
              <p data-i18n="index.card_stories_desc">
                Learn from students who have successfully navigated the scholarship and visa process. Real experiences, practical tips, and insights from Nepali students studying worldwide.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop" 
                alt="Group of diverse international students celebrating graduation in caps and gowns" 
                className="feature-image" 
                width="800" 
                height="450" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="section">
        <div className="container">
          <div className="card reveal">
            <div className="text-center margin-bottom-2">
              <h2>Our Methodology</h2>
              <p className="subtext">How we ensure accuracy and relevance for Nepali students</p>
            </div>
            
            <div className="timeline">
              <div className="timeline-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>
                    <i className="fas fa-shield-alt icon-left" aria-hidden="true"></i>
                    Data Verification
                  </h3>
                  <p>Every scholarship opportunity is manually verified and updated regularly. We cross-reference with official sources to ensure accuracy.</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>
                    <i className="fas fa-user-check icon-left" aria-hidden="true"></i>
                    Student Matching
                  </h3>
                  <p>Our database considers academic background, financial need, destination preferences, and eligibility criteria to help students find the most relevant opportunities.</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>
                    <i className="fas fa-chart-bar icon-left" aria-hidden="true"></i>
                    Continuous Improvement
                  </h3>
                  <p>We regularly update our guidance and resources based on feedback and the latest information from official sources.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
