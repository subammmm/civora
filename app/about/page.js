export const metadata = {
  title: 'About Civora',
  description: 'Why Civora exists and how to build, document, and share the project.',
};

export default function AboutPage() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `      
      <section className="hero">
        <div className="container">
          <div className="card">
            <h1><i className="fas fa-info-circle icon-left" aria-hidden="true"></i>About Civora</h1>
            <p className="subtext">Opening doors for Nepali students to study, work, and belong anywhere in the world.</p>
          </div>
        </div>
      </section>

      
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="flex align-center gap-2" style="flex-direction: row;">
              <div style="flex: 1;">
                <h2><i className="fas fa-bullseye icon-left" aria-hidden="true"></i>Our Mission</h2>
                <p>Civora was founded to bridge the information gap for Nepali and underprivileged students seeking global opportunities. By compiling verified scholarships, visa pathways, and citizenship options, Civora serves as a research hub to support students in building international futures.</p>
                
                <p>We believe that access to accurate, up-to-date information should not be a privilege. Every student deserves the opportunity to pursue their dreams, regardless of their background or financial situation.</p>

                <div className="margin-top-2">
                  <a href="contact.html" className="linear-button"><i className="fas fa-envelope icon-left" aria-hidden="true"></i>Get in Touch</a>
                  <a href="scholarships.html" className="linear-button secondary"><i className="fas fa-search icon-left" aria-hidden="true"></i>Browse Scholarships</a>
                </div>
              </div>
              <div style="flex: 1; background: var(--bg-secondary); height: 300px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">
                <i className="fas fa-graduation-cap" style="font-size: 4rem; color: var(--accent);" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="text-center margin-bottom-2">
              <h2><i className="fas fa-heart icon-left" aria-hidden="true"></i>Our Values</h2>
              <p className="subtext">The principles that guide everything we do</p>
            </div>
            
            <div className="feature-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
              <div className="linear-card text-center card">
                <i className="fas fa-check-circle" style="font-size: 2rem; color: var(--accent); margin-bottom: 1rem;" aria-hidden="true"></i>
                <h3>Accuracy</h3>
                <p>Every scholarship and pathway is verified through official sources and updated regularly to ensure students receive accurate information.</p>
              </div>
              <div className="linear-card text-center card">
                <i className="fas fa-universal-access" style="font-size: 2rem; color: var(--accent); margin-bottom: 1rem;" aria-hidden="true"></i>
                <h3>Accessibility</h3>
                <p>We make information available in multiple languages and formats, ensuring it reaches students regardless of their technical expertise.</p>
              </div>
              <div className="linear-card text-center card">
                <i className="fas fa-users-cog" style="font-size: 2rem; color: var(--accent); margin-bottom: 1rem;" aria-hidden="true"></i>
                <h3>Community</h3>
                <p>We connect students with each other and share success stories to build a supportive network of learners and achievers.</p>
              </div>
              <div className="linear-card text-center card">
                <i className="fas fa-eye" style="font-size: 2rem; color: var(--accent); margin-bottom: 1rem;" aria-hidden="true"></i>
                <h3>Transparency</h3>
                <p>All our resources are open and free. We clearly cite sources and provide direct links to official application portals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="text-center margin-bottom-2">
              <h2><i className="fas fa-chart-line icon-left" aria-hidden="true"></i>Our Impact</h2>
              <p className="subtext">Helping students achieve their global education dreams</p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <i className="fas fa-users icon" style="font-size: 2rem; margin-bottom: 1rem; color: var(--accent);" aria-hidden="true"></i>
                <span className="stat-number">1000+</span>
                <p>Students Reached</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-trophy icon" style="font-size: 2rem; margin-bottom: 1rem; color: var(--accent);" aria-hidden="true"></i>
                <span className="stat-number">24</span>
                <p>Scholarships Verified</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-globe icon" style="font-size: 2rem; margin-bottom: 1rem; color: var(--accent);" aria-hidden="true"></i>
                <span className="stat-number">6+</span>
                <p>Countries Covered</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      
      <section className="section">
        <div className="container">
          <div className="flex align-center gap-2" style="flex-direction: row-reverse;">
            <div style="flex: 1;">
              <h2>Founder's Story</h2>
              <p>Hi, I'm <strong>Shubham Dhakal</strong>, a Nepali student passionate about making global education accessible to underrepresented communities. As someone who has navigated the complex world of international scholarships and visa applications, I understand firsthand the challenges that Nepali students face when seeking opportunities abroad.</p>
              
              <p>My journey began with countless hours researching scholarships, deciphering visa requirements, and trying to understand the pathways to study and work internationally. Through this process, I realized that most information was scattered, outdated, or simply inaccessible to students from developing countries like Nepal.</p>

              <p><strong>Civora</strong> is my solution to this problem. What started as personal research notes has evolved into a comprehensive platform designed to democratize access to global opportunities.</p>

              <div className="margin-top-2">
                <a href="https://www.linkedin.com/in/shubhamdhakal" target="_blank" rel="noopener" className="linear-button">Connect on LinkedIn</a>
              </div>
            </div>
            <div style="flex: 1; background: var(--light-accent); height: 300px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--muted);">
              
              <span aria-hidden="true">📸</span>
            </div>
          </div>
        </div>
      </section>

      
      <section className="section">
        <div className="container">
          <div className="text-center margin-bottom-2">
            <h2>Join Our Mission</h2>
            <p className="subtext">Help us expand our impact and reach more students</p>
          </div>
          
          <div className="feature-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
            <div className="linear-card">
              <h3>Share Information</h3>
              <p>Know about a scholarship or opportunity we haven't covered? Help us expand our database by sharing verified information.</p>
              <a href="contact.html?subject=Contribution" className="linear-button margin-top-1">Contribute</a>
            </div>
            <div className="linear-card">
              <h3>Translate Content</h3>
              <p>Help us reach more students by translating our content into additional languages spoken by underrepresented communities.</p>
              <a href="contact.html?subject=Translation" className="linear-button margin-top-1">Help Translate</a>
            </div>
            <div className="linear-card">
              <h3>Share Your Story</h3>
              <p>Inspire others by sharing your success story and the resources that helped you achieve your goals.</p>
              <a href="contact.html?subject=Story" className="linear-button margin-top-1">Share Story</a>
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
