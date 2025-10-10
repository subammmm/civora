export const metadata = {
  title: 'Student Stories',
  description: 'Real experiences from students who have used Civora.',
};

export default function Student_StoriesPage() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `      <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
        <h1 style="color: var(--text-primary); margin-bottom: 1rem;">Student Success Stories</h1>
        <p className="page-intro" style="color: var(--text-secondary); max-width: 800px; margin: 0 auto 2rem;">Real journeys from Nepali students who transformed their dreams into reality through scholarships and international opportunities. These stories prove that with the right resources and determination, global education is achievable.</p>
        
        
        <div className="info-box-grid" style="margin-bottom: 3rem;">
          <div className="info-box">
            <i className="fas fa-star info-box-icon" aria-hidden="true"></i>
            <h3 className="info-box-title">Success Stories</h3>
            <p className="info-box-desc">Real experiences and practical tips from Nepali students studying abroad.</p>
          </div>
        </div>
        
        <section className="story-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">25+</div>
              <p>Students Helped</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">12</div>
              <p>Countries Reached</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">$50K+</div>
              <p>Scholarships Secured</p>
            </div>
          </div>
        </section>

        <section className="success-stories">
          <div className="grid-2x2" style="text-align: left;">
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
              "I thought studying abroad was just a dream until I found Civora. The detailed KGSP guide and timeline helped me prepare my application perfectly. Today, I'm pursuing my Master's in Computer Science at Seoul National University with full funding."
            </blockquote>
            <div className="story-timeline">
              <div className="timeline-item">
                <span className="timeline-date">March 2023</span>
                <span className="timeline-event">Discovered KGSP through Civora</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-date">June 2023</span>
                <span className="timeline-event">Submitted application using Civora's checklist</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-date">December 2023</span>
                <span className="timeline-event">Received acceptance notification</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-date">March 2024</span>
                <span className="timeline-event">Started studies in Seoul</span>
              </div>
            </div>
            <div className="story-author">
              <strong>— Priya K.</strong> (Name changed for privacy)<br>
              <span>Computer Science Student, Seoul National University</span>
            </div>
          </div>
        </div>

        <div className="story-card">
          <div className="story-header">
            <h3>Eiffel Scholarship Success: Engineering Dreams in France</h3>
            <div className="story-meta">
              <span className="story-tag">Eiffel Excellence Scholarship</span>
              <span className="story-country">🇫🇷 France</span>
            </div>
          </div>
          <div className="story-content">
            <blockquote>
              "Civora's detailed visa pathway guide made the difference. The step-by-step process for France helped me navigate both the scholarship application and student visa requirements without any confusion."
            </blockquote>
            <div className="story-highlights">
              <h4>Key Success Factors:</h4>
              <ul>
                <li>Used Civora's SOP template for engineering programs</li>
                <li>Followed the France-specific visa timeline</li>
                <li>Prepared financial documents using provided checklist</li>
                <li>Connected with other Nepali students through Civora's network</li>
              </ul>
            </div>
            <div className="story-author">
              <strong>— Arjun S.</strong> (Name changed for privacy)<br>
              <span>Mechanical Engineering, École Polytechnique</span>
            </div>
          </div>
        </div>

        <div className="story-card">
          <div className="story-header">
            <h3>Graduate School in Canada: A Research Journey</h3>
            <div className="story-meta">
              <span className="story-tag">University Scholarship</span>
              <span className="story-country">🇨🇦 Canada</span>
            </div>
          </div>
          <div className="story-content">
            <blockquote>
              "The Canadian immigration pathway section on Civora was incredibly helpful. Understanding the study → work → PR route gave me confidence that this was a viable long-term plan, not just a temporary opportunity."
            </blockquote>
            <div className="story-outcomes">
              <div className="outcome-item">
                <span className="outcome-label">Scholarship Value:</span>
                <span className="outcome-value">CAD $28,000/year</span>
              </div>
              <div className="outcome-item">
                <span className="outcome-label">Program:</span>
                <span className="outcome-value">Master's in Environmental Science</span>
              </div>
              <div className="outcome-item">
                <span className="outcome-label">Current Status:</span>
                <span className="outcome-value">Applied for PGWP after graduation</span>
              </div>
            </div>
            <div className="story-author">
              <strong>— Maya T.</strong> (Name changed for privacy)<br>
              <span>Environmental Science Graduate, University of British Columbia</span>
            </div>
          </div>
        </div>

        <div className="story-card">
          <div className="story-header">
            <h3>Erasmus+ Adventures: Multiple Countries, One Degree</h3>
            <div className="story-meta">
              <span className="story-tag">Erasmus+ Scholarship</span>
              <span className="story-country">🇪🇺 European Union</span>
            </div>
          </div>
          <div className="story-content">
            <blockquote>
              "Civora's European citizenship pathway information helped me understand the long-term benefits of studying in Europe. The Erasmus+ program allowed me to study in three different countries!"
            </blockquote>
            <div className="story-journey">
              <div className="journey-stop">
                <span className="journey-country">🇩🇪 Germany</span>
                <span className="journey-detail">Semester 1-2: Technical University Munich</span>
              </div>
              <div className="journey-stop">
                <span className="journey-country">🇳🇱 Netherlands</span>
                <span className="journey-detail">Semester 3: University of Amsterdam</span>
              </div>
              <div className="journey-stop">
                <span className="journey-country">🇸🇪 Sweden</span>
                <span className="journey-detail">Semester 4: KTH Royal Institute</span>
              </div>
            </div>
            <div className="story-author">
              <strong>— Sujan R.</strong> (Name changed for privacy)<br>
              <span>Master's in Sustainable Technology, European Joint Program</span>
            </div>
          </div>
        </div>
      </section>

        <section className="story-submission">
          <div className="submission-card card" style="max-width: 800px; margin: 4rem auto; text-align: center;">
            <h2 style="color: var(--text-primary); margin-bottom: 1rem;">Share Your Success Story</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Inspire other Nepali students by sharing your scholarship and study abroad journey. Your story could be the motivation someone needs to pursue their dreams.</p>
            
            <form action="https://formspree.io/f/xldpregr" method="POST" className="story-form" style="text-align: left;">
              <input type="hidden" name="_subject" value="New Student Success Story Submission">
              <input type="hidden" name="_next" value="/thank-you.html">
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div className="form-group">
                  <label for="story-name" style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem; display: block;">Your Name (or Preferred Name)</label>
                  <input type="text" id="story-name" name="name" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); color: var(--text-primary);">
                  <small style="color: var(--text-secondary); font-size: 0.875rem;">We can use initials or a different name if you prefer privacy</small>
                </div>
                
                <div className="form-group">
                  <label for="story-email" style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem; display: block;">Email Address</label>
                  <input type="email" id="story-email" name="email" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); color: var(--text-primary);">
                  <small style="color: var(--text-secondary); font-size: 0.875rem;">For follow-up questions only, not published</small>
                </div>
              </div>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div className="form-group">
                  <label for="story-program" style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem; display: block;">Scholarship/Program</label>
                  <input type="text" id="story-program" name="program" placeholder="e.g., KGSP, Eiffel, Erasmus+" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); color: var(--text-primary);">
                </div>
                
                <div className="form-group">
                  <label for="story-country" style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem; display: block;">Country/University</label>
                  <input type="text" id="story-country" name="country" placeholder="e.g., South Korea, Seoul National University" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); color: var(--text-primary);">
                </div>
              </div>
              
              <div className="form-group" style="margin-bottom: 1rem;">
                <label for="story-content" style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem; display: block;">Your Story</label>
                <textarea id="story-content" name="story" rows="8" placeholder="Tell us about your journey: How did you discover the opportunity? What challenges did you face? How did Civora help? What advice would you give to other students?" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); color: var(--text-primary); resize: vertical;"></textarea>
              </div>
              
              <div className="form-group" style="margin-bottom: 1rem;">
                <label style="display: flex; align-items: center; color: var(--text-primary); cursor: pointer;">
                  <input type="checkbox" name="privacy-consent" required style="margin-right: 0.5rem;">
                  I consent to sharing my story on Civora's website (we can anonymize details as requested)
                </label>
              </div>
              
              <div className="form-group" style="margin-bottom: 2rem;">
                <label style="display: flex; align-items: center; color: var(--text-primary); cursor: pointer;">
                  <input type="checkbox" name="contact-consent" style="margin-right: 0.5rem;">
                  I'm open to being contacted by other students for advice (optional)
                </label>
              </div>
              
              <button type="submit" className="btn btn-primary" style="background: var(--accent); color: white; padding: 1rem 2rem; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background 0.2s;">Submit Your Story</button>
            </form>
          </div>
        </section>

      <section className="story-impact">
        <h2>The Ripple Effect</h2>
        <p>Every success story creates a ripple effect, inspiring and guiding other students. When you share your journey, you're not just telling a story—you're lighting the path for others to follow.</p>
        
        <div className="impact-quotes">
          <div className="impact-quote">
            <blockquote>"Reading about Priya's KGSP success gave me the confidence to apply. I'm now in my second year in Seoul!"</blockquote>
            <cite>— Anonymous Civora User</cite>
          </div>
          <div className="impact-quote">
            <blockquote>"The detailed timeline in Arjun's story helped me plan my own application schedule perfectly."</blockquote>
            <cite>— Anonymous Civora User</cite>
          </div>
        </div>
      </section>

    </main>
`,
      }}
    />
  );
}
