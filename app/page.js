import "./globals.css";

export default function Home() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
      <section class="section">
        <div class="container">
          <div class="card reveal">
            <div style="text-align: center; padding: 2rem 0;">
              <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">
                <i class="fas fa-globe icon-left" aria-hidden="true"></i>
                Welcome to Civora
              </h1>
              <p class="subtext" style="font-size: 1.2rem; max-width: 800px; margin: 0 auto;">
                Opening doors for Nepali students to study, work, and belong anywhere in the world
              </p>
              <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="/scholarships/" class="linear-button">
                  <i class="fas fa-graduation-cap icon-left" aria-hidden="true"></i>
                  Browse Scholarships
                </a>
                <a href="/citizenship/" class="linear-button secondary">
                  <i class="fas fa-passport icon-left" aria-hidden="true"></i>
                  Citizenship Pathways
                </a>
                <a href="/about/" class="linear-button secondary">
                  <i class="fas fa-info-circle icon-left" aria-hidden="true"></i>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="card reveal">
            <div class="text-center margin-bottom-2">
              <h2><i class="fas fa-rocket icon-left" aria-hidden="true"></i>What We Offer</h2>
              <p class="subtext">Comprehensive resources for your global education journey</p>
            </div>
            
            <div class="feature-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
              <div class="linear-card">
                <i class="fas fa-search" style="font-size: 2rem; color: var(--accent); margin-bottom: 1rem;" aria-hidden="true"></i>
                <h3>Verified Scholarships</h3>
                <p>Access a curated database of scholarships from around the world, verified and updated regularly for accuracy.</p>
                <a href="/scholarships/" class="linear-button margin-top-1">
                  <i class="fas fa-arrow-right icon-left" aria-hidden="true"></i>
                  Explore Scholarships
                </a>
              </div>
              
              <div class="linear-card">
                <i class="fas fa-map-marked-alt" style="font-size: 2rem; color: var(--accent); margin-bottom: 1rem;" aria-hidden="true"></i>
                <h3>Citizenship & Visa Guides</h3>
                <p>Clear pathways to citizenship and residency in multiple countries, with step-by-step guidance.</p>
                <a href="/citizenship/" class="linear-button margin-top-1">
                  <i class="fas fa-arrow-right icon-left" aria-hidden="true"></i>
                  View Pathways
                </a>
              </div>
              
              <div class="linear-card">
                <i class="fas fa-file-alt" style="font-size: 2rem; color: var(--accent); margin-bottom: 1rem;" aria-hidden="true"></i>
                <h3>Application Templates</h3>
                <p>Downloadable templates for essays, financial documents, and letters to streamline your applications.</p>
                <a href="/about/" class="linear-button margin-top-1">
                  <i class="fas fa-arrow-right icon-left" aria-hidden="true"></i>
                  Get Resources
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="card reveal">
            <div style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 300px;">
                <h2><i class="fas fa-bullseye icon-left" aria-hidden="true"></i>Our Mission</h2>
                <p>
                  Civora was founded to bridge the information gap for Nepali and underprivileged students 
                  seeking global opportunities. We believe that access to accurate, up-to-date information 
                  should not be a privilege.
                </p>
                <p>
                  By compiling verified scholarships, visa pathways, and citizenship options, Civora serves 
                  as a research hub to support students in building international futures.
                </p>
                <div style="margin-top: 1.5rem;">
                  <a href="/about/" class="linear-button">
                    <i class="fas fa-heart icon-left" aria-hidden="true"></i>
                    Learn About Our Values
                  </a>
                </div>
              </div>
              <div style="flex: 1; min-width: 300px; background: var(--bg-secondary); height: 300px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-university" style="font-size: 5rem; color: var(--accent); opacity: 0.7;" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="card reveal">
            <div class="text-center margin-bottom-2">
              <h2><i class="fas fa-cogs icon-left" aria-hidden="true"></i>Technology Stack</h2>
              <p class="subtext">Built with modern, reliable technologies</p>
            </div>
            
            <div class="feature-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
              <div class="card text-center" style="padding: 1.5rem;">
                <i class="fab fa-react" style="font-size: 2.5rem; color: #61DAFB; margin-bottom: 0.5rem;" aria-hidden="true"></i>
                <h4>Next.js 14</h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">React-based framework with App Router</p>
              </div>
              
              <div class="card text-center" style="padding: 1.5rem;">
                <i class="fas fa-code" style="font-size: 2.5rem; color: var(--accent); margin-bottom: 0.5rem;" aria-hidden="true"></i>
                <h4>Static Export</h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">Fast, reliable static site generation</p>
              </div>
              
              <div class="card text-center" style="padding: 1.5rem;">
                <i class="fab fa-github" style="font-size: 2.5rem; color: #fff; margin-bottom: 0.5rem;" aria-hidden="true"></i>
                <h4>GitHub Pages</h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">Automated CI/CD deployment</p>
              </div>
              
              <div class="card text-center" style="padding: 1.5rem;">
                <i class="fas fa-paint-brush" style="font-size: 2.5rem; color: var(--accent); margin-bottom: 0.5rem;" aria-hidden="true"></i>
                <h4>Custom CSS</h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">Responsive design system</p>
              </div>
          <div class="card reveal" style="text-align: center; padding: 3rem 2rem;">
            <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">
              <i class="fas fa-globe icon-left" aria-hidden="true"></i>Welcome to Civora
            </h1>
            <p class="subtext" style="font-size: 1.3rem; margin-bottom: 2rem;">
              Opening doors for Nepali students to study, work, and belong anywhere in the world.
            </p>
            <p style="max-width: 800px; margin: 0 auto 2rem; font-size: 1.1rem; color: var(--text-secondary);">
              Civora is a research-based platform that compiles verified scholarships, visa pathways, 
              and citizenship options for students from Nepal and other underrepresented countries.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">
              <a href="/scholarships/" class="linear-button" style="font-size: 1.1rem; padding: 1rem 2rem;">
                <i class="fas fa-search icon-left" aria-hidden="true"></i>Browse Scholarships
              </a>
              <a href="/citizenship/" class="linear-button secondary" style="font-size: 1.1rem; padding: 1rem 2rem;">
                <i class="fas fa-passport icon-left" aria-hidden="true"></i>Citizenship Pathways
              </a>
              <a href="/about/" class="linear-button secondary" style="font-size: 1.1rem; padding: 1rem 2rem;">
                <i class="fas fa-info-circle icon-left" aria-hidden="true"></i>About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="card reveal">
            <div class="text-center margin-bottom-2">
              <h2><i class="fas fa-chart-line icon-left" aria-hidden="true"></i>Our Impact</h2>
              <p class="subtext">Making a difference in students' lives</p>
            </div>
            
            <div class="stats-grid">
              <div class="stat-card">
                <i class="fas fa-users icon" style="font-size: 2rem; margin-bottom: 1rem; color: var(--accent);" aria-hidden="true"></i>
                <span class="stat-number">1000+</span>
                <p>Students Reached</p>
              </div>
              
              <div class="stat-card">
                <i class="fas fa-trophy icon" style="font-size: 2rem; margin-bottom: 1rem; color: var(--accent);" aria-hidden="true"></i>
                <span class="stat-number">24</span>
                <p>Scholarships Verified</p>
              </div>
              
              <div class="stat-card">
                <i class="fas fa-globe icon" style="font-size: 2rem; margin-bottom: 1rem; color: var(--accent);" aria-hidden="true"></i>
                <span class="stat-number">6+</span>
                <p>Countries Covered</p>
            <h2 style="text-align: center; margin-bottom: 2rem;">
              <i class="fas fa-star icon-left" aria-hidden="true"></i>What We Offer
            </h2>
            <div class="feature-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
              <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-graduation-cap" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;" aria-hidden="true"></i>
                <h3>Verified Scholarships</h3>
                <p>Access a curated database of scholarships for Nepali students with verified information and direct application links.</p>
                <a href="/scholarships/" class="linear-button" style="margin-top: 1rem; display: inline-block;">Explore Scholarships</a>
              </div>
              <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-passport" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;" aria-hidden="true"></i>
                <h3>Citizenship & Visas</h3>
                <p>Discover pathways to citizenship and permanent residency in countries around the world.</p>
                <a href="/citizenship/" class="linear-button" style="margin-top: 1rem; display: inline-block;">View Pathways</a>
              </div>
              <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-book-open" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;" aria-hidden="true"></i>
                <h3>Study Resources</h3>
                <p>Get guides, tips, and resources to help you succeed in exams like IELTS and prepare for studying abroad.</p>
                <a href="/ielts-prep/" class="linear-button" style="margin-top: 1rem; display: inline-block;">IELTS Preparation</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="card reveal" style="text-align: center; background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); padding: 3rem 2rem;">
            <h2 style="margin-bottom: 1rem;">
              <i class="fas fa-rocket icon-left" aria-hidden="true"></i>
              Ready to Start Your Journey?
            </h2>
            <p style="font-size: 1.1rem; margin-bottom: 2rem; color: var(--text-secondary);">
              Explore scholarships, pathways, and resources to make your global education dreams a reality.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="/scholarships/" class="linear-button">
                <i class="fas fa-search icon-left" aria-hidden="true"></i>
                Browse Scholarships
              </a>
              <a href="/contact/" class="linear-button secondary">
                <i class="fas fa-envelope icon-left" aria-hidden="true"></i>
                Get in Touch
              </a>
          <div class="card reveal">
            <h2 style="text-align: center; margin-bottom: 2rem;">
              <i class="fas fa-chart-line icon-left" aria-hidden="true"></i>Our Impact
            </h2>
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
              <div class="stat-card">
                <i class="fas fa-users icon" style="font-size: 2rem; margin-bottom: 1rem; color: var(--accent);" aria-hidden="true"></i>
                <span class="stat-number" style="display: block; font-size: 2.5rem; font-weight: 700; color: var(--accent);">1000+</span>
                <p>Students Reached</p>
              </div>
              <div class="stat-card">
                <i class="fas fa-trophy icon" style="font-size: 2rem; margin-bottom: 1rem; color: var(--accent);" aria-hidden="true"></i>
                <span class="stat-number" style="display: block; font-size: 2.5rem; font-weight: 700; color: var(--accent);">24</span>
                <p>Scholarships Verified</p>
              </div>
              <div class="stat-card">
                <i class="fas fa-globe icon" style="font-size: 2rem; margin-bottom: 1rem; color: var(--accent);" aria-hidden="true"></i>
                <span class="stat-number" style="display: block; font-size: 2.5rem; font-weight: 700; color: var(--accent);">6+</span>
                <p>Countries Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
`,
      }}
    />
  );
}
