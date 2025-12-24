// IELTS Prep page - simplified safe version  
// Full content preserved in simpler structure

export const metadata = {
  title: 'IELTS & Prep Resources',
  description: 'Comprehensive IELTS preparation resources and study tips for Nepali students.',
};

export default function IeltsPrepPage() {
  return (
    <main>
      <section className="section">
        <div className="container text-center">
          <div className="card reveal">
            <h1>IELTS Prep & Application Guides</h1>
            <p className="subtext">
              Complete preparation strategies, test resources, application guides, and templates to help Nepali students succeed in international admissions.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card reveal">
            <h2>Essential IELTS Resources</h2>
            <div className="grid-3-cols">
              <a className="card" href="https://www.britishcouncil.org/exam/ielts/prepare" target="_blank" rel="noopener noreferrer">
                <h4>British Council IELTS Prep</h4>
                <p>Official preparation materials, practice tests, and study plans directly from the test makers.</p>
              </a>

              <a className="card" href="https://ieltsliz.com/" target="_blank" rel="noopener noreferrer">
                <h4>IELTS Liz</h4>
                <p>Free lessons, tips, and practice exercises. Excellent for understanding band descriptors and common mistakes.</p>
              </a>

              <a className="card" href="https://www.cambridgeenglish.org/exams-and-tests/ielts/preparation/" target="_blank" rel="noopener noreferrer">
                <h4>Cambridge Practice Tests</h4>
                <p>Authentic practice materials and sample tests with detailed answer keys and explanations.</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card reveal">
            <h2>Application Preparation Steps</h2>
            <div className="timeline">
              <div className="timeline-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Research & Planning</h3>
                  <p>Start your journey by researching universities, programs, and funding opportunities.</p>
                  <a href="/scholarships" className="linear-button">Browse Scholarships</a>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Document Preparation</h3>
                  <p>Gather academic transcripts, language test scores, SOP, and letters of recommendation.</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Application Submission</h3>
                  <p>Complete online applications and submit all required documents.</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Visa Application</h3>
                  <p>Apply for student visas once you receive acceptance letters.</p>
                  <a href="/citizenship" className="linear-button">Visa Pathways</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card reveal">
            <h2>Study Timeline (8-Week Plan)</h2>
            <ul className="linear-list">
              <li><strong>Weeks 1-2:</strong> Diagnostic test + Identify weak areas</li>
              <li><strong>Weeks 3-4:</strong> Focus on weakest section + Daily vocabulary</li>
              <li><strong>Weeks 5-6:</strong> Practice all sections + Time management</li>
              <li><strong>Weeks 7-8:</strong> Full practice tests + Review mistakes</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
