export const metadata = {
  title: 'Pathway Builder',
  description: 'Build your personalized education and career pathway.',
}

export default function Pathway_BuilderPage() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `      <h1>Personalized Pathway Builder</h1>
      <p className="page-intro">Answer a few questions about your background and goals to receive personalized recommendations for scholarships, study programs, and visa pathways that match your profile.</p>
      
      <div className="pathway-builder" id="pathwayBuilder">
        
        <div className="builder-step active" id="step1">
          <div className="step-header">
            <div className="step-number">1</div>
            <h2>Personal Background</h2>
            <p>Tell us about your current situation</p>
          </div>
          
          <div className="form-section">
            <div className="form-group">
              <label for="education-level">Current Education Level</label>
              <select id="education-level" required>
                <option value="">Select your level</option>
                <option value="high-school">High School Graduate</option>
                <option value="undergraduate">Undergraduate Student</option>
                <option value="bachelor">Bachelor's Degree Holder</option>
                <option value="master">Master's Degree Holder</option>
                <option value="phd">PhD/Doctoral</option>
              </select>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label for="gpa">GPA/Percentage</label>
                <select id="gpa">
                  <option value="">Select range</option>
                  <option value="90-100">90-100% (A+)</option>
                  <option value="80-89">80-89% (A)</option>
                  <option value="70-79">70-79% (B+)</option>
                  <option value="60-69">60-69% (B)</option>
                  <option value="below-60">Below 60%</option>
                </select>
              </div>
              
              <div className="form-group">
                <label for="field-of-study">Field of Study</label>
                <select id="field-of-study" required>
                  <option value="">Select field</option>
                  <option value="engineering">Engineering & Technology</option>
                  <option value="computer-science">Computer Science & IT</option>
                  <option value="business">Business & Management</option>
                  <option value="medicine">Medicine & Health Sciences</option>
                  <option value="sciences">Natural Sciences</option>
                  <option value="social-sciences">Social Sciences</option>
                  <option value="arts">Arts & Humanities</option>
                  <option value="law">Law & Legal Studies</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label for="work-experience">Work Experience</label>
              <select id="work-experience">
                <option value="">Select experience</option>
                <option value="none">No work experience</option>
                <option value="1-2">1-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
            
            <div className="form-group">
              <label for="english-proficiency">English Proficiency</label>
              <select id="english-proficiency">
                <option value="">Select level</option>
                <option value="ielts-7+">IELTS 7+ / TOEFL 100+</option>
                <option value="ielts-6-7">IELTS 6-7 / TOEFL 80-100</option>
                <option value="ielts-5-6">IELTS 5-6 / TOEFL 60-80</option>
                <option value="basic">Basic English</option>
                <option value="none">No test taken</option>
              </select>
            </div>
          </div>
          
          <button className="step-btn" onclick="nextStep(2)">Next: Study Goals →</button>
        </div>
        
        
        <div className="builder-step" id="step2">
          <div className="step-header">
            <div className="step-number">2</div>
            <h2>Study Goals</h2>
            <p>What are you looking to achieve?</p>
          </div>
          
          <div className="form-section">
            <div className="form-group">
              <label for="target-degree">Target Degree Level</label>
              <select id="target-degree" required>
                <option value="">Select degree</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD/Doctoral</option>
                <option value="diploma">Diploma/Certificate</option>
                <option value="exchange">Exchange Program</option>
              </select>
            </div>
            
            <div className="form-group">
              <label for="preferred-countries">Preferred Countries (Select up to 3)</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="countries" value="south-korea">
                  <span className="checkmark"></span>
                  🇰🇷 South Korea
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="countries" value="france">
                  <span className="checkmark"></span>
                  🇫🇷 France
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="countries" value="canada">
                  <span className="checkmark"></span>
                  🇨🇦 Canada
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="countries" value="germany">
                  <span className="checkmark"></span>
                  🇩🇪 Germany
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="countries" value="netherlands">
                  <span className="checkmark"></span>
                  🇳🇱 Netherlands
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="countries" value="australia">
                  <span className="checkmark"></span>
                  🇦🇺 Australia
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="countries" value="usa">
                  <span className="checkmark"></span>
                  🇺🇸 United States
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="countries" value="uk">
                  <span className="checkmark"></span>
                  🇬🇧 United Kingdom
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="countries" value="other">
                  <span className="checkmark"></span>
                  Other/Open to suggestions
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label for="timeline">When do you plan to start?</label>
              <select id="timeline">
                <option value="">Select timeline</option>
                <option value="2025-fall">Fall 2025</option>
                <option value="2026-spring">Spring 2026</option>
                <option value="2026-fall">Fall 2026</option>
                <option value="2027">2027 or later</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
          
          <div className="step-navigation">
            <button className="step-btn secondary" onclick="previousStep(1)">← Previous</button>
            <button className="step-btn" onclick="nextStep(3)">Next: Financial Situation →</button>
          </div>
        </div>
        
        
        <div className="builder-step" id="step3">
          <div className="step-header">
            <div className="step-number">3</div>
            <h2>Financial Situation</h2>
            <p>Help us understand your funding needs</p>
          </div>
          
          <div className="form-section">
            <div className="form-group">
              <label for="funding-need">How much funding do you need?</label>
              <select id="funding-need" required>
                <option value="">Select funding level</option>
                <option value="full">Full funding (tuition + living expenses)</option>
                <option value="partial">Partial funding (tuition only)</option>
                <option value="living">Living expenses only</option>
                <option value="minimal">Minimal support</option>
                <option value="self-funded">Self-funded</option>
              </select>
            </div>
            
            <div className="form-group">
              <label for="family-income">Family Annual Income (USD)</label>
              <select id="family-income">
                <option value="">Select range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-30k">$15,000 - $30,000</option>
                <option value="30k-50k">$30,000 - $50,000</option>
                <option value="over-50k">Over $50,000</option>
              </select>
            </div>
            
            <div className="form-group">
              <label for="savings">Available Savings (USD)</label>
              <select id="savings">
                <option value="">Select range</option>
                <option value="under-1k">Under $1,000</option>
                <option value="1k-5k">$1,000 - $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-30k">$15,000 - $30,000</option>
                <option value="over-30k">Over $30,000</option>
              </select>
            </div>
          </div>
          
          <div className="step-navigation">
            <button className="step-btn secondary" onclick="previousStep(2)">← Previous</button>
            <button className="step-btn" onclick="generateRecommendations()">Get My Recommendations →</button>
          </div>
        </div>
        
        
        <div className="builder-step" id="results" style="display: none;">
          <div className="step-header">
            <div className="step-number">✓</div>
            <h2>Your Personalized Pathway</h2>
            <p>Based on your profile, here are our top recommendations</p>
          </div>
          
          <div id="recommendations-content">
            
          </div>
          
          <div className="step-navigation">
            <button className="step-btn secondary" onclick="restartBuilder()">Start Over</button>
            <button className="step-btn" onclick="downloadPDF()">Download PDF Report</button>
          </div>
        </div>
      </div>
    </main>
` }} />
  )
}
