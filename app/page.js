import "./globals.css";
import { scholarships } from "./scholarships/scholarships-data";

export default function Home() {
  const now = new Date();

  // Upcoming deadlines: future deadlines sorted ascending, first 5
  const upcomingDeadlines = scholarships
    .filter((s) => new Date(s.deadlineDate) > now)
    .sort((a, b) => new Date(a.deadlineDate) - new Date(b.deadlineDate))
    .slice(0, 5);

  // Featured scholarships: fully funded, first 6
  const featured = scholarships
    .filter((s) => s.fundingType === "fully-funded")
    .slice(0, 6);

  return (
    <>
      {/* ===== 1. Hero Section ===== */}
      <section className="section section-navy">
        <div className="container" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "3rem" }}>Find Your Path to Studying Abroad</h1>
          <p
            style={{
              fontSize: "1.2rem",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
            }}
          >
            Discover verified scholarships from 15+ countries — curated for
            Nepali students
          </p>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search scholarships by name, country, or field..."
              readOnly
            />
            <a
              href="/scholarships/"
              className="btn-primary"
              style={{ borderRadius: 0 }}
            >
              Search
            </a>
          </div>

          <div
            style={{
              marginTop: "2.5rem",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.9375rem",
            }}
          >
            {scholarships.length}+ Verified Scholarships · 15+ Countries ·
            Updated July 2026
          </div>
        </div>
      </section>

      {/* ===== 2. Upcoming Deadlines Section ===== */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>⏰ Upcoming Deadlines</h2>
          <p className="subtext" style={{ textAlign: "center" }}>
            Don&apos;t miss these approaching scholarship deadlines
          </p>

          <div className="deadline-strip">
            {upcomingDeadlines.map((s) => {
              const daysLeft = Math.ceil(
                (new Date(s.deadlineDate) - new Date()) / (1000 * 60 * 60 * 24)
              );
              return (
                <div className="deadline-item" key={s.id}>
                  <div className="deadline-countdown">
                    <span
                      className={`days ${daysLeft < 30 ? "urgent" : ""}`}
                    >
                      {daysLeft}
                    </span>
                    <span className="label">days left</span>
                  </div>
                  <div className="deadline-info">
                    <h4>
                      {s.countryFlag} {s.name}
                    </h4>
                    <p>{s.deadline}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center" }}>
            <a
              href="/scholarships/"
              className="btn-outline btn-sm"
              style={{ marginTop: "1.5rem" }}
            >
              View All Deadlines →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 3. Featured Scholarships ===== */}
      <section className="section section-light">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Featured Scholarships</h2>
          <p className="subtext" style={{ textAlign: "center" }}>
            Hand-picked opportunities for Nepali students
          </p>

          <div className="feature-grid">
            {featured.map((s) => (
              <div className="card scholarship-card" key={s.id}>
                <div className="card-header">
                  <span className="card-country">
                    <span className="flag">{s.countryFlag}</span> {s.country}
                  </span>
                  <span
                    className={`badge ${
                      s.fundingType === "fully-funded"
                        ? "badge-funding fully-funded"
                        : "badge-funding"
                    }`}
                  >
                    {s.fundingType === "fully-funded"
                      ? "Fully Funded"
                      : s.fundingType === "partial"
                      ? "Partial"
                      : "Stipend"}
                  </span>
                </div>
                <h3>{s.name}</h3>
                <p className="card-organizer">{s.organizer}</p>
                <div className="card-badges">
                  {s.level.map((l) => (
                    <span key={l} className="badge badge-level">
                      {l}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: "0.9375rem", marginBottom: "1rem" }}>
                  {s.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <span className="card-deadline">{s.deadline}</span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-sm"
                  >
                    Apply →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a
              href="/scholarships/"
              className="btn-secondary"
              style={{ marginTop: "2rem" }}
            >
              Browse All {scholarships.length} Scholarships →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 4. How It Works ===== */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>How It Works</h2>
          <p className="subtext" style={{ textAlign: "center" }}>
            Three simple steps to find your scholarship
          </p>

          <div
            className="stats-grid"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            <div style={{ textAlign: "center" }}>
              <div className="step-number">1</div>
              <h3>Search</h3>
              <p>
                Browse our database of verified scholarships from 15+ countries.
                Filter by country, field, or degree level.
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="step-number">2</div>
              <h3>Check Eligibility</h3>
              <p>
                Review requirements, deadlines, and what each scholarship
                covers. Save your favorites for later.
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="step-number">3</div>
              <h3>Apply</h3>
              <p>
                Click through to the official application portal and submit your
                application before the deadline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. Resources Teaser ===== */}
      <section className="section section-navy">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Prepare Your Application</h2>
          <p>Helpful guides to strengthen your scholarship applications</p>

          <div className="feature-grid">
            {[
              {
                emoji: "📝",
                title: "Personal Statements",
                desc: "Learn how to write a compelling statement",
              },
              {
                emoji: "📬",
                title: "Recommendation Letters",
                desc: "Get strong letters from the right people",
              },
              {
                emoji: "📖",
                title: "English Tests",
                desc: "IELTS, TOEFL, and Duolingo guide",
              },
              {
                emoji: "🇳🇵",
                title: "Nepal-Specific Tips",
                desc: "Documents, attestation, and more",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
                  {item.emoji}
                </div>
                <h3 style={{ color: "#fff" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.7)" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="/resources/"
            className="btn-primary"
            style={{ marginTop: "2rem" }}
          >
            View All Resources →
          </a>
        </div>
      </section>

      {/* ===== 6. Stats Bar ===== */}
      <section className="section-gold" style={{ padding: "2.5rem 0" }}>
        <div className="container">
          <div className="stats-grid">
            <div style={{ textAlign: "center" }}>
              <div className="stat-number" style={{ color: "var(--navy)" }}>
                {scholarships.length}+
              </div>
              <p style={{ color: "var(--navy)" }}>Verified Scholarships</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="stat-number" style={{ color: "var(--navy)" }}>
                15+
              </div>
              <p style={{ color: "var(--navy)" }}>Countries</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="stat-number" style={{ color: "var(--navy)" }}>
                100%
              </div>
              <p style={{ color: "var(--navy)" }}>Free to Use</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="stat-number" style={{ color: "var(--navy)" }}>
                Monthly
              </div>
              <p style={{ color: "var(--navy)" }}>Updates</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
