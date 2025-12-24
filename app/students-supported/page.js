// Students-supported page - safe JSX conversion
export const metadata = {
  title: 'Students & Stories',
  description: 'Real experiences and success stories from Nepali students studying worldwide.',
};

const countries = [
  { flag: '🇰🇷', name: 'South Korea', description: 'Korean Government Scholarship Program (KGSP), university partnerships, and research opportunities in technology and engineering.' },
  { flag: '🇫🇷', name: 'France', description: 'Eiffel Excellence Scholarships, French government programs, and pathways through public universities and grandes écoles.' },
  { flag: '🇬🇧', name: 'United Kingdom', description: 'Chevening Scholarships, Commonwealth Scholarships, and prestigious university admissions including Russell Group institutions.' },
  { flag: '🇺🇸', name: 'United States', description: 'Fulbright Program, need-based aid at liberal arts colleges, and graduate assistantships at research universities.' },
  { flag: '🇦🇺', name: 'Australia', description: 'Australia Awards Scholarships, Research Training Program (RTP), and pathways to permanent residency through study.' },
  { flag: '🇧🇪', name: 'Belgium', description: 'Erasmus Mundus programs, VLIR-UOS scholarships, and opportunities in both French and Dutch-speaking regions.' },
  { flag: '🇨🇦', name: 'Canada', description: 'Multiple scholarship programs, Post-Graduation Work Permits (PGWP), and clear pathways to permanent residency.' },
  { flag: '🇩🇪', name: 'Germany', description: 'DAAD scholarships, research opportunities, and EU Blue Card pathways for skilled professionals.' }
];

export default function StudentsSupportedPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 className="text-center">Students Supported & Success Stories</h1>
          <p className="text-center" style={{ marginBottom: '3rem' }}>
            Through Civora resources and guidance, Nepali students have successfully secured admissions and opportunities globally.
          </p>

          <div className="stats-grid card reveal">
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Students Helped</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">Countries Reached</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">$50K+</div>
              <div className="stat-label">Scholarships Secured</div>
            </div>
          </div>

          <h2 className="text-center" style={{ marginTop: '3rem' }}>Countries Where Our Students Have Succeeded</h2>
          <div className="grid-3-cols">
            {countries.map((country, index) => (
              <div key={index} className="card reveal">
                <h3>{country.flag} {country.name}</h3>
                <p>{country.description}</p>
              </div>
            ))}
          </div>

          <div className="card reveal" style={{ marginTop: '3rem' }}>
            <h2>Share Your Success Story</h2>
            <p>Inspire other Nepali students by sharing your scholarship and study abroad journey.</p>
            <form action="https://formspree.io/f/xldpregr" method="POST" className="story-form">
              <input type="hidden" name="_subject" value="New Student Success Story Submission" />
              <input type="hidden" name="_next" value="/thank-you" />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="student-name">Your Name (will be anonymized)</label>
                  <input type="text" id="student-name" name="student-name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="student-email">Your Email</label>
                  <input type="email" id="student-email" name="student-email" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="success-story">Your Success Story</label>
                <textarea id="success-story" name="success-story" rows={6} required></textarea>
              </div>

              <button type="submit" className="linear-button">Submit My Story</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
