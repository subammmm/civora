// Simple safe conversion of pathway-builder page - removed dangerouslySetInnerHTML
// Full interactive version would need client-side state management

export const metadata = {
  title: 'Pathway Builder',
  description: 'Build your personalized education and career pathway.',
};

export default function PathwayBuilderPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1>Personalized Pathway Builder</h1>
          <p className="page-intro">
            Answer a few questions about your background and goals to receive personalized recommendations for scholarships, study programs, and visa pathways that match your profile.
          </p>

          <div className="card reveal">
            <h2>Interactive Pathway Builder</h2>
            <p>This page requires client-side JavaScript for the interactive builder form.</p>
            <p>The full implementation should be converted to a proper React component with useState for form handling.</p>
            <a href="/scholarships" className="linear-button">Browse Scholarships Instead</a>
          </div>

          <div className="card reveal">
            <h3>Quick Navigation</h3>
            <ul className="linear-list">
              <li><a href="/scholarships">Scholarship Database</a></li>
              <li><a href="/citizenship">Visa & Citizenship Pathways</a></li>
              <li><a href="/ielts-prep">IELTS Preparation</a></li>
              <li><a href="/students-supported">Student Success Stories</a></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
