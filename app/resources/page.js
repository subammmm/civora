export const metadata = {
  title: 'Resources — Guides for Nepali Students',
  description: 'Helpful guides for Nepali students: personal statements, recommendation letters, English tests (IELTS, TOEFL), and Nepal-specific application tips.',
};

export default function ResourcesPage() {
  return (
    <main>
      {/* Header */}
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <h1>Resources</h1>
          <p className="subtext" style={{ fontSize: '1.125rem' }}>
            Helpful guides to strengthen your scholarship applications. Written specifically for Nepali students.
          </p>
        </div>
      </section>

      {/* Personal Statement */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div className="card" id="personal-statement">
            <div className="resource-icon">📝</div>
            <h2>How to Write a Personal Statement</h2>
            <p>Your personal statement (also called a Statement of Purpose or Motivation Letter) is often the most important part of your application. Here&apos;s how to write one that stands out.</p>

            <h3>What Committees Look For</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              <li><strong>Clear academic and career goals</strong> — What do you want to study and why?</li>
              <li><strong>Relevant experience</strong> — Work, research, or volunteer experience related to your field</li>
              <li><strong>Why this program</strong> — Show you&apos;ve researched the specific university/program</li>
              <li><strong>Leadership and community impact</strong> — How have you contributed to your community?</li>
              <li><strong>Plans to return</strong> — Many scholarships want to see how you&apos;ll use your education to help Nepal</li>
            </ul>

            <h3>Simple Structure</h3>
            <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              <li><strong>Opening (1 paragraph)</strong> — Hook the reader with a specific story or experience that inspired your goals</li>
              <li><strong>Academic background (1-2 paragraphs)</strong> — Your education, relevant coursework, and achievements</li>
              <li><strong>Professional experience (1-2 paragraphs)</strong> — Work, internships, research, or community service</li>
              <li><strong>Why this program (1 paragraph)</strong> — Specific reasons this program fits your goals</li>
              <li><strong>Future plans (1 paragraph)</strong> — What you&apos;ll do after completing your degree</li>
            </ol>

            <h3>Common Mistakes to Avoid</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.8' }}>
              <li>Using generic statements that could apply to any program</li>
              <li>Writing your entire life story instead of focusing on relevant experiences</li>
              <li>Forgetting to explain why you need the scholarship specifically</li>
              <li>Not proofreading — ask a friend or teacher to review your draft</li>
            </ul>

            <div style={{ padding: '1rem', background: 'var(--gray-100)', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
              <p style={{ marginBottom: 0, fontSize: '0.9375rem' }}>
                <strong>💡 Nepal-Specific Tip:</strong> Many committees know little about Nepal. Briefly explain relevant context — like the education system or challenges you&apos;ve faced — to help them understand your achievements.
              </p>
            </div>
          </div>

          {/* Recommendation Letters */}
          <div className="card" id="recommendation-letters">
            <div className="resource-icon">📬</div>
            <h2>Getting Strong Recommendation Letters</h2>
            <p>A good recommendation letter can make a huge difference. Here&apos;s how to get the best ones possible.</p>

            <h3>Who to Ask</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              <li><strong>Professors who know you well</strong> — Someone who can speak to your specific abilities, not just grades</li>
              <li><strong>Work supervisors</strong> — Especially for scholarships that value professional experience</li>
              <li><strong>Community leaders</strong> — If the scholarship values community involvement</li>
              <li><strong>Avoid</strong> — Family members, politicians you don&apos;t know personally, or anyone who would write a generic letter</li>
            </ul>

            <h3>How to Approach Them</h3>
            <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              <li>Ask <strong>at least 4-6 weeks</strong> before the deadline</li>
              <li>Meet in person if possible — explain the scholarship and why you&apos;re applying</li>
              <li>Give them your CV, personal statement draft, and the scholarship details</li>
              <li>Remind them of specific projects or achievements they can mention</li>
              <li>Send a polite reminder 1 week before the deadline</li>
              <li>Always send a thank-you note afterward, regardless of the result</li>
            </ol>

            <div style={{ padding: '1rem', background: 'var(--gray-100)', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
              <p style={{ marginBottom: 0, fontSize: '0.9375rem' }}>
                <strong>💡 Nepal-Specific Tip:</strong> If your recommender is not comfortable writing in English, they can write in Nepali and you can get it officially translated. Some scholarships accept this.
              </p>
            </div>
          </div>

          {/* English Tests */}
          <div className="card" id="english-tests">
            <div className="resource-icon">📖</div>
            <h2>English Language Tests</h2>
            <p>Most international scholarships require proof of English proficiency. Here&apos;s what you need to know.</p>

            <h3>Test Comparison</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="linear-table" style={{ marginBottom: '1.5rem' }}>
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Format</th>
                    <th>Duration</th>
                    <th>Cost (approx.)</th>
                    <th>Score Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>IELTS Academic</strong></td>
                    <td>Paper or Computer</td>
                    <td>2h 45min</td>
                    <td>NPR 29,500</td>
                    <td>1.0 – 9.0</td>
                  </tr>
                  <tr>
                    <td><strong>TOEFL iBT</strong></td>
                    <td>Computer</td>
                    <td>~2 hours</td>
                    <td>~$200 USD</td>
                    <td>0 – 120</td>
                  </tr>
                  <tr>
                    <td><strong>Duolingo English Test</strong></td>
                    <td>Online (at home)</td>
                    <td>~1 hour</td>
                    <td>$65 USD</td>
                    <td>10 – 160</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Typical Score Requirements</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              <li><strong>Most scholarships:</strong> IELTS 6.5 overall (no band below 6.0) or TOEFL 80+</li>
              <li><strong>Top universities:</strong> IELTS 7.0+ or TOEFL 100+</li>
              <li><strong>Duolingo:</strong> 110+ (accepted by a growing number of universities)</li>
            </ul>

            <h3>Free Preparation Resources</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.8' }}>
              <li><a href="https://www.ielts.org/for-test-takers/sample-test-questions" target="_blank" rel="noopener noreferrer"><strong>IELTS Sample Tests</strong></a> — Free official practice materials</li>
              <li><a href="https://www.ets.org/toefl/test-takers/ibt/prepare/practice-tests.html" target="_blank" rel="noopener noreferrer"><strong>TOEFL Free Practice</strong></a> — Official ETS practice tests</li>
              <li><a href="https://englishtest.duolingo.com/applicants" target="_blank" rel="noopener noreferrer"><strong>Duolingo Practice</strong></a> — Free practice test available</li>
            </ul>

            <div style={{ padding: '1rem', background: 'var(--gray-100)', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
              <p style={{ marginBottom: 0, fontSize: '0.9375rem' }}>
                <strong>💡 Test Centers in Nepal:</strong> IELTS is available through British Council (Kathmandu, Chitwan, Pokhara) and IDP. TOEFL centers operate in Kathmandu. Check official websites for current availability.
              </p>
            </div>
          </div>

          {/* Nepal-Specific Tips */}
          <div className="card" id="nepal-tips">
            <div className="resource-icon">🇳🇵</div>
            <h2>Nepal-Specific Application Tips</h2>
            <p>Important things Nepali students should know when applying for international scholarships.</p>

            <h3>Document Preparation</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              <li><strong>Transcripts:</strong> Get official transcripts from your university/college. Most require them in English. If your institution issues Nepali transcripts, get them officially translated.</li>
              <li><strong>Equivalency Letters:</strong> Some countries require verification of your degree level. Contact the university you&apos;re applying to for specific requirements.</li>
              <li><strong>Recommendation Letters:</strong> Get them on official letterhead with stamps. International committees expect formal formatting.</li>
              <li><strong>Financial Documents:</strong> Bank statements, sponsor letters, and property documents may need to be notarized.</li>
            </ul>

            <h3>Attestation Process</h3>
            <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              <li>Get documents attested by your institution first</li>
              <li>Then by the Ministry of Education (for academic documents)</li>
              <li>Then by the Ministry of Foreign Affairs (for international use)</li>
              <li>Some countries may require embassy attestation as well</li>
            </ol>

            <h3>Common Financial Documentation</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.8' }}>
              <li>Bank statements (usually last 6 months)</li>
              <li>Sponsor&apos;s income certificate or salary slips</li>
              <li>Property valuation documents (if applicable)</li>
              <li>Tax clearance certificates</li>
            </ul>

            <div style={{ padding: '1rem', background: 'var(--gray-100)', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
              <p style={{ marginBottom: 0, fontSize: '0.9375rem' }}>
                <strong>💡 Important:</strong> Start document preparation early — attestation in Nepal can take 2-4 weeks. Don&apos;t wait until the last minute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-navy" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2>Ready to Find Your Scholarship?</h2>
          <p style={{ marginBottom: '1.5rem' }}>Browse our database of verified international scholarships curated for Nepali students.</p>
          <a href="/scholarships/" className="btn-primary">Browse Scholarships →</a>
        </div>
      </section>
    </main>
  );
}
