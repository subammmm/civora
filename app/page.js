import "./globals.css";

export default function Home() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
      <section class="section">
        <div class="container">
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

      <section class="section">
        <div class="container">
          <div class="card reveal" style="text-align: center; padding: 3rem 2rem;">
            <h2 style="margin-bottom: 1rem;">
              <i class="fas fa-heart icon-left" aria-hidden="true"></i>Our Mission
            </h2>
            <p style="max-width: 700px; margin: 0 auto 2rem; font-size: 1.1rem;">
              We believe that access to accurate, up-to-date information should not be a privilege. 
              Every student deserves the opportunity to pursue their dreams, regardless of their background or financial situation.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="/contact/" class="linear-button">
                <i class="fas fa-envelope icon-left" aria-hidden="true"></i>Get in Touch
              </a>
              <a href="/student-stories/" class="linear-button secondary">
                <i class="fas fa-users icon-left" aria-hidden="true"></i>Student Stories
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="card reveal" style="background: var(--bg-secondary); border-left: 4px solid var(--accent); padding: 2rem;">
            <h3 style="margin-bottom: 1rem;">
              <i class="fas fa-rocket icon-left" aria-hidden="true"></i>Built with Next.js 14
            </h3>
            <p style="margin-bottom: 1rem;">
              Civora is powered by modern web technology to deliver fast, reliable, and accessible information to students worldwide.
            </p>
            <ul style="list-style: none; padding-left: 0;">
              <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--accent); margin-right: 0.5rem;" aria-hidden="true"></i>Statically generated for optimal performance</li>
              <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--accent); margin-right: 0.5rem;" aria-hidden="true"></i>Open source and community-driven</li>
              <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--accent); margin-right: 0.5rem;" aria-hidden="true"></i>Deployed via GitHub Pages for reliability</li>
            </ul>
          </div>
        </div>
      </section>
      `,
      }}
    />
  );
}
