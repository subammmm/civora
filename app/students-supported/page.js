export const metadata = {
  title: 'Students & Stories',
  description: 'Real experiences and success stories from Nepali students studying worldwide.',
};

export default function Students_SupportedPage() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `      <div style="max-width: 1200px; margin: 0 auto; text-align: left;">
        <h1 data-i18n="students.title" style="text-align: center;">Students Supported & Success Stories</h1>
        <p data-i18n="students.intro" style="text-align: center; margin-bottom: 3rem;">Through Civora resources and guidance, Nepali students have successfully secured admissions and opportunities globally. Here are their inspiring journeys and the countries where they've achieved their dreams.</p>

    
    <section className="story-stats">
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">25+</div>
          <div className="stat-label" data-i18n="students.stats_helped">Students Helped</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">8</div>
          <div className="stat-label" data-i18n="students.stats_countries">Countries Reached</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">$50K+</div>
          <div className="stat-label" data-i18n="students.stats_scholarships">Scholarships Secured</div>
        </div>
      </div>
    </section>

    
    <div className="celebration-banner">
      <h2 data-i18n="students.global_success">Global Success Stories</h2>
      <p>Celebrating Nepali students who have achieved their dreams through verified opportunities and guidance</p>
    </div>

    
    <div className="world-map-container">
      <h3>Global Reach</h3>
      <p>Interactive world map showing countries where our students have succeeded</p>
      
      <div className="interactive-world-map">
        <div id="students-map" style="height:600px; width:100%;"></div>
      </div>
    </div>

    
    <section className="success-stories">
      <h2>Featured Success Stories</h2>
      
      <div className="story-card featured-story">
        <div className="story-header">
          <h3>From Kathmandu to Seoul: My KGSP Journey</h3>
          <div className="story-meta">
            <span className="story-tag">Korean Government Scholarship</span>
            <span className="story-country">🇰🇷 South Korea</span>
          </div>
        </div>
        <div className="story-content">
          <blockquote>
            "I thought studying abroad was just a dream until I found Civora. The detailed KGSP guide and timeline helped me prepare my application perfectly. Today, I'm pursuing my Master's in Computer Science at Seoul National University with full funding. The scholarship covers tuition, accommodation, and living expenses, which made it possible for someone from my financial background to study at a top university."
          </blockquote>
          
          <div className="story-highlights">
            <h4>Key Success Factors</h4>
            <ul>
              <li>Used Civora's KGSP application checklist</li>
              <li>Started preparation 12 months in advance</li>
              <li>Strong Statement of Purpose emphasizing return to Nepal</li>
              <li>Excellent academic record with relevant projects</li>
            </ul>
          </div>
          
          <div className="story-author">
            <strong>— Anonymous Student</strong><br>
            <span>Master's in Computer Science, Seoul National University</span>
          </div>
        </div>
      </div>

      <div className="story-card">
        <div className="story-header">
          <h3>Chevening Success: From Engineering to Policy</h3>
          <div className="story-meta">
            <span className="story-tag">Chevening Scholarship</span>
            <span className="story-country">🇬🇧 United Kingdom</span>
          </div>
        </div>
        <div className="story-content">
          <blockquote>
            "After working as a civil engineer in Nepal for 3 years, I wanted to transition into infrastructure policy. The Chevening Scholarship seemed impossible until I used Civora's resources to understand the application process. The leadership essay examples and financial planning templates were invaluable. Now I'm at the University of Cambridge studying Public Policy, with plans to work on Nepal's infrastructure development when I return."
          </blockquote>
          
          <div className="story-highlights">
            <h4>Key Success Factors</h4>
            <ul>
              <li>Demonstrated clear leadership experience in Nepal</li>
              <li>Strong networking plan for return to Nepal</li>
              <li>Used Civora's essay structure for leadership examples</li>
              <li>Connected education goals to Nepal's development needs</li>
            </ul>
          </div>
          
          <div className="story-author">
            <strong>— Anonymous Student</strong><br>
            <span>Master's in Public Policy, University of Cambridge</span>
          </div>
        </div>
      </div>

      <div className="story-card">
        <div className="story-header">
          <h3>Breaking Barriers: First-Generation College Graduate to PhD</h3>
          <div className="story-meta">
            <span className="story-tag">Research Assistantship</span>
            <span className="story-country">🇨🇦 Canada</span>
          </div>
        </div>
        <div className="story-content">
          <blockquote>
            "As the first in my family to attend university, studying abroad felt impossible. Civora's scholarship database helped me discover funded PhD programs in Canada. The financial aid calculation tools showed me exactly what I needed. Today, I'm researching renewable energy solutions at the University of Toronto with full funding plus a research stipend. My goal is to bring clean energy solutions back to rural Nepal."
          </blockquote>
          
          <div className="story-highlights">
            <h4>Key Success Factors</h4>
            <ul>
              <li>Found fully-funded PhD programs through Civora's database</li>
              <li>Strong research proposal aligned with professor's work</li>
              <li>Used financial planning templates to demonstrate need</li>
              <li>Clear vision for applying research in Nepal context</li>
            </ul>
          </div>
          
          <div className="story-author">
            <strong>— Anonymous Student</strong><br>
            <span>PhD in Renewable Energy Engineering, University of Toronto</span>
          </div>
        </div>
      </div>
    </section>

    
    <h2 data-i18n="students.countries_success">Countries Where Our Students Have Succeeded</h2>
    <div className="feature-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
      <div className="card">
        <h3>🇰🇷 South Korea</h3>
        <p>Korean Government Scholarship Program (KGSP), university partnerships, and research opportunities in technology and engineering.</p>
      </div>
      
      <div className="card">
        <h3>🇫🇷 France</h3>
        <p>Eiffel Excellence Scholarships, French government programs, and pathways through public universities and grandes écoles.</p>
      </div>
      
      <div className="card">
        <h3>🇬🇧 United Kingdom</h3>
        <p>Chevening Scholarships, Commonwealth Scholarships, and prestigious university admissions including Russell Group institutions.</p>
      </div>
      
      <div className="card">
        <h3>🇺🇸 United States</h3>
        <p>Fulbright Program, need-based aid at liberal arts colleges, and graduate assistantships at research universities.</p>
      </div>
      
      <div className="card">
        <h3>🇦🇺 Australia</h3>
        <p>Australia Awards Scholarships, Research Training Program (RTP), and pathways to permanent residency through study.</p>
      </div>
      
      <div className="card">
        <h3>🇧🇪 Belgium</h3>
        <p>Erasmus Mundus programs, VLIR-UOS scholarships, and opportunities in both French and Dutch-speaking regions.</p>
      </div>
      
      <div className="card">
        <h3>🇨🇦 Canada</h3>
        <p>Multiple scholarship programs, Post-Graduation Work Permits (PGWP), and clear pathways to permanent residency.</p>
      </div>
      
      <div className="card">
        <h3>🇩🇪 Germany</h3>
        <p>DAAD scholarships, research opportunities, and EU Blue Card pathways for skilled professionals.</p>
      </div>
    </div>

    
    <section className="story-submission">
      <div className="submission-card">
        <h2>Share Your Success Story</h2>
        <p>Inspire other Nepali students by sharing your scholarship and study abroad journey. Your story could be the motivation someone needs to pursue their dreams.</p>
        
        <form action="https://formspree.io/f/xldpregr" method="POST" className="story-form">
          <input type="hidden" name="_subject" value="New Student Success Story Submission">
          <input type="hidden" name="_next" value="/thank-you.html">
          
          <div className="form-row">
            <div className="form-group">
              <label for="student-name">Your Name (will be anonymized)</label>
              <input type="text" id="student-name" name="student-name" required>
            </div>
            <div className="form-group">
              <label for="student-email">Your Email</label>
              <input type="email" id="student-email" name="student-email" required>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label for="scholarship-type">Scholarship/Program Type</label>
              <input type="text" id="scholarship-type" name="scholarship-type" placeholder="e.g., KGSP, Chevening, Fulbright" required>
            </div>
            <div className="form-group">
              <label for="destination-country">Destination Country</label>
              <input type="text" id="destination-country" name="destination-country" required>
            </div>
          </div>
          
          <div className="form-group">
            <label for="university-program">University & Program</label>
            <input type="text" id="university-program" name="university-program" placeholder="e.g., Seoul National University - Master's in Computer Science" required>
          </div>
          
          <div className="form-group">
            <label for="success-story">Your Success Story</label>
            <textarea id="success-story" name="success-story" rows="6" placeholder="Share your journey: How did you discover the opportunity? What challenges did you face? How did Civora help? What advice would you give to other students?" required></textarea>
          </div>
          
          <div className="form-group">
            <label for="civora-impact">How did Civora help you?</label>
            <textarea id="civora-impact" name="civora-impact" rows="3" placeholder="Specific ways Civora resources or guidance helped in your journey" required></textarea>
          </div>
          
          <button type="submit" className="story-submit-btn">Submit My Story</button>
        </form>
      </div>
    </section>

    <div className="callout">
      <h3>Success Stories Impact</h3>
      <p>Students supported through Civora resources have secured admissions in these countries, demonstrating that with proper guidance and verified information, global education opportunities are accessible to Nepali students.</p>
      <p><em>Privacy note: Individual student information is kept confidential. This page shows aggregate success by country only.</em></p>
    </div>
    </div>
  </main>
`,
      }}
    />
  );
}
