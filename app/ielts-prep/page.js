export const metadata = {
  title: 'IELTS & Prep Resources',
  description: 'Comprehensive IELTS preparation resources and study tips for Nepali students.',
};

export default function Ielts_PrepPage() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `      <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
        <h1 data-i18n="ielts.title" style="color: var(--text-primary); margin-bottom: 1rem;">IELTS Prep & Application Guides</h1>
        <p data-i18n="ielts.intro" style="color: var(--text-secondary); max-width: 800px; margin: 0 auto 3rem;">Complete preparation strategies, test resources, application guides, and templates to help Nepali students succeed in international admissions.</p>

        
        <section id="overview" className="section">
          <h2 style="color: var(--text-primary); margin: 3rem 0 2rem; text-align: center;">Overview</h2>
          <div className="callout" style="text-align: left; max-width: 900px; margin: 0 auto 2rem;">
            <p>This comprehensive guide combines IELTS test preparation strategies with step-by-step application guidance. Whether you're starting your preparation or finalizing your applications, you'll find proven resources and templates to streamline your study abroad journey from Nepal.</p>
          </div>
        </section>

        
        <section id="preparation-steps" className="section">
          <h2 style="color: var(--text-primary); margin: 3rem 0 2rem; text-align: center;">Application Preparation Steps</h2>
          <div style="max-width: 1000px; margin: 0 auto; text-align: left;">
            <div className="timeline">
            <div className="timeline-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Research & Planning</h3>
                <p>Start your journey by researching universities, programs, and funding opportunities.</p>
                <ul className="linear-list">
                  <li>Identify target universities and programs</li>
                  <li>Research scholarship opportunities</li>
                  <li>Understand visa requirements</li>
                  <li>Calculate total costs and budget</li>
                </ul>
                <a href="scholarships.html" className="linear-button margin-top-1">Browse Scholarships</a>
              </div>
            </div>
            
            <div className="timeline-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Document Preparation</h3>
                <p>Gather and prepare all required documents for your applications.</p>
                <ul className="linear-list">
                  <li>Academic transcripts and certificates</li>
                  <li>Language test scores (IELTS, TOEFL, etc.)</li>
                  <li>Statement of Purpose (SOP)</li>
                  <li>Letters of Recommendation</li>
                  <li>Financial documents</li>
                </ul>
              </div>
            </div>
            
            <div className="timeline-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Application Submission</h3>
                <p>Submit strong applications with all required documents.</p>
                <ul className="linear-list">
                  <li>Complete online applications</li>
                  <li>Pay application fees</li>
                  <li>Submit supporting documents</li>
                  <li>Track application status</li>
                </ul>
              </div>
            </div>
            
            <div className="timeline-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Visa Application</h3>
                <p>Apply for student visas once you receive acceptance letters.</p>
                <ul className="linear-list">
                  <li>Gather visa documents</li>
                  <li>Complete visa application</li>
                  <li>Schedule and attend visa interview</li>
                  <li>Prepare for departure</li>
                </ul>
                <a href="citizenship.html" className="linear-button margin-top-1">Visa Pathways</a>
              </div>
            </div>
            
            <div className="timeline-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Pre-Departure</h3>
                <p>Prepare for your journey and life abroad.</p>
                <ul className="linear-list">
                  <li>Book flights and accommodation</li>
                  <li>Arrange financial transfers</li>
                  <li>Pack essentials and documents</li>
                  <li>Connect with other Nepali students</li>
                </ul>
                <a href="students-supported.html" className="linear-button margin-top-1">Success Stories</a>
              </div>
            </div>
          </div>
        </div>
      </section>

        
        <section id="guides-and-resources" className="section">
          <h2 style="color: var(--text-primary); margin: 3rem 0 2rem; text-align: center;">Guides & Resources</h2>
          
          
          <div style="text-align: center; margin-bottom: 2rem;">
            <h3>Templates & Downloads</h3>
            <p className="subtext" style="color: var(--text-secondary);">Download proven templates to strengthen your applications</p>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            <div className="card" style="text-align: center; padding: 2rem; background: var(--surface);">
              <i className="fas fa-file-text" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
              <h4>SOP Templates</h4>
              <p style="margin: 1rem 0;">Statement of Purpose templates for different fields of study</p>
              <a href="#" className="linear-button" style="display: inline-block;">
                <i className="fas fa-download icon-left"></i>Download
              </a>
            </div>
            <div className="card" style="text-align: center; padding: 2rem; background: var(--surface);">
              <i className="fas fa-file-invoice-dollar" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
              <h4>Financial Checklist</h4>
              <p style="margin: 1rem 0;">Complete checklist for financial documentation</p>
              <a href="#" className="linear-button" style="display: inline-block;">
                <i className="fas fa-download icon-left"></i>Download
              </a>
            </div>
            <div className="card" style="text-align: center; padding: 2rem; background: var(--surface);">
              <i className="fas fa-calendar-alt" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
              <h4>Application Timeline</h4>
              <p style="margin: 1rem 0;">Month-by-month application planning template</p>
              <a href="#" className="linear-button" style="display: inline-block;">
                <i className="fas fa-download icon-left"></i>Download
              </a>
            </div>
            <div className="card" style="text-align: center; padding: 2rem; background: var(--surface);">
              <i className="fas fa-comments" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
              <h4>Interview Prep</h4>
              <p style="margin: 1rem 0;">Common visa interview questions and preparation guide</p>
              <a href="#" className="linear-button" style="display: inline-block;">
                <i className="fas fa-download icon-left"></i>Download
              </a>
            </div>
          </div>

        <h3 data-i18n="ielts.essential_resources" style="color: var(--text-primary); margin: 3rem 0 2rem; text-align: center;">IELTS Resources</h3>
        <div className="grid-3-cols" style="text-align: left;">
      <a className="card" href="https://www.britishcouncil.org/exam/ielts/prepare" target="_blank">
        <h4>British Council IELTS Prep</h4>
        <p>Official preparation materials, practice tests, and study plans directly from the test makers.</p>
      </a>
      
      <a className="card" href="https://ieltsliz.com/" target="_blank">
        <h4>IELTS Liz</h4>
        <p>Free lessons, tips, and practice exercises. Excellent for understanding band descriptors and common mistakes.</p>
      </a>
      
      <a className="card" href="https://www.cambridgeenglish.org/exams-and-tests/ielts/preparation/" target="_blank">
        <h4>Cambridge Practice Tests</h4>
        <p>Authentic practice materials and sample tests with detailed answer keys and explanations.</p>
      </a>
    </div>

        <h3 style="color: var(--text-primary); margin: 3rem 0 2rem; text-align: center;">Proven Test Strategies</h3>
        
        <div className="callout" style="text-align: left; max-width: 900px; margin: 0 auto 2rem;">
          <h3>⏰ Time Management</h3>
          <ul>
            <li><strong>Reading:</strong> 20 minutes per passage, leave 5 minutes for transfer</li>
            <li><strong>Writing Task 1:</strong> 20 minutes maximum</li>
            <li><strong>Writing Task 2:</strong> 40 minutes (more important for overall score)</li>
            <li><strong>Listening:</strong> Use the 10-minute transfer time wisely</li>
          </ul>
        </div>

        <h3 style="color: var(--text-primary); margin: 2rem 0 1rem; text-align: center;">Writing Task 2 Templates</h3>
        <div className="card" style="max-width: 900px; margin: 0 auto 2rem; text-align: left;">
          <h4>Opinion Essay Structure</h4>
          <pre style="background: var(--surface); padding: 1rem; border-radius: 4px; overflow-x: auto; color: var(--text-primary);">
Introduction:
- Hook + Background + Thesis Statement

Body Paragraph 1:
- Topic sentence supporting your opinion
- Explanation + Example + Result

Body Paragraph 2:
- Topic sentence with additional support
- Explanation + Example + Result

Conclusion:
- Restate thesis + Summarize main points + Final thought</pre>
        </div>

        <h3 style="color: var(--text-primary); margin: 2rem 0 1rem; text-align: center;">Speaking Strategies</h3>
        <div className="grid-3-cols">
      <div className="card">
        <h4>Part 1: Personal Questions</h4>
        <ul>
          <li>Give extended answers (3-4 sentences)</li>
          <li>Use present, past, and future tenses</li>
          <li>Add personal examples and reasons</li>
        </ul>
      </div>
      
      <div className="card">
        <h4>Part 2: Individual Long Turn</h4>
        <ul>
          <li>Use the full 2 minutes</li>
          <li>Make notes during 1-minute prep time</li>
          <li>Cover all points on the cue card</li>
          <li>Use discourse markers (firstly, moreover, finally)</li>
        </ul>
      </div>
      
      <div className="card">
        <h4>Part 3: Discussion</h4>
        <ul>
          <li>Give longer, more analytical answers</li>
          <li>Compare, contrast, and evaluate</li>
          <li>Use complex grammar structures</li>
          <li>Show awareness of different perspectives</li>
        </ul>
      </div>
    </div>

        <h2 style="color: var(--text-primary); margin: 3rem 0 2rem; text-align: center;">📖 Reading Techniques</h2>
        <div className="callout" style="text-align: left; max-width: 900px; margin: 0 auto 2rem;">
          <h3>Skimming & Scanning</h3>
          <ol>
            <li><strong>Read the title and subheadings first</strong> (1 minute)</li>
            <li><strong>Skim the first and last paragraph</strong> (2 minutes)</li>
            <li><strong>Read questions before the passage</strong> (2 minutes)</li>
            <li><strong>Scan for keywords</strong> and answer location</li>
            <li><strong>Read around the keywords</strong> for context</li>
          </ol>
        </div>

        <h2 style="color: var(--text-primary); margin: 3rem 0 2rem; text-align: center;">🎧 Listening Practice Drills</h2>
        <div className="grid-3-cols">
      <div className="card">
        <h4>Prediction Practice</h4>
        <p>Before listening, read questions and predict what type of answer you need (number, name, adjective, etc.)</p>
      </div>
      
      <div className="card">
        <h4>Synonym Recognition</h4>
        <p>IELTS tests paraphrasing. Practice identifying when speakers use different words with the same meaning.</p>
      </div>
      
      <div className="card">
        <h4>Note-Taking System</h4>
        <p>Develop shorthand for common words. Use abbreviations and symbols to capture information quickly.</p>
      </div>
    </div>

        <h2 style="color: var(--text-primary); margin: 3rem 0 2rem; text-align: center;">📅 Study Timeline</h2>
        <div className="callout" style="text-align: left; max-width: 900px; margin: 0 auto 2rem;">
          <h3>8-Week Preparation Plan</h3>
          <ul>
            <li><strong>Weeks 1-2:</strong> Diagnostic test + Identify weak areas</li>
            <li><strong>Weeks 3-4:</strong> Focus on weakest section + Daily vocabulary</li>
            <li><strong>Weeks 5-6:</strong> Practice all sections + Time management</li>
            <li><strong>Weeks 7-8:</strong> Full practice tests + Review mistakes</li>
          </ul>
        </div>

        <h2 style="color: var(--text-primary); margin: 3rem 0 2rem; text-align: center;">🇳🇵 Nepal-Specific Tips</h2>
        <div className="grid-2x2">
      <div className="card">
        <h4>Common Grammar Issues</h4>
        <ul>
          <li>Article usage (a/an/the)</li>
          <li>Preposition confusion (in/on/at)</li>
          <li>Verb tenses in conditional sentences</li>
        </ul>
      </div>
      
      <div className="card">
        <h4>Pronunciation Guide for Nepali Speakers</h4>
        <div className="pronunciation-guide">
          <h5>🔤 Critical Sound Differences</h5>
          <div className="sound-grid">
            <div className="sound-item">
              <strong>V vs W</strong>
              <div className="sound-examples">
                <span className="correct">✓ Very /ˈveri/</span>
                <span className="incorrect">✗ Wery</span>
              </div>
              <div className="tip">Touch your bottom lip with top teeth for 'v' sound</div>
            </div>
            
            <div className="sound-item">
              <strong>TH Sounds</strong>
              <div className="sound-examples">
                <span className="correct">✓ Think /θɪŋk/</span>
                <span className="incorrect">✗ Sink</span>
              </div>
              <div className="tip">Tongue tip between teeth, blow air gently</div>
            </div>
            
            <div className="sound-item">
              <strong>R vs L</strong>
              <div className="sound-examples">
                <span className="correct">✓ Rice /raɪs/</span>
                <span className="incorrect">✗ Lice</span>
              </div>
              <div className="tip">Curl tongue back slightly for 'r', touch roof for 'l'</div>
            </div>
            
            <div className="sound-item">
              <strong>Final Consonants</strong>
              <div className="sound-examples">
                <span className="correct">✓ Card /kɑːrd/</span>
                <span className="incorrect">✗ Car</span>
              </div>
              <div className="tip">Don't drop final consonants - pronounce them clearly</div>
            </div>
          </div>
          
          <h5>📢 Word Stress Patterns</h5>
          <div className="stress-patterns">
            <div className="stress-example">
              <strong>Two Syllables:</strong>
              <ul>
                <li><em>PRE-sent</em> (noun) vs <em>pre-SENT</em> (verb)</li>
                <li><em>RE-cord</em> (noun) vs <em>re-CORD</em> (verb)</li>
              </ul>
            </div>
            <div className="stress-example">
              <strong>Common Mistakes:</strong>
              <ul>
                <li>✓ <em>pho-TO-gra-phy</em> ✗ <em>PHO-to-gra-phy</em></li>
                <li>✓ <em>u-ni-VER-si-ty</em> ✗ <em>u-NI-ver-si-ty</em></li>
              </ul>
            </div>
          </div>
          
          <h5>Practice Exercises</h5>
          <div className="practice-exercises">
            <div className="exercise">
              <strong>Daily Minimal Pairs (5 minutes):</strong>
              <ul>
                <li>very - wary, vest - west, vine - wine</li>
                <li>think - sink, path - pass, moth - moss</li>
                <li>rice - lice, right - light, read - lead</li>
              </ul>
            </div>
            <div className="exercise">
              <strong>Sentence Stress Practice:</strong>
              <p><em>"I went to the SHOP to buy some BREAD."</em><br>
              <small>Stress content words (nouns, verbs, adjectives), not function words</small></p>
            </div>
          </div>
          
          <div className="callout" style="margin-top: 1rem;">
            <strong>Pro Tip:</strong> Record yourself reading IELTS speaking prompts and compare with native speakers on YouTube. Focus on rhythm and stress patterns, not just individual sounds.
          </div>
        </div>
      </div>
      
      <div className="card">
        <h4>Cultural Context</h4>
        <ul>
          <li>Practice with Western academic topics</li>
          <li>Learn about education systems abroad</li>
          <li>Understand formal vs informal registers</li>
        </ul>
      </div>
    </div>

        <div className="callout" style="text-align: left; max-width: 900px; margin: 0 auto 2rem;">
          <h3 data-i18n="ielts.final_reminders">Final Reminders</h3>
          <ul>
            <li><strong>Consistency beats intensity:</strong> 1 hour daily is better than 7 hours once a week</li>
            <li><strong>Use official materials:</strong> Stick to British Council and Cambridge resources</li>
            <li><strong>Practice under exam conditions:</strong> Timed practice with no distractions</li>
            <li><strong>Book early:</strong> IELTS slots fill up quickly in Nepal</li>
            <li><strong>Computer vs Paper:</strong> Choose based on your typing speed and comfort</li>
          </ul>
        </div>
      </section>

        
        <section id="faqs" className="section">
          <h2 style="color: var(--text-primary); margin: 3rem 0 2rem; text-align: center;">Frequently Asked Questions</h2>
          
          <div style="max-width: 900px; margin: 0 auto; text-align: left;">
            <div className="card" style="margin-bottom: 1.5rem;">
              <h3>How long should I prepare for IELTS?</h3>
              <p>Most students need 8-12 weeks of focused preparation. If you're starting from a lower level, allow 3-6 months. Take a diagnostic test first to assess your current level.</p>
            </div>
            
            <div className="card" style="margin-bottom: 1.5rem;">
              <h3>What IELTS score do I need?</h3>
              <p>Most universities require an overall band of 6.5-7.0, with no section below 6.0. Check specific requirements for your target universities and programs.</p>
            </div>
            
            <div className="card" style="margin-bottom: 1.5rem;">
              <h3>When should I start my application process?</h3>
              <p>Start at least 12-18 months before your intended start date. This gives you time for IELTS preparation, application submission, scholarship applications, and visa processing.</p>
            </div>
            
            <div className="card" style="margin-bottom: 1.5rem;">
              <h3>Can I apply without IELTS?</h3>
              <p>Some universities offer conditional acceptance or have English proficiency waivers for certain circumstances. However, IELTS is the most widely accepted test and gives you the most options.</p>
            </div>
            
            <div className="card" style="margin-bottom: 1.5rem;">
              <h3>What documents do I need for university applications?</h3>
              <p>Typically: academic transcripts, IELTS/TOEFL scores, Statement of Purpose, letters of recommendation, CV/resume, financial proof, and passport copy. Requirements vary by university.</p>
            </div>
            
            <div className="card" style="margin-bottom: 1.5rem;">
              <h3>How much does it cost to study abroad?</h3>
              <p>Costs vary widely by country and program. Check our <a href="scholarships.html">scholarships database</a> for funded opportunities. Budget for tuition, living expenses, insurance, and travel.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
`,
      }}
    />
  );
}
