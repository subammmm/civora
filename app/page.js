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
            
            <div class="feature-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
              <div class="linear-card">
                <i class="fas fa-search" style="font-size: 2rem; color: var(--accent); margin-bottom: 1rem;" aria-hidden="true"></i>
                <h3>Verified Scholarships</h3>
                <p>Access a curated database of 35+ scholarships from around the world, verified and updated regularly for accuracy.</p>
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
    </main>
`,
      }}
    />
  );
}
